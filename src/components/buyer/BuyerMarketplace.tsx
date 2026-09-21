import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Star,
  MapPin,
  ShieldCheck,
  Package,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { ProduceLot, QualityGrade } from "../../types";
import { Language } from "../../translations";
import { LotQualityTrustModal } from "../trust/LotQualityTrustModal";

const cropFallbackImages: Record<string, string> = {
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
  onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  grapes: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
};

interface BuyerMarketplaceProps {
  lots: ProduceLot[];
  onPlaceOrder: (order: {
    lotId: string;
    crop: string;
    farmerName: string;
    quantityKg: number;
    pricePerKg: number;
    totalAmount: number;
    orderType: "small" | "bulk";
    address: string;
  }) => void;
  onOpenAiAssistant: (prompt: string) => void;
  currentLang?: Language;
}

const tMarketplace = {
  mr: {
    heroBadge: "थेट शेतातून घाऊक व किरकोळ खरेदी",
    heroTitle: "शेतकऱ्यांकडून थेट ताजी फळे व भाजीपाला मागवा",
    heroSubtitle: "१००% एस्क्रो सुरक्षा: माल तपासून स्वीकारल्यानंतरच शेतकऱ्याला पैसे वर्ग केले जातात.",
    aiBtn: "AI भाव तुलना विचारा",
    searchPlaceholder: "पीक, शेतकऱ्याचे नाव किंवा ठिकाण शोधा...",
    allProduce: "सर्व शेतमाल",
    smallQty: "🛒 कमी प्रमाण (१०-५० किलो)",
    bulkQty: "🏢 घाऊक प्रमाण (१००-२,००० किलो)",
    filterByProduct: "उत्पाद",
    filterByGrade: "प्रत",
    filterByDistance: "कमाल अंतर",
    allCrops: "सर्व पिके",
    tomato: "टोमॅटो",
    onion: "कांदा",
    potato: "बटाटा",
    grapes: "द्राक्षे",
    wheat: "गहू",
    allGrades: "सर्व प्रत",
    gradeA: "प्रत अ (उत्कृष्ट किरकोळ)",
    gradeB: "प्रत ब (प्रमाणित)",
    gradeC: "प्रत क (प्रक्रिया)",
    allDistances: "सर्व अंतर",
    within15km: "१५ किमी आत",
    within25km: "२५ किमी आत",
    within50km: "५० किमी आत",
    kmAway: "किमी अंतरावर",
    resetFilters: "फिल्टर रीसेट",
    noLotsFound: "निवडलेल्या प्रत, पीक व अंतर निकषांनुसार लॉट आढळले नाहीत.",
    organic: "🌿 सेंद्रिय",
    available: "उपलब्ध",
    savingVsSupermarket: "-२५% सुपरमार्केटपेक्षा बचत",
    ordersCount: "ऑर्डर्स",
    minOrder: "किमान ऑर्डर",
    buySmall: "किरकोळ खरेदी (२५ किलो)",
    buyBulk: "घाऊक खरेदी करा",
    modalTitle: "एस्क्रो सुरक्षेसह थेट शेतकऱ्याकडून खरेदी",
    orderSuccessTitle: "ऑर्डर सुरक्षित एस्क्रोमध्ये नोंदवली!",
    orderSuccessText: "तुमचे पैसे KrishiVistar एस्क्रो व्हॉल्टमध्ये सुरक्षित ठेवण्यात आले आहेत.",
    orderId: "ऑर्डर क्र.:",
    buyerProtectionTitle: "खरेदीदार संरक्षण हमी",
    buyerProtectionDesc: "शेतकरी ताजी कापणी करून माल पाठवतील. डिलिव्हरीच्या वेळी प्रत तपासा; दर्जा समाधानकारक नसल्यास १-क्लिक तक्रार करून पूर्ण परतावा मिळवा.",
    viewOrders: "माझ्या ऑर्डर्स पहा",
    qtyLabel: "ऑर्डर प्रमाण निवडा (किलो)",
    bulkDiscountApplied: "🎉 घाऊक सवलत लागू: ८% सूट",
    addressLabel: "डिलिव्हरी व अनलोडिंग पत्ता",
    baseRate: "मूळ दर:",
    wholesaleDiscount: "घाऊक सवलत (८%):",
    escrowFee: "एस्क्रो संरक्षण शुल्क:",
    free: "विनामूल्य",
    totalPayable: "एकूण देय (एस्क्रोमध्ये):",
    escrowNote: "रक्कम एस्क्रोमध्ये सुरक्षित राहते. प्रत्यक्ष डिलिव्हरी व स्वीकृतीनंतरच शेतकऱ्याला पैसे मिळतात.",
    cancel: "रद्द करा",
    payEscrow: "सुरक्षित एस्क्रोमध्ये पैसे भरा",
    aiPrompt: "सध्या २०० किलो ताज्या टोमॅटोसाठी वाजवी खरेदी भाव काय असावा?",
    lotQualityConfidence: "लॉट गुणवत्ता विश्वास",
    inspectQualityAudit: "गुणवत्ता व शेतजमीन ऑडिट पहा",
    gradeAccuracy: "ग्रेड अचूकता",
    weightMatch: "वजन शुद्धता",
    landVerified: "७/१२ भू-नोंद प्रमाणित",
  },
  hi: {
    heroBadge: "खेत से सीधे थोक एवं खुदरा खरीद",
    heroTitle: "किसानों से सीधे ताजा उत्पाद मंगवाएं",
    heroSubtitle: "१००% एस्क्रो सुरक्षा: माल की जांच और स्वीकृति के बाद ही किसान को भुगतान किया जाता है।",
    aiBtn: "AI भाव तुलना पूछें",
    searchPlaceholder: "फसल, किसान का नाम या स्थान खोजें...",
    allProduce: "सभी उत्पाद",
    smallQty: "🛒 कम मात्रा (१०-५० किग्रा)",
    bulkQty: "🏢 थोक मात्रा (१००-२,००० किग्रा)",
    filterByProduct: "फसल",
    filterByGrade: "ग्रेड",
    filterByDistance: "अधिकतम दूरी",
    allCrops: "सभी फसलें",
    tomato: "टमाटर",
    onion: "प्याज",
    potato: "आलू",
    grapes: "अंगूर",
    wheat: "गेहूं",
    allGrades: "सभी ग्रेड",
    gradeA: "ग्रेड ए (प्रीमियम खुदरा)",
    gradeB: "ग्रेड बी (मानक)",
    gradeC: "ग्रेड सी (प्रसंस्करण)",
    allDistances: "सभी दूरी",
    within15km: "१५ किमी के भीतर",
    within25km: "२५ किमी के भीतर",
    within50km: "५० किमी के भीतर",
    kmAway: "किमी दूर",
    resetFilters: "फ़िल्टर रीसेट",
    noLotsFound: "चुने गए ग्रेड, फसल और दूरी के अनुसार कोई लॉट नहीं मिला।",
    organic: "🌿 जैविक",
    available: "उपलब्ध",
    savingVsSupermarket: "-२५% सुपरमार्केट की तुलना में बचत",
    ordersCount: "ऑर्डर",
    minOrder: "न्यूनतम ऑर्डर",
    buySmall: "खुदरा खरीदें (२५ किग्रा)",
    buyBulk: "थोक मात्रा खरीदें",
    modalTitle: "एस्क्रो सुरक्षा के साथ सीधे किसान से ऑर्डर करें",
    orderSuccessTitle: "ऑर्डर सुरक्षित एस्क्रो में दर्ज!",
    orderSuccessText: "आपकी भुगतान राशि KrishiVistar एस्क्रो में सुरक्षित जमा है।",
    orderId: "ऑर्डर आईडी:",
    buyerProtectionTitle: "खरीदार सुरक्षा गारंटी",
    buyerProtectionDesc: "किसान ताजी फसल काटकर भेजेंगे। डिलीवरी पर गुणवत्ता जांचें; यदि ग्रेड सही न हो तो १-क्लिक शिकायत दर्ज कर पूरा रिफंड पाएं।",
    viewOrders: "मेरे ऑर्डर देखें",
    qtyLabel: "ऑर्डर मात्रा चुनें (किग्रा)",
    bulkDiscountApplied: "🎉 थोक छूट लागू: ८% छूट",
    addressLabel: "डिलीवरी व अनलोडिंग पता",
    baseRate: "मूल दर:",
    wholesaleDiscount: "थोक छूट (८%):",
    escrowFee: "एस्क्रो सुरक्षा शुल्क:",
    free: "निःशुल्क",
    totalPayable: "कुल देय (एस्क्रो में):",
    escrowNote: "पैसे एस्क्रो में सुरक्षित रहेंगे। माल पहुंचने व जांच के बाद ही किसान को भुगतान होगा।",
    cancel: "रद्द करें",
    payEscrow: "सुरक्षित एस्क्रो में भुगतान करें",
    aiPrompt: "वर्तमान में २०० किग्रा ताजे टमाटर के लिए उचित खरीद मूल्य क्या होना चाहिए?",
    lotQualityConfidence: "लॉट गुणवत्ता विश्वास",
    inspectQualityAudit: "गुणवत्ता व भूमि ऑडिट देखें",
    gradeAccuracy: "ग्रेड शुद्धता",
    weightMatch: "तोल शुद्धता",
    landVerified: "७/१२ भू-सत्यापित",
  },
  en: {
    heroBadge: "Farm-Direct Wholesale & Retail Sourcing",
    heroTitle: "Order Farm Fresh Produce in Small or Bulk Quantity",
    heroSubtitle: "100% Escrow Protected: Funds are released to farmers only after you inspect and accept your delivery.",
    aiBtn: "Ask AI Rate Comparison",
    searchPlaceholder: "Search by crop, farmer name or location...",
    allProduce: "All Produce",
    smallQty: "🛒 Small Qty (10-50 kg)",
    bulkQty: "🏢 Bulk Qty (100-2,000 kg)",
    filterByProduct: "Product",
    filterByGrade: "Quality Grade",
    filterByDistance: "Max Distance",
    allCrops: "All Crops",
    tomato: "Tomato",
    onion: "Onion",
    potato: "Potato",
    grapes: "Grapes",
    wheat: "Wheat",
    allGrades: "All Grades",
    gradeA: "Grade A (Premium Retail)",
    gradeB: "Grade B (Standard)",
    gradeC: "Grade C (Processing)",
    allDistances: "All Distances",
    within15km: "Within 15 km",
    within25km: "Within 25 km",
    within50km: "Within 50 km",
    kmAway: "km away",
    resetFilters: "Reset Filters",
    noLotsFound: "No produce lots match the selected grade, crop, and distance criteria.",
    organic: "🌿 Organic",
    available: "available",
    savingVsSupermarket: "-25% vs Supermarket",
    ordersCount: "orders",
    minOrder: "Min Order",
    buySmall: "Buy Small (25kg)",
    buyBulk: "Buy Bulk Qty",
    modalTitle: "Order Direct from Farmer with Escrow Safety",
    orderSuccessTitle: "Order Placed in Safe Escrow!",
    orderSuccessText: "is locked securely in KrishiVistar Escrow.",
    orderId: "Order ID:",
    buyerProtectionTitle: "Buyer Protection Guarantee",
    buyerProtectionDesc: "Farmer will harvest and dispatch fresh produce. Inspect at delivery dock; if quality doesn't match, you can file a 1-click grievance for full refund.",
    viewOrders: "View in My Orders",
    qtyLabel: "Select Order Quantity (kg)",
    bulkDiscountApplied: "🎉 Bulk Discount Applied: 8% OFF",
    addressLabel: "Delivery & Unloading Address",
    baseRate: "Base Unit Rate:",
    wholesaleDiscount: "Wholesale Bulk Discount (8%):",
    escrowFee: "Escrow Insurance & Protection Fee:",
    free: "FREE",
    totalPayable: "Total Payable (To Escrow):",
    escrowNote: "Funds stay locked in escrow. Farmer is paid only after physical delivery.",
    cancel: "Cancel",
    payEscrow: "Pay into Secure Escrow",
    aiPrompt: "What is the fair benchmark price to buy 200kg fresh tomatoes right now?",
    lotQualityConfidence: "Lot Quality Confidence",
    inspectQualityAudit: "Inspect Quality & Farmer Audit",
    gradeAccuracy: "Grade Accuracy",
    weightMatch: "Weight Match",
    landVerified: "7/12 Land Verified",
  },
};

