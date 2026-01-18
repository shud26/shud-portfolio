import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-6">
          <p className="text-blue-400 font-mono text-sm">안녕하세요, 저는</p>
          <h1 className="text-5xl md:text-7xl font-bold">
            shud<span className="text-blue-400">.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#737373]">
            바이브 코딩으로 돈 버는 툴을 만듭니다.
          </p>
          <p className="text-[#a3a3a3] max-w-2xl leading-relaxed">
            2026년, 코딩을 처음 시작해서 크립토 트레이딩 자동화 툴을 만들고 있습니다.
            펀딩비 트래커, 차익거래 알림, 자동매매 봇 등을 개발 중입니다.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-[#262626] hover:border-[#404040] rounded-lg font-medium transition"
            >
              실시간 대시보드
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Card 1 */}
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition group">
            <div className="flex items-center gap-2 text-blue-400 text-sm mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
              멀티 DEX 펀딩비 트래커
            </h3>
            <p className="text-[#737373] text-sm mb-4">
              Hyperliquid, Pacifica, Variational 3개 DEX의 펀딩비를 실시간 모니터링하고
              차익거래 기회를 텔레그램으로 알려줍니다.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram Bot</span>
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">GitHub Actions</span>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition group">
            <div className="flex items-center gap-2 text-[#737373] text-sm mb-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Active
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
              Crypto Portfolio Tracker
            </h3>
            <p className="text-[#737373] text-sm mb-4">
              BTC, ETH, SOL 가격을 실시간으로 추적하고 GitHub Actions로
              매 시간 자동 업데이트됩니다.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">GitHub Actions</span>
              <span className="px-2 py-1 bg-[#262626] rounded text-xs">Hyperliquid API</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="text-blue-400 hover:underline">
            모든 프로젝트 보기 →
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">3+</p>
            <p className="text-[#737373] text-sm">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">3</p>
            <p className="text-[#737373] text-sm">DEX Connected</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">24/7</p>
            <p className="text-[#737373] text-sm">Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">2026</p>
            <p className="text-[#737373] text-sm">Vibe Coding</p>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        <div className="space-y-4">
          <Link href="/blog/funding-rate" className="block bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold mb-2">펀딩비로 돈 버는 방법</h3>
                <p className="text-[#737373] text-sm">펀딩비의 원리와 이를 활용한 트레이딩 전략을 알아봅니다.</p>
              </div>
              <span className="text-[#737373] text-sm whitespace-nowrap ml-4">2026.01.18</span>
            </div>
          </Link>
          <Link href="/blog/vibe-coding-start" className="block bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold mb-2">바이브 코딩 시작하기</h3>
                <p className="text-[#737373] text-sm">코딩을 모르는 사람도 AI와 함께 프로그램을 만들 수 있습니다.</p>
              </div>
              <span className="text-[#737373] text-sm whitespace-nowrap ml-4">2026.01.17</span>
            </div>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-400 hover:underline">
            모든 글 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
