import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  ShieldCheck,
  Phone,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext.js";
import { useWishlist } from "../context/WishlistContext.js";
import { useAuth } from "../context/AuthContext.js";
import { SearchBar } from "./SearchBar.js";
import { MobileMenu } from "./MobileMenu.js";

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // All Saree Categories
  const sareeCategories = [
    { name: "All Sarees", path: "/sarees" },
    { name: "Yeola Paithani", path: "/sarees?category=Paithani", dot: true },
    { name: "Kanchipuram Silk", path: "/sarees?category=Silk" },
    { name: "Banarasi Brocade", path: "/sarees?category=Banarasi" },
    { name: "Chanderi & Cotton", path: "/sarees?category=Cotton" },
    { name: "Bridal Trousseau", path: "/sarees?category=Bridal" },
  ];

  return (
    <>
      {/* 
        PERMANENT FIXED TOP BAR: 
        Pinned to top across all screens (Mobile, Tablet, Desktop) 
      */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-full bg-[#FFFDF9] shadow-xs">
        {/* ROW 1: Announcement Bar (Fixed) */}
        <div className="bg-[#420B17] text-[#FAF6EF] text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-6 border-b border-[#C9A227]/40 tracking-wider w-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#C9A227]">👑</span>
              <span className="font-medium tracking-wide text-amber-100 truncate">
                Silk Mark Certified Pure Handloom Sarees
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-[#FAF6EF]/90 shrink-0">
              <Link
                to="/track"
                className="hover:text-[#C9A227] transition-colors"
              >
                Track Order
              </Link>
              <span className="text-[#C9A227]/40">|</span>
              <a
                href="https://wa.me/919356951406"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-200 hover:text-white transition-colors"
              >
                <Phone size={10} className="text-emerald-400" />
                <span className="hidden xs:inline">+91 93569 51406</span>
              </a>
            </div>
          </div>
        </div>

        {/* ROW 2: Main Brand, Search, User & Bag */}
        <div className="border-b border-[#2C1B16]/10 bg-[#FFFDF9]/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="h-14 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
              {/* Left: Mobile Toggle & Brand Logo */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-1.5 text-[#2C1B16] hover:text-[#5A1022] hover:bg-[#F8F1E5] rounded transition-colors cursor-pointer"
                  aria-label="Open mobile menu"
                >
                  <Menu size={20} className="sm:w-5 sm:h-5" />
                </button>

                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#5A1022] via-[#460b19] to-[#2e050f] border-2 border-[#C9A227] flex items-center justify-center shadow-xs shrink-0">
                    <span className="font-serif text-base font-bold text-[#C9A227]">
                      V
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.1em] text-[#5A1022] leading-none whitespace-nowrap">
                      VIRASAT
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] text-[#C9A227] uppercase leading-tight whitespace-nowrap">
                      SILK & SAREES
                    </span>
                  </div>
                </Link>
              </div>

              {/* Center: Search Box */}
              <div className="flex-1 max-w-md mx-2 sm:mx-4">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-[#F8F1E5]/70 hover:bg-[#F8F1E5] border border-[#2C1B16]/15 hover:border-[#5A1022]/40 rounded-full text-xs text-[#2C1B16]/65 transition-all shadow-2xs group cursor-pointer"
                >
                  <Search
                    size={14}
                    className="text-[#5A1022] group-hover:scale-110 transition-transform shrink-0"
                  />
                  <span className="truncate text-[11px] sm:text-xs">
                    Search Paithani, Silk, Banarasi...
                  </span>
                </button>
              </div>

              {/* Right: Wishlist, Account, Bag */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="relative p-1.5 sm:p-2 text-[#2C1B16]/80 hover:text-[#5A1022] hover:bg-[#F8F1E5] rounded-full transition-colors flex items-center gap-1"
                  aria-label="Wishlist"
                >
                  <Heart size={18} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5A1022] text-[#FFFDF8] text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Account / Admin */}
                <Link
                  to={isAdmin ? "/admin" : user ? "/account" : "/login"}
                  className="hidden md:flex items-center gap-1.5 p-1.5 text-[#2C1B16]/80 hover:text-[#5A1022] hover:bg-[#F8F1E5] rounded-full transition-colors text-xs font-medium"
                >
                  {isAdmin ? (
                    <div className="flex items-center gap-1 text-[#5A1022] bg-[#5A1022]/10 px-2 py-0.5 rounded text-xs font-semibold">
                      <ShieldCheck size={14} />
                      <span>Admin</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <User size={17} />
                      <span>
                        {user
                          ? user.displayName?.split(" ")[0] || "Account"
                          : "Sign In"}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Shopping Bag Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3.5 bg-gradient-to-r from-[#5A1022] to-[#420B17] hover:from-[#460b19] hover:to-[#330711] text-[#FFFDF8] rounded-sm transition-all shadow-xs cursor-pointer"
                  aria-label="Shopping bag"
                >
                  <ShoppingBag size={16} className="text-amber-200" />
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider hidden xs:inline">
                    BAG
                  </span>
                  <span className="inline-flex items-center justify-center min-w-[17px] h-4 sm:min-w-[18px] sm:h-4.5 px-1 bg-[#C9A227] text-[#2C1B16] text-[9px] sm:text-[10px] font-black rounded-full shadow-2xs">
                    {itemCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Saree Categories Bar (Fits on desktop without truncation, smoothly scrolls on mobile) */}
        <div className="border-b border-[#2C1B16]/10 bg-[#FFFDF8] w-full">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-start lg:justify-between gap-1 sm:gap-4 overflow-x-auto no-scrollbar py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#2C1B16]/85">
              {sareeCategories.map((item) => {
                const isActive =
                  location.pathname + location.search === item.path ||
                  (location.pathname === item.path && !location.search);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`whitespace-nowrap px-2.5 py-1 transition-all shrink-0 flex items-center gap-1.5 rounded-sm hover:text-[#5A1022] ${
                      isActive
                        ? "text-[#5A1022] font-bold border-b-2 border-[#5A1022] bg-[#F8F1E5]/50"
                        : "hover:bg-[#F8F1E5]/40"
                    }`}
                  >
                    {item.dot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] shrink-0" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 
        SPACER: 
        Prevents page content from getting hidden under the fixed top bars
      */}
      <div className="h-[125px] sm:h-[145px] shrink-0 w-full" />

      {/* Modals & Drawers */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
