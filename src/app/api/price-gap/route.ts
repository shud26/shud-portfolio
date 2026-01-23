import { NextResponse } from "next/server";

interface PriceGap {
  coin: string;
  prices: {
    exchange: string;
    price: number;
  }[];
  maxGap: number;
  highExchange: string;
  lowExchange: string;
  highPrice: number;
  lowPrice: number;
}

// 텔레그램 알림 전송
async function sendTelegramAlert(gaps: PriceGap[]) {
  const token = process.env.TELEGRAM_TOKEN || "7881191796:AAEB4mN7dMIj3jEN0PoWAo46z6TPX-hawfI";
  const chatId = process.env.TELEGRAM_CHAT_ID || "6329588659";

  if (gaps.length === 0) return;

  let msg = "🚨 <b>가격 갭 알림! (1% 이상)</b>\n\n";

  for (const gap of gaps.slice(0, 5)) {
    msg += `<b>${gap.coin}</b>: ${gap.maxGap.toFixed(2)}%\n`;
    msg += `  📈 ${gap.highExchange}: $${gap.highPrice.toFixed(4)}\n`;
    msg += `  📉 ${gap.lowExchange}: $${gap.lowPrice.toFixed(4)}\n`;
    msg += `  💡 ${gap.lowExchange}에서 사서 ${gap.highExchange}에서 팔기\n\n`;
  }

  msg += `⏰ ${new Date().toLocaleTimeString("ko-KR")}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
        parse_mode: "HTML",
      }),
    });
  } catch (e) {
    console.error("Telegram error:", e);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threshold = parseFloat(searchParams.get("threshold") || "1");
  const sendAlert = searchParams.get("alert") === "true";

  try {
    // 1. Hyperliquid 전체 가격 가져오기
    const hlPrices: Record<string, number> = {};
    try {
      const hlRes = await fetch("https://api.hyperliquid.xyz/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "allMids" }),
        cache: "no-store",
      });
      const hlData = await hlRes.json();
      for (const [coin, price] of Object.entries(hlData)) {
        if (typeof price === "string") {
          hlPrices[coin] = parseFloat(price);
        }
      }
    } catch (e) {
      console.error("Hyperliquid error:", e);
    }

    // 2. Binance 전체 가격
    const binancePrices: Record<string, number> = {};
    try {
      const bnRes = await fetch("https://fapi.binance.com/fapi/v1/ticker/price", {
        cache: "no-store",
      });
      const bnData = await bnRes.json();
      for (const item of bnData) {
        if (item.symbol.endsWith("USDT")) {
          const coin = item.symbol.replace("USDT", "");
          binancePrices[coin] = parseFloat(item.price);
        }
      }
    } catch (e) {
      console.error("Binance error:", e);
    }

    // 3. Bybit 전체 가격
    const bybitPrices: Record<string, number> = {};
    try {
      const bbRes = await fetch(
        "https://api.bybit.com/v5/market/tickers?category=linear",
        { cache: "no-store" }
      );
      const bbData = await bbRes.json();
      for (const item of bbData.result?.list || []) {
        if (item.symbol.endsWith("USDT")) {
          const coin = item.symbol.replace("USDT", "");
          bybitPrices[coin] = parseFloat(item.lastPrice);
        }
      }
    } catch (e) {
      console.error("Bybit error:", e);
    }

    // 4. OKX 전체 가격
    const okxPrices: Record<string, number> = {};
    try {
      const okxRes = await fetch(
        "https://www.okx.com/api/v5/market/tickers?instType=SWAP",
        { cache: "no-store" }
      );
      const okxData = await okxRes.json();
      for (const item of okxData.data || []) {
        if (item.instId.includes("-USDT-SWAP")) {
          const coin = item.instId.split("-")[0];
          okxPrices[coin] = parseFloat(item.last);
        }
      }
    } catch (e) {
      console.error("OKX error:", e);
    }

    // 5. Bitget 전체 가격
    const bitgetPrices: Record<string, number> = {};
    try {
      const bgRes = await fetch(
        "https://api.bitget.com/api/v2/mix/market/tickers?productType=USDT-FUTURES",
        { cache: "no-store" }
      );
      const bgData = await bgRes.json();
      for (const item of bgData.data || []) {
        if (item.symbol.endsWith("USDT")) {
          const coin = item.symbol.replace("USDT", "");
          bitgetPrices[coin] = parseFloat(item.lastPr);
        }
      }
    } catch (e) {
      console.error("Bitget error:", e);
    }

    // 6. Hyperliquid 코인 기준으로 가격 갭 계산
    const gaps: PriceGap[] = [];

    for (const coin of Object.keys(hlPrices)) {
      // @로 시작하는 토큰 제외 (Hyperliquid 내부 토큰)
      if (coin.startsWith("@") || coin.startsWith("k")) continue;

      const prices: { exchange: string; price: number }[] = [];

      if (hlPrices[coin]) prices.push({ exchange: "Hyperliquid", price: hlPrices[coin] });
      if (binancePrices[coin]) prices.push({ exchange: "Binance", price: binancePrices[coin] });
      if (bybitPrices[coin]) prices.push({ exchange: "Bybit", price: bybitPrices[coin] });
      if (okxPrices[coin]) prices.push({ exchange: "OKX", price: okxPrices[coin] });
      if (bitgetPrices[coin]) prices.push({ exchange: "Bitget", price: bitgetPrices[coin] });

      // 최소 3개 거래소에서 가격이 있어야 함 (신뢰도 높임)
      if (prices.length < 3) continue;

      // 최고/최저 가격 찾기
      const sorted = [...prices].sort((a, b) => a.price - b.price);
      const low = sorted[0];
      const high = sorted[sorted.length - 1];

      const avgPrice = (low.price + high.price) / 2;
      const gapPct = ((high.price - low.price) / avgPrice) * 100;

      // 임계값 이상 & 15% 미만만 추가 (15% 이상은 다른 토큰이거나 유동성 문제)
      if (gapPct >= threshold && gapPct < 15) {
        gaps.push({
          coin,
          prices,
          maxGap: gapPct,
          highExchange: high.exchange,
          lowExchange: low.exchange,
          highPrice: high.price,
          lowPrice: low.price,
        });
      }
    }

    // 갭 크기로 정렬
    gaps.sort((a, b) => b.maxGap - a.maxGap);

    // 텔레그램 알림 (요청 시)
    if (sendAlert && gaps.length > 0) {
      await sendTelegramAlert(gaps);
    }

    return NextResponse.json({
      success: true,
      threshold,
      count: gaps.length,
      gaps: gaps.slice(0, 20), // 상위 20개만
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch price gap data" },
      { status: 500 }
    );
  }
}
