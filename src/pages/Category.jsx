import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/store'

export default function Category() {
  const { id } = useParams()
  const category = categories.find((c) => c.id === id)
  const list = products.filter((p) => p.category === id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Category</p>
      <h1 className="mt-1 font-serif text-4xl text-navy">{category?.name || 'Collection'}</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">{category?.description}</p>
      {list.length === 0 ? (
        <p className="mt-10 text-slate-500">New pieces for this category are arriving soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
