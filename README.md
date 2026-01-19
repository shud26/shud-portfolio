# shud-portfolio

바이브 코딩으로 만드는 크립토 트레이딩 툴 포트폴리오 사이트

## Live Site

https://shud26.vercel.app

## Features

### Dashboard (실시간 펀딩비)
- 9개 코인 실시간 모니터링 (BTC, ETH, SOL, DOGE, AVAX, ARB, SUI, LINK, XRP)
- 3개 DEX 연동 (Hyperliquid, Pacifica, Variational)
- 차익거래 기회 자동 계산 (스프레드, 예상 일일 수익률)
- 60초 자동 새로고침

### Todo List (PIN 잠금)
- 할 일 추가/완료/삭제
- 텔레그램 실시간 알림
- PIN 코드 보안 (본인만 사용 가능)
- 일일 요약 보내기

### Blog
- 바이브 코딩 일지 (Day 1, 2, 3...)
- 배운 것들과 버그 해결 과정 공유

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **APIs**: Hyperliquid, Pacifica, Variational, Telegram Bot

## Development Log

### Day 3 (2026-01-19)
- Dashboard 풀 업그레이드 (9개 코인, 차익거래 기회)
- Todo List + 텔레그램 알림 기능
- PIN 잠금 보안 추가
- React Hooks 버그 수정 (조건부 return 아래 useEffect 문제)

### Day 2 (2026-01-18)
- 포트폴리오 사이트 생성 (Next.js + Tailwind)
- Vercel 배포 완료
- 블로그 Day 1, 2 작성

### Day 1 (2026-01-17)
- Claude Code 설치 및 세팅
- BTC 가격 조회 스크립트
- 텔레그램 알림 봇
- GitHub 연동

## Getting Started

```bash
# 설치
npm install

# 개발 서버
npm run dev

# 빌드
npm run build
```

## Project Structure

```
src/app/
├── api/
│   ├── funding/     # 펀딩비 API
│   └── telegram/    # 텔레그램 알림 API
├── blog/            # 블로그 글
├── dashboard/       # 실시간 대시보드
├── projects/        # 프로젝트 목록
└── todo/            # Todo List (PIN 잠금)
```

## Author

- GitHub: [@shud26](https://github.com/shud26)
- Built with Claude Code (Vibe Coding)

---
*마지막 업데이트: 2026-01-19*
