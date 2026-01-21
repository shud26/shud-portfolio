"use client";

import { useEffect, useState, useCallback } from "react";

interface FundingData {
  coin: string;
  hyperliquid: number | null;
  pacifica: number | null;
  variational: number | null;
  price: number | null;
  spread: number | null;
  bestLong: string | null;
  bestShort: string | null;
}

interface ArbitrageOpportunity {
  coin: string;
  spread: number;
  longDex: string;
  shortDex: string;
  longRate: number;
  shortRate: number;
  estimatedDaily: number;
}

interface KimchiPremium {
  coin: string;
  upbitKRW: number | null;
  binanceUSD: number | null;
  premium: number | null;
}

export default function Dashboard() {
  const [data, setData] = useState<FundingData[]>([]);
  const [arbitrage, setArbitrage] = useState<ArbitrageOpportunity[]>([]);
  const [kimchi, setKimchi] = useState<KimchiPremium[]>([]);
  const [avgKimchi, setAvgKimchi] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(1450);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [countdown, setCountdown] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Fetch funding data and kimchi premium in parallel
      const [fundingRes, kimchiRes] = await Promise.all([
        fetch("/api/funding"),
        fetch("/api/kimchi"),
      ]);

      const fundingJson = await fundingRes.json();
      const kimchiJson = await kimchiRes.json();

      if (fundingJson.success) {
        setData(fundingJson.data);
        setArbitrage(fundingJson.arbitrage || []);
      }

      if (kimchiJson.success) {
        setKimchi(kimchiJson.data);
        setAvgKimchi(kimchiJson.avgPremium || 0);
        setExchangeRate(kimchiJson.exchangeRate || 1450);
      }

      setLastUpdate(new Date().toLocaleTimeString("ko-KR"));
      setCountdown(60);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatRate = (rate: number | null, highlight = false) => {
    if (rate === null) return <span className="text-[#525252]">-</span>;
    const isPositive = rate > 0;
    const isNegative = rate < 0;
    const baseColor = isPositive ? "text-red-400" : isNegative ? "text-green-400" : "text-[#737373]";
    const bgColor = highlight && Math.abs(rate) > 0.01 ? (isPositive ? "bg-red-500/10" : "bg-green-500/10") : "";
    return (
      <span className={`${baseColor} ${bgColor} ${highlight ? "px-2 py-1 rounded" : ""}`}>
        {rate >= 0 ? "+" : ""}{rate.toFixed(4)}%
      </span>
    );
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "-";
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getDexShortName = (dex: string) => {
    const names: Record<string, string> = {
      Hyperliquid: "HL",
      Pacifica: "PC",
      Variational: "VR",
    };
    return names[dex] || dex;
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-[#141414] border border-[#262626] rounded-lg px-3 py-2">
              <span className={`w-2 h-2 rounded-full ${isRefreshing ? "bg-yellow-400 animate-pulse" : "bg-green-400 animate-pulse"}`}></span>
              <span className="text-[#737373]">
                {isRefreshing ? "업데이트 중..." : `${countdown}초 후 갱신`}
              </span>
            </div>
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              새로고침
            </button>
          </div>
        </div>
        <p className="text-[#737373]">실시간 펀딩비 + 김치 프리미엄 모니터링</p>
        {lastUpdate && (
          <p className="text-xs text-[#525252] mt-1">마지막 업데이트: {lastUpdate}</p>
        )}
      </div>

      {/* Kimchi Premium Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Kimchi Premium (김치 프리미엄)</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#737373]">
              환율: ${exchangeRate.toLocaleString()}원
            </span>
            <span className={`text-lg font-bold ${avgKimchi > 0 ? "text-red-400" : "text-green-400"}`}>
              평균 {avgKimchi >= 0 ? "+" : ""}{avgKimchi.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {kimchi.slice(0, 10).map((item) => (
            <div
              key={item.coin}
              className={`bg-[#141414] border rounded-lg p-4 ${
                item.premium !== null && item.premium > 3
                  ? "border-red-500/50 bg-red-500/5"
                  : item.premium !== null && item.premium < -1
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-[#262626]"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">{item.coin}</span>
                <span
                  className={`text-sm font-mono font-bold ${
                    item.premium === null
                      ? "text-[#525252]"
                      : item.premium > 2
                      ? "text-red-400"
                      : item.premium > 0
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                >
                  {item.premium !== null
                    ? `${item.premium >= 0 ? "+" : ""}${item.premium.toFixed(2)}%`
                    : "-"}
                </span>
              </div>
              <div className="text-xs text-[#737373] space-y-1">
                <div className="flex justify-between">
                  <span>업비트</span>
                  <span className="text-[#a3a3a3]">
                    {item.upbitKRW ? `₩${item.upbitKRW.toLocaleString()}` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>바이낸스</span>
                  <span className="text-[#a3a3a3]">
                    {item.binanceUSD ? `$${item.binanceUSD.toLocaleString()}` : "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs text-[#525252]">
          🔴 양수 = 한국이 비쌈 (역프 기회) · 🟢 음수 = 한국이 쌈 (정프 기회)
        </div>
      </div>

      {/* Top Arbitrage Opportunities */}
      {arbitrage.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Best Arbitrage Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {arbitrage.map((opp, idx) => (
              <div
                key={opp.coin}
                className={`bg-[#141414] border rounded-xl p-5 ${
                  idx === 0 ? "border-yellow-500/50 bg-yellow-500/5" : "border-[#262626]"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-2xl font-bold">{opp.coin}</span>
                    {idx === 0 && (
                      <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                        TOP
                      </span>
                    )}
                  </div>
                  <span className="text-xl font-mono text-green-400">
                    +{opp.spread.toFixed(4)}%
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Long ({getDexShortName(opp.longDex)})</span>
                    <span className="text-green-400">{opp.longRate >= 0 ? "+" : ""}{opp.longRate.toFixed(4)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Short ({getDexShortName(opp.shortDex)})</span>
                    <span className="text-red-400">{opp.shortRate >= 0 ? "+" : ""}{opp.shortRate.toFixed(4)}%</span>
                  </div>
                  <div className="pt-2 border-t border-[#262626] flex justify-between">
                    <span className="text-[#737373]">예상 일일 수익</span>
                    <span className="text-blue-400 font-semibold">+{opp.estimatedDaily.toFixed(4)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funding Rate Table */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-[#262626]">
          <h2 className="text-xl font-semibold">All Funding Rates</h2>
          <p className="text-sm text-[#737373] mt-1">
            🔴 양수 = 숏 유리 (롱이 숏에게 지불) · 🟢 음수 = 롱 유리 (숏이 롱에게 지불)
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#737373]">
            <div className="inline-block animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full mb-2"></div>
            <p>데이터 로딩 중...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left p-4 font-medium text-[#737373]">코인</th>
                  <th className="text-right p-4 font-medium text-[#737373]">가격</th>
                  <th className="text-right p-4 font-medium text-[#737373]">
                    <span className="flex items-center justify-end gap-1">
                      Hyperliquid
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">HL</span>
                    </span>
                  </th>
                  <th className="text-right p-4 font-medium text-[#737373]">
                    <span className="flex items-center justify-end gap-1">
                      Pacifica
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">PC</span>
                    </span>
                  </th>
                  <th className="text-right p-4 font-medium text-[#737373]">
                    <span className="flex items-center justify-end gap-1">
                      Variational
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">VR</span>
                    </span>
                  </th>
                  <th className="text-right p-4 font-medium text-[#737373]">스프레드</th>
                  <th className="text-center p-4 font-medium text-[#737373]">전략</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.coin} className="border-t border-[#262626] hover:bg-[#1a1a1a] transition">
                    <td className="p-4">
                      <span className="font-semibold">{item.coin}</span>
                    </td>
                    <td className="p-4 text-right text-[#a3a3a3] font-mono">{formatPrice(item.price)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.hyperliquid, true)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.pacifica, true)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.variational, true)}</td>
                    <td className="p-4 text-right font-mono">
                      {item.spread !== null ? (
                        <span className={item.spread > 0.005 ? "text-green-400 font-semibold" : "text-[#737373]"}>
                          {item.spread.toFixed(4)}%
                        </span>
                      ) : (
                        <span className="text-[#525252]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {item.bestLong && item.bestShort && item.spread && item.spread > 0.001 ? (
                        <span className="text-xs">
                          <span className="text-green-400">L:{getDexShortName(item.bestLong)}</span>
                          {" / "}
                          <span className="text-red-400">S:{getDexShortName(item.bestShort)}</span>
                        </span>
                      ) : (
                        <span className="text-[#525252] text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">펀딩비란?</h3>
          <p className="text-sm text-[#737373]">
            선물 거래소에서 8시간마다 정산되는 수수료입니다.
            롱과 숏의 균형을 맞추기 위해 사용됩니다.
          </p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">차익거래 전략</h3>
          <p className="text-sm text-[#737373]">
            DEX 간 펀딩비 차이가 클 때, <span className="text-green-400">낮은 곳에서 롱</span> +{" "}
            <span className="text-red-400">높은 곳에서 숏</span>으로 차익을 얻습니다.
          </p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">알림 받기</h3>
          <p className="text-sm text-[#737373]">
            GitHub Actions로 1시간마다 자동 체크하고,
            조건 충족 시 텔레그램으로 알림을 보내드립니다.
          </p>
        </div>
      </div>

      {/* DEX Info */}
      <div className="mt-8 text-center text-xs text-[#525252]">
        <p>
          Data from:{" "}
          <span className="text-blue-400">Hyperliquid</span> ·{" "}
          <span className="text-purple-400">Pacifica (Solana)</span> ·{" "}
          <span className="text-orange-400">Variational (Arbitrum)</span>
        </p>
      </div>
    </div>
  );
}
