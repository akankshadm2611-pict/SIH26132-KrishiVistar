import { Language, UserRole } from "../types";

export interface ClarificationOption {
  label: string;
  targetTab: string;
  targetRole?: "farmer" | "buyer";
  badge?: string;
}

export interface FeatureSearchResult {
  found: boolean;
  targetTab?: string;
  targetRole?: "farmer" | "buyer";
  featureName?: string;
  explanation?: string;
  confidence?: "high" | "medium" | "low";
  needsClarification?: boolean;
  clarificationMessage?: string;
  clarificationQuestions?: ClarificationOption[];
  notSupported?: boolean;
  suggestedTabs?: string[];
}

export interface FeatureCatalogItem {
  id: string;
  role: "farmer" | "buyer";
  title: { en: string; hi: string; mr: string };
  desc: { en: string; hi: string; mr: string };
  category: "weather" | "market" | "selling" | "support" | "livestock" | "logistics";
  iconName: string;
  color: string;
  keywords: string[];
}

export const featureCatalog: FeatureCatalogItem[] = [
  {
    id: "weather",
    role: "farmer",
    title: {
      en: "Weather Prediction",
      hi: "मौसम भविष्यवाणी",
      mr: "हवामान अंदाज",
    },
    desc: {
      en: "Live 7-day IMD forecasts, storm warnings, rain probability, and safe crop harvest windows.",
      hi: "अगले ७ दिनों का मौसम पूर्वानुमान, भारी बारिश की चेतावनी और सुरक्षित फसल कटाई सलाह।",
      mr: "पुढील ७ दिवसांचा अचूक हवामान अंदाज, मुसळधार पावसाचा इशारा व पीक काढणी सुरक्षा सल्ला.",
    },
    category: "weather",
    iconName: "CloudSun",
    color: "bg-sky-500/10 text-sky-600 border-sky-200",
    keywords: [
      "weather",
      "forecast",
      "rain",
      "rainfall",
      "barish",
      "paus",
      "पाऊस",
      "हवामान",
      "अंदाज",
      "मौसम",
      "बारिश",
      "storm",
      "thunderstorm",
      "vadal",
      "temperature",
      "तापमान",
      "harvesting",
      "climate",
      "आभाळ",
    ],
  },
  {
    id: "mandi",
    role: "farmer",
    title: {
      en: "Current Mandi Price",
      hi: "वर्तमान मंडी भाव",
      mr: "चालू बाजारभाव",
    },
    desc: {
      en: "Real-time Agmarknet & APMC wholesale rates, arrivals in tonnes, and modal price benchmarks.",
      hi: "नासिक, पुणे, मुंबई सहित देश भर की प्रमुख मंडियों के लाइव भाव व दैनिक आवक।",
      mr: "नाशिक, पुणे, मुंबई एपीएमसीचे थेट दररोजचे बाजारभाव, आवक आणि सरासरी भाव.",
    },
    category: "market",
    iconName: "TrendingUp",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    keywords: [
      "mandi",
      "market",
      "price",
      "rate",
      "bhav",
      "भाव",
      "बाजारभाव",
      "मंडी",
      "दर",
      "daam",
      "apmc",
      "agmarknet",
      "enam",
      "arrivals",
      "आवक",
      "wholesale",
    ],
  },
  {
    id: "trends",
    role: "farmer",
    title: {
      en: "Price Trends",
      hi: "मूल्य रुझान",
      mr: "दर कल अंदाज",
    },
    desc: {
      en: "Historical price movements, AI price predictions, and optimal selling window suggestions.",
      hi: "ऐतिहासिक मूल्य ग्राफ, आगामी दिनों के मूल्य अनुमान और फसल बेचने का सबसे सही समय।",
      mr: "मागील दरांचे आलेख, पुढील ७ दिवसांचे संभाव्य भाव आणि शेतमाल विकण्याची सर्वोत्तम वेळ.",
    },
    category: "market",
    iconName: "TrendingUp",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    keywords: [
      "trend",
      "prediction",
      "forecast price",
      "graph",
      "भविष्य",
      "कल",
      "रुझान",
      "chart",
      "rise",
      "fall",
      "वाढणार",
      "कमी",
    ],
  },
  {
    id: "compare",
    role: "farmer",
    title: {
      en: "Smart Rate Calculator",
      hi: "स्मार्ट रेट कैलकुलेटर",
      mr: "स्मार्ट दर कॅल्क्युलेटर",
    },
    desc: {
      en: "Compare prices across Nashik, Pune & Mumbai after deducting exact transport and calculate your optimal selling rate.",
      hi: "परिवहन खर्च घटाने के बाद मुंबई, पुणे और नासिक मंडी भावों की तुलना व अपनी फसल दर निर्धारण।",
      mr: "वाहतूक व बाजार उपकर वजा जाता प्रत्यक्ष नफ्याची तुलना व शेतमालासाठी स्वतःचे वाजवी दर ठरवा.",
    },
    category: "market",
    iconName: "Calculator",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    keywords: [
      "smart rate calculator",
      "rate calculator",
      "calculator",
      "rate fixer",
      "asking price",
      "break even",
      "compare",
      "arbitrage",
      "mumbai vs pune",
      "net profit",
      "तुलना",
      "कॅल्क्युलेटर",
      "दर कॅल्क्युलेटर",
      "रेट कैलकुलेटर",
      "फायदा",
      "नफा",
      "profit",
      "difference",
    ],
  },
  {
    id: "buyer-compare",
    role: "buyer",
    title: {
      en: "Buyer Rate Comparison: Direct Farm vs Retail Supermarkets",
      hi: "खरीदार भाव तुलना: सीधे खेत से बनाम खुदरा सुपरमार्केट",
      mr: "खरेदीदार दर तुलना: थेट शेती खरेदी वि. किरकोळ सुपरमार्केट",
    },
    desc: {
      en: "Compare live direct farm prices against supermarket rates, benchmark fair purchase prices, and calculate wholesale savings.",
      hi: "सीधे खेत के भावों की खुदरा सुपरमार्केट दरों से तुलना करें और थोक खरीद बचत की गणना करें।",
      mr: "थेट शेतकरी भाव व किरकोळ सुपरमार्केट यांच्यातील चालू दर तुलना, वाजवी खरेदी भाव आणि बचत कॅल्क्युलेटर.",
    },
    category: "market",
    iconName: "ArrowRightLeft",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
    keywords: [
      "rate comparison",
      "price comparison",
      "benchmark price",
      "fair benchmark",
      "वाजवी खरेदी भाव",
      "भाव तुलना",
      "दर तुलना",
      "उचित खरीद मूल्य",
      "200kg",
      "200 kg",
      "२०० किलो",
      "२०० किग्रा",
      "supermarket",
      "retail",
      "compare rates",
      "buyer compare",
    ],
  },
  {
    id: "lots",
    role: "farmer",
    title: {
      en: "Produce Lots & Sell Crop",
      hi: "फसल लॉट प्रबंधन व बिक्री",
      mr: "शेतमाल लॉट नोंदणी व थेट विक्री",
    },
    desc: {
      en: "Create digital crop listings with photos, quality grades (Grade A/B), and asking prices to attract verified buyers.",
      hi: "फोटो, ग्रेड और अपने मनपसंद भाव के साथ डिजिटल लॉट बनाएं और सीधे खरीदारों से बोलियां पाएं।",
      mr: "शेतमालाचा फोटो, ग्रेड आणि अपेक्षित दर टाकून डिजिटल लॉट तयार करा व थेट खरेदीदार मिळवा.",
    },
    category: "selling",
    iconName: "Package",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
    keywords: [
      "sell",
      "sell crop",
      "list produce",
      "sell tomato",
      "sell onion",
      "vikri",
      "विक्री",
      "विकणे",
      "बेचना",
      "फसल बेचना",
      "शेतमाल विक्री",
      "लॉट तयार",
      "create lot",
    ],
  },
  {
    id: "marketplace",
    role: "buyer",
    title: {
      en: "Buyer Marketplace: Select Lots by Grade, Product & Distance",
      hi: "खरीदार मार्केटप्लेस: ग्रेड, फसल व दूरी अनुसार लॉट चयन",
      mr: "खरेदीदार बाजारपेठ: प्रत, पीक व अंतरानुसार लॉट निवड",
    },
    desc: {
      en: "Filter, select, and buy farm-fresh produce lots directly from farmers according to quality grade, crop product, and distance.",
      hi: "गुणवत्ता ग्रेड, फसल और दूरी के अनुसार सीधे किसानों से ताजा लॉट चुनें और एस्क्रो सुरक्षा के साथ खरीदें।",
      mr: "प्रत (Grade A/B), पीक व शेताच्या अंतरानुसार शेतमालाचे थेट लॉट निवडा आणि एस्क्रो सुरक्षेसह खरेदी करा.",
    },
    category: "selling",
    iconName: "ShoppingBag",
    color: "bg-sky-500/10 text-sky-700 border-sky-300",
    keywords: [
      "buy",
      "want to buy",
      "buy tomatoes",
      "buy tomato",
      "buy 500kg",
      "500kg",
      "direct farm price",
      "best direct farm price",
      "grade a",
      "grade a fresh tomatoes",
      "purchase",
      "buyer marketplace",
      "kharedi",
      "खरेदी",
      "खरीदना",
      "खरीद",
      "lot selection",
      "distance",
      "by distance",
      "by grade",
      "by product",
      "sourcing",
    ],
  },
  {
    id: "matching",
    role: "farmer",
    title: {
      en: "Buyer Matching & Direct Offers",
      hi: "खरीदार बोलियां व सीधी डील",
      mr: "खरेदीदार जुळवणी व थेट बोली",
    },
    desc: {
      en: "Receive and negotiate competitive bids from supermarkets, retail syndicates, and bulk institutional buyers.",
      hi: "सुपरमार्केट और थोक व्यापारियों से सीधी बोलियां स्वीकारें या काउंटर ऑफर दें।",
      mr: "सुपरमार्केट व घाऊक खरेदीदारांकडून थेट दर मागवा, बोली स्वीकारा किंवा काउंटर ऑफर द्या.",
    },
    category: "selling",
    iconName: "Users",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    keywords: [
      "buyer",
      "offer",
      "bid",
      "boli",
      "बोली",
      "खरेदीदार",
      "खरीदार",
      "negotiate",
      "deal",
      "matching",
      "supermarket",
    ],
  },
  {
    id: "calamity",
    role: "farmer",
    title: {
      en: "Govt Schemes",
      hi: "सरकारी योजनाएं",
      mr: "शासकीय योजना",
    },
    desc: {
      en: "Apply for natural disaster / unseasonal rain loss compensation, panchnama survey reports, and direct DBT payouts.",
      hi: "अतिवृष्टि, ओलावृष्टि व सूखे से नुकसान का सरकारी मुआवजा दावा, पंचनामा और सीधा DBT बैंक खाता ट्रांसफर।",
      mr: "अतिवृष्टी, गारपीट किंवा अवकाळी पावसाने झालेल्या पिकाच्या नुकसानीची शासकीय भरपाई, पंचनामा व थेट DBT ट्रॅकिंग.",
    },
    category: "support",
    iconName: "ShieldAlert",
    color: "bg-teal-500/10 text-teal-700 border-teal-300",
    keywords: [
      "calamity",
      "refund",
      "insurance",
      "pmfby",
      "damage",
      "loss",
      "भरपाई",
      "नुकसान",
      "मुआवजा",
      "विमा",
      "बीमा",
      "panchnama",
      "पंचनामा",
      "dbt",
      "compensation",
      "flood",
      "hailstorm",
      "गारपीट",
      "आपत्ती",
      "अतिवृष्टी",
    ],
  },
  {
    id: "cattle",
    role: "farmer",
    title: {
      en: "Cattle and Livestock",
      hi: "पशुधन एवं मवेशी",
      mr: "पशुधन व जनावरे",
    },
    desc: {
      en: "Verified local dairy & draft livestock keepers with phone numbers, available breeds (Gir, Murrah, Khillari), and distances.",
      hi: "सत्यापित स्थानीय पशुपालकों के फोन नंबर, उपलब्ध नस्लें (गीर, मुर्रा, खिल्लारी) और दूरी की पूरी सूची।",
      mr: "स्थानिक प्रमाणित पशुपालकांचे थेट मोबाईल नंबर, उपलब्ध गाय, म्हैस व बैल जाती (गीर, मुर्रा, खिल्लारी) आणि अंतराची सूची.",
    },
    category: "livestock",
    iconName: "PhoneCall",
    color: "bg-amber-500/10 text-amber-700 border-amber-300",
    keywords: [
      "cattle",
      "cow",
      "buffalo",
      "bull",
      "bullock",
      "goat",
      "livestock",
      "pashu",
      "पशुपालक",
      "जनावरे",
      "गाय",
      "म्हैस",
      "बैल",
      "भैंस",
      "दूध",
      "dairy",
      "keeper",
      "breed",
      "gir",
      "murrah",
      "khillari",
      "जाती",
      "वासरू",
    ],
  },
  {
    id: "storage",
    role: "farmer",
    title: {
      en: "Cold Storage",
      hi: "कोल्ड स्टोरेज",
      mr: "शीतगृह",
    },
    desc: {
      en: "Find nearby temperature-controlled cold hubs to prevent post-harvest spoilage and avoid distress sales.",
      hi: "फसल को सड़ने से बचाने और कम दाम में मजबूरी में बिक्री टालने के लिए निकटतम कोल्ड स्टोरेज।",
      mr: "शेतमाल टिकवण्यासाठी, सडणे रोखण्यासाठी आणि मंदीत पडत्या भावात विक्री टाळण्यासाठी जवळची शीतगृहे.",
    },
    category: "logistics",
    iconName: "Warehouse",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
    keywords: [
      "storage",
      "cold",
      "warehouse",
      "godown",
      "शीतगृह",
      "गोदाम",
      "कोल्ड",
      "साठवणूक",
      "rot",
      "distress",
      "capacity",
    ],
  },
  {
    id: "logistics",
    role: "farmer",
    title: {
      en: "Transport System",
      hi: "परिवहन व्यवस्था",
      mr: "वाहतूक व्यवस्था",
    },
    desc: {
      en: "Book 1T to 10T mini-trucks, tempos, and pickup vehicles with transparent per-km freight estimates.",
      hi: "पारदर्शी प्रति किमी भाड़े के साथ मिनी-ट्रक, टेम्पो और पिकअप वाहन की तुरंत बुकिंग।",
      mr: "पारदर्शक प्रति किमी दरांसह १ टन ते १० टन मिनी ट्रक, टेम्पो व पिकअप वाहनांची बुकिंग.",
    },
    category: "logistics",
    iconName: "Truck",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    keywords: [
      "logistics",
      "transport",
      "truck",
      "tempo",
      "vehicle",
      "वाहतूक",
      "गाडी",
      "टेम्पो",
      "परिवहन",
      "भाडे",
      "pickup",
    ],
  },
  {
    id: "finance",
    role: "farmer",
    title: {
      en: "Farm Finance & Kisan Credit Card",
      hi: "कृषि वित्त, केसीसी व भुगतान",
      mr: "कृषी वित्त, किसान क्रेडिट कार्ड व देयके",
    },
    desc: {
      en: "Kisan Credit Card (KCC) interest subvention schemes, escrow payouts, and farm credit advisory.",
      hi: "किसान क्रेडिट कार्ड (केसीसी) ऋण, ब्याज छूट योजनाएं और सुरक्षित एस्क्रो बैंक भुगतान ट्रैकिंग।",
      mr: "किसान क्रेडिट कार्ड (KCC) कर्ज, व्याज सवलत योजना आणि एस्क्रो सुरक्षित बँक खात्यात देयके.",
    },
    category: "support",
    iconName: "CreditCard",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    keywords: [
      "loan",
      "kcc",
      "finance",
      "bank",
      "कर्ज",
      "पैसे",
      "ऋण",
      "क्रेडिट",
      "interest",
      "escrow",
      "subsidy",
      "अनुदान",
    ],
  },
];

