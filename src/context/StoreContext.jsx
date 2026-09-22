import { createContext, useContext, useMemo, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [...prev, { ...product, qty }]
    })
    showToast(`${product.name} added to cart`)
  }

  const updateQty = (id, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((item) => item.id !== id) : prev.map((item) => (item.id === id ? { ...item, qty } : item)),
    )
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id))

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

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      toast,
      addToCart,
      updateQty,
      removeFromCart,
      toggleWishlist,
      isWishlisted,
      cartCount,
      cartTotal,
    }),
    [cart, wishlist, toast, cartCount, cartTotal],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
