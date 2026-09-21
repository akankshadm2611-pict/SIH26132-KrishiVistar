import React, { useState, Suspense } from "react";
import {
  ShoppingBag,
  Users,
  ArrowRightLeft,
  CreditCard,
  Star,
  Bot,
  Maximize2,
  ArrowLeft,
  X,
} from "lucide-react";
import { ProduceLot, TransactionOrder, BuyerTab } from "../../types";
import { Language, translations } from "../../translations";

import { BuyerMarketplace } from "./BuyerMarketplace";
import { BuyerFarmerSuggestions } from "./BuyerFarmerSuggestions";
import { BuyerMarketComparison } from "./BuyerMarketComparison";
import { BuyerFinanceTracking } from "./BuyerFinanceTracking";
import { BuyerPostDeliveryRatings } from "./BuyerPostDeliveryRatings";
import buyerHandshakeBg from "../../assets/images/farmer_handshake_1789910039705.jpg";

export type { BuyerTab };

const tBuyerDash = {
  mr: {
    portalBadge: "खरेदीदार व ग्राहक पोर्टल",
    kpiFarmersLabel: "पडताळणीकृत स्थानिक शेतकरी",
    kpiFarmersVal: "१४ शेतकरी (२५ किमी)",
    kpiSavingsLabel: "किमतीत सरासरी बचत",
    kpiSavingsVal: "२८% थेट बचत",
    kpiEscrowLabel: "एस्क्रो सुरक्षित ऑर्डर्स",
    kpiEscrowActive: "सक्रिय",
    kpiQualityLabel: "गुणवत्ता खात्री",
    kpiQualityVal: "★ ४.९ (हमीसह)",
    loadingSection: "विभाग लोड होत आहे...",
  },
  hi: {
    portalBadge: "खरीदार एवं उपभोक्ता पोर्टल",
    kpiFarmersLabel: "सत्यापित स्थानीय किसान",
    kpiFarmersVal: "१४ किसान (२५ किमी)",
    kpiSavingsLabel: "औसत मूल्य बचत",
    kpiSavingsVal: "२८% सीधी बचत",
    kpiEscrowLabel: "एस्क्रो सुरक्षित ऑर्डर",
    kpiEscrowActive: "सक्रिय",
    kpiQualityLabel: "गुणवत्ता संतुष्टि",
    kpiQualityVal: "★ ४.९ (गारंटीकृत)",
    loadingSection: "अनुभाग लोड हो रहा है...",
  },
  en: {
    portalBadge: "Buyer & Household Portal",
    kpiFarmersLabel: "Verified Local Farmers",
    kpiFarmersVal: "14 Within 25 km",
    kpiSavingsLabel: "Average Price Saving",
    kpiSavingsVal: "28% vs Supermarket",
    kpiEscrowLabel: "Orders in Safe Escrow",
    kpiEscrowActive: "Active",
    kpiQualityLabel: "Quality Satisfaction",
    kpiQualityVal: "★ 4.9 (Guaranteed)",
    loadingSection: "Loading section...",
  },
};

