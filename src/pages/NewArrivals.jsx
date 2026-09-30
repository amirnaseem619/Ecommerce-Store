import { Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/store'

export default function NewArrivals() {
  const list = products.filter((p) => p.isNew)
  return (
    <div className="bg-[#fcfbf9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
          <Sparkles className="h-3 w-3" />
          Autumn / Winter 2026 Debuts
        </div>
        <h1 className="mt-1 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
          Atelier New Arrivals
        </h1>
        <p className="mt-2 max-w-xl text-xs text-stone-500 sm:text-sm">
          Fresh from our European ateliers. Pure Mulberry silk drapery, signature scarlet stilettos, luxury earth-tone trainers, and Swiss chronometers.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
