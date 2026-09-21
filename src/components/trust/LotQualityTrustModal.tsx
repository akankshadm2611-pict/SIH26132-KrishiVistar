import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  X,
  Award,
  BadgeCheck,
  Scale,
  Sparkles,
  FileCheck,
  Check,
  Building2,
  Lock,
} from "lucide-react";
import { ProduceLot, FarmerLotTrustMetrics } from "../../types";
import { Language } from "../../translations";

interface LotQualityTrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  lot: ProduceLot | null;
  currentLang?: Language;
}

const tLotModal = {
  mr: {
    title: "शेतमाल प्रत व शेतकरी विश्वासार्हता अहवाल",
    subtitle: "खरेदीदारांचे रक्षण: हा शेतमाल १००% खात्रीशीर, प्रत्यक्ष ग्रेड तपासलेला आणि अस्सल असल्याची खात्री",
    confidenceTitle: "एकूण शेतमाल गुणवत्ता विश्वास टक्केवारी",
    confidenceDesc: "लॅब ग्रेड चाचणी, वजन अचूकता, ७/१२ जमीन पडताळणी आणि पूर्वीच्या खरेदीदारांच्या समाधानावर आधारित",
    highTrust: "प्रीमियम ए+ दर्जा प्रमाणित लॉट",
    gradePillar: "प्रत आणि गुणवत्ता अचूकता",
    gradePillarSub: "तपासलेला ग्रेड अचूकता दर",
    weightPillar: "वजन प्रामाणिकपणा (काटा अचूकता)",
    weightPillarSub: "वजन तफावत शून्य तक्रारी",
    dispatchPillar: "वेळेवर तोडणी व पाठवणी",
    dispatchPillarSub: "वेळेवर डिलिव्हरी दर",
    farmerPillar: "शेतकरी विश्वासार्हता ट्रॅक",
    farmerPillarSub: "यशस्वी डिलिव्हरी लॉट",
    kycTitle: "शेतकरी ओळख व शेतजमीन पडताळणी",
    landVerified: "महाराष्ट्र महसूल ७/१२ आणि ८-अ डिजिटल उतारा पडताळणीकृत",
    kisanVerified: "किसान क्रेडिट व मोबाईल आधार बायोमेट्रिक पडताळणी पूर्ण",
    geoVerified: "थेट शेत शिवाराचे जिओ-टॅगिंग व स्थान नोंदणीकृत",
    labVerified: "शेतमाल लॅब चाचणी व अवशिष्ट कीटकनाशक मुक्त निकष पूर्ण",
    reviewsTitle: "इतर घाऊक व रिटेल खरेदीदारांच्या प्रत्यक्ष प्रतिक्रिया",
    verifiedBuyerBadge: "पडताळणीकृत खरेदीदार",
    escrowProtectTitle: "१००% खरेदीदार एस्क्रो सुरक्षा हमी",
    escrowProtectDesc: "आपले पैसे कृषिविस्तार डिजिटल एस्क्रोमध्ये सुरक्षित राहतात. प्रत्यक्ष गाडी आल्यावर गुणवत्ता तपासून स्वीकारल्यानंतरच शेतकऱ्याला पैसे वर्ग होतात.",
    closeBtn: "बंद करा",
    moistureLabel: "ओलावा प्रमाण (Moisture):",
    brixLabel: "साखर प्रमाण (Brix):",
  },
  hi: {
    title: "फसल गुणवत्ता व किसान विश्वसनीयता रिपोर्ट",
    subtitle: "खरीदार सुरक्षा: यह लॉट १००% भरोसेमंद, ग्रेड परीक्षित और वास्तविक गुणवत्ता का है",
    confidenceTitle: "कुल लॉट गुणवत्ता विश्वास प्रतिशत",
    confidenceDesc: "लैब ग्रेड परीक्षण, वजन शुद्धता, ७/१२ जमीन सत्यापन और पिछले खरीदारों की संतुष्टि पर आधारित",
    highTrust: "प्रीमियम ए+ ग्रेड प्रमाणित लॉट",
    gradePillar: "ग्रेड व गुणवत्ता शुद्धता",
    gradePillarSub: "ग्रेड सटीकता दर",
    weightPillar: "वजन ईमानदारी (तोल शुद्धता)",
    weightPillarSub: "शून्य वजन कटौती विवाद",
    dispatchPillar: "समय पर कटाई व प्रेषण",
    dispatchPillarSub: "समय पर प्रेषण दर",
    farmerPillar: "किसान विश्वसनीयता ट्रैक",
    farmerPillarSub: "सफल कुल डिलीवरी",
    kycTitle: "किसान पहचान व भूमि सत्यापन",
    landVerified: "महाराष्ट्र राजस्व ७/१२ और ८-ए डिजिटल खसरा सत्यापित",
    kisanVerified: "किसान क्रेडिट व मोबाइल आधार बायोमेट्रिक पूर्ण",
    geoVerified: "खेत का वास्तविक जियो-टैग्ड स्थान सत्यापित",
    labVerified: "लैब ग्रेडिंग व शून्य रासायनिक अवशेष मानक पूर्ण",
    reviewsTitle: "अन्य थोक व खुदरा खरीदारों की समीक्षाएं",
    verifiedBuyerBadge: "सत्यापित खरीदार",
    escrowProtectTitle: "१००% खरीदार एस्क्रो सुरक्षा गारंटी",
    escrowProtectDesc: "आपकी भुगतान राशि KrishiVistar एस्क्रो में सुरक्षित रहती है। माल पहुंचने व गुणवत्ता जांचने के बाद ही किसान को भुगतान रिलीज होता है।",
    closeBtn: "बंद करें",
    moistureLabel: "नमी प्रतिशत (Moisture):",
    brixLabel: "मिठास स्तर (Brix):",
  },
  en: {
    title: "Lot Quality & Farmer Trust Audit",
    subtitle: "Buyer Protection: Verify that this crop lot is genuine, grade-assayed, and harvested to spec",
    confidenceTitle: "Lot Quality Confidence Score",
    confidenceDesc: "Calculated from assay grade conformity, scale weighment accuracy, 7/12 land records, and repeat buyer ratings",
    highTrust: "Certified A+ Verified Produce Lot",
    gradePillar: "Grade & Purity Conformity",
    gradePillarSub: "Assay Spec Accuracy",
    weightPillar: "Scale & Weighment Honesty",
    weightPillarSub: "Zero Short-Weight Disputes",
    dispatchPillar: "Fresh Harvest & Dispatch",
    dispatchPillarSub: "On-Time Farm Dispatch",
    farmerPillar: "Farmer Proven Track Record",
    farmerPillarSub: "Completed Crop Batches",
    kycTitle: "Farmer Identity & Farm Land Verification",
    landVerified: "State Land Registry 7/12 & 8A Record Authenticated",
    kisanVerified: "Kisan Registry & Mobile OTP Authenticated",
    geoVerified: "Geo-tagged Farm Plot & Satellite Verification Complete",
    labVerified: "Harvest Inspection & Safe Residue Standards Verified",
    reviewsTitle: "Verified Buyer Feedback on this Farmer's Produce",
    verifiedBuyerBadge: "Verified Buyer",
    escrowProtectTitle: "100% Escrow Buyer Protection",
    escrowProtectDesc: "Your funds remain locked in KrishiVistar Escrow until you inspect and accept produce quality at unloading.",
    closeBtn: "Close Audit",
    moistureLabel: "Moisture Level:",
    brixLabel: "Brix Sweetness Score:",
  },
};

