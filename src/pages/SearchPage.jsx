import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/store'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()
  const list = useMemo(() => {
    const needle = q.toLowerCase()
    if (!needle) return []
    return products.filter((p) =>
      `${p.name} ${p.categoryLabel} ${p.description} ${p.material || ''} ${p.subtitle || ''}`
        .toLowerCase()
        .includes(needle),
    )
  }, [q])

  return (
    <div className="bg-[#fcfbf9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
          <Search className="h-3.5 w-3.5" />
          Catalog Query
        </div>
        <h1 className="mt-1 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
          Search Results
        </h1>
        <p className="mt-2 text-xs text-stone-500 sm:text-sm">
          {q
            ? `${list.length} creation${list.length === 1 ? '' : 's'} matching “${q}” in our archives.`
            : 'Enter a keyword above to search our atelier archive.'}
        </p>

        {list.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm">
            <p className="font-serif text-lg text-stone-700">No atelier creations matched “{q}”</p>
            <p className="mt-2 text-xs text-stone-400">
              Try searching for &quot;dress&quot;, &quot;heels&quot;, &quot;sneaker&quot;, &quot;watch&quot;, or &quot;tote&quot;.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-xl bg-stone-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
            >
              Browse Complete Catalog
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
