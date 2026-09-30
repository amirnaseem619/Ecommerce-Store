import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQty,
    removeFromCart,
    rawSubtotal,
    discountAmount,
    discountPercent,
    cartTotal,
    cartCount,
    applyPromo,
    removePromo,
    promoCode,
    promoError,
    setIsCheckoutOpen,
  } = useStore()

  const [inputCode, setInputCode] = useState('')

  if (!isCartOpen) return null

  const freeShippingThreshold = 300
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal)
  const shippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100))

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (!inputCode.trim()) return
    applyPromo(inputCode)
    setInputCode('')
  }

  const handleCheckoutClick = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md border-l border-stone-200/50 bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-stone-900" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Shopping Bag</h2>
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">
                {cartCount}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-900"
              aria-label="Close bag"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="border-b border-stone-100 bg-[#fbfaf8] px-6 py-3">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="h-3.5 w-3.5 text-amber-700" />
                {distanceToFreeShipping === 0
                  ? 'Complimentary White-Glove Delivery unlocked!'
                  : `Add ${formatPrice(distanceToFreeShipping)} more for complimentary delivery`}
              </span>
              <span className="text-[11px] font-semibold text-stone-800">{shippingProgress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 to-stone-900 transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-stone-900">
                  Your bag is empty
                </h3>
                <p className="mt-1 text-xs text-stone-500 max-w-xs">
                  Discover our Autumn/Winter Capsule featuring pure silk couture, Tuscan leather, and fine horology.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.key || item.id} className="flex gap-4 py-4">
                    {/* Item Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-50 p-1 border border-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm font-semibold text-stone-900 hover:text-amber-800 line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.key || item.id)}
                            className="text-stone-400 hover:text-rose-600"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Variants */}
                        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-stone-500">
                          {item.selectedSize && (
                            <span className="rounded bg-stone-100 px-1.5 py-0.5">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="rounded bg-stone-100 px-1.5 py-0.5">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.isBundleItem && (
                            <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-800">
                              Capsule Bundle Item
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity */}
                        <div className="flex items-center rounded-md border border-stone-200">
                          <button
                            type="button"
                            onClick={() => updateQty(item.key || item.id, item.qty - 1)}
                            className="px-2 py-1 text-stone-500 hover:text-stone-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-stone-900">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.key || item.id, item.qty + 1)}
                            className="px-2 py-1 text-stone-500 hover:text-stone-900"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-stone-900">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          {item.originalPrice && (
                            <span className="block text-[11px] text-stone-400 line-through">
                              {formatPrice(item.originalPrice * item.qty)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-stone-100 bg-[#faf9f8] p-6">
              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="mb-4">
                {promoCode ? (
                  <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                    <span className="font-semibold">
                      Privilege Code &quot;{promoCode}&quot; Applied (-{discountPercent}%)
                    </span>
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
                      type="text"
                      placeholder="VIP Code (e.g. LUXE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs uppercase outline-none focus:border-stone-900"
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-stone-900 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="mt-1 text-[11px] text-rose-600">{promoError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>VIP Privilege Savings ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Courier Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {distanceToFreeShipping === 0 ? 'Complimentary' : '$25'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-stone-900">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-800 active:scale-98"
              >
                <span>Proceed to Private Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>Encrypted 256-Bit SSL Checkout • Atelier Authenticity Guarantee</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
