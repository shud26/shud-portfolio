import Link from "next/link";

export default function VibeCodingDay2() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 2</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 2</h1>
        <p className="text-[#737373]">2026년 1월 18일 · 두 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          오늘은 진짜 많이 만들었다. 포트폴리오 사이트, 멀티 DEX 펀딩비 트래커,
          그리고 컴퓨터 꺼도 알림 오게 하는 것까지. 바이브 코딩의 속도가 무섭다.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> 포트폴리오 웹사이트 (GitHub Pages)
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            shud26.github.io 도메인으로 간단한 포트폴리오 사이트를 만들었다.
            미니멀한 디자인으로 프로젝트들을 보여주는 페이지.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">HTML/CSS</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">GitHub Pages</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> 멀티 DEX 펀딩비 트래커
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Hyperliquid, Pacifica, Variational 3개 거래소의 펀딩비를 동시에 모니터링하는
            트래커를 만들었다. 차익거래 기회도 감지해서 알려준다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4">
            <span className="text-[#737373]">코인</span>{"      "}<span className="text-[#737373]">Hyperliquid</span>{"  "}<span className="text-[#737373]">Pacifica</span>{"  "}<span className="text-[#737373]">Variational</span><br/>
            <span className="text-white">BTC</span>{"       "}<span className="text-red-400">+0.0013%</span>{"    "}<span className="text-red-400">+0.0010%</span>{"   "}<span className="text-red-400">+0.0077%</span><br/>
            <span className="text-white">ETH</span>{"       "}<span className="text-red-400">+0.0013%</span>{"    "}<span className="text-red-400">+0.0015%</span>{"   "}<span className="text-red-400">+0.0101%</span><br/>
            <span className="text-white">SOL</span>{"       "}<span className="text-red-400">+0.0013%</span>{"    "}<span className="text-green-400">-0.0004%</span>{"   "}<span className="text-green-400">-0.0076%</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">REST API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> GitHub Actions 자동 알림
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            컴퓨터를 꺼도 1시간마다 자동으로 펀딩비를 체크하고 텔레그램으로 알림을 보내준다.
            GitHub가 무료로 서버를 빌려주는 거라 공짜!
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm text-green-400">
            ✓ 워크플로우 실행 완료<br/>
            ✓ 2개 알림 전송됨
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">4.</span> Next.js 포트폴리오 + Vercel 배포
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            제대로 된 포트폴리오 사이트를 Next.js로 만들었다.
            다크 테마, 실시간 대시보드, 블로그까지. Vercel로 배포해서 전 세계에서 접속 가능.
          </p>
          <ul className="text-[#a3a3a3] space-y-2">
            <li>✓ 메인 페이지 - 자기소개 & 프로젝트 미리보기</li>
            <li>✓ Projects - 만든 것들 목록</li>
            <li>✓ Blog - 이 글!</li>
            <li>✓ Dashboard - 실시간 펀딩비 데이터</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">5.</span> DEX 정보 리서치 & 백업
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Nado, Pacifica, Extended, Variational 등 여러 퍼프 DEX를 조사했다.
            API 정보, 체인, 특징 등을 정리해서 나중에 다시 찾아보지 않아도 되게 백업.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Research</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Documentation</span>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>여러 API를 동시에 연동하는 방법</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>GitHub Actions로 무료 서버 돌리기</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Next.js + Tailwind CSS로 웹사이트 만들기</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Vercel 무료 배포 (GitHub 연동하면 자동 배포)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>펀딩비 차익거래 원리</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">3</p>
            <p className="text-sm text-[#737373]">DEX 연동</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">4</p>
            <p className="text-sm text-[#737373]">페이지 생성</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">24/7</p>
            <p className="text-sm text-[#737373]">자동 모니터링</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">$0</p>
            <p className="text-sm text-[#737373]">서버 비용</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            이틀 만에 이 정도를 만들 수 있다니 진짜 신기하다.
            예전 같으면 몇 달은 걸렸을 것 같은데, AI한테 말만 하면 된다.
            이제 진짜 돈 버는 툴을 만들 수 있을 것 같은 자신감이 생겼다.
            내일은 뭘 만들지?
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">내일 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 자동매매 봇 (페이퍼 트레이딩부터)</li>
          <li>☐ 더 많은 DEX 추가</li>
          <li>☐ 블로그 글 계속 쓰기</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day1" className="text-[#737373] hover:text-white transition">
            ← Day 1
          </Link>
          <Link href="/blog/vibe-coding-day3" className="text-blue-400 hover:underline">
            Day 3 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
