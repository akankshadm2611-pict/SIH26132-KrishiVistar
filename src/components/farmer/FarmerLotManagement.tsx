import React, { useState } from "react";
import {
  Package,
  Plus,
  Tag,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  Calendar,
  MapPin,
  TrendingUp,
  AlertCircle,
  Eye,
  ShieldCheck,
  X,
  Sparkles,
} from "lucide-react";
import { ProduceLot, LotOffer, QualityGrade } from "../../types";
import { Language } from "../../translations";
import { BuyerTrustModal } from "../trust/BuyerTrustModal";
import { LotQualityTrustModal } from "../trust/LotQualityTrustModal";

interface FarmerLotManagementProps {
  currentLang?: Language;
  lots: ProduceLot[];
  offers: LotOffer[];
  onCreateLot: (newLot: Omit<ProduceLot, "id" | "status" | "offersCount">) => void;
  onAcceptOffer: (offerId: string, lotId: string) => void;
  onCounterOffer: (offerId: string, counterPrice: number) => void;
  onRejectOffer: (offerId: string) => void;
  onOpenLogistics: () => void;
  hideCreateButton?: boolean;
  openCreateModalDirectly?: boolean;
}

const tLot = {
  mr: {
    title: "शेतमाल लॉट्स व डिजिटल ट्रेडिंग",
    subtitle: "शेतमालाची प्रतवारी करा, डिजिटल लॉट नोंदवा, थेट खरेदीदार बोली मिळवा आणि पारदर्शक व्यापार करा",
    createLot: "नवीन लॉट नोंदवा",
    activeLots: "आपले सक्रिय शेतमाल लॉट्स",
    organic: "🌿 सेंद्रिय",
    bids: "बोली",
    activeLotPrefix: "सक्रिय लॉट #",
    baseRate: "आधार दर:",
    totalLotValue: "एकूण लॉट मूल्य",
    incomingBids: "आलेल्या खरेदीदार बोली व काउंटर ऑफर्स",
    escrowNotice: "डिजिटल एस्क्रो द्वारे सुरक्षित बोली",
    noBids: "या लॉटवर अद्याप सक्रिय बोली नाही. आमच्या स्मार्ट मॅचिंगने ४ जवळच्या पडताळणीकृत खरेदीदारांना सूचित केले आहे!",
    away: "किमी दूर",
    bidRate: "बोली:",
    qty: "प्रमाण:",
    total: "एकूण:",
    dealAccepted: "सौदा मंजूर झाला!",
    bookDelivery: "वाहतूक बुक करा",
    bidRejected: "बोली नाकारली",
    counterSent: "काउंटर पाठवला",
    accept: "स्वीकारा",
    counter: "काउंटर",
    reject: "नाकारा",
    counterPriceLabel: "तुमचा काउंटर दर (₹/किलो):",
    sendCounter: "काउंटर पाठवा",
    cancel: "रद्द करा",
    selectLotPrompt: "सक्रिय बोली व डिजिटल व्यवहार पाहण्यासाठी डाव्या बाजूने लॉट निवडा",
    modalTitle: "नवीन शेतमाल लॉट नोंदणी",
    modalSubtitle: "पडताळणीकृत खरेदीदार व बाजार समित्यांसाठी शेतमालाची नोंद करा",
    cropName: "पिकाचे नाव",
    cropPlaceholder: "उदा. टोमॅटो (हायब्रिड वैष्णवी)",
    variety: "प्रकार / दर्जा वर्णन",
    varietyPlaceholder: "उदा. लाल टणक, टेबल टोमॅटो",
    totalQty: "एकूण वजन (किलो)",
    askingPrice: "अपेक्षित दर (₹/किलो)",
    qualityGrade: "गुणवत्ता प्रतवारी",
    gradeAOption: "प्रत अ (उत्कृष्ट निर्यात / रिटेल)",
    gradeBOption: "प्रत ब (मानक बाजार समिती प्रत)",
    gradeCOption: "प्रत क (प्रक्रिया / सॉस)",
    minOrder: "किमान ऑर्डर (किलो)",
    organicCheck: "प्रमाणित सेंद्रिय / रासायनिक अवशेष मुक्त",
    publishLot: "शेतमाल लॉट प्रसिद्ध करा",
    buyerConfidence: "खरेदीदार विश्वास",
    avgPayDays: "दिवसांत पेमेंट",
    auditTrustBtn: "विश्वास व पेमेंट ऑडिट",
    lotQualityScore: "लॉट गुणवत्ता विश्वास",
    auditLotQuality: "गुणवत्ता व शेतजमीन ऑडिट पहा",
  },
  hi: {
    title: "फसल लॉट व डिजिटल ट्रेडिंग",
    subtitle: "फसल ग्रेड करें, डिजिटल लॉट बनाएं, खरीदारों की बोलियां देखें और पारदर्शी व्यापार करें",
    createLot: "नया लॉट बनाएं",
    activeLots: "आपके सक्रिय फसल लॉट",
    organic: "🌿 जैविक",
    bids: "बोलियां",
    activeLotPrefix: "सक्रिय लॉट #",
    baseRate: "आधार भाव:",
    totalLotValue: "कुल लॉट मूल्य",
    incomingBids: "खरीदार बोलियां एवं काउंटर ऑफर",
    escrowNotice: "डिजिटल एस्क्रो द्वारा सुरक्षित बोलियां",
    noBids: "इस लॉट पर अभी कोई बोली नहीं आई है। हमारे स्मार्ट इंजन ने ४ नजदीकी खरीदारों को सूचित किया है!",
    away: "किमी दूर",
    bidRate: "बोली:",
    qty: "मात्रा:",
    total: "कुल:",
    dealAccepted: "सौदा स्वीकार हुआ!",
    bookDelivery: "डिलीवरी बुक करें",
    bidRejected: "बोली अस्वीकार",
    counterSent: "काउंटर भेजा गया",
    accept: "स्वीकारें",
    counter: "काउंटर",
    reject: "अस्वीकार",
    counterPriceLabel: "आपकी काउंटर दर (₹/किग्रा):",
    sendCounter: "काउंटर भेजें",
    cancel: "रद्द करें",
    selectLotPrompt: "सक्रिय बोलियां और डिजिटल व्यापार देखने के लिए बाईं ओर से लॉट चुनें",
    modalTitle: "नया फसल लॉट जोड़ें",
    modalSubtitle: "सत्यापित खरीदारों और मंडियों के लिए अपनी फसल सूचीबद्ध करें",
    cropName: "फसल का नाम",
    cropPlaceholder: "उदा. टमाटर (हाइब्रिड वैष्णवी)",
    variety: "किस्म / गुणवत्ता विवरण",
    varietyPlaceholder: "उदा. ठोस लाल, टेबल टमाटर",
    totalQty: "कुल मात्रा (किग्रा)",
    askingPrice: "मांग दर (₹/किग्रा)",
    qualityGrade: "गुणवत्ता ग्रेड",
    gradeAOption: "ग्रेड ए (प्रीमियम निर्यात / रिटेल)",
    gradeBOption: "ग्रेड बी (मानक मंडी गुणवत्ता)",
    gradeCOption: "ग्रेड सी (प्रोसेसिंग / सॉस)",
    minOrder: "न्यूनतम ऑर्डर (किग्रा)",
    organicCheck: "प्रमाणित जैविक / रसायन मुक्त",
    publishLot: "फसल लॉट प्रकाशित करें",
    buyerConfidence: "खरीदार विश्वास",
    avgPayDays: "दिन में भुगतान",
    auditTrustBtn: "विश्वास व भुगतान ऑडिट",
    lotQualityScore: "लॉट गुणवत्ता विश्वास",
    auditLotQuality: "गुणवत्ता व भूमि ऑडिट देखें",
  },
  en: {
    title: "Produce Lots & Digital Offer Trading",
    subtitle: "Grade your harvest, create digital lots, receive direct buyer bids, and negotiate transparently",
    createLot: "Create Produce Lot",
    activeLots: "Your Active Farm Lots",
    organic: "🌿 Organic",
    bids: "Bids",
    activeLotPrefix: "Active Lot #",
    baseRate: "Base Rate:",
    totalLotValue: "Total Lot Value",
    incomingBids: "Incoming Buyer Bids & Counteroffers",
    escrowNotice: "Digital Escrow protected offers",
    noBids: "No active bids on this lot yet. Our Smart Matching engine has notified 4 nearby verified buyers!",
    away: "km away",
    bidRate: "Bid:",
    qty: "Qty:",
    total: "Total:",
    dealAccepted: "Deal Accepted!",
    bookDelivery: "Book Delivery",
    bidRejected: "Bid Rejected",
    counterSent: "Counter Sent",
    accept: "Accept",
    counter: "Counter",
    reject: "Reject",
    counterPriceLabel: "Your Counter Price (₹/kg):",
    sendCounter: "Send Counter",
    cancel: "Cancel",
    selectLotPrompt: "Select a lot on the left to view active bids and digital trading",
    modalTitle: "Create Produce Lot",
    modalSubtitle: "List your harvested crop for verified buyers & mandis",
    cropName: "Crop Name",
    cropPlaceholder: "e.g. Tomato (Hybrid Vaishnavi)",
    variety: "Variety / Quality Description",
    varietyPlaceholder: "e.g. Firm Red, Grade A Table Tomato",
    totalQty: "Total Quantity (kg)",
    askingPrice: "Asking Price (₹ / kg)",
    qualityGrade: "Quality Grade",
    gradeAOption: "Grade A (Premium Export/Retail)",
    gradeBOption: "Grade B (Standard Mandi Quality)",
    gradeCOption: "Grade C (Processing/Sauce)",
    minOrder: "Min Order Qty (kg)",
    organicCheck: "Certified Organic / Zero Chemical Residue",
    publishLot: "Publish Produce Lot",
    buyerConfidence: "Buyer Confidence",
    avgPayDays: "Days Avg Pay",
    auditTrustBtn: "Trust & Solvency Audit",
    lotQualityScore: "Lot Quality Confidence",
    auditLotQuality: "Inspect Quality & Land Audit",
  },
};

