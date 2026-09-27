// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Sparkles, Phone, ShieldCheck, Truck } from 'lucide-react';

// export const AnnouncementBar: React.FC = () => {
//   return (
//     <div className="bg-[#420B17] text-[#FAF6EF] text-[11px] py-2 px-4 border-b border-[#C9A227]/40 tracking-wider">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
//         {/* Left: Silk Mark Guarantee */}
//         <div className="flex items-center gap-2">
//           <span className="text-[#C9A227]">👑</span>
//           <span className="font-medium tracking-wide text-amber-100">
//             Silk Mark Certified Pure Handloom Sarees · Direct Artisan Cooperative
//           </span>
//         </div>

//         {/* Right: Customer Services & Trust */}
//         <div className="flex items-center gap-4 text-[11px] text-[#FAF6EF]/90">
//           <div className="hidden lg:flex items-center gap-1.5">
//             <Truck size={12} className="text-[#C9A227]" />
//             <span>Complimentary Insured Shipping Across India</span>
//           </div>
//           <span className="hidden lg:inline text-[#C9A227]/50">|</span>
//           <Link
//             to="/track"
//             className="hidden sm:inline hover:text-[#C9A227] transition-colors"
//           >
//             Track Order
//           </Link>
//           <span className="hidden sm:inline text-[#C9A227]/50">|</span>
//           <a
//             href="https://wa.me/919356951406?text=Namaste%20Virasat%20Sarees,%20I%20would%20like%20to%20see%20sarees%20via%20video%20call"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-medium transition-colors"
//           >
//             <Phone size={11} className="text-emerald-400" />
//             <span>Live Video Drape: +91 93569 51406</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Truck } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#420B17] text-[#FAF6EF] text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#C9A227]/40 tracking-wider w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
        {/* Left: Guarantee */}
        <div className="flex items-center justify-center gap-1.5 truncate max-w-full">
          <span className="text-[#C9A227]">👑</span>
          <span className="font-medium tracking-wide text-amber-100 truncate">
            Silk Mark Certified Pure Handloom Sarees
          </span>
        </div>

        {/* Right: Contact & Track */}
        <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] text-[#FAF6EF]/90">
          <Link to="/track" className="hover:text-[#C9A227] transition-colors">
            Track Order
          </Link>
          <span className="text-[#C9A227]/50">|</span>
          <a
            href="https://wa.me/919356951406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-medium transition-colors"
          >
            <Phone size={10} className="text-emerald-400" />
            <span>+91 93569 51406</span>
          </a>
        </div>
      </div>
    </div>
  );
};
