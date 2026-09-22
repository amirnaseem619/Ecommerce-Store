import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { products } from '../data/store'
import { useStore } from '../context/StoreContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All' },
  { to: '/new-arrivals', label: 'New Arrivals' },
]

export default function Navbar() {
  const { cartCount, wishlist } = useStore()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setFocused(false)
  }, [location.pathname])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter((p) => `${p.name} ${p.categoryLabel}`.toLowerCase().includes(q)).slice(0, 5)
  }, [query])

  const submitSearch = (event) => {
    event.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setFocused(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5 lg:px-6">
        <Link to="/" className="shrink-0 text-[15px] font-extrabold tracking-[0.14em] text-navy">
          LUXE COMMERCE
        </Link>

        <nav className="ml-6 hidden items-center gap-7 text-sm font-medium text-navy/80 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `transition hover:text-navy ${isActive ? 'font-semibold text-navy' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => document.getElementById('nav-search')?.focus()}
            className="transition hover:text-navy"
          >
            Search
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <form onSubmit={submitSearch} className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="nav-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search products..."
              className="w-44 rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:w-60 focus:border-navy/20 focus:bg-white focus:ring-4 focus:ring-navy/5 lg:w-56"
            />
            {focused && suggestions.length > 0 && (
              <div className="absolute right-0 top-[110%] z-20 w-72 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-50"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-slate-400">{item.categoryLabel}</span>
                  </Link>
                ))}
              </div>
            )}
          </form>

          <Link to="/wishlist" className="relative rounded-full p-2 text-navy transition hover:bg-slate-100" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 text-navy transition hover:bg-slate-100" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-navy md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <form onSubmit={submitSearch} className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none"
            />
          </form>
          <div className="flex flex-col gap-2 text-sm font-medium text-navy">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="rounded-lg px-2 py-2 hover:bg-slate-50">
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
