import React from "react";
import {
  X,
  Sprout,
  ShoppingBag,
  CloudSun,
  TrendingUp,
  ArrowRightLeft,
  Package,
  Users,
  Truck,
  Warehouse,
  CreditCard,
  Star,
  Bot,
  Sparkles,
  ShieldAlert,
  Languages,
  LogOut,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { UserRole, FarmerTab, BuyerTab } from "../types";
import { Language, translations } from "../translations";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeFarmerTab: FarmerTab;
  onSelectFarmerTab: (tab: FarmerTab) => void;
  activeBuyerTab: BuyerTab;
  onSelectBuyerTab: (tab: BuyerTab) => void;
  onOpenFullScreen?: () => void;
  onOpenAiAssistant?: () => void;
  onReturnToLogin: () => void;
  pendingBidsCount?: number;
  inEscrowOrdersCount?: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole,
  currentLang,
  onLanguageChange,
  activeFarmerTab,
  onSelectFarmerTab,
  activeBuyerTab,
  onSelectBuyerTab,
  onOpenFullScreen,
  onOpenAiAssistant,
  onReturnToLogin,
  pendingBidsCount = 2,
  inEscrowOrdersCount = 1,
}) => {
  const t = translations[currentLang] || translations.en;

  // Farmer Features list - arranged logically for quick daily access by farmers
  const farmerFeatures = [
    {
      id: "mandi" as FarmerTab,
      label: t.marketPrices,
      desc:
        currentLang === "mr"
          ? "बाजार समित्यांमधील ताजे बाजारभाव"
          : currentLang === "hi"
          ? "मंडी समितियों के ताजा बाजार भाव"
          : t.mandiDesc,
      icon: TrendingUp,
      badge: currentLang === "mr" ? "ताजे दर" : currentLang === "hi" ? "ताजा भाव" : "Live Rates",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
      color: "text-emerald-700 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "weather" as FarmerTab,
      label: t.weatherAlert,
      desc:
        currentLang === "mr"
          ? "पुढील ७ दिवसांचा पाऊस व हवामान अंदाज"
          : currentLang === "hi"
          ? "अगले ७ दिनों का बारिश और मौसम पूर्वानुमान"
          : t.weatherDesc,
      icon: CloudSun,
      badge: currentLang === "mr" ? "पाऊस २ दि" : currentLang === "hi" ? "बारिश २ दिन" : "Rain in 2d",
      badgeColor: "bg-rose-100 text-rose-800 border border-rose-300 font-bold",
      color: "text-blue-700 bg-blue-100/90 border border-blue-300",
    },
    {
      id: "trends" as FarmerTab,
      label: t.priceTrend,
      desc:
        currentLang === "mr"
          ? "भाव कधी वाढतील? माल विकण्याची योग्य वेळ"
          : currentLang === "hi"
          ? "भाव कब बढ़ेंगे? फसल बेचने का सही समय"
          : t.priceTrendDesc,
      icon: TrendingUp,
      badge: currentLang === "mr" ? "+१५% नफा" : currentLang === "hi" ? "+१५% लाभ" : "+15% Peak",
      badgeColor: "bg-teal-100 text-teal-800 border border-teal-300 font-bold",
      color: "text-teal-700 bg-teal-100/90 border border-teal-300",
    },
    {
      id: "compare" as FarmerTab,
      label: t.marketCompare,
      desc:
        currentLang === "mr"
          ? "बाजारभाव तपासा व स्वतःचे दर ठरवा"
          : currentLang === "hi"
          ? "बाजार भाव तुलना करें और अपने दाम तय करें"
          : t.marketCompareDesc,
      icon: ArrowRightLeft,
      color: "text-indigo-700 bg-indigo-100/90 border border-indigo-300",
    },
    {
      id: "matching" as FarmerTab,
      label: t.buyerMatching,
      desc:
        currentLang === "mr"
          ? "थेट मोठे व्यापारी व किरकोळ खरेदीदार शोधा"
          : currentLang === "hi"
          ? "सीधे बड़े व्यापारी एवं खरीदार खोजें"
          : t.buyerMatchingDesc,
      icon: Users,
      color: "text-emerald-700 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "logistics" as FarmerTab,
      label: t.logistics,
      desc:
        currentLang === "mr"
          ? "शेतमाल वाहतुकीसाठी टेम्पो व ट्रक बुक करा"
          : currentLang === "hi"
          ? "फसल ढुलाई के लिए टेम्पो और ट्रक बुक करें"
          : t.logisticsDesc,
      icon: Truck,
      color: "text-purple-700 bg-purple-100/90 border border-purple-300",
    },
    {
      id: "storage" as FarmerTab,
      label: t.coldStorage,
      desc:
        currentLang === "mr"
          ? "जवळची शीतगृहे व साठवणूक जागा"
          : currentLang === "hi"
          ? "निकटतम कोल्ड स्टोरेज एवं भंडारण सुविधा"
          : t.coldStorageDesc,
      icon: Warehouse,
      color: "text-cyan-700 bg-cyan-100/90 border border-cyan-300",
    },
    {
      id: "finance" as FarmerTab,
      label: t.finance,
      desc:
        currentLang === "mr"
          ? "बँक खात्यात जमा झालेले पैसे व पावत्या"
          : currentLang === "hi"
          ? "बैंक खाते में आए पैसे और रसीदें"
          : t.financeDesc,
      icon: CreditCard,
      badge: currentLang === "mr" ? "सुरक्षित पैसे" : currentLang === "hi" ? "सुरक्षित भुगतान" : "Safe Escrow",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
      color: "text-emerald-800 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "calamity" as FarmerTab,
      label: t.calamityRefund,
      desc:
        currentLang === "mr"
          ? "शासकीय योजना शोध (AI), अधिकृत पोर्टल (MahaDBT/PMFBY) व ई-पंचनामा भरपाई"
          : currentLang === "hi"
          ? "सरकारी योजना AI खोज, आधिकारिक पोर्टल (MahaDBT/PMFBY) एवं ई-पंचनामा राहत"
          : "AI Govt Scheme Engine, Official Portals (MahaDBT/PMFBY) & e-Panchnama Relief",
      icon: ShieldAlert,
      color: "text-emerald-700 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "cattle" as FarmerTab,
      label: t.cattleKeepers,
      desc:
        currentLang === "mr"
          ? "जवळचे पशुपालक शेतकरी व संपर्क नंबर"
          : currentLang === "hi"
          ? "निकटवर्ती पशुपालक एवं संपर्क नंबर"
          : t.cattleKeepersDesc,
      icon: PhoneCall,
      color: "text-amber-800 bg-amber-100/90 border border-amber-300",
    },
  ];

  const buyerFeatures = [
    {
      id: "marketplace" as BuyerTab,
      label: t.marketplace,
      desc:
        currentLang === "mr"
          ? "थेट शेतकऱ्यांकडून ताजी शेतमाल खरेदी करा"
          : currentLang === "hi"
          ? "सीधे किसानों से ताजा उपज खरीदें"
          : t.marketplaceDesc,
      icon: ShoppingBag,
      color: "text-emerald-700 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "nearby" as BuyerTab,
      label: t.nearbyFarmers,
      desc:
        currentLang === "mr"
          ? "उत्कृष्ट रेटिंग असलेले जवळचे शेतकरी"
          : currentLang === "hi"
          ? "टॉप रेटिंग वाले नजदीकी किसान"
          : t.nearbyFarmersDesc,
      icon: Users,
      badge: "★ 4.8+",
      badgeColor: "bg-amber-100 text-amber-800 border border-amber-300 font-bold",
      color: "text-blue-700 bg-blue-100/90 border border-blue-300",
    },
    {
      id: "compare" as BuyerTab,
      label: t.marketCompare,
      desc:
        currentLang === "mr"
          ? "विविध बाजारांमधील दर तुलना करा"
          : currentLang === "hi"
          ? "अलग-अलग मंडियों के भाव देखें"
          : t.marketCompareDesc,
      icon: ArrowRightLeft,
      color: "text-indigo-700 bg-indigo-100/90 border border-indigo-300",
    },
    {
      id: "finance" as BuyerTab,
      label: t.finance,
      desc:
        currentLang === "mr"
          ? "सुरक्षित एस्क्रो पेमेंट व व्यवहाराच्या पावत्या"
          : currentLang === "hi"
          ? "सुरक्षित भुगतान एवं रसीदें"
          : t.financeDesc,
      icon: CreditCard,
      badge: inEscrowOrdersCount > 0 ? `${inEscrowOrdersCount} ${t.escrowLocked}` : undefined,
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
      color: "text-emerald-800 bg-emerald-100/90 border border-emerald-300",
    },
    {
      id: "ratings" as BuyerTab,
      label: t.ratingsAndGrievances,
      desc:
        currentLang === "mr"
          ? "मालाची गुणवत्ता खात्री व अभिप्राय द्या"
          : currentLang === "hi"
          ? "गुणवत्ता पुष्टि और रेटिंग दें"
          : t.ratingsDesc,
      icon: Star,
      color: "text-amber-800 bg-amber-100/90 border border-amber-300",
    },
  ];

  const currentFeatures = currentRole === "farmer" ? farmerFeatures : buyerFeatures;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Smooth Sliding Sidebar Drawer */}
      <aside
        id="krivishvistar-side-drawer"
        aria-label="Main navigation menu"
        className={`fixed inset-y-0 left-0 z-[60] w-full max-w-[320px] sm:max-w-[360px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header - Clean & Welcoming */}
        <div className="bg-[#0f2d4a] text-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-tight">
                  KrishiVistar
                </span>
                <span className="text-xs text-emerald-200 font-medium">
                  {currentLang === "mr"
                    ? "शेतकरी सहाय्यक पोर्टल"
                    : currentLang === "hi"
                    ? "किसान सहायक पोर्टल"
                    : "Farmer Digital Portal"}
                </span>
              </div>
            </div>

            {/* Large Easy-to-Tap Close Button */}
            <button
              onClick={onClose}
              id="close-sidebar-btn"
              className="w-10 h-10 flex items-center justify-center text-slate-200 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/10 active:scale-95"
              title={t.closeMenu}
              aria-label={t.closeMenu}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Language Selection Bar - Clear, Large, High-Contrast */}
        <div className="p-3.5 bg-slate-100/90 border-b border-slate-200">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-700">
            <Languages className="w-4 h-4 text-emerald-700" />
            <span>
              {currentLang === "mr"
                ? "भाषा बदला / Choose Language:"
                : currentLang === "hi"
                ? "भाषा बदलें / Choose Language:"
                : "Choose Language:"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onLanguageChange("mr")}
              id="sidebar-lang-mr"
              className={`py-2 px-1 text-center rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
                currentLang === "mr"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange("hi")}
              id="sidebar-lang-hi"
              className={`py-2 px-1 text-center rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
                currentLang === "hi"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              id="sidebar-lang-en"
              className={`py-2 px-1 text-center rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
                currentLang === "en"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {currentLang === "mr"
              ? "सर्व सेवा व साधने (टॅप करा)"
              : currentLang === "hi"
              ? "सभी सुविधाएं एवं सेवाएं (टैप करें)"
              : "Services & Features (Tap to open)"}
          </span>
        </div>

        {/* Features List Section - Clear, High-Contrast & Big Tap Targets */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {currentFeatures.map((feat) => {
            const Icon = feat.icon;
            const isActive =
              currentRole === "farmer"
                ? activeFarmerTab === feat.id
                : activeBuyerTab === feat.id;

            return (
              <button
                key={feat.id}
                onClick={() => {
                  if (currentRole === "farmer") {
                    onSelectFarmerTab(feat.id as FarmerTab);
                  } else {
                    onSelectBuyerTab(feat.id as BuyerTab);
                  }
                  if (onOpenFullScreen) onOpenFullScreen();
                  onClose();
                }}
                id={`sidebar-${currentRole}-${feat.id}`}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3.5 group cursor-pointer active:scale-[0.99] ${
                  isActive
                    ? "bg-emerald-50/95 border-emerald-500 border-l-[6px] border-l-emerald-600 shadow-sm ring-1 ring-emerald-400/30"
                    : "bg-white border-slate-200/90 hover:bg-emerald-50/40 hover:border-emerald-300"
                }`}
              >
                {/* Visual Icon with high contrast */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                    isActive ? "bg-emerald-700 text-white shadow-sm" : feat.color
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-sm font-bold truncate leading-snug ${
                        isActive ? "text-emerald-950 font-black" : "text-slate-900"
                      }`}
                    >
                      {feat.label}
                    </span>
                    {feat.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${feat.badgeColor}`}
                      >
                        {feat.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Clean Simple Indicator Arrow */}
                <ChevronRight
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isActive
                      ? "text-emerald-700 translate-x-1"
                      : "text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-2.5">
          {/* Clean and Obvious Logout Button */}
          <button
            onClick={() => {
              onReturnToLogin();
              onClose();
            }}
            id="sidebar-logout-btn"
            className="w-full h-11 flex items-center justify-center gap-2 px-4 text-xs sm:text-sm font-bold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            <span>
              {currentLang === "mr"
                ? "लॉगआउट (बाहेर पडा)"
                : currentLang === "hi"
                ? "लॉगआउट (बाहर निकलें)"
                : t.logout}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