export const LotQualityTrustModal: React.FC<LotQualityTrustModalProps> = ({
  isOpen,
  onClose,
  lot,
  currentLang = "en",
}) => {
  if (!isOpen || !lot) return null;

  const t = tLotModal[currentLang] || tLotModal.en;

  const metrics: FarmerLotTrustMetrics = lot.trustMetrics || {
    confidenceScore: 97,
    gradeAccuracyScore: 98,
    onTimeDispatchScore: 98,
    weightAccuracyScore: 100,
    completedDeliveriesCount: 48,
    buyerSatisfactionRating: 4.9,
    totalBuyerReviews: 36,
    landRecordVerified: true,
    kisanCreditVerified: true,
    labAssayCertified: true,
    recentBuyerReviews: [
      {
        buyerName: "Metro Fresh Retail",
        buyerType: "Retail Chain",
        rating: 5,
        qualityComment: "Exceptional uniform quality, sorted as declared with clean crates.",
        date: "3 days ago",
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
        id="lot-quality-trust-confidence-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            id="close-lot-trust-modal-btn"
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-sky-400/20 border border-sky-300/30 text-sky-200 text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              {t.title}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/15 text-white text-[11px] font-bold">
              Lot #{lot.id}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>{lot.crop}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-sky-500/30 border border-sky-400/40 text-sky-200 font-bold">
                ⭐ {lot.qualityGrade}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-sky-100/80 mt-1 flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white">👨‍🌾 {lot.farmerName}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {lot.farmerLocation}
              </span>
              <span>·</span>
              <span>{lot.variety}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Main Confidence Percentage Hero Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/40 to-white border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold">
                <Award className="w-3.5 h-3.5 text-sky-700" />
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
            <div className="relative shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white border-2 border-sky-500 shadow-md">
              <span className="text-3xl font-black text-sky-700 leading-none">
                {metrics.confidenceScore}%
              </span>
              <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider mt-1">
                Quality Score
              </span>
            </div>
          </div>

          {/* 4 Core Pillars of Lot Trust */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Grade Accuracy */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.gradePillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {metrics.gradeAccuracyScore}% {t.gradePillarSub}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 mt-0.5 flex-wrap">
                  {metrics.moisturePercent && (
                    <span>{t.moistureLabel} {metrics.moisturePercent}%</span>
                  )}
                  {metrics.brixSweetnessScore && (
                    <span>{t.brixLabel} {metrics.brixSweetnessScore}°</span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Weight Honesty */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.weightPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {metrics.weightAccuracyScore}% Match
                </div>
                <span className="text-[11px] text-teal-700 block mt-0.5">
                  {t.weightPillarSub}
                </span>
              </div>
            </div>

            {/* 3. Fresh Harvest & Dispatch */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.dispatchPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {metrics.onTimeDispatchScore}% On-Time
                </div>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  {lot.harvestDate}
                </span>
              </div>
            </div>

            {/* 4. Farmer Delivery History */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {t.farmerPillar}
                </span>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  ★ {metrics.buyerSatisfactionRating} / 5.0
                </div>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  {metrics.completedDeliveriesCount} {t.farmerPillarSub} ({metrics.totalBuyerReviews} Reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Land & Farmer Identity Checklist */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-sky-600" />
              <span>{t.kycTitle}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold">{t.landVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold">{t.kisanVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold">{t.geoVerified}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold">{t.labVerified}</span>
              </div>
            </div>
          </div>

          {/* Real Buyer Feedback on this lot / farmer */}
          {metrics.recentBuyerReviews && metrics.recentBuyerReviews.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                <span>{t.reviewsTitle}</span>
              </h5>
              <div className="space-y-2">
                {metrics.recentBuyerReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {rev.buyerName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({rev.buyerType})
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-semibold">
                          {t.verifiedBuyerBadge}
                        </span>
                      </div>
                      <span className="font-bold text-amber-600">
                        ★ {rev.rating} / 5.0
                      </span>
                    </div>
                    <p className="text-slate-600 italic text-[11px] pt-0.5">
                      "{rev.qualityComment}"
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Escrow Buyer Protection Card */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block">
                {t.escrowProtectTitle}
              </span>
              <p className="text-emerald-800 mt-0.5">
                {t.escrowProtectDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            id="dismiss-lot-trust-modal-btn"
            className="h-8.5 px-5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
