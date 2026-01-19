"use client";

import { useEffect, useState } from "react";

const CORRECT_PIN = "1507";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export default function TodoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("shud-todo-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load todos from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem("shud-todos");
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    }
  }, [isAuthenticated]);

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

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("shud-todos", JSON.stringify(todos));
  }, [todos]);

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

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo("");

    // Send telegram notification for new todo
    await sendTelegramNotification(todo.text, "todo_add");
  };

  const toggleTodo = async (id: string) => {
    setIsLoading(true);
    const todo = todos.find((t) => t.id === id);

    if (todo && !todo.completed) {
      // Completing a todo - send notification
      await sendTelegramNotification(todo.text, "todo_complete");
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

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  const sendDailySummary = async () => {
    const summary = `완료: ${stats.completed}개\n남은 할 일: ${stats.active}개\n총: ${stats.total}개`;
    await sendTelegramNotification(summary, "daily_summary");
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
        <h1 className="text-4xl font-bold mb-2">Todo List</h1>
        <p className="text-[#737373]">할 일을 완료하면 텔레그램으로 알림이 갑니다</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{stats.active}</p>
          <p className="text-sm text-[#737373]">남은 할 일</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
          <p className="text-sm text-[#737373]">완료</p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-[#737373]">전체</p>
        </div>
      </div>

      {/* Add Todo */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="새 할 일 입력..."
          className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder-[#525252] focus:outline-none focus:border-blue-500 transition"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          추가
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-[#141414] text-[#737373] hover:text-white"
            }`}
          >
            {f === "all" ? "전체" : f === "active" ? "진행 중" : "완료됨"}
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
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-[#525252]">
            {filter === "all" ? "할 일을 추가해보세요!" : filter === "active" ? "모든 할 일을 완료했습니다!" : "완료된 할 일이 없습니다"}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-4 bg-[#141414] border rounded-xl p-4 transition ${
                todo.completed ? "border-green-500/30 bg-green-500/5" : "border-[#262626] hover:border-[#404040]"
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                disabled={isLoading}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
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
              <div className="flex-1">
                <p className={`${todo.completed ? "line-through text-[#525252]" : "text-white"}`}>
                  {todo.text}
                </p>
                <p className="text-xs text-[#525252] mt-1">
                  {todo.completed && todo.completedAt
                    ? `완료: ${new Date(todo.completedAt).toLocaleString("ko-KR")}`
                    : `추가: ${new Date(todo.createdAt).toLocaleString("ko-KR")}`}
                </p>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-[#525252] hover:text-red-400 transition p-2"
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
          <li>• 할 일을 추가하면 텔레그램에 알림이 갑니다</li>
          <li>• 체크박스를 클릭해서 완료하면 텔레그램에 알림이 갑니다</li>
          <li>• &quot;요약 보내기&quot; 버튼으로 현재 상태를 텔레그램으로 보낼 수 있습니다</li>
          <li>• 데이터는 브라우저에 저장됩니다 (로컬 스토리지)</li>
        </ul>
      </div>
    </div>
  );
}
