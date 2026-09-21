import React, { useState } from "react";
import {
  TrendingUp,
  Bot,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  Warehouse,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { tomatoPriceForecast } from "../../mockData";
import { Language } from "../../translations";

interface FarmerPriceTrendProps {
  currentLang?: Language;
  onOpenAiAssistant: (query: string) => void;
  onNavigateToStorage: () => void;
}

const tTrend = {
  mr: {
    aiSaleWindowAdvice: "एआई दर कल सल्ला",
    highConfidence: "उच्च विश्वासार्हता मॉडेल (९४%)",
    headline: "पुढील २–३ दिवसांत टोमॅटोचे दर +१५% वाढण्याची शक्यता!",
    adviceText:
      "आपल्याकडे साठवणूक असल्यास थांबा, किंवा तात्काळ पैशांची गरज असल्यास विका. अंदाजित कमाल दर: गणेशोत्सवातील मागणीमुळे १५ सप्टेंबर रोजी ₹३८/किलो.",
    reserveStorage: "कोल्ड स्टोरेज आरक्षित करा",
    askAi: "एआई विश्लेषण विचारा",
    priceTrendTitle: "दर कल अंदाज",
    priceTrendSubtitle: "मागील बाजार आवक, सणासुदीची मागणी आणि हवामान घटकांवर आधारित विश्लेषण",
    crops: ["टोमॅटो (हायब्रिड)", "कांदा (लाल)", "बटाटा (ज्योती)", "द्राक्षे"],
    todayRate: "आजचा सरासरी भाव",
    todayDiff: "कालच्या तुलनेत +₹३ (+९%)",
    projectedPeak: "अपेक्षित कमाल भाव",
    expectedDate: "अपेक्षित १५–१६ सप्टेंबर",
    demandPressure: "मागणीचा दबाव",
    veryHigh: "अतिशय जास्त",
    retailDemand: "किरकोळ साखळी खरेदीदार सक्रिय",
    additionalGain: "अतिरिक्त नफा (२ टन लॉट)",
    gainSub: "२ दिवस शीतगृहात ठेवल्यास",
    historicalPrice: "नोंदवलेला प्रत्यक्ष भाव",
    predictedPrice: "एआय अंदाजित भाव",
    confidenceRange: "अंदाज मर्यादा (±₹२)",
    showConfidence: "अंदाज मर्यादा दाखवा",
    peakBadge: "कमाल ₹३८",
    aiPrompt: "मी माझे २००० किलो टोमॅटो आता ₹३३ ने विकावे की सोमवारपर्यंत ₹३८ साठी थांबून ठेवावे?",
  },
  hi: {
    aiSaleWindowAdvice: "एआई मूल्य रुझान सलाह",
    highConfidence: "उच्च सटीकता मॉडल (९४%)",
    headline: "अगले २–३ दिनों में टमाटर के भाव +१५% बढ़ने की संभावना!",
    adviceText:
      "यदि भंडारण उपलब्ध है तो प्रतीक्षा करें, या तत्काल नकदी के लिए अभी बेचें। अनुमानित उच्चतम भाव: त्योहारी खुदरा मांग के कारण १५ सितंबर को ₹३८/किलो।",
    reserveStorage: "कोल्ड स्टोरेज बुक करें",
    askAi: "एआई से पूछें",
    priceTrendTitle: "मूल्य रुझान",
    priceTrendSubtitle: "ऐतिहासिक मंडी आवक, त्योहारी मांग सूचकांक एवं मौसम के आधार पर तैयार",
    crops: ["टमाटर (हाइब्रिड)", "प्याज (लाल)", "आलू (ज्योति)", "अंगूर"],
    todayRate: "आज का औसत भाव",
    todayDiff: "कल की तुलना में +₹३ (+९%)",
    projectedPeak: "अनुमानित उच्चतम भाव",
    expectedDate: "अनुमानित १५–१६ सितंबर",
    demandPressure: "मांग का दबाव",
    veryHigh: "अत्यधिक",
    retailDemand: "खुदरा शृंखलाएं भारी मात्रा में खरीद रही हैं",
    additionalGain: "अतिरिक्त लाभ (२ टन लॉट)",
    gainSub: "२ दिन स्टोरेज में रखने पर",
    historicalPrice: "ऐतिहासिक वास्तविक भाव",
    predictedPrice: "एआई अनुमानित भाव",
    confidenceRange: "अनुमान दायरा (±₹२)",
    showConfidence: "अनुमान दायरा दिखाएं",
    peakBadge: "उच्चतम ₹३८",
    aiPrompt: "क्या मुझे अपने २००० किलो टमाटर अभी ₹३३ में बेचने चाहिए या सोमवार तक ₹३८ के लिए रुकना चाहिए?",
  },
  en: {
    aiSaleWindowAdvice: "AI Price Trends",
    highConfidence: "High Confidence Model (94%)",
    headline: "Tomato prices expected to rise +15% in next 2–3 days!",
    adviceText:
      "Wait if you have storage, or sell early if you need immediate cash. Projected price peak: ₹38/kg on Sep 15 (Monday) due to upcoming festive Ganesh retail surge.",
    reserveStorage: "Reserve Cold Storage",
    askAi: "Ask AI Analysis",
    priceTrendTitle: "Price Trends",
    priceTrendSubtitle: "Historical mandi arrivals correlated with festive demand indices and weather shocks",
    crops: ["Tomato (Hybrid)", "Onion (Red)", "Potato (Jyoti)", "Grapes"],
    todayRate: "Today's Modal Rate",
    todayDiff: "+₹3 (+9%) vs yesterday",
    projectedPeak: "Projected Peak Rate",
    expectedDate: "Expected Sep 15–16",
    demandPressure: "Demand Pressure",
    veryHigh: "Very High",
    retailDemand: "Retail chains buying heavily",
    additionalGain: "Additional Gain (2T Lot)",
    gainSub: "By holding 2 days in storage",
    historicalPrice: "Historical Actual Price",
    predictedPrice: "AI Predicted Price",
    confidenceRange: "Confidence Range (±₹2)",
    showConfidence: "Show Confidence Band",
    peakBadge: "PEAK ₹38",
    aiPrompt: "Should I sell my 2000kg tomatoes now at ₹33/kg or hold until Monday for ₹38/kg?",
  },
};

export const FarmerPriceTrend: React.FC<FarmerPriceTrendProps> = ({
  currentLang = "en",
  onOpenAiAssistant,
  onNavigateToStorage,
}) => {
  const t = tTrend[currentLang] || tTrend.en;
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  // SVG Chart Dimensions
  const chartWidth = 640;
  const chartHeight = 220;
  const paddingX = 45;
  const paddingY = 30;

  const minPrice = 20;
  const maxPrice = 45;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minPrice) / (maxPrice - minPrice)) * (chartHeight - paddingY * 2);
  };

  const getX = (index: number) => {
    return paddingX + (index / (tomatoPriceForecast.length - 1)) * (chartWidth - paddingX * 2);
  };

  // Build SVG paths
  const actualPoints = tomatoPriceForecast.filter((p) => p.actualPrice !== undefined);
  const actualPath = actualPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.actualPrice!)}`)
    .join(" ");

  const forecastPath = tomatoPriceForecast
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.predictedPrice)}`)
    .join(" ");

  const areaUpperLowerPath =
    tomatoPriceForecast.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.upperBound)}`).join(" ") +
    " " +
    tomatoPriceForecast
      .slice()
      .reverse()
      .map((p, i) => `L ${getX(tomatoPriceForecast.length - 1 - i)} ${getY(p.lowerBound)}`)
      .join(" ") +
    " Z";

  return (
    <div className="space-y-6">
      {/* Top AI Price Trends Recommendation Banner with white-greenish theme */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-white text-slate-900 shadow-sm border border-emerald-200/90 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-0.5 rounded-md shadow-2xs">
                  {t.aiSaleWindowAdvice}
                </span>
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {t.highConfidence}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1">
                {t.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                {t.adviceText}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onNavigateToStorage}
              id="reserve-storage-btn"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Warehouse className="w-4 h-4" />
              <span>{t.reserveStorage}</span>
            </button>
            <button
              onClick={() => onOpenAiAssistant(t.aiPrompt)}
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-700" />
              <span>{t.askAi}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Forecast Chart Section */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>{t.priceTrendTitle}</span>
              </h3>
            </div>
          </div>

          {/* Crop Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1 rounded-xl">
            {t.crops.map((crop, idx) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(idx)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCrop === idx
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Forecast Metrics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">{t.todayRate}</span>
            <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">₹33 / kg</span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> {t.todayDiff}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800 block">{t.projectedPeak}</span>
            <span className="text-xl font-extrabold text-emerald-900 mt-0.5 block">₹38 / kg</span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 mt-0.5">
              <Clock className="w-3 h-3" /> {t.expectedDate}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">{t.demandPressure}</span>
            <span className="text-xl font-extrabold text-amber-600 mt-0.5 block">{t.veryHigh}</span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">{t.retailDemand}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">{t.additionalGain}</span>
            <span className="text-xl font-extrabold text-emerald-700 mt-0.5 block">+₹10,000</span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">{t.gainSub}</span>
          </div>
        </div>

        {/* SVG Forecast Graph */}
        <div className="relative overflow-x-auto">
          <div className="min-w-[640px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56 select-none">
              {/* Horizontal Grid lines */}
              {[20, 25, 30, 35, 40, 45].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 4}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="end"
                      fontWeight="500"
                    >
                      ₹{val}
                    </text>
                  </g>
                );
              })}

              {/* Confidence Band Area */}
              {showConfidenceBands && (
                <path d={areaUpperLowerPath} fill="#ecfdf5" opacity="0.6" />
              )}

              {/* Forecast Dashed Line */}
              <path
                d={forecastPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* Actual Past Solid Line */}
              <path
                d={actualPath}
                fill="none"
                stroke="#047857"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {tomatoPriceForecast.map((pt, i) => {
                const x = getX(i);
                const y = getY(pt.actualPrice !== undefined ? pt.actualPrice : pt.predictedPrice);
                const isPeak = pt.predictedPrice === 38;
                const isToday = pt.day.includes("Today");

                return (
                  <g key={i}>
                    {/* Vertical guideline */}
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={chartHeight - paddingY}
                      stroke={isToday ? "#10b981" : "#f8fafc"}
                      strokeWidth={isToday ? "1.5" : "1"}
                      strokeDasharray={isToday ? "2 2" : undefined}
                    />

                    {/* Point Circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isPeak || isToday ? 5.5 : 4}
                      fill={isPeak ? "#f59e0b" : isToday ? "#10b981" : pt.actualPrice ? "#047857" : "#34d399"}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {/* Peak badge */}
                    {isPeak && (
                      <g>
                        <rect
                          x={x - 35}
                          y={y - 28}
                          width="70"
                          height="18"
                          rx="4"
                          fill="#f59e0b"
                        />
                        <text
                          x={x}
                          y={y - 16}
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {t.peakBadge}
                        </text>
                      </g>
                    )}

                    {/* X-axis label */}
                    <text
                      x={x}
                      y={chartHeight - 10}
                      fill={isToday ? "#047857" : "#64748b"}
                      fontSize="9"
                      fontWeight={isToday ? "bold" : "normal"}
                      textAnchor="middle"
                    >
                      {isToday
                        ? currentLang === "mr"
                          ? "आज"
                          : currentLang === "hi"
                          ? "आज"
                          : "Today"
                        : pt.day.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 bg-emerald-800 rounded-full" />
              <span>{t.historicalPrice}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 border-t-2 border-dashed border-emerald-500" />
              <span>{t.predictedPrice}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded" />
              <span>{t.confidenceRange}</span>
            </div>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={showConfidenceBands}
              onChange={(e) => setShowConfidenceBands(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span>{t.showConfidence}</span>
          </label>
        </div>
      </div>
    </div>
  );
};
