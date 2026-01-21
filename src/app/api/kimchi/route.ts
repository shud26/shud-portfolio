import { NextResponse } from "next/server";

interface KimchiPremium {
  coin: string;
  upbitKRW: number | null;
  binanceUSD: number | null;
  premium: number | null;
}

// 주요 코인들 (업비트에서 거래량 많은 것들)
const COINS = [
  { symbol: "BTC", upbit: "KRW-BTC", binance: "BTCUSDT" },
  { symbol: "ETH", upbit: "KRW-ETH", binance: "ETHUSDT" },
  { symbol: "XRP", upbit: "KRW-XRP", binance: "XRPUSDT" },
  { symbol: "SOL", upbit: "KRW-SOL", binance: "SOLUSDT" },
  { symbol: "DOGE", upbit: "KRW-DOGE", binance: "DOGEUSDT" },
  { symbol: "ADA", upbit: "KRW-ADA", binance: "ADAUSDT" },
  { symbol: "AVAX", upbit: "KRW-AVAX", binance: "AVAXUSDT" },
  { symbol: "LINK", upbit: "KRW-LINK", binance: "LINKUSDT" },
  { symbol: "DOT", upbit: "KRW-DOT", binance: "DOTUSDT" },
  { symbol: "MATIC", upbit: "KRW-MATIC", binance: "MATICUSDT" },
];

export async function GET() {
  try {
    const result: KimchiPremium[] = COINS.map((coin) => ({
      coin: coin.symbol,
      upbitKRW: null,
      binanceUSD: null,
      premium: null,
    }));

    // 1. 환율 가져오기 (USD/KRW)
    let exchangeRate = 1450; // 기본값
    try {
      const rateRes = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD",
        { cache: "no-store" }
      );
      const rateData = await rateRes.json();
      exchangeRate = rateData.rates?.KRW || 1450;
    } catch (e) {
      console.error("Exchange rate error:", e);
    }

    // 2. 업비트 가격 가져오기
    try {
      const markets = COINS.map((c) => c.upbit).join(",");
      const upbitRes = await fetch(
        `https://api.upbit.com/v1/ticker?markets=${markets}`,
        { cache: "no-store" }
      );
      const upbitData = await upbitRes.json();

      for (const ticker of upbitData) {
        const coin = COINS.find((c) => c.upbit === ticker.market);
        if (coin) {
          const item = result.find((r) => r.coin === coin.symbol);
          if (item) {
            item.upbitKRW = ticker.trade_price;
          }
        }
      }
    } catch (e) {
      console.error("Upbit error:", e);
    }

    // 3. 바이낸스 가격 가져오기
    try {
      const binanceRes = await fetch(
        "https://api.binance.com/api/v3/ticker/price",
        { cache: "no-store" }
      );
      const binanceData = await binanceRes.json();

      for (const ticker of binanceData) {
        const coin = COINS.find((c) => c.binance === ticker.symbol);
        if (coin) {
          const item = result.find((r) => r.coin === coin.symbol);
          if (item) {
            item.binanceUSD = parseFloat(ticker.price);
          }
        }
      }
    } catch (e) {
      console.error("Binance error:", e);
    }

    // 4. 김프 계산
    for (const item of result) {
      if (item.upbitKRW && item.binanceUSD) {
        const upbitUSD = item.upbitKRW / exchangeRate;
        item.premium = ((upbitUSD - item.binanceUSD) / item.binanceUSD) * 100;
      }
    }

    // 김프 높은 순으로 정렬
    result.sort((a, b) => {
      if (a.premium === null) return 1;
      if (b.premium === null) return -1;
      return b.premium - a.premium;
    });

    // 평균 김프 계산
    const validPremiums = result
      .filter((r) => r.premium !== null)
      .map((r) => r.premium!);
    const avgPremium =
      validPremiums.length > 0
        ? validPremiums.reduce((a, b) => a + b, 0) / validPremiums.length
        : 0;

    return NextResponse.json({
      success: true,
      data: result,
      exchangeRate,
      avgPremium,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Kimchi API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch kimchi premium data" },
      { status: 500 }
    );
  }
}
