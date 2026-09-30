import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { formatPrice, products } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart, toggleWishlist, isWishlisted, setIsCheckoutOpen } = useStore()

  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [activeTab, setActiveTab] = useState('craftsmanship')
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' })
  const [showSizeModal, setShowSizeModal] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Atelier Archive Piece
        </h2>
        <p className="mt-3 text-sm text-stone-500">
          This creation is currently not present in the active collection.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-xl bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
        >
          Return to All Salons
        </Link>
      </div>
    )
  }

  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : '')
  const currentColor = selectedColor || (product.colors ? product.colors[0]?.name : '')
  const saved = isWishlisted(product.id)

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.image})`,
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' })
  }

  const handleBuyNow = () => {
    addToCart(product, qty, {
      size: currentSize,
      color: currentColor,
    })
    setIsCheckoutOpen(true)
  }

  return (
    <div className="bg-[#fcfbf9] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900 transition">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
          <Link to={`/category/${product.category}`} className="hover:text-stone-900 transition">
            {product.categoryLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
          <span className="font-semibold text-stone-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: High-Res Interactive Visual Stage */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[500px] w-auto object-contain mix-blend-multiply transition-transform duration-300"
                />

                {/* Loupe / Magnified Lens Layer on Hover */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-no-repeat bg-[length:240%]"
                  style={zoomStyle}
                />

                {/* Badges */}
                {product.badge && (
                  <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-stone-950/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 shadow-md backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    {product.badge}
                  </span>
                )}

                <span className="absolute bottom-4 right-4 rounded-lg bg-stone-100/80 px-2.5 py-1 text-[11px] font-medium text-stone-600 backdrop-blur">
                  Hover to inspect texture
                </span>
              </div>

              {/* Provenance strip under image */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 text-center text-xs">
                <div>
                  <span className="block font-bold text-stone-900">Provenance</span>
                  <span className="text-stone-500">{product.origin}</span>
                </div>
                <div className="border-x border-stone-100">
                  <span className="block font-bold text-stone-900">Authenticity</span>
                  <span className="text-emerald-700 font-medium">Certified Numbered</span>
                </div>
                <div>
                  <span className="block font-bold text-stone-900">Packaging</span>
                  <span className="text-stone-500">Atelier Gift Box</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Controls */}
          <div className="lg:col-span-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-800">
                {product.categoryLabel} • {product.origin}
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="mt-1 text-sm text-stone-500 font-medium">
                  {product.subtitle}
                </p>
              )}

              {/* Price & Rating */}
              <div className="mt-5 flex items-baseline justify-between border-b border-stone-200 pb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-stone-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-stone-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-amber-700/80">({product.reviewCount} client reviews)</span>
                </div>
              </div>

              {/* Editorial Description */}
              <p className="mt-5 text-sm leading-relaxed text-stone-700">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Color Finish: <span className="font-semibold text-amber-900">{currentColor}</span>
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {product.colors.map((c) => {
                      const isSel = currentColor === c.name
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs transition ${
                            isSel
                              ? 'border-stone-950 bg-stone-950 text-white font-semibold shadow-md'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="h-3 w-3 rounded-full border border-stone-300 ring-1 ring-white"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Select Size: <span className="font-semibold text-amber-900">{currentSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeModal(true)}
                      className="text-xs font-semibold text-stone-600 underline hover:text-stone-950"
                    >
                      Measurement Guide
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSel = currentSize === s
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                            isSel
                              ? 'border-stone-950 bg-stone-950 text-white shadow-md'
                              : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Highlights Bullet List */}
              {product.highlights && (
                <div className="mt-6 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Artisanal Highlights
                  </span>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-stone-600">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Purchasing CTA Buttons */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 items-center rounded-xl border border-stone-300 bg-white px-2">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="p-2 text-stone-600 hover:text-stone-950"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-stone-950">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="p-2 text-stone-600 hover:text-stone-950"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(product, qty, {
                        size: currentSize,
                        color: currentColor,
                      })
                    }
                    className="flex flex-1 h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-850 active:scale-98"
                  >
                    <ShoppingBag className="h-4 w-4 text-amber-300" />
                    <span>Add to Bag • {formatPrice(product.price * qty)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 transition hover:border-stone-950 hover:text-rose-600"
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`h-5 w-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-xs font-bold uppercase tracking-widest text-stone-950 shadow-md transition hover:brightness-110 active:scale-98"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Acquire Now with White-Glove Checkout</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-stone-600 border-t border-stone-200 pt-5">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-amber-800" />
                  <span>Complimentary Express Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-800" />
                  <span>Numbered Certificate Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-amber-800" />
                  <span>30-Day Atelier Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-amber-800" />
                  <span>Signature Velvet Gift Box</span>
                </div>
              </div>

              {/* Styling Note */}
              {product.stylingNote && (
                <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 text-xs">
                  <span className="font-bold text-amber-900">Styling Recommendation:</span>
                  <p className="mt-1 text-stone-700 leading-relaxed">{product.stylingNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Craftsmanship, Care, Delivery */}
        <section className="mt-16 border-t border-stone-200 pt-12">
          <div className="flex gap-4 border-b border-stone-200 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveTab('craftsmanship')}
              className={`pb-3 transition ${
                activeTab === 'craftsmanship'
                  ? 'border-b-2 border-stone-950 text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Artisanship &amp; Materials
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-stone-950 text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              White-Glove Shipping &amp; Returns
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition ${
                activeTab === 'care'
                  ? 'border-b-2 border-stone-950 text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Preservation &amp; Care
            </button>
          </div>

          <div className="py-6 text-sm text-stone-700">
            {activeTab === 'craftsmanship' && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Material Integrity</h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{product.material}</p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">{product.craftsmanship}</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Atelier Workshop</h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    Hand-crafted exclusively in {product.origin}. Each artisan holds master guild credentials and oversees fewer than ten pieces each week to guarantee impeccable seams and finishing.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-3 text-xs leading-relaxed text-stone-600">
                <p>
                  Every piece leaves our European atelier via secure priority dispatch. Deliveries within North America and Europe typically arrive within 2-3 business days with direct signature verification.
                </p>
                <p>
                  Complimentary 30-day returns and exchanges are honored for pieces in unblemished, unworn condition with all protective films, dust covers, and atelier seals intact.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-2xl space-y-3 text-xs leading-relaxed text-stone-600">
                <p>
                  To preserve the luster of pure silk, natural box calfskin, and sapphire crystal:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Store in the provided breathable cotton dust bag when not in use.</li>
                  <li>Avoid direct exposure to harsh cosmetic chemicals, perfumes, and moisture.</li>
                  <li>Calfskin pieces benefit from biannual nourishing with natural beeswax cream.</li>
                  <li>Silk garments should be entrusted only to professional dry cleaners specializing in haute couture.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Related Pieces */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-stone-200 pt-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
                  Curated Companions
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-stone-950">
                  Complete Your Private Salon
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800"
              >
                View All Pieces →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/70" onClick={() => setShowSizeModal(false)} />
          <div className="relative z-10 max-w-lg w-full rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-stone-900">Atelier Sizing Guide</h3>
            <p className="mt-1 text-xs text-stone-500">
              European and US conversion table for bespoke fit.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-100 font-bold text-stone-900">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Bust / Chest</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Foot Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-600">
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">XS / EU 36</td>
                    <td className="p-2.5">32 - 33 in</td>
                    <td className="p-2.5">24 - 25 in</td>
                    <td className="p-2.5">23.0 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">S / EU 37-38</td>
                    <td className="p-2.5">34 - 35 in</td>
                    <td className="p-2.5">26 - 27 in</td>
                    <td className="p-2.5">23.8 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">M / EU 39-40</td>
                    <td className="p-2.5">36 - 37 in</td>
                    <td className="p-2.5">28 - 29 in</td>
                    <td className="p-2.5">25.0 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">L / EU 41-42</td>
                    <td className="p-2.5">38 - 40 in</td>
                    <td className="p-2.5">30 - 32 in</td>
                    <td className="p-2.5">26.2 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSizeModal(false)}
                className="rounded-lg bg-stone-950 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
