import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shud | Vibe Coder",
  description: "크립토 트레이딩 툴을 만드는 바이브 코더",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#262626]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-400 transition">
              shud
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/projects" className="text-[#737373] hover:text-white transition">
                Projects
              </Link>
              <Link href="/blog" className="text-[#737373] hover:text-white transition">
                Blog
              </Link>
              <Link href="/dashboard" className="text-[#737373] hover:text-white transition">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#262626] mt-20">
          <div className="max-w-5xl mx-auto px-6 py-8 text-center text-[#737373] text-sm">
            <p>© 2026 shud · Built with Claude Code</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://github.com/shud26" target="_blank" className="hover:text-white transition">
                GitHub
              </a>
              <a href="https://shud26.github.io" target="_blank" className="hover:text-white transition">
                Portfolio
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
