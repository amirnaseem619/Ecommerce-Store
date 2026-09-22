import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { useStore } from '../context/StoreContext'

export default function Layout() {
  const { toast } = useStore()

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-navy px-5 py-2.5 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
