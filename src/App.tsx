/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense } from "react";
import {
  UserRole,
  Language,
  ProduceLot,
  LotOffer,
  TransactionOrder,
  RegisteredAccount,
  FarmerTab,
  BuyerTab,
} from "./types";
import {
  initialLots,
  initialOffers,
  initialWeatherData,
  initialOrders,
} from "./mockData";
import { Navbar } from "./components/Navbar";
import { KrishiVistarLoginPage } from "./components/KrishiVistarLoginPage";
import { SidebarDrawer } from "./components/SidebarDrawer";
import { translations } from "./translations";
import { Sprout, ShieldCheck, ArrowUp } from "lucide-react";
import { FarmerDashboard } from "./components/farmer/FarmerDashboard";
import { BuyerDashboard } from "./components/buyer/BuyerDashboard";
import { FullScreenFeatureView } from "./components/FullScreenFeatureView";

const BeginnerGuideModal = React.lazy(() =>
  import("./components/BeginnerGuideModal").then((m) => ({ default: m.BeginnerGuideModal }))
);
const AiAssistantDrawer = React.lazy(() =>
  import("./components/AiAssistantDrawer").then((m) => ({ default: m.AiAssistantDrawer }))
);

export default function App() {
  const [viewMode, setViewMode] = useState<"login" | "dashboard">("login");
  const [currentRole, setCurrentRole] = useState<UserRole>("farmer");
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [activeFarmerTab, setActiveFarmerTab] = useState<FarmerTab>("lots");
  const [activeBuyerTab, setActiveBuyerTab] = useState<BuyerTab>("marketplace");
  const [currentUser, setCurrentUser] = useState<RegisteredAccount | undefined>(undefined);

  const t = translations[currentLang] || translations.en;

  // App Data State
  const [lots, setLots] = useState<ProduceLot[]>(initialLots);
  const [offers, setOffers] = useState<LotOffer[]>(initialOffers);
  const [weather, setWeather] = useState(initialWeatherData);
  const [orders, setOrders] = useState<TransactionOrder[]>(initialOrders);

  // Modals & Drawers
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantQuery, setAiAssistantQuery] = useState<string | undefined>(undefined);
  const [showGlobalScrollTop, setShowGlobalScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowGlobalScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Farmer Actions
  const handleCreateLot = (newLotData: Omit<ProduceLot, "id" | "status" | "offersCount">) => {
    const newLot: ProduceLot = {
      ...newLotData,
      id: "lot-" + Math.floor(1000 + Math.random() * 9000),
      status: "Available",
      offersCount: 0,
    };
    setLots([newLot, ...lots]);
  };

  const handleAcceptOffer = (offerId: string, lotId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "Accepted" } : o))
    );

    const targetOffer = offers.find((o) => o.id === offerId);
    const targetLot = lots.find((l) => l.id === lotId);

    if (targetOffer && targetLot) {
      // Create new transaction in escrow
      const newOrder: TransactionOrder = {
        id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
        lotId: targetLot.id,
        farmerId: targetLot.farmerId,
        farmerName: targetLot.farmerName,
        buyerId: targetOffer.buyerId,
        buyerName: targetOffer.buyerName,
        crop: targetLot.crop,
        variety: targetLot.variety,
        quantityKg: targetOffer.quantityRequestedKg,
        pricePerKg: targetOffer.offeredPricePerKg,
        totalAmount: targetOffer.totalValue,
        orderType: "Bulk Order",
        orderStatus: "Confirmed",
        paymentStatus: "In Escrow",
        deliveryAddress: "Buyer Central Distribution Hub, Pune/Mumbai",
        createdAt: "Today",
        escrowLockedDate: "Today",
        qualityGrade: targetLot.qualityGrade,
      };

      setOrders((prev) => [newOrder, ...prev]);

      // Deduct quantity from lot
      setLots((prev) =>
        prev.map((l) => {
          if (l.id === lotId) {
            const rem = Math.max(0, l.availableKg - targetOffer.quantityRequestedKg);
            return {
              ...l,
              availableKg: rem,
              status: rem === 0 ? "Sold" : "Partially Sold",
            };
          }
          return l;
        })
      );
    }
  };

  const handleCounterOffer = (offerId: string, counterPrice: number) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              status: "Countered",
              notes: `Farmer sent counter offer at ₹${counterPrice}/kg`,
            }
          : o
      )
    );
  };

  const handleRejectOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "Rejected" } : o))
    );
  };

  // Buyer Actions
  const handlePlaceBuyerOrder = (orderData: {
    lotId: string;
    crop: string;
    farmerName: string;
    quantityKg: number;
    pricePerKg: number;
    totalAmount: number;
    orderType: "small" | "bulk";
    address: string;
  }) => {
    const newOrder: TransactionOrder = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      lotId: orderData.lotId,
      farmerId: "f-01",
      farmerName: orderData.farmerName,
      buyerId: "b-01",
      buyerName: "Anita Sharma (You)",
      crop: orderData.crop,
      variety: "Farm Fresh Direct",
      quantityKg: orderData.quantityKg,
      pricePerKg: orderData.pricePerKg,
      totalAmount: orderData.totalAmount,
      orderType: orderData.orderType === "bulk" ? "Bulk Order" : "Small Quantity",
      orderStatus: "In Transit",
      paymentStatus: "In Escrow",
      deliveryAddress: orderData.address,
      createdAt: "Today",
      escrowLockedDate: "Today",
      qualityGrade: "Grade A",
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update lot inventory
    setLots((prev) =>
      prev.map((l) => {
        if (l.id === orderData.lotId) {
          const rem = Math.max(0, l.availableKg - orderData.quantityKg);
          return {
            ...l,
            availableKg: rem,
            status: rem === 0 ? "Sold" : "Partially Sold",
          };
        }
        return l;
      })
    );
  };

  const handleConfirmReceiptAndReleaseEscrow = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            paymentStatus: "Paid",
            orderStatus: "Delivered",
            paymentReleasedDate: "Today",
          };
        }
        return o;
      })
    );
  };

  const handleOpenAiAssistantWithQuery = (prompt?: string) => {
    setAiAssistantQuery(prompt);
    setIsAiAssistantOpen(true);
  };

  const handleLoginFromPage = (role: UserRole, userAccount?: RegisteredAccount) => {
    setCurrentRole(role);
    setCurrentUser(userAccount);
    setViewMode("dashboard");
  };

  const handleReturnToLogin = () => {
    setViewMode("login");
  };

  // If user is on the Login Display view, show the full KrishiVistar Login Display Page
  if (viewMode === "login") {
    return (
      <KrishiVistarLoginPage
        onLogin={handleLoginFromPage}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
    );
  }

  const activeFeatureName =
    currentRole === "farmer"
      ? activeFarmerTab === "overview"
        ? t.overview
        : activeFarmerTab === "weather"
        ? t.weatherAlert
        : activeFarmerTab === "trends"
        ? t.priceTrend
        : activeFarmerTab === "compare"
        ? t.marketCompare
        : activeFarmerTab === "lots"
        ? t.lotManagement
        : activeFarmerTab === "matching"
        ? t.buyerMatching
        : activeFarmerTab === "logistics"
        ? t.logistics
        : activeFarmerTab === "storage"
        ? t.coldStorage
        : activeFarmerTab === "finance"
        ? t.finance
        : activeFarmerTab === "calamity"
        ? t.calamityRefund
        : activeFarmerTab === "cattle"
        ? t.cattleKeepers
        : t.marketPrices
      : activeBuyerTab === "marketplace"
      ? t.marketplace
      : activeBuyerTab === "nearby"
      ? t.nearbyFarmers
      : activeBuyerTab === "compare"
      ? t.marketCompare
      : activeBuyerTab === "finance"
      ? t.finance
      : t.ratingsAndGrievances;

  // Return directly to the initial dashboard state (Produce Lots for farmer, Marketplace for buyer)
  const handleReturnToMainDashboard = () => {
    setIsFullScreenOpen(false);
    setActiveFarmerTab("lots");
    setActiveBuyerTab("marketplace");
  };

  // Open clicked feature in full screen mode from sidebar, or show main dashboard if produce lots selected
  const handleSelectFarmerTabFromSidebar = (tab: FarmerTab) => {
    setActiveFarmerTab(tab);
    if (tab === "lots" || tab === "overview") {
      setIsFullScreenOpen(false);
    } else {
      setIsFullScreenOpen(true);
    }
  };

  const handleSelectBuyerTabFromSidebar = (tab: BuyerTab) => {
    setActiveBuyerTab(tab);
    if (tab === "marketplace") {
      setIsFullScreenOpen(false);
    } else {
      setIsFullScreenOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Smooth Sliding Sidebar with Three Dash (☰) Controls */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentRole={currentRole}
        onSwitchRole={(role) => setCurrentRole(role)}
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        activeFarmerTab={activeFarmerTab}
        onSelectFarmerTab={handleSelectFarmerTabFromSidebar}
        activeBuyerTab={activeBuyerTab}
        onSelectBuyerTab={handleSelectBuyerTabFromSidebar}
        onOpenFullScreen={() => setIsFullScreenOpen(true)}
        onOpenAiAssistant={() => handleOpenAiAssistantWithQuery()}
        onReturnToLogin={handleReturnToLogin}
        pendingBidsCount={offers.filter((o) => o.status === "Pending").length}
        inEscrowOrdersCount={orders.filter((o) => o.paymentStatus === "In Escrow").length}
      />

      {/* Top Navigation with Three Dash Menu (☰) and KrishiVistar branding */}
      <Navbar
        currentRole={currentRole}
        currentUser={currentUser}
        onRoleChange={(role) => setCurrentRole(role)}
        currentLang={currentLang}
        onLangChange={(lang) => setCurrentLang(lang)}
        onOpenAiAssistant={() => handleOpenAiAssistantWithQuery()}
        onOpenLoginPage={handleReturnToLogin}
        onLogout={handleReturnToLogin}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        activeFeatureName={activeFeatureName}
        onGoToDashboard={handleReturnToMainDashboard}
        orders={orders}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense
          fallback={
            <div className="min-h-[420px] flex flex-col items-center justify-center p-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-bold text-slate-700">
                {t.portalLoading}
              </p>
              <p className="text-xs text-slate-400 mt-1">{t.connectingMandiData}</p>
            </div>
          }
        >
          {currentRole === "farmer" ? (
            <FarmerDashboard
              lots={lots}
              offers={offers}
              weather={weather}
              orders={orders}
              currentLang={currentLang}
              activeTab={activeFarmerTab}
              onSelectTab={setActiveFarmerTab}
              onOpenSidebar={() => setIsSidebarOpen(true)}
              onOpenFullScreen={() => setIsFullScreenOpen(true)}
              onCreateLot={handleCreateLot}
              onAcceptOffer={handleAcceptOffer}
              onCounterOffer={handleCounterOffer}
              onRejectOffer={handleRejectOffer}
              onOpenAiAssistant={handleOpenAiAssistantWithQuery}
            />
          ) : (
            <BuyerDashboard
              lots={lots}
              orders={orders}
              currentLang={currentLang}
              activeTab={activeBuyerTab}
              onSelectTab={setActiveBuyerTab}
              onOpenSidebar={() => setIsSidebarOpen(true)}
              onOpenFullScreen={() => setIsFullScreenOpen(true)}
              onPlaceOrder={handlePlaceBuyerOrder}
              onConfirmReceiptAndReleaseEscrow={handleConfirmReceiptAndReleaseEscrow}
              onOpenAiAssistant={handleOpenAiAssistantWithQuery}
            />
          )}
        </Suspense>
      </main>

      {/* Full Screen View for Selected Features */}
      {isFullScreenOpen && (
        <Suspense fallback={null}>
          <FullScreenFeatureView
            isOpen={isFullScreenOpen}
            onClose={handleReturnToMainDashboard}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            currentRole={currentRole}
            currentLang={currentLang}
            activeFarmerTab={activeFarmerTab}
            onSelectFarmerTab={(tab) => {
              setActiveFarmerTab(tab);
            }}
            activeBuyerTab={activeBuyerTab}
            onSelectBuyerTab={(tab) => {
              setActiveBuyerTab(tab);
            }}
            lots={lots}
            offers={offers}
            weather={weather}
            orders={orders}
            onCreateLot={handleCreateLot}
            onAcceptOffer={handleAcceptOffer}
            onCounterOffer={handleCounterOffer}
            onRejectOffer={handleRejectOffer}
            onPlaceBuyerOrder={handlePlaceBuyerOrder}
            onConfirmReceiptAndReleaseEscrow={handleConfirmReceiptAndReleaseEscrow}
            onOpenAiAssistant={handleOpenAiAssistantWithQuery}
            onLogout={handleReturnToLogin}
          />
        </Suspense>
      )}

      {/* Modals & Drawers: Only mounted when requested to conserve CPU & memory */}
      {isGuideModalOpen && (
        <Suspense fallback={null}>
          <BeginnerGuideModal
            isOpen={isGuideModalOpen}
            onClose={() => setIsGuideModalOpen(false)}
            currentRole={currentRole}
            onSwitchRole={(role) => setCurrentRole(role)}
            currentLang={currentLang}
          />
        </Suspense>
      )}

      {isAiAssistantOpen && (
        <Suspense fallback={null}>
          <AiAssistantDrawer
            isOpen={isAiAssistantOpen}
            onClose={() => {
              setIsAiAssistantOpen(false);
              setAiAssistantQuery(undefined);
            }}
            currentRole={currentRole}
            cropContext="Tomato, Onion & Vegetable Harvests in Nashik & Pune"
            currentLang={currentLang}
            initialQuery={aiAssistantQuery}
            onNavigateToFeature={(tabId, role) => {
              const targetRole = currentRole === "buyer" ? "buyer" : (role || currentRole);
              if (targetRole !== currentRole) {
                setCurrentRole(targetRole);
              }
              if (targetRole === "buyer") {
                setActiveBuyerTab(tabId as BuyerTab);
                if (tabId === "marketplace") {
                  setIsFullScreenOpen(false);
                } else {
                  setIsFullScreenOpen(true);
                }
              } else {
                setActiveFarmerTab(tabId as FarmerTab);
                if (tabId === "lots") {
                  setIsFullScreenOpen(false);
                } else {
                  setIsFullScreenOpen(true);
                }
              }
              setIsAiAssistantOpen(false);
              setAiAssistantQuery(undefined);
              window.scrollTo({ top: 100, behavior: "smooth" });
            }}
          />
        </Suspense>
      )}

      {/* Global Floating Back to Top Button */}
      {showGlobalScrollTop && (
        <button
          type="button"
          id="global-back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer border border-emerald-600"
          title={currentLang === "mr" ? "वर जा" : currentLang === "hi" ? "ऊपर जाएं" : "Back to top"}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
