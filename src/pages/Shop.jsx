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
    if (sort === 'name') next = [...next].sort((a, b) => a.name.localeCompare(b.name))
    return next
  }, [active, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Collection</p>
          <h1 className="mt-1 font-serif text-4xl text-navy">Shop All</h1>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
          All
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
            {c.name}
          </FilterChip>
        ))}
        <FilterChip active={active === 'accessories'} onClick={() => setActive('accessories')}>
          Accessories
        </FilterChip>
        <FilterChip active={active === 'travel'} onClick={() => setActive('travel')}>
          Travel
        </FilterChip>
        <FilterChip active={active === 'home'} onClick={() => setActive('home')}>
          Home
        </FilterChip>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  )
}
