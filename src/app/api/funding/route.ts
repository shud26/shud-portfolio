import { NextResponse } from "next/server";

interface FundingData {
  coin: string;
  hyperliquid: number | null;
  pacifica: number | null;
  variational: number | null;
  price: number | null;
  maxRate: number | null;
  minRate: number | null;
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

export async function GET() {
  try {
    const coins = ["BTC", "ETH", "SOL", "DOGE", "AVAX", "ARB", "SUI", "LINK", "XRP"];
    const result: FundingData[] = coins.map((coin) => ({
      coin,
      hyperliquid: null,
      pacifica: null,
      variational: null,
      price: null,
      maxRate: null,
      minRate: null,
      spread: null,
      bestLong: null,
      bestShort: null,
    }));

    // Fetch from Hyperliquid
    try {
      const hlRes = await fetch("https://api.hyperliquid.xyz/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "metaAndAssetCtxs" }),
        cache: "no-store",
      });
      const hlData = await hlRes.json();
      const hlNames = hlData[0].universe.map((a: { name: string }) => a.name);

      for (const item of result) {
        const hlIndex = hlNames.indexOf(item.coin);
        if (hlIndex >= 0) {
          const hlCtx = hlData[1][hlIndex];
          item.hyperliquid = parseFloat(hlCtx.funding) * 100;
          item.price = parseFloat(hlCtx.markPx);
        }
      }
    } catch (e) {
      console.error("Hyperliquid error:", e);
    }

    // Fetch from Pacifica
    for (const item of result) {
      try {
        const pcRes = await fetch(
          `https://api.pacifica.fi/api/v1/funding_rate/history?symbol=${item.coin}&limit=1`,
          { cache: "no-store" }
        );
        const pcData = await pcRes.json();
        if (pcData.success && pcData.data?.[0]) {
          item.pacifica = parseFloat(pcData.data[0].funding_rate) * 100;
        }
      } catch (e) {
        console.error(`Pacifica ${item.coin} error:`, e);
      }
    }

    // Fetch from Variational
    try {
      const vrRes = await fetch(
        "https://omni-client-api.prod.ap-northeast-1.variational.io/metadata/stats",
        { cache: "no-store" }
      );
      const vrData = await vrRes.json();
      for (const listing of vrData.listings || []) {
        const item = result.find((r) => r.coin === listing.ticker);
        if (item) {
          item.variational = parseFloat(listing.funding_rate) / 8; // 8시간 → 1시간
        }
      }
    } catch (e) {
      console.error("Variational error:", e);
    }

    // Calculate arbitrage opportunities
    for (const item of result) {
      const rates: { dex: string; rate: number }[] = [];
      if (item.hyperliquid !== null) rates.push({ dex: "Hyperliquid", rate: item.hyperliquid });
      if (item.pacifica !== null) rates.push({ dex: "Pacifica", rate: item.pacifica });
      if (item.variational !== null) rates.push({ dex: "Variational", rate: item.variational });

      if (rates.length >= 2) {
        const sorted = [...rates].sort((a, b) => a.rate - b.rate);
        item.minRate = sorted[0].rate;
        item.maxRate = sorted[sorted.length - 1].rate;
        item.spread = item.maxRate - item.minRate;
        item.bestLong = sorted[0].dex; // lowest rate = best for long
        item.bestShort = sorted[sorted.length - 1].dex; // highest rate = best for short
      }
    }

    // Find top arbitrage opportunities
    const arbitrageOpportunities: ArbitrageOpportunity[] = result
      .filter((item) => item.spread !== null && item.spread > 0)
      .map((item) => ({
        coin: item.coin,
        spread: item.spread!,
        longDex: item.bestLong!,
        shortDex: item.bestShort!,
        longRate: item.minRate!,
        shortRate: item.maxRate!,
        estimatedDaily: item.spread! * 3, // 8시간마다 3번 = 일일 예상
      }))
      .sort((a, b) => b.spread - a.spread)
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      data: result,
      arbitrage: arbitrageOpportunities,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch funding data" },
      { status: 500 }
    );
  }
}
