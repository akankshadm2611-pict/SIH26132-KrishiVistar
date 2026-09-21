import React, { useEffect, useState, Suspense } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Menu,
  ArrowLeft,
  CloudSun,
  TrendingUp,
  ArrowRightLeft,
  Package,
  Users,
  Truck,
  Warehouse,
  CreditCard,
  ShoppingBag,
  Star,
  Sparkles,
  CheckCircle2,
  Sprout,
  ShieldAlert,
  PhoneCall,
  LogOut,
} from "lucide-react";
import {
  ProduceLot,
  LotOffer,
  WeatherDay,
  TransactionOrder,
  UserRole,
  Language,
  FarmerTab,
  BuyerTab,
} from "../types";
import { translations } from "../translations";

// Farmer feature components
import { FarmerWeatherAdvisory } from "./farmer/FarmerWeatherAdvisory";
import { FarmerPriceTrend } from "./farmer/FarmerPriceTrend";
import { FarmerMarketCompare } from "./farmer/FarmerMarketCompare";
import { FarmerLotManagement } from "./farmer/FarmerLotManagement";
import { FarmerBuyerMatching } from "./farmer/FarmerBuyerMatching";
import { FarmerLogistics } from "./farmer/FarmerLogistics";
import { FarmerColdStorage } from "./farmer/FarmerColdStorage";
import { FarmerFinance } from "./farmer/FarmerFinance";
import { FarmerCalamityRefund } from "./farmer/FarmerCalamityRefund";
import { FarmerCattleKeepers } from "./farmer/FarmerCattleKeepers";
import { FarmerMarketIntelligence } from "./farmer/FarmerMarketIntelligence";

// Buyer feature components
import { BuyerMarketplace } from "./buyer/BuyerMarketplace";
import { BuyerFarmerSuggestions } from "./buyer/BuyerFarmerSuggestions";
import { BuyerMarketComparison } from "./buyer/BuyerMarketComparison";
import { BuyerFinanceTracking } from "./buyer/BuyerFinanceTracking";
import { BuyerPostDeliveryRatings } from "./buyer/BuyerPostDeliveryRatings";

