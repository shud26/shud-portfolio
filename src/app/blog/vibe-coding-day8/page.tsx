import Link from "next/link";

export default function VibeCodingDay8() {
  return (
    <article className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link href="/blog" className="text-blue-400 hover:underline text-sm mb-8 inline-block">
        ← 블로그로 돌아가기
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Vibe Coding</span>
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 8</h1>
        <p className="text-[#737373]">2026년 1월 24일 · 여덟 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          Triangle Dice 게임을 Base Mini App으로 변환했다!
          Coinbase의 Base App에서 실행되는 미니앱을 만드는 과정은 생각보다 복잡했다.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">1.</span> Base Mini App 변환
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            기존 Vite + React 앱에 OnchainKit과 Farcaster SDK를 추가해서
            Base Mini App으로 변환했다. Mini App은 Base App(구 Coinbase Wallet) 안에서
            실행되는 경량 앱이다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-green-400">$ npm install @coinbase/onchainkit</div>
            <div className="text-green-400">$ npm install @farcaster/miniapp-sdk</div>
            <div className="text-[#737373] mt-2"># wagmi 다운그레이드 필요 (호환성)</div>
            <div className="text-yellow-400">$ npm install wagmi@^2.16</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">OnchainKit</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">MiniKit</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">wagmi 2.x</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">2.</span> Account Association 등록
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Mini App을 등록하려면 base.dev에서 소유권을 인증해야 한다.
            문제는... 한국에서 base.dev 접속이 안 된다! VPN으로 우회해서 해결.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold">한국에서 base.dev 차단됨</p>
            <p className="text-[#a3a3a3] text-sm mt-1">
              Coinbase 서비스가 한국에서 제한됨. 미국 VPN 사용하면 접속 가능!
            </p>
          </div>
          <p className="text-[#a3a3a3] mb-4">등록 과정:</p>
          <ol className="text-[#a3a3a3] space-y-2 mb-4 list-decimal list-inside">
            <li>index.html에 메타태그 추가 (소유권 인증)</li>
            <li>base.dev에서 Verify 클릭</li>
            <li>지갑으로 서명</li>
            <li>farcaster.json에 Account Association 추가</li>
          </ol>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">base.dev</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">VPN</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Wallet Signature</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">3.</span> farcaster.json 설정
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Mini App의 메타데이터를 담는 manifest 파일.
            앱 이름, 아이콘, 카테고리 등을 설정한다.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-[#737373]">// .well-known/farcaster.json</div>
            <div className="text-white">{`{`}</div>
            <div className="text-white pl-4">{`"frame": {`}</div>
            <div className="text-green-400 pl-8">{`"name": "Triangle Dice",`}</div>
            <div className="text-green-400 pl-8">{`"primaryCategory": "games",`}</div>
            <div className="text-green-400 pl-8">{`"tags": ["gaming", "betting", "dice"]`}</div>
            <div className="text-white pl-4">{`}`}</div>
            <div className="text-white">{`}`}</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">farcaster.json</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Manifest</span>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">4.</span> 이미지 에셋 생성
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Mini App에 필요한 이미지들을 Python PIL로 직접 생성했다.
            삼각형과 주사위 눈을 조합한 심플한 디자인.
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>• icon.png (200x200) - 앱 아이콘</li>
            <li>• splash.png (400x400) - 로딩 화면</li>
            <li>• preview.png (1200x630) - 소셜 공유용</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Python</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Pillow</span>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Base Mini App = Farcaster Mini App (호환됨)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>OnchainKit 1.x는 wagmi 2.x 필요 (3.x 호환 안 됨)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>sdk.actions.ready() 호출해야 앱 로딩 완료 신호</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>한국에서 Coinbase 서비스 제한됨 (VPN 필요)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Base App은 170개국 지원 (한국 포함)</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">2</p>
            <p className="text-sm text-[#737373]">스마트 컨트랙트</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">3</p>
            <p className="text-sm text-[#737373]">SDK 패키지</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">170+</p>
            <p className="text-sm text-[#737373]">지원 국가</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">1</p>
            <p className="text-sm text-[#737373]">VPN 필요</p>
          </div>
        </div>

        {/* Current Status */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">현재 상태</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> Vercel 배포 완료
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 스마트 컨트랙트 배포 (Base Sepolia)
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> OnchainKit + MiniKit 통합
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> Account Association 완료
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 메타데이터 설정 완료
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <span>⏳</span> Ready call 디버깅 중
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <span>⏳</span> Base App 검색 인덱싱 대기
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            Mini App 개발은 생각보다 삽질이 많았다. 문서도 여기저기 흩어져 있고,
            한국에서 base.dev 접속이 안 되는 것도 몰랐다.
            <br/><br/>
            그래도 VPN으로 우회해서 Account Association까지 완료했다!
            아직 Ready call 문제가 남아있지만, 거의 다 왔다.
            <br/><br/>
            Base App이 한국에서도 사용 가능하다는 게 다행이다.
            메인넷 배포하면 실제 유저들이 플레이할 수 있을 것 같다.
          </p>
        </div>

        {/* Links */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">링크</h2>
        <div className="space-y-2">
          <a
            href="https://triangle-dice-miniapp.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-purple-400 hover:underline"
          >
            → Triangle Dice Mini App (Vercel)
          </a>
          <a
            href="https://github.com/shud26/triangle-dice-miniapp"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-purple-400 hover:underline"
          >
            → GitHub Repository
          </a>
        </div>

        {/* Next */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">다음에 할 것</h2>
        <ul className="space-y-2 text-[#a3a3a3]">
          <li>☐ Ready call 문제 해결</li>
          <li>☐ Base App에서 검색 가능하게</li>
          <li>☐ 메인넷 배포 (실제 USDC)</li>
          <li>☐ 게임 UI/UX 개선</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day7" className="text-[#737373] hover:text-white transition">
            ← Day 7
          </Link>
          <Link href="/blog/vibe-coding-day9" className="text-[#737373] hover:text-white transition">
            Day 9 →
          </Link>
        </div>
      </footer>
    </article>
  );
}
