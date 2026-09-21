import React, { useState } from "react";
import {
  ArrowRightLeft,
  ShoppingBag,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import { Language } from "../../translations";
import freshMarketCratesBg from "../../assets/images/fresh_market_crates_1789938996716.jpg";

interface BuyerMarketComparisonProps {
  onGoToMarketplace: () => void;
  currentLang?: Language;
}

const tMarketComparison = {
  mr: {
    heroBadge: "खरेदीदारांसाठी थेट शेतमाल नफा",
    heroTitle: "बाजार भाव तुलना: थेट शेती खरेदी वि. किरकोळ सुपरमार्केट",
    heroSubtitle: "३-४ दलालांना वगळा. भाजीपाल्यावर २५% ते ४०% बचत मिळवा आणि शेतकऱ्याला ३०% अधिक नफा मिळवून द्या.",
    shopBtn: "थेट शेतमाल खरेदी करा",
    tableTitle: "थेट चालू बाजार भाव तुलना (पुणे विभाग)",
    tableSubtitle: "आजच्या घाऊक बाजार समिती, ई-कॉमर्स व स्थानिक दुकानांच्या भावांसह अद्ययावत",
    colProduce: "शेतमाल व गुणवत्ता",
    colFarmDirect: "KrishiVistar थेट शेती दर",
    colLocalVendor: "स्थानिक भाजी विक्रेता",
    colSupermarket: "सुपरमार्केट / ॲप्स",
    colSavings: "तुमची थेट बचत",
    saveKg: "प्रति किलो बचत: ₹",
    off: "सूट",
    calcTitle: "कुटुंबाचे मासिक बचत कॅल्क्युलेटर",
    calcSubtitle: "थेट शेतकऱ्यांकडून खरेदी करून तुमचे कुटुंब किंवा व्यवसाय दरमहा किती पैसे वाचवू शकतो ते पहा",
    calcLabel: "मासिक भाजीपाला व फळांचा एकूण वापर:",
    familySmall: "लहान कुटुंब (२५ किलो)",
    familyAvg: "मध्यम कुटुंब (६० किलो)",
    familyBulk: "घाऊक / मेस (३०० किलो)",
    estSavingsTitle: "अंदाजे मासिक बचत",
    estSavingsNote: "+ शून्य दलाल + १००% ताज्या शेतमालाची खात्री",
    orderNow: "आत्ताच मागवा",
  },
  hi: {
    heroBadge: "खरीदारों के लिए प्रत्यक्ष कृषि लाभ",
    heroTitle: "बाजार मूल्य तुलना: सीधे खेत से बनाम खुदरा सुपरमार्केट",
    heroSubtitle: "३-४ बिचौलियों को हटाएं। २५% से ४०% कम किराने का बिल पाएं और किसानों को ३०% अधिक मुनाफा सुनिश्चित करें।",
    shopBtn: "सीधे खेत दरों पर खरीदें",
    tableTitle: "लाइव बेंचमार्क मूल्य तुलना (पुणे क्षेत्र)",
    tableSubtitle: "आज की थोक मंडी, क्विक कॉमर्स और स्थानीय खुदरा दुकानों के अनुसार अद्यतन",
    colProduce: "उत्पाद एवं गुणवत्ता",
    colFarmDirect: "KrishiVistar प्रत्यक्ष फार्म दर",
    colLocalVendor: "स्थानीय सब्जी विक्रेता",
    colSupermarket: "सुपरमार्केट / ऐप्स",
    colSavings: "आपकी सीधी बचत",
    saveKg: "प्रति किग्रा बचत: ₹",
    off: "छूट",
    calcTitle: "घरेलू मासिक बचत कैलकुलेटर",
    calcSubtitle: "देखें कि सीधे किसानों से खरीदारी करके आपका परिवार या व्यवसाय हर महीने कितनी बचत करता है",
    calcLabel: "मासिक सब्जी एवं फल खपत:",
    familySmall: "छोटा परिवार (२५ किग्रा)",
    familyAvg: "औसत परिवार (६० किग्रा)",
    familyBulk: "थोक / मेस (३०० किग्रा)",
    estSavingsTitle: "अनुमानित मासिक बचत",
    estSavingsNote: "+ शून्य बिचौलिए + १००% खेत की ताजगी गारंटी",
    orderNow: "अभी ऑर्डर करें",
  },
  en: {
    heroBadge: "Direct Farm Arbitrage for Buyers",
    heroTitle: "Market Comparison: Direct Farm vs Retail Supermarkets",
    heroSubtitle: "Cut out 3-4 commission agents. Enjoy 25% to 40% lower grocery bills while ensuring farmers receive 30% higher net realization.",
    shopBtn: "Shop Direct Farm Rates",
    tableTitle: "Live Benchmark Price Comparison (Pune Region)",
    tableSubtitle: "Updated with today's wholesale APMC, quick commerce apps, and local retail stores",
    colProduce: "Produce & Quality",
    colFarmDirect: "KrishiVistar Farm Direct",
    colLocalVendor: "Local Vegetable Vendor",
    colSupermarket: "Supermarket / Apps",
    colSavings: "Your Direct Savings",
    saveKg: "Save ₹",
    off: "OFF",
    calcTitle: "Household Monthly Savings Calculator",
    calcSubtitle: "See how much your family or business saves every month by buying direct from farmers",
    calcLabel: "Total Monthly Vegetable & Fruit Consumption:",
    familySmall: "Small Family (25 kg)",
    familyAvg: "Average Home (60 kg)",
    familyBulk: "Wholesale / Hostel (300 kg)",
    estSavingsTitle: "Estimated Monthly Savings",
    estSavingsNote: "+ Zero middlemen + 100% farm freshness guaranteed",
    orderNow: "Order Now",
  },
};

export const BuyerMarketComparison: React.FC<BuyerMarketComparisonProps> = ({
  onGoToMarketplace,
  currentLang = "en",
}) => {
  const t = tMarketComparison[currentLang] || tMarketComparison.en;
  const [monthlyKg, setMonthlyKg] = useState(60);

  const priceComparisons = [
    {
      crop: "Tomato (Grade A Firm Red)",
      directFarmPrice: 32,
      localVendorPrice: 42,
      supermarketPrice: 48,
      savingsPercent: 33,
      freshness: "Harvested Today (4 hrs from farm)",
      supermarketFreshness: "Stored 4–6 days in transit warehouse",
    },
    {
      crop: "Red Onion (Nashik Medium)",
      directFarmPrice: 28,
      localVendorPrice: 36,
      supermarketPrice: 40,
      savingsPercent: 30,
      freshness: "Farm-cured, zero sprouting",
      supermarketFreshness: "Re-packed, variable moisture",
    },
    {
      crop: "Potato (Jyoti Grade A)",
      directFarmPrice: 22,
      localVendorPrice: 28,
      supermarketPrice: 32,
      savingsPercent: 31,
      freshness: "Fresh soil dug, unwashed natural skin",
      supermarketFreshness: "Cold-treated, sweetened skin",
    },
    {
      crop: "Table Grapes (Thomson)",
      directFarmPrice: 75,
      localVendorPrice: 105,
      supermarketPrice: 125,
      savingsPercent: 40,
      freshness: "Export berry bloom intact",
      supermarketFreshness: "Sulfur-padded punnets",
    },
  ];

  const averageSavingPerKg = 12; // approx ₹12/kg saved vs supermarket
  const projectedMonthlySavings = monthlyKg * averageSavingPerKg;

  return (
    <div className="space-y-6">
      {/* Header Banner with Fresh Market Produce Background Image */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 text-white shadow-2xl relative overflow-hidden border border-slate-700/60 group">
        {/* Background Image: Fresh market produce crates with ripe tomatoes, peppers, lemons & chalk price tags */}
        <img
          src={freshMarketCratesBg}
          alt="Fresh market produce crates with tomatoes, peppers, lemons and price tags"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Atmospheric Gradient Overlays: keeps produce colors rich while ensuring 100% crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/70 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/25 pointer-events-none z-0" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-emerald-400/50 text-emerald-300 text-xs font-bold mb-2.5 shadow-xs backdrop-blur-[2px]">
              <PiggyBank className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.heroBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 mt-1 max-w-2xl leading-relaxed font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {t.heroSubtitle}
            </p>
          </div>

          <button
            onClick={onGoToMarketplace}
            className="px-4 py-2.5 bg-black/35 hover:bg-black/55 text-white hover:text-emerald-200 border-2 border-white/35 hover:border-emerald-400/80 font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all self-start md:self-center shrink-0 cursor-pointer backdrop-blur-[2px] active:scale-98"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.shopBtn}</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 font-display mb-1">
          {t.tableTitle}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {t.tableSubtitle}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <th className="p-3">{t.colProduce}</th>
                <th className="p-3 text-emerald-700 font-extrabold">{t.colFarmDirect}</th>
                <th className="p-3 text-slate-600">{t.colLocalVendor}</th>
                <th className="p-3 text-slate-600">{t.colSupermarket}</th>
                <th className="p-3 font-bold text-slate-900">{t.colSavings}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priceComparisons.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{item.crop}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                      ✓ {item.freshness}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                      ₹{item.directFarmPrice} / kg
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">₹{item.localVendorPrice} / kg</td>
                  <td className="p-3 text-slate-400 line-through">₹{item.supermarketPrice} / kg</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-emerald-700">
                        {t.saveKg}{item.supermarketPrice - item.directFarmPrice} / kg
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                        ({item.savingsPercent}% {t.off})
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Savings Calculator */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {t.calcTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.calcSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {t.calcLabel}{" "}
              <strong className="text-emerald-700 text-sm">{monthlyKg} kg</strong>
            </label>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={monthlyKg}
              onChange={(e) => setMonthlyKg(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>{t.familySmall}</span>
              <span>{t.familyAvg}</span>
              <span>{t.familyBulk}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                {t.estSavingsTitle}
              </span>
              <span className="text-3xl font-black text-emerald-900 font-display mt-0.5 block">
                ₹{projectedMonthlySavings.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-emerald-700 mt-0.5 block">
                {t.estSavingsNote}
              </span>
            </div>

            <button
              onClick={onGoToMarketplace}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{t.orderNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
