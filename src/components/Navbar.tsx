import React, { useState } from "react";
import {
  Sprout,
  ShoppingBag,
  HelpCircle,
  Bell,
  ChevronDown,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Menu,
  LogOut,
} from "lucide-react";
import { UserRole, RegisteredAccount, TransactionOrder } from "../types";
import { Language, translations } from "../translations";

export interface NavbarProps {
  currentRole: UserRole;
  currentUser?: RegisteredAccount;
  orders?: TransactionOrder[];
  onSwitchRole?: (role: UserRole) => void;
  onRoleChange?: (role: UserRole) => void;
  language?: Language;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onLangChange?: (lang: Language) => void;
  onOpenGuide?: () => void;
  onOpenGuideModal?: () => void;
  onOpenAiAssistant?: () => void;
  onOpenAuthModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenLoginPage?: () => void;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
  activeFeatureName?: string;
  notificationCount?: number;
  onGoToDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentUser,
  orders = [],
  onSwitchRole,
  onRoleChange,
  language,
  currentLang,
  onLanguageChange,
  onLangChange,
  onOpenGuide,
  onOpenGuideModal,
  onOpenAiAssistant,
  onOpenAuthModal,
  onOpenLoginModal,
  onOpenLoginPage,
  onLogout,
  onToggleSidebar,
  activeFeatureName,
  notificationCount = 3,
  onGoToDashboard,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const activeLang: Language = currentLang || language || "en";
  const t = translations[activeLang] || translations.en;

  // Filter orders where farmer has accepted the order proposed by the buyer
  const buyerAcceptedOrders = (orders || []).filter(
    (o) =>
      o.orderStatus === "Confirmed" ||
      o.orderStatus === "In Transit" ||
      o.orderStatus === "Delivered" ||
      o.paymentStatus === "In Escrow" ||
      o.paymentStatus === "Paid"
  );

  const effectiveNotificationCount =
    currentRole === "buyer"
      ? Math.max(1, buyerAcceptedOrders.length)
      : notificationCount;

  const handleRoleSwitch = (role: UserRole) => {
    if (onRoleChange) onRoleChange(role);
    if (onSwitchRole) onSwitchRole(role);
  };

  const handleLangSelect = (lang: Language) => {
    if (onLangChange) onLangChange(lang);
    if (onLanguageChange) onLanguageChange(lang);
    setShowLangMenu(false);
  };

  const handleGuideClick = () => {
    if (onOpenGuideModal) onOpenGuideModal();
    else if (onOpenGuide) onOpenGuide();
  };

  const handleAuthClick = () => {
    if (onOpenLoginPage) onOpenLoginPage();
    else if (onLogout) onLogout();
    else if (onOpenLoginModal) onOpenLoginModal();
    else if (onOpenAuthModal) onOpenAuthModal();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Three Dash Menu Button (☰) & Official Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* The Three Dash Button - Sober Official Navy */}
            <button
              onClick={onToggleSidebar}
              id="navbar-three-dash-btn"
              className="h-8.5 w-8.5 rounded-lg bg-[#0f2d4a] hover:bg-[#16436e] text-white font-bold transition-all inline-flex items-center justify-center group shadow-xs cursor-pointer border border-[#081e33]"
              title={t.threeDashHint}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>

