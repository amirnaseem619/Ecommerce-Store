import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import CylinderStack from '../components/CylinderStack'
import ProductCard from '../components/ProductCard'
import { formatPrice, products } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-navy">This piece is no longer available.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm text-brand hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const saved = isWishlisted(product.id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
          <div className="aspect-square">
            {product.visual === 'cylinders' ? (
              <CylinderStack />
            ) : (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">{product.categoryLabel}</p>
          <h1 className="mt-2 font-serif text-4xl text-navy">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-navy">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600">{product.description}</p>
          <p className="mt-3 text-sm text-slate-500">Rated {product.rating} by collectors this season.</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-slate-200">
              <button type="button" className="p-3 hover:bg-slate-50" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button type="button" className="p-3 hover:bg-slate-50" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, qty)}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-medium text-navy transition hover:border-rose-200 hover:text-rose-500"
            >
              <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-navy">You may also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
