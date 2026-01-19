import { NextResponse } from "next/server";

interface FundingData {
  coin: string;
  hyperliquid: number | null;
  pacifica: number | null;
  variational: number | null;
  price: number | null;
}

export async function GET() {
  try {
    const coins = ["BTC", "ETH", "SOL"];
    const result: FundingData[] = coins.map((coin) => ({
      coin,
      hyperliquid: null,
      pacifica: null,
      variational: null,
      price: null,
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

    return NextResponse.json({
      success: true,
      data: result,
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
