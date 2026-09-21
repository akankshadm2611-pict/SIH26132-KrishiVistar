import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Bot,
  Send,
  Sparkles,
  Mic,
  MicOff,
  RefreshCw,
  Copy,
  Check,
  TrendingUp,
  CloudRain,
  Warehouse,
  ShoppingBag,
  Info,
  ArrowRight,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { UserRole, Language } from "../types";
import { resolveFeatureDoubt, ClarificationOption } from "../utils/featureSearchEngine";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  source?: "gemini" | "expert-engine";
  navigationTarget?: {
    tabId: string;
    label: string;
    role?: UserRole;
  };
  clarificationOptions?: ClarificationOption[];
}

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  cropContext?: string;
  currentLang?: Language;
  onNavigateToFeature?: (tabId: string, role?: UserRole) => void;
  initialQuery?: string;
}

const tAiDrawer = {
  mr: {
    headerTitle: "एआय कृषी सल्लागार",
    headerDesc: "थेट बाजारभाव, हवामान आणि खरेदी-विक्रीबाबत वैयक्तिकृत मार्गदर्शन",
    quickAsk: "झटपट प्रश्न:",
    farmerGreeting:
      "नमस्कार रमेश जी! 🙏 मी आपला **KrishiVistar AI कृषी सहाय्यक** आहे.\n\nमी थेट बाजारभाव, हवामानाचा अंदाज, वाहतूक खर्च व शीतगृहांची उपलब्धता तपासून तुम्हाला जास्तीत जास्त नफा मिळवून देण्यासाठी सल्ला देतो.\n\n**काहीही विचारा** किंवा खालील प्रश्नांवर क्लिक करा!",
    buyerGreeting:
      "नमस्कार अनिता जी! 🛒 मी आपला **KrishiVistar AI खरेदी सहाय्यक** आहे.\n\nमी आपल्याला थेट स्थानिक शेतकरी शोधण्यात, वाजवी दरात उच्च दर्जाचा शेतमाल मिळवण्यात आणि एस्क्रो सुरक्षित खरेदीत मदत करतो.\n\nमी आपली काय मदत करू शकतो?",
    farmerPrompts: [
      "माझ्याकडे २ टन टोमॅटो आहेत. सर्वाधिक नफ्यासाठी कुठे विकावे?",
      "२ दिवसात मुसळधार पाऊस होणार आहे. वेळेआधी काढणी करावी का?",
      "वाहतूक खर्च वजा जाता नाशिक, पुणे आणि मुंबई बाजारभाव तुलना करा",
      "जवळचे रिकामी जागा असलेले शीतगृह कुठे आहे?",
    ],
    buyerPrompts: [
      "मला ५०० किलो ताजे ग्रेड A टोमॅटो सर्वोत्तम शेतकरी दरात खरेदी करायचे आहेत",
      "पुण्यापासून २५ किमी आत उच्च रेटिंग असलेले प्रमाणित शेतकरी कोण आहेत?",
      "KrishiVistar एस्क्रो डिलिव्हरीपर्यंत माझे पैसे सुरक्षित कसे ठेवते?",
      "कांद्यासाठी चालू घाऊक बाजार भाव काय आहेत?",
    ],
    listeningVoice: "स्थानिक आवाजात ऐकत आहे... आपला कृषी प्रश्न विचारा...",
    voiceFarmerInput: "सर्वाधिक नफ्यासाठी २ टन टोमॅटो कुठे विकू?",
    voiceBuyerInput: "जवळचे दर्जेदार ग्रेड A टोमॅटो पिकवणारे शेतकरी शोधा",
    inputPlaceholderFarmer: "उदा. आज टोमॅटो कुठे विकले तर जास्त भाव मिळेल?",
    inputPlaceholderBuyer: "उदा. ५०० किलो कांद्यासाठी सर्वोत्तम दर शोधा",
    analyzing: "बाजारभाव, हवामान अंदाज आणि वाहतूक मार्गांचे विश्लेषण करत आहे...",
    geminiSource: "⚡ Gemini द्वारे समर्थित",
    systemSource: "🌾 KrishiVistar कृषी बुद्धिमत्ता",
    footerNotice: "KrishiVistar AI थेट Agmarknet / e-NAM डेटा आणि हवामान विभागाचा अंदाज एकत्र करतो",
    voiceBtnTitle: "आवाज प्रश्न (मराठी/हिंदी/इंग्रजी)",
    copyTitle: "सल्ला कॉपी करा",
  },
  hi: {
    headerTitle: "एआई मंडी सलाहकार",
    headerDesc: "लाइव मंडी भाव, मौसम और खरीद-बिक्री पर व्यक्तिगत मार्गदर्शन",
    quickAsk: "त्वरित प्रश्न:",
    farmerGreeting:
      "नमस्ते रमेश जी! 🙏 मैं आपका **KrishiVistar AI कृषि सहायक** हूँ।\n\nमैं लाइव मंडी भाव, मौसम पूर्वानुमान, परिवहन लागत और कोल्ड स्टोरेज उपलब्धता का विश्लेषण कर आपको अधिकतम शुद्ध मुनाफे की सलाह देता हूँ।\n\n**मुझसे कुछ भी पूछें** या नीचे दिए गए प्रश्नों पर टैप करें!",
    buyerGreeting:
      "नमस्ते अनीता जी! 🛒 मैं आपका **KrishiVistar AI खरीद सहायक** हूँ।\n\nमैं आपको स्थानीय किसानों से सीधे जुड़ने, उचित भाव पर उच्च गुणवत्ता वाली फसल खरीदने और सुरक्षित एस्क्रो में मदद करता हूँ।\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?",
    farmerPrompts: [
      "मेरे पास २ टन टमाटर हैं। सर्वाधिक मुनाफे के लिए कहाँ बेचूँ?",
      "२ दिन में भारी बारिश होने वाली है। क्या जल्दी फसल तोड़ लूँ?",
      "परिवहन खर्च घटाने के बाद नासिक, पुणे और मुंबई मंडी भाव की तुलना करें",
      "निकटतम उपलब्ध स्थान वाला कोल्ड स्टोरेज कहाँ है?",
    ],
    buyerPrompts: [
      "मुझे ५०० किग्रा ताजे ग्रेड A टमाटर सर्वोत्तम किसान भाव में चाहिए",
      "पुणे से २५ किमी के दायरे में उच्च रेटिंग वाले सत्यापित किसान कौन हैं?",
      "KrishiVistar एस्क्रो डिलीवरी तक मेरे पैसे सुरक्षित कैसे रखता है?",
      "प्याज के लिए वर्तमान थोक मंडी बेंचमार्क दरें क्या हैं?",
    ],
    listeningVoice: "क्षेत्रीय भाषा में सुन रहे हैं... अपना कृषि प्रश्न बोलें...",
    voiceFarmerInput: "अधिकतम मुनाफे के लिए २ टन टमाटर कहाँ बेचूँ?",
    voiceBuyerInput: "निकटतम सत्यापित किसान खोजें जिनके पास ताजा ग्रेड A टमाटर हैं",
    inputPlaceholderFarmer: "जैसे आज टमाटर कहाँ बेचें ताकि सबसे अच्छा भाव मिले?",
    inputPlaceholderBuyer: "जैसे ५०० किग्रा प्याज के लिए सर्वोत्तम भाव खोजें",
    analyzing: "मंडी भाव, मौसम पूर्वानुमान और परिवहन मार्गों का विश्लेषण कर रहे हैं...",
    geminiSource: "⚡ Gemini द्वारा संचालित",
    systemSource: "🌾 KrishiVistar कृषि बुद्धिमत्ता",
    footerNotice: "KrishiVistar AI लाइव Agmarknet / e-NAM डेटा और मौसम विभाग के पूर्वानुमान को जोड़ता है",
    voiceBtnTitle: "आवाज से पूछें (हिंदी/मराठी/अंग्रेजी)",
    copyTitle: "सलाह कॉपी करें",
  },
  en: {
    headerTitle: "AI Market Assistant",
    headerDesc: "Personalized market intelligence, weather & price advice",
    quickAsk: "Quick Ask:",
    farmerGreeting:
      "Namaste Ramesh ji! 🙏 I am your **KrishiVistar AI Market Assistant**.\n\nI analyze live mandi prices, weather forecasts, transport costs, and storage availability to give you actionable advice for maximum net income.\n\n**Ask me anything** or tap one of the suggested questions below!",
    buyerGreeting:
      "Hello Anita! 🛒 I am your **KrishiVistar AI Sourcing Assistant**.\n\nI help you discover verified local farmers, secure direct wholesale and retail produce at fair rates, and track your escrow protected orders.\n\nHow can I help you today?",
    farmerPrompts: [
      "I have 2 tonnes of tomatoes. Where should I sell for highest net profit?",
      "Heavy rain is expected in 2 days. Should I harvest my crop early?",
      "Compare Nashik, Pune and Mumbai mandi prices after transport deduction",
      "Where is the nearest cold storage with available space?",
    ],
    buyerPrompts: [
      "I want to buy 500kg Grade A fresh tomatoes at best direct farm price",
      "Which verified farmers are within 25km of Pune with high rating?",
      "How does KrishiVistar escrow protect my money until delivery?",
      "What are current wholesale mandi benchmark rates for onions?",
    ],
    listeningVoice: "Listening in regional voice... Speak your agricultural query...",
    voiceFarmerInput: "Where should I sell 2 tonnes of tomatoes for highest price?",
    voiceBuyerInput: "Find nearest verified farmers with fresh Grade A tomatoes",
    inputPlaceholderFarmer: "Ask e.g. Where should I sell tomatoes today?",
    inputPlaceholderBuyer: "Ask e.g. Find best price for 500kg onions",
    analyzing: "Analyzing mandi prices, weather forecasts and transport routes...",
    geminiSource: "⚡ Powered by Gemini",
    systemSource: "🌾 KrishiVistar Intelligence",
    footerNotice: "KrishiVistar AI combines live Agmarknet / e-NAM data with IMD Weather Forecasts",
    voiceBtnTitle: "Voice query (Hindi/Marathi/English)",
    copyTitle: "Copy advice",
  },
};

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentRole,
  cropContext = "Tomato & Onion",
  currentLang = "en",
  onNavigateToFeature,
  initialQuery,
}) => {
  const safeLang: Language = (currentLang === "hi" || currentLang === "mr") ? currentLang : "en";
  const t = tAiDrawer[safeLang] || tAiDrawer.en;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastProcessedQueryRef = useRef<string | null>(null);

  const prompts = currentRole === "farmer" ? t.farmerPrompts : t.buyerPrompts;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-0",
      sender: "ai",
      text: currentRole === "farmer" ? t.farmerGreeting : t.buyerGreeting,
      timestamp: "Just now",
      source: "expert-engine",
    },
  ]);

  // Update greeting when language or role changes
  useEffect(() => {
    setMessages([
      {
        id: "msg-" + Date.now(),
        sender: "ai",
        text: currentRole === "farmer" ? t.farmerGreeting : t.buyerGreeting,
        timestamp: "Just now",
        source: "expert-engine",
      },
    ]);
  }, [safeLang, currentRole]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (queryToSend?: string) => {
    const queryText = (queryToSend || input).trim();
    if (!queryText || loading) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInput("");
    setLoading(true);

    try {
      // Parallel: check if user query asks for a feature or navigation intent
      const [aiResponse, searchRes] = await Promise.all([
        fetch("/api/ai-market-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queryText,
            role: currentRole,
            cropContext,
            location: "Nashik & Pune District, Maharashtra",
            lang: safeLang,
          }),
        }).then((r) => r.json()).catch(() => null),
        resolveFeatureDoubt(queryText, currentRole, safeLang).catch(() => null),
      ]);

      const baseText =
        aiResponse?.advice ||
        (searchRes?.found && searchRes.explanation
          ? searchRes.explanation
          : safeLang === "mr"
          ? "बाजार भावांचे विश्लेषण केले आहे. KrishiVistar वर थेट बाजारभाव, हवामान आणि शेतमाल खरेदी-विक्री सुविधा उपलब्ध आहेत."
          : safeLang === "hi"
          ? "मंडी भावों का विश्लेषण किया गया है। KrishiVistar पर लाइव भाव, मौसम और खरीद-बिक्री उपलब्ध है।"
          : "Market data analyzed. KrishiVistar provides real-time mandi rates, rate comparison, and direct produce orders.");

      // Calculate final role & tab strictly within buyer portal if currentRole === "buyer"
      let finalTab = searchRes?.targetTab;
      let finalRole = searchRes?.targetRole || currentRole;
      if (currentRole === "buyer") {
        finalRole = "buyer";
        if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
          finalTab = "compare";
        } else if (finalTab === "lots" || finalTab === "matching") {
          finalTab = "marketplace";
        }
      }

      const aiMsg: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: baseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: aiResponse?.source || "gemini",
        navigationTarget:
          searchRes?.found && finalTab
            ? {
                tabId: finalTab,
                label: searchRes.featureName || finalTab,
                role: finalRole,
              }
            : undefined,
        clarificationOptions: searchRes?.needsClarification
          ? searchRes.clarificationQuestions?.map((q) => ({
              ...q,
              targetRole: currentRole === "buyer" ? "buyer" : (q.targetRole || currentRole),
            }))
          : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Fallback
      const searchRes = await resolveFeatureDoubt(queryText, currentRole, safeLang).catch(() => null);
      let finalTab = searchRes?.targetTab;
      let finalRole = searchRes?.targetRole || currentRole;
      if (currentRole === "buyer") {
        finalRole = "buyer";
        if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
          finalTab = "compare";
        } else if (finalTab === "lots" || finalTab === "matching") {
          finalTab = "marketplace";
        }
      }

      const fallbackMsg: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text:
          searchRes?.found && searchRes.explanation
            ? searchRes.explanation
            : safeLang === "mr"
            ? `💡 **"${queryText}" साठी खरेदीदार विश्लेषण:**\n\n- **थेट शेतकरी दर**: मुंबई/पुणे बाजाराच्या तुलनेत थेट शेतातून ₹२५-२८/किलोने माल उपलब्ध आहे.\n- **बचत**: थेट खरेदीमुळे १८% ते २५% बचत होते.\n- **एस्क्रो सुरक्षा**: माल पोहोचल्यावर पडताळणी करून पैसे दिले जातात.`
            : safeLang === "hi"
            ? `💡 **"${queryText}" के लिए खरीदार विश्लेषण:**\n\n- **सीधे किसान भाव**: खुदरा सुपरमार्केट की तुलना में खेत से सीधे ₹२५-२८/किग्रा पर माल उपलब्ध है।\n- **बचत**: सीधे खरीद पर १८% से २५% की बचत होती है।\n- **एस्क्रो सुरक्षा**: डिलीवरी की जांच के बाद ही किसान को भुगतान होता है।`
            : `💡 **Buyer Analysis for "${queryText}":**\n\n- **Direct Farm Benchmark**: ₹25–28/kg direct from farmers vs ₹38–42/kg in retail.\n- **Wholesale Savings**: 20% to 25% lower than supermarket retail.\n- **Escrow Guarantee**: 100% payment safety until produce delivery inspection.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "expert-engine",
        navigationTarget:
          searchRes?.found && finalTab
            ? {
                tabId: finalTab,
                label: searchRes.featureName || finalTab,
                role: finalRole,
              }
            : undefined,
        clarificationOptions: searchRes?.needsClarification
          ? searchRes.clarificationQuestions?.map((q) => ({
              ...q,
              targetRole: currentRole === "buyer" ? "buyer" : (q.targetRole || currentRole),
            }))
          : undefined,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-trigger message when opened with an initialQuery (e.g. Rate Comparison button in Marketplace)
  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim()) {
      if (lastProcessedQueryRef.current !== initialQuery.trim()) {
        lastProcessedQueryRef.current = initialQuery.trim();
        handleSendMessage(initialQuery.trim());
      }
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!isOpen) {
      lastProcessedQueryRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSpeechRecognition = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        safeLang === "mr"
          ? "तुमच्या ब्राउझरमध्ये व्हॉइस ओळख उपलब्ध नाही. कृपया टाइप करून विचारा."
          : safeLang === "hi"
          ? "आपके ब्राउज़र में वॉइस पहचान उपलब्ध नहीं है। कृपया टाइप करके पूछें।"
          : "Voice recognition is not supported in this browser. Please type your question."
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Could not stop speech recognition", err);
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
        safeLang === "mr" ? "mr-IN" : safeLang === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results?.[0]?.[0]?.transcript?.trim();
        if (spokenText) {
          setInput(spokenText);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          setSpeechError(
            safeLang === "mr"
              ? "आवाज ऐकताना अडचण आली किंवा मायक्रोफोन परवानगी नाकारली गेली."
              : safeLang === "hi"
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
    <div className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header - Official Government Assistance Portal Style */}
      <div className="bg-[#0f2d4a] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#081e33]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-sans tracking-tight text-white">{t.headerTitle}</h3>
            </div>
            <p className="text-[11px] text-slate-300">
              {t.headerDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          id="close-ai-assistant-btn"
          className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
          {t.quickAsk}
        </span>
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="text-xs bg-white text-slate-700 hover:text-[#0f2d4a] hover:border-[#0f2d4a] border border-slate-300 px-2.5 py-1 rounded-md shadow-2xs shrink-0 transition-colors cursor-pointer font-medium"
          >
            {p.length > 35 ? p.substring(0, 35) + "..." : p}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-[#0f2d4a] text-white rounded-br-xs"
                  : "bg-white text-slate-800 border border-slate-300 rounded-bl-xs"
              }`}
            >
              {/* Formatted Text rendering with bold & bullet recognition */}
              <div className="space-y-1.5 whitespace-pre-line">
                {msg.text.split("\n").map((line, i) => {
                  if (line.startsWith("- ") || line.startsWith("• ")) {
                    return (
                      <div key={i} className="flex items-start gap-1.5 pl-1 text-slate-700">
                        <span className="text-[#0f2d4a] font-bold">•</span>
                        <span>{line.replace(/^[-•]\s*/, "")}</span>
                      </div>
                    );
                  }
                  if (line.startsWith("### ") || line.startsWith("## ")) {
                    return (
                      <h4 key={i} className="font-bold text-slate-900 mt-2">
                        {line.replace(/^#+\s*/, "")}
                      </h4>
                    );
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>

              {/* Direct Navigation Button if a feature was detected */}
              {msg.navigationTarget && onNavigateToFeature && (
                <div
                  id="open-direct-feature-card"
                  onClick={() => {
                    if (onNavigateToFeature && msg.navigationTarget) {
                      const finalRole = currentRole === "buyer" ? "buyer" : (msg.navigationTarget.role || currentRole);
                      let finalTab = msg.navigationTarget.tabId;
                      if (currentRole === "buyer") {
                        if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
                          finalTab = "compare";
                        } else if (finalTab === "lots" || finalTab === "matching") {
                          finalTab = "marketplace";
                        }
                      }
                      onNavigateToFeature(finalTab, finalRole);
                      onClose();
                    }
                  }}
                  className="mt-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer transition-all duration-150 shadow-2xs group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {currentLang === "mr"
                        ? "वैशिष्ट्य थेट उघडा:"
                        : currentLang === "hi"
                        ? "फीचर सीधे खोलें:"
                        : "Direct Feature Link:"}
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-950">
                      {msg.navigationTarget.label}
                    </span>
                  </div>
                  <button
                    id="open-direct-feature-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToFeature && msg.navigationTarget) {
                        const finalRole = currentRole === "buyer" ? "buyer" : (msg.navigationTarget.role || currentRole);
                        let finalTab = msg.navigationTarget.tabId;
                        if (currentRole === "buyer") {
                          if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
                            finalTab = "compare";
                          } else if (finalTab === "lots" || finalTab === "matching") {
                            finalTab = "marketplace";
                          }
                        }
                        onNavigateToFeature(finalTab, finalRole);
                        onClose();
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg bg-[#0f2d4a] hover:bg-[#16436e] group-hover:bg-emerald-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span>
                      {currentLang === "mr"
                        ? "येथे क्लिक करा"
                        : currentLang === "hi"
                        ? "यहाँ क्लिक करें"
                        : "Open Feature"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {/* Clarification Questions if intent was ambiguous */}
              {msg.clarificationOptions && msg.clarificationOptions.length > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {currentLang === "mr"
                        ? "आपल्याला काय हवे आहे? खालीलपैकी एक निवडा:"
                        : currentLang === "hi"
                        ? "आपको क्या चाहिए? इनमें से एक चुनें:"
                        : "Which feature are you looking for? Tap to open:"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {msg.clarificationOptions.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          if (onNavigateToFeature) {
                            const finalRole = currentRole === "buyer" ? "buyer" : (opt.targetRole || currentRole);
                            let finalTab = opt.targetTab;
                            if (currentRole === "buyer") {
                              if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
                                finalTab = "compare";
                              } else if (finalTab === "lots" || finalTab === "matching") {
                                finalTab = "marketplace";
                              }
                            }
                            onNavigateToFeature(finalTab, finalRole);
                            onClose();
                          }
                        }}
                        className="text-left p-2 rounded-lg bg-white hover:bg-amber-100/60 border border-amber-200 text-xs font-semibold text-slate-800 flex items-center justify-between gap-2 transition-colors cursor-pointer group"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message metadata */}
              <div
                className={`mt-2 pt-1 border-t flex items-center justify-between text-[10px] ${
                  msg.sender === "user"
                    ? "border-emerald-500/40 text-emerald-100"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.sender === "ai" && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">
                      {msg.source === "gemini" ? t.geminiSource : t.systemSource}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                      title={t.copyTitle}
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-3 rounded-xl border border-slate-200 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
            <span>{t.analyzing}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        {isListening && (
          <div className="mb-2 p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800 animate-pulse">
            <Mic className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>{t.listeningVoice}</span>
          </div>
        )}

        {speechError && (
          <div className="mb-2 p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between gap-2 text-xs text-rose-800">
            <span>{speechError}</span>
            <button
              onClick={() => setSpeechError(null)}
              className="text-rose-500 hover:text-rose-700 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
              isListening
                ? "bg-rose-50 border-rose-300 text-rose-600"
                : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
            }`}
            title={t.voiceBtnTitle}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              currentRole === "farmer" ? t.inputPlaceholderFarmer : t.inputPlaceholderBuyer
            }
            className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f2d4a] focus:border-[#0f2d4a] outline-hidden bg-white text-slate-900"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            id="send-ai-query-btn"
            className="p-2.5 bg-[#0f2d4a] hover:bg-[#16436e] disabled:opacity-50 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
