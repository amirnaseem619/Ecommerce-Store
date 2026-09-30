import { CreditCard, Lock, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '../data/store'
import { useStore } from '../context/StoreContext'

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    discountAmount,
    placeOrder,
    orderCompleted,
    setOrderCompleted,
  } = useStore()

  const [shippingMethod, setShippingMethod] = useState('standard')
  const [formData, setFormData] = useState({
    firstName: 'Amir',
    lastName: 'Naseem',
    email: 'client@atelierluxe.com',
    address: '740 Park Avenue, Penthouse 12',
    city: 'New York',
    state: 'NY',
    zip: '10021',
    country: 'United States',
    cardNumber: '•••• •••• •••• 8842',
    cardExpiry: '09/29',
    cardCvc: '888',
    cardName: 'AMIR NASEEM',
  })

  const [processing, setProcessing] = useState(false)

  if (!isCheckoutOpen && !orderCompleted) return null

  const shippingCost = shippingMethod === 'priority' ? 45 : 0
  const finalTotal = cartTotal + shippingCost

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      placeOrder({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        country: formData.country,
        shippingMethod: shippingMethod === 'priority' ? 'Priority Air Concierge' : 'Complimentary White-Glove',
      })
      setProcessing(false)
    }, 1200)
  }

  // Confirmation View
  if (orderCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
          onClick={() => setOrderCompleted(null)}
        />
        <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-amber-900/30 bg-stone-900 p-6 text-white shadow-2xl sm:p-10">
          <button
            type="button"
            onClick={() => setOrderCompleted(null)}
            className="absolute right-5 top-5 rounded-full bg-stone-800 p-2 text-stone-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 text-stone-950 shadow-lg">
              <Sparkles className="h-8 w-8 text-stone-950" />
            </div>
            <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">
              Atelier Order Confirmed
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-white sm:text-4xl">
              Thank You for Your Patronage
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-stone-400">
              Your acquisition has been registered with our private atelier. A master artisan is preparing your pieces with white-glove packaging.
            </p>
          </div>

          {/* Receipt details */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4 text-xs">
              <div>
                <span className="text-stone-400">Acquisition Reference</span>
                <p className="font-mono text-sm font-bold text-amber-300">
                  {orderCompleted.orderId}
                </p>
              </div>
              <div>
                <span className="text-stone-400">Date</span>
                <p className="font-semibold text-stone-200">{orderCompleted.date}</p>
              </div>
              <div>
                <span className="text-stone-400">Destination</span>
                <p className="font-semibold text-stone-200">{orderCompleted.customer?.city || 'New York'}</p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-stone-850">
              {orderCompleted.items.map((it) => (
                <div key={it.key || it.id} className="flex items-center justify-between py-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-10 w-10 rounded-lg bg-stone-800 object-contain p-1"
                    />
                    <div>
                      <p className="font-medium text-stone-200">{it.name}</p>
                      <p className="text-[10px] text-stone-400">
                        Qty {it.qty} {it.selectedSize ? `• ${it.selectedSize}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-200">
                    {formatPrice(it.price * it.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-stone-800 pt-3 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Total Paid</span>
                <span className="text-sm font-bold text-amber-300">
                  {formatPrice(orderCompleted.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setOrderCompleted(null)}
              className="rounded-xl bg-amber-400 px-8 py-3 text-xs font-bold uppercase tracking-widest text-stone-950 transition hover:bg-amber-300"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-900"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-amber-700" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800">
            Encrypted Private Checkout
          </span>
        </div>
        <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
          Atelier Client Concierge
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Left Form: Client & Shipping */}
          <div className="space-y-4 md:col-span-7">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                1. Client Contact
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input
                  required
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
                <input
                  required
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email address for dispatch updates"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
              />
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Delivery Destination
              </h3>
              <input
                required
                placeholder="Street Address or Residence"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <input
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
                <input
                  required
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
                <input
                  required
                  placeholder="Postal Code"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                3. Delivery Tier
              </h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center justify-between rounded-xl border border-stone-200 p-3 text-xs transition has-[:checked]:border-stone-900 has-[:checked]:bg-stone-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-stone-900"
                    />
                    <div>
                      <p className="font-semibold text-stone-900">Complimentary White-Glove</p>
                      <p className="text-[11px] text-stone-500">2-3 Business Days • Signature Required</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700">Free</span>
                </label>

                <label className="flex items-center justify-between rounded-xl border border-stone-200 p-3 text-xs transition has-[:checked]:border-stone-900 has-[:checked]:bg-stone-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'priority'}
                      onChange={() => setShippingMethod('priority')}
                      className="accent-stone-900"
                    />
                    <div>
                      <p className="font-semibold text-stone-900">Priority Air Concierge</p>
                      <p className="text-[11px] text-stone-500">Next Business Morning Delivery</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">$45</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                4. Private Payment
              </h3>
              {/* Virtual Luxury Card Preview */}
              <div className="mt-2 rounded-2xl bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950 p-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <CreditCard className="h-5 w-5 text-amber-300" />
                  <span className="font-serif text-xs tracking-widest text-amber-200">LUX ORO VIP</span>
                </div>
                <div className="mt-4 font-mono text-sm tracking-widest text-amber-100">
                  {formData.cardNumber}
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-stone-400">
                  <span>{formData.cardName}</span>
                  <span>EXP {formData.cardExpiry}</span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <input
                  required
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                />
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    required
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                  />
                  <input
                    required
                    placeholder="CVV"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="flex flex-col justify-between rounded-2xl bg-stone-50 p-5 md:col-span-5 border border-stone-200">
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                Order Review ({cart.length} items)
              </h3>

              <div className="mt-3 max-h-56 divide-y divide-stone-200 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.key || item.id} className="flex items-center gap-3 py-2 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg bg-white object-contain p-1 border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-semibold text-stone-900">{item.name}</p>
                      <p className="text-[10px] text-stone-500">
                        Qty {item.qty} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                      </p>
                    </div>
                    <span className="font-bold text-stone-900">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-stone-200 pt-3 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(cartTotal + discountAmount)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>VIP Privilege Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-300 pt-2 text-base font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-amber-900">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={processing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-950 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-800 disabled:opacity-50"
              >
                {processing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    <span>Authorize Payment • {formatPrice(finalTotal)}</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Private & Confirmed Atelier Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
