import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/store'

export default function Category() {
  const { id } = useParams()
  const category = categories.find((c) => c.id === id)
  const list = products.filter((p) => p.category === id)

  return (
    <div className="bg-[#fcfbf9] py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-stone-950 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Grand Catalog
        </Link>

        {/* Category Header Hero */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Department Salon
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold text-stone-950 sm:text-4xl lg:text-5xl">
                {category?.name || 'Exclusive Atelier Salon'}
              </h1>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600">
                {category?.description ||
                  'Curated with precision, using the finest materials and traditional European craftsmanship.'}
              </p>
              <div className="mt-4 text-xs font-semibold text-stone-400">
                {list.length} {list.length === 1 ? 'Creation Available' : 'Creations Available'}
              </div>
            </div>

            {category?.image && (
              <div className="flex justify-center md:col-span-4">
                <div className="relative h-44 w-44 overflow-hidden rounded-2xl bg-[#f8f7f4] p-3 shadow-inner">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products List */}
        {list.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-stone-300 p-12 text-center">
            <p className="font-serif text-lg text-stone-700">New creations currently in fabrication.</p>
            <p className="mt-1 text-xs text-stone-400">
              Our atelier artisans are hand-finishing upcoming pieces for this department.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-block rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Explore Other Salons
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
