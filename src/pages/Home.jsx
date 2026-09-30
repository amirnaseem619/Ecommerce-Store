import { ArrowRight, Check, Eye, ShoppingBag, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, ensembleBundle, formatPrice, products } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function Home() {
  const { addEnsembleToCart, openQuickView } = useStore()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [selectedPillar, setSelectedPillar] = useState(0)

  // The 5 Flagship pieces from the user's photos
  const flagshipIds = [
    'aurelia-silk-dress',
    'scarlet-sole-pumps',
    'cortina-suede-sneakers',
    'lux-oro-chronograph',
    'modena-leather-tote',
  ]
  const flagshipProducts = flagshipIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  const ensembleProducts = ensembleBundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  const activeFlagship = flagshipProducts[selectedPillar] || flagshipProducts[0]

  return (
    <div className="bg-[#fcfbf9]">
      {/* 1. HERO SECTION: High Editorial Luxury */}
      <section className="relative overflow-hidden border-b border-stone-200/60 bg-gradient-to-b from-[#f7f5f0] via-[#fbf9f5] to-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-900 shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>The Flagship Capsule Collection</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl lg:text-[58px] lg:leading-[1.12]">
                Architectural
                <br />
                <span className="italic font-normal text-amber-900">Drapery</span> &amp;
                <br />
                Timeless Precision.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-stone-600 sm:text-base">
                Introducing five quintessential works of art. From the fluid liquid luster of Como mulberry silk and iconic scarlet-lacquered stilettos to the deep celestial blue of the LUX ORO chronograph and Tuscan hand-pebbled leather.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#flagship-capsule"
                  className="rounded-xl bg-stone-950 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-850 hover:shadow-2xl active:scale-95"
                >
                  Explore The 5 Icons
                </a>
                <a
                  href="#curated-ensemble"
                  className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 shadow-sm transition hover:border-stone-950 hover:bg-stone-50"
                >
                  View Complete Look
                </a>
              </div>

              {/* Provenance Micro-features */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-6 text-xs text-stone-600">
                <div>
                  <span className="block font-bold text-stone-950">22-Momme</span>
                  <span className="text-[11px] text-stone-500">Pure Grade 6A Silk</span>
                </div>
                <div>
                  <span className="block font-bold text-stone-950">Italian Box</span>
                  <span className="text-[11px] text-stone-500">Full-Grain Calfskin</span>
                </div>
                <div>
                  <span className="block font-bold text-stone-950">316L Surgical</span>
                  <span className="text-[11px] text-stone-500">Double-Domed Sapphire</span>
                </div>
              </div>
            </div>

            {/* Right Hero Stage: Interactive Showcase */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-200/30 to-rose-100/30 blur-2xl" />

                <div className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-2xl">
                  {/* Active piece preview */}
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#f8f7f4] p-6">
                    <img
                      src={activeFlagship.image}
                      alt={activeFlagship.name}
                      className="max-h-[360px] w-auto object-contain mix-blend-multiply transition-all duration-700 hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-stone-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-200 shadow-sm">
                      {activeFlagship.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => openQuickView(activeFlagship)}
                      className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-stone-900 shadow-md backdrop-blur hover:bg-stone-900 hover:text-white transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Quick Inspect
                    </button>
                  </div>

                  {/* Active piece info */}
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800">
                        {activeFlagship.categoryLabel}
                      </span>
                      <h2 className="mt-1 font-serif text-xl font-bold text-stone-900">
                        {activeFlagship.name}
                      </h2>
                      <p className="text-xs text-stone-500 line-clamp-1">{activeFlagship.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-stone-950">
                        {formatPrice(activeFlagship.price)}
                      </span>
                      <Link
                        to={`/product/${activeFlagship.id}`}
                        className="block mt-1 text-xs font-semibold text-amber-900 underline hover:text-stone-950"
                      >
                        Acquire Piece →
                      </Link>
                    </div>
                  </div>

                  {/* 5 Thumbnails selector */}
                  <div className="mt-5 flex gap-2 border-t border-stone-100 pt-4">
                    {flagshipProducts.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPillar(idx)}
                        className={`relative flex-1 overflow-hidden rounded-xl border p-1 transition ${
                          selectedPillar === idx
                            ? 'border-stone-950 ring-2 ring-stone-950/10 bg-amber-50/50'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                        }`}
                        title={p.name}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="aspect-square h-full w-full object-contain mix-blend-multiply"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 5 FLAGSHIP ICONS GRID */}
      <section id="flagship-capsule" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              Autumn / Winter 2026
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
              The Five Flagship Icons
            </h2>
            <p className="mt-2 text-xs text-stone-500 sm:text-sm max-w-xl">
              Individually crafted across Italian and Swiss ateliers. Hand-selected for exceptional provenance, supreme tactile luxury, and enduring elegance.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800"
          >
            <span>View Complete Atelier Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {flagshipProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* 3. THE CURATED SOIRÉE ENSEMBLE: Complete the Look Lookbook */}
      <section id="curated-ensemble" className="relative overflow-hidden bg-stone-950 py-16 text-white lg:py-24">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left: Ensemble Composition */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                <Sparkles className="h-4 w-4" />
                Atelier Styling Lookbook
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                The Curated
                <br />
                <span className="italic font-normal text-amber-300">Autumn Gala</span>
                <br />
                Ensemble.
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-stone-300 sm:text-sm">
                A seamless dialogue between liquid silk drape, crimson-lacquered box calfskin, Tuscan pebbled leather, and Swiss chronometer engineering. Acquire the four harmonious cornerstones together at an exclusive private client privilege.
              </p>

              {/* Bundle Pricing Card */}
              <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm">
                <div className="flex items-baseline justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Capsule Bundle Special
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-bold text-white">
                        {formatPrice(ensembleBundle.bundlePrice)}
                      </span>
                      <span className="text-sm text-stone-500 line-through">
                        {formatPrice(ensembleBundle.totalOriginalPrice)}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                    Save {formatPrice(ensembleBundle.savings)}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>The Aurelia Silk Midi Dress ($695)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Scarlet-Sole Noir Leather Pumps ($895)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Modena Grained Leather Buckle Tote ($740)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>LUX ORO Celestial Chronograph ($1,650)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addEnsembleToCart(ensembleProducts, ensembleBundle.bundlePrice)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-950 shadow-xl transition hover:brightness-110 active:scale-98"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Acquire Complete 4-Piece Look
                </button>
              </div>
            </div>

            {/* Right: Visual Lookbook Grid */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              {ensembleProducts.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-4 transition duration-500 hover:border-amber-400/40"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#141414] p-3 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full w-auto object-contain transition duration-700 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => openQuickView(item)}
                      className="absolute inset-0 flex items-center justify-center bg-stone-950/60 opacity-0 transition group-hover:opacity-100"
                    >
                      <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-950 shadow-lg">
                        Inspect Piece
                      </span>
                    </button>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {item.categoryLabel}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-white line-clamp-1">
                        {item.name}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-stone-200">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              Departmental Salons
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-stone-950">
              Explore by Atelier
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800 sm:flex"
          >
            <span>All Departments</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-stone-400 hover:shadow-xl"
            >
              <div className="relative aspect-[1/1.05] overflow-hidden rounded-xl bg-[#f8f7f4] p-4 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full w-auto object-contain mix-blend-multiply transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                  {cat.tagline || 'Private Collection'}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-stone-950 group-hover:text-amber-900 transition">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-stone-500 line-clamp-2">{cat.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs font-semibold text-stone-900">
                  <span>{cat.itemCount || 'Curated'}</span>
                  <span className="flex items-center gap-1 text-amber-800 group-hover:translate-x-1 transition">
                    Explore Salon →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & ATELIER HERITAGE */}
      <section className="border-y border-stone-200/70 bg-[#f7f5f0] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              The Atelier Standard
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
              Uncompromising Provenance
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
              We reject industrial mass fabrication. Each item in our gallery represents dozens of hours of disciplined craftsmanship by generational artisans in Italy and Switzerland.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <span className="font-serif text-2xl font-bold text-amber-800">01</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">
                Grade 6A Mulberry Silk
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Woven in historic Como mills, our 22-momme silk charmeuse is finished on the bias for fluid kinetic drape and high light reflectivity without synthetic stiffness.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <span className="font-serif text-2xl font-bold text-amber-800">02</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">
                Hand-Lacquered Scarlet Soles
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Our Tuscan shoe artisans hand-bevel each Italian calfskin box sole before coating with durable scarlet high-gloss lacquer, balanced on an engineered needle core.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <span className="font-serif text-2xl font-bold text-amber-800">03</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">
                Le Locle Chronometer Standard
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Every LUX ORO watch undergoes 15 days of chronometric verification, double-domed sapphire testing, and 5 ATM hydrostatic seal certification in Switzerland.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VIP SALON INVITATION & PRIVILEGE CODE */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-950 px-6 py-14 text-white sm:px-12 lg:px-16">
          <div className="relative max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">
              Private Client Access
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Enter The LUX ORO Circle
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 sm:text-sm">
              Receive confidential notices on numbered timepiece allocations, seasonal runway preview drops, and private salon appointments. Apply code <strong className="text-amber-300">LUXE10</strong> for 10% off your first acquisition.
            </p>

            {subscribed ? (
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300">
                <Check className="h-5 w-5" />
                <span>You have been registered. Welcome to our private client ledger.</span>
              </div>
            ) : (
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
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
                  className="h-11 flex-1 rounded-xl border border-stone-800 bg-stone-900 px-4 text-xs text-white placeholder-stone-500 outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-amber-400 px-6 text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
                >
                  Join Circle
                </button>
              </form>
            )}
            <p className="mt-3 text-[10px] text-stone-500">
              Strictly confidential. We respect your discretion and never share client data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
