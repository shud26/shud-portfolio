"use client";

import { useEffect, useState } from "react";

interface FundingData {
  coin: string;
  hyperliquid: number | null;
  pacifica: number | null;
  variational: number | null;
  price: number | null;
}

export default function Dashboard() {
  const [data, setData] = useState<FundingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    try {
      // Fetch from Hyperliquid
      const hlRes = await fetch("https://api.hyperliquid.xyz/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "metaAndAssetCtxs" }),
      });
      const hlData = await hlRes.json();

      const coins = ["BTC", "ETH", "SOL"];
      const hlNames = hlData[0].universe.map((a: { name: string }) => a.name);

      const result: FundingData[] = coins.map((coin) => {
        const hlIndex = hlNames.indexOf(coin);
        const hlCtx = hlIndex >= 0 ? hlData[1][hlIndex] : null;

        return {
          coin,
          hyperliquid: hlCtx ? parseFloat(hlCtx.funding) * 100 : null,
          pacifica: null,
          variational: null,
          price: hlCtx ? parseFloat(hlCtx.markPx) : null,
        };
      });

      // Fetch Pacifica for each coin
      for (const item of result) {
        try {
          const pcRes = await fetch(
            `https://api.pacifica.fi/api/v1/funding_rate/history?symbol=${item.coin}&limit=1`
          );
          const pcData = await pcRes.json();
          if (pcData.success && pcData.data?.[0]) {
            item.pacifica = parseFloat(pcData.data[0].funding_rate) * 100;
          }
        } catch {}
      }

      // Fetch Variational
      try {
        const vrRes = await fetch(
          "https://omni-client-api.prod.ap-northeast-1.variational.io/metadata/stats"
        );
        const vrData = await vrRes.json();
        for (const listing of vrData.listings || []) {
          const item = result.find((r) => r.coin === listing.ticker);
          if (item) {
            item.variational = parseFloat(listing.funding_rate) / 8; // 8시간 → 1시간
          }
        }
      } catch {}

      setData(result);
      setLastUpdate(new Date().toLocaleTimeString("ko-KR"));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  const formatRate = (rate: number | null) => {
    if (rate === null) return "N/A";
    const color = rate > 0 ? "text-red-400" : rate < 0 ? "text-green-400" : "text-[#737373]";
    return <span className={color}>{rate >= 0 ? "+" : ""}{rate.toFixed(4)}%</span>;
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "N/A";
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live
          </div>
        </div>
        <p className="text-[#737373]">실시간 펀딩비 모니터링</p>
        {lastUpdate && (
          <p className="text-xs text-[#525252] mt-2">마지막 업데이트: {lastUpdate}</p>
        )}
      </div>

      {/* Funding Rate Table */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-[#262626]">
          <h2 className="text-xl font-semibold">펀딩비 비교</h2>
          <p className="text-sm text-[#737373] mt-1">
            🔴 양수 = 숏 유리 · 🟢 음수 = 롱 유리
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
                  <th className="text-left p-4 font-medium text-[#737373]">가격</th>
                  <th className="text-right p-4 font-medium text-[#737373]">Hyperliquid</th>
                  <th className="text-right p-4 font-medium text-[#737373]">Pacifica</th>
                  <th className="text-right p-4 font-medium text-[#737373]">Variational</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.coin} className="border-t border-[#262626] hover:bg-[#1a1a1a]">
                    <td className="p-4 font-semibold">{item.coin}</td>
                    <td className="p-4 text-[#a3a3a3]">{formatPrice(item.price)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.hyperliquid)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.pacifica)}</td>
                    <td className="p-4 text-right font-mono">{formatRate(item.variational)}</td>
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
          <h3 className="text-lg font-semibold mb-2">차익거래</h3>
          <p className="text-sm text-[#737373]">
            DEX 간 펀딩비 차이가 클 때, 높은 곳에서 숏 + 낮은 곳에서 롱으로
            펀딩비 차익을 얻을 수 있습니다.
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
    </div>
  );
}
