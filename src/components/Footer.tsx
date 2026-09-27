// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-[#241511] text-[#F8F1E5] pt-16 pb-8 border-t border-[#C9A227]/40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
//           {/* Brand & Story */}
//           <div className="space-y-4">
//             <h3 className="font-serif text-2xl font-semibold text-[#FFFDF8] tracking-wide">
//               Virasat Silk & Sarees
//             </h3>
//             <p className="text-xs text-[#F8F1E5]/75 font-light leading-relaxed">
//               Dedicated to preserving the sacred art of traditional Indian handloom weaving. From Yeola Paithani to Kanchipuram mulberry silks, each saree is a certified heirloom woven with pure devotion.
//             </p>
//             <div className="flex items-center gap-2 pt-2 text-xs text-[#C9A227]">
//               <ShieldCheck size={16} />
//               <span>Silk Mark Organization Certified</span>
//             </div>
//           </div>

//           {/* Quick Collection Links */}
//           <div className="space-y-3">
//             <h4 className="font-serif text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
//               Saree Collections
//             </h4>
//             <ul className="space-y-2 text-xs text-[#F8F1E5]/80 font-light">
//               <li>
//                 <Link to="/sarees?category=Paithani" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Yeola Paithani Sarees
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/sarees?category=Silk" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Kanchipuram Bridal Pattu
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/sarees?category=Silk" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Varanasi Katan Banarasi
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/sarees?category=Cotton" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Chanderi & Maheshwari Cotton
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/sarees?category=Designer" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Organza & Scalloped Sarees
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Care & Trousseau */}
//           <div className="space-y-3">
//             <h4 className="font-serif text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
//               Experience & Trust
//             </h4>
//             <ul className="space-y-2 text-xs text-[#F8F1E5]/80 font-light">
//               <li>
//                 <Link to="/track" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5 font-medium text-[#C9A227]">
//                   <span className="text-[#C9A227]">›</span> Track Saree Order Live
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> About Our Weavers
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   href="https://wa.me/919356951406"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
//                 >
//                   <span className="text-[#C9A227]">›</span> Live Video Shopping Call
//                 </a>
//               </li>
//               <li>
//                 <Link to="/sarees" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Silk Saree Care Guide
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
//                   <span className="text-[#C9A227]">›</span> Staff & Admin Portal
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Showroom & Contact Info */}
//           <div className="space-y-3 text-xs text-[#F8F1E5]/80 font-light">
//             <h4 className="font-serif text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
//               Flagship Showroom
//             </h4>
//             <div className="flex items-start gap-2.5">
//               <MapPin size={16} className="text-[#C9A227] shrink-0 mt-0.5" />
//               <span>Showroom No. 12, Mahadwar Road, Near Mahalakshmi Temple, Rajarampuri, Kolhapur, Maharashtra 416012</span>
//             </div>
//             <div className="flex items-center gap-2.5">
//               <Phone size={16} className="text-[#C9A227] shrink-0" />
//               <span>+91 93569 51406 · 0231-2524890</span>
//             </div>
//             <div className="flex items-center gap-2.5">
//               <Mail size={16} className="text-[#C9A227] shrink-0" />
//               <span>care@virasatsarees.com</span>
//             </div>
//             <div className="flex items-center gap-2.5">
//               <Clock size={16} className="text-[#C9A227] shrink-0" />
//               <span>Open all 7 days: 10:00 AM – 9:00 PM</span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F1E5]/60 gap-3">
//           <p>© {new Date().getFullYear()} Virasat Silk & Sarees. All Rights Reserved. Crafted with reverence for Indian heritage.</p>
//           <div className="flex items-center gap-4">
//             <Link to="/about" className="hover:text-[#C9A227]">Terms of Heritage</Link>
//             <span>·</span>
//             <Link to="/about" className="hover:text-[#C9A227]">Privacy Policy</Link>
//             <span>·</span>
//             <Link to="/admin" className="hover:text-[#C9A227]">Admin Console</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Heart,
  Home,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Package,
} from "lucide-react";
import { useCart } from "../context/CartContext.js";
import { useWishlist } from "../context/WishlistContext.js";

