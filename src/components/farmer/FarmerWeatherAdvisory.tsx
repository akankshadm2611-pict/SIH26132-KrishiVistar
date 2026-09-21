import React, { useState, useEffect, useMemo } from "react";
import {
  CloudRain,
  Sun,
  CloudSun,
  Zap,
  Droplets,
  Thermometer,
  ShieldAlert,
  Clock,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Eye,
  X,
  AlertTriangle,
} from "lucide-react";
import { WeatherDay, WeatherAlert } from "../../types";
import { Language } from "../../translations";
import stormAlertBg from "../../assets/images/storm_weather_alert_1789903084375.jpg";
import sunnyFarmBg from "../../assets/images/sunny_farm_weather_1789904411803.jpg";
import rainyFarmBg from "../../assets/images/rainy_farm_weather_1789904430458.jpg";
import cloudyFarmBg from "../../assets/images/cloudy_farm_weather_1789904448705.jpg";

interface FarmerWeatherAdvisoryProps {
  weatherData: WeatherDay[];
  currentLang?: Language;
  onOpenAiAdvice: (query: string) => void;
  onNavigateToStorage: () => void;
}

// Localized month and weekday dictionaries
const MONTH_NAMES: Record<Language, string[]> = {
  mr: ["जाने", "फेब्रु", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑग", "सप्टे", "ऑक्टो", "नोव्हें", "डिसें"],
  hi: ["जन", "फ़र", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अग", "सित", "अक्टूबर", "नवंबर", "दिसंबर"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const FULL_MONTH_NAMES: Record<Language, string[]> = {
  mr: ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"],
  hi: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const WEEKDAY_NAMES: Record<Language, string[]> = {
  mr: ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
  hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const SHORT_WEEKDAY: Record<Language, string[]> = {
  mr: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const toDevanagariDigits = (num: number | string): string => {
  const digits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(num)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? digits[parseInt(c, 10)] : c))
    .join("");
};

const formatDateShort = (d: Date, lang: Language): string => {
  const dateNum = d.getDate();
  const monthStr = MONTH_NAMES[lang]?.[d.getMonth()] || MONTH_NAMES.en[d.getMonth()];
  if (lang === "mr" || lang === "hi") {
    return `${toDevanagariDigits(dateNum)} ${monthStr}`;
  }
  return `${monthStr} ${dateNum}`;
};

const formatFullCurrentTime = (d: Date, lang: Language): string => {
  const dayName = WEEKDAY_NAMES[lang]?.[d.getDay()] || WEEKDAY_NAMES.en[d.getDay()];
  const dateNum = d.getDate();
  const monthName = FULL_MONTH_NAMES[lang]?.[d.getMonth()] || FULL_MONTH_NAMES.en[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  if (lang === "mr" || lang === "hi") {
    const formattedDigits = toDevanagariDigits(`${dateNum} ${monthName} ${year}`);
    const timeStr = `${toDevanagariDigits(hours)}:${toDevanagariDigits(minutes)} ${ampm}`;
    return `${dayName}, ${formattedDigits} · ${timeStr}`;
  }

  return `${dayName}, ${monthName} ${dateNum}, ${year} · ${hours}:${minutes} ${ampm}`;
};

export const FarmerWeatherAdvisory: React.FC<FarmerWeatherAdvisoryProps> = ({
  weatherData,
  currentLang = "mr",
  onOpenAiAdvice,
  onNavigateToStorage,
}) => {
  const safeLang: Language =
    currentLang === "en" || currentLang === "hi" || currentLang === "mr"
      ? currentLang
      : "mr";

  // Current live day, date, and time
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [seenAlertIds, setSeenAlertIds] = useState<Record<string, boolean>>({});
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);

  // Update time live every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setCurrentTime(new Date());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Localized general texts
  const t = useMemo(() => {
    return {
      mr: {
        alertBadge: "हवामान इशारा",
        findStorage: "शितगृह शोधा",
        askAi: "AI कृषी सल्ला घ्या",
        cardTitle: "७ दिवसांचा हवामान व शेतमाल काढणी सल्ला (नाशिक-पुणे परिसर)",
        source: "स्रोत: IMD कृषी हवामान रडार केंद्र",
        activeStation: "सक्रिय स्थानिक हवामान केंद्र",
        liveUpdate: "थेट अद्ययावत",
        refreshBtn: "रीफ्रेश",
        today: "आज",
        tomorrow: "उद्या",
        dayPrefix: "दिवस",
        riskSuffix: "धोका",
        lowRisk: "कमी धोका",
        mediumRisk: "मध्यम धोका",
        highRisk: "उच्च धोका",
        tomatoTitle: "टोमॅटो व भाजीपाला काढणी सल्ला",
        tomatoBody:
          "पाऊस सुरू होण्यापूर्वी पुढील २४ ते ३६ तासांत तयार लाल टोमॅटो काढून घ्या. वाहतुकीदरम्यान बुरशी लागू नये म्हणून क्रेट्समध्ये हवा खेळती राहील याची काळजी घ्या.",
        onionTitle: "कांदा व धान्य वाळवणी सल्ला",
        onionBody:
          "उन्हात वाळवणारे कांदे आणि पोत्यात भरलेले धान्य पत्र्याच्या शेडमध्ये किंवा नोंदणीकृत स्थानिक शितगृहात ठेवा. वाहतूक ट्रकमध्ये ओली पोती भरणे टाळा.",
        markSeen: "पाहिले म्हणून नोंदवा",
        seenBadge: "पाहिले आहे",
        unseenBadge: "नवीन इशारा",
        autoCleanNote: "कालबाह्य झालेले इशारे आपोआप काढून टाकले जातात · केवळ आजचे व आगामी इशारे सक्रिय",
        noAlertsTitle: "सध्या हवामान सुरक्षित व सामान्य आहे",
        noAlertsDesc: "आज आणि पुढील ७ दिवसांसाठी कोणताही गंभीर वादळ किंवा पावसाचा इशारा नाही.",
        activeAlertsCount: (c: number) => `${toDevanagariDigits(c)} सक्रिय हवामान इशारे (आज व आगामी)`,
      },
      hi: {
        alertBadge: "मौसम चेतावनी",
        findStorage: "कोल्ड स्टोरेज खोजें",
        askAi: "AI कृषि सलाह लें",
        cardTitle: "७ दिनों का मौसम व फसल कटाई परामर्श (नासिक-पुणे क्षेत्र)",
        source: "स्रोत: IMD कृषि मौसम रडार केंद्र",
        activeStation: "सक्रिय स्थानीय मौसम केंद्र",
        liveUpdate: "लाइव अपडेटेड",
        refreshBtn: "रिफ्रेश",
        today: "आज",
        tomorrow: "कल",
        dayPrefix: "दिन",
        riskSuffix: "जोखिम",
        lowRisk: "कम जोखिम",
        mediumRisk: "मध्यम जोखिम",
        highRisk: "उच्च जोखिम",
        tomatoTitle: "टमाटर एवं सब्जी कटाई सलाह",
        tomatoBody:
          "बारिश शुरू होने से पहले अगले २४-३६ घंटों में पके लाल टमाटर तोड़ लें। परिवहन के दौरान फफूंद से बचाने के लिए क्रेट में हवा का संचार सुनिश्चित करें।",
        onionTitle: "प्याज व अनाज सुखाने की सलाह",
        onionBody:
          "धूप में सूख रहे प्याज और बोरियों में भरे अनाज को सुरक्षित टीन शेड या स्थानीय कोल्ड स्टोरेज में रखें। ट्रांसपोर्ट ट्रकों में गीली बोरियां न लादें।",
        markSeen: "देखा गया के रूप में चिह्नित करें",
        seenBadge: "देखा गया",
        unseenBadge: "नया अलर्ट",
        autoCleanNote: "पुराने/बीते हुए अलर्ट अपने आप हटा दिए जाते हैं · केवल आज के व आगामी अलर्ट सक्रिय",
        noAlertsTitle: "वर्तमान में मौसम सुरक्षित व सामान्य है",
        noAlertsDesc: "आज और अगले ७ दिनों के लिए कोई गंभीर आंधी या भारी बारिश की चेतावनी नहीं है।",
        activeAlertsCount: (c: number) => `${toDevanagariDigits(c)} सक्रिय मौसम अलर्ट (आज व आगामी)`,
      },
      en: {
        alertBadge: "Weather Alert",
        findStorage: "Find Cold Storage",
        askAi: "Ask AI Advisory",
        cardTitle: "7-Day Weather & Harvest Advisory (Nashik-Pune Region)",
        source: "Source: IMD Agromet Weather Radar",
        activeStation: "Active Microclimate Station",
        liveUpdate: "Live Synced",
        refreshBtn: "Refresh",
        today: "Today",
        tomorrow: "Tomorrow",
        dayPrefix: "Day",
        riskSuffix: "Risk",
        lowRisk: "Low Risk",
        mediumRisk: "Medium Risk",
        highRisk: "High Risk",
        tomatoTitle: "Tomato & Vegetable Advisory",
        tomatoBody:
          "Harvest standing mature red tomatoes within the next 24-36 hours before rain onset. Ensure crate aeration to avoid mould development during transit.",
        onionTitle: "Onion & Grain Curing Advisory",
        onionBody:
          "Move sun-drying onion lots and bagged wheat into covered tin sheds or registered local cold storage. Avoid loading wet bags into transport trucks.",
        markSeen: "Mark as Seen",
        seenBadge: "Seen",
        unseenBadge: "New Alert",
        autoCleanNote: "Expired alerts are automatically removed · Only today's and upcoming alerts active",
        noAlertsTitle: "Weather Conditions Normal & Safe",
        noAlertsDesc: "No severe rainfall or thunderstorm alerts active for today or upcoming days.",
        activeAlertsCount: (c: number) => `${c} Active Weather Alerts (Today & Upcoming)`,
      },
    }[safeLang];
  }, [safeLang]);

  // Compute start of current day (midnight)
  const todayMidnight = useMemo(() => {
    return new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      0,
      0,
      0,
      0
    );
  }, [currentTime]);

  // 7-day forecast dynamically calculated from currentTime
  const dynamicForecastDays = useMemo(() => {
    return weatherData.slice(0, 7).map((base, idx) => {
      const targetDate = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() + idx
      );

      const shortDate = formatDateShort(targetDate, safeLang);
      const weekdayShort = SHORT_WEEKDAY[safeLang]?.[targetDate.getDay()] || SHORT_WEEKDAY.en[targetDate.getDay()];

      let dayLabel = "";
      if (idx === 0) {
        dayLabel = t.today;
      } else if (idx === 1) {
        dayLabel = t.tomorrow;
      } else {
        const numStr = safeLang === "mr" || safeLang === "hi" ? toDevanagariDigits(idx + 1) : String(idx + 1);
        dayLabel = `${t.dayPrefix} ${numStr} (${weekdayShort})`;
      }

      return {
        ...base,
        computedDateObj: targetDate,
        dateLabel: shortDate,
        dayLabel,
      };
    });
  }, [weatherData, currentTime, safeLang, t]);

  // Alert generation pool:
  // Includes Today's alert and Future alerts (e.g., In 2 Days), plus any past simulated alerts.
  // CRITICAL REQUIREMENT:
  // "if the day is passed and alert is unseen remove the alert auto and just keep todays and future alerts."
  const rawAlertsPool: WeatherAlert[] = useMemo(() => {
    // Alert 1: Severe Warning in 2 Days (Day 3)
    const day3Date = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate() + 2
    );
    const day3DateFormatted = formatDateShort(day3Date, safeLang);

    // Alert 2: Today's Precautionary Alert
    const todayDateFormatted = formatDateShort(currentTime, safeLang);

    // Past simulated alert from yesterday (demonstrating the auto-removal logic)
    const yesterdayDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate() - 1
    );
    const yyyyY = yesterdayDate.getFullYear();
    const mmY = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
    const ddY = String(yesterdayDate.getDate()).padStart(2, "0");

    const yyyy3 = day3Date.getFullYear();
    const mm3 = String(day3Date.getMonth() + 1).padStart(2, "0");
    const dd3 = String(day3Date.getDate()).padStart(2, "0");

    const yyyy0 = currentTime.getFullYear();
    const mm0 = String(currentTime.getMonth() + 1).padStart(2, "0");
    const dd0 = String(currentTime.getDate()).padStart(2, "0");

    return [
      // Day 3 High Severity Alert (Future: In 2 Days)
      {
        id: `alert-heavyrain-${yyyy3}-${mm3}-${dd3}`,
        targetDate: `${yyyy3}-${mm3}-${dd3}`,
        daysFromNow: 2,
        severity: "High" as const,
        title: {
          mr: `२ दिवसांत मुसळधार पाऊस व वादळ (${day3DateFormatted})`,
          hi: `२ दिनों में भारी बारिश व आंधी-तूफान (${day3DateFormatted})`,
          en: `Heavy Rain & Thunderstorms in 2 Days (${day3DateFormatted})`,
        },
        advisory: {
          mr: "त्वरित काढणी सल्ला: पिकलेले टोमॅटो व भाजीपाला लवकर काढून बाजारात विका, किंवा फळ तडकणे व सडणे टाळण्यासाठी जवळचे शितगृह बुक करा!",
          hi: "त्वरित कटाई सलाह: पके हुए टमाटर और सब्जियों की जल्द कटाई कर बेचें, या सड़न से बचाने के लिए नजदीकी कोल्ड स्टोरेज बुक करें!",
          en: "Immediate Harvest Advisory: Consider harvesting or selling your ripe tomato & vegetable crop early, or book nearby cold storage to prevent split skin and rot losses!",
        },
      },
      // Today's Precautionary Alert (Today)
      {
        id: `alert-precaution-${yyyy0}-${mm0}-${dd0}`,
        targetDate: `${yyyy0}-${mm0}-${dd0}`,
        daysFromNow: 0,
        severity: "Medium" as const,
        title: {
          mr: `आजचा सावधगिरी सल्ला (${todayDateFormatted}): संध्याकाळी वादळी वारे व आर्द्रता वाढण्याची शक्यता`,
          hi: `आज का सावधानी अलर्ट (${todayDateFormatted}): शाम को तेज हवाओं और आर्द्रता बढ़ने की संभावना`,
          en: `Today's Advisory (${todayDateFormatted}): Evening gusty winds & high humidity expected`,
        },
        advisory: {
          mr: "वाळवणारे कांदे व उघड्यावरील भाजीपाला झाकून ठेवा. सुरक्षित विक्रीसाठी वाहतूक वेळेत नियोजन करा.",
          hi: "धूप में सूख रहे प्याज व खुले अनाज को ढककर रखें। मंडियों में समय पर सुरक्षित परिवहन सुनिश्चित करें।",
          en: "Keep sun-cured onions and grain bags under shed cover. Ensure tarp protection on transport vehicles.",
        },
      },
      // Expired yesterday alert (MUST be automatically filtered out!)
      {
        id: `alert-expired-yesterday-${yyyyY}-${mmY}-${ddY}`,
        targetDate: `${yyyyY}-${mmY}-${ddY}`,
        daysFromNow: -1,
        severity: "Low" as const,
        title: {
          mr: "कालचा जुना इशारा (कालबाह्य)",
          hi: "कल का पुराना अलर्ट (समाप्त)",
          en: "Yesterday's Expired Alert (Past)",
        },
        advisory: {
          mr: "हा इशारा कालचा असून तो आपोआप काढून टाकला जातो.",
          hi: "यह अलर्ट कल का था और इसे स्वतः हटा दिया गया है।",
          en: "This alert belongs to yesterday and is automatically pruned.",
        },
      },
    ];
  }, [currentTime, safeLang]);

  // AUTOMATIC PRUNING FILTER:
  // "if the day is passed and alret is unseen remove the alret auto and just keep todays and future alerts."
  const activeAlerts = useMemo(() => {
    return rawAlertsPool.filter((alert) => {
      // 1. If user dismissed it manually in this session, skip
      if (dismissedAlertIds.includes(alert.id)) {
        return false;
      }

      // 2. Parse alert target date
      const [y, m, d] = alert.targetDate.split("-").map(Number);
      const alertTargetMidnight = new Date(y, m - 1, d, 0, 0, 0, 0);

      // Check if day is in the past (< todayMidnight)
      const isDayPassed = alertTargetMidnight.getTime() < todayMidnight.getTime();

      // IF DAY IS PASSED:
      // Even if unseen, remove the alert automatically!
      if (isDayPassed) {
        return false;
      }

      // ONLY keep alerts where targetDate >= todayMidnight (Today and Future alerts)
      return true;
    });
  }, [rawAlertsPool, todayMidnight, dismissedAlertIds]);

  const currentAlert = activeAlerts[activeAlertIndex] || activeAlerts[0] || null;
  const isCurrentAlertSeen = currentAlert ? !!seenAlertIds[currentAlert.id] : false;

  const handleMarkSeen = (alertId: string) => {
    setSeenAlertIds((prev) => ({ ...prev, [alertId]: true }));
  };

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlertIds((prev) => [...prev, alertId]);
    if (activeAlertIndex >= activeAlerts.length - 1) {
      setActiveAlertIndex(Math.max(0, activeAlerts.length - 2));
    }
  };

  const getRiskLabel = (risk: string) => {
    if (risk === "High") return t.highRisk;
    if (risk === "Medium") return t.mediumRisk;
    return t.lowRisk;
  };

  const getWeatherCardBg = (condition: string, rainProb: number): string => {
    const cond = condition.toLowerCase();
    if (cond.includes("thunderstorm")) {
      return stormAlertBg;
    }
    if (cond.includes("rain") || rainProb >= 50) {
      return rainyFarmBg;
    }
    if (cond.includes("cloud") || cond.includes("overcast")) {
      return cloudyFarmBg;
    }
    return sunnyFarmBg;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Day, Date & Time Station Header */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                {t.liveUpdate}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatFullCurrentTime(currentTime, safeLang)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.autoCleanNote}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleManualRefresh}
            title={t.refreshBtn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            <span>{t.refreshBtn}</span>
          </button>
        </div>
      </div>

      {/* Weather Alert Banner — Displays Today's & Future Alerts (Passed alerts automatically removed) */}
      {currentAlert ? (
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl text-white shadow-2xl flex flex-col justify-between min-h-[300px] sm:min-h-[350px] md:min-h-[380px] p-5 sm:p-7 md:p-8 animate-in fade-in transition-all border border-white/20 ${
            currentAlert.severity === "High"
              ? "border-white/25 shadow-amber-950/20"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800 shadow-blue-500/15"
          }`}
        >
          {/* Replaced red-orange gradient background with attached storm and lightning farm field image */}
          {currentAlert.severity === "High" && (
            <>
              <img
                src={stormAlertBg}
                alt="Severe Thunderstorm and Lightning Alert"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle translucent dark overlay so lightning, clouds, and crops are vivid while text remains 100% readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/65 pointer-events-none" />
            </>
          )}

          {/* Banner content arranged with comfortable vertical distribution */}
          <div className="relative z-10 flex flex-col justify-between h-full gap-5 sm:gap-6">
            {/* Top row: Multi-alert tabs or alert badge + dismiss button */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {activeAlerts.length > 1 ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-white/95 drop-shadow-sm bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md">
                    {t.activeAlertsCount(activeAlerts.length)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {activeAlerts.map((alt, idx) => (
                      <button
                        key={alt.id}
                        onClick={() => setActiveAlertIndex(idx)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          activeAlertIndex === idx
                            ? "bg-white/25 text-white border border-white/40 shadow-sm backdrop-blur-md"
                            : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 backdrop-blur-xs"
                        }`}
                      >
                        {alt.daysFromNow === 0
                          ? t.today
                          : `${t.dayPrefix} +${safeLang === "mr" || safeLang === "hi" ? toDevanagariDigits(alt.daysFromNow) : alt.daysFromNow}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/30 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                    {t.alertBadge}
                  </span>
                  {isCurrentAlertSeen ? (
                    <span className="text-xs font-semibold bg-white/15 text-white px-2.5 py-1 rounded-lg border border-white/30 flex items-center gap-1 backdrop-blur-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      {t.seenBadge}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold bg-white/15 text-white px-2.5 py-1 rounded-lg border border-white/30 flex items-center gap-1 backdrop-blur-md shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-white" />
                      {t.unseenBadge}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {activeAlerts.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/30 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                      {t.alertBadge}
                    </span>
                    {isCurrentAlertSeen ? (
                      <span className="text-xs font-semibold bg-white/15 text-white px-2.5 py-1 rounded-lg border border-white/30 flex items-center gap-1 backdrop-blur-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        {t.seenBadge}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold bg-white/15 text-white px-2.5 py-1 rounded-lg border border-white/30 flex items-center gap-1 backdrop-blur-md shadow-sm">
                        <Eye className="w-3.5 h-3.5 text-white" />
                        {t.unseenBadge}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => handleDismissAlert(currentAlert.id)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 backdrop-blur-md"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Weather Alert Title and Advisory with spacious typography & STATIC icon */}
            <div className="my-auto py-3 sm:py-5">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl">
                  {/* Icon is completely static as requested */}
                  {currentAlert.severity === "High" ? (
                    <Zap className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 sm:w-9 sm:h-9 text-sky-200" />
                  )}
                </div>
                <div className="space-y-2.5 max-w-3xl">
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {currentAlert.title[safeLang] || currentAlert.title.en}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-2xl">
                    ⚡ <strong className="text-amber-300">{safeLang === "mr" ? "काढणी सल्ला: " : safeLang === "hi" ? "कटाई सलाह: " : "Harvest Advisory: "}</strong>
                    {currentAlert.advisory[safeLang] || currentAlert.advisory.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom row: Action Buttons — Transparent and Colourless Glass styling */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
              <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
                <button
                  onClick={onNavigateToStorage}
                  id="protect-crop-storage-btn"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-sm hover:border-white/50"
                >
                  {t.findStorage}
                </button>

                <button
                  onClick={() =>
                    onOpenAiAdvice(
                      safeLang === "mr"
                        ? `हवामान इशारा संदर्भात पिकांचे कसे संरक्षण करावे? (${currentAlert.title.mr})`
                        : safeLang === "hi"
                        ? `मौसम अलर्ट के अनुसार फसल का संरक्षण कैसे करें? (${currentAlert.title.hi})`
                        : `How should I protect my crops regarding this weather alert? (${currentAlert.title.en})`
                    )
                  }
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-sm hover:border-white/50"
                >
                  {t.askAi}
                </button>

                {!isCurrentAlertSeen && (
                  <button
                    onClick={() => handleMarkSeen(currentAlert.id)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/30 transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md active:scale-95 hover:border-white/50"
                    title={t.markSeen}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="inline">{t.markSeen}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reassuring Banner when all alerts are cleared/safe */
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold">{t.noAlertsTitle}</h4>
              <p className="text-xs text-emerald-700 mt-0.5">{t.noAlertsDesc}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
            {t.autoCleanNote}
          </span>
        </div>
      )}

      {/* 7-Day Forecast Strip with dynamically computed dates & realistic condition backgrounds */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-emerald-600" />
              <span>{t.cardTitle}</span>
            </h3>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 self-start sm:self-center flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.activeStation}
          </span>
        </div>

        {/* 7 Day Grid with Photographic Realistic Weather Backgrounds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {dynamicForecastDays.map((day, idx) => {
            const isHighRisk = day.harvestRisk === "High";
            const isMediumRisk = day.harvestRisk === "Medium";
            const isToday = idx === 0;
            const cardBgImage = getWeatherCardBg(day.condition, day.rainProb);

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border text-center transition-all duration-300 shadow-md group hover:shadow-xl hover:-translate-y-0.5 min-h-[235px] flex flex-col justify-between p-3.5 sm:p-4 ${
                  isToday
                    ? "border-emerald-400 ring-2 ring-emerald-400/60 shadow-emerald-950/20"
                    : isHighRisk
                    ? "border-rose-400/60"
                    : isMediumRisk
                    ? "border-amber-400/60"
                    : "border-white/30"
                }`}
              >
                {/* Realistic Weather Condition Photographic Backdrop */}
                <img
                  src={cardBgImage}
                  alt={`${day.condition} weather condition`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Translucent overlay for crystal-clear legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/50 to-slate-950/80 backdrop-blur-[0.5px] pointer-events-none" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className={`text-xs font-black block drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${isToday ? "text-emerald-300" : "text-white"}`}>
                      {day.dayLabel}
                    </span>
                    <span className="text-[11px] block font-semibold text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] mt-0.5">
                      {day.dateLabel}
                    </span>
                  </div>

                  {/* Static Weather Icon */}
                  <div className="flex justify-center my-2.5">
                    <div className="w-11 h-11 rounded-xl bg-black/45 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                      {day.condition.includes("Heavy Rain") || day.condition.includes("Thunderstorm") ? (
                        <CloudRain className="w-6 h-6 text-sky-300" />
                      ) : day.condition.includes("Moderate Rain") ? (
                        <CloudRain className="w-6 h-6 text-sky-300" />
                      ) : day.condition.includes("Cloudy") ? (
                        <CloudSun className="w-6 h-6 text-amber-300" />
                      ) : (
                        <Sun className="w-6 h-6 text-amber-300" />
                      )}
                    </div>
                  </div>

                  {/* Temperature & Rain Info */}
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                      {day.tempMax}°<span className="text-xs text-slate-300 font-medium"> / {day.tempMin}°</span>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-xs text-sky-300 font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{day.rainProb}%</span>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div className="mt-3">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md backdrop-blur-md border inline-block ${
                        isHighRisk
                          ? "bg-rose-500/85 text-white border-rose-300/40"
                          : isMediumRisk
                          ? "bg-amber-500/85 text-white border-amber-300/40"
                          : "bg-emerald-500/85 text-white border-emerald-300/40"
                      }`}
                    >
                      {getRiskLabel(day.harvestRisk)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Daily Harvest Action Cards */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1 text-xs">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>{t.tomatoTitle}</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              {t.tomatoBody}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1 text-xs">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <span>{t.onionTitle}</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              {t.onionBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
