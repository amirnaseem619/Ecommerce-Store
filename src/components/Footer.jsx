import { Compass, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stone-850 bg-stone-950 text-stone-300">
      {/* Brand Heritage Bar */}
      <div className="border-b border-stone-850/80 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">Pure Craftsmanship</h4>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">
                Grade 6A Mulberry Silk, Tuscan box calfskin, and Swiss-grade chronometry.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">Atelier Certificate</h4>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">
                Every piece arrives with an individualized numbered certificate of origin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">White-Glove Courier</h4>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">
                Complimentary insured delivery with signature receipt across 65 nations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">Private Concierge</h4>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">
                Direct styling advisement and bespoke sizing consultations on request.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-stone-950 font-serif font-bold text-base">
                L
              </div>
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
                LUX ORO
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-stone-400">
              Dedicated to the quiet excellence of haute horology, fine Italian leathercraft, and silk couture. Handcrafted in Como, Florence, and Le Locle.
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-amber-200/80">
              <span>Milan</span>
              <span>•</span>
              <span>Paris</span>
              <span>•</span>
              <span>Geneva</span>
              <span>•</span>
              <span>New York</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">The Collections</h5>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/category/haute-couture" className="hover:text-white transition">
                  Haute Couture &amp; Gowns
                </Link>
              </li>
              <li>
                <Link to="/category/designer-footwear" className="hover:text-white transition">
                  Red-Sole Stilettos &amp; Trainers
                </Link>
              </li>
              <li>
                <Link to="/category/timepieces" className="hover:text-white transition">
                  Sunburst Chronographs
                </Link>
              </li>
              <li>
                <Link to="/category/leather-goods" className="hover:text-white transition">
                  Tuscan Grained Totes
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  Complete Catalog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Client Care</h5>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/shipping" className="hover:text-white transition">
                  White-Glove Shipping
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  30-Day Atelier Returns
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition">
                  Private Concierge
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Client Privacy Protocol
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Private Salons</h5>
            <p className="mt-4 text-xs text-stone-400">
              Via Montenapoleone 18, Milan<br />
              Place Vendôme, Paris<br />
              Madison Avenue, New York
            </p>
            <p className="mt-3 text-xs text-stone-400">
              concierge@luxoro.store<br />
              +1 (800) 840-LUXE
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-stone-850 pt-8 sm:flex-row text-xs text-stone-500">
          <p>© 2026 LUX ORO ATELIER. All rights reserved.</p>
          <div className="mt-3 flex gap-6 sm:mt-0">
            <span>Currency: USD ($)</span>
            <span>Language: English (US)</span>
            <span>Security: 256-Bit TLS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
