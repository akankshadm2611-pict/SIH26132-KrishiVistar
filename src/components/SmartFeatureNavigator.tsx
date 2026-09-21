import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  Bot,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Mic,
  MicOff,
  X,
  RefreshCw,
  SlidersHorizontal,
  CloudSun,
  TrendingUp,
  Package,
  ShieldAlert,
  PhoneCall,
  Warehouse,
  Truck,
  CreditCard,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Language, UserRole } from "../types";
import {
  resolveFeatureDoubt,
  FeatureSearchResult,
  ClarificationOption,
} from "../utils/featureSearchEngine";

interface SmartFeatureNavigatorProps {
  currentRole: UserRole;
  currentLang: Language;
  onNavigateToFeature: (tabId: string, role?: UserRole) => void;
  onOpenSidebar?: () => void;
}

export const SmartFeatureNavigator: React.FC<SmartFeatureNavigatorProps> = ({
  currentRole,
  currentLang,
  onNavigateToFeature,
  onOpenSidebar,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureSearchResult | null>(null);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [clarificationInput, setClarificationInput] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Suggested quick doubts based on language
  const suggestedDoubts =
    currentLang === "mr"
      ? [
          { text: "मला हवामान अंदाज व पावसाचा इशारा पाहायचा आहे", label: "⛈️ हवामान अंदाज" },
          { text: "अतिवृष्टी पिकाचे नुकसान झाले भरपाई मिळेल का?", label: "🛡️ नुकसान भरपाई (PMFBY)" },
          { text: "गाई व म्हशीसाठी जवळचे पशुपालक संपर्क कुठे आहेत?", label: "🐄 पशुपालक संपर्क" },
          { text: "आजचे थेट मंडी बाजारभाव व दर कल कुठे पाहू?", label: "📊 बाजारभाव व दर कल" },
          { text: "शेतमाल विक्रीसाठी लॉट कसा तयार करावा?", label: "📦 शेतमाल लॉट विक्री" },
          { text: "जवळचे शीतगृह (Cold Storage) उपलब्ध आहे का?", label: "❄️ शीतगृह शोध" },
        ]
      : currentLang === "hi"
      ? [
          { text: "मुझे मौसम का पूर्वानुमान और बारिश का अलर्ट देखना है", label: "⛈️ मौसम पूर्वानुमान" },
          { text: "फसल क्षति का सरकारी मुआवजा व बीमा कैसे मिलेगा?", label: "🛡️ फसल मुआवजा (PMFBY)" },
          { text: "गाय-भैंस के लिए निकटतम पशुपालक संपर्क कहाँ मिलेंगे?", label: "🐄 पशुपालक संपर्क" },
          { text: "आज के लाइव मंडी भाव और मूल्य रुझान कहाँ देखें?", label: "📊 मंडी भाव व रुझान" },
          { text: "फसल बेचने के लिए नया लॉट कैसे दर्ज करें?", label: "📦 फसल लॉट बिक्री" },
          { text: "समीप में कोल्ड स्टोरेज की सुविधा उपलब्ध है क्या?", label: "❄️ कोल्ड स्टोरेज" },
        ]
      : [
          { text: "I want to know about the forecast of weather and rain", label: "⛈️ Weather Forecast" },
          { text: "Is there govt calamity refund & crop insurance for rain loss?", label: "🛡️ Calamity Refund" },
          { text: "Where can I find nearby cattle keepers and livestock contacts?", label: "🐄 Cattle Keepers" },
          { text: "Where to check live mandi market prices and 7-day trend?", label: "📊 Mandi Prices" },
          { text: "Where can I list my harvest lots to sell to buyers?", label: "📦 Sell Produce Lots" },
          { text: "Is there cold storage booking to preserve vegetables?", label: "❄️ Cold Storage" },
        ];

  const handleSearch = async (textToSearch?: string) => {
    const q = (textToSearch !== undefined ? textToSearch : query).trim();
    if (!q) return;

    setLoading(true);
    setResult(null);
    clearCountdown();

    const searchRes = await resolveFeatureDoubt(q, currentRole, currentLang);
    setResult(searchRes);
    setLoading(false);

    // If feature found with high confidence, initiate smooth auto-redirect countdown
    if (searchRes.found && searchRes.targetTab) {
      startCountdown(searchRes.targetTab, searchRes.targetRole);
    }
  };

  const startCountdown = (tabId: string, role?: UserRole) => {
    clearCountdown();
    setAutoRedirectCountdown(3);

    let count = 3;
    timerRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearCountdown();
        onNavigateToFeature(tabId, role);
      } else {
        setAutoRedirectCountdown(count);
      }
    }, 1000);
  };

  const clearCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setAutoRedirectCountdown(null);
  };

  const handleClarificationPick = (option: ClarificationOption) => {
    clearCountdown();
    setResult({
      found: true,
      targetTab: option.targetTab,
      targetRole: option.targetRole || currentRole,
      featureName: option.label,
      explanation:
        currentLang === "mr"
          ? `आपल्या निवडीनुसार ${option.label} वैशिष्ट्य उघडत आहे.`
          : currentLang === "hi"
          ? `आपके चयन के अनुसार ${option.label} फीचर खोला जा रहा है।`
          : `Opening ${option.label} based on your selection.`,
      confidence: "high",
    });

    startCountdown(option.targetTab, option.targetRole);
  };

  const handleDirectOpen = (tabId: string, role?: UserRole) => {
    clearCountdown();
    onNavigateToFeature(tabId, role);
  };

  const toggleSpeechRecognition = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        currentLang === "mr"
          ? "तुमच्या ब्राउझरमध्ये व्हॉइस ओळख उपलब्ध नाही. कृपया टाइप करून शोधा."
          : currentLang === "hi"
          ? "आपके ब्राउज़र में वॉइस पहचान उपलब्ध नहीं है। कृपया टाइप करके खोजें।"
          : "Voice recognition is not supported in this browser. Please type to search."
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Could not stop recognition", err);
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang =
        currentLang === "mr" ? "mr-IN" : currentLang === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results?.[0]?.[0]?.transcript?.trim();
        if (spokenText) {
          setQuery(spokenText);
          handleSearch(spokenText);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          setSpeechError(
            currentLang === "mr"
              ? "आवाज ऐकताना अडचण आली किंवा मायक्रोफोन परवानगी नाकारली गेली."
              : currentLang === "hi"
              ? "आवाज सुनने में त्रुटि हुई या माइक्रोफ़ोन की अनुमति अस्वीकृत की गई।"
              : "Microphone error or permission denied."
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Speech recognition start failed:", e);
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      clearCountdown();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#eff6ed] rounded-2xl border-2 border-emerald-300/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between transition-all relative overflow-hidden">
      {/* Top Section: Header + Search */}
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-emerald-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0f2d4a] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Search className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                {currentLang === "mr"
                  ? "स्मार्ट AI शोध व नेव्हिगेटर"
                  : currentLang === "hi"
                  ? "स्मार्ट AI खोज व नेविगेटर"
                  : "Smart AI Search & Navigator"}
              </h2>
            </div>
          </div>

          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="text-xs font-semibold text-slate-800 hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>
                {currentLang === "mr"
                  ? "सर्व वैशिष्ट्ये"
                  : currentLang === "hi"
                  ? "सभी फीचर्स"
                  : "Browse Features"}
              </span>
            </button>
          )}
        </div>

        {/* Main Search Input Box */}
        <div className="relative">
          <div className="flex items-center gap-1.5 bg-white rounded-xl border border-slate-300 focus-within:border-[#0f2d4a] focus-within:ring-1 focus-within:ring-[#0f2d4a] shadow-2xs transition-all p-1">
            <div className="pl-2.5 text-slate-500">
              <Search className="w-4 h-4" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder={
                currentLang === "mr"
                  ? "उदा. हवामान अंदाज, नुकसान भरपाई, बाजारभाव..."
                  : currentLang === "hi"
                  ? "जैसे: मौसम पूर्वानुमान, फसल मुआवजा, मंडी भाव..."
                  : "Ask AI e.g. 'weather forecast', 'mandi prices'..."
              }
              className="flex-1 px-1.5 py-2 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent border-none outline-none min-w-0"
            />

            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResult(null);
                  clearCountdown();
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                isListening
                  ? "bg-rose-50 border-rose-300 text-rose-600 animate-pulse"
                  : "bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
              title={
                currentLang === "mr"
                  ? "आवाजाने विचारा (बोलून शोधा)"
                  : currentLang === "hi"
                  ? "बोलकर पूछें (आवाज से खोजें)"
                  : "Speak to search"
              }
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Search Submit Button - Sober Official Navy */}
            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
              id="ai-feature-search-btn"
              className="px-3.5 py-2 bg-[#0f2d4a] hover:bg-[#16436e] disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {currentLang === "mr" ? "शोधा" : currentLang === "hi" ? "खोजें" : "Ask AI"}
              </span>
            </button>
          </div>

          {isListening && (
            <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-900 animate-pulse">
              <Mic className="w-4 h-4 text-amber-600 animate-bounce shrink-0" />
              <span>
                {currentLang === "mr"
                  ? "ऐकत आहे... कृपया बोला..."
                  : currentLang === "hi"
                  ? "सुन रहे हैं... कृपया बोलें..."
                  : "Listening... Please speak your question..."}
              </span>
            </div>
          )}

          {speechError && (
            <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between gap-2 text-xs text-rose-800">
              <span>{speechError}</span>
              <button
                onClick={() => setSpeechError(null)}
                className="text-rose-500 hover:text-rose-700 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          {currentLang === "mr" ? "उदाहरणे:" : currentLang === "hi" ? "सुझाव:" : "Try asking:"}
        </span>
        {suggestedDoubts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(item.text);
              handleSearch(item.text);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 hover:border-slate-400 border border-slate-300 text-slate-700 transition-colors shadow-2xs cursor-pointer shrink-0 font-medium text-xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* RESULT PANEL */}
      {result && (
        <div className="mt-4 animate-fadeIn">
          {/* CASE 1: FEATURE FOUND! DIRECT LINK & AUTO REDIRECT */}
          {result.found && result.targetTab && (
            <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-300 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#0f2d4a] text-white text-[11px] font-bold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {currentLang === "mr"
                        ? "होय! हे वैशिष्ट्य संकेतस्थळावर उपलब्ध आहे"
                        : currentLang === "hi"
                        ? "हाँ! यह फीचर वेबसाइट पर उपलब्ध है"
                        : "Yes! This feature is available on KrishiVistar"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0f2d4a] font-sans flex items-center gap-2">
                    <span>{result.featureName}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl font-normal">
                    {result.explanation}
                  </p>
                </div>

                {/* Direct Open Action & Countdown */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  {autoRedirectCountdown !== null && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-[11px] font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                      <span>
                        {currentLang === "mr"
                          ? `${autoRedirectCountdown} सेकंदात उघडत आहे...`
                          : currentLang === "hi"
                          ? `${autoRedirectCountdown} सेकंड में खुल रहा है...`
                          : `Opening in ${autoRedirectCountdown}s...`}
                      </span>
                      <button
                        onClick={clearCountdown}
                        className="text-[10px] underline text-slate-600 hover:text-slate-950 ml-1 cursor-pointer"
                      >
                        {currentLang === "mr" ? "थांबवा" : currentLang === "hi" ? "रोकें" : "Cancel"}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleDirectOpen(result.targetTab!, result.targetRole)}
                    id="open-feature-direct-btn"
                    className="px-5 py-2.5 rounded-md bg-[#0f2d4a] hover:bg-[#16436e] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentLang === "mr"
                        ? "हे वैशिष्ट्य आताच उघडा"
                        : currentLang === "hi"
                        ? "यह फीचर अभी खोलें"
                        : "Open Feature Now"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: AI DID NOT UNDERSTAND / AMBIGUOUS -> ASK QUESTIONS & CLARIFY */}
          {result.needsClarification && (
            <div className="p-4 sm:p-5 rounded-lg bg-amber-50/70 border border-amber-300 shadow-xs space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#0f2d4a] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wide mb-1">
                    <HelpCircle className="w-3 h-3 text-amber-700" />
                    <span>
                      {currentLang === "mr"
                        ? "अधिक माहिती आवश्यक आहे"
                        : currentLang === "hi"
                        ? "अधिक जानकारी आवश्यक है"
                        : "Clarification Needed"}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {result.clarificationMessage}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                    {currentLang === "mr"
                      ? "आपल्या गरजेनुसार खालील एका पर्यायावर क्लिक करा किंवा खाली अधिक तपशील लिहा:"
                      : currentLang === "hi"
                      ? "अपनी आवश्यकता के अनुसार नीचे दिए गए विकल्प पर टैप करें या और विस्तार से लिखें:"
                      : "Tap one of the matching options below or describe more details to decide the feature:"}
                  </p>
                </div>
              </div>

              {/* Clarification Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {result.clarificationQuestions?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleClarificationPick(opt)}
                    className="p-3 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-left transition-all hover:shadow-xs group flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {opt.label}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#0f2d4a] group-hover:text-white transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Or describe more manually */}
              <div className="pt-2 border-t border-amber-200/80">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={clarificationInput}
                    onChange={(e) => setClarificationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (clarificationInput.trim()) {
                          handleSearch(query + " " + clarificationInput.trim());
                          setClarificationInput("");
                        }
                      }
                    }}
                    placeholder={
                      currentLang === "mr"
                        ? "येथे अधिक माहिती लिहा (उदा. मला पिकाचे नुकसान झाले आहे, किंवा जनावरे विकायची आहेत)..."
                        : currentLang === "hi"
                        ? "यहाँ अधिक विस्तार से लिखें (जैसे: मुझे फसल का नुकसान हुआ है, या पशु बेचने हैं)..."
                        : "Describe more here (e.g. 'rain destroyed my crop', 'want to buy cows')..."
                    }
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f2d4a] outline-none text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (clarificationInput.trim()) {
                        handleSearch(query + " " + clarificationInput.trim());
                        setClarificationInput("");
                      }
                    }}
                    disabled={!clarificationInput.trim()}
                    className="px-3.5 py-2 bg-[#0f2d4a] hover:bg-[#16436e] disabled:opacity-50 text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
                  >
                    {currentLang === "mr" ? "पुन्हा शोधा" : currentLang === "hi" ? "फिर खोजें" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 3: NOT SUPPORTED ON KRISHIVISTAR */}
          {result.notSupported && (
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs sm:text-sm">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>
                  {currentLang === "mr"
                    ? "सध्या हे वैशिष्ट्य KrishiVistar वर उपलब्ध नाही"
                    : currentLang === "hi"
                    ? "वर्तमान में यह सुविधा KrishiVistar पर उपलब्ध नहीं है"
                    : "Feature Not Available on KrishiVistar"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {result.explanation ||
                  (currentLang === "mr"
                    ? "KrishiVistar हे शेती, बाजारभाव, हवामान अंदाज, शेतमाल विक्री, नुकसान भरपाई आणि जनावरांच्या संपर्कासाठी आहे."
                    : currentLang === "hi"
                    ? "KrishiVistar कृषि, मंडी भाव, मौसम, फसल बिक्री, मुआवजा और पशुधन के लिए समर्पित है।"
                    : "KrishiVistar focuses on smart agriculture, live mandi prices, weather forecasts, crop sales, calamity refunds, and cattle livestock.")}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => handleDirectOpen("weather")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  ⛈️ {currentLang === "mr" ? "हवामान अंदाज" : currentLang === "hi" ? "मौसम" : "Weather"}
                </button>
                <button
                  onClick={() => handleDirectOpen("mandi")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  📊 {currentLang === "mr" ? "बाजारभाव" : currentLang === "hi" ? "मंडी भाव" : "Mandi Rates"}
                </button>
                <button
                  onClick={() => handleDirectOpen("calamity")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  🛡️ {currentLang === "mr" ? "नुकसान भरपाई" : currentLang === "hi" ? "मुआवजा" : "Calamity Refund"}
                </button>
                <button
                  onClick={() => handleDirectOpen("cattle")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  🐄 {currentLang === "mr" ? "पशुपालक" : currentLang === "hi" ? "पशुपालक" : "Cattle Keepers"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
