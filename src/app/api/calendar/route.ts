import { NextResponse } from "next/server";

// Google OAuth 토큰 정보 (환경변수로 관리)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || "";

// Access Token 가져오기 (Refresh Token 사용)
async function getAccessToken(): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Failed to get access token");
  }
  return data.access_token;
}

// Google Calendar 이벤트 생성
async function createCalendarEvent(
  accessToken: string,
  title: string,
  date: string,
  time?: string,
  deadline?: string
) {
  const calendarId = "primary";

  let event: Record<string, unknown>;

  if (time) {
    // 시간이 있으면 특정 시간 이벤트
    const startDateTime = `${date}T${time}:00`;
    const [hours, minutes] = time.split(":").map(Number);
    const endHours = hours + 1;
    const endTime = `${String(endHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const endDateTime = `${date}T${endTime}:00`;

    event = {
      summary: `📋 ${title}`,
      description: deadline ? `데드라인: ${deadline}` : undefined,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Seoul",
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 30 }],
      },
    };
  } else {
    // 시간이 없으면 종일 이벤트
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split("T")[0];

    event = {
      summary: `📋 ${title}`,
      description: deadline ? `데드라인: ${deadline}` : undefined,
      start: { date },
      end: { date: endDateStr },
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 540 }], // 당일 오전 9시
      },
    };
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  const data = await response.json();
  return data;
}

// 캘린더 이벤트 업데이트 (완료 표시)
async function updateCalendarEvent(
  accessToken: string,
  eventId: string,
  title: string,
  completed: boolean
) {
  const calendarId = "primary";

  // 먼저 기존 이벤트 가져오기
  const getResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!getResponse.ok) return null;

  const event = await getResponse.json();
  event.summary = completed ? `✅ ${title}` : `📋 ${title}`;

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  return response.json();
}

// 캘린더 이벤트 삭제
async function deleteCalendarEvent(accessToken: string, eventId: string) {
  const calendarId = "primary";

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return response.ok;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, title, date, time, deadline, eventId, completed } = body;

    const accessToken = await getAccessToken();

    if (action === "create") {
      const event = await createCalendarEvent(accessToken, title, date, time, deadline);
      return NextResponse.json({
        success: true,
        eventId: event.id,
        eventLink: event.htmlLink,
      });
    }

    if (action === "update") {
      await updateCalendarEvent(accessToken, eventId, title, completed);
      return NextResponse.json({ success: true });
    }

    if (action === "delete") {
      await deleteCalendarEvent(accessToken, eventId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json(
      { success: false, error: "Calendar API failed" },
      { status: 500 }
    );
  }
}
