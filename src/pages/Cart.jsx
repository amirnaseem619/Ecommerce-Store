import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function Cart() {
  const {
    cart,
    updateQty,
    removeFromCart,
    rawSubtotal,
    discountAmount,
    discountPercent,
    cartTotal,
    applyPromo,
    removePromo,
    promoCode,
    promoError,
    setIsCheckoutOpen,
  } = useStore()

  const [inputCode, setInputCode] = useState('')

  if (cart.length === 0) {
    return (
      <div className="bg-[#fcfbf9] py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="mt-5 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
            Your Shopping Bag is Empty
          </h1>
          <p className="mt-2 text-xs text-stone-500 sm:text-sm">
            Explore the Autumn / Winter 2026 Capsule Collection to curate your private acquisition.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-850"
          >
            Explore Capsule Collection
          </Link>
        </div>
      </div>
    )
  }

  const handleApply = (e) => {
    e.preventDefault()
    if (!inputCode.trim()) return
    applyPromo(inputCode)
    setInputCode('')
  }

  return (
    <div className="bg-[#fcfbf9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
          Shopping Bag ({cart.length} creations)
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          {/* Items list */}
          <div className="space-y-4 lg:col-span-8">
            {cart.map((item) => (
              <div
                key={item.key || item.id}
                className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f8f7f4] p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {item.categoryLabel}
                      </span>
                      <Link
                        to={`/product/${item.id}`}
                        className="mt-0.5 block font-serif text-base font-bold text-stone-950 hover:text-amber-900"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-stone-500">
                        {item.selectedSize && (
                          <span className="rounded bg-stone-100 px-2 py-0.5">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="rounded bg-stone-100 px-2 py-0.5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.isBundleItem && (
                          <span className="rounded bg-amber-50 px-2 py-0.5 font-semibold text-amber-800">
                            Capsule Bundle Item
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-stone-950">
                        {formatPrice(item.price * item.qty)}
                      </span>
                      {item.qty > 1 && (
                        <span className="block text-[11px] text-stone-400">
                          {formatPrice(item.price)} each
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                    <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateQty(item.key || item.id, item.qty - 1)}
                        className="p-2 text-stone-600 hover:text-stone-950"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-900">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.key || item.id, item.qty + 1)}
                        className="p-2 text-stone-600 hover:text-stone-950"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.key || item.id)}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <aside className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm lg:col-span-4">
            <h2 className="font-serif text-lg font-bold text-stone-950">Acquisition Summary</h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApply} className="mt-4">
              {promoCode ? (
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                  <span className="font-semibold">Code: {promoCode} (-{discountPercent}%)</span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="font-bold underline hover:text-emerald-950"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    placeholder="VIP Code (e.g. LUXE10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs uppercase outline-none focus:border-stone-950 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-stone-950 bg-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-stone-850"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && <p className="mt-1 text-xs text-rose-600">{promoError}</p>}
            </form>

            <div className="mt-6 space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-950">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>VIP Privilege Savings ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Express Delivery</span>
                <span className="font-semibold text-emerald-700">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Signature Velvet Packaging</span>
                <span className="font-semibold text-stone-950">Included</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-950">
                <span>Total</span>
                <span className="text-amber-950">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-950 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-850 active:scale-98"
            >
              <span>Proceed to Private Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Encrypted SSL • Atelier Authenticity Assured</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
