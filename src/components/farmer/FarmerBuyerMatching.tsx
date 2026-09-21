import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Building2,
  ArrowRight,
  Filter,
} from "lucide-react";
import { initialVerifiedBuyers } from "../../mockData";
import { VerifiedBuyerMatch } from "../../types";
import { Language } from "../../translations";
import farmerHandshakeBg from "../../assets/images/farmer_handshake_1789910039705.jpg";
import { BuyerTrustModal } from "../trust/BuyerTrustModal";

interface FarmerBuyerMatchingProps {
  currentLang?: Language;
  onDirectOffer: (buyer: VerifiedBuyerMatch) => void;
}

const tMatching = {
  mr: {
    engineBadge: "स्मार्ट मॅचिंग इंजिन",
    matchScore: "AI मॅच स्कोर ९०%+",
    bannerTitle: "आपल्या शेतमालाची गरज असणाऱ्या पडताळणीकृत खरेदीदारांशी थेट जोडा",
    bannerSubtitle: "पीक प्रकार, कापणीचे प्रमाण, प्रत अ गुणवत्ता आणि अंतरानुसार स्वयंचलित मॅचिंग. मध्यस्थांचे कोणतेही कमिशन नाही.",
    youFarmer: "👨‍🌾 आपण (शेतकरी)",
    verifiedBuyer: "🏢 पडताळणीकृत खरेदीदार",
    filterByCrop: "पिकानुसार फिल्टर:",
    showingBuyers: "पडताळणीकृत खरेदीदार",
    match: "मॅच",
    verified: "पडताळणीकृत",
    produceNeeded: "आवश्यक शेतमाल:",
    quantityDemand: "मागणी प्रमाण:",
    preferredGrade: "पसंतीची प्रत:",
    maxBudget: "कमाल बजेट:",
    upTo: "कमाल ₹",
    perKg: "/ किलो",
    paymentReliability: "पेमेंट विश्वासार्हता:",
    escrowOnTime: "एस्क्रो वेळेवर",
    connectedMsg: "जोडले! खरेदीदाराला शेतमालाचा प्रस्ताव पाठवला",
    connectBtn: "जोडा आणि लॉट #1025 पाठवा",
    all: "सर्व",
    tomato: "टोमॅटो",
    onion: "कांदा",
    potato: "बटाटा",
    grapes: "द्राक्षे",
    buyerConfidence: "खरेदीदार विश्वास",
    avgPayDays: "दिवसांत पेमेंट",
    auditTrustBtn: "विश्वास व पेमेंट ऑडिट",
    genuineBuyer: "१००% खरा व परवानाधारक खरेदीदार",
  },
  hi: {
    engineBadge: "स्मार्ट मैचिंग इंजन",
    matchScore: "AI मैच स्कोर ९०%+",
    bannerTitle: "अपनी उपज की जरूरत रखने वाले सत्यापित खरीदारों से सीधे जुड़ें",
    bannerSubtitle: "फसल प्रकार, पैदावार मात्रा, ग्रेड ए गुणवत्ता और दूरी के आधार पर स्वचालित मिलान। बिचौलियों का कोई कमीशन नहीं।",
    youFarmer: "👨‍🌾 आप (किसान)",
    verifiedBuyer: "🏢 सत्यापित खरीदार",
    filterByCrop: "फसल अनुसार फ़िल्टर:",
    showingBuyers: "सत्यापित खरीदार",
    match: "मैच",
    verified: "सत्यापित",
    produceNeeded: "आवश्यक उपज:",
    quantityDemand: "मांग मात्रा:",
    preferredGrade: "पसंदीदा ग्रेड:",
    maxBudget: "अधिकतम बजट:",
    upTo: "अधिकतम ₹",
    perKg: "/ किग्रा",
    paymentReliability: "भुगतान विश्वसनीयता:",
    escrowOnTime: "एस्क्रो समय पर",
    connectedMsg: "जुड़ गए! खरीदार को फसल प्रस्ताव भेजा गया",
    connectBtn: "जुड़ें और लॉट #1025 भेजें",
    all: "सभी",
    tomato: "टमाटर",
    onion: "प्याज",
    potato: "आलू",
    grapes: "अंगूर",
    buyerConfidence: "खरीदार विश्वास",
    avgPayDays: "दिन में भुगतान",
    auditTrustBtn: "विश्वास व भुगतान ऑडिट",
    genuineBuyer: "१००% वास्तविक व लाइसेंस प्राप्त खरीदार",
  },
  en: {
    engineBadge: "Smart Matching Engine",
    matchScore: "AI Match Score 90%+",
    bannerTitle: "Connect With Verified Buyers Who Need Your Produce",
    bannerSubtitle: "Automatic matching based on crop type, harvest volume, Grade A quality certification, and distance radius. Zero middlemen cuts.",
    youFarmer: "👨‍🌾 You (Farmer)",
    verifiedBuyer: "🏢 Verified Buyer",
    filterByCrop: "Filter by Crop:",
    showingBuyers: "Verified Buyers",
    match: "Match",
    verified: "Verified",
    produceNeeded: "Produce Needed:",
    quantityDemand: "Quantity Demand:",
    preferredGrade: "Preferred Grade:",
    maxBudget: "Max Budget:",
    upTo: "Up to ₹",
    perKg: "/ kg",
    paymentReliability: "Payment Reliability:",
    escrowOnTime: "Escrow On-Time",
    connectedMsg: "Connected! Offer Proposal Sent to Buyer",
    connectBtn: "Connect & Send Produce Lot #1025",
    all: "All",
    tomato: "Tomato",
    onion: "Onion",
    potato: "Potato",
    grapes: "Grapes",
    buyerConfidence: "Buyer Confidence",
    avgPayDays: "Days Avg Pay",
    auditTrustBtn: "Trust & Solvency Audit",
    genuineBuyer: "100% Genuine Escrow Buyer",
  },
};