/**
 * Intelligent semantic feature resolver.
 * Tries server-side Gemini first; falls back to comprehensive regional rule engine.
 */
export async function resolveFeatureDoubt(
  query: string,
  role: UserRole = "farmer",
  lang: Language = "en"
): Promise<FeatureSearchResult> {
  const clean = query.trim();
  if (!clean) {
    return {
      found: false,
      needsClarification: true,
      clarificationMessage:
        lang === "mr"
          ? "कृपया आपला प्रश्न विचारा किंवा खालील वैशिष्ट्यांपैकी एक निवडा:"
          : lang === "hi"
          ? "कृपया अपना प्रश्न लिखें या नीचे दिए गए विकल्पों में से चुनें:"
          : "Please enter your question or choose one of the features below:",
      clarificationQuestions: getTopClarificationQuestions(lang),
    };
  }

  // Attempt backend API call
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch("/api/ai-feature-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: clean, role, lang }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.found && data.targetTab) {
        let finalRole = data.targetRole || role;
        let finalTab = data.targetTab;
        if (role === "buyer") {
          finalRole = "buyer";
          if (finalTab === "mandi" || finalTab === "trends" || finalTab === "buyer-compare") {
            finalTab = "compare";
          } else if (finalTab === "lots" || finalTab === "matching") {
            finalTab = "marketplace";
          }
        }
        return {
          found: true,
          targetTab: finalTab,
          targetRole: finalRole,
          featureName: data.featureName || getFeatureName(finalTab, lang, finalRole),
          explanation: data.explanation || getFeatureExplanation(finalTab, lang, finalRole),
          confidence: data.confidence || "high",
        };
      } else if (data.needsClarification) {
        return {
          found: false,
          needsClarification: true,
          clarificationMessage: data.message || getClarificationIntro(lang),
          clarificationQuestions: data.clarificationQuestions || getTopClarificationQuestions(lang, role),
        };
      } else if (data.notSupported) {
        return {
          found: false,
          notSupported: true,
          explanation: data.message,
          suggestedTabs: role === "buyer" ? ["marketplace", "compare", "nearby", "finance"] : (data.suggestedTabs || ["weather", "mandi", "calamity", "cattle"]),
        };
      }
    }
  } catch {
    // API failed or timed out -> fallback to client-side rule engine
  }

  // Client-side rule engine
  return matchFeatureLocally(clean, role, lang);
}

