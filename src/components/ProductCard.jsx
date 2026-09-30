import { Eye, Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useStore()
  const saved = isWishlisted(product.id)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]">
      {/* Product Image Stage */}
      <div className="relative aspect-[1/1.1] w-full overflow-hidden rounded-xl bg-[#f8f8f7]">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2 mix-blend-multiply transition duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-stone-900/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-sm backdrop-blur transition hover:scale-110 hover:text-rose-600 active:scale-95"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900/90 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur transition hover:bg-stone-900 active:scale-98"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between px-1">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
              {product.categoryLabel}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="mt-1 block font-serif text-base font-semibold leading-snug text-stone-900 transition hover:text-amber-800"
          >
            {product.name}
          </Link>

          {product.subtitle && (
            <p className="mt-0.5 line-clamp-1 text-xs text-stone-500">
              {product.subtitle}
            </p>
          )}

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="h-2.5 w-2.5 rounded-full border border-stone-300 ring-1 ring-white"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-stone-400">
                {product.colors.length} {product.colors.length === 1 ? 'shade' : 'shades'}
              </span>
            </div>
          )}
        </div>

        {/* Price & Add to Bag */}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => addToCart(product, 1)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-stone-900 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Bag</span>
          </button>
        </div>
      </div>
    </article>
  )
}
