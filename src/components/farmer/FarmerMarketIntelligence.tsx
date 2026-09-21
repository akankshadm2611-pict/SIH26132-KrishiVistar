import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  RefreshCw,
  FileText,
  Award,
  ShieldCheck,
  Copy,
  X,
  Building2,
  Calendar,
} from "lucide-react";
import { MandiPrice, Language } from "../../types";
import mandiMarketPriceBgImg from "../../assets/images/mandi_market_price_bg_1789935717937.jpg";
import {
  getDynamicMandiPrices,
  simulateTimelyTradersAssociationTick,
  getTradingSessionInfo,
  getAssociationBulletinInfo,
  TradingSessionInfo,
} from "../../utils/mandiLiveService";

interface FarmerMarketIntelligenceProps {
  currentLang?: Language;
  onOpenAiCompare: (crop: string) => void;
}

const tMandi = {
  mr: {
    title: "चालू बाजारभाव",
    subtitle: "स्थानिक घाऊक व्यापारी असोसिएशन व APMC रीयल-टाइम लिलाव, आवक आणि अधिकृत घाऊक बेंचमार्क",
    liveBadge: "● थेट व्यापारी मंडळ व ई-नाम फीड सक्रिय",
    statLiveMandis: "थेट बाजार समित्या",
    statLiveMandisVal: "८ प्रमुख APMC",
    statEnam: "ई-नाम व असोसिएशन",
    statEnamVal: "१००% थेट लिलाव",
    statArrivals: "आजची आवक",
    statArrivalsVal: "१,४२० मेट्रिक टन",
    statArbitrage: "नफा संधी (Arbitrage)",
    statArbitrageVal: "+१८% सर्वोत्तम दर",
    searchPlaceholder: "पीक शोधा उदा. टोमॅटो, कांदा, गहू, बटाटा...",
    allMandis: "सर्व बाजार समित्या",
    allCategories: "सर्व वर्गवारी",
    vegetables: "भाज्या",
    fruits: "फळे",
    grains: "धान्य",
    cashCrops: "नगदी पिके",
    alertPrefix: "साठी दर अलर्ट सेट केला!",
    alertSuffix: "दरात ±५% बदल झाल्यास एसएमएस व सूचना मिळेल.",
    modalBenchmark: "सरासरी दर (APMC Modal):",
    assocBenchmarkLabel: "व्यापारी मंडळ बेंचमार्क:",
    mandiRange: "बाजार मर्यादा:",
    dailyArrivals: "दैनिक आवक:",
    aiArbitrage: "एआय नफा सल्ला",
    alertTooltip: "दर हालचाल अलर्ट सेट करा",
    colCropMandi: "पीक व बाजार समिती",
    colModalPrice: "सरासरी दर व व्यापारी बेंचमार्क",
    colRangeArrivals: "दर मर्यादा व आवक",
    colActions: "क्रिया व सूचना",
    noResults: "शोध परिणामांशी जुळणारे पीक सापडले नाही.",
    tradersAssociationTitle: "स्थानिक घाऊक व्यापारी व अडते असोसिएशन · अधिकृत घाऊक बेंचमार्क",
    tradersAssociationSubtitle: "नाशिक, लासलगाव, पुणे व मुंबई एपीएमसी परवानाधारक अडते व व्यापारी संघाने निश्चित केलेले किमान आधारभूत भाव",
    viewBulletinBtn: "अधिकृत व्यापारी दरपत्रक पहा",
    syncTradersFeed: "व्यापारी मंडळ दर अपडेट करा",
    syncedToast: "स्थानिक व्यापारी असोसिएशनच्या थेट लिलाव व घाऊक बेंचमार्कसह दर अद्ययावत झाले!",
    lastBidLabel: "शेवटचा लिलाव सौदा:",
    bulletinModalTitle: "स्थानिक घाऊक व्यापारी असोसिएशन - अधिकृत दैनिक घाऊक दरपत्रक",
    bulletinModalSubtitle: "महाराष्ट्र कृषी उत्पन्न खरेदी-विक्री (नियमन) अधिनियम अंतर्गत प्रमाणित अधिकृत घाऊक बेंचमार्क",
    officialSeal: "अधिकृत मुद्रा व स्वाक्षरी",
    copyBulletin: "दरपत्रक सारांश कॉपी करा",
    copiedToast: "अधिकृत व्यापारी दरपत्रक क्लिपबोर्डवर कॉपी झाले!",
    close: "बंद करा",
    bulletinRef: "संदर्भ क्र:",
    validForDate: "लागू दिनांक:",
    presidentSign: "अध्यक्ष - संजय पाटील",
    secretarySign: "सचिव - विलास शिंदे",
    registeredOffice: "मध्यवर्ती कार्यालय: एपीएमसी प्रशासकीय भवन, नाशिक-पुणे व्यापारी कक्ष",
    statutoryNote: "सदर दर स्थानिक घाऊक व्यापारी मंडळ व अडते असोसिएशनने लिलाव सुरुवातीस सर्वसंमतीने निश्चित केलेले असून शेतकऱ्यांसाठी ते आधारभूत बेंचमार्क म्हणून ग्राह्य धरले जातात.",
  },
  hi: {
    title: "वर्तमान मंडी भाव",
    subtitle: "स्थानीय थोक व्यापारी संघ एवं APMC रियल-टाइम नीलामी, आवक और आधिकारिक थोक बेंचमार्क",
    liveBadge: "● लाइव व्यापारी संघ व ई-नाम फीड चालू",
    statLiveMandis: "लाइव मंडियां",
    statLiveMandisVal: "8 प्रमुख APMC",
    statEnam: "ई-नाम एवं एसोसिएशन",
    statEnamVal: "100% लाइव नीलामी",
    statArrivals: "दैनिक आवक",
    statArrivalsVal: "1,420 मीट्रिक टन",
    statArbitrage: "मुनाफा अंतर (Arbitrage)",
    statArbitrageVal: "+18% उच्चतम दर",
    searchPlaceholder: "फसल खोजें उदा. टमाटर, प्याज, गेहूं, आलू...",
    allMandis: "सभी मंडियां",
    allCategories: "सभी श्रेणियां",
    vegetables: "सब्जियां",
    fruits: "फल",
    grains: "अनाज",
    cashCrops: "नकदी फसलें",
    alertPrefix: "के लिए मूल्य अलर्ट सेट हुआ!",
    alertSuffix: "भाव में ±५% बदलाव पर एसएमएस व सूचना मिलेगी।",
    modalBenchmark: "मॉडल भाव (APMC Modal):",
    assocBenchmarkLabel: "व्यापारी संघ बेंचमार्क:",
    mandiRange: "मंडी दायरा:",
    dailyArrivals: "दैनिक आवक:",
    aiArbitrage: "एआई मुनाफा सलाह",
    alertTooltip: "भाव बदलाव अलर्ट सेट करें",
    colCropMandi: "फसल व मंडी",
    colModalPrice: "मॉडल भाव व व्यापारी बेंचमार्क",
    colRangeArrivals: "भाव दायरा व आवक",
    colActions: "क्रिया व अलर्ट",
    noResults: "खोजे गए विवरण से मेल खाती फसल नहीं मिली।",
    tradersAssociationTitle: "स्थानीय थोक व्यापारी एवं आढ़ती संघ · आधिकारिक थोक बेंचमार्क",
    tradersAssociationSubtitle: "नासिक, लासलगांव, पुणे व मुंबई एपीएमसी अधिकृत व्यापारियों द्वारा तय न्यूनतम थोक बेंचमार्क",
    viewBulletinBtn: "आधिकारिक व्यापारी दर-सूची देखें",
    syncTradersFeed: "व्यापारी संघ भाव अपडेट करें",
    syncedToast: "स्थानीय थोक व्यापारी संघ के लाइव नीलामी बेंचमार्क से भाव अपडेट हुए!",
    lastBidLabel: "अंतिम नीलामी सौदा:",
    bulletinModalTitle: "स्थानीय थोक व्यापारी संघ - आधिकारिक दैनिक थोक दर-सूची",
    bulletinModalSubtitle: "कृषि उपज मंडी समिति विनियम अंतर्गत प्रमाणित आधिकारिक थोक दर बुलेटिन",
    officialSeal: "आधिकारिक मुहर व हस्ताक्षर",
    copyBulletin: "दर-सूची कॉपी करें",
    copiedToast: "आधिकारिक दर-सूची क्लिपबोर्ड पर कॉपी हो गई!",
    close: "बंद करें",
    bulletinRef: "संदर्भ संख्या:",
    validForDate: "प्रभावी तिथि:",
    presidentSign: "अध्यक्ष - संजय पाटिल",
    secretarySign: "सचिव - विलास शिंदे",
    registeredOffice: "केंद्रीय कार्यालय: एपीएमसी प्रशासनिक भवन, नासिक-पुणे व्यापार प्रकोष्ठ",
    statutoryNote: "यह दर-सूची स्थानीय थोक व्यापारी व आढ़ती संघ द्वारा सर्वसम्मति से प्रमाणित है और किसानों के लिए आधिकारिक बेंचमार्क है।",
  },
  en: {
    title: "Current Mandi Price",
    subtitle: "Real-time APMC open auction bids, arrivals volume, and Local Traders Association wholesale benchmarks",
    liveBadge: "● Live Traders Association & e-NAM Feeds Active",
    statLiveMandis: "Live Mandis",
    statLiveMandisVal: "8 Major APMCs",
    statEnam: "e-NAM & Traders Assoc",
    statEnamVal: "100% Live Feeds",
    statArrivals: "Today's Arrivals",
    statArrivalsVal: "1,420 Metric Tonnes",
    statArbitrage: "Arbitrage Opportunity",
    statArbitrageVal: "+18% Peak Gain",
    searchPlaceholder: "Search crop e.g. Tomato, Onion, Wheat, Potato...",
    allMandis: "All Mandis",
    allCategories: "All Categories",
    vegetables: "Vegetables",
    fruits: "Fruits",
    grains: "Grains",
    cashCrops: "Cash Crops",
    alertPrefix: "Price alert set for",
    alertSuffix: "You will receive SMS & push notifications if rates shift by ±5%.",
    modalBenchmark: "Modal Rate (APMC):",
    assocBenchmarkLabel: "Traders Assoc Benchmark:",
    mandiRange: "Mandi Range:",
    dailyArrivals: "Daily Arrivals:",
    aiArbitrage: "AI Arbitrage Advice",
    alertTooltip: "Set price movement alert",
    colCropMandi: "Crop & Mandi Hub",
    colModalPrice: "Modal Rate & Wholesale Benchmark",
    colRangeArrivals: "Price Range & Volume",
    colActions: "Action & Alert",
    noResults: "No crops found matching your filters.",
    tradersAssociationTitle: "Local Wholesale Traders & Commission Agents Association · Official Benchmark",
    tradersAssociationSubtitle: "Certified baseline wholesale pricing agreed upon by licensed merchant desks at Nashik, Lasalgaon, Pune & Vashi APMCs",
    viewBulletinBtn: "View Association Bulletin",
    syncTradersFeed: "Sync Traders Association Feed",
    syncedToast: "Synced with Local Traders Association live wholesale auction benchmark!",
    lastBidLabel: "Last Auction Bid:",
    bulletinModalTitle: "Local Traders Association - Official Daily Wholesale Benchmark Bulletin",
    bulletinModalSubtitle: "Certified under Maharashtra Agricultural Produce Marketing (Regulation) Act as statutory price discovery",
    officialSeal: "Official Seal & Signatures",
    copyBulletin: "Copy Benchmark Summary",
    copiedToast: "Official Wholesale Benchmark copied to clipboard!",
    close: "Close",
    bulletinRef: "Bulletin Ref:",
    validForDate: "Effective Date:",
    presidentSign: "President - Sanjay Patil",
    secretarySign: "General Secretary - Vilas Shinde",
    registeredOffice: "Central Desk: APMC Administrative Bhavan, Nashik-Pune Regional Produce Floor",
    statutoryNote: "These wholesale benchmark rates are certified by the Local Traders Association at the opening of trade. Farmers can cite this benchmark as a reference floor for lot negotiations.",
  },
};

