import { Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Wishlist() {
  const { wishlist } = useStore()

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#fcfbf9] py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <Heart className="h-10 w-10 text-stone-300" />
          </div>
          <h1 className="mt-5 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
            Your Private Wishlist is Empty
          </h1>
          <p className="mt-2 text-xs text-stone-500 sm:text-sm">
            Save iconic couture, fine timepieces, and handcrafted leather carryalls to review anytime.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-850"
          >
            Explore The Grand Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#fcfbf9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
            Curated Private Ledger
          </span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
          Saved Creations ({wishlist.length})
        </h1>
        <p className="mt-1 text-xs text-stone-500">
          Your saved selections are reserved in your private client ledger.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
