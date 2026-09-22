import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'
import CylinderStack from '../components/CylinderStack'

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore()
  const [checkedOut, setCheckedOut] = useState(false)

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-serif text-4xl text-navy">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">Discover the season’s curated pieces and add them here.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-4xl text-navy">Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <li key={item.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4">
              <Link to={`/product/${item.id}`} className="h-24 w-24 overflow-hidden rounded-xl bg-slate-50">
                {item.visual === 'cylinders' ? (
                  <CylinderStack />
                ) : (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                )}
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy">{item.categoryLabel}</p>
                    <Link to={`/product/${item.id}`} className="font-medium text-navy hover:underline">
                      {item.name}
                    </Link>
                  </div>
                  <p className="font-semibold text-navy">{formatPrice(item.price * item.qty)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-slate-200">
                    <button type="button" className="p-2 hover:bg-slate-50" onClick={() => updateQty(item.id, item.qty - 1)}>
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm">{item.qty}</span>
                    <button type="button" className="p-2 hover:bg-slate-50" onClick={() => updateQty(item.id, item.qty + 1)}>
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-2xl bg-page p-6">
          <h2 className="font-semibold text-navy">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium text-navy">{formatPrice(cartTotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-slate-500">Shipping</span>
            <span className="font-medium text-navy">Complimentary</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-semibold text-navy">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          {checkedOut ? (
            <p className="mt-6 text-center text-sm font-medium text-emerald-700">Order placed. A concierge will confirm shortly.</p>
          ) : (
            <button
              type="button"
              onClick={() => setCheckedOut(true)}
              className="mt-6 w-full rounded-md bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Checkout
            </button>
          )}
        </aside>
      </div>
    </div>
  )
}
