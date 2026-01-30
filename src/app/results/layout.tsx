import SearchHeader from "./SearchHeader";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-gray-50 to-orange-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      <SearchHeader />

      <main className="flex-1">{children}</main>

      <footer className="mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-wrap gap-4 justify-center">
          <span>© {new Date().getFullYear()} Expert</span>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
