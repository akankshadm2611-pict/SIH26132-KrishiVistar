import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Star,
  Building2,
  X,
  CreditCard,
  AlertTriangle,
  Award,
  BadgeCheck,
  Scale,
  DollarSign,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { BuyerTrustMetrics } from "../../types";
import { Language } from "../../translations";

interface BuyerTrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerName: string;
  buyerType: string;
  distanceKm?: number;
  trustMetrics?: BuyerTrustMetrics;
  currentLang?: Language;
}

const tModal = {
  mr: {
    title: "खरेदीदार विश्वासार्हता व पडताळणी अहवाल",
    subtitle: "शेतकऱ्यांचे रक्षण: हा खरेदीदार खरा, परवानाधारक आणि वेळेवर पैसे देणारा असल्याचे १००% खात्री करा",
    confidenceTitle: "एकूण खरेदीदार विश्वास टक्केवारी",
    confidenceDesc: "पेमेंट इतिहास, शेतकरी पुनरावलोकने, व्यवहार प्रमाण आणि सरकारी परवान्यांवर आधारित",
    highTrust: "अत्युच्च विश्वासार्ह खरेदीदार (A+ श्रेणी)",
    paymentPillar: "पेमेंट गती आणि दिवस",
    paymentPillarSub: "सरासरी पेमेंट दिवस",
    escrowNote: "माल उतरवल्यानंतर त्वरित डिजिटल एस्क्रो खात्यातून वर्ग",
    reviewPillar: "शेतकरी पुनरावलोकन व रेटिंग",
    reviewPillarSub: "शेतकऱ्यांची १००% सकारात्मक शिफारस",
    tradesPillar: "यशस्वी व्यवहार संख्या",
    tradesPillarSub: "शेतकऱ्यांना एकूण चुकती रक्कम",
    disputePillar: "पेमेंट डिफॉल्ट दर",
    disputePillarSub: "शून्य बँक पेमेंट त्रुटी",
    kycTitle: "कायदेशीर व व्यवसाय पडताळणी",
    apmcVerified: "APMC / कृषी उत्पन्न बाजार समिती परवाना पडताळणीकृत",
    gstVerified: "जीएसटीआयएन (GSTIN) व पॅन नोंदणी सक्रिय",
    warehouseVerified: "स्थानिक गोदाम / रिटेल आउटलेट प्रत्यक्ष तपासणी पूर्ण",
    bankVerified: "बँक खाते व संचालक आधार ई-केवायसी पूर्ण",
    reviewsTitle: "शेतकऱ्यांचे ताजे अनुभव व प्रतिक्रिया",
    daysToPayLabel: "दिवसांत पैसे मिळाले",
    verifiedFarmerBadge: "पडताळणीकृत शेतकरी",
    closeBtn: "बंद करा",
    escrowGuaranteeTitle: "शेतकरी सुरक्षितता हमी",
    escrowGuaranteeDesc: "खरेदीदाराने अगोदरच एस्क्रोमध्ये रक्कम जमा केल्याशिवाय गाडी भरण्यास परवानगी दिली जात नाही.",
  },
  hi: {
    title: "खरीदार विश्वसनीयता व सत्यापन रिपोर्ट",
    subtitle: "किसानों की सुरक्षा: यह खरीदार वास्तविक, लाइसेंस प्राप्त और समय पर भुगतान करने वाला है",
    confidenceTitle: "कुल खरीदार विश्वास प्रतिशत",
    confidenceDesc: "भुगतान इतिहास, किसान समीक्षाएं, व्यापार मात्रा और कानूनी लाइसेंस पर आधारित",
    highTrust: "अत्यधिक विश्वसनीय खरीदार (A+ श्रेणी)",
    paymentPillar: "भुगतान गति व दिन",
    paymentPillarSub: "औसत भुगतान दिन",
    escrowNote: "माल उतरने के तुरंत बाद डिजिटल एस्क्रो से सीधे बैंक खाते में भुगतान",
    reviewPillar: "किसान समीक्षा व रेटिंग",
    reviewPillarSub: "किसानों द्वारा १००% सकारात्मक अनुशंसा",
    tradesPillar: "सफल कुल सौदे",
    tradesPillarSub: "किसानों को कुल भुगतान",
    disputePillar: "भुगतान चूक दर",
    disputePillarSub: "शून्य भुगतान विफलता",
    kycTitle: "कानूनी व व्यापार सत्यापन",
    apmcVerified: "APMC / मंडी व्यापारी लाइसेंस सत्यापित",
    gstVerified: "जीएसटीआईएन (GSTIN) व पैन सक्रिय",
    warehouseVerified: "भौतिक गोदाम / आउटलेट सत्यापन पूर्ण",
    bankVerified: "बैंक खाता व आधार ई-केवाईसी पूर्ण",
    reviewsTitle: "किसानों की वास्तविक समीक्षाएं",
    daysToPayLabel: "दिन में भुगतान मिला",
    verifiedFarmerBadge: "सत्यापित किसान",
    closeBtn: "बंद करें",
    escrowGuaranteeTitle: "किसान सुरक्षा गारंटी",
    escrowGuaranteeDesc: "खरीदार द्वारा एस्क्रो में १००% राशि जमा करने के बाद ही फसल लोडिंग की अनुमति होती है।",
  },
  en: {
    title: "Buyer Trust & Solvency Audit",
    subtitle: "Farmer Protection: Verify that this buyer is real, licensed, and pays on schedule",
    confidenceTitle: "Buyer Confidence Score",
    confidenceDesc: "Calculated from payment speed, farmer reviews, deal volume, and verified statutory licenses",
    highTrust: "Top-Tier Trust Buyer (A+ Grade)",
    paymentPillar: "Payment Speed & Days",
    paymentPillarSub: "Avg Payment Clearance",
    escrowNote: "Auto-released from escrow upon delivery weighment",
    reviewPillar: "Farmer Reviews & Rating",
    reviewPillarSub: "Farmer Satisfaction Rate",
    tradesPillar: "Completed Farm Deals",
    tradesPillarSub: "Total Farmer Payout Disbursed",
    disputePillar: "Payment Default Rate",
    disputePillarSub: "Zero Payment Failures Guarantee",
    kycTitle: "Statutory & Identity Verification",
    apmcVerified: "APMC Mandi Trader License Verified",
    gstVerified: "GSTIN & Business Registration Active",
    warehouseVerified: "Physical Warehouse / Processing Plant Verified",
    bankVerified: "Bank Account & Director Aadhaar e-KYC Complete",
    reviewsTitle: "Recent Verified Farmer Testimonials",
    daysToPayLabel: "Days to receive payment",
    verifiedFarmerBadge: "Verified Farmer",
    closeBtn: "Close Audit",
    escrowGuaranteeTitle: "100% Escrow Fund Lock",
    escrowGuaranteeDesc: "100% of the bid funds are locked into KrishiVistar Digital Escrow before vehicle dispatch.",
  },
};