export const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({
  lots,
  onPlaceOrder,
  onOpenAiAssistant,
  currentLang = "en",
}) => {
  const t = tMarketplace[currentLang] || tMarketplace.en;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState<ProduceLot | null>(null);
  const [selectedLotForTrust, setSelectedLotForTrust] = useState<ProduceLot | null>(null);

  // Order modal state
  const [orderQuantity, setOrderQuantity] = useState<number>(25);
  const [deliveryAddress, setDeliveryAddress] = useState("Flat 402, Green Meadows, Kothrud, Pune - 411038");
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Helper to extract or fallback distance
  const getLotDistance = (lot: ProduceLot): number => {
    if (lot.distanceKm !== undefined && lot.distanceKm > 0) return lot.distanceKm;
    const match = lot.farmerLocation.match(/(\d+)\s*km/);
    if (match && match[1]) return Number(match[1]);
    if (lot.crop.toLowerCase().includes("tomato")) return 14;
    if (lot.crop.toLowerCase().includes("onion")) return 12;
    if (lot.crop.toLowerCase().includes("potato")) return 18;
    return 25;
  };

  const cropOptions = [
    { value: "all", label: t.allCrops, emoji: "📦" },
    { value: "Tomato", label: t.tomato, emoji: "🍅" },
    { value: "Onion", label: t.onion, emoji: "🧅" },
    { value: "Potato", label: t.potato, emoji: "🥔" },
    { value: "Grapes", label: t.grapes, emoji: "🍇" },
    { value: "Wheat", label: t.wheat, emoji: "🌾" },
  ];

  const currentCrop = cropOptions.find((c) => c.value === selectedProduct) || cropOptions[0];

  const filteredLots = lots.filter((lot) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      lot.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.farmerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProduct =
      selectedProduct === "all" ||
      lot.crop.toLowerCase().includes(selectedProduct.toLowerCase());

    const matchesGrade = selectedGrade === "all" || lot.qualityGrade === selectedGrade;

    return matchesSearch && matchesProduct && matchesGrade;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedProduct("all");
    setSelectedGrade("all");
    setIsProductDropdownOpen(false);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedProduct !== "all" ||
    selectedGrade !== "all";

  const handleOpenOrderModal = (lot: ProduceLot, defaultQty: number) => {
    setSelectedLot(lot);
    setOrderQuantity(Math.max(lot.minOrderQuantityKg || 10, defaultQty));
    setOrderSuccessId(null);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLot) return;

    // Apply bulk discount if > 100kg
    const isBulk = orderQuantity >= 100;
    const effectivePrice = isBulk ? selectedLot.askingPricePerKg * 0.92 : selectedLot.askingPricePerKg;
    const total = Math.round(orderQuantity * effectivePrice);

    const generatedOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    onPlaceOrder({
      lotId: selectedLot.id,
      crop: selectedLot.crop,
      farmerName: selectedLot.farmerName,
      quantityKg: orderQuantity,
      pricePerKg: Math.round(effectivePrice),
      totalAmount: total,
      orderType: isBulk ? "bulk" : "small",
      address: deliveryAddress,
    });

    setOrderSuccessId(generatedOrderId);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-sky-500/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold mb-2 border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.heroBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            {t.heroTitle}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100/80 mt-1 max-w-2xl">
            {t.heroSubtitle}
          </p>
        </div>

        <button
          onClick={() => onOpenAiAssistant(t.aiPrompt)}
          className="h-9 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm inline-flex items-center justify-center gap-2 transition-all self-start md:self-center shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.aiBtn}</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Bar */}
          <div className="relative lg:col-span-6 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="buyer-lot-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-hidden font-medium"
            />
          </div>

          {/* Product Filter Dropdown */}
          <div className="relative lg:col-span-3 w-full">
            <button
              type="button"
              id="buyer-filter-product-btn"
              onClick={() => setIsProductDropdownOpen((prev) => !prev)}
              className="w-full h-9 px-3 text-xs border border-slate-300 rounded-lg bg-slate-50 font-bold text-slate-800 hover:bg-slate-100 inline-flex items-center justify-between gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>{currentCrop.emoji}</span>
                <span className="text-slate-400 font-semibold">{t.filterByProduct}:</span>
                <span className="truncate">{currentCrop.label}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                  isProductDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProductDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsProductDropdownOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                  {cropOptions.map((opt) => {
                    const isSelected = selectedProduct === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        id={`buyer-crop-opt-${opt.value.toLowerCase()}`}
                        onClick={() => {
                          setSelectedProduct(opt.value);
                          setIsProductDropdownOpen(false);
                        }}
                        className={`w-full h-8 px-3 text-xs font-semibold inline-flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-sky-50 text-sky-900 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{opt.emoji}</span>
                          <span>{opt.label}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quality Grade Filter */}
          <div className="lg:col-span-3 w-full">
            <select
              id="buyer-filter-grade"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-slate-300 rounded-lg bg-slate-50 font-bold text-slate-800 outline-hidden cursor-pointer"
            >
              <option value="all">⭐ {t.filterByGrade}: {t.allGrades}</option>
              <option value="Grade A">✨ {t.gradeA}</option>
              <option value="Grade B">🔹 {t.gradeB}</option>
              <option value="Grade C">🔸 {t.gradeC}</option>
            </select>
          </div>
        </div>

        {/* Available count & Filter reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-600 font-medium">
            <strong className="text-slate-900">{filteredLots.length}</strong> {t.available}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              id="buyer-reset-filters-btn"
              onClick={handleResetFilters}
              className="h-7 text-xs font-bold text-sky-800 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 rounded-md transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* No Lots Found Empty State */}
      {filteredLots.length === 0 && (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3 shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">{t.noLotsFound}</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try choosing &quot;All Grades&quot; or &quot;All Products&quot; to discover fresh lots.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-8.5 px-4 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center justify-center"
          >
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Produce Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLots.map((lot) => {
          const lotDist = getLotDistance(lot);
          return (
            <div
              key={lot.id}
              id={`produce-lot-card-${lot.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={lot.image}
                    alt={lot.crop}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const lower = lot.crop.toLowerCase();
                      const fallback =
                        lower.includes("tomato") ? cropFallbackImages.tomato :
                        lower.includes("onion") ? cropFallbackImages.onion :
                        lower.includes("potato") ? cropFallbackImages.potato :
                        lower.includes("grape") ? cropFallbackImages.grapes :
                        lower.includes("wheat") ? cropFallbackImages.wheat :
                        cropFallbackImages.tomato;
                      if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                        (e.currentTarget as HTMLImageElement).src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 text-slate-900 shadow-xs backdrop-blur-xs border border-slate-200">
                      ⭐ {lot.qualityGrade}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-950/85 text-sky-200 shadow-xs backdrop-blur-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {lotDist} {t.kmAway}
                    </span>
                    {lot.organicCertified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-xs">
                        {t.organic}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLotForTrust(lot);
                      }}
                      id={`lot-quality-badge-${lot.id}`}
                      className="h-5.5 text-[10px] font-bold px-2 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs backdrop-blur-xs inline-flex items-center justify-center gap-1 cursor-pointer transition-colors border border-emerald-600/40"
                      title={t.inspectQualityAudit}
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-300" />
                      <span>{lot.trustMetrics?.confidenceScore ?? 98}% {t.lotQualityConfidence}</span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10">
                    {lot.availableKg.toLocaleString("en-IN")} kg {t.available}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {lot.crop}
                      </h3>
                      <p className="text-xs text-slate-500">{lot.variety}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 block">
                        ₹{lot.askingPricePerKg}
                        <span className="text-xs text-slate-400 font-normal"> / kg</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        {t.savingVsSupermarket}
                      </span>
                    </div>
                  </div>

                  {/* Farmer Info */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs mt-3 mb-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        👨‍🌾 {lot.farmerName}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.2 rounded">
                        ★ 4.9 (48 {t.ordersCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {lot.farmerLocation}
                      </span>
                      <span>{t.minOrder}: {lot.minOrderQuantityKg || 10} kg</span>
                    </div>
                  </div>

                  {/* Lot Quality & Farmer Trust Section */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t.lotQualityConfidence}: <strong className="text-emerald-700">{lot.trustMetrics?.confidenceScore ?? 98}%</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedLotForTrust(lot)}
                        id={`inspect-lot-audit-${lot.id}`}
                        className="text-[10px] font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                      >
                        {t.inspectQualityAudit}
                      </button>
                    </div>

                    {/* Micro-metrics row */}
                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-emerald-200/60 text-[10px] text-emerald-800 font-medium">
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-600">🎯</span>
                        <span>{lot.trustMetrics?.gradeAccuracyScore ?? 99}% {t.gradeAccuracy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-600">⚖️</span>
                        <span>{lot.trustMetrics?.weightAccuracyScore ?? 100}% {t.weightMatch}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-600">📜</span>
                        <span>{t.landVerified}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenOrderModal(lot, 25)}
                  id={`order-small-${lot.id}`}
                  className="h-9 px-3 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer active:scale-98"
                >
                  {t.buySmall}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenOrderModal(lot, 500)}
                  id={`order-bulk-${lot.id}`}
                  className="h-9 px-3 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors inline-flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                >
                  <span>{t.buyBulk}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Modal with Escrow Confirmation */}
      {selectedLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-sky-800 via-teal-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-sky-100 mt-0.5">
                  {selectedLot.crop} · {selectedLot.farmerName}
                </p>
              </div>
              <button
                onClick={() => setSelectedLot(null)}
                className="w-8 h-8 inline-flex items-center justify-center text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccessId ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {t.orderSuccessTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    <strong>
                      ₹
                      {Math.round(
                        orderQuantity *
                          (orderQuantity >= 100
                            ? selectedLot.askingPricePerKg * 0.92
                            : selectedLot.askingPricePerKg)
                      ).toLocaleString("en-IN")}
                    </strong>{" "}
                    {t.orderSuccessText}
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs font-bold">
                    {t.orderId} {orderSuccessId}
                  </span>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-xl text-xs text-emerald-800 text-left space-y-1 border border-emerald-200">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {t.buyerProtectionTitle}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {t.buyerProtectionDesc}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedLot(null)}
                  className="w-full h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center justify-center transition-colors"
                >
                  {t.viewOrders}
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.qtyLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="buyer-modal-qty-input"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Number(e.target.value))}
                      min={selectedLot.minOrderQuantityKg || 10}
                      max={selectedLot.availableKg}
                      step={5}
                      required
                      className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                    <span className="text-xs text-slate-500 font-bold">kg</span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-2">
                    <span className="text-[10px] text-slate-500 font-semibold">Quick presets:</span>
                    {[25, 100, 200, 500, 1000]
                      .filter((qty) => qty <= selectedLot.availableKg && qty >= (selectedLot.minOrderQuantityKg || 10))
                      .map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          id={`preset-qty-${qty}`}
                          onClick={() => setOrderQuantity(qty)}
                          className={`h-6.5 text-[11px] px-2.5 rounded-md font-bold transition-colors cursor-pointer inline-flex items-center justify-center ${
                            orderQuantity === qty
                              ? "bg-sky-700 text-white shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          }`}
                        >
                          {qty} kg
                        </button>
                      ))}
                  </div>

                  {orderQuantity >= 100 && (
                    <span className="text-[11px] text-emerald-600 font-bold block mt-1.5">
                      {t.bulkDiscountApplied} (₹{Math.round(selectedLot.askingPricePerKg * 0.92)}/kg)
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.addressLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-hidden"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.baseRate}</span>
                    <span>₹{selectedLot.askingPricePerKg} / kg</span>
                  </div>
                  {orderQuantity >= 100 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>{t.wholesaleDiscount}</span>
                      <span>- ₹{Math.round(selectedLot.askingPricePerKg * 0.08 * orderQuantity)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>{t.escrowFee}</span>
                    <span className="text-emerald-700 font-bold">{t.free}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>{t.totalPayable}</span>
                    <span className="text-sky-700">
                      ₹
                      {Math.round(
                        orderQuantity *
                          (orderQuantity >= 100
                            ? selectedLot.askingPricePerKg * 0.92
                            : selectedLot.askingPricePerKg)
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {t.escrowNote}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedLot(null)}
                    className="h-8.5 px-4 text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer inline-flex items-center justify-center"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    id="confirm-escrow-payment-btn"
                    className="h-8.5 px-5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t.payEscrow}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Lot Quality & Farmer Trust Audit Modal */}
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