function matchFeatureLocally(
  query: string,
  role: UserRole,
  lang: Language
): FeatureSearchResult {
  const q = query.toLowerCase();

  // Fast Path 1: Rate Comparison / Benchmark Price (e.g. 200kg fresh tomatoes, fair benchmark price, farm vs supermarket)
  const isRateCompareIntent =
    q.includes("rate comparison") ||
    q.includes("compare rate") ||
    q.includes("price comparison") ||
    q.includes("compare price") ||
    q.includes("rate compare") ||
    q.includes("benchmark price") ||
    q.includes("fair benchmark") ||
    q.includes("वाजवी खरेदी भाव") ||
    q.includes("भाव तुलना") ||
    q.includes("दर तुलना") ||
    q.includes("उचित खरीद मूल्य") ||
    q.includes("उचित मूल्य") ||
    q.includes("200kg") ||
    q.includes("200 kg") ||
    q.includes("२०० किलो") ||
    q.includes("२०० किग्रा") ||
    q.includes("supermarket") ||
    q.includes("retail rate") ||
    (role === "buyer" && (q.includes("compare") || q.includes("तुलना") || q.includes("बेंचमार्क") || q.includes("benchmark")));

  if (isRateCompareIntent) {
    return {
      found: true,
      targetTab: "compare",
      targetRole: "buyer",
      featureName:
        lang === "mr"
          ? "खरेदीदार दर तुलना: थेट शेती खरेदी वि. किरकोळ सुपरमार्केट"
          : lang === "hi"
          ? "खरीदार भाव तुलना: सीधे खेत से बनाम खुदरा सुपरमार्केट"
          : "Buyer Rate Comparison: Direct Farm vs Retail Supermarkets",
      explanation:
        lang === "mr"
          ? "होय! खरेदीदार पोर्टलमध्ये थेट शेतकरी भाव आणि किरकोळ सुपरमार्केट यांच्यातील चालू दर तुलना व बचत कॅल्क्युलेटर उपलब्ध आहे."
          : lang === "hi"
          ? "हाँ! खरीदार पोर्टल में सीधे खेत से बनाम खुदरा सुपरमार्केट भाव तुलना एवं बचत कैलकुलेटर उपलब्ध है।"
          : "Yes! Direct Farm vs Supermarket Rate Comparison & Savings Calculator is available in the Buyer Portal to compare live farm-gate rates against retail supermarkets.",
      confidence: "high",
    };
  }

  // Fast Path 2: Buyer Marketplace with lot selection by grade, product & distance
  const isBuyIntent =
    q.includes("buy") ||
    q.includes("want to buy") ||
    q.includes("purchase") ||
    q.includes("खरीद") ||
    q.includes("खरेदी") ||
    q.includes("500kg") ||
    q.includes("sourcing") ||
    q.includes("best direct farm price") ||
    q.includes("direct farm price") ||
    (q.includes("grade a") && (q.includes("tomato") || q.includes("onion") || q.includes("fresh"))) ||
    (role === "buyer" && !q.includes("weather") && !q.includes("cattle") && !q.includes("calamity"));

  if (isBuyIntent) {
    return {
      found: true,
      targetTab: "marketplace",
      targetRole: "buyer",
      featureName:
        lang === "mr"
          ? "खरेदीदार बाजारपेठ: प्रत, पीक व अंतरानुसार लॉट निवड"
          : lang === "hi"
          ? "खरीदार मार्केटप्लेस: ग्रेड, फसल व दूरी अनुसार लॉट चयन"
          : "Buyer Marketplace: Select Lots by Grade, Product & Distance",
      explanation:
        lang === "mr"
          ? "होय! खरेदीदार पोर्टलमध्ये थेट शेतकरी बाजारपेठ उपलब्ध असून येथे प्रत (Grade A), पीक आणि अंतरानुसार लॉट निवडून थेट खरेदी करू शकता."
          : lang === "hi"
          ? "हाँ! खरीदार पोर्टल में डायरेक्ट फार्म मार्केटप्लेस उपलब्ध है जहाँ ग्रेड, फसल व दूरी अनुसार लॉट चुनकर सीधे किसानों से खरीद सकते हैं।"
          : "Yes! The Buyer Marketplace is available in the Buyer Portal to select and order produce lots according to quality grade, crop product, and farm distance with 100% Escrow safety.",
      confidence: "high",
    };
  }

  // Score each catalog item
  let bestMatch: FeatureCatalogItem | null = null;
  let highestScore = 0;

  for (const item of featureCatalog) {
    // If user is buyer, skip purely farmer features unless no buyer alternative exists
    let score = 0;
    if (role === "buyer" && item.role === "buyer") {
      score += 3;
    }
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length > 4 ? 3 : 2;
      }
    }
    // Boost matching title words
    const titleEn = item.title.en.toLowerCase();
    const titleMr = item.title.mr.toLowerCase();
    const titleHi = item.title.hi.toLowerCase();
    if (q.includes(titleEn) || q.includes(titleMr) || q.includes(titleHi)) {
      score += 6;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Check threshold
  if (bestMatch && highestScore >= 3) {
    let finalTab = bestMatch.id === "buyer-compare" ? "compare" : bestMatch.id;
    let finalRole = bestMatch.role;
    if (role === "buyer") {
      finalRole = "buyer";
      if (finalTab === "mandi" || finalTab === "trends") {
        finalTab = "compare";
      } else if (finalTab === "lots" || finalTab === "matching") {
        finalTab = "marketplace";
      }
    }
    return {
      found: true,
      targetTab: finalTab,
      targetRole: finalRole,
      featureName: getFeatureName(finalTab, lang, finalRole),
      explanation: getFeatureExplanation(finalTab, lang, finalRole),
      confidence: highestScore >= 6 ? "high" : "medium",
    };
  }

  // Ambiguous: query is too brief or no clear single match
  return {
    found: false,
    needsClarification: true,
    clarificationMessage: getClarificationIntro(lang),
    clarificationQuestions: getTopClarificationQuestions(lang, role),
  };
}