            {/* Logo - Dignified Official Seal - Click returns to main dashboard */}
            <button
              onClick={onGoToDashboard}
              id="navbar-brand-logo-btn"
              className="flex items-center gap-2.5 text-left group cursor-pointer active:scale-98 transition-transform"
              title={activeLang === "mr" ? "मुख्य डॅशबोर्डवर जा" : activeLang === "hi" ? "मुख्य डैशबोर्ड पर जाएं" : "Return to Main Dashboard"}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0f2d4a] group-hover:bg-[#16436e] text-white flex items-center justify-center font-bold border border-[#081e33] shadow-xs transition-colors">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-[#0f2d4a] group-hover:text-emerald-800 font-sans transition-colors">
                    KrishiVistar
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Beginner Guide / How it Works */}
            <button
              onClick={handleGuideClick}
              id="beginner-guide-btn"
              className="h-8.5 hidden sm:inline-flex items-center justify-center gap-1.5 px-3 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Beginner Walkthrough Guide"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden md:inline font-bold">{t.howItWorks}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                id="language-selector-btn"
                className="h-8.5 inline-flex items-center justify-center gap-1.5 px-2.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="uppercase font-bold tracking-wide">{activeLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs font-medium">
                  <button
                    onClick={() => handleLangSelect("en")}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                      activeLang === "en" ? "text-emerald-800 font-bold bg-emerald-50" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold"
                    }`}
                  >
                    <span>English</span>
                    {activeLang === "en" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                  <button
                    onClick={() => handleLangSelect("hi")}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                      activeLang === "hi" ? "text-emerald-800 font-bold bg-emerald-50" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold"
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {activeLang === "hi" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                  <button
                    onClick={() => handleLangSelect("mr")}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                      activeLang === "mr" ? "text-emerald-800 font-bold bg-emerald-50" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold"
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {activeLang === "mr" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                id="notifications-bell-btn"
                className="h-8.5 w-8.5 relative inline-flex items-center justify-center text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                {effectiveNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-84 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {currentRole === "buyer"
                        ? activeLang === "mr"
                          ? "ऑर्डर स्वीकृती सूचना"
                          : activeLang === "hi"
                          ? "ऑर्डर स्वीकृति सूचनाएं"
                          : "Order Acceptance Notifications"
                        : activeLang === "mr"
                        ? "सूचना व अलर्ट"
                        : activeLang === "hi"
                        ? "सूचनाएं एवं अलर्ट"
                        : "Alerts & Notifications"}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </div>

                  {/* Buyer Portal: strictly only notifications if farmer accepted order proposed by buyer */}
                  {currentRole === "buyer" ? (
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {buyerAcceptedOrders.length > 0 ? (
                        buyerAcceptedOrders.map((order) => (
                          <div key={order.id} className="p-3 text-xs hover:bg-emerald-50/40 transition-colors">
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div className="w-full">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="font-bold text-slate-800">
                                    {activeLang === "mr"
                                      ? "शेतकऱ्याने ऑर्डर प्रस्ताव स्वीकारला"
                                      : activeLang === "hi"
                                      ? "किसान ने ऑर्डर प्रस्ताव स्वीकार किया"
                                      : "Farmer Accepted Your Proposed Order"}
                                  </p>
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                                    {order.id}
                                  </span>
                                </div>
                                <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                                  {activeLang === "mr"
                                    ? `शेतकरी ${order.farmerName || order.sellerName || "रमेश पाटील"} यांनी तुमच्या ${order.crop} (${order.quantityKg} किलो @ ₹${order.pricePerKg}/किलो) च्या ऑर्डर प्रस्तावाला स्वीकृती दिली आहे. शेतमाल काढणी करून पाठवणीसाठी तयार करण्यात येत आहे.`
                                    : activeLang === "hi"
                                    ? `किसान ${order.farmerName || order.sellerName || "रमेश पाटिल"} ने आपके ${order.crop} (${order.quantityKg} किग्रा @ ₹${order.pricePerKg}/किग्रा) के ऑर्डर प्रस्ताव को स्वीकार कर लिया है। उत्पाद प्रेषण हेतु तैयार किया जा रहा है।`
                                    : `Farmer ${order.farmerName || order.sellerName || "Ramesh Patil"} accepted your proposed order for ${order.crop} (${order.quantityKg} kg @ ₹${order.pricePerKg}/kg). Farm produce is scheduled for dispatch.`}
                                </p>
                                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-100/80">
                                  <span>{order.createdAt || order.orderDate || (activeLang === "mr" ? "१० मिनिटांपूर्वी" : activeLang === "hi" ? "१० मिनट पहले" : "10 mins ago")}</span>
                                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                                    {activeLang === "mr" ? "सुरक्षित एस्क्रोमध्ये लॉक" : activeLang === "hi" ? "सुरक्षित एस्क्रो में लॉक" : "Escrow Locked"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-xs hover:bg-emerald-50/40 transition-colors">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="w-full">
                              <div className="flex items-center justify-between gap-1">
                                <p className="font-bold text-slate-800">
                                  {activeLang === "mr"
                                    ? "शेतकऱ्याने ऑर्डर प्रस्ताव स्वीकारला"
                                    : activeLang === "hi"
                                    ? "किसान ने ऑर्डर प्रस्ताव स्वीकार किया"
                                    : "Farmer Accepted Your Proposed Order"}
                                </p>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                                  ORD-9842
                                </span>
                              </div>
                              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                                {activeLang === "mr"
                                  ? "शेतकरी रमेश पाटील यांनी तुमच्या टोमॅटो (१८०० किलो @ ₹३३/किलो) च्या ऑर्डर प्रस्तावाला स्वीकृती दिली आहे. शेतमाल काढणी करून पाठवणीसाठी तयार करण्यात येत आहे."
                                  : activeLang === "hi"
                                  ? "किसान रमेश पाटिल ने आपके टमाटर (१८०० किग्रा @ ₹३३/किग्रा) के ऑर्डर प्रस्ताव को स्वीकार कर लिया है। उत्पाद प्रेषण हेतु तैयार किया जा रहा है।"
                                  : "Farmer Ramesh Patil accepted your proposed order for Tomato (1800 kg @ ₹33/kg). Farm produce is scheduled for dispatch."}
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-100/80">
                                <span>{activeLang === "mr" ? "१० मिनिटांपूर्वी" : activeLang === "hi" ? "१० मिनट पहले" : "10 mins ago"}</span>
                                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                                  {activeLang === "mr" ? "सुरक्षित एस्क्रोमध्ये लॉक" : activeLang === "hi" ? "सुरक्षित एस्क्रो में लॉक" : "Escrow Locked"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Farmer Portal: weather alerts and received bids */
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {activeLang === "mr"
                                ? "हवामान इशारा"
                                : activeLang === "hi"
                                ? "मौसम चेतावनी"
                                : "Weather Warning"}
                            </p>
                            <p className="text-slate-600 text-[11px] mt-0.5">
                              {activeLang === "mr"
                                ? "पुढील ४८ तासांत मुसळधार पावसाचा इशारा. तयार शेतमाल लवकर काढा!"
                                : activeLang === "hi"
                                ? "अगले ४८ घंटों में भारी बारिश की संभावना। पकी फसल तुरंत निकालें!"
                                : "Heavy rain forecasted in 48 hours for Nashik district. Pluck ripe crops early!"}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {activeLang === "mr" ? "१५ मिनिटांपूर्वी" : activeLang === "hi" ? "१५ मिनट पहले" : "15 mins ago"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {activeLang === "mr"
                                ? "नवीन बोली प्राप्त"
                                : activeLang === "hi"
                                ? "नई बोली प्राप्त"
                                : "New Offer Received"}
                            </p>
                            <p className="text-slate-600 text-[11px] mt-0.5">
                              {activeLang === "mr"
                                ? "मेट्रो फ्रेशने टोमॅटो लॉट #१०२५ साठी ₹३४/किलो बोली दिली आहे."
                                : activeLang === "hi"
                                ? "मेट्रो फ्रेश ने टमाटर लॉट #१०२५ के लिए ₹३४/किग्रा की बोली दी है।"
                                : "Metro Fresh offered ₹34/kg for your Grade A Tomato Lot #1025."}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {activeLang === "mr" ? "३० मिनिटांपूर्वी" : activeLang === "hi" ? "३० मिनट पहले" : "30 mins ago"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 text-xs hover:bg-amber-50/60 transition-colors">
                        <div className="flex items-start gap-2">
                          <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <p className="font-semibold text-slate-800">
                                {activeLang === "mr"
                                  ? "नवीन शीतगृह अर्ज प्रतीक्षेत"
                                  : activeLang === "hi"
                                  ? "नया कोल्ड स्टोरेज आवेदन"
                                  : "Cold Storage Request"}
                              </p>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                                25 MT
                              </span>
                            </div>
                            <p className="text-slate-600 text-[11px] mt-0.5">
                              {activeLang === "mr"
                                ? "रमेश बाळू देशमुख यांनी नाशिक लाल कांदा साठी २५ MT जागेचा अर्ज केला आहे."
                                : activeLang === "hi"
                                ? "रमेश बालू देशमुख ने नासिक लाल प्याज हेतु 25 MT जगह का आवेदन किया है।"
                                : "Ramesh Balu Deshmukh requested 25 MT space for Nashik Red Onion."}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {activeLang === "mr" ? "४५ मिनिटांपूर्वी" : activeLang === "hi" ? "४५ मिनट पहले" : "45 mins ago"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logout Button - High-visibility Crisp Rose */}
            <button
              onClick={onLogout}
              id="navbar-logout-btn"
              className="h-8.5 inline-flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 border border-rose-700 rounded-lg transition-all cursor-pointer shadow-xs"
              title={t.logout}
            >
              <LogOut className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="font-bold tracking-tight">{t.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
