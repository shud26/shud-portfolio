import { NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || "7881191796:AAEB4mN7dMIj3jEN0PoWAo46z6TPX-hawfI";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "6329588659";

export async function POST(request: Request) {
  try {
    const { message, type } = await request.json();

    if (!message) {
      return NextResponse.json({ success: false, error: "Message required" }, { status: 400 });
    }

    // Format message based on type
    let formattedMessage = "";
    const timestamp = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    switch (type) {
      case "todo_complete":
        formattedMessage = `✅ 할 일 완료!\n\n📝 ${message}\n\n⏰ ${timestamp}`;
        break;
      case "todo_add":
        formattedMessage = `📌 새 할 일 추가\n\n📝 ${message}\n\n⏰ ${timestamp}`;
        break;
      case "daily_summary":
        formattedMessage = `📊 오늘의 요약\n\n${message}\n\n⏰ ${timestamp}`;
        break;
      default:
        formattedMessage = `📢 ${message}\n\n⏰ ${timestamp}`;
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
      }),
    });

    const data = await res.json();

    if (data.ok) {
      return NextResponse.json({ success: true, message: "알림 전송 완료!" });
    } else {
      return NextResponse.json({ success: false, error: data.description }, { status: 500 });
    }
  } catch (error) {
    console.error("Telegram API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 });
  }
}
