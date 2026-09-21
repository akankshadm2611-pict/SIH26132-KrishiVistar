import React, { useState, useMemo, useEffect, Suspense } from "react";
import {
  CloudSun,
  TrendingUp,
  ArrowRightLeft,
  Package,
  Users,
  Truck,
  Warehouse,
  CreditCard,
  Bot,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  Bell,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Check,
  HelpCircle,
  Menu,
} from "lucide-react";
import {
  ProduceLot,
  LotOffer,
  WeatherDay,
  TransactionOrder,
  FarmerTab,
} from "../../types";
import { Language, translations } from "../../translations";
import { SmartFeatureNavigator } from "../SmartFeatureNavigator";

import { FarmerWeatherAdvisory } from "./FarmerWeatherAdvisory";
import { FarmerPriceTrend } from "./FarmerPriceTrend";
import { FarmerMarketCompare } from "./FarmerMarketCompare";
import { FarmerLotManagement } from "./FarmerLotManagement";
import { FarmerBuyerMatching } from "./FarmerBuyerMatching";
import { FarmerLogistics } from "./FarmerLogistics";
import { FarmerColdStorage } from "./FarmerColdStorage";
import { FarmerFinance } from "./FarmerFinance";
import { FarmerCalamityRefund } from "./FarmerCalamityRefund";
import { FarmerCattleKeepers } from "./FarmerCattleKeepers";
import { FarmerMarketIntelligence } from "./FarmerMarketIntelligence";
import farmerSunsetFieldBg from "../../assets/images/farmer_sunset_field_1789909150873.jpg";

export type { FarmerTab };

interface FarmerDashboardProps {
  lots: ProduceLot[];
  offers: LotOffer[];
  weather: WeatherDay[];
  orders: TransactionOrder[];
  currentLang?: Language;
  activeTab?: FarmerTab;
  onSelectTab?: (tab: FarmerTab) => void;
  onOpenSidebar?: () => void;
  onOpenFullScreen?: () => void;
  onCreateLot: (lot: Omit<ProduceLot, "id" | "status" | "offersCount">) => void;
  onAcceptOffer: (offerId: string, lotId: string) => void;
  onCounterOffer: (offerId: string, counterPrice: number) => void;
  onRejectOffer: (offerId: string) => void;
  onOpenAiAssistant: (initialPrompt?: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  lots,
  offers,
  weather,
  orders,
  currentLang = "en",
  activeTab: controlledActiveTab,
  onSelectTab,
  onOpenSidebar,
  onOpenFullScreen,
  onCreateLot,
  onAcceptOffer,
  onCounterOffer,
  onRejectOffer,
  onOpenAiAssistant,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<FarmerTab>("lots");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWeatherAlertDismissed, setIsWeatherAlertDismissed] = useState(false);

