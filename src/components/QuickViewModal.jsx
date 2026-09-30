import { Check, Heart, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWishlisted } = useStore()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)

  if (!quickViewProduct) return null

  const product = quickViewProduct
  const saved = isWishlisted(product.id)
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : '')
  const currentColor = selectedColor || (product.colors ? product.colors[0]?.name : '')

  const handleAdd = () => {
    addToCart(product, qty, {
      size: currentSize,
      color: currentColor,
    })
    closeQuickView()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stone-200/50 bg-white shadow-2xl">
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200 hover:text-stone-900"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
          {/* Image */}
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#f8f8f7] p-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[380px] w-auto object-contain mix-blend-multiply"
            />
            {product.badge && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-stone-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {product.categoryLabel}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount || 48})</span>
                  </div>
                )}
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-stone-900">
                {product.name}
              </h3>
              {product.subtitle && (
                <p className="mt-1 text-xs text-stone-500">{product.subtitle}</p>
              )}

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-3">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-semibold text-stone-900">
                    Color: <span className="font-normal text-stone-600">{currentColor}</span>
                  </span>
                  <div className="mt-2 flex gap-2">
                    {product.colors.map((c) => {
                      const isSel = currentColor === c.name
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${
                            isSel
                              ? 'border-stone-900 bg-stone-900 text-white font-medium'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-stone-300 ring-1 ring-white"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-900">
                      Select Size: <span className="font-normal text-stone-600">{currentSize}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 underline cursor-pointer">
                      Size Guide
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => {
                      const isSel = currentSize === s
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                            isSel
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 border-t border-stone-100 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 text-stone-600 hover:text-stone-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-stone-900 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-stone-800"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag • {formatPrice(product.price * qty)}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:border-stone-400 hover:text-rose-600"
                  aria-label="Save to wishlist"
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <Link
                  to={`/product/${product.id}`}
                  onClick={closeQuickView}
                  className="font-medium text-stone-900 underline hover:text-amber-800"
                >
                  View full product details →
                </Link>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                  <Check className="h-3 w-3" /> In Stock • Ready to ship
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
