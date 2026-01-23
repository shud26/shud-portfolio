import Link from "next/link";

export default function VibeCodingDay7() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 7</h1>
        <p className="text-[#737373]">2026년 1월 23일 · 일곱 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          드디어 갭 매매 모니터링 도구를 만들었다! CEX와 DEX 간 가격 차이를 실시간으로 추적하고,
          1% 이상 갭이 발생하면 알림을 받는다.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> CEX/DEX 가격 갭 모니터링
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            같은 코인이라도 거래소마다 가격이 다르다. 이 차이를 이용하면 차익거래가 가능!
            5개 거래소의 가격을 실시간으로 비교하는 도구를 만들었다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-yellow-400 mb-2">🚨 가격 갭 발견!</div>
            <div className="text-white">BNT: 4.5%</div>
            <div className="text-[#737373]">  📈 Bitget: $0.4005</div>
            <div className="text-[#737373]">  📉 Hyperliquid: $0.3828</div>
            <div className="text-blue-400">  💡 HL에서 사서 Bitget에서 팔기</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Binance</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Bybit</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">OKX</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Bitget</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Hyperliquid</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> 대시보드 업그레이드
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            대시보드에 가격 갭 알림 섹션을 추가했다. 1% 이상 갭이 발생하면
            자동으로 표시되고, 없으면 섹션 자체가 숨겨진다.
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>• Hyperliquid 전체 코인 모니터링 (500개+)</li>
            <li>• 1% 이상 갭만 표시 (노이즈 필터링)</li>
            <li>• 15% 이상은 제외 (다른 토큰일 가능성)</li>
            <li>• 최소 3개 거래소에서 가격 있어야 표시</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Next.js API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">React</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Vercel</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> 텔레그램 알림 연동
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            대시보드를 열 때마다 자동으로 갭을 체크하고, 1% 이상 갭이 발견되면
            텔레그램으로 알림을 보낸다.
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold">실시간 알림 작동!</p>
            <p className="text-[#a3a3a3] text-sm mt-1">
              대시보드 새로고침할 때마다 갭 체크 → 발견 시 텔레그램 알림
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram Bot</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Webhook</span>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>거래소마다 API 응답 형식이 다 다름 (파싱 노가다)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>같은 심볼이라도 다른 토큰일 수 있음 (NTRN 등)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>False positive 필터링이 중요함 (15% 이상 제외)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Promise.all로 여러 API 동시 호출하면 빠름</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">5</p>
            <p className="text-sm text-[#737373]">연동 거래소</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">500+</p>
            <p className="text-sm text-[#737373]">모니터링 코인</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">1%</p>
            <p className="text-sm text-[#737373]">알림 임계값</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">4.5%</p>
            <p className="text-sm text-[#737373]">발견된 최대 갭</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            갭 매매는 이론적으로 무위험 차익거래인데, 실제로는 수수료, 슬리피지,
            전송 시간 등 고려할 게 많다. 하지만 이렇게 모니터링 도구가 있으면
            기회가 왔을 때 빠르게 판단할 수 있다.
            <br/><br/>
            어제 업비트 상장 알림은 실패했지만, 오늘 갭 모니터링은 성공!
            안 되는 것도 있고 되는 것도 있다. 그게 개발이지 뭐.
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">다음에 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 갭 매매 실제 테스트 (소액)</li>
          <li>☐ 자동 매매 기능 추가</li>
          <li>☐ 수수료 계산 포함</li>
          <li>☐ 더 많은 DEX 추가</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day6" className="text-[#737373] hover:text-white transition">
            ← Day 6
          </Link>
          <Link href="/blog/vibe-coding-day8" className="text-[#737373] hover:text-white transition">
            Day 8 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
