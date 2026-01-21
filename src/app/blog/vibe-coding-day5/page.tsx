import Link from "next/link";

export default function VibeCodingDay5() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 5</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 5</h1>
        <p className="text-[#737373]">2026년 1월 21일 · 다섯 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          오늘은 P성향인 나를 위한 생산성 도구를 만들었다.
          아침마다 뭐 해야 하는지 알려주는 봇, 그리고 김치 프리미엄 모니터링까지!
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> Morning Briefing Bot
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            P성향이라 계획 세우는 게 어려운데, 매일 아침 8시에 텔레그램으로
            오늘 일정과 할 일을 알려주는 봇을 만들었다!
            격려 메시지도 랜덤으로 보내준다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto whitespace-pre-wrap">
            <span className="text-yellow-400">☀️ Good Morning!</span><br/>
            <span className="text-[#737373]">📅 2026년 01월 21일 (수)</span><br/>
            <br/>
            <span className="text-white">📆 오늘의 일정</span><br/>
            {"  "}📌 종일 - 펀딩비 차익거래 공부<br/>
            {"  "}⏰ 11:21 - 미팅<br/>
            <br/>
            <span className="text-white">✅ 오늘의 할 일</span><br/>
            {"  "}1. 펀딩비 차익거래 공부<br/>
            <br/>
            <span className="text-blue-400">💬 P성향이라도 괜찮아요! 하나씩 해보자 ✨</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Google Calendar API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">GitHub Actions</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> 김치 프리미엄 모니터링
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            업비트(한국)와 바이낸스(해외) 가격 차이를 실시간으로 보여주는 김프 모니터링!
            대시보드에 추가해서 한 눈에 확인할 수 있다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[#737373] text-xs mb-1">BTC</p>
                <p className="text-red-400">+2.34%</p>
              </div>
              <div>
                <p className="text-[#737373] text-xs mb-1">ETH</p>
                <p className="text-red-400">+1.89%</p>
              </div>
              <div>
                <p className="text-[#737373] text-xs mb-1">XRP</p>
                <p className="text-orange-400">+0.52%</p>
              </div>
            </div>
            <div className="text-center mt-3 text-[#737373] text-xs">
              환율: $1,450원 | 평균 김프: +1.58%
            </div>
          </div>
          <p className="text-sm text-[#737373] mb-4">
            🔴 양수 = 한국이 비쌈 (역프 기회) · 🟢 음수 = 한국이 쌈 (정프 기회)
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Upbit API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Binance API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Next.js</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">실시간 환율</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> 기회 포착 전략 브레인스토밍
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            펀딩비 차익거래 외에 다른 기회들도 정리했다.
            업비트 상장 알림, 거래량 급증 감지 등등... 다음에 만들어볼 것들!
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>• 업비트 신규 상장 알림 → DEX에서 빠르게 진입</li>
            <li>• 거래량 급증 감지 → 상장 루머 포착</li>
            <li>• DEX 신규 페어 알림 → 초기 진입 기회</li>
            <li>• 에어드랍 스냅샷 알림 → 스냅샷 전 매수</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">아이디어</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">리서치</span>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>GitHub Actions cron으로 매일 자동 실행 설정</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>환율 API 연동 (exchangerate-api.com)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>업비트 API와 바이낸스 API 동시 호출</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>김치 프리미엄 계산법: (업비트÷환율 - 바이낸스) ÷ 바이낸스 × 100</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>P성향한테 시스템이 중요하다는 것!</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">08:00</p>
            <p className="text-sm text-[#737373]">매일 알림 시간</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">10</p>
            <p className="text-sm text-[#737373]">김프 모니터링 코인</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">8</p>
            <p className="text-sm text-[#737373]">격려 메시지 종류</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">2</p>
            <p className="text-sm text-[#737373]">새 기능 추가</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            P성향이라 계획 세우는 게 진짜 어려웠는데, 시스템이 대신 챙겨주니까 훨씬 낫다.
            아침에 &quot;오늘 이거 해야 해~&quot; 알려주면 시작하기가 쉬워지는 느낌!
            <br/><br/>
            김프 모니터링도 재밌다. 한국이 얼마나 비싼지 실시간으로 보이니까
            시장 분위기도 어느 정도 파악이 된다. 나중에 업비트 상장 알림까지 만들면
            진짜 기회 포착 툴이 될 것 같다.
            <br/><br/>
            React Native로 앱도 만들 수 있다고 해서 나중에 도전해봐야지!
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">내일 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 업비트 신규 상장 알림 만들기</li>
          <li>☐ 습관 트래커 (스트릭 기능)</li>
          <li>☐ 펀딩비 차익거래 실제 테스트</li>
          <li>☐ DEX 신규 페어 알림</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day4" className="text-[#737373] hover:text-white transition">
            ← Day 4
          </Link>
          <span className="text-[#525252]">Day 6 coming soon...</span>
        </div>
      </footer>
    </article>
  );
}