function getFeatureName(tabId: string, lang: Language, role?: UserRole): string {
  if (tabId === "compare" && role === "buyer") {
    return lang === "mr"
      ? "खरेदीदार दर तुलना: थेट शेती खरेदी वि. किरकोळ सुपरमार्केट"
      : lang === "hi"
      ? "खरीदार भाव तुलना: सीधे खेत से बनाम खुदरा सुपरमार्केट"
      : "Buyer Rate Comparison: Direct Farm vs Retail Supermarkets";
  }
  const item = featureCatalog.find((f) => (role ? f.id === tabId && f.role === role : f.id === tabId)) || featureCatalog.find((f) => f.id === tabId);
  if (!item) return tabId;
  return item.title[lang] || item.title.en;
}

function getFeatureExplanation(tabId: string, lang: Language, role?: UserRole): string {
  switch (tabId) {
    case "compare":
      if (role === "buyer") {
        return lang === "mr"
          ? "होय! खरेदीदार पोर्टलमध्ये थेट शेतकरी भाव आणि किरकोळ सुपरमार्केट यांच्यातील चालू दर तुलना व बचत कॅल्क्युलेटर उपलब्ध आहे."
          : lang === "hi"
          ? "हाँ! खरीदार पोर्टल में सीधे खेत से बनाम खुदरा सुपरमार्केट भाव तुलना एवं बचत कैलकुलेटर उपलब्ध है।"
          : "Yes! Direct Farm vs Supermarket Rate Comparison & Savings Calculator is available directly in the Buyer Portal.";
      }
      return lang === "mr"
        ? "होय! वाहतूक व उपकर वजा जाता विविध बाजारांमधील प्रत्यक्ष निव्वळ नफ्याची तुलना उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! विभिन्न मंडियों में परिवहन खर्च घटाकर वास्तविक मुनाफे की तुलना उपलब्ध है।"
        : "Yes! Multi-Market Comparison is available to compare net realizations across APMC markets.";
    case "weather":
      return lang === "mr"
        ? "होय! KrishiVistar वर हवामान अंदाज व काढणी सल्ला उपलब्ध आहे. येथे पुढील ७ दिवसांचा पाऊस व अतिवृष्टी इशारा मिळेल."
        : lang === "hi"
        ? "हाँ! KrishiVistar पर मौसम पूर्वानुमान व कृषि सलाह उपलब्ध है। यहाँ अगले ७ दिनों की बारिश और कटाई का जोखिम पता चलता है।"
        : "Yes! Weather Forecast & Harvest Advisory is available on KrishiVistar with 7-day rainfall forecasts and storm alerts.";
    case "calamity":
      return lang === "mr"
        ? "होय! नैसर्गिक आपत्ती व अतिवृष्टीमुळे झालेल्या पिकाच्या नुकसानीसाठी शासकीय भरपाई व थेट DBT बँक खात्यात ट्रॅकिंग सुविधा येथे उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! प्राकृतिक आपदा व भारी बारिश से हुए फसल नुकसान का मुआवजा दावा और डायरेक्ट DBT बैंक ट्रैकिंग यहाँ उपलब्ध है।"
        : "Yes! Government Calamity Refund & PMFBY Crop Insurance is available with damage compensation forms and DBT tracking.";
    case "cattle":
      return lang === "mr"
        ? "होय! KrishiVistar वर स्थानिक प्रमाणित पशुपालकांची थेट संपर्क क्रमांकासह सूची उपलब्ध आहे, जिथून गाय, म्हैस व बैल थेट खरेदी करू शकता."
        : lang === "hi"
        ? "हाँ! KrishiVistar पर सत्यापित पशुपालकों की फोन नंबर सहित सूची उपलब्ध है जहाँ गाय, भैंस व बैल की जानकारी मिलती है।"
        : "Yes! Nearby Cattle Keepers Directory is available with direct phone numbers and verified livestock breeds.";
    case "mandi":
      return lang === "mr"
        ? "होय! नाशिक, पुणे, मुंबई आणि देशभरातील एपीएमसी मंडींचे थेट दैनंदिन बाजारभाव व आवक आकडेवारी उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! नासिक, पुणे, मुंबई सहित देश की प्रमुख मंडियों के लाइव भाव और आवक यहाँ उपलब्ध हैं।"
        : "Yes! Live Mandi Market Prices are available with real-time arrivals and modal price benchmarks.";
    case "lots":
      return lang === "mr"
        ? "होय! आपण आपल्या शेतमालाचा फोटो, ग्रेड व अपेक्षित दर टाकून डिजिटल लॉट तयार करू शकता व थेट खरेदीदारांकडून बोली मिळवू शकता."
        : lang === "hi"
        ? "हाँ! आप अपनी फसल का फोटो, ग्रेड और भाव डालकर लॉट बना सकते हैं और सीधे खरीदारों से बोलियां प्राप्त कर सकते हैं।"
        : "Yes! Produce Lot Management allows you to list your crops with photos, grades, and prices to sell directly to buyers.";
    case "marketplace":
      return lang === "mr"
        ? "होय! खरेदीदार पोर्टलमध्ये थेट शेतकरी बाजारपेठ उपलब्ध असून येथे प्रत (Grade A/B), पीक आणि अंतरानुसार लॉट निवडून १००% एस्क्रो सुरक्षेसह खरेदी करता येते."
        : lang === "hi"
        ? "हाँ! खरीदार पोर्टल में डायरेक्ट फार्म मार्केटप्लेस उपलब्ध है जहाँ ग्रेड (Grade A/B), फसल और दूरी अनुसार लॉट चुनकर १००% एस्क्रो सुरक्षा के साथ ऑर्डर कर सकते हैं।"
        : "Yes! The Buyer Marketplace is available in the Buyer Portal to select and order produce lots filtered by quality grade, crop product, and farm distance with 100% Escrow safety.";
    case "storage":
      return lang === "mr"
        ? "होय! शेतमाल टिकवण्यासाठी आणि कमी भावात विक्री टाळण्यासाठी जवळच्या शीतगृहांची उपलब्धता व दर तपासण्याची सुविधा उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! फसल को सुरक्षित रखने और कम दाम में बिक्री से बचने के लिए निकटतम कोल्ड स्टोरेज की उपलब्धता यहाँ उपलब्ध है।"
        : "Yes! Cold Storage & Warehouses directory allows you to find nearby facilities to preserve your harvest.";
    case "logistics":
      return lang === "mr"
        ? "होय! शेतमाल बाजारात नेण्यासाठी मिनी-ट्रक व टेम्पोचे भाडे व बुकिंग सुविधा उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! मंडी तक माल पहुँचाने के लिए पिकअप व मिनी-ट्रक की बुकिंग यहाँ उपलब्ध है।"
        : "Yes! Logistics & Transport booking with transparent vehicle rates is available.";
    case "finance":
      return lang === "mr"
        ? "होय! किसान क्रेडिट कार्ड (KCC), व्याज सवलत योजना आणि एस्क्रो सुरक्षित देयके येथे उपलब्ध आहेत."
        : lang === "hi"
        ? "हाँ! किसान क्रेडिट कार्ड (केसीसी) ऋण और सुरक्षित भुगतान ट्रैकिंग यहाँ उपलब्ध है।"
        : "Yes! Farm Finance & Kisan Credit Card (KCC) services and escrow payout tracking are available.";
    default:
      return lang === "mr"
        ? "होय! हे वैशिष्ट्य KrishiVistar वर उपलब्ध आहे."
        : lang === "hi"
        ? "हाँ! यह सुविधा KrishiVistar पर उपलब्ध है।"
        : "Yes! This feature is available on KrishiVistar.";
  }
}

