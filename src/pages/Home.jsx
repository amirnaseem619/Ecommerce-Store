import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/store'

export default function Home() {
  const trending = products.filter((p) => p.trending)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div>
      <section className="relative overflow-hidden">
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/55 to-transparent" />
        <div className="relative mx-auto grid min-h-[420px] max-w-6xl items-center px-4 py-16 sm:min-h-[500px] lg:min-h-[560px] lg:px-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand shadow-sm ring-1 ring-orange-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              New Season
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl lg:text-[56px]">
              Redefining Modern
              <br />
              Elegance.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Discover our curated collection of premium essentials designed for those who see wholesale precision and timeless style.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark hover:shadow-md"
              >
                Shop Now
              </Link>
              <Link
                to="/new-arrivals"
                className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-navy sm:text-[28px]">Curated Categories</h2>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-navy sm:flex">
            Explore all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          <Link
            to="/category/premium-tech"
            className="group relative min-h-[280px] overflow-hidden rounded-2xl md:col-span-6 md:row-span-2 md:min-h-[420px]"
          >
            <img
              src="/images/category-premium-tech.png"
              alt="Premium Tech"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-semibold">Premium Tech</h3>
              <p className="mt-1 max-w-xs text-sm text-white/75">Sleek engineering for the modern professional.</p>
            </div>
          </Link>

          <Link
            to="/category/active-living"
            className="group relative min-h-[200px] overflow-hidden rounded-2xl md:col-span-6 md:min-h-[200px]"
          >
            <img
              src="/images/category-active-living.jpg"
              alt="Active Living"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-lg font-semibold">Active Living</h3>
              <p className="text-sm text-white/80">Rugged wearables for every stride.</p>
            </div>
          </Link>

          <Link
            to="/category/audio-elite"
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-zinc-950 md:col-span-3"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-24 w-24 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-950 shadow-2xl ring-1 ring-white/10 transition duration-500 group-hover:scale-110">
                <div className="absolute left-3 top-3 grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-zinc-400/80" />
                  ))}
                </div>
                <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border border-zinc-500" />
                <span className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-zinc-300" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-base font-semibold">Audio Elite</h3>
            </div>
          </Link>

          <Link
            to="/category/timepieces"
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-[#102a4a] md:col-span-3"
          >
            <div className="absolute inset-0 flex items-center justify-center transition duration-500 group-hover:scale-105">
              <div className="relative flex h-24 w-[7.5rem] items-center justify-center bg-[#c9a46a] [clip-path:polygon(12%_0,88%_0,100%_22%,100%_78%,88%_100%,12%_100%,0_78%,0_22%)]">
                <div className="flex h-[5.4rem] w-[6.4rem] flex-col items-center justify-center bg-[#102a4a] text-center [clip-path:polygon(12%_0,88%_0,100%_22%,100%_78%,88%_100%,12%_100%,0_78%,0_22%)]">
                  <span className="font-serif text-lg leading-none tracking-[0.18em] text-[#e8d3a4]">SAFE</span>
                  <span className="mt-1 font-serif text-lg leading-none tracking-[0.22em] text-[#e8d3a4]">WOK</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-base font-semibold">Timepieces</h3>
            </div>
          </Link>
        </div>
        <Link to="/shop" className="mt-5 flex items-center gap-1 text-sm font-medium text-slate-500 sm:hidden">
          Explore all categories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="bg-page py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-navy sm:text-[28px]">Trending Now</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              The most sought-after pieces of the season, selected for their superior quality and exceptional design.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-[#0b2a4e] px-6 py-12 text-white sm:px-10 lg:px-14">
          <img
            src="/images/newsletter-bag.png"
            alt=""
            className="pointer-events-none absolute -right-6 top-1/2 hidden h-[140%] w-auto -translate-y-1/2 opacity-25 sm:block"
          />
          <div className="relative max-w-xl">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">Stay ahead of the curve.</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Join our inner circle for exclusive access to limited drops, professional insights, and seasonal styling guides.
            </p>
            {subscribed ? (
              <p className="mt-6 text-sm font-medium text-emerald-300">You are on the list. Welcome to the inner circle.</p>
            ) : (
              <form
                className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!email.trim()) return
                  setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-11 flex-1 rounded-md border border-white/10 bg-[#16345c] px-4 text-sm text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-brand/60"
                />
                <button
                  type="submit"
                  className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Subscribe Now
                </button>
              </form>
            )}
            <p className="mt-4 text-[11px] text-white/40">By subscribing, you agree to our Privacy Policy.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
