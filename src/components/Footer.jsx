import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div>
          <p className="text-sm font-extrabold tracking-[0.16em] text-navy">LUXE COMMERCE</p>
          <p className="mt-2 text-xs text-slate-400">© 2026 LUXE COMMERCE. Refined retail for modern living.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
          <Link to="/privacy" className="transition hover:text-navy">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition hover:text-navy">
            Terms of Service
          </Link>
          <Link to="/shipping" className="transition hover:text-navy">
            Shipping Info
          </Link>
          <Link to="/support" className="transition hover:text-navy">
            Contact Support
          </Link>
        </nav>
      </div>
    </footer>
  )
}
