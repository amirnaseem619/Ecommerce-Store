import { CheckCircle2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import QuickViewModal from './QuickViewModal'
import CheckoutModal from './CheckoutModal'
import { useStore } from '../context/StoreContext'

export default function Layout() {
  const { toast } = useStore()

  return (
    <div className="flex min-h-svh flex-col bg-[#fdfdfc] text-stone-900 antialiased selection:bg-amber-100 selection:text-stone-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />

      {/* Luxury Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-stone-800 bg-stone-950/95 px-5 py-3 text-xs font-semibold tracking-wider text-amber-200 shadow-2xl backdrop-blur-md transition-all animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
