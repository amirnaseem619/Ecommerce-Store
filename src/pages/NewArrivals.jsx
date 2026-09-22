import ProductCard from '../components/ProductCard'
import { products } from '../data/store'

export default function NewArrivals() {
  const list = products.filter((p) => p.isNew)
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Just in</p>
      <h1 className="mt-1 font-serif text-4xl text-navy">New Arrivals</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">The latest pieces from the season, selected for modern living.</p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