  // Sync internalActiveTab whenever controlledActiveTab prop updates
  useEffect(() => {
    if (controlledActiveTab) {
      setInternalActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  const todayMidnight = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Filter out any weather entry whose day has passed (keep only today and future alerts)
  const severeWeather = useMemo(() => {
    return weather.find((w) => {
      if (w.dateIso) {
        const [y, m, d] = w.dateIso.split("-").map(Number);
        const dayEnd = new Date(y, m - 1, d, 23, 59, 59, 999);
        if (dayEnd.getTime() < todayMidnight.getTime()) {
          return false; // Expired day auto-removed
        }
      }
      return (
        w.harvestRisk === "High" ||
        w.condition === "Heavy Rain" ||
        w.condition === "Thunderstorm" ||
        w.rainProb >= 70
      );
    });
  }, [weather, todayMidnight]);

  const aiPromptChips = [
    {
      icon: "🍅",
      label: currentLang === "mr" ? "टोमॅटोचे आजचे दर" : currentLang === "hi" ? "टमाटर के आज के भाव" : "Tomato Mandi Rates",
      prompt: currentLang === "mr" ? "आज टोमॅटोचे सर्वोत्तम दर कोणत्या बाजारात आहेत?" : currentLang === "hi" ? "आज टमाटर के सबसे अच्छे भाव किस मंडी में हैं?" : "What are the best market rates for tomatoes today?",
    },
    {
      icon: "🌧️",
      label: currentLang === "mr" ? "हवामान व पीक संरक्षण" : currentLang === "hi" ? "मौसम और फसल सुरक्षा" : "Weather & Harvest Action",
      prompt: currentLang === "mr" ? "आगामी अतिवृष्टीपासून टोमॅटो व पालेभाज्यांचे पीक कसे सुरक्षित ठेवावे?" : currentLang === "hi" ? "आगामी भारी बारिश से टमाटर और फसलों को कैसे बचाएं?" : "How should I protect my crops and harvest against upcoming heavy rain?",
    },
    {
      icon: "🛡️",
      label: currentLang === "mr" ? "सरकारी योजना व विमा" : currentLang === "hi" ? "सरकारी योजना व बीमा" : "Govt Schemes & Insurance",
      prompt: currentLang === "mr" ? "शेतकऱ्यांसाठी पीक विमा आणि आपत्ती भरपाई कशी मिळवावी?" : currentLang === "hi" ? "किसानों के लिए फसल बीमा और आपदा मुआवजा कैसे मिलेगा?" : "How can farmers claim crop damage compensation and PMFBY insurance?",
    },
  ];

  const rawActive = controlledActiveTab || internalActiveTab;
  const activeTab: FarmerTab = (rawActive === "overview" || !rawActive) ? "lots" : rawActive;
  const setActiveTab = (tab: FarmerTab) => {
    if (onSelectTab) onSelectTab(tab);
    setInternalActiveTab(tab);
  };

  const t = translations[currentLang] || translations.en;

  const pendingOffersCount = offers.filter((o) => o.status === "Pending").length;
  const inEscrowAmount = orders
    .filter((o) => o.paymentStatus === "In Escrow")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const featureLabels: Record<FarmerTab, string> = {
    overview: t.overview,
    weather: t.weatherAlert,
    trends: t.priceTrend,
    compare: t.marketCompare,
    lots: t.lotManagement,
    matching: t.buyerMatching,
    logistics: t.logistics,
    storage: t.coldStorage,
    finance: t.finance,
    calamity: t.calamityRefund,
    cattle: t.cattleKeepers,
    mandi: t.marketPrices,
  };

  const currentFeatureLabel = featureLabels[activeTab] || t.overview;

  const handleApplyRateToActiveLot = () => {
    setActiveTab("lots");
  };

  const handleOpenFeatureAsFullScreen = (tab: FarmerTab) => {
    setActiveTab(tab);
    if (onOpenFullScreen) {
      onOpenFullScreen();
    }
  };

  const coreFeatureCards = [
    {
      id: "mandi" as FarmerTab,
      categoryBadge:
        currentLang === "mr"
          ? "🔴 थेट बाजार दर • Live APMC"
          : currentLang === "hi"
          ? "🔴 लाइव मंडी भाव • Live APMC"
          : "🔴 Live Mandi Prices • APMC",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      title:
        currentLang === "mr"
          ? "१. चालू बाजारभाव"
          : currentLang === "hi"
          ? "1. वर्तमान मंडी भाव"
          : "1. Current Mandi Price",
      subtitle:
        currentLang === "mr"
          ? "थेट दर आणि सर्वोत्तम बाजार शोध"
          : currentLang === "hi"
          ? "लाइव भाव और सर्वोत्तम मंडी खोज"
          : "Real-time rates & price discovery",
      highlights: [
        currentLang === "mr" ? "आजचे थेट APMC दर व आवक अपडेट्स" : currentLang === "hi" ? "आज के लाइव मंडी भाव और आवक" : "Live APMC prices & daily arrivals",
        currentLang === "mr" ? "बाजारांमधील भावातील तफावत (Price Arbitrage)" : currentLang === "hi" ? "मंडियों में मूल्य अंतर (Price Arbitrage)" : "Inter-mandi price arbitrage discovery",
        currentLang === "mr" ? "AI द्वारे नफा विश्लेषण व विक्री सल्ला" : currentLang === "hi" ? "AI आधारित मुनाफा विश्लेषण एवं सलाह" : "AI price forecast & peak timing advice",
      ],
      actionText:
        currentLang === "mr"
          ? "चालू बाजारभाव पहा"
          : currentLang === "hi"
          ? "वर्तमान मंडी भाव देखें"
          : "Explore Current Mandi Price",
      accentBg: "bg-[#eff6ed]",
      borderColor: "border-2 border-emerald-300/80 hover:border-emerald-500",
      btnClass: "bg-emerald-700 hover:bg-emerald-800 text-white",
      iconBg: "bg-emerald-600 text-white",
      icon: TrendingUp,
      isTricolor: false,
    },
    {
      id: "compare" as FarmerTab,
      categoryBadge:
        currentLang === "mr"
          ? "⚖️ निव्वळ नफा गणक • Net Profit"
          : currentLang === "hi"
          ? "⚖️ शुद्ध मुनाफा कैलकुलेटर • Net Profit"
          : "⚖️ Net Payout Calculator",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      title:
        currentLang === "mr"
          ? "२. बाजारभाव तुलना व दर निश्चिती"
          : currentLang === "hi"
          ? "2. मंडी तुलना एवं दर निर्धारण"
          : "2. Market Compare & Rate Fixing",
      subtitle:
        currentLang === "mr"
          ? "नफा मोजा आणि हमी विक्री दर ठरवा"
          : currentLang === "hi"
          ? "शुद्ध लाभ निकालें और बिक्री दर तय करें"
          : "Calculate true in-hand profit & fix asking rate",
      highlights: [
        currentLang === "mr" ? "वाहतूक, हमाली व तोलाई खर्चाची स्वयंचलित वजावट" : currentLang === "hi" ? "भाड़ा, पल्लेदारी और कमीशन की स्वचालित कटौती" : "Auto deduction of transport & mandi fees",
        currentLang === "mr" ? "प्रत्यक्ष हातात येणारा निव्वळ नफा (Net In-Hand ₹)" : currentLang === "hi" ? "वास्तविक हाथ में मिलने वाला शुद्ध पैसा" : "True net payout calculated per kg",
        currentLang === "mr" ? "आपल्या सक्रिय लॉटवर थेट हमी दर लागू करण्याची सुविधा" : currentLang === "hi" ? "अपने सक्रिय लॉट पर सीधा भाव लागू करने की सुविधा" : "One-click 'Fix Rate' applied to active lots",
      ],
      actionText:
        currentLang === "mr"
          ? "तुलना करा व हमी दर ठरवा"
          : currentLang === "hi"
          ? "तुलना करें और दर निर्धारित करें"
          : "Compare Mandis & Fix Rates",
      accentBg: "bg-[#eff6ed]",
      borderColor: "border-2 border-emerald-300/80 hover:border-emerald-500",
      btnClass: "bg-emerald-700 hover:bg-emerald-800 text-white",
      iconBg: "bg-emerald-600 text-white",
      icon: ArrowRightLeft,
      isTricolor: false,
    },
    {
      id: "calamity" as FarmerTab,
      categoryBadge:
        currentLang === "mr"
          ? "🛡️ शासकीय योजना व भरपाई • Govt Relief"
          : currentLang === "hi"
          ? "🛡️ सरकारी योजना एवं मुआवजा • Govt Relief"
          : "🛡️ Govt Scheme & Crop Relief",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold",
      title:
        currentLang === "mr"
          ? "३. शासकीय योजना व आपत्ती नुकसान भरपाई"
          : currentLang === "hi"
          ? "3. सरकारी योजना एवं आपदा नुकसान भरपाई"
          : "3. Government Schemes & Crop Relief",
      subtitle:
        currentLang === "mr"
          ? "आपत्ती नुकसान भरपाई, ई-पंचनामा व PMFBY"
          : currentLang === "hi"
          ? "आपदा मुआवजा, डिजिटल ई-पंचनामा व PMFBY"
          : "Disaster compensation, e-Panchnama & PMFBY",
      highlights: [
        currentLang === "mr" ? "PMFBY अंतर्गत ₹५०,०००/हेक्टर पर्यंत भरपाई संरक्षण" : currentLang === "hi" ? "PMFBY के तहत ₹50,000/हेक्टेयर तक मुआवजा सहायता" : "Up to ₹50,000/hectare PMFBY crop relief",
        currentLang === "mr" ? "७२ तासांत फास्ट-ट्रॅक जिओटॅग फोटो/व्हिडिओ ई-पंचनामा" : currentLang === "hi" ? "७२ घंटे में फास्ट-ट्रैक जिओटैग फोटो ई-पंचनामा" : "72-hour fast-track geotagged e-panchnama",
        currentLang === "mr" ? "थेट बँक खात्यात DBT सहाय्य व एस्क्रो वाद निवारण" : currentLang === "hi" ? "सीधे बैंक खाते में DBT मुआवजा व 100% एस्क्रो सुरक्षा" : "Direct Bank Transfer (DBT) & 100% escrow safety",
      ],
      actionText:
        currentLang === "mr"
          ? "शासकीय योजना व क्लेम पहा"
          : currentLang === "hi"
          ? "सरकारी योजना एवं क्लेम देखें"
          : "View Schemes & Calamity Claims",
      accentBg: "bg-[#eff6ed]",
      borderColor: "border-2 border-emerald-300/80 hover:border-emerald-500",
      btnClass: "bg-emerald-700 hover:bg-emerald-800 text-white",
      iconBg: "bg-emerald-600 text-white",
      icon: ShieldAlert,
      isTricolor: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* In-app notification toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Serious Weather Alert Pop-Up on Main Dashboard */}
      {severeWeather && !isWeatherAlertDismissed && (
        <div
          id="dashboard-severe-weather-alert"
          className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border-2 border-rose-500 animate-fadeIn relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    {currentLang === "mr"
                      ? "गंभीर हवामान इशारा"
                      : currentLang === "hi"
                      ? "गंभीर मौसम चेतावनी"
                      : "Severe Weather Alert"}
                  </span>
                  <span className="text-xs font-bold text-amber-200">
                    {severeWeather.date} ({severeWeather.day}) · {severeWeather.condition}
                  </span>
                  <span className="text-xs bg-rose-950/90 px-2 py-0.5 rounded border border-rose-400/40 text-rose-200 font-bold">
                    {severeWeather.rainProb}% {currentLang === "mr" ? "पाऊस संभाव्यता" : currentLang === "hi" ? "बारिश संभावना" : "Rain Prob"}
                  </span>
                  <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 font-bold">
                    {currentLang === "mr" ? "धोका: उच्च" : currentLang === "hi" ? "जोखिम: उच्च" : "Risk: High"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white mt-1.5 leading-relaxed">
                  {severeWeather.advice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t border-rose-800/60 md:border-t-0">
              <button
                type="button"
                onClick={() =>
                  onOpenAiAssistant(
                    `Severe Weather Alert on ${severeWeather.date} with ${severeWeather.condition} and ${severeWeather.rainProb}% rain chance. Harvest advice: "${severeWeather.advice}". How should I protect my standing crops and harvested produce?`
                  )
                }
                className="flex-1 md:flex-initial h-8.5 px-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>
                  {currentLang === "mr"
                    ? "AI सल्ला विचारा"
                    : currentLang === "hi"
                    ? "AI सलाह लें"
                    : "Ask AI Advice"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("storage")}
                className="flex-1 md:flex-initial h-8.5 px-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-lg border border-white/30 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Warehouse className="w-3.5 h-3.5 text-cyan-300" />
                <span>
                  {currentLang === "mr"
                    ? "शीतगृह बुक करा"
                    : currentLang === "hi"
                    ? "कोल्ड स्टोरेज बुक करें"
                    : "Book Storage"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsWeatherAlertDismissed(true)}
                className="w-8.5 h-8.5 inline-flex items-center justify-center text-rose-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={t.cancel}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner for Farmer: Farmland Sunset Photographic Background */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[380px] sm:min-h-[420px] md:min-h-[460px] p-6 sm:p-8 md:p-9 flex flex-col justify-between text-white transition-all">
        {/* Background Farmland Sunset Image */}
        <img
          src={farmerSunsetFieldBg}
          alt="Scenic farmland with green crops at golden sunset"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Gradient overlay to ensure text is crisp and readable while preserving sunset, sun, mountains, and crops */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/65 pointer-events-none" />

        {/* Tricolor micro-accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10 pt-1">
          <div>
            {/* Tricolor Colored Kisan Helpline Strip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-slate-950 text-xs font-black mb-3 shadow-md border border-white/40">
              <span className="text-xs">📞</span>
              <span className="tracking-tight drop-shadow-none">
                {currentLang === "mr"
                  ? "शेतकरी मदत हेल्पलाइन: १८००-१८०-१५५१ (टोल-फ्री)"
                  : currentLang === "hi"
                  ? "किसान सहायता हेल्पलाइन: 1800-180-1551 (टोल-फ्री)"
                  : "Kisan Support Helpline: 1800-180-1551 (Toll-Free)"}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black font-sans text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.welcomeFarmer}
            </h1>
            <p className="text-slate-100 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {t.farmerSubText}
            </p>
          </div>
        </div>

        {/* Quick KPI Strip with Transparent Glass Tiles so Behind Image is Clearly Visible */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20 text-xs">
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "सक्रिय शेतमाल लॉट्स" : currentLang === "hi" ? "सक्रिय फसल लॉट" : "Active Produce Lots"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {lots.reduce((acc, l) => acc + l.quantityKg, 0).toLocaleString("en-IN")} kg
            </span>
          </div>
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "प्रलंबित खरेदीदार बोली" : currentLang === "hi" ? "लंबित खरीदार बोलियां" : "Pending Buyer Offers"}
            </span>
            <span className="text-base sm:text-xl font-black text-amber-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {pendingOffersCount} {currentLang === "mr" ? "सक्रिय" : currentLang === "hi" ? "सक्रिय" : "Action Required"}
            </span>
          </div>
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "एस्क्रो सुरक्षित रक्कम" : currentLang === "hi" ? "एस्क्रो में सुरक्षित राशि" : "Guaranteed in Escrow"}
            </span>
            <span className="text-base sm:text-xl font-black text-emerald-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              ₹{inEscrowAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "आजचा सर्वोत्तम बाजारभाव" : currentLang === "hi" ? "आज का सर्वश्रेष्ठ भाव" : "Best Mandi Today"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "मुंबई ₹३६/कि (निव्वळ ₹३०)" : currentLang === "hi" ? "मुंबई ₹३६/किग्रा (शुद्ध ₹३०)" : "Mumbai ₹36/kg (Net ₹30)"}
            </span>
          </div>
        </div>
      </div>

      {/* AI Feature Search & Smart Agri Assistant Dual-Card Suite (Side-by-Side Responsive Layout) */}
      <section
        id="farmer-ai-suite"
        aria-label="AI Navigation and Assistant Suite"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch w-full"
      >
        {/* Card 1: Smart AI Search & Feature Navigator */}
        <div className="flex flex-col h-full min-w-0">
          <SmartFeatureNavigator
            currentRole="farmer"
            currentLang={currentLang}
            onNavigateToFeature={(tabId) => setActiveTab(tabId as FarmerTab)}
            onOpenSidebar={onOpenSidebar}
          />
        </div>

        {/* Card 2: AI Agri Assistant */}
        <div
          id="dashboard-ai-agri-assistant"
          className="bg-gradient-to-br from-[#0c3b2e] via-[#0d343b] to-[#0f2d4a] text-white rounded-2xl p-4 sm:p-5 border border-emerald-700/60 shadow-xs relative overflow-hidden flex flex-col justify-between h-full min-w-0"
        >
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Section: Header + Interactive Query Bar */}
          <div>
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-xs shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {currentLang === "mr"
                        ? "AI कृषी सल्लागार"
                        : currentLang === "hi"
                        ? "AI कृषि सलाहकार"
                        : "AI Agri Assistant"}
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{currentLang === "mr" ? "24/7 सक्रिय" : currentLang === "hi" ? "24/7 सक्रिय" : "24/7 Live"}</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenAiAssistant()}
                id="dashboard-ai-assistant-btn"
                className="h-8.5 px-3.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
                <span>
                  {currentLang === "mr"
                    ? "संवाद सुरू करा"
                    : currentLang === "hi"
                    ? "बातचीत शुरू करें"
                    : "Ask / Speak"}
                </span>
              </button>
            </div>

            {/* Interactive Prompt / Query Launcher Bar */}
            <div className="relative">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenAiAssistant()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenAiAssistant();
                  }
                }}
                className="flex items-center justify-between gap-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all group shadow-2xs"
                title={
                  currentLang === "mr"
                    ? "कृषी प्रश्नांसाठी सहाय्यक उघडा"
                    : currentLang === "hi"
                    ? "कृषि प्रश्नों के लिए सहायक खोलें"
                    : "Click to ask agricultural question"
                }
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100/90 truncate min-w-0">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="truncate font-medium">
                    {currentLang === "mr"
                      ? "पिके, कीड-रोग, खत व्यवस्थापन किंवा हवामानावर विचारा..."
                      : currentLang === "hi"
                      ? "फसल, कीट-रोग, खाद प्रबंधन या मौसम पर पूछें..."
                      : "Ask about crop diseases, pest control, fertilizers, or mandi trends..."}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:text-amber-200 shrink-0">
                  <span>{currentLang === "mr" ? "विचारा" : currentLang === "hi" ? "पूछें" : "Chat"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Suggestion Chips matching Card 1's bottom row */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none text-[11px]">
            <span className="text-emerald-200/80 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
              {currentLang === "mr" ? "द्रुत प्रश्न:" : currentLang === "hi" ? "त्वरित सवाल:" : "Quick Queries:"}
            </span>
            {aiPromptChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenAiAssistant(chip.prompt)}
                className="h-7 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-colors cursor-pointer shrink-0 active:scale-95 inline-flex items-center justify-center gap-1.5"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content with Suspense for instant transition */}
      <Suspense
        fallback={
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="w-7 h-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Loading section...</p>
          </div>
        }
      >
        {/* Top return bar for non-lots tab inside dashboard view */}
        {activeTab !== "lots" && (
          <div className="flex items-center justify-between p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              {onOpenSidebar && (
                <button
                  type="button"
                  onClick={onOpenSidebar}
                  className="w-8.5 h-8.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer inline-flex items-center justify-center"
                  title="Open Sidebar"
                  aria-label="Open Sidebar"
                >
                  <Menu className="w-4 h-4 text-emerald-700" />
                </button>
              )}
              <h2 className="text-sm sm:text-base font-bold text-slate-800">
                {currentFeatureLabel}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("lots")}
              className="h-8.5 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] hover:text-[#043d2e] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer border-2 border-[#86efac]"
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
          </div>
        )}

        {/* Main Dashboard: 3 Core Feature Cards + Produce Lots */}
        {activeTab === "lots" && (
          <div className="space-y-6">
            {/* 3 Core Farmer Feature Cards Section */}
            <section id="core-farmer-features" className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>
                      {currentLang === "mr"
                        ? "प्रमुख शेतकरी सेवा व बाजार साधने (Core Features)"
                        : currentLang === "hi"
                        ? "प्रमुख किसान सेवाएं एवं बाजार सुविधाएं (Core Features)"
                        : "Essential Farmer Market Features & Support"}
                    </span>
                  </h2>
                </div>
              </div>

              {/* 3 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {coreFeatureCards.map((card) => {
                  const Icon = card.icon;
                  const isTricolor = card.isTricolor;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleOpenFeatureAsFullScreen(card.id)}
                      className={`rounded-2xl border ${card.accentBg} ${card.borderColor} p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
                    >
                      {/* Top micro stripe for Tricolor Govt Scheme Card */}
                      {isTricolor && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-10" />
                      )}

                      {/* Top micro pill & icon */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase ${card.badgeColor}`}
                          >
                            {card.categoryBadge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                          {card.title}
                        </h3>

                        {/* Benefit checklist - Concise, highly readable points */}
                        <div className="mt-4 space-y-2.5">
                          {card.highlights.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                                  isTricolor
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : "bg-emerald-200/90 text-emerald-800"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button at bottom */}
                      <div className="mt-5 pt-3 border-t border-slate-200/80">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenFeatureAsFullScreen(card.id);
                          }}
                          className={`w-full h-10 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:brightness-105 active:scale-98 ${card.btnClass}`}
                        >
                          <span>{card.actionText}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Produce Lots & Active Bids Section with Create New Lot Option on main dashboard */}
            <FarmerLotManagement
              currentLang={currentLang}
              lots={lots}
              offers={offers}
              onCreateLot={onCreateLot}
              onAcceptOffer={onAcceptOffer}
              onCounterOffer={onCounterOffer}
              onRejectOffer={onRejectOffer}
              onOpenLogistics={() => setActiveTab("logistics")}
              hideCreateButton={false}
            />
          </div>
        )}

        {activeTab === "weather" && (
          <FarmerWeatherAdvisory
            weatherData={weather}
            currentLang={currentLang}
            onOpenAiAdvice={(q) => onOpenAiAssistant(q)}
            onNavigateToStorage={() => setActiveTab("storage")}
          />
        )}

        {activeTab === "trends" && (
          <FarmerPriceTrend
            currentLang={currentLang}
            onOpenAiAssistant={(q) => onOpenAiAssistant(q)}
            onNavigateToStorage={() => setActiveTab("storage")}
          />
        )}

        {activeTab === "compare" && (
          <FarmerMarketCompare
            currentLang={currentLang}
            onApplyRateToLot={handleApplyRateToActiveLot}
            onOpenLogistics={() => setActiveTab("logistics")}
          />
        )}

        {activeTab === "matching" && (
          <FarmerBuyerMatching
            currentLang={currentLang}
            onDirectOffer={(buyer) => {
              showToast(`Produce Lot #1025 forwarded to ${buyer.name}. Bids expected within 2 hours.`);
            }}
          />
        )}

        {activeTab === "logistics" && <FarmerLogistics currentLang={currentLang} />}

        {activeTab === "storage" && (
          <FarmerColdStorage
            currentLang={currentLang}
            onBackToDashboard={() => setActiveTab("lots")}
          />
        )}

        {activeTab === "finance" && <FarmerFinance orders={orders} currentLang={currentLang} />}

        {activeTab === "calamity" && (
          <FarmerCalamityRefund currentLang={currentLang} orders={orders} />
        )}

        {activeTab === "cattle" && (
          <FarmerCattleKeepers currentLang={currentLang} />
        )}

        {activeTab === "mandi" && (
          <FarmerMarketIntelligence
            currentLang={currentLang}
            onOpenAiCompare={(crop) => {
              onOpenAiAssistant(`What is the price arbitrage between mandis for ${crop}?`);
            }}
          />
        )}
      </Suspense>
    </div>
  );
};