export const FarmerLotManagement: React.FC<FarmerLotManagementProps> = ({
  currentLang = "en",
  lots,
  offers,
  onCreateLot,
  onAcceptOffer,
  onCounterOffer,
  onRejectOffer,
  onOpenLogistics,
  hideCreateButton = false,
  openCreateModalDirectly = false,
}) => {
  const t = tLot[currentLang] || tLot.en;
  const [selectedLotId, setSelectedLotId] = useState<string | null>(lots[0]?.id || null);
  const [showCreateModal, setShowCreateModal] = useState(openCreateModalDirectly);
  const [counteringOfferId, setCounteringOfferId] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(33);
  const [selectedBuyerOfferForTrust, setSelectedBuyerOfferForTrust] = useState<LotOffer | null>(null);
  const [selectedLotForTrust, setSelectedLotForTrust] = useState<ProduceLot | null>(null);

  // If lots change and selectedLotId is not found, select first lot
  React.useEffect(() => {
    if (!selectedLotId && lots.length > 0) {
      setSelectedLotId(lots[0].id);
    }
  }, [lots, selectedLotId]);

  // Sync if openCreateModalDirectly changes
  React.useEffect(() => {
    if (openCreateModalDirectly) {
      setShowCreateModal(true);
    }
  }, [openCreateModalDirectly]);

  // New Lot Form State
  const [newCrop, setNewCrop] = useState("Tomato (Hybrid)");
  const [newVariety, setNewVariety] = useState("Salad Firm Round");
  const [newQuantity, setNewQuantity] = useState(2000);
  const [newGrade, setNewGrade] = useState<QualityGrade>("Grade A");
  const [newPrice, setNewPrice] = useState(32);
  const [newOrganic, setNewOrganic] = useState(true);
  const [newMinOrder, setNewMinOrder] = useState(50);

  const activeLot = selectedLotId ? lots.find((l) => l.id === selectedLotId) : null;
  const lotOffers = activeLot ? offers.filter((o) => o.lotId === activeLot.id) : [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateLot({
      farmerId: "f-01",
      farmerName: "Ramesh Patil",
      farmerPhone: "+91 98220 14890",
      farmerLocation: "Dindori, Nashik",
      crop: newCrop,
      variety: newVariety,
      quantityKg: Number(newQuantity),
      availableKg: Number(newQuantity),
      qualityGrade: newGrade,
      harvestDate: "Just Plucked Today",
      askingPricePerKg: Number(newPrice),
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      organicCertified: newOrganic,
      minOrderQuantityKg: Number(newMinOrder),
    });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Optional Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#eff6ed] p-5 rounded-2xl border-2 border-emerald-300/80 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <span>{hideCreateButton ? t.activeLots : t.title}</span>
          </h3>
        </div>
        {!hideCreateButton && (
          <button
            onClick={() => setShowCreateModal(true)}
            id="create-new-lot-btn"
            className="h-8.5 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs inline-flex items-center justify-center gap-2 transition-all self-start sm:self-center cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.createLot}</span>
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Your Produce Lots List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-1">
            {t.activeLots} ({lots.length})
          </span>

          {lots.map((lot) => {
            const isSelected = lot.id === activeLot?.id;
            const currentLotOffers = offers.filter((o) => o.lotId === lot.id);

            return (
              <div
                key={lot.id}
                onClick={() => setSelectedLotId(lot.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[#eff6ed] border-2 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                    : "bg-[#eff6ed] border border-emerald-200/90 hover:border-emerald-400 hover:shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={lot.image}
                      alt={lot.crop}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          #{lot.id.replace("lot-", "")}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{lot.crop}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{lot.variety}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {lot.qualityGrade}
                        </span>
                        {lot.organicCertified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                            {t.organic}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 block">
                      ₹{lot.askingPricePerKg}
                      <span className="text-xs text-slate-500 font-normal"> / kg</span>
                    </span>
                    <span className="text-xs text-slate-500 block font-medium">
                      {lot.quantityKg.toLocaleString("en-IN")} kg
                    </span>
                    {currentLotOffers.length > 0 && (
                      <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 animate-pulse">
                        {currentLotOffers.length} {t.bids}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Digital Trading Box */}
        <div className="lg:col-span-7">
          {activeLot ? (
            <div className="bg-[#eff6ed] rounded-2xl border-2 border-emerald-300/80 shadow-xs p-5 sm:p-6 space-y-5">
              {/* Lot Summary Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={activeLot.image}
                    alt={activeLot.crop}
                    className="w-16 h-16 rounded-xl object-cover shadow-xs border border-white"
                  />
                  <div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                      {t.activeLotPrefix}{activeLot.id.replace("lot-", "")}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1 font-display">
                      {activeLot.crop} · {activeLot.quantityKg.toLocaleString("en-IN")} kg
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5 flex-wrap">
                      <span className="font-bold text-emerald-700">{activeLot.qualityGrade}</span>
                      <span>·</span>
                      <span>{t.baseRate} ₹{activeLot.askingPricePerKg}/kg</span>
                      <span>·</span>
                      <span className="text-slate-500">{activeLot.farmerLocation}</span>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => setSelectedLotForTrust(activeLot)}
                        id="inspect-active-lot-trust-btn"
                        className="inline-flex items-center gap-1 h-6 px-2 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] transition-colors cursor-pointer border border-emerald-200"
                        title={t.auditLotQuality}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.lotQualityScore}: {activeLot.trustMetrics?.confidenceScore ?? 98}%</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">{t.totalLotValue}</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{(activeLot.quantityKg * activeLot.askingPricePerKg).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLotId(null)}
                    className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title={t.cancel}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Incoming Digital Offers & Negotiation Panel */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>{t.incomingBids} ({lotOffers.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {t.escrowNotice}
                  </span>
                </div>

                {lotOffers.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-500">
                      {t.noBids}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lotOffers.map((offer) => {
                      const isPending = offer.status === "Pending";
                      const isAccepted = offer.status === "Accepted";
                      const isRejected = offer.status === "Rejected";
                      const isCountered = offer.status === "Countered";

                      return (
                        <div
                          key={offer.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isAccepted
                              ? "bg-emerald-50/80 border-emerald-300"
                              : isRejected
                              ? "bg-slate-50 opacity-60 border-slate-200"
                              : isCountered
                              ? "bg-blue-50/70 border-blue-200"
                              : "bg-white border-slate-200 hover:shadow-xs"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-slate-900">
                                  {offer.buyerName}
                                </span>
                                <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                                  {offer.buyerType}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {offer.distanceKm} {t.away}
                                </span>
                                {/* Buyer Confidence Badge */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedBuyerOfferForTrust(offer)}
                                  id={`audit-offer-buyer-${offer.id}`}
                                  className="inline-flex items-center gap-1 h-5.5 px-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold cursor-pointer transition-colors"
                                  title={t.auditTrustBtn}
                                >
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  <span>{t.buyerConfidence}: {offer.buyerTrustMetrics?.confidenceScore ?? 98}%</span>
                                  <span className="text-emerald-500">·</span>
                                  <span>⚡ {offer.buyerTrustMetrics?.avgPaymentDays ?? 0.8}d pay</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-3 text-xs mt-1 text-slate-600">
                                <span>
                                  {t.bidRate}{" "}
                                  <strong className="text-slate-900 text-sm">
                                    ₹{offer.offeredPricePerKg} / kg
                                  </strong>
                                </span>
                                <span>·</span>
                                <span>{t.qty} {offer.quantityRequestedKg} kg</span>
                                <span>·</span>
                                <span className="font-semibold text-emerald-700">
                                  {t.total} ₹{offer.totalValue.toLocaleString("en-IN")}
                                </span>
                              </div>

                              {offer.notes && (
                                <p className="text-[11px] text-slate-500 mt-1 italic">
                                  "{offer.notes}"
                                </p>
                              )}
                            </div>

                            {/* Offer Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                              {isAccepted ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.dealAccepted}
                                  </span>
                                  <button
                                    onClick={onOpenLogistics}
                                    className="h-7 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                                  >
                                    {t.bookDelivery}
                                  </button>
                                </div>
                              ) : isRejected ? (
                                <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-1 rounded">
                                  {t.bidRejected}
                                </span>
                              ) : isCountered ? (
                                <span className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded">
                                  {t.counterSent} (₹{counterPriceInput}/kg)
                                </span>
                              ) : (
                                <>
                                  <button
                                    onClick={() => onAcceptOffer(offer.id, activeLot.id)}
                                    id={`accept-offer-${offer.id}`}
                                    className="h-8 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    title="Accept deal"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{t.accept}</span>
                                  </button>

                                  <button
                                    onClick={() => setCounteringOfferId(offer.id)}
                                    id={`counter-offer-${offer.id}`}
                                    className="h-8 px-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-lg shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    title="Send counter price"
                                  >
                                    <ArrowRightLeft className="w-3.5 h-3.5" />
                                    <span>{t.counter}</span>
                                  </button>

                                  <button
                                    onClick={() => onRejectOffer(offer.id)}
                                    id={`reject-offer-${offer.id}`}
                                    className="h-8 px-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 font-bold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1"
                                    title="Decline bid"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>{t.reject}</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Inline Counter Offer Input */}
                          {counteringOfferId === offer.id && (
                            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-700">
                                {t.counterPriceLabel}
                              </span>
                              <input
                                type="number"
                                value={counterPriceInput}
                                onChange={(e) => setCounterPriceInput(Number(e.target.value))}
                                className="w-20 px-2 py-1 text-xs font-bold border border-slate-300 rounded-lg outline-hidden"
                              />
                              <button
                                onClick={() => {
                                  onCounterOffer(offer.id, counterPriceInput);
                                  setCounteringOfferId(null);
                                }}
                                className="h-7 px-3 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center justify-center"
                              >
                                {t.sendCounter}
                              </button>
                              <button
                                onClick={() => setCounteringOfferId(null)}
                                className="h-7 px-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer inline-flex items-center justify-center"
                              >
                                {t.cancel}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5 border border-emerald-200 shadow-2xs">
                <Package className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                {currentLang === "mr"
                  ? "तपशील पाहण्यासाठी शेतमाल लॉट निवडा"
                  : currentLang === "hi"
                  ? "विवरण देखने के लिए फसल लॉट चुनें"
                  : "Select a Produce Lot to View Details"}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                {t.selectLotPrompt}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create Produce Lot */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display">{t.modalTitle}</h3>
                <p className="text-xs text-emerald-100">
                  {t.modalSubtitle}
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 inline-flex items-center justify-center text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.cropName}</label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  placeholder={t.cropPlaceholder}
                  required
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.variety}
                </label>
                <input
                  type="text"
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  placeholder={t.varietyPlaceholder}
                  required
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.totalQty}
                  </label>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    min={50}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.askingPrice}
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    min={5}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.qualityGrade}
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as QualityGrade)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-bold cursor-pointer"
                  >
                    <option value="Grade A">{t.gradeAOption}</option>
                    <option value="Grade B">{t.gradeBOption}</option>
                    <option value="Grade C">{t.gradeCOption}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.minOrder}
                  </label>
                  <input
                    type="number"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    min={10}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="organic-check"
                  checked={newOrganic}
                  onChange={(e) => setNewOrganic(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="organic-check" className="text-xs font-bold text-slate-700 cursor-pointer">
                  {t.organicCheck}
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="h-8.5 px-4 text-xs text-slate-700 hover:text-slate-900 font-bold cursor-pointer inline-flex items-center justify-center"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  id="submit-create-lot-btn"
                  className="h-8.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer inline-flex items-center justify-center"
                >
                  {t.publishLot}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Buyer Trust & Solvency Modal */}
      {selectedBuyerOfferForTrust && (
        <BuyerTrustModal
          isOpen={!!selectedBuyerOfferForTrust}
          onClose={() => setSelectedBuyerOfferForTrust(null)}
          buyerName={selectedBuyerOfferForTrust.buyerName}
          buyerType={selectedBuyerOfferForTrust.buyerType}
          distanceKm={selectedBuyerOfferForTrust.distanceKm}
          trustMetrics={selectedBuyerOfferForTrust.buyerTrustMetrics}
          currentLang={currentLang}
        />
      )}

      {/* Lot Quality & Farmer Trust Modal */}
      {selectedLotForTrust && (
        <LotQualityTrustModal
          isOpen={!!selectedLotForTrust}
          onClose={() => setSelectedLotForTrust(null)}
          lot={selectedLotForTrust}
          currentLang={currentLang}
        />
      )}
    </div>
  );
};
