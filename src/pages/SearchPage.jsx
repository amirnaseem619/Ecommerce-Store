import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/store'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()
  const list = useMemo(() => {
    const needle = q.toLowerCase()
    if (!needle) return []
    return products.filter((p) => `${p.name} ${p.categoryLabel} ${p.description}`.toLowerCase().includes(needle))
  }, [q])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-4xl text-navy">Search</h1>
      <p className="mt-2 text-sm text-slate-500">
        {q ? `${list.length} result${list.length === 1 ? '' : 's'} for “${q}”` : 'Type a product name in the search bar.'}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