export const FarmerBuyerMatching: React.FC<FarmerBuyerMatchingProps> = ({
  currentLang = "en",
  onDirectOffer,
}) => {
  const t = tMatching[currentLang] || tMatching.en;
  const [selectedCropFilter, setSelectedCropFilter] = useState("All");
  const [connectedBuyerId, setConnectedBuyerId] = useState<string | null>(null);
  const [selectedBuyerForTrust, setSelectedBuyerForTrust] = useState<VerifiedBuyerMatch | null>(null);

  const cropFilters = [
    { key: "All", label: t.all },
    { key: "Tomato", label: t.tomato },
    { key: "Onion", label: t.onion },
    { key: "Potato", label: t.potato },
    { key: "Grapes", label: t.grapes },
  ];

  const filteredBuyers = initialVerifiedBuyers.filter((b) => {
    if (selectedCropFilter === "All") return true;
    return b.cropsNeeded.some((c) => c.toLowerCase().includes(selectedCropFilter.toLowerCase()));
  });

  const handleConnect = (buyer: VerifiedBuyerMatch) => {
    onDirectOffer(buyer);
    setConnectedBuyerId(buyer.id);
    setTimeout(() => setConnectedBuyerId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner with Handshake Photographic Background */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[380px] sm:min-h-[420px] md:min-h-[460px] p-6 sm:p-8 md:p-9 flex flex-col justify-between text-white transition-all">
        {/* Background Handshake Image */}
        <img
          src={farmerHandshakeBg}
          alt="Farmer and buyer handshake in agricultural field at sunset"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Gradient overlay for high text readability while preserving the warm sunset handshake */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/65 pointer-events-none" />

        {/* Tricolor micro-accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10 pt-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/55 border border-white/25 text-emerald-300 text-xs font-bold mb-2.5 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="drop-shadow-sm">
                {t.engineBadge} · {t.matchScore}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-display text-white mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.bannerTitle}
            </h3>
            <p className="text-slate-100 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {t.bannerSubtitle}
            </p>
          </div>

          {/* Visual Handshake Diagram - Transparent Glass Small Card */}
          <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-white/30 backdrop-blur-xs shrink-0 text-xs shadow-md transition-all">
            <div className="text-center">
              <span className="font-black text-white block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.youFarmer}</span>
              <span className="text-[11px] font-bold text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">Tomato 2,000kg</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 text-amber-300 flex items-center justify-center font-black text-sm backdrop-blur-xs shadow-sm">
              ⚡
            </div>
            <div className="text-center">
              <span className="font-black text-white block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.verifiedBuyer}</span>
              <span className="text-[11px] font-bold text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">₹34-36/kg</span>
            </div>
          </div>
        </div>

        {/* Transparent Metrics Strip - Transparent Small Cards so behind image is clearly visible */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20 text-xs">
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "सत्यापित खरेदीदार" : currentLang === "hi" ? "सत्यापित खरीदार" : "Verified Buyers"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {filteredBuyers.length} {currentLang === "mr" ? "सक्रिय" : currentLang === "hi" ? "सक्रिय" : "Active Near You"}
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "सरासरी मॅच अचूकता" : currentLang === "hi" ? "औसत मैच सटीकता" : "Avg Match Score"}
            </span>
            <span className="text-base sm:text-xl font-black text-emerald-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              94.5% AI Precision
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "मध्यस्थ कमिशन" : currentLang === "hi" ? "बिचौलिया कमीशन" : "Middleman Fee"}
            </span>
            <span className="text-base sm:text-xl font-black text-amber-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              ₹0 (100% Direct)
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "एस्क्रो हमी" : currentLang === "hi" ? "एस्क्रो गारंटी" : "Escrow Protection"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              100% Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">
            {t.filterByCrop}
          </span>
          {cropFilters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedCropFilter(key)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCropFilter === key
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium shrink-0">
          {filteredBuyers.length} {t.showingBuyers}
        </span>
      </div>

      {/* Buyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBuyers.map((buyer) => {
          const isConnected = connectedBuyerId === buyer.id;

          return (
            <div
              key={buyer.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Name, Type, Match Score */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <h4 className="text-base font-bold text-slate-900">{buyer.name}</h4>
                      {buyer.verified && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> {t.verified}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{buyer.type}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {buyer.location} ({buyer.distanceKm} km)
                      </span>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 shrink-0">
                    <span className="text-lg font-black text-emerald-700 block leading-none">
                      {buyer.matchScore}%
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-900 block mt-0.5">
                      {t.match}
                    </span>
                  </div>
                </div>

                {/* Requirements & Budget */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 my-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.produceNeeded}</span>
                    <span className="font-bold text-slate-800">
                      {buyer.cropsNeeded.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.quantityDemand}</span>
                    <span className="font-bold text-slate-800">
                      {buyer.quantityNeededKg.toLocaleString("en-IN")} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.preferredGrade}</span>
                    <span className="font-bold text-emerald-700">{buyer.desiredGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.maxBudget}</span>
                    <span className="font-bold text-slate-900">
                      {t.upTo}{buyer.maxBudgetPerKg} {t.perKg}
                    </span>
                  </div>
                </div>

                {/* Buyer Confidence Percentage & Trust Factors */}
                <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">
                        {t.buyerConfidence}:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-emerald-700 text-white shadow-2xs">
                        {buyer.buyerTrustMetrics?.confidenceScore ?? 97}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedBuyerForTrust(buyer)}
                        id={`audit-buyer-btn-${buyer.id}`}
                        className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                      >
                        {t.auditTrustBtn}
                      </button>
                    </div>
                  </div>

                  {/* Micro stats: Payment Speed & Reviews */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-200/60 text-[11px]">
                    <div className="text-slate-600 flex items-center gap-1">
                      <span className="text-emerald-700 font-bold">⚡ {buyer.buyerTrustMetrics?.avgPaymentDays ?? 0.8}</span>
                      <span>{t.avgPayDays}</span>
                    </div>
                    <div className="text-slate-600 text-right font-medium">
                      ★ <strong className="text-slate-900">{buyer.buyerTrustMetrics?.farmerReviewRating ?? 4.9}</strong> ({buyer.buyerTrustMetrics?.totalFarmerReviews ?? 42} revs)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                {isConnected ? (
                  <div className="w-full py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.connectedMsg}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConnect(buyer)}
                    id={`connect-buyer-${buyer.id}`}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.connectBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buyer Trust & Solvency Modal */}
      {selectedBuyerForTrust && (
        <BuyerTrustModal
          isOpen={!!selectedBuyerForTrust}
          onClose={() => setSelectedBuyerForTrust(null)}
          buyerName={selectedBuyerForTrust.name}
          buyerType={selectedBuyerForTrust.type}
          distanceKm={selectedBuyerForTrust.distanceKm}
          trustMetrics={selectedBuyerForTrust.buyerTrustMetrics}
          currentLang={currentLang}
        />
      )}
    </div>
  );
};
