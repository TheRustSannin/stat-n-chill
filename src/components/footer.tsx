export function Footer() {
  return (
    <footer className="w-full border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 mt-auto"
      style={{
        background: "var(--background)"
      }}>
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600" style={{ color: "var(--foreground)" }}>
          © 2025 Stat & Chill. All rights reserved.
        </div>
      </div>
    </footer>
  )
}