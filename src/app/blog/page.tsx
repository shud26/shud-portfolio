import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      slug: "funding-rate",
      title: "펀딩비로 돈 버는 방법",
      description: "펀딩비의 원리와 이를 활용한 트레이딩 전략을 알아봅니다.",
      date: "2026.01.18",
      tags: ["Trading", "Funding Rate", "Strategy"],
    },
    {
      slug: "vibe-coding-start",
      title: "바이브 코딩 시작하기",
      description: "코딩을 모르는 사람도 AI와 함께 프로그램을 만들 수 있습니다.",
      date: "2026.01.17",
      tags: ["Vibe Coding", "AI", "Claude"],
    },
    {
      slug: "multi-dex-tracker",
      title: "멀티 DEX 펀딩비 트래커 만들기",
      description: "여러 거래소의 펀딩비를 동시에 모니터링하는 방법",
      date: "2026.01.18",
      tags: ["Python", "DEX", "Automation"],
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
