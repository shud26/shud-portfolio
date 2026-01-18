export default function Projects() {
  const projects = [
    {
      title: "멀티 DEX 펀딩비 트래커",
      description: "Hyperliquid, Pacifica, Variational 3개 DEX의 펀딩비를 실시간 모니터링하고 차익거래 기회를 텔레그램으로 알려줍니다.",
      status: "live",
      tags: ["Python", "Telegram Bot", "GitHub Actions", "REST API"],
      github: "https://github.com/shud26/vibe-coding-2026",
      features: ["3개 DEX 동시 모니터링", "차익거래 기회 감지", "텔레그램 알림", "1시간마다 자동 실행"]
    },
    {
      title: "Crypto Portfolio Tracker",
      description: "BTC, ETH, SOL 가격을 실시간으로 추적하고 GitHub Actions로 매 시간 자동 업데이트됩니다.",
      status: "active",
      tags: ["Python", "GitHub Actions", "Hyperliquid API"],
      github: "https://github.com/shud26/crypto-portfolio",
      features: ["실시간 가격 추적", "자동 README 업데이트", "GitHub Actions 자동화"]
    },
    {
      title: "BTC 가격 알림 봇",
      description: "BTC 가격이 만 달러 단위를 돌파할 때 텔레그램으로 알림을 보내줍니다.",
      status: "active",
      tags: ["Python", "Telegram Bot", "Hyperliquid API"],
      github: "https://github.com/shud26/vibe-coding-2026",
      features: ["만 달러 단위 돌파 감지", "텔레그램 즉시 알림", "백그라운드 실행"]
    },
    {
      title: "자동매매 봇",
      description: "조건 충족 시 자동으로 매수/매도하는 트레이딩 봇 (개발 예정)",
      status: "planned",
      tags: ["Python", "Trading API", "Risk Management"],
      github: null,
      features: ["페이퍼 트레이딩", "리스크 관리", "백테스팅"]
    },
  ];

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-[#737373]">바이브 코딩으로 만든 프로젝트들</p>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#141414] border border-[#262626] rounded-xl p-8 hover:border-[#404040] transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-2 h-2 rounded-full ${
                  project.status === "live"
                    ? "bg-green-400 animate-pulse"
                    : project.status === "active"
                    ? "bg-blue-400"
                    : "bg-[#737373]"
                }`}
              ></span>
              <span className="text-sm text-[#737373] capitalize">{project.status}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{project.title}</h2>
            <p className="text-[#a3a3a3] mb-6">{project.description}</p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#737373] mb-2">Features</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-[#262626] rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                className="inline-flex items-center gap-2 text-blue-400 hover:underline"
              >
                GitHub에서 보기 →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