function getClarificationIntro(lang: Language): string {
  return lang === "mr"
    ? "आम्हाला आपला प्रश्न पूर्णपणे समजला नाही. अचूक वैशिष्ट्याकडे जाण्यासाठी कृपया खालीलपैकी एक पर्याय निवडा किंवा अधिक तपशील लिहा:"
    : lang === "hi"
    ? "हम आपका प्रश्न पूरी तरह समझ नहीं पाए। सही फीचर पर जाने के लिए कृपया नीचे दिए गए विकल्पों में से चुनें या थोड़ा और लिखें:"
    : "We couldn't quite determine which feature you need. Please choose one of the options below or describe in more detail:";
}

function getTopClarificationQuestions(lang: Language, role?: UserRole): ClarificationOption[] {
  if (role === "buyer") {
    return [
      {
        label:
          lang === "mr"
            ? "📊 थेट शेती वि. किरकोळ सुपरमार्केट दर तुलना व बचत कॅल्क्युलेटर?"
            : lang === "hi"
            ? "📊 सीधे खेत बनाम सुपरमार्केट भाव तुलना व बचत कैलकुलेटर?"
            : "📊 Compare Direct Farm vs Retail Supermarket Rates & Savings?",
        targetTab: "compare",
        targetRole: "buyer",
        badge: lang === "mr" ? "दर तुलना" : lang === "hi" ? "भाव तुलना" : "Rate Compare",
      },
      {
        label:
          lang === "mr"
            ? "🛒 प्रत (Grade A), पीक व अंतरानुसार शेतमालाचे थेट लॉट निवडून खरेदी करायची आहे?"
            : lang === "hi"
            ? "🛒 ग्रेड (Grade A), फसल और दूरी अनुसार सीधे किसानों से लॉट खरीदना है?"
            : "🛒 Buyer Marketplace: Select Lots by Grade, Product & Distance?",
        targetTab: "marketplace",
        targetRole: "buyer",
        badge: lang === "mr" ? "बाजारपेठ" : lang === "hi" ? "मार्केटप्लेस" : "Marketplace",
      },
      {
        label:
          lang === "mr"
            ? "🚜 १५-२५ किमी अंतरावरील प्रमाणित स्थानिक शेतकरी पाहायचे आहेत?"
            : lang === "hi"
            ? "🚜 १५-२५ किमी के दायरे में सत्यापित स्थानीय किसान देखने हैं?"
            : "🚜 Find Nearby Verified Local Farmers Directory?",
        targetTab: "nearby",
        targetRole: "buyer",
        badge: lang === "mr" ? "स्थानिक शेतकरी" : lang === "hi" ? "निकटतम किसान" : "Nearby Farmers",
      },
      {
        label:
          lang === "mr"
            ? "💳 एस्क्रो पेमेंट सुरक्षा व व्यवहार स्थिती तपासायची आहे?"
            : lang === "hi"
            ? "💳 एस्क्रो भुगतान सुरक्षा व ऑर्डर स्थिति देखनी है?"
            : "💳 Escrow Payment Protection & Orders Tracking?",
        targetTab: "finance",
        targetRole: "buyer",
        badge: lang === "mr" ? "एस्क्रो सुरक्षा" : lang === "hi" ? "एस्क्रो" : "Escrow",
      },
    ];
  }

  return [
    {
      label:
        lang === "mr"
          ? "⛈️ पाऊस, वादळ किंवा हवामान अंदाज पाहायचा आहे?"
          : lang === "hi"
          ? "⛈️ बारिश या मौसम पूर्वानुमान देखना है?"
          : "⛈️ Check weather forecast and rainfall warnings?",
      targetTab: "weather",
      badge: lang === "mr" ? "हवामान" : lang === "hi" ? "मौसम" : "Weather",
    },
    {
      label:
        lang === "mr"
          ? "📊 आजचे थेट मंडी बाजारभाव व दर कल तपासायचे आहेत?"
          : lang === "hi"
          ? "📊 आज के लाइव मंडी भाव और मूल्य रुझान देखने हैं?"
          : "📊 Check live mandi prices and 7-day price trends?",
      targetTab: "mandi",
      badge: lang === "mr" ? "बाजारभाव" : lang === "hi" ? "मंडी भाव" : "Mandi Rates",
    },
    {
      label:
        lang === "mr"
          ? "📦 शेतमाल (टोमॅटो/कांदा) विक्रीसाठी नवीन लॉट नोंदवायचा आहे?"
          : lang === "hi"
          ? "📦 फसल (टमाटर/प्याज) बिक्री के लिए लॉट बनाना है?"
          : "📦 List and sell your harvest lots to verified buyers?",
      targetTab: "lots",
      badge: lang === "mr" ? "शेतमाल विक्री" : lang === "hi" ? "फसल बिक्री" : "Sell Produce",
    },
    {
      label:
        lang === "mr"
          ? "🛡️ नैसर्गिक आपत्ती / अतिवृष्टी पिकाचे नुकसान झाले असून शासकीय भरपाई हवी आहे?"
          : lang === "hi"
          ? "🛡️ बारिश/आपदा से फसल क्षति हुई है और सरकारी मुआवजा दावा करना है?"
          : "🛡️ Apply for Govt Calamity Refund / PMFBY Crop Insurance?",
      targetTab: "calamity",
      badge: lang === "mr" ? "नुकसान भरपाई" : lang === "hi" ? "मुआवजा" : "Calamity Refund",
    },
    {
      label:
        lang === "mr"
          ? "🐄 जवळचे पशुपालक व दुभती गाय/म्हैस/बैल संपर्क हवे आहेत?"
          : lang === "hi"
          ? "🐄 निकटतम पशुपालक और गाय/भैंस/बैल संपर्क चाहिए?"
          : "🐄 Find nearby cattle keepers & livestock contacts?",
      targetTab: "cattle",
      badge: lang === "mr" ? "पशुपालक" : lang === "hi" ? "पशुधन" : "Cattle Keepers",
    },
    {
      label:
        lang === "mr"
          ? "❄️ शेतमाल टिकवण्यासाठी जवळचे शीतगृह (Cold Storage) शोधायचे आहे?"
          : lang === "hi"
          ? "❄️ फसल सुरक्षित रखने हेतु निकटतम कोल्ड स्टोरेज खोजना है?"
          : "❄️ Book cold storage to preserve perishable harvest?",
      targetTab: "storage",
      badge: lang === "mr" ? "शीतगृह" : lang === "hi" ? "कोल्ड स्टोरेज" : "Cold Storage",
    },
    {
      label:
        lang === "mr"
          ? "🚚 शेतमाल बाजारात नेण्यासाठी टेम्पो किंवा मिनी-ट्रक हवा आहे?"
          : lang === "hi"
          ? "🚚 फसल मंडी ले जाने के लिए टेम्पो या पिकअप चाहिए?"
          : "🚚 Book transport vehicle (mini-truck/tempo) for harvest?",
      targetTab: "logistics",
      badge: lang === "mr" ? "वाहतूक" : lang === "hi" ? "परिवहन" : "Logistics",
    },
    {
      label:
        lang === "mr"
          ? "💳 किसान क्रेडिट कार्ड (KCC) किंवा कृषी कर्ज योजना पाहायच्या आहेत?"
          : lang === "hi"
          ? "💳 किसान क्रेडिट कार्ड (केसीसी) ऋण योजनाएं देखनी हैं?"
          : "💳 View Kisan Credit Card (KCC) loans & finance?",
      targetTab: "finance",
      badge: lang === "mr" ? "कृषी कर्ज" : lang === "hi" ? "ऋण" : "Finance",
    },
  ];
}
