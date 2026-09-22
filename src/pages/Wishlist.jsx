import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Wishlist() {
  const { wishlist } = useStore()

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-serif text-4xl text-navy">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-slate-500">Tap the heart on any piece to save it here.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
          Browse collection
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-4xl text-navy">Wishlist</h1>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