interface BuyerDashboardProps {
  lots: ProduceLot[];
  orders: TransactionOrder[];
  currentLang?: Language;
  activeTab?: BuyerTab;
  onSelectTab?: (tab: BuyerTab) => void;
  onOpenSidebar?: () => void;
  onOpenFullScreen?: () => void;
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
  onConfirmReceiptAndReleaseEscrow: (orderId: string) => void;
  onOpenAiAssistant: (query?: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  lots,
  orders,
  currentLang = "en",
  activeTab: controlledActiveTab,
  onSelectTab,
  onOpenSidebar,
  onOpenFullScreen,
  onPlaceOrder,
  onConfirmReceiptAndReleaseEscrow,
  onOpenAiAssistant,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<BuyerTab>("marketplace");
  const t = translations[currentLang] || translations.en;
  const tDash = tBuyerDash[currentLang] || tBuyerDash.en;

  const activeTab = controlledActiveTab || internalActiveTab;
  const setActiveTab = (tab: BuyerTab) => {
    if (onSelectTab) onSelectTab(tab);
    setInternalActiveTab(tab);
  };

  const inEscrowOrdersCount = orders.filter((o) => o.paymentStatus === "In Escrow").length;

  const featureLabels: Record<BuyerTab, string> = {
    marketplace: t.marketplace,
    nearby: t.nearbyFarmers,
    compare: t.marketCompare,
    finance: t.finance,
    ratings: t.ratingsAndGrievances,
  };

  const currentFeatureLabel = featureLabels[activeTab] || t.marketplace;

  return (
    <div className="space-y-6">
      {/* Welcome Banner for Buyer with Farmer Handshake Background Image */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-700/60 relative overflow-hidden group">
        {/* Background Image: Farmer and Buyer handshake over sunlit agricultural fields */}
        <img
          src={buyerHandshakeBg}
          alt="Direct farmer and buyer partnership handshake at sunset"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Atmospheric Gradient Overlays: Retains warm golden sunset & handshake while guaranteeing 100% crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/70 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/25 pointer-events-none z-0" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-sky-400/50 text-sky-200 text-xs font-bold mb-2.5 shadow-xs backdrop-blur-[2px]">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{tDash.portalBadge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.welcomeBuyer}
            </h1>
            <p className="text-slate-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {t.buyerSubText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Action button if needed */}
          </div>
        </div>

        {/* Buyer Transparent Small KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/20 text-xs relative z-10">
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-3.5 sm:p-4 rounded-xl border border-white/20 hover:border-white/35 transition-all shadow-md">
            <span className="text-slate-200 text-[11px] font-bold block drop-shadow-sm">
              {tDash.kpiFarmersLabel}
            </span>
            <span className="text-base sm:text-lg font-black text-white mt-1 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {tDash.kpiFarmersVal}
            </span>
          </div>
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-3.5 sm:p-4 rounded-xl border border-white/20 hover:border-white/35 transition-all shadow-md">
            <span className="text-slate-200 text-[11px] font-bold block drop-shadow-sm">
              {tDash.kpiSavingsLabel}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400 mt-1 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {tDash.kpiSavingsVal}
            </span>
          </div>
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-3.5 sm:p-4 rounded-xl border border-white/20 hover:border-white/35 transition-all shadow-md">
            <span className="text-slate-200 text-[11px] font-bold block drop-shadow-sm">
              {tDash.kpiEscrowLabel}
            </span>
            <span className="text-base sm:text-lg font-black text-sky-300 mt-1 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {inEscrowOrdersCount} {tDash.kpiEscrowActive}
            </span>
          </div>
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-3.5 sm:p-4 rounded-xl border border-white/20 hover:border-white/35 transition-all shadow-md">
            <span className="text-slate-200 text-[11px] font-bold block drop-shadow-sm">
              {tDash.kpiQualityLabel}
            </span>
            <span className="text-base sm:text-lg font-black text-white mt-1 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {tDash.kpiQualityVal}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation & Feature Header Bar */}
      {activeTab === "marketplace" && (
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  {t.activeFeature}:
                </span>
                <span className="text-sm sm:text-base font-extrabold text-sky-950">
                  {currentFeatureLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t.sidebarNotice}
              </p>
            </div>
          </div>

          {/* Direct quick action buttons */}
          <div className="flex items-center gap-2">
            {onOpenFullScreen && (
              <button
                onClick={onOpenFullScreen}
                id="buyer-dashboard-fullscreen-btn"
                className="h-8 px-3 rounded-lg text-xs font-bold text-sky-900 bg-sky-100 hover:bg-sky-200 border border-sky-300 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                title={t.fullScreen}
              >
                <Maximize2 className="w-3.5 h-3.5 text-sky-700" />
                <span>{t.fullScreen}</span>
              </button>
            )}

            <button
              onClick={onOpenSidebar}
              id="browse-buyer-features-link"
              className="h-8 px-3 rounded-lg text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{t.featuresTitle}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Contents with Suspense */}
      <Suspense
        fallback={
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="w-7 h-7 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">{tDash.loadingSection}</p>
          </div>
        }
      >
        {activeTab === "marketplace" && (
          <BuyerMarketplace
            lots={lots}
            onPlaceOrder={onPlaceOrder}
            onOpenAiAssistant={(prompt) => onOpenAiAssistant(prompt)}
            currentLang={currentLang}
          />
        )}

        {activeTab === "nearby" && (
          <BuyerFarmerSuggestions
            onSelectFarmerProduce={() => {
              setActiveTab("marketplace");
            }}
            onOpenAiAssistant={(prompt) => onOpenAiAssistant(prompt)}
            currentLang={currentLang}
          />
        )}

        {activeTab === "compare" && (
          <BuyerMarketComparison
            onGoToMarketplace={() => setActiveTab("marketplace")}
            currentLang={currentLang}
          />
        )}

        {activeTab === "finance" && (
          <BuyerFinanceTracking
            orders={orders}
            onConfirmReceiptAndReleaseEscrow={onConfirmReceiptAndReleaseEscrow}
            currentLang={currentLang}
          />
        )}

        {activeTab === "ratings" && (
          <BuyerPostDeliveryRatings orders={orders} currentLang={currentLang} />
        )}
      </Suspense>
    </div>
  );
};
