import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useAuth } from '../context/AuthContext.js';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#FFFDF8] h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#2C1B16]/10">
            <span className="font-serif text-xl font-bold tracking-wide text-[#5A1022]">
              Virasat Sarees
            </span>
            <button
              onClick={onClose}
              className="p-1 text-[#2C1B16]/60 hover:text-[#2C1B16]"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="p-5 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="block py-2.5 text-base font-medium text-[#2C1B16] hover:text-[#5A1022] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/sarees"
              onClick={onClose}
              className="block py-2.5 text-base font-medium text-[#2C1B16] hover:text-[#5A1022] transition-colors"
            >
              All Sarees Collection
            </Link>

            {/* Saree Categories sub-list */}
            <div className="py-2 pl-3 border-l-2 border-[#C9A227]/40 space-y-2 text-sm text-[#2C1B16]/75">
              <Link to="/sarees?category=Paithani" onClick={onClose} className="block hover:text-[#5A1022]">
                Paithani Sarees
              </Link>
              <Link to="/sarees?category=Silk" onClick={onClose} className="block hover:text-[#5A1022]">
                Kanjivaram & Silk
              </Link>
              <Link to="/sarees?category=Cotton" onClick={onClose} className="block hover:text-[#5A1022]">
                Chanderi & Cotton
              </Link>
              <Link to="/sarees?category=Designer" onClick={onClose} className="block hover:text-[#5A1022]">
                Organza & Designer
              </Link>
              <Link to="/sarees?category=Traditional" onClick={onClose} className="block hover:text-[#5A1022]">
                Traditional Heritage
              </Link>
              <Link to="/sarees?category=Festive" onClick={onClose} className="block hover:text-[#5A1022]">
                Festive Drapes
              </Link>
            </div>

            <Link
              to="/track"
              onClick={onClose}
              className="block py-2.5 text-base font-medium text-[#2C1B16] hover:text-[#5A1022] transition-colors"
            >
              Track My Order
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className="block py-2.5 text-base font-medium text-[#2C1B16] hover:text-[#5A1022] transition-colors"
            >
              Our Heritage
            </Link>

            <Link
              to="/admin"
              onClick={onClose}
              className="flex items-center gap-2 py-2.5 text-base font-medium text-[#5A1022] hover:text-[#5A1022]/80 transition-colors"
            >
              <ShieldCheck size={18} />
              Admin Portal
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-5 border-t border-[#2C1B16]/10 bg-[#FDF9F2] space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#2C1B16]/15 rounded text-xs font-medium text-[#2C1B16]"
            >
              <Heart size={16} className="text-[#5A1022]" />
              Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#5A1022] text-[#FFFDF8] rounded text-xs font-medium"
            >
              <ShoppingBag size={16} />
              Bag ({itemCount})
            </Link>
          </div>

          {user ? (
            <div className="text-xs text-[#2C1B16]/70 flex items-center justify-between pt-1">
              <span>Signed in as <strong>{user.displayName}</strong></span>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-[#5A1022] font-semibold underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="block text-center text-xs text-[#5A1022] font-medium py-1 hover:underline"
            >
              Sign In / Account
            </Link>
          )}

          <div className="text-[11px] text-[#2C1B16]/60 space-y-1">
            <p className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#C9A227]" /> Rajarampuri, Kolhapur
            </p>
            <p className="flex items-center gap-1.5">
              <Phone size={12} className="text-[#C9A227]" /> +91 93569 51406
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
