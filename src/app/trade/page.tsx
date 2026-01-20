"use client";

import { useEffect, useState, useCallback } from "react";

interface Position {
  id: string;
  coin: string;
  type: "long" | "short";
  entryPrice: number;
  amount: number;
  leverage: number;
  openedAt: string;
}

interface Trade {
  id: string;
  coin: string;
  type: "long" | "short";
  entryPrice: number;
  exitPrice: number;
  amount: number;
  leverage: number;
  pnl: number;
  pnlPercent: number;
  closedAt: string;
}

interface CoinPrice {
  coin: string;
  price: number;
}

const INITIAL_BALANCE = 10000;

export default function TradePage() {
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [positions, setPositions] = useState<Position[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);

  // Trade form
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [tradeType, setTradeType] = useState<"long" | "short">("long");
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(1);

  // Load data from localStorage
  useEffect(() => {
    setMounted(true);
    const savedBalance = localStorage.getItem("paper-balance");
    const savedPositions = localStorage.getItem("paper-positions");
    const savedTrades = localStorage.getItem("paper-trades");

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedPositions) setPositions(JSON.parse(savedPositions));
    if (savedTrades) setTrades(JSON.parse(savedTrades));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("paper-balance", balance.toString());
      localStorage.setItem("paper-positions", JSON.stringify(positions));
      localStorage.setItem("paper-trades", JSON.stringify(trades));
    }
  }, [balance, positions, trades, mounted]);

  // Fetch prices
  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch("/api/funding");
      const json = await res.json();
      if (json.success) {
        setPrices(
          json.data
            .filter((d: { price: number | null }) => d.price !== null)
            .map((d: { coin: string; price: number }) => ({ coin: d.coin, price: d.price }))
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch prices:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const getCurrentPrice = (coin: string) => {
    return prices.find((p) => p.coin === coin)?.price || 0;
  };

  const openPosition = () => {
    const tradeAmount = parseFloat(amount);
    if (!tradeAmount || tradeAmount <= 0) return;
    if (tradeAmount > balance) {
      alert("잔고가 부족합니다!");
      return;
    }

    const currentPrice = getCurrentPrice(selectedCoin);
    if (!currentPrice) {
      alert("가격 정보를 가져올 수 없습니다.");
      return;
    }

    const newPosition: Position = {
      id: Date.now().toString(),
      coin: selectedCoin,
      type: tradeType,
      entryPrice: currentPrice,
      amount: tradeAmount,
      leverage,
      openedAt: new Date().toISOString(),
    };

    setPositions([...positions, newPosition]);
    setBalance(balance - tradeAmount);
    setAmount("");
  };

  const closePosition = (position: Position) => {
    const currentPrice = getCurrentPrice(position.coin);
    if (!currentPrice) return;

    // Calculate PnL
    const priceChange = (currentPrice - position.entryPrice) / position.entryPrice;
    const pnlPercent = position.type === "long" ? priceChange * 100 * position.leverage : -priceChange * 100 * position.leverage;
    const pnl = (position.amount * pnlPercent) / 100;

    const newTrade: Trade = {
      id: Date.now().toString(),
      coin: position.coin,
      type: position.type,
      entryPrice: position.entryPrice,
      exitPrice: currentPrice,
      amount: position.amount,
      leverage: position.leverage,
      pnl,
      pnlPercent,
      closedAt: new Date().toISOString(),
    };

    setTrades([newTrade, ...trades]);
    setPositions(positions.filter((p) => p.id !== position.id));
    setBalance(balance + position.amount + pnl);
  };

  const calculatePositionPnL = (position: Position) => {
    const currentPrice = getCurrentPrice(position.coin);
    if (!currentPrice) return { pnl: 0, pnlPercent: 0 };

    const priceChange = (currentPrice - position.entryPrice) / position.entryPrice;
    const pnlPercent = position.type === "long" ? priceChange * 100 * position.leverage : -priceChange * 100 * position.leverage;
    const pnl = (position.amount * pnlPercent) / 100;

    return { pnl, pnlPercent };
  };

  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = trades.length > 0 ? (trades.filter((t) => t.pnl > 0).length / trades.length) * 100 : 0;

  const unrealizedPnL = positions.reduce((sum, p) => {
    const { pnl } = calculatePositionPnL(p);
    return sum + pnl;
  }, 0);

  const resetAccount = () => {
    if (confirm("계좌를 초기화하시겠습니까? 모든 거래 내역이 삭제됩니다.")) {
      setBalance(INITIAL_BALANCE);
      setPositions([]);
      setTrades([]);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold">Paper Trading</h1>
            <p className="text-[#737373]">가상 자금으로 매매 연습</p>
          </div>
          <button
            onClick={resetAccount}
            className="text-sm text-[#525252] hover:text-red-400 transition"
          >
            계좌 초기화
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <p className="text-sm text-[#737373] mb-1">잔고</p>
          <p className="text-xl font-bold">${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <p className="text-sm text-[#737373] mb-1">미실현 손익</p>
          <p className={`text-xl font-bold ${unrealizedPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
            {unrealizedPnL >= 0 ? "+" : ""}${unrealizedPnL.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <p className="text-sm text-[#737373] mb-1">실현 손익</p>
          <p className={`text-xl font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <p className="text-sm text-[#737373] mb-1">승률</p>
          <p className="text-xl font-bold">{winRate.toFixed(1)}%</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
          <p className="text-sm text-[#737373] mb-1">총 거래</p>
          <p className="text-xl font-bold">{trades.length}회</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Trade Form */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">새 포지션</h2>

          {loading ? (
            <div className="text-center py-8 text-[#737373]">가격 로딩 중...</div>
          ) : (
            <div className="space-y-4">
              {/* Coin Select */}
              <div>
                <label className="block text-sm text-[#737373] mb-2">코인</label>
                <div className="grid grid-cols-3 gap-2">
                  {prices.slice(0, 6).map((p) => (
                    <button
                      key={p.coin}
                      onClick={() => setSelectedCoin(p.coin)}
                      className={`p-3 rounded-lg text-sm transition ${
                        selectedCoin === p.coin
                          ? "bg-blue-500 text-white"
                          : "bg-[#0a0a0a] text-[#737373] hover:text-white"
                      }`}
                    >
                      <div className="font-semibold">{p.coin}</div>
                      <div className="text-xs">${p.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Long/Short */}
              <div>
                <label className="block text-sm text-[#737373] mb-2">방향</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTradeType("long")}
                    className={`p-3 rounded-lg font-semibold transition ${
                      tradeType === "long"
                        ? "bg-green-500 text-white"
                        : "bg-[#0a0a0a] text-[#737373] hover:text-green-400"
                    }`}
                  >
                    Long (매수)
                  </button>
                  <button
                    onClick={() => setTradeType("short")}
                    className={`p-3 rounded-lg font-semibold transition ${
                      tradeType === "short"
                        ? "bg-red-500 text-white"
                        : "bg-[#0a0a0a] text-[#737373] hover:text-red-400"
                    }`}
                  >
                    Short (매도)
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm text-[#737373] mb-2">금액 (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAmount(v.toString())}
                      className="px-3 py-1 bg-[#0a0a0a] rounded text-xs text-[#737373] hover:text-white transition"
                    >
                      ${v}
                    </button>
                  ))}
                  <button
                    onClick={() => setAmount(Math.floor(balance).toString())}
                    className="px-3 py-1 bg-[#0a0a0a] rounded text-xs text-[#737373] hover:text-white transition"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Leverage */}
              <div>
                <label className="block text-sm text-[#737373] mb-2">레버리지: {leverage}x</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#525252]">
                  <span>1x</span>
                  <span>5x</span>
                  <span>10x</span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={openPosition}
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-4 rounded-xl font-semibold text-white transition ${
                  tradeType === "long"
                    ? "bg-green-500 hover:bg-green-600 disabled:bg-green-500/30"
                    : "bg-red-500 hover:bg-red-600 disabled:bg-red-500/30"
                }`}
              >
                {tradeType === "long" ? "Long 열기" : "Short 열기"}
              </button>
            </div>
          )}
        </div>

        {/* Open Positions */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">열린 포지션 ({positions.length})</h2>

          {positions.length === 0 ? (
            <div className="text-center py-8 text-[#525252]">열린 포지션이 없습니다</div>
          ) : (
            <div className="space-y-3">
              {positions.map((position) => {
                const { pnl, pnlPercent } = calculatePositionPnL(position);
                const currentPrice = getCurrentPrice(position.coin);

                return (
                  <div
                    key={position.id}
                    className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{position.coin}</span>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded ${
                            position.type === "long"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {position.type.toUpperCase()} {position.leverage}x
                        </span>
                      </div>
                      <span className={`font-mono ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {pnl >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-[#737373] mb-3">
                      <div>진입가: ${position.entryPrice.toLocaleString()}</div>
                      <div>현재가: ${currentPrice.toLocaleString()}</div>
                      <div>금액: ${position.amount}</div>
                      <div className={pnl >= 0 ? "text-green-400" : "text-red-400"}>
                        손익: {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => closePosition(position)}
                      className="w-full py-2 bg-[#262626] hover:bg-[#363636] rounded-lg text-sm transition"
                    >
                      포지션 청산
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Trade History */}
      <div className="mt-8 bg-[#141414] border border-[#262626] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">거래 내역</h2>

        {trades.length === 0 ? (
          <div className="text-center py-8 text-[#525252]">거래 내역이 없습니다</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[#737373] text-sm">
                  <th className="pb-3">코인</th>
                  <th className="pb-3">타입</th>
                  <th className="pb-3">진입가</th>
                  <th className="pb-3">청산가</th>
                  <th className="pb-3">금액</th>
                  <th className="pb-3">손익</th>
                  <th className="pb-3">시간</th>
                </tr>
              </thead>
              <tbody>
                {trades.slice(0, 10).map((trade) => (
                  <tr key={trade.id} className="border-t border-[#262626]">
                    <td className="py-3 font-semibold">{trade.coin}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          trade.type === "long"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.type.toUpperCase()} {trade.leverage}x
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm">${trade.entryPrice.toLocaleString()}</td>
                    <td className="py-3 font-mono text-sm">${trade.exitPrice.toLocaleString()}</td>
                    <td className="py-3">${trade.amount}</td>
                    <td className={`py-3 font-mono ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)} ({trade.pnlPercent.toFixed(2)}%)
                    </td>
                    <td className="py-3 text-sm text-[#737373]">
                      {new Date(trade.closedAt).toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="font-semibold mb-2">페이퍼 트레이딩이란?</h3>
        <p className="text-sm text-[#a3a3a3]">
          실제 돈을 사용하지 않고 가상 자금($10,000)으로 매매를 연습합니다.
          실제 시장 가격을 기반으로 하지만, 실제 거래는 이루어지지 않습니다.
          전략을 테스트하고 경험을 쌓는 데 활용하세요!
        </p>
      </div>
    </div>
  );
}
