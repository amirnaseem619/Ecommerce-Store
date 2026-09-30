import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('luxe_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('luxe_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [toast, setToast] = useState(null)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')
  const [orderCompleted, setOrderCompleted] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('luxe_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error(e)
    }
  }, [wishlist])

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2500)
  }

  const addToCart = (product, qty = 1, options = {}) => {
    const size = options.size || (product.sizes ? product.sizes[0] : null)
    const color = options.color || (product.colors ? product.colors[0]?.name : null)
    const itemKey = `${product.id}__${size || 'default'}__${color || 'default'}`

    setCart((prev) => {
      const existing = prev.find((item) => item.key === itemKey)
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [
        ...prev,
        {
          ...product,
          key: itemKey,
          qty,
          selectedSize: size,
          selectedColor: color,
        },
      ]
    })

    showToast(`Added ${product.name} to cart`)
    setIsCartOpen(true)
  }

  const addEnsembleToCart = (bundleProducts, specialPrice) => {
    const discountMultiplier = specialPrice ? specialPrice / bundleProducts.reduce((sum, p) => sum + p.price, 0) : 1

    setCart((prev) => {
      let nextCart = [...prev]
      bundleProducts.forEach((product) => {
        const size = product.sizes ? product.sizes[0] : null
        const color = product.colors ? product.colors[0]?.name : null
        const itemKey = `${product.id}__${size || 'default'}__${color || 'default'}`
        const adjustedPrice = Math.round(product.price * discountMultiplier)

        const existingIndex = nextCart.findIndex((item) => item.key === itemKey)
        if (existingIndex > -1) {
          nextCart[existingIndex] = {
            ...nextCart[existingIndex],
            qty: nextCart[existingIndex].qty + 1,
          }
        } else {
          nextCart.push({
            ...product,
            price: adjustedPrice,
            originalPrice: product.price,
            key: itemKey,
            qty: 1,
            selectedSize: size,
            selectedColor: color,
            isBundleItem: true,
          })
        }
      })
      return nextCart
    })

    showToast('The Autumn / Winter Capsule added to your cart!')
    setIsCartOpen(true)
  }

  const updateQty = (key, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key && item.id !== key)
        : prev.map((item) =>
            item.key === key || item.id === key ? { ...item, qty } : item,
          ),
    )
  }

  const removeFromCart = (key) =>
    setCart((prev) => prev.filter((item) => item.key !== key && item.id !== key))

  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) {
        showToast(`${product.name} removed from wishlist`)
        return prev.filter((item) => item.id !== product.id)
      }
      showToast(`${product.name} saved to wishlist`)
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => wishlist.some((item) => item.id === id)

  const openQuickView = (product) => setQuickViewProduct(product)
  const closeQuickView = () => setQuickViewProduct(null)

  const applyPromo = (code) => {
    const cleaned = code.trim().toUpperCase()
    if (cleaned === 'LUXE10' || cleaned === 'VOGUE10') {
      setDiscountPercent(10)
      setPromoCode(cleaned)
      setPromoError('')
      showToast('10% VIP Privilege discount applied!')
      return true
    } else if (cleaned === 'ATELIER15') {
      setDiscountPercent(15)
      setPromoCode(cleaned)
      setPromoError('')
      showToast('15% Private Client discount applied!')
      return true
    } else {
      setPromoError('Invalid code. Try "LUXE10" for 10% off.')
      return false
    }
  }

  const removePromo = () => {
    setDiscountPercent(0)
    setPromoCode('')
    setPromoError('')
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100)
  const cartTotal = rawSubtotal - discountAmount

  const placeOrder = (customerDetails) => {
    const orderData = {
      orderId: `LX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customer: customerDetails,
      items: [...cart],
      total: cartTotal,
      savings: discountAmount,
    }
    setOrderCompleted(orderData)
    clearCart()
    setIsCheckoutOpen(false)
    return orderData
  }

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      toast,
      quickViewProduct,
      isCartOpen,
      isCheckoutOpen,
      discountPercent,
      promoCode,
      promoError,
      orderCompleted,
      addToCart,
      addEnsembleToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      openQuickView,
      closeQuickView,
      setIsCartOpen,
      setIsCheckoutOpen,
      applyPromo,
      removePromo,
      placeOrder,
      setOrderCompleted,
      cartCount,
      rawSubtotal,
      discountAmount,
      cartTotal,
    }),
    [
      cart,
      wishlist,
      toast,
      quickViewProduct,
      isCartOpen,
      isCheckoutOpen,
      discountPercent,
      promoCode,
      promoError,
      orderCompleted,
      cartCount,
      rawSubtotal,
      discountAmount,
      cartTotal,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
