import React, { useState } from "react";
import {
  Users,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  Package,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { ProduceLot } from "../../types";
import { Language } from "../../translations";

interface NearbyFarmerItem {
  id: string;
  name: string;
  avatar: string;
  village: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  specialtyCrops: string[];
  certifications: string[];
  bio: string;
  verified: boolean;
  phone: string;
}

interface BuyerFarmerSuggestionsProps {
  onSelectFarmerProduce: (crop: string) => void;
  onOpenAiAssistant: (query: string) => void;
  currentLang?: Language;
}

const tFarmerSuggestions = {
  mr: {
    heroBadge: "हायपरलोकल ताजेपणा अल्गोरिदम",
    heroTitle: "सर्वोत्तम गुणवत्ता मानांकन असलेले जवळचे प्रमाणित शेतकरी",
    heroSubtitle: "जवळच्या शेतातून माल घेतल्याने आजच काढलेला ताजा माल, कमी वाहतूक वेळ आणि कमी कार्बन उत्सर्जन सुनिश्चित होते.",
    aiBtn: "AI शेतकरी शिफारशी विचारा",
    maxDistanceLabel: "पुण्यापासून कमाल अंतर:",
    minRatingLabel: "किमान मानांकन:",
    cropFilterLabel: "पीक विशेषीकरण फिल्टर",
    allProduce: "सर्व शेतमाल",
    tomato: "टोमॅटो",
    onion: "कांदा",
    grapes: "द्राक्षे",
    spinach: "पालक / पालेभाज्या",
    verified: "प्रमाणित",
    kmAway: "किमी अंतरावर",
    reviews: "पुनरावलोकने",
    availableFreshCrops: "उपलब्ध ताजी पिके:",
    viewProduce: "शेतमाल पहा",
    contactFarmer: "शेतकऱ्याशी संपर्क साधा",
    aiPrompt: "२० किमी अंतरावरील सर्वोत्तम रेट केलेले अ दर्जाचे टोमॅटो उत्पादक शेतकरी कोणते आहेत?",
  },
  hi: {
    heroBadge: "हाइपरलोकल ताजगी एल्गोरिदम",
    heroTitle: "सर्वोच्च गुणवत्ता रेटिंग वाले नजदीकी सत्यापित किसान",
    heroSubtitle: "नजदीकी खेतों से खरीदारी आज ही तोड़ी गई ताजगी, कम परिवहन समय और न्यूनतम कार्बन उत्सर्जन सुनिश्चित करती है।",
    aiBtn: "AI किसान सिफारिशें पूछें",
    maxDistanceLabel: "पुणे से अधिकतम दूरी:",
    minRatingLabel: "न्यूनतम रेटिंग:",
    cropFilterLabel: "फसल विशेषज्ञता फ़िल्टर",
    allProduce: "सभी उत्पाद",
    tomato: "टमाटर",
    onion: "प्याज",
    grapes: "अंगूर",
    spinach: "पालक / हरी सब्जियां",
    verified: "सत्यापित",
    kmAway: "किमी दूर",
    reviews: "समीक्षाएं",
    availableFreshCrops: "उपलब्ध ताजा फसलें:",
    viewProduce: "उत्पाद देखें",
    contactFarmer: "किसान से संपर्क करें",
    aiPrompt: "२० किमी के दायरे में सर्वश्रेष्ठ रेटेड ग्रेड ए टमाटर उत्पादक कौन से किसान हैं?",
  },
  en: {
    heroBadge: "Hyperlocal Freshness Algorithm",
    heroTitle: "Nearby Verified Farmers with Highest Quality Ratings",
    heroSubtitle: "Sourcing from nearby farms guarantees harvested-today crispness, shorter transit times, and minimum carbon footprint.",
    aiBtn: "Ask AI Farmer Recommendations",
    maxDistanceLabel: "Max Distance from Pune:",
    minRatingLabel: "Minimum Rating:",
    cropFilterLabel: "Crop Specialty Filter",
    allProduce: "All Produce",
    tomato: "Tomato",
    onion: "Onion",
    grapes: "Grapes",
    spinach: "Spinach / Greens",
    verified: "Verified",
    kmAway: "km away",
    reviews: "reviews",
    availableFreshCrops: "Available Fresh Crops:",
    viewProduce: "View Farm Produce",
    contactFarmer: "Contact Farmer",
    aiPrompt: "Which nearby farmers have the best rated Grade A tomatoes within 20km?",
  },
};

export const BuyerFarmerSuggestions: React.FC<BuyerFarmerSuggestionsProps> = ({
  onSelectFarmerProduce,
  onOpenAiAssistant,
  currentLang = "en",
}) => {
  const t = tFarmerSuggestions[currentLang] || tFarmerSuggestions.en;
  const [maxDistance, setMaxDistance] = useState<number>(30);
  const [minRating, setMinRating] = useState<number>(4.7);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>("All");

  const nearbyFarmers: NearbyFarmerItem[] = [
    {
      id: "f-01",
      name: "Ramesh Patil",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
      village: "Dindori, Nashik Region",
      distanceKm: 8.5,
      rating: 4.9,
      reviewCount: 56,
      specialtyCrops: ["Hybrid Tomato", "Table Grapes", "Capsicum"],
      certifications: ["e-NAM Verified", "Zero Chemical Residue", "Cold Storage Member"],
      bio: "3rd generation horticulturist with 15 acres drip-irrigated firm round tomatoes. Consistent supplier to top city restaurants.",
      verified: true,
      phone: "+91 98220 14890",
    },
    {
      id: "f-02",
      name: "Suresh Jagtap",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      village: "Manchar, Pune North",
      distanceKm: 14.2,
      rating: 4.8,
      reviewCount: 42,
      specialtyCrops: ["Red Onion (Garwa)", "Green Chili", "Cabbage"],
      certifications: ["e-NAM Verified", "APMC Registered"],
      bio: "Specializes in cured Nashik red onions with 6-month shelf life. Direct farm pick-up available for trucks.",
      verified: true,
      phone: "+91 94231 88902",
    },
    {
      id: "f-03",
      name: "Ganesh Shinde",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      village: "Niphad, Nashik",
      distanceKm: 22.0,
      rating: 4.9,
      reviewCount: 88,
      specialtyCrops: ["Thomson Seedless Grapes", "Pomegranate", "Papaya"],
      certifications: ["GlobalGAP Certified", "100% Export Quality"],
      bio: "Export-grade fruit grower supplying premium sugar-sweet grapes and Bhagwa pomegranates.",
      verified: true,
      phone: "+91 97650 33411",
    },
    {
      id: "f-04",
      name: "Kavita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      village: "Talegaon, Pune",
      distanceKm: 6.8,
      rating: 4.8,
      reviewCount: 31,
      specialtyCrops: ["Hydroponic Spinach", "Broccoli", "English Cucumber"],
      certifications: ["Pesticide Free", "Polyhouse Protected"],
      bio: "High-tech polyhouse vegetables picked at dawn and delivered within 4 hours for maximum crunch.",
      verified: true,
      phone: "+91 98812 77650",
    },
  ];

  const filteredFarmers = nearbyFarmers.filter((f) => {
    const matchesDist = f.distanceKm <= maxDistance;
    const matchesRating = f.rating >= minRating;
    const matchesCrop =
      selectedCropFilter === "All" ||
      f.specialtyCrops.some((c) => c.toLowerCase().includes(selectedCropFilter.toLowerCase()));
    return matchesDist && matchesRating && matchesCrop;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.heroBadge}</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            {t.heroTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.heroSubtitle}
          </p>
        </div>

        <button
          onClick={() => onOpenAiAssistant(t.aiPrompt)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors self-start md:self-center shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t.aiBtn}</span>
        </button>
      </div>

      {/* Interactive Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            {t.maxDistanceLabel} <strong className="text-sky-700">{maxDistance} km</strong>
          </label>
          <input
            type="range"
            min={5}
            max={50}
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            {t.minRatingLabel} <strong className="text-amber-600">★ {minRating.toFixed(1)} & above</strong>
          </label>
          <input
            type="range"
            min={4.0}
            max={4.9}
            step={0.1}
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">{t.cropFilterLabel}</label>
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-700 outline-hidden cursor-pointer"
          >
            <option value="All">{t.allProduce}</option>
            <option value="Tomato">{t.tomato}</option>
            <option value="Onion">{t.onion}</option>
            <option value="Grapes">{t.grapes}</option>
            <option value="Spinach">{t.spinach}</option>
          </select>
        </div>
      </div>

      {/* Farmers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFarmers.map((farmer) => {
          return (
            <div
              key={farmer.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Farmer Profile Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{farmer.name}</h3>
                        {farmer.verified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> {t.verified}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {farmer.village}
                        </span>
                        <span>·</span>
                        <strong className="text-sky-700">{farmer.distanceKm} {t.kmAway}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 rounded-xl text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{farmer.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ({farmer.reviewCount} {t.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed my-2 line-clamp-2">
                  {farmer.bio}
                </p>

                {/* Specialties */}
                <div className="my-3 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    {t.availableFreshCrops}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {farmer.specialtyCrops.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                  {farmer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectFarmerProduce(farmer.specialtyCrops[0])}
                  className="h-8.5 px-3 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{t.viewProduce}</span>
                </button>
                <a
                  href={`tel:${farmer.phone}`}
                  className="h-8.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.contactFarmer}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
