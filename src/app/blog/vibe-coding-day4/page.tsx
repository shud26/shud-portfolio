import Link from "next/link";

export default function VibeCodingDay4() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 4</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 4</h1>
        <p className="text-[#737373]">2026년 1월 20일 · 네 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          오늘은 진짜 트레이딩 봇의 시작을 알리는 날이었다.
          펀딩비 차익거래 모니터링 봇, 그리고 Todo에 Google Calendar 연동까지!
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> Cross-DEX 펀딩비 차익거래 봇
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Hyperliquid와 Binance의 펀딩비를 실시간 비교해서 차익거래 기회를 찾아주는 봇을 만들었다.
            델타뉴트럴 전략으로 거의 무위험 수익을 노릴 수 있다!
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <span className="text-[#737373]">코인</span>{"    "}<span className="text-[#737373]">Hyperliquid</span>{"  "}<span className="text-[#737373]">Binance</span>{"    "}<span className="text-[#737373]">스프레드</span>{"  "}<span className="text-[#737373]">연수익률</span><br/>
            <span className="text-white">APT</span>{"     "}<span className="text-green-400">-0.0001%</span>{"    "}<span className="text-green-400">-0.0178%</span>{"   "}<span className="text-yellow-400">0.0177%</span>{"   "}<span className="text-blue-400">19.4%</span>{" ⭐"}<br/>
            <span className="text-white">SEI</span>{"     "}<span className="text-green-400">-0.0022%</span>{"    "}<span className="text-red-400">+0.0100%</span>{"   "}<span className="text-yellow-400">0.0122%</span>{"   "}<span className="text-blue-400">13.4%</span>{" ⭐"}<br/>
            <span className="text-white">BTC</span>{"     "}<span className="text-green-400">-0.0008%</span>{"    "}<span className="text-red-400">+0.0094%</span>{"   "}<span className="text-yellow-400">0.0102%</span>{"   "}<span className="text-blue-400">11.2%</span>{" ⭐"}
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Hyperliquid API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Binance API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> Google Calendar 연동
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            할 일을 추가하면 자동으로 Google 캘린더에 이벤트가 생성된다!
            OAuth 인증부터 API 연동까지 처음 해봤는데 생각보다 복잡했다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm text-green-400 mb-4">
            ✓ Google Cloud 프로젝트 생성<br/>
            ✓ Calendar API 활성화<br/>
            ✓ OAuth 동의 화면 설정<br/>
            ✓ 인증 토큰 발급<br/>
            ✓ API 연동 완료!
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Google Calendar API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">OAuth 2.0</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Next.js API Routes</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> Todo 페이지 풀 업그레이드
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            기존 Todo 페이지에 날짜, 시간, 데드라인 기능을 추가했다.
            데드라인이 가까우면 노란색, 지나면 빨간색으로 표시된다!
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>✓ 날짜/시간 선택 UI</li>
            <li>✓ 데드라인 설정</li>
            <li>✓ Google Calendar 자동 연동</li>
            <li>✓ 캘린더 ON/OFF 토글</li>
            <li>✓ 오늘/예정 필터 추가</li>
            <li>✓ 데드라인 색상 표시</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">React</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">TypeScript</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Tailwind CSS</span>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">4.</span> Variational DEX 리서치
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            델타뉴트럴 봇을 만들려고 Variational API를 조사했는데...
            Trading API가 아직 개발 중이라 사용할 수 없었다.
            대신 Hyperliquid + Binance 조합으로 방향 전환!
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm text-[#a3a3a3]">
            <p className="text-yellow-400 mb-2">⚠️ Variational API 상태:</p>
            <p>&quot;The trading API is still in development, and is not yet available to any users.&quot;</p>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>펀딩비 차익거래 원리와 델타뉴트럴 전략</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Google OAuth 2.0 인증 플로우</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Google Calendar API 사용법</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>여러 거래소 API 동시 연동 (Hyperliquid + Binance)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>API 문서 읽고 가능/불가능 판단하기</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">2</p>
            <p className="text-sm text-[#737373]">거래소 연동</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">15</p>
            <p className="text-sm text-[#737373]">모니터링 코인</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">19.4%</p>
            <p className="text-sm text-[#737373]">최고 연수익률</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">1</p>
            <p className="text-sm text-[#737373]">캘린더 연동</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            오늘 드디어 &quot;돈 버는 툴&quot;의 첫 발을 뗐다.
            아직 자동매매는 아니지만, 차익거래 기회를 실시간으로 찾아주는 봇이 생겼다.
            APT에서 연 19%? 진짜면 대박인데... 내일 실제로 테스트해봐야겠다.
            Google Calendar 연동은 생각보다 복잡했지만, 한 번 해놓으니까
            다른 프로젝트에도 쓸 수 있을 것 같다. 점점 뭔가 쌓이는 느낌!
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">내일 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 펀딩비 차익거래 실제 테스트 (소액)</li>
          <li>☐ 자동 진입/청산 기능 추가</li>
          <li>☐ Bybit 거래소 추가</li>
          <li>☐ 웹 대시보드에 차익거래 기회 표시</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day3" className="text-[#737373] hover:text-white transition">
            ← Day 3
          </Link>
          <Link href="/blog/vibe-coding-day5" className="text-[#737373] hover:text-white transition">
            Day 5 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
