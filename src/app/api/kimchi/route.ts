import { NextResponse } from "next/server";

interface KimchiPremium {
  coin: string;
  krwPrice: number | null;
  usdPrice: number | null;
  premium: number | null;
}

// CoinGecko ID 매핑
const COINS = [
  { symbol: "BTC", geckoId: "bitcoin" },
  { symbol: "ETH", geckoId: "ethereum" },
  { symbol: "XRP", geckoId: "ripple" },
  { symbol: "SOL", geckoId: "solana" },
  { symbol: "DOGE", geckoId: "dogecoin" },
  { symbol: "ADA", geckoId: "cardano" },
  { symbol: "AVAX", geckoId: "avalanche-2" },
  { symbol: "LINK", geckoId: "chainlink" },
  { symbol: "DOT", geckoId: "polkadot" },
  { symbol: "MATIC", geckoId: "matic-network" },
];

export async function GET() {
  try {
    const result: KimchiPremium[] = COINS.map((coin) => ({
      coin: coin.symbol,
      krwPrice: null,
      usdPrice: null,
      premium: null,
    }));

    // 환율 가져오기
    let exchangeRate = 1450;
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

    // CoinGecko에서 KRW, USD 가격 가져오기
    try {
      const ids = COINS.map((c) => c.geckoId).join(",");
      const geckoRes = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=krw,usd`,
        { cache: "no-store" }
      );
      const geckoData = await geckoRes.json();

      for (const coin of COINS) {
        const item = result.find((r) => r.coin === coin.symbol);
        const data = geckoData[coin.geckoId];

        if (item && data) {
          item.krwPrice = data.krw || null;
          item.usdPrice = data.usd || null;

          // 김프 계산: (KRW가격/환율 - USD가격) / USD가격 * 100
          if (item.krwPrice && item.usdPrice) {
            const krwToUsd = item.krwPrice / exchangeRate;
            item.premium = ((krwToUsd - item.usdPrice) / item.usdPrice) * 100;
          }
        }
      }
    } catch (e) {
      console.error("CoinGecko error:", e);
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