export const Footer: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  return (
    <>
      {/* 
        MAIN LUXURY FOOTER: 
        100% full-width, zero horizontal scroll, perfectly aligned on all screens
      */}
      <footer className="w-full max-w-full overflow-x-hidden bg-[#241511] text-[#F8F1E5] pt-12 sm:pt-16 pb-24 lg:pb-12 border-t border-[#C9A227]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-white/10">
            {/* Column 1: Brand & Heritage */}
            <div className="space-y-3.5">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FFFDF8] tracking-wide">
                Virasat Silk & Sarees
              </h3>
              <p className="text-xs text-[#F8F1E5]/75 font-light leading-relaxed">
                Dedicated to preserving the sacred art of traditional Indian
                handloom weaving. From Yeola Paithani to Kanchipuram mulberry
                silks, each saree is a certified heirloom woven with pure
                devotion.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#C9A227]">
                <ShieldCheck size={16} className="shrink-0" />
                <span>Silk Mark Organization Certified</span>
              </div>
            </div>

            {/* Column 2: Saree Collections */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm sm:text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
                Saree Collections
              </h4>
              <ul className="space-y-2 text-xs text-[#F8F1E5]/80 font-light">
                <li>
                  <Link
                    to="/sarees?category=Paithani"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Yeola Paithani
                    Sarees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sarees?category=Silk"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Kanchipuram Bridal
                    Pattu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sarees?category=Banarasi"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Varanasi Katan
                    Banarasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sarees?category=Cotton"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Chanderi &
                    Maheshwari Cotton
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sarees?category=Bridal"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Bridal Trousseau
                    Sarees
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Experience & Customer Care */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm sm:text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
                Experience & Trust
              </h4>
              <ul className="space-y-2 text-xs text-[#F8F1E5]/80 font-light">
                <li>
                  <Link
                    to="/track"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5 font-medium text-[#C9A227]"
                  >
                    <span className="text-[#C9A227]">›</span> Track Saree Order
                    Live
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> About Our Weavers
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/919356951406?text=Namaste%20Virasat%20Sarees"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Live Video
                    Shopping Call
                  </a>
                </li>
                <li>
                  <Link
                    to="/sarees"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Silk Saree Care
                    Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#C9A227]">›</span> Staff & Admin
                    Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Flagship Showroom & Contact Info */}
            <div className="space-y-3 text-xs text-[#F8F1E5]/80 font-light">
              <h4 className="font-serif text-sm sm:text-base font-semibold text-[#FFFDF8] tracking-wider uppercase">
                Flagship Showroom
              </h4>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C9A227] shrink-0 mt-0.5" />
                <span className="break-words">
                  Showroom No. 12, Mahadwar Road, Near Mahalakshmi Temple,
                  Rajarampuri, Kolhapur, Maharashtra 416012
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#C9A227] shrink-0" />
                <span>+91 93569 51406 · 0231-2524890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#C9A227] shrink-0" />
                <span className="break-all">care@virasatsarees.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#C9A227] shrink-0" />
                <span>Open all 7 days: 10:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Strip */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F1E5]/60 gap-3 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Virasat Silk & Sarees. All Rights
              Reserved. Crafted with reverence for Indian heritage.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <Link to="/about" className="hover:text-[#C9A227]">
                Terms of Heritage
              </Link>
              <span>·</span>
              <Link to="/about" className="hover:text-[#C9A227]">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link to="/admin" className="hover:text-[#C9A227]">
                Admin Console
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 
        FIXED MOBILE BOTTOM NAVIGATION BAR:
        Permanently pinned to the bottom of the screen on mobile/tablet devices
      */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/98 backdrop-blur-md border-t border-[#2C1B16]/15 shadow-lg w-full max-w-full">
        <div className="grid grid-cols-5 h-14 sm:h-16 items-center px-1">
          {/* 1. Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === "/"
                ? "text-[#5A1022] font-bold"
                : "text-[#2C1B16]/70 hover:text-[#5A1022]"
            }`}
          >
            <Home size={18} />
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>

          {/* 2. All Sarees */}
          <Link
            to="/sarees"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname.startsWith("/sarees")
                ? "text-[#5A1022] font-bold"
                : "text-[#2C1B16]/70 hover:text-[#5A1022]"
            }`}
          >
            <Package size={18} />
            <span className="text-[10px] mt-0.5">Sarees</span>
          </Link>

          {/* 3. Wishlist */}
          <Link
            to="/wishlist"
            className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
              location.pathname === "/wishlist"
                ? "text-[#5A1022] font-bold"
                : "text-[#2C1B16]/70 hover:text-[#5A1022]"
            }`}
          >
            <div className="relative">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#5A1022] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">Wishlist</span>
          </Link>

          {/* 4. WhatsApp Help */}
          <a
            href="https://wa.me/919356951406?text=Namaste%20Virasat%20Sarees,%20I%20need%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-[10px] mt-0.5 font-medium">WhatsApp</span>
          </a>

          {/* 5. Shopping Bag Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center py-1 text-[#5A1022] transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 bg-[#C9A227] text-[#2C1B16] text-[9px] font-black rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <span className="text-[10px] mt-0.5 font-bold">Bag</span>
          </button>
        </div>
      </nav>
    </>
  );
};
