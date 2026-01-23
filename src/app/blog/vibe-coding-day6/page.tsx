import Link from "next/link";

export default function VibeCodingDay6() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 6</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 6</h1>
        <p className="text-[#737373]">2026년 1월 23일 · 여섯 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          이틀 쉬고 다시 돌아왔다. 오늘은 업비트 상장 알림 봇을 만들려고 했는데...
          현실의 벽에 부딪혔다. 하지만 배운 게 있다!
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">1.</span> 업비트 상장 알림 리서치
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            원래 목표는 업비트 공지가 올라오자마자 알림을 받고, 퍼프덱에서 바로 긁는 것이었다.
            그래서 여러 가지 방법을 시도해봤다.
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>• 업비트 공지 API 검색 → 공식 API 없음</li>
            <li>• api-manager.upbit.com → 막혀있음</li>
            <li>• 코인니스 RSS → SPA라서 RSS 없음</li>
            <li>• 크립토패닉 API → IP 차단됨</li>
            <li>• 구글 뉴스 RSS → 작동 안 함</li>
            <li>• Nitter (트위터 RSS) → Captcha 차단</li>
          </ul>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p className="text-red-400 font-semibold">결론: 업비트 공지 API는 공식적으로 제공 안 함</p>
            <p className="text-[#a3a3a3] text-sm mt-1">
              기존 텔레그램 봇들은 Selenium 스크래핑 또는 예전 API가 열려있을 때 만들어진 것으로 추정
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">API 리서치</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">웹 스크래핑</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">RSS</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">2.</span> 마켓 리스트 방식 봇 (대안)
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            공지 API가 없어서 차선책으로 마켓 리스트 방식의 봇을 만들었다.
            10분마다 업비트 마켓 리스트를 체크해서 새 코인이 추가되면 알림을 보낸다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto whitespace-pre-wrap">
            <span className="text-green-400"># 작동 원리</span><br/>
            1. api.upbit.com/v1/market/all API 호출<br/>
            2. 이전에 저장한 리스트와 비교<br/>
            3. 새 마켓 발견 시 텔레그램 알림<br/>
            <br/>
            <span className="text-yellow-400"># 문제점</span><br/>
            공지 → 마켓 오픈까지 시간차 있음<br/>
            스나이핑 목적으로는 부적합
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Upbit API</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Telegram</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">3.</span> 시도해본 API들
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#737373] border-b border-[#262626]">
                  <th className="pb-2">서비스</th>
                  <th className="pb-2">결과</th>
                </tr>
              </thead>
              <tbody className="text-[#a3a3a3]">
                <tr className="border-b border-[#262626]">
                  <td className="py-2">업비트 공지 API</td>
                  <td className="py-2 text-red-400">❌ 없음</td>
                </tr>
                <tr className="border-b border-[#262626]">
                  <td className="py-2">api-manager.upbit.com</td>
                  <td className="py-2 text-red-400">❌ 차단됨</td>
                </tr>
                <tr className="border-b border-[#262626]">
                  <td className="py-2">코인니스</td>
                  <td className="py-2 text-red-400">❌ SPA (API 없음)</td>
                </tr>
                <tr className="border-b border-[#262626]">
                  <td className="py-2">크립토패닉</td>
                  <td className="py-2 text-red-400">❌ IP 차단</td>
                </tr>
                <tr className="border-b border-[#262626]">
                  <td className="py-2">Nitter (트위터)</td>
                  <td className="py-2 text-red-400">❌ Captcha</td>
                </tr>
                <tr>
                  <td className="py-2">업비트 마켓 리스트</td>
                  <td className="py-2 text-green-400">✅ 작동</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>대부분의 거래소는 공지 API를 공개하지 않음</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>빠른 알림을 위해서는 Selenium 스크래핑 필요</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>뉴스 RSS도 대부분 막혀있거나 유료임</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>예전에 작동했던 API도 시간이 지나면 막힐 수 있음</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>안 되는 이유를 아는 것도 중요한 배움!</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">6</p>
            <p className="text-sm text-[#737373]">시도한 API</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">5</p>
            <p className="text-sm text-[#737373]">실패한 방법</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">1</p>
            <p className="text-sm text-[#737373]">작동하는 API</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">683</p>
            <p className="text-sm text-[#737373]">업비트 마켓 수</p>
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            오늘은 좀 아쉬웠다. 업비트 상장 공지 알림을 만들어서 퍼프덱 스나이핑 하고 싶었는데,
            공지 API가 없어서 원래 목표는 달성 못 했다.
            <br/><br/>
            하지만 &quot;왜 안 되는지&quot;를 알게 된 것도 의미가 있다고 생각한다.
            다른 방법을 찾아보거나, 아니면 다른 기회를 찾아야겠다.
            <br/><br/>
            마켓 리스트 방식 봇은 만들어놨으니까, 나중에 필요하면 쓸 수 있을 것 같다.
            퍼프덱 스나이핑은 다른 방법을 찾아봐야지...
          </p>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">다음에 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ 펀딩비 차익거래 실제 테스트 (소액)</li>
          <li>☐ DEX 신규 페어 알림 방법 리서치</li>
          <li>☐ Selenium 스크래핑 공부 (필요할 때)</li>
          <li>☐ 다른 기회 포착 방법 찾아보기</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day5" className="text-[#737373] hover:text-white transition">
            ← Day 5
          </Link>
          <Link href="/blog/vibe-coding-day7" className="text-[#737373] hover:text-white transition">
            Day 7 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
