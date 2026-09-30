import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice, products } from '../data/store'
import { useStore } from '../context/StoreContext'

const links = [
  { to: '/', label: 'The Capsule' },
  { to: '/category/haute-couture', label: 'Couture' },
  { to: '/category/designer-footwear', label: 'Footwear' },
  { to: '/category/timepieces', label: 'Timepieces' },
  { to: '/category/leather-goods', label: 'Leather Goods' },
  { to: '/shop', label: 'View All' },
]

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen } = useStore()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setOpen(false)
      setFocused(false)
    })
    return () => cancelAnimationFrame(handle)
  }, [location.pathname])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) => `${p.name} ${p.categoryLabel} ${p.description}`.toLowerCase().includes(q))
      .slice(0, 5)
  }, [query])

  const submitSearch = (event) => {
    event.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setFocused(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Privilege Announcement Bar */}
      <div className="bg-stone-950 px-4 py-2 text-center text-[11px] font-medium tracking-[0.16em] text-amber-200">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>AUTUMN / WINTER 2026 CAPSULE • USE CODE <strong className="font-bold underline text-amber-300">LUXE10</strong> FOR 10% PRIVILEGE DISCOUNT • COMPLIMENTARY COURIER DELIVERY</span>
        </div>
      </div>

      <div className="border-b border-stone-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          {/* Brand Mark */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-amber-300 font-serif font-bold text-lg shadow-sm transition group-hover:scale-105 group-hover:bg-amber-950">
              L
            </div>
            <div>
              <span className="block font-serif text-lg font-bold tracking-[0.2em] text-stone-950">
                LUX ORO
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
                Atelier Haute Horology &amp; Couture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `transition hover:text-stone-950 ${
                    isActive ? 'font-bold text-stone-950 border-b-2 border-stone-950 pb-0.5' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Autocomplete Search */}
            <form onSubmit={submitSearch} className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              <input
                id="nav-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search silk dress, pumps, chronograph..."
                className="w-48 rounded-full border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs outline-none transition-all duration-300 focus:w-64 focus:border-stone-900 focus:bg-white"
              />

              {focused && suggestions.length > 0 && (
                <div className="absolute right-0 top-[115%] z-30 w-80 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-2xl">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Suggested Pieces
                  </div>
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-stone-50 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-lg bg-stone-100 object-contain p-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-stone-900">{item.name}</p>
                        <p className="text-[10px] text-stone-500">{item.categoryLabel}</p>
                      </div>
                      <span className="text-xs font-bold text-stone-900">
                        {formatPrice(item.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag (Opens sliding drawer) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-9 items-center gap-2 rounded-full bg-stone-950 px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-850 active:scale-95"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-amber-300" />
              <span className="hidden sm:inline">Bag</span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-stone-950">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-full p-2 text-stone-900 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="border-t border-stone-100 bg-white px-5 py-4 lg:hidden">
            <form onSubmit={submitSearch} className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-9 pr-4 text-xs outline-none"
              />
            </form>
            <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3 py-2.5 hover:bg-stone-50"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
