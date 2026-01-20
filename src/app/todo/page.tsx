"use client";

import { useEffect, useState } from "react";

const CORRECT_PIN = "1507";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  // 새로운 필드들
  date?: string;
  time?: string;
  deadline?: string;
  calendarEventId?: string;
}

export default function TodoPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "today" | "upcoming">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [calendarEnabled, setCalendarEnabled] = useState(true);

  // Wait for client-side mount
  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem("shud-todo-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load todos from localStorage
  useEffect(() => {
    if (mounted && isAuthenticated) {
      const saved = localStorage.getItem("shud-todos-v2");
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    }
  }, [mounted, isAuthenticated]);

  // Save todos to localStorage
  useEffect(() => {
    if (mounted && isAuthenticated && todos.length >= 0) {
      localStorage.setItem("shud-todos-v2", JSON.stringify(todos));
    }
  }, [todos, mounted, isAuthenticated]);

  // Show loading until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handlePinSubmit = () => {
    if (pin === CORRECT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("shud-todo-auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  // PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Todo List</h1>
            <p className="text-[#737373] mb-6">PIN을 입력하세요</p>

            <div className="space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                  setPinError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                placeholder="••••"
                maxLength={4}
                className={`w-full text-center text-2xl tracking-[1em] bg-[#0a0a0a] border rounded-xl px-4 py-4 text-white placeholder-[#525252] focus:outline-none transition ${
                  pinError ? "border-red-500" : "border-[#262626] focus:border-blue-500"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-red-400 text-sm">PIN이 틀렸습니다</p>
              )}
              <button
                onClick={handlePinSubmit}
                disabled={pin.length !== 4}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-[#262626] disabled:text-[#525252] text-white py-3 rounded-xl font-medium transition"
              >
                확인
              </button>
            </div>
          </div>
          <p className="text-center text-[#525252] text-xs mt-4">
            shud의 개인 Todo List입니다
          </p>
        </div>
      </div>
    );
  }

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const sendTelegramNotification = async (message: string, type: string) => {
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, type }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "텔레그램 알림 전송됨!");
      }
    } catch (error) {
      console.error("Failed to send telegram:", error);
    }
  };

  const addToCalendar = async (title: string, date: string, time?: string, deadline?: string) => {
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title,
          date,
          time: time || undefined,
          deadline: deadline || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "캘린더에 추가됨!");
        return data.eventId;
      }
    } catch (error) {
      console.error("Failed to add to calendar:", error);
    }
    return null;
  };

  const updateCalendarEvent = async (eventId: string, title: string, completed: boolean) => {
    try {
      await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          eventId,
          title,
          completed,
        }),
      });
    } catch (error) {
      console.error("Failed to update calendar:", error);
    }
  };

  const deleteCalendarEvent = async (eventId: string) => {
    try {
      await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          eventId,
        }),
      });
    } catch (error) {
      console.error("Failed to delete calendar event:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    setIsLoading(true);

    const todoDate = newDate || new Date().toISOString().split("T")[0];

    let calendarEventId: string | null = null;
    if (calendarEnabled && newDate) {
      calendarEventId = await addToCalendar(newTodo, todoDate, newTime, newDeadline);
    }

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      date: newDate || undefined,
      time: newTime || undefined,
      deadline: newDeadline || undefined,
      calendarEventId: calendarEventId || undefined,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
    setNewDate("");
    setNewTime("");
    setNewDeadline("");
    setShowAdvanced(false);

    // Send telegram notification
    let telegramMsg = todo.text;
    if (todo.date) telegramMsg += `\n날짜: ${todo.date}`;
    if (todo.time) telegramMsg += ` ${todo.time}`;
    if (todo.deadline) telegramMsg += `\n데드라인: ${todo.deadline}`;
    await sendTelegramNotification(telegramMsg, "todo_add");

    setIsLoading(false);
  };

  const toggleTodo = async (id: string) => {
    setIsLoading(true);
    const todo = todos.find((t) => t.id === id);

    if (todo) {
      const newCompleted = !todo.completed;

      // Update calendar if exists
      if (todo.calendarEventId) {
        await updateCalendarEvent(todo.calendarEventId, todo.text, newCompleted);
      }

      if (!todo.completed) {
        await sendTelegramNotification(todo.text, "todo_complete");
      }
    }

    setTodos(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t
      )
    );
    setIsLoading(false);
  };

  const deleteTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);

    // Delete from calendar if exists
    if (todo?.calendarEventId) {
      await deleteCalendarEvent(todo.calendarEventId);
    }

    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter((t) => t.completed);
    completedTodos.forEach((todo) => {
      if (todo.calendarEventId) {
        deleteCalendarEvent(todo.calendarEventId);
      }
    });
    setTodos(todos.filter((t) => !t.completed));
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "today") return todo.date === today && !todo.completed;
    if (filter === "upcoming") return todo.date && todo.date > today && !todo.completed;
    return true;
  });

  // 날짜순 정렬 (가까운 날짜가 위로)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    today: todos.filter((t) => t.date === today && !t.completed).length,
  };

  const sendDailySummary = async () => {
    const summary = `완료: ${stats.completed}개\n남은 할 일: ${stats.active}개\n오늘 할 일: ${stats.today}개\n총: ${stats.total}개`;
    await sendTelegramNotification(summary, "daily_summary");
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === today) return "오늘";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateStr === tomorrow.toISOString().split("T")[0]) return "내일";

    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const isOverdue = (todo: Todo) => {
    if (!todo.deadline || todo.completed) return false;
    return todo.deadline < today;
  };

  const isNearDeadline = (todo: Todo) => {
    if (!todo.deadline || todo.completed) return false;
    const deadlineDate = new Date(todo.deadline);
    const todayDate = new Date(today);
    const diffDays = Math.ceil((deadlineDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-6 py-20">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 right-6 px-4 py-3 rounded-lg shadow-lg z-50 ${
            notification.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "bg-red-500/20 border border-red-500/50 text-red-400"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Todo List</h1>
            <p className="text-[#737373]">할 일을 완료하면 텔레그램 + 캘린더 연동!</p>
          </div>
          <button
            onClick={() => setCalendarEnabled(!calendarEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
              calendarEnabled
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                : "bg-[#141414] text-[#525252] border border-[#262626]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            캘린더 {calendarEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{stats.active}</p>
          <p className="text-xs text-[#737373]">남은 할 일</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{stats.today}</p>
          <p className="text-xs text-[#737373]">오늘</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
          <p className="text-xs text-[#737373]">완료</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-[#737373]">전체</p>
        </div>
      </div>

      {/* Add Todo */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 mb-6">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !showAdvanced && addTodo()}
            placeholder="새 할 일 입력..."
            className="flex-1 bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder-[#525252] focus:outline-none focus:border-blue-500 transition"
          />
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-3 rounded-lg transition ${
              showAdvanced ? "bg-blue-500 text-white" : "bg-[#262626] text-[#737373] hover:text-white"
            }`}
            title="날짜/시간 설정"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={addTodo}
            disabled={isLoading || !newTodo.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-[#262626] disabled:text-[#525252] text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {isLoading ? "..." : "추가"}
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#262626]">
            <div>
              <label className="block text-xs text-[#737373] mb-1">날짜</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#737373] mb-1">시간</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#737373] mb-1">데드라인</label>
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "today", "upcoming", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-[#141414] text-[#737373] hover:text-white"
            }`}
          >
            {f === "all" ? "전체" : f === "today" ? "오늘" : f === "upcoming" ? "예정" : f === "active" ? "진행 중" : "완료됨"}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={sendDailySummary}
          className="px-4 py-2 rounded-lg text-sm bg-[#141414] text-[#737373] hover:text-white transition"
        >
          요약 보내기
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-12 text-[#525252]">
            {filter === "all"
              ? "할 일을 추가해보세요!"
              : filter === "today"
              ? "오늘 할 일이 없습니다"
              : filter === "upcoming"
              ? "예정된 할 일이 없습니다"
              : filter === "active"
              ? "모든 할 일을 완료했습니다!"
              : "완료된 할 일이 없습니다"}
          </div>
        ) : (
          sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-start gap-4 bg-[#141414] border rounded-xl p-4 transition ${
                todo.completed
                  ? "border-green-500/30 bg-green-500/5"
                  : isOverdue(todo)
                  ? "border-red-500/50 bg-red-500/5"
                  : isNearDeadline(todo)
                  ? "border-yellow-500/50 bg-yellow-500/5"
                  : "border-[#262626] hover:border-[#404040]"
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                disabled={isLoading}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition flex-shrink-0 mt-0.5 ${
                  todo.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-[#525252] hover:border-blue-500"
                }`}
              >
                {todo.completed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`${todo.completed ? "line-through text-[#525252]" : "text-white"}`}>
                  {todo.text}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {todo.date && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(todo.date)} {todo.time && `${todo.time}`}
                    </span>
                  )}
                  {todo.deadline && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                      isOverdue(todo)
                        ? "bg-red-500/20 text-red-400"
                        : isNearDeadline(todo)
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-[#262626] text-[#737373]"
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      마감 {formatDate(todo.deadline)}
                      {isOverdue(todo) && " (지남!)"}
                    </span>
                  )}
                  {todo.calendarEventId && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      캘린더
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-[#525252] hover:text-red-400 transition p-2 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed */}
      {stats.completed > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={clearCompleted}
            className="text-sm text-[#525252] hover:text-red-400 transition"
          >
            완료된 항목 모두 삭제
          </button>
        </div>
      )}

      {/* Info */}
      <div className="mt-12 bg-[#141414] border border-[#262626] rounded-xl p-6">
        <h3 className="font-semibold mb-2">사용법</h3>
        <ul className="text-sm text-[#737373] space-y-1">
          <li>• 캘린더 아이콘을 눌러 날짜/시간/데드라인 설정</li>
          <li>• 날짜를 설정하면 Google 캘린더에 자동 추가</li>
          <li>• 데드라인이 가까우면 노란색, 지나면 빨간색으로 표시</li>
          <li>• 완료하면 캘린더 이벤트도 자동 업데이트</li>
          <li>• 텔레그램 알림도 동시에 발송</li>
        </ul>
      </div>
    </div>
  );
}
