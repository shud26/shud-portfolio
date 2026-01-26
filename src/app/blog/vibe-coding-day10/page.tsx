import Link from 'next/link';

export default function Day10() {
  return (
    <main className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-green-600 hover:text-green-400 text-sm">
          &lt; back to blog
        </Link>

        <article className="mt-8">
          <header className="mb-8">
            <time className="text-green-600 text-sm">2026-01-26</time>
            <h1 className="text-2xl font-bold mt-2">
              Day 10: Triangle Dice 웹 호환성 + Clawdbot 리서치
            </h1>
          </header>

          <div className="space-y-6 text-green-300 leading-relaxed">
            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># 오늘 한 것</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Triangle Dice Mini App 웹 브라우저 호환성 수정</li>
                <li>Clawdbot (개인 AI 비서) 리서치</li>
                <li>구형 맥 서버 세팅 시도 (실패)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># Triangle Dice 웹 호환 문제</h2>
              <p className="mb-2">
                Base Mini App으로 만든 Triangle Dice가 일반 웹 브라우저에서 안 열리는 문제 발생.
              </p>
              <p className="mb-2">원인:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>MiniKitProvider가 Mini App 환경에서만 작동</li>
                <li>useMiniKit, useIsInMiniApp 훅이 에러 발생</li>
                <li>@farcaster/miniapp-sdk가 브라우저에서 실패</li>
              </ul>
              <p className="mt-2">해결:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>MiniKitProvider 제거</li>
                <li>WalletConnect에서 MiniKit 훅 제거</li>
                <li>wagmi 훅만 사용하도록 변경</li>
                <li>컨트랙트 주소 하드코딩 (env 변수 Vercel에 없어서)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># Clawdbot이란?</h2>
              <p className="mb-2">
                Claude 기반 오픈소스 개인 AI 비서. 텔레그램/디스코드 등으로 접속.
              </p>
              <p className="mb-2">할 수 있는 것들:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>이메일 작성/발송</li>
                <li>캘린더 관리</li>
                <li>브라우저 자동화</li>
                <li>터미널 명령어 실행</li>
                <li>파일 편집</li>
                <li>스마트홈 제어</li>
                <li>proactive 알림 (먼저 연락함)</li>
              </ul>
              <p className="mt-2">
                근데 크립토 지갑 있는 컴퓨터에 설치하면 위험할 수 있음.
                터미널/파일 접근 권한이 있어서.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># 구형 맥 서버 시도</h2>
              <p className="mb-2">
                구형 맥을 24시간 크립토 봇 서버로 쓰려고 했는데...
              </p>
              <p className="text-red-400">
                OS 버전이 너무 낮아서 포기 ㅠㅠ
              </p>
              <p className="mt-2">
                다른 방법을 찾아봐야겠다. 클라우드 서버? 라즈베리 파이?
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># 배운 것</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Mini App SDK는 일반 브라우저에서 작동 안 함</li>
                <li>웹 호환성 위해 SDK 의존성 제거 필요</li>
                <li>Clawdbot - 강력하지만 보안 고려 필요</li>
                <li>구형 하드웨어 서버로 쓰기 어려움</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># 다음에 할 것</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>크립토 봇 서버 대안 찾기</li>
                <li>신규 토큰 스나이핑 봇 개발</li>
                <li>Triangle Dice Base App 등록 마무리</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold text-lg mb-2"># 코드 변경</h2>
              <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Before (에러 발생)
import { useMiniKit } from '@coinbase/onchainkit/minikit';
const { setFrameReady, context } = useMiniKit();

// After (웹 호환)
import { useAccount, useConnect } from 'wagmi';
// MiniKit 훅 제거, wagmi만 사용`}
              </pre>
            </section>
          </div>
        </article>

        <footer className="mt-12 pt-8 border-t border-green-900">
          <p className="text-green-600 text-sm">
            Day 10 of mass producing vibe coding
          </p>
        </footer>
      </div>
    </main>
  );
}
