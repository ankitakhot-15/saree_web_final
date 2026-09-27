import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Heart,
  PartyPopper,
  Flame,
  Gem,
} from "lucide-react";
import { getCloudinaryUrl } from "../services/cloudinary.js";

interface OccasionCard {
  id: string;
  name: string;
  query: string;
  tagline: string;
  image: string;
  colorScheme: string;
  icon: React.ReactNode;
}

export const OccasionSection: React.FC = () => {
  const occasions: OccasionCard[] = [
    {
      id: "bridal",
      name: "Bridal & Muhurtham",
      query: "Bridal",
      tagline:
        "Royal Paithani & Kanchipuram with pure tested zari shloka borders",
      image:
        "https://res.cloudinary.com/qudcaa6j/image/upload/v1790405339/virasat_sarees/red_kanjivaram.jpg",
      colorScheme: "from-[#5A1022] to-[#2D060F]",
      icon: <Gem size={16} className="text-[#C9A227]" />,
    },
    {
      id: "wedding-reception",
      name: "Grand Reception",
      query: "Wedding Reception",
      tagline: "Regal Katan silk & meenakari weaves for evening banquets",
      image:
        "https://res.cloudinary.com/qudcaa6j/image/upload/v1790405329/virasat_sarees/purple_paithani.jpg",
      colorScheme: "from-[#31103F] to-[#12031A]",
      icon: <PartyPopper size={16} className="text-[#C9A227]" />,
    },
    {
      id: "festive-pooja",
      name: "Festive & Pooja",
      query: "Festive",
      tagline: "Auspicious weaves for Diwali, Navratri & Ganesh Utsav",
      image:
        "https://res.cloudinary.com/qudcaa6j/image/upload/v1790405340/virasat_sarees/blue_silk.jpg",
      colorScheme: "from-[#0D3B66] to-[#041527]",
      icon: <Sparkles size={16} className="text-[#C9A227]" />,
    },
    {
      id: "haldi-mehendi",
      name: "Haldi & Sangeet",
      query: "Haldi",
      tagline:
        "Golden ashrafi motifs & Chanderi cotton silks for daytime rituals",
      image:
        "https://res.cloudinary.com/qudcaa6j/image/upload/v1790405343/virasat_sarees/yellow_festive.jpg",
      colorScheme: "from-[#B78103] to-[#5C3F00]",
      icon: <Flame size={16} className="text-[#FFE57F]" />,
    },
    {
      id: "cocktail-party",
      name: "Cocktail & Soiree",
      query: "Cocktail",
      tagline: "Feather-light organza and scalloped resham cutwork drapes",
      image:
        "https://res.cloudinary.com/qudcaa6j/image/upload/v1790405342/virasat_sarees/pink_designer.jpg",
      colorScheme: "from-[#8E2845] to-[#45101E]",
      icon: <Heart size={16} className="text-pink-300" />,
    },
  ];

  return (
    <section className="py-16 bg-[#FBF7F0] border-t border-[#2C1B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#5A1022] mb-1">
              <Sparkles size={13} className="text-[#C9A227]" />
              <span>Auspicious Milestones</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1B16] font-normal">
              Shop by Celebratory Occasion
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A227] mt-3" />
          </div>
          <Link
            to="/sarees"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A1022] hover:text-[#460b19] uppercase tracking-wider group"
          >
            <span>View All Sarees</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              to={`/sarees?occasion=${encodeURIComponent(occ.query)}`}
              className="group relative rounded-sm overflow-hidden border border-[#2C1B16]/15 hover:border-[#C9A227] transition-all duration-300 shadow-xs hover:shadow-xl aspect-[3/4] flex flex-col justify-end p-5"
            >
              <img
                src={getCloudinaryUrl(occ.image, {
                  width: 500,
                  height: 700,
                  crop: "fill",
                })}
                alt={occ.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:via-black/50 transition-colors" />

              <div className="relative z-10 space-y-1.5 text-[#FFFDF8]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A227]">
                  {occ.icon}
                  <span className="uppercase tracking-wider text-[10px]">
                    Occasion
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight group-hover:text-amber-200 transition-colors">
                  {occ.name}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                  {occ.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Sarees</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
