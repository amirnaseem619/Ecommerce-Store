import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Category from './pages/Category'
import NewArrivals from './pages/NewArrivals'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import SearchPage from './pages/SearchPage'
import InfoPage from './pages/InfoPage'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/privacy"
              element={
                <InfoPage
                  title="Privacy Policy"
                  body="Luxe Commerce collects only what we need to fulfill orders, personalize your browsing, and send the editorial notes you subscribe to. We never sell customer data."
                />
              }
            />
            <Route
              path="/terms"
              element={
                <InfoPage
                  title="Terms of Service"
                  body="By shopping with Luxe Commerce you agree to fair use of our catalog, accurate checkout details, and our standard 30-day returns on unused items."
                />
              }
            />
            <Route
              path="/shipping"
              element={
                <InfoPage
                  title="Shipping Info"
                  body="Complimentary grounded shipping on every order. Signature pieces typically leave the atelier within two business days."
                />
              }
            />
            <Route
              path="/support"
              element={
                <InfoPage
                  title="Contact Support"
                  body="Write to concierge@luxecommerce.store or use the newsletter form on the homepage. We respond within one business day."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
