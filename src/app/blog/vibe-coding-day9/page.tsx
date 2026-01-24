import Link from "next/link";

export default function VibeCodingDay9() {
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
          <span className="px-2 py-1 bg-[#262626] rounded text-xs">Day 9</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">바이브 코딩 시작하기 Day 9</h1>
        <p className="text-[#737373]">2026년 1월 24일 · 아홉 번째 날</p>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#a3a3a3] mb-8">
          남는 도메인 tftchess.com을 활용해서 새로운 원페이지 대시보드를 만들었다!
          에어드랍 트래커, 리서치 노트, 캘린더, 할 일 관리를 한 페이지에 모아놓은 개인용 크립토 대시보드.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘 한 것들</h2>

        {/* Section 1 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">1.</span> shud-onepage 프로젝트 생성
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            기존에 WordPress로 방치하고 있던 tftchess.com 도메인에
            새로운 Next.js 사이트를 만들었다. Cloudflare Pages를 먼저 시도했으나
            Next.js 16 호환 문제로 Vercel로 전환.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-green-400">$ npx create-next-app@latest tftchess</div>
            <div className="text-[#737373] mt-2"># Cloudflare Pages는 Next.js 16 미지원</div>
            <div className="text-yellow-400"># Vercel로 변경!</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Next.js 16</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">TypeScript</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Tailwind CSS</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">2.</span> Supabase 데이터베이스 연동
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            데이터를 영구 저장하기 위해 Supabase를 연동했다.
            PostgreSQL 기반이라 SQL로 테이블을 만들고, RLS(Row Level Security) 설정을 해제해서 사용.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-[#737373]">-- 생성한 테이블들</div>
            <div className="text-white">airdrops, airdrop_tasks</div>
            <div className="text-white">todos, events, research</div>
            <div className="text-[#737373] mt-2">-- RLS 비활성화 (개인용)</div>
            <div className="text-yellow-400">ALTER TABLE airdrops DISABLE ROW LEVEL SECURITY;</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Supabase</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">PostgreSQL</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">RLS</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">3.</span> 원페이지 대시보드 기능
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            한 페이지에 필요한 모든 기능을 모았다.
            PIN 로그인(1507)으로 편집 기능 잠금.
          </p>
          <ul className="text-[#a3a3a3] space-y-2 mb-4">
            <li>• 에어드랍 트래커 - 태스크별 비용 관리 (Excel 스타일)</li>
            <li>• 코인 리서치 - 노트 + 감정(Bullish/Bearish/Neutral)</li>
            <li>• 캘린더 - 이벤트 + 메모</li>
            <li>• 할 일 목록 - 날짜별 관리</li>
            <li>• 김치 프리미엄 & 차익거래 기회 표시</li>
          </ul>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">CRUD</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">PIN Auth</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">One-page</span>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">4.</span> 환경변수 삽질
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            Vercel에서 환경변수가 제대로 안 읽히는 문제 발생.
            &quot;Invalid value&quot; 에러가 계속 나서, 결국 Supabase 키를 코드에 직접 넣었다.
            (anon key는 공개해도 안전함)
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p className="text-red-400 font-semibold">TypeError: Failed to execute &apos;set&apos; on &apos;Headers&apos;: Invalid value</p>
            <p className="text-[#a3a3a3] text-sm mt-1">
              환경변수가 undefined로 들어가서 발생한 에러. 하드코딩으로 해결.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">env vars</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Vercel</span>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-400">5.</span> 리서치 상세보기 개선
          </h3>
          <p className="text-[#a3a3a3] mb-4">
            리서치 노트가 길어지면 잘리는 문제 발생.
            풀스크린 상세보기로 변경하고, 적당한 폭(max-w-3xl)에서 자동 줄바꿈 되도록 수정.
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-[#737373]">// 텍스트 줄바꿈 설정</div>
            <div className="text-green-400">max-w-3xl</div>
            <div className="text-green-400">white-space: pre-wrap</div>
            <div className="text-green-400">word-wrap: break-word</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Full Screen</span>
            <span className="px-2 py-1 bg-[#262626] rounded text-xs">Text Wrap</span>
          </div>
        </div>

        {/* What I learned */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">배운 것</h2>
        <ul className="space-y-3 text-[#a3a3a3]">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Cloudflare Pages는 Next.js 15.5.2까지만 지원 (16은 안 됨)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Supabase RLS가 기본 활성화라 DISABLE 해야 데이터 접근 가능</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Vercel 환경변수는 NEXT_PUBLIC_ 접두사 필요 (클라이언트 노출용)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Supabase anon key는 공개해도 안전 (RLS로 보호됨)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>whitespace-pre-wrap + max-width로 긴 텍스트 줄바꿈 처리</span>
          </li>
        </ul>

        {/* Stats */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">오늘의 숫자</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">5</p>
            <p className="text-sm text-[#737373]">DB 테이블</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">1</p>
            <p className="text-sm text-[#737373]">원페이지</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">1507</p>
            <p className="text-sm text-[#737373]">PIN 코드</p>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">2</p>
            <p className="text-sm text-[#737373]">호스팅 시도</p>
          </div>
        </div>

        {/* Features */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">완성된 기능</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 에어드랍 트래커 (태스크 + 비용 관리)
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 코인 리서치 노트 (풀스크린 상세보기)
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 캘린더 + 이벤트 메모
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 할 일 목록
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> 김치 프리미엄 모니터링
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> PIN 로그인 (편집 권한)
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span> Supabase 데이터 영구 저장
          </div>
        </div>

        {/* Thoughts */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">느낀 점</h2>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
          <p className="text-[#a3a3a3] leading-relaxed">
            남는 도메인을 활용해서 유용한 걸 만들었다!
            워드프레스 호스팅비 내던 걸 해지하고 Vercel 무료로 전환.
            <br/><br/>
            Supabase 연동은 생각보다 쉬웠는데, 환경변수 문제로 삽질을 많이 했다.
            결국 하드코딩으로 해결한 건 좀 찝찝하지만... 작동하니까 OK!
            <br/><br/>
            원페이지 대시보드라 한 눈에 다 보여서 편하다.
            에어드랍 관리할 때 유용하게 쓸 것 같다.
          </p>
        </div>

        {/* Links */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">링크</h2>
        <div className="space-y-2">
          <a
            href="https://tftchess.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-purple-400 hover:underline"
          >
            → shud onepage (tftchess.com)
          </a>
          <a
            href="https://github.com/shud26/shud-onepage"
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
          <li>☐ 리서치에 이미지 첨부 기능</li>
          <li>☐ 광고 추가 (Google AdSense)</li>
          <li>☐ 텔레그램 알림 연동</li>
          <li>☐ 모바일 UI 개선</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#262626]">
        <div className="flex justify-between items-center">
          <Link href="/blog/vibe-coding-day8" className="text-[#737373] hover:text-white transition">
            ← Day 8
          </Link>
          <span className="text-[#525252]">Day 10 coming soon...</span>
        </div>
      </footer>
    </article>
  );
}