export const FarmerMarketIntelligence: React.FC<FarmerMarketIntelligenceProps> = ({
  currentLang = "mr",
  onOpenAiCompare,
}) => {
  const safeLang: Language =
    currentLang === "en" || currentLang === "hi" || currentLang === "mr"
      ? currentLang
      : "mr";
  const t = tMandi[safeLang] || tMandi.mr;

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [prices, setPrices] = useState<MandiPrice[]>(() => getDynamicMandiPrices());
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMandi, setSelectedMandi] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [alertSetCrop, setAlertSetCrop] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBulletinModalOpen, setIsBulletinModalOpen] = useState(false);

  // Trading session calculation
  const sessionInfo: TradingSessionInfo = useMemo(() => {
    return getTradingSessionInfo(currentTime);
  }, [currentTime]);

  // Association bulletin metadata
  const bulletinInfo = useMemo(() => {
    return getAssociationBulletinInfo(currentTime);
  }, [currentTime]);

  // Timely auto-update: polls the traders association feed every 35 seconds to reflect live bidding
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setPrices((prev) => simulateTimelyTradersAssociationTick(prev, now));
    }, 35000);

    return () => clearInterval(timer);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    const now = new Date();
    setCurrentTime(now);
    setPrices((prev) => simulateTimelyTradersAssociationTick(prev, now));

    setToastMessage(t.syncedToast);
    setTimeout(() => {
      setIsSyncing(false);
    }, 700);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyBulletin = () => {
    const summary = prices
      .slice(0, 6)
      .map(
        (p) =>
          `• ${p.crop} (${p.mandi}): Modal ₹${p.modalPrice}/kg | Assoc Benchmark ₹${p.associationBenchmark}/kg`
      )
      .join("\n");

    const copyText = `📜 ${bulletinInfo.associationName[safeLang]}\n${t.bulletinRef} ${bulletinInfo.refId}\n${t.validForDate} ${bulletinInfo.dateStr}\n\n${summary}\n\n${bulletinInfo.marketNotice[safeLang]}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(() => {
        setToastMessage(t.copiedToast);
        setTimeout(() => setToastMessage(null), 3000);
      });
    }
  };

  const mandis = [
    "All",
    "Nashik APMC",
    "Lasalgaon APMC",
    "Pune Gultekdi",
    "Vashi APMC",
    "Nagpur Kalamna",
    "Latur Mandi",
    "Solapur APMC",
  ];

  const categories = [
    { key: "All", label: t.allCategories },
    { key: "Vegetables", label: t.vegetables },
    { key: "Fruits", label: t.fruits },
    { key: "Grains", label: t.grains },
    { key: "Cash Crops", label: t.cashCrops },
  ];

  const filteredPrices = prices.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.variety && item.variety.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMandi =
      selectedMandi === "All" ||
      item.mandi.toLowerCase().includes(selectedMandi.toLowerCase().replace(" apmc", "").replace(" mandi", ""));
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesMandi && matchesCategory;
  });

  const handleSetAlert = (crop: string) => {
    setAlertSetCrop(crop);
    setTimeout(() => setAlertSetCrop(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Mandi Intelligence & Local Wholesale Benchmark Banner with Image as Backdrop */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl group min-h-[440px] sm:min-h-[480px] md:min-h-[510px] flex flex-col justify-between">
        {/* Background Image: APMC Mandi wholesale market photo with farmer viewing live market rates on smartphone */}
        <img
          src={mandiMarketPriceBgImg}
          alt="APMC Krishi Utpanna Bazar Samiti Mandi Yard with farmer viewing live rates on smartphone at sunrise"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Translucent Overlay to ensure the background is vivid yet readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/25 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-transparent to-slate-950/35 pointer-events-none" />

        {/* Tricolor micro-accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />

        {/* Floating Backdrop Cards: Transparent Glass with Clear High-Contrast Text */}
        <div className="relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 flex-1">
          {/* Top Header Card: Title & Live Feed Controls - Transparent Glass */}
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-4 sm:p-5 rounded-2xl border border-white/25 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-black/35 text-emerald-300 border border-white/20 flex items-center justify-center shrink-0 shadow-md backdrop-blur-xs">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  <span>{t.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-semibold hidden sm:block mt-1 max-w-2xl leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {t.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
              <span className="text-xs text-emerald-200 bg-black/35 px-3.5 py-1.5 rounded-xl border border-emerald-400/40 font-bold flex items-center gap-2 shadow-xs backdrop-blur-[2px] drop-shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {t.liveBadge}
              </span>
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-white hover:text-emerald-200 text-xs font-black transition-all shadow-md cursor-pointer border border-white/35 hover:border-emerald-400/80 active:scale-95 backdrop-blur-[2px]"
                title={t.syncTradersFeed}
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? "animate-spin" : ""}`} />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.syncTradersFeed}</span>
              </button>
            </div>
          </div>

          {/* Middle Transparent Stat Cards: Showing key mandi intelligence metrics while allowing the background image to remain clearly visible */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-1">
            <div className="bg-black/20 hover:bg-black/30 backdrop-blur-[2px] p-3 rounded-xl border border-white/20 text-white shadow-md transition-all">
              <span className="text-[11px] text-emerald-300 font-bold block drop-shadow-sm">
                {t.statLiveMandis}
              </span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                {t.statLiveMandisVal}
              </span>
              <span className="text-[10px] text-slate-200 font-medium block mt-0.5">
                Nashik, Pune, Lasalgaon, Vashi
              </span>
            </div>

            <div className="bg-black/20 hover:bg-black/30 backdrop-blur-[2px] p-3 rounded-xl border border-white/20 text-white shadow-md transition-all">
              <span className="text-[11px] text-amber-300 font-bold block drop-shadow-sm">
                {t.statEnam}
              </span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                {t.statEnamVal}
              </span>
              <span className="text-[10px] text-slate-200 font-medium block mt-0.5">
                Verified Benchmark Desks
              </span>
            </div>

            <div className="bg-black/20 hover:bg-black/30 backdrop-blur-[2px] p-3 rounded-xl border border-white/20 text-white shadow-md transition-all">
              <span className="text-[11px] text-emerald-300 font-bold block drop-shadow-sm">
                {t.statArrivals}
              </span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                {t.statArrivalsVal}
              </span>
              <span className="text-[10px] text-slate-200 font-medium block mt-0.5">
                Across 24 Fresh Lots & Grains
              </span>
            </div>

            <div className="bg-black/20 hover:bg-black/30 backdrop-blur-[2px] p-3 rounded-xl border border-white/20 text-white shadow-md transition-all">
              <span className="text-[11px] text-amber-300 font-bold block drop-shadow-sm">
                {t.statArbitrage}
              </span>
              <span className="text-base sm:text-lg font-black text-amber-200 mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                {t.statArbitrageVal}
              </span>
              <span className="text-[10px] text-slate-200 font-medium block mt-0.5">
                AI Inter-Mandi Price Difference
              </span>
            </div>
          </div>

          {/* Bottom Card: Local Wholesale Traders Association Benchmark - Transparent Glass */}
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] p-4 sm:p-5 rounded-2xl border border-white/25 shadow-xl space-y-3.5 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-black/35 text-emerald-300 border border-white/20 flex items-center justify-center shrink-0 shadow-md backdrop-blur-xs">
                <Award className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-black/35 text-emerald-300 px-3 py-1 rounded-md flex items-center gap-1.5 border border-emerald-400/50 backdrop-blur-[2px] shadow-sm drop-shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.tradersAssociationTitle}</span>
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 bg-black/35 px-2.5 py-1 rounded-md border border-amber-400/40 backdrop-blur-[2px]">
                    <span>🟡🟡</span>
                    <span>{sessionInfo.statusBadge[safeLang]}</span>
                  </span>
                  <span className="text-[11px] text-slate-100 bg-black/35 px-2.5 py-1 rounded-md border border-white/20 font-mono backdrop-blur-[2px]">
                    {bulletinInfo.refId}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-100 font-semibold leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.tradersAssociationSubtitle} ·{" "}
                  <span className="text-emerald-300 font-bold bg-black/35 px-2.5 py-0.5 rounded-md border border-emerald-500/40 backdrop-blur-[2px]">
                    {sessionInfo.timeWindow}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsBulletinModalOpen(true)}
              id="view-association-bulletin-btn"
              className="w-full py-3 bg-black/30 hover:bg-black/45 backdrop-blur-[2px] text-white hover:text-emerald-200 font-black text-xs sm:text-sm rounded-xl shadow-lg border-2 border-white/35 hover:border-emerald-400/80 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] tracking-wide">
                {t.viewBulletinBtn}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-700 outline-hidden cursor-pointer"
            >
              {mandis.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? t.allMandis : m}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-700 outline-hidden cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {alertSetCrop && (
          <div className="p-2.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>
              <strong>{alertSetCrop}</strong> {t.alertPrefix} {t.alertSuffix}
            </span>
          </div>
        )}
      </div>

      {/* Column Headers for Medium & Large screens */}
      <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-[11px] font-bold uppercase text-slate-500 bg-slate-100/90 rounded-xl border border-slate-200 shadow-2xs">
        <div className="col-span-4">{t.colCropMandi}</div>
        <div className="col-span-4">{t.colModalPrice}</div>
        <div className="col-span-2">{t.colRangeArrivals}</div>
        <div className="col-span-2 text-right pr-2">{t.colActions}</div>
      </div>

      {/* Prices Horizontal Strip Cards */}
      <div className="flex flex-col gap-2.5">
        {filteredPrices.map((item) => {
          const change = item.priceChangePercent ?? 0;
          const isUp = change >= 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3.5 sm:px-4 sm:py-3 border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center text-slate-800"
            >
              {/* Col 1: Crop Name, Variety & Mandi Location (col-span-4) */}
              <div className="col-span-4 flex items-center w-full">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {item.crop}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {item.variety || item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">{item.mandi}</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 2: Modal (Benchmark) Rate & Association Benchmark Badge (col-span-4) */}
              <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between md:justify-start gap-3 w-full md:w-auto md:border-l md:border-slate-100 md:pl-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                    {t.modalBenchmark}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                      ₹{item.modalPrice.toFixed(1)}
                    </span>
                    <span className="text-xs font-medium text-slate-500">/ kg</span>

                    <span
                      className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ml-1 ${
                        isUp
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isUp ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      <span>
                        {isUp ? "+" : ""}
                        {change}%
                      </span>
                    </span>
                  </div>
                </div>

                {/* Local Traders Association Official Benchmark Tag */}
                {item.associationBenchmark && (
                  <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg px-2.5 py-1 text-left sm:text-right">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wider">
                      {t.assocBenchmarkLabel}
                    </span>
                    <span className="text-xs font-black text-amber-900">
                      ₹{item.associationBenchmark.toFixed(1)} / kg
                    </span>
                  </div>
                )}
              </div>

              {/* Col 3: Mandi Range & Daily Arrivals (col-span-2) */}
              <div className="col-span-2 grid grid-cols-2 md:grid-cols-1 gap-1.5 w-full md:border-l md:border-slate-100 md:pl-4 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                    {t.mandiRange}
                  </span>
                  <span className="font-bold text-slate-800 text-xs block whitespace-nowrap">
                    ₹{item.minPrice} - ₹{item.maxPrice}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                    {t.dailyArrivals}
                  </span>
                  <span className="font-bold text-slate-800 text-xs block whitespace-nowrap">
                    {item.arrivalsTonnes} MT
                  </span>
                </div>
              </div>

              {/* Col 4: Action Buttons (col-span-2) */}
              <div className="col-span-2 flex items-center justify-end gap-2 w-full pt-2 md:pt-0 border-t border-slate-100 md:border-t-0 md:border-l md:border-slate-100 md:pl-4">
                <button
                  type="button"
                  onClick={() => onOpenAiCompare(item.crop)}
                  className="flex-1 md:flex-initial px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                  title={t.aiArbitrage}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">{t.aiArbitrage}</span>
                  <span className="xl:hidden">AI Advice</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetAlert(item.crop)}
                  className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer shrink-0"
                  title={t.alertTooltip}
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredPrices.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            {t.noResults}
          </div>
        )}
      </div>

      {/* Official Traders Association Wholesale Benchmark Modal Bulletin */}
      {isBulletinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            {/* Bulletin Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md inline-block">
                    {bulletinInfo.refId}
                  </span>
                  <h3 className="text-base font-bold mt-1 leading-snug">
                    {t.bulletinModalTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {bulletinInfo.associationName[safeLang]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulletinModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bulletin Body */}
            <div className="p-5 space-y-4 text-slate-800 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>
                    <strong>{t.validForDate}</strong> {bulletinInfo.dateStr}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>
                    <strong>सत्र / Session:</strong> {sessionInfo.sessionName[safeLang]}
                  </span>
                </div>
              </div>

              {/* Wholesale Benchmark Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">पीक / Commodity</th>
                      <th className="p-2.5">बाजार समिती / Mandi</th>
                      <th className="p-2.5 text-right">व्यापारी बेंचमार्क</th>
                      <th className="p-2.5 text-right">APMC Modal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {prices.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80">
                        <td className="p-2.5 font-bold text-slate-900">{p.crop}</td>
                        <td className="p-2.5 text-slate-600">{p.mandi}</td>
                        <td className="p-2.5 text-right font-black text-amber-700 bg-amber-50/40">
                          ₹{p.associationBenchmark?.toFixed(1) || p.modalPrice.toFixed(1)} / kg
                        </td>
                        <td className="p-2.5 text-right font-bold text-slate-800">
                          ₹{p.modalPrice.toFixed(1)} / kg
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statutory Note */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>{t.statutoryNote}</p>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    {t.officialSeal}
                  </span>
                  <span className="font-bold text-slate-800 text-xs block mt-1">
                    {t.presidentSign}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    महाराष्ट्र राज्य व्यापारी महासंघ
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    प्रमाणित डिजिटल स्वाक्षरी
                  </span>
                  <span className="font-bold text-slate-800 text-xs block mt-1">
                    {t.secretarySign}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    नाशिक-पुणे घाऊक अडते कक्ष
                  </span>
                </div>
              </div>
            </div>

            {/* Bulletin Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={handleCopyBulletin}
                className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyBulletin}</span>
              </button>

              <button
                onClick={() => setIsBulletinModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
