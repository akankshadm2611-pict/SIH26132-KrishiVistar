import React, { useState } from "react";
import {
  CloudSun,
  TrendingUp,
  ArrowRightLeft,
  Package,
  Users,
  ShieldAlert,
  PhoneCall,
  Warehouse,
  Truck,
  CreditCard,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { Language, UserRole } from "../types";
import { FarmerTab } from "./farmer/FarmerDashboard";

interface FeatureExplorerGridProps {
  activeTab: FarmerTab;
  onSelectTab: (tab: FarmerTab) => void;
  currentLang: Language;
}

interface FeatureItem {
  id: FarmerTab;
  title: { en: string; hi: string; mr: string };
  categoryKey: "all" | "weather" | "market" | "selling" | "support" | "livestock";
  desc: { en: string; hi: string; mr: string };
  badge?: { en: string; hi: string; mr: string };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  iconBg: string;
}

const features: FeatureItem[] = [
  {
    id: "weather",
    categoryKey: "weather",
    title: {
      en: "Weather Prediction",
      hi: "मौसम भविष्यवाणी",
      mr: "हवामान अंदाज",
    },
    desc: {
      en: "7-day rain forecast, storm probability, and early harvest warnings.",
      hi: "७ दिनों का बारिश पूर्वानुमान और सुरक्षित फसल कटाई की सलाह।",
      mr: "७ दिवसांचा पाऊस अंदाज, वादळ इशारा व सुरक्षित पीक काढणी सल्ला.",
    },
    badge: { en: "Live Alert", hi: "लाइव अलर्ट", mr: "थेट इशारा" },
    icon: CloudSun,
    color: "text-sky-600",
    borderColor: "hover:border-sky-400",
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    id: "mandi",
    categoryKey: "market",
    title: {
      en: "Current Mandi Price",
      hi: "वर्तमान मंडी भाव",
      mr: "चालू बाजारभाव",
    },
    desc: {
      en: "Agmarknet APMC arrivals, modal rates for tomatoes, onions, grains.",
      hi: "एपीएमसी मंडी भाव, दैनिक आवक और उच्चतम-न्यूनतम दरें।",
      mr: "एपीएमसी थेट बाजारभाव, टोमॅटो, कांदा व धान्याची दैनिक आवक.",
    },
    badge: { en: "Updated Today", hi: "आज अपडेटेड", mr: "आजचे भाव" },
    icon: TrendingUp,
    color: "text-emerald-600",
    borderColor: "hover:border-emerald-400",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "trends",
    categoryKey: "market",
    title: {
      en: "Price Trends",
      hi: "मूल्य रुझान",
      mr: "दर कल अंदाज",
    },
    desc: {
      en: "AI price forecasts and recommendations on when to sell for profit.",
      hi: "मूल्य रुझान ग्राफ और अधिकतम लाभ के लिए बिक्री समय का अनुमान।",
      mr: "किंमत चढ-उतार आलेख आणि जास्तीत जास्त नफ्यासाठी विक्रीची योग्य वेळ.",
    },
    icon: TrendingUp,
    color: "text-indigo-600",
    borderColor: "hover:border-indigo-400",
    iconBg: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "compare",
    categoryKey: "market",
    title: {
      en: "Multi-Market Net Profit Compare",
      hi: "मल्टी-मंडी तुलना व शुद्ध लाभ",
      mr: "बहु-बाजार तुलना व निव्वळ नफा",
    },
    desc: {
      en: "Nashik vs Pune vs Mumbai after deducting transport & mandi cess.",
      hi: "परिवहन खर्च घटाकर मुंबई, पुणे व नासिक के शुद्ध मुनाफे की तुलना।",
      mr: "वाहतूक खर्च वजा जाता नाशिक, पुणे व मुंबईच्या निव्वळ नफ्याची तुलना.",
    },
    icon: ArrowRightLeft,
    color: "text-violet-600",
    borderColor: "hover:border-violet-400",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    id: "lots",
    categoryKey: "selling",
    title: {
      en: "Produce Lots & Crop Selling",
      hi: "फसल लॉट प्रबंधन व बिक्री",
      mr: "शेतमाल लॉट नोंदणी व विक्री",
    },
    desc: {
      en: "List your harvest with photos, quality grades, and asking prices.",
      hi: "फोटो, ग्रेड व भाव के साथ फसल का लॉट बनाकर खरीदार बोलियां पाएं।",
      mr: "फोटो, प्रत व अपेक्षित दर टाकून शेतमाल लॉट नोंदवा व बोली मिळवा.",
    },
    badge: { en: "Sell Direct", hi: "सीधी बिक्री", mr: "थेट विक्री" },
    icon: Package,
    color: "text-emerald-700",
    borderColor: "hover:border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "matching",
    categoryKey: "selling",
    title: {
      en: "Buyer Matching & Live Bids",
      hi: "खरीदार बोलियां व सीधी डील",
      mr: "खरेदीदार जुळवणी व थेट बोली",
    },
    desc: {
      en: "Instant offers from verified supermarkets and wholesale traders.",
      hi: "सत्यापित व्यापारियों व सुपरमार्केट्स से बोलियां स्वीकारें।",
      mr: "प्रमाणित सुपरमार्केट व व्यापाऱ्यांकडून थेट स्पर्धात्मक बोली स्वीकारा.",
    },
    icon: Users,
    color: "text-blue-600",
    borderColor: "hover:border-blue-400",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    id: "calamity",
    categoryKey: "support",
    title: {
      en: "Govt Schemes",
      hi: "सरकारी योजनाएं",
      mr: "शासकीय योजना",
    },
    desc: {
      en: "Official Indian Govt schemes (PMFBY, MahaDBT, SDRF), direct portal forms & e-Panchnama.",
      hi: "आधिकारिक सरकारी योजनाएं (PMFBY, MahaDBT, SDRF), सीधा पोर्टल आवेदन व ई-पंचनामा।",
      mr: "भारतीय शासकीय योजना (PMFBY, महाडीबीटी, SDRF), अधिकृत पोर्टल अर्ज व ई-पंचनामा.",
    },
    badge: { en: "AI Scheme Engine", hi: "AI सरकारी योजना", mr: "AI शासकीय योजना" },
    icon: ShieldAlert,
    color: "text-emerald-700",
    borderColor: "hover:border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "cattle",
    categoryKey: "livestock",
    title: {
      en: "Cattle and Livestock",
      hi: "पशुधन एवं मवेशी",
      mr: "पशुधन व जनावरे",
    },
    desc: {
      en: "Direct phone numbers, dairy cows, buffaloes, Gir & Murrah breeds.",
      hi: "फोन नंबर सहित स्थानीय पशुपालकों की सूची, गाय, भैंस व बैल।",
      mr: "थेट फोन नंबर, स्थानिक पशुपालक, दुभत्या गाई, म्हशी व देशी बैल जाती.",
    },
    badge: { en: "Contacts Verified", hi: "सत्यापित नंबर", mr: "प्रमाणित फोन" },
    icon: PhoneCall,
    color: "text-amber-700",
    borderColor: "hover:border-amber-500",
    iconBg: "bg-amber-100 text-amber-800",
  },
  {
    id: "storage",
    categoryKey: "support",
    title: {
      en: "Cold Storage",
      hi: "कोल्ड स्टोरेज",
      mr: "शीतगृह",
    },
    desc: {
      en: "Nearby temperature-controlled storage to prevent spoilage.",
      hi: "फसल को सड़ने से बचाने के लिए नजदीकी कोल्ड स्टोरेज की उपलब्धता।",
      mr: "शेतमाल खराब होण्यापासून वाचवण्यासाठी जवळच्या शीतगृहांची उपलब्धता.",
    },
    icon: Warehouse,
    color: "text-cyan-600",
    borderColor: "hover:border-cyan-400",
    iconBg: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "logistics",
    categoryKey: "support",
    title: {
      en: "Transport System",
      hi: "परिवहन व्यवस्था",
      mr: "वाहतूक व्यवस्था",
    },
    desc: {
      en: "Book 1T to 10T mini-trucks with per-km estimated rates.",
      hi: "किफायती प्रति किमी दर पर मिनी-ट्रक और पिकअप वाहन बुकिंग।",
      mr: "प्रति किमी अंदाजे दरांसह मिनी-ट्रक व टेम्पो वाहन बुकिंग.",
    },
    icon: Truck,
    color: "text-emerald-600",
    borderColor: "hover:border-emerald-400",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "finance",
    categoryKey: "support",
    title: {
      en: "Farm Finance & Kisan Credit Card",
      hi: "कृषि वित्त, केसीसी व ऋण",
      mr: "कृषी वित्त, किसान क्रेडिट कार्ड व कर्ज",
    },
    desc: {
      en: "KCC low-interest credit, subsidy schemes, and escrow payments.",
      hi: "कम ब्याज पर केसीसी ऋण, सरकारी सब्सिडी और एस्क्रो बैंक भुगतान।",
      mr: "कमी व्याजाचे KCC कर्ज, शासकीय अनुदान योजना व सुरक्षित एस्क्रो देयके.",
    },
    icon: CreditCard,
    color: "text-amber-600",
    borderColor: "hover:border-amber-400",
    iconBg: "bg-amber-100 text-amber-700",
  },
];

export const FeatureExplorerGrid: React.FC<FeatureExplorerGridProps> = ({
  activeTab,
  onSelectTab,
  currentLang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: { en: "All Features", hi: "सभी फीचर्स", mr: "सर्व वैशिष्ट्ये" } },
    { id: "weather", label: { en: "Weather & Rain", hi: "मौसम व वर्षा", mr: "हवामान व पाऊस" } },
    { id: "market", label: { en: "Mandi & Prices", hi: "मंडी व भाव", mr: "बाजारभाव व कल" } },
    { id: "selling", label: { en: "Selling & Bids", hi: "फसल बिक्री", mr: "शेतमाल विक्री" } },
    { id: "support", label: { en: "Govt & Support", hi: "सरकारी योजना", mr: "शासकीय योजना व मदत" } },
    { id: "livestock", label: { en: "Cattle & Livestock", hi: "पशुधन", mr: "जनावरे व पशुपालक" } },
  ];

  const filteredFeatures =
    selectedCategory === "all"
      ? features
      : features.filter((f) => f.categoryKey === selectedCategory);

  return (
    <div className="bg-white rounded-lg border border-slate-300 p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span>
              {currentLang === "mr"
                ? "KrishiVistar सर्व वैशिष्ट्ये (Quick Feature Finder)"
                : currentLang === "hi"
                ? "KrishiVistar सभी फीचर्स (Quick Feature Finder)"
                : "KrishiVistar All Features (Quick Feature Finder)"}
            </span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            {currentLang === "mr"
              ? "आपल्याला आवश्यक असलेल्या कोणत्याही सुविधेवर थेट क्लिक करा:"
              : currentLang === "hi"
              ? "अपनी आवश्यकता के अनुसार किसी भी सुविधा पर तुरंत क्लिक करें:"
              : "Click on any feature below to navigate instantly:"}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer text-xs ${
                selectedCategory === cat.id
                  ? "bg-[#0f2d4a] text-white shadow-2xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              {cat.label[currentLang] || cat.label.en}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-1">
        {filteredFeatures.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`p-3.5 rounded-md border transition-all text-left flex flex-col justify-between cursor-pointer group relative ${
                isActive
                  ? "bg-slate-50 border-[#0f2d4a] shadow-xs ring-1 ring-[#0f2d4a]/20"
                  : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50/70 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center font-bold shrink-0 ${item.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                        {item.badge[currentLang] || item.badge.en}
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0f2d4a] text-white flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>
                          {currentLang === "mr"
                            ? "सक्रिय"
                            : currentLang === "hi"
                            ? "सक्रिय"
                            : "Active"}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0f2d4a] transition-colors">
                  {item.title[currentLang] || item.title.en}
                </h4>

                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {item.desc[currentLang] || item.desc.en}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-[#0f2d4a] group-hover:text-[#16436e]">
                <span>
                  {isActive
                    ? currentLang === "mr"
                      ? "सध्या पाहताय"
                      : currentLang === "hi"
                      ? "वर्तमान दृश्य"
                      : "Currently Viewing"
                    : currentLang === "mr"
                    ? "वैशिष्ट्य उघडा"
                    : currentLang === "hi"
                    ? "फीचर खोलें"
                    : "Open Feature"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
