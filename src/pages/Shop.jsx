import { SlidersHorizontal, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/store'

export default function Shop() {
  const [active, setActive] = useState('all')
  const [sort, setSort] = useState('featured')

  const list = useMemo(() => {
    let next = active === 'all' ? products : products.filter((p) => p.category === active)
    if (sort === 'price-asc') next = [...next].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') next = [...next].sort((a, b) => b.price - a.price)
    if (sort === 'rating') next = [...next].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    if (sort === 'name') next = [...next].sort((a, b) => a.name.localeCompare(b.name))
    return next
  }, [active, sort])

  return (
    <div className="bg-[#fcfbf9] py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              <Sparkles className="h-3 w-3" />
              Complete Atelier Catalog
            </div>
            <h1 className="mt-1 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
              The Grand Collection
            </h1>
            <p className="mt-1 text-xs text-stone-500">
              Showing {list.length} pieces of fine craftsmanship and couture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-stone-500">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Sort:
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-800 outline-none focus:border-stone-950"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Collector Rating</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
            All Creations ({products.length})
          </FilterChip>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length
            return (
              <FilterChip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
                {c.name} ({count})
              </FilterChip>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? 'bg-stone-950 text-white shadow-md'
          : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-950'
      }`}
    >
      {children}
    </button>
  )
}
