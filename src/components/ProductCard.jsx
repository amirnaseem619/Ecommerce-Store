import { Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'
import CylinderStack from './CylinderStack'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = isWishlisted(product.id)

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-xl bg-white">
        <Link to={`/product/${product.id}`} className="block aspect-[1/1.05]">
          {product.visual === 'cylinders' ? (
            <div className="h-full w-full transition duration-500 group-hover:scale-[1.04]">
              <CylinderStack />
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <button
          type="button"
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-400 shadow-sm backdrop-blur transition hover:scale-110 hover:text-rose-500"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 items-end justify-between gap-3 px-1 pb-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">
            {product.categoryLabel}
          </p>
          <Link to={`/product/${product.id}`} className="mt-1 block text-sm font-medium text-slate-700 transition hover:text-navy">
            {product.name}
          </Link>
          <p className="mt-2 text-lg font-semibold text-navy">{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addToCart(product)}
          className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-sm transition hover:scale-110 hover:bg-brand-dark"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
