import Link from "next/link";

export default function VibeCodingDay3() {
  return (
    <article className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link href="/blog" className="text-blue-400 hover:underline text-sm mb-8 inline-block">
        ← 블로그로 돌아가기
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Vibe Coding</span>
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 3</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 3</h1>
        <p className="text-[#737373]">2026년 1월 19일 · 세 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          오늘은 대시보드에 실시간 데이터를 연동하고, Todo List를 만들었다.
          그리고 프로덕션 배포에서 버그를 만나고 해결하는 과정을 경험했다.
          실제 서비스를 운영할 때 겪는 문제를 미리 맛본 느낌!
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> 대시보드 풀 업그레이드
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            어제 만든 대시보드를 완전히 업그레이드했다. 3개 코인에서 9개 코인으로 확장하고,
            차익거래 기회를 자동으로 계산해서 보여주는 기능을 추가했다.
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>✓ 9개 코인 지원 (BTC, ETH, SOL, DOGE, AVAX, ARB, SUI, LINK, XRP)</li>
            <li>✓ 차익거래 기회 TOP 3 카드</li>
            <li>✓ 예상 일일 수익률 계산</li>
            <li>✓ 60초 자동 새로고침 타이머</li>
            <li>✓ 코인별 롱/숏 전략 표시</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Next.js API Routes</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Real-time Data</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> Todo List + 텔레그램 알림
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            개인 생산성 툴을 만들었다. 할 일을 추가하거나 완료하면 텔레그램으로 알림이 온다.
            PIN 잠금 기능도 넣어서 나만 사용할 수 있게 했다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4">
            <p className="text-green-400">📌 새 할 일 추가</p>
            <p className="text-[#737373]">📝 블로그 Day 3 작성</p>
            <p className="text-[#525252]">⏰ 오후 10:30:45</p>
          </div>
          <ul className="text-[#a3a3a3] space-y-2">
            <li>✓ 할 일 추가/완료/삭제</li>
            <li>✓ 텔레그램 실시간 알림</li>
            <li>✓ PIN 코드 잠금 (보안)</li>
            <li>✓ 일일 요약 보내기 기능</li>
          </ul>
        </div>

        {/* Section 3 - Bug Fix */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-red-400">3.</span> 버그와의 싸움 (React Hooks)
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            로컬에서는 잘 되는데 Vercel 배포하니까 Todo 페이지에서 에러가 났다.
            &quot;Application error: a client-side exception has occurred&quot; 이런 에러...
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 mb-4">
            <p className="text-red-400 font-mono text-sm mb-2">문제의 코드:</p>
            <pre className="text-[#a3a3a3] text-sm overflow-x-auto">
{`if (!isAuthenticated) {
  return <PinScreen />;  // 여기서 리턴
}

// ❌ useEffect가 조건부 return 아래에!
useEffect(() => {
  localStorage.setItem(...);
}, [todos]);`}
            </pre>
          </div>
          <p className="text-[#a3a3a3] mb-4">
            <strong className="text-white">원인:</strong> React Hooks는 항상 같은 순서로 호출되어야 하는데,
            조건부 return 아래에 useEffect를 넣어서 규칙 위반이 됐다.
          </p>
          <p className="text-[#a3a3a3]">
            <strong className="text-green-400">해결:</strong> 모든 useEffect를 조건문 위로 이동시켰더니 해결!
          </p>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Next.js API Routes로 서버사이드 데이터 처리 (CORS 해결)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>React Hooks 규칙: 조건문 안에서 hooks 호출하면 안 됨!</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Hydration 에러: 서버/클라이언트 상태 불일치 해결법</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>텔레그램 Bot API로 웹에서 알림 보내기</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>로컬 vs 프로덕션 환경 차이 (배포하면 다른 에러 발생)</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">9</p>
            <p className="text-sm text-[#737373]">코인 지원</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">2</p>
            <p className="text-sm text-[#737373]">새 기능</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">3</p>
            <p className="text-sm text-[#737373]">버그 수정</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">7</p>
            <p className="text-sm text-[#737373]">커밋</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            오늘 버그 잡으면서 진짜 개발자가 된 기분이었다.
            로컬에서 되는데 배포하면 안 되는 거, React Hooks 규칙 위반...
            이런 게 실제 개발하면서 겪는 문제구나 싶었다.
            <br /><br />
            Claude한테 에러 메시지 보여주니까 바로 원인 찾아서 해결해줬다.
            혼자였으면 몇 시간은 걸렸을 것 같은데, 바이브 코딩의 힘!
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">내일 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 자동매매 봇 (페이퍼 트레이딩)</li>
          <li>☐ 더 많은 DEX 추가 (Nado, Extended)</li>
          <li>☐ 펀딩비 히스토리 차트</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day2" className="text-[#737373] hover:text-white transition">
            ← Day 2
          </Link>
          <Link href="/blog" className="text-blue-400 hover:underline">
            블로그 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
