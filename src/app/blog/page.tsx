import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      slug: "vibe-coding-day6",
      title: "바이브 코딩 시작하기 Day 6",
      description: "업비트 상장 알림 도전기. 공지 API가 없어서 실패했지만, 안 되는 이유를 알게 됐다!",
      date: "2026.01.23",
      tags: ["Vibe Coding", "Day 6", "API 리서치"],
    },
    {
      slug: "vibe-coding-day5",
      title: "바이브 코딩 시작하기 Day 5",
      description: "Morning Briefing Bot으로 P성향 극복하기, 김치 프리미엄 모니터링 대시보드 추가!",
      date: "2026.01.21",
      tags: ["Vibe Coding", "Day 5", "생산성"],
    },
    {
      slug: "vibe-coding-day4",
      title: "바이브 코딩 시작하기 Day 4",
      description: "Cross-DEX 펀딩비 차익거래 봇, Google Calendar 연동, Todo 풀 업그레이드까지!",
      date: "2026.01.20",
      tags: ["Vibe Coding", "Day 4", "Trading Bot"],
    },
    {
      slug: "vibe-coding-day3",
      title: "바이브 코딩 시작하기 Day 3",
      description: "대시보드 실시간 연동, Todo List + 텔레그램 알림, 그리고 React Hooks 버그와의 싸움.",
      date: "2026.01.19",
      tags: ["Vibe Coding", "Day 3", "Bug Fix"],
    },
    {
      slug: "vibe-coding-day2",
      title: "바이브 코딩 시작하기 Day 2",
      description: "포트폴리오 사이트, 멀티 DEX 트래커, GitHub Actions까지. 바이브 코딩의 속도가 무섭다.",
      date: "2026.01.18",
      tags: ["Vibe Coding", "Day 2", "Vercel"],
    },
    {
      slug: "vibe-coding-day1",
      title: "바이브 코딩 시작하기 Day 1",
      description: "코딩을 전혀 모르는 상태에서 Claude Code와 함께 첫 프로그램을 만들었다.",
      date: "2026.01.17",
      tags: ["Vibe Coding", "Day 1", "시작"],
    },
  ];

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-[#737373]">배운 것들과 인사이트를 공유합니다</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition group"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold group-hover:text-blue-400 transition">
                {post.title}
              </h2>
              <span className="text-[#737373] text-sm whitespace-nowrap ml-4">
                {post.date}
              </span>
            </div>
            <p className="text-[#a3a3a3] mb-4">{post.description}</p>
            <div className="flex gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-[#262626] rounded text-xs text-[#737373]">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