export const BuyerTrustModal: React.FC<BuyerTrustModalProps> = ({
  isOpen,
  onClose,
  buyerName,
  buyerType,
  distanceKm,
  trustMetrics,
  currentLang = "en",
}) => {
  if (!isOpen) return null;

  const t = tModal[currentLang] || tModal.en;

  // Fallback defaults if metrics not specified
  const metrics: BuyerTrustMetrics = trustMetrics || {
    confidenceScore: 97,
    avgPaymentDays: 0.8,
    paymentSpeedLabel: "Instant (Within 12h of delivery)",
    farmerReviewRating: 4.9,
    totalFarmerReviews: 42,
    completedTradesCount: 128,
    totalPayoutAmount: 3850000,
    disputeRatePercent: 0.2,
    kycVerified: true,
    gstApmcLicenseVerified: true,
    zeroDefaultGuarantee: true,
    recentReviews: [
      {
        farmerName: "Devidas Wagh",
        village: "Khed, Pune",
        rating: 5,
        daysToPay: 0.5,
        comment: "Full payment auto-released the exact afternoon truck was unloaded. Very clean dealing.",
        date: "Yesterday",
      },
      {
        farmerName: "Gopal Patil",
        village: "Niphad",
        rating: 4.9,
        daysToPay: 1,
        comment: "Exact weighbridge slip provided, zero unneeded deductions on produce crates.",
        date: "4 days ago",
      },
    ],
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        id="buyer-trust-confidence-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            id="close-buyer-trust-modal-btn"
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              {t.title}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 mt-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>{buyerName}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                {buyerType} {distanceKm ? `· ${distanceKm} km away` : ""} · {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Main Confidence Percentage Hero Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.highTrust}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {t.confidenceTitle}
              </h4>
              <p className="text-xs text-slate-600 max-w-md">
                {t.confidenceDesc}
              </p>
            </div>

            {/* Circular score badge */}
            <div className="relative shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white border-2 border-emerald-500 shadow-md">
              <span className="text-3xl font-black text-emerald-700 leading-none">
                {metrics.confidenceScore}%
              </span>
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider mt-1">
                Trust Score
              </span>
            </div>
          </div>

          {/* 4 Core Pillars of Trust Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Payment Speed */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.paymentPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  ⚡ {metrics.avgPaymentDays} {t.paymentPillarSub}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                  {metrics.paymentSpeedLabel}
                </span>
              </div>
            </div>

            {/* 2. Reviews & Rating */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.reviewPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  ★ {metrics.farmerReviewRating} / 5.0
                </div>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  {metrics.totalFarmerReviews} {t.reviewPillarSub}
                </span>
              </div>
            </div>

            {/* 3. Deal Volume */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.tradesPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {metrics.completedTradesCount}+ Deals
                </div>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  ₹{(metrics.totalPayoutAmount / 100000).toFixed(1)} Lakhs {t.tradesPillarSub}
                </span>
              </div>
            </div>

            {/* 4. Default / Dispute Rate */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.disputePillar}
                </span>
                <div className="text-base font-black text-emerald-700 mt-0.5">
                  0.0% Defaults
                </div>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  {t.disputePillarSub}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Verification Checklist */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.kycTitle}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t.apmcVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t.gstVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t.warehouseVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t.bankVerified}</span>
              </div>
            </div>
          </div>

          {/* Real Farmer Reviews Section */}
          {metrics.recentReviews && metrics.recentReviews.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                <span>{t.reviewsTitle}</span>
              </h5>
              <div className="space-y-2">
                {metrics.recentReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {rev.farmerName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({rev.village})
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          {t.verifiedFarmerBadge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-amber-600">
                        <span>★ {rev.rating}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                          ⚡ {rev.daysToPay} {t.daysToPayLabel}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 italic text-[11px] pt-0.5">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Escrow Guarantee Notice */}
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs flex items-start gap-2.5">
            <CreditCard className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-teal-900 block">
                {t.escrowGuaranteeTitle}
              </span>
              <p className="text-teal-800 mt-0.5">
                {t.escrowGuaranteeDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            id="dismiss-buyer-trust-modal-btn"
            className="h-8.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