interface FullScreenFeatureViewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSidebar: () => void;
  currentRole: UserRole;
  currentLang: Language;
  activeFarmerTab: FarmerTab;
  onSelectFarmerTab: (tab: FarmerTab) => void;
  activeBuyerTab: BuyerTab;
  onSelectBuyerTab: (tab: BuyerTab) => void;
  lots: ProduceLot[];
  offers: LotOffer[];
  weather: WeatherDay[];
  orders: TransactionOrder[];
  onCreateLot: (lot: Omit<ProduceLot, "id" | "status" | "offersCount">) => void;
  onAcceptOffer: (offerId: string, lotId: string) => void;
  onCounterOffer: (offerId: string, counterPrice: number) => void;
  onRejectOffer: (offerId: string) => void;
  onPlaceBuyerOrder: (order: {
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
  onLogout?: () => void;
}

export const FullScreenFeatureView: React.FC<FullScreenFeatureViewProps> = ({
  isOpen,
  onClose,
  onOpenSidebar,
  currentRole,
  currentLang,
  activeFarmerTab,
  onSelectFarmerTab,
  activeBuyerTab,
  onSelectBuyerTab,
  lots,
  offers,
  weather,
  orders,
  onCreateLot,
  onAcceptOffer,
  onCounterOffer,
  onRejectOffer,
  onPlaceBuyerOrder,
  onConfirmReceiptAndReleaseEscrow,
  onOpenAiAssistant,
  onLogout,
}) => {
  const [isBrowserFullScreen, setIsBrowserFullScreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[currentLang] || translations.en;

  // Handle ESC key to exit full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Monitor browser fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleBrowserFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
        setIsBrowserFullScreen(true);
      } else {
        document.exitFullscreen?.().catch(() => {});
        setIsBrowserFullScreen(false);
      }
    } catch {
      // Ignore if iframe does not permit native fullscreen
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (!isOpen) return null;

  // Metadata for current active feature
  const getFeatureMeta = () => {
    if (currentRole === "farmer") {
      switch (activeFarmerTab) {
        case "weather":
          return {
            title: t.weatherAlert,
            desc: t.weatherDesc,
            icon: CloudSun,
            color: "text-blue-500 bg-blue-500/10",
          };
        case "trends":
          return {
            title: t.priceTrend,
            desc: t.priceTrendDesc,
            icon: TrendingUp,
            color: "text-emerald-500 bg-emerald-500/10",
          };
        case "compare":
          return {
            title: t.marketCompare,
            desc: t.marketCompareDesc,
            icon: ArrowRightLeft,
            color: "text-indigo-500 bg-indigo-500/10",
          };
        case "lots":
          return {
            title: t.lotManagement,
            desc: t.lotManagementDesc,
            icon: Package,
            color: "text-amber-500 bg-amber-500/10",
          };
        case "matching":
          return {
            title: t.buyerMatching,
            desc: t.buyerMatchingDesc,
            icon: Users,
            color: "text-teal-500 bg-teal-500/10",
          };
        case "logistics":
          return {
            title: t.logistics,
            desc: t.logisticsDesc,
            icon: Truck,
            color: "text-violet-500 bg-violet-500/10",
          };
        case "storage":
          return {
            title: t.coldStorage,
            desc: t.coldStorageDesc,
            icon: Warehouse,
            color: "text-cyan-500 bg-cyan-500/10",
          };
        case "finance":
          return {
            title: t.finance,
            desc: t.financeDesc,
            icon: CreditCard,
            color: "text-emerald-400 bg-emerald-500/10",
          };
        case "calamity":
          return {
            title: t.calamityRefund,
            desc: t.calamityRefundDesc,
            icon: ShieldAlert,
            color: "text-teal-400 bg-teal-500/10",
          };
        case "cattle":
          return {
            title: t.cattleKeepers,
            desc: t.cattleKeepersDesc,
            icon: PhoneCall,
            color: "text-amber-500 bg-amber-500/10",
          };
        case "mandi":
          return {
            title: t.marketPrices,
            desc: t.mandiDesc,
            icon: TrendingUp,
            color: "text-orange-500 bg-orange-500/10",
          };
        default:
          return {
            title: t.overview,
            desc: t.overviewDesc,
            icon: Sparkles,
            color: "text-amber-400 bg-amber-500/10",
          };
      }
    } else {
      switch (activeBuyerTab) {
        case "marketplace":
          return {
            title: t.marketplace,
            desc: t.marketplaceDesc,
            icon: ShoppingBag,
            color: "text-emerald-500 bg-emerald-500/10",
          };
        case "nearby":
          return {
            title: t.nearbyFarmers,
            desc: t.nearbyFarmersDesc,
            icon: Users,
            color: "text-blue-500 bg-blue-500/10",
          };
        case "compare":
          return {
            title: t.marketCompare,
            desc: t.marketCompareDesc,
            icon: ArrowRightLeft,
            color: "text-indigo-500 bg-indigo-500/10",
          };
        case "finance":
          return {
            title: t.finance,
            desc: t.financeDesc,
            icon: CreditCard,
            color: "text-emerald-400 bg-emerald-500/10",
          };
        case "ratings":
          return {
            title: t.ratingsAndGrievances,
            desc: t.ratingsDesc,
            icon: Star,
            color: "text-amber-500 bg-amber-500/10",
          };
        default:
          return {
            title: t.marketplace,
            desc: t.marketplaceDesc,
            icon: ShoppingBag,
            color: "text-emerald-500 bg-emerald-500/10",
          };
      }
    }
  };

  const featureMeta = getFeatureMeta();
  const Icon = featureMeta.icon;

  return (
    <div
      id="fullscreen-feature-overlay"
      className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={featureMeta.title}
    >
      {/* In-app notification toast inside full screen */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-500">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="h-16 bg-slate-900 text-white border-b border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 shadow-sm z-10">
        {/* Left: Open Sidebar Button, KrishiVistar Brand & Feature Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Button to open sidebar on left */}
          <button
            type="button"
            onClick={onOpenSidebar}
            id="fullscreen-open-sidebar-btn"
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all flex items-center justify-center group shadow-xs cursor-pointer border border-slate-700 active:scale-95 shrink-0"
            title={
              currentLang === "mr"
                ? "मेनू / साइडबार उघडा"
                : currentLang === "hi"
                ? "मेनू / साइडबार खोलें"
                : "Open Sidebar"
            }
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
          </button>

          {/* KrishiVistar Brand Indicator with farmer green Vistar */}
          <div className="flex items-center gap-1.5 shrink-0 pr-2 sm:pr-3 border-r border-slate-700/80">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="text-base font-black tracking-tight font-display text-white hidden xs:inline">
              Krishi<span className="text-emerald-400">Vistar</span>
            </span>
          </div>

          {/* Active Feature Name & Icon */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${featureMeta.color} border border-white/10`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
                {featureMeta.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Return to Dashboard & Logout buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Greenish White Colored Option Button: Go to Dashboard */}
          <button
            onClick={onClose}
            id="go-to-dashboard-btn"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] hover:text-[#043d2e] font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98 border-2 border-[#86efac]"
            title={
              currentLang === "mr"
                ? "डॅशबोर्डवर जा"
                : currentLang === "hi"
                ? "डैशबोर्ड पर जाएं"
                : "Go to Dashboard"
            }
          >
            <ArrowLeft className="w-4 h-4 text-[#065f46]" />
            <span>
              {currentLang === "mr"
                ? "डॅशबोर्डवर जा"
                : currentLang === "hi"
                ? "डैशबोर्ड पर जाएं"
                : "Go to Dashboard"}
            </span>
          </button>

          {/* Red Colored Logout Option Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              id="fullscreen-logout-btn"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-102 border border-rose-500"
              title={
                currentLang === "mr"
                  ? "लॉग आउट"
                  : currentLang === "hi"
                  ? "लॉग आउट"
                  : "Logout"
              }
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>
                {currentLang === "mr"
                  ? "लॉग आउट"
                  : currentLang === "hi"
                  ? "लॉग आउट"
                  : "Logout"}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Main Full Screen Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/90">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <Suspense
            fallback={
              <div className="min-h-[420px] flex flex-col items-center justify-center p-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-700">
                  {currentLang === "mr" ? "सुविधा लोड होत आहे..." : currentLang === "hi" ? "सुविधा लोड हो रही है..." : "Loading full screen view..."}
                </p>
                <p className="text-xs text-slate-400 mt-1">{featureMeta.title}</p>
              </div>
            }
          >
            {/* Farmer Feature Components */}
            {currentRole === "farmer" && (
              <>
                {activeFarmerTab === "weather" && (
                  <FarmerWeatherAdvisory
                    weatherData={weather}
                    currentLang={currentLang}
                    onOpenAiAdvice={(q) => onOpenAiAssistant(q)}
                    onNavigateToStorage={() => onSelectFarmerTab("storage")}
                  />
                )}

                {activeFarmerTab === "trends" && (
                  <FarmerPriceTrend
                    currentLang={currentLang}
                    onOpenAiAssistant={(q) => onOpenAiAssistant(q)}
                    onNavigateToStorage={() => onSelectFarmerTab("storage")}
                  />
                )}

                {activeFarmerTab === "compare" && (
                  <FarmerMarketCompare
                    currentLang={currentLang}
                    onApplyRateToLot={() => onSelectFarmerTab("lots")}
                    onOpenLogistics={() => onSelectFarmerTab("logistics")}
                  />
                )}

                {activeFarmerTab === "lots" && (
                  <FarmerLotManagement
                    currentLang={currentLang}
                    lots={lots}
                    offers={offers}
                    onCreateLot={onCreateLot}
                    onAcceptOffer={onAcceptOffer}
                    onCounterOffer={onCounterOffer}
                    onRejectOffer={onRejectOffer}
                    onOpenLogistics={() => onSelectFarmerTab("logistics")}
                  />
                )}

                {activeFarmerTab === "matching" && (
                  <FarmerBuyerMatching
                    currentLang={currentLang}
                    onDirectOffer={(buyer) => {
                      showToast(
                        currentLang === "mr"
                          ? `शेतमाल लॉट #${buyer.id} खरेदीदार ${buyer.name} यांना पाठवला.`
                          : currentLang === "hi"
                          ? `फसल लॉट #${buyer.id} खरीदार ${buyer.name} को भेजा गया।`
                          : `Produce Lot forwarded to ${buyer.name}. Bids expected soon.`
                      );
                    }}
                  />
                )}

                {activeFarmerTab === "logistics" && <FarmerLogistics currentLang={currentLang} />}

                {activeFarmerTab === "storage" && (
                  <FarmerColdStorage
                    currentLang={currentLang}
                    onBackToDashboard={onClose}
                  />
                )}

                {activeFarmerTab === "finance" && <FarmerFinance orders={orders} currentLang={currentLang} />}

                {activeFarmerTab === "calamity" && (
                  <FarmerCalamityRefund currentLang={currentLang} orders={orders} />
                )}

                {activeFarmerTab === "cattle" && (
                  <FarmerCattleKeepers currentLang={currentLang} />
                )}

                {activeFarmerTab === "mandi" && (
                  <FarmerMarketIntelligence
                    currentLang={currentLang}
                    onOpenAiCompare={(crop) => {
                      onOpenAiAssistant(
                        currentLang === "mr"
                          ? `${crop} साठी विविध बाजार समित्यांमधील किमतीची तुलना करा`
                          : currentLang === "hi"
                          ? `${crop} के लिए विभिन्न मंडियों में भाव की तुलना करें`
                          : `Compare mandi prices for ${crop}`
                      );
                    }}
                  />
                )}

                {activeFarmerTab === "overview" && (
                  <div className="space-y-6">
                    <FarmerWeatherAdvisory
                      weatherData={weather}
                      currentLang={currentLang}
                      onOpenAiAdvice={(q) => onOpenAiAssistant(q)}
                      onNavigateToStorage={() => onSelectFarmerTab("storage")}
                    />
                    <FarmerPriceTrend
                      currentLang={currentLang}
                      onOpenAiAssistant={(q) => onOpenAiAssistant(q)}
                      onNavigateToStorage={() => onSelectFarmerTab("storage")}
                    />
                    <FarmerMarketCompare
                      currentLang={currentLang}
                      onApplyRateToLot={() => onSelectFarmerTab("lots")}
                      onOpenLogistics={() => onSelectFarmerTab("logistics")}
                    />
                    <FarmerLotManagement
                      currentLang={currentLang}
                      lots={lots}
                      offers={offers}
                      onCreateLot={onCreateLot}
                      onAcceptOffer={onAcceptOffer}
                      onCounterOffer={onCounterOffer}
                      onRejectOffer={onRejectOffer}
                      onOpenLogistics={() => onSelectFarmerTab("logistics")}
                    />
                  </div>
                )}
              </>
            )}

            {/* Buyer Feature Components */}
            {currentRole === "buyer" && (
              <>
                {activeBuyerTab === "marketplace" && (
                  <BuyerMarketplace
                    lots={lots}
                    onPlaceOrder={onPlaceBuyerOrder}
                    onOpenAiAssistant={(q) => onOpenAiAssistant(q)}
                    currentLang={currentLang}
                  />
                )}

                {activeBuyerTab === "nearby" && (
                  <BuyerFarmerSuggestions
                    onSelectFarmerProduce={() => onSelectBuyerTab("marketplace")}
                    onOpenAiAssistant={(q) => onOpenAiAssistant(q)}
                    currentLang={currentLang}
                  />
                )}

                {activeBuyerTab === "compare" && (
                  <BuyerMarketComparison
                    onGoToMarketplace={() => onSelectBuyerTab("marketplace")}
                    currentLang={currentLang}
                  />
                )}

                {activeBuyerTab === "finance" && (
                  <BuyerFinanceTracking
                    orders={orders}
                    onConfirmReceiptAndReleaseEscrow={onConfirmReceiptAndReleaseEscrow}
                    currentLang={currentLang}
                  />
                )}

                {activeBuyerTab === "ratings" && (
                  <BuyerPostDeliveryRatings orders={orders} currentLang={currentLang} />
                )}
              </>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};
