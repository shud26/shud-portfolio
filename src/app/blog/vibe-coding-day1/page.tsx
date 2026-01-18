import Link from "next/link";

export default function VibeCodingDay1() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 1</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 1</h1>
        <p className="text-[#737373]">2026년 1월 17일 · 첫 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          코딩을 전혀 모르는 상태에서 Claude Code와 함께 첫 프로그램을 만들었다.
          생각보다 훨씬 쉬웠고, 하루 만에 실제로 동작하는 툴을 만들 수 있었다.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> Claude Code 설치
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            터미널에서 Claude와 대화하면서 코딩할 수 있는 도구를 설치했다.
            jq 설치하고, hook 스크립트 PATH 설정하고, 업적 시스템까지 세팅 완료.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Claude Code</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">터미널</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> BTC 가격 조회
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Hyperliquid API를 연동해서 실시간 비트코인 가격을 가져오는 스크립트를 만들었다.
            Python으로 API 호출하는 방법을 처음 배웠다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm text-green-400">
            $ python3 btc_price.py<br/>
            BTC: $95,000.00
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> 텔레그램 알림 봇
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            BTC 가격이 만 달러 단위를 돌파하면 텔레그램으로 알림을 보내주는 봇을 만들었다.
            백그라운드에서 계속 실행되면서 가격을 모니터링한다.
          </p>
          <ul className="text-[#a3a3a3] space-y-2">
            <li>✓ btc_telegram.py - 가격을 텔레그램으로 전송</li>
            <li>✓ btc_alert.py - 만 달러 돌파 시 알림</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">4.</span> GitHub 연동
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            GitHub CLI를 설치하고 로그인해서 코드를 올릴 수 있게 됐다.
            crypto-portfolio 레포를 만들고 BTC, ETH, SOL 가격 트래커를 올렸다.
          </p>
          <ul className="text-[#a3a3a3] space-y-2">
            <li>✓ gh CLI 설치 & 로그인</li>
            <li>✓ crypto-portfolio 레포 생성</li>
            <li>✓ GitHub Actions로 매 시간 자동 업데이트</li>
          </ul>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Python으로 API 호출하는 방법 (requests, urllib)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>텔레그램 Bot API 사용법</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>GitHub Actions로 자동화하는 방법</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>백그라운드 프로세스 실행 (nohup)</span>
          </li>
        </ul>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            코딩을 전혀 몰라도 AI한테 말만 하면 진짜 프로그램이 만들어진다.
            &quot;바이브 코딩&quot;이라는 말이 딱 맞는 것 같다.
            내일은 더 복잡한 것도 만들어봐야지.
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">내일 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 펀딩비 트래커 만들기</li>
          <li>☐ 여러 거래소 비교</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog" className="text-[#737373] hover:text-white transition">
            ← 블로그
          </Link>
          <Link href="/blog/vibe-coding-day2" className="text-blue-400 hover:underline">
            Day 2 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
