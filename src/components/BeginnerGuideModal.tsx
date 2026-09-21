import React from "react";
import {
  X,
  UserCheck,
  TrendingUp,
  Handshake,
  Truck,
  CreditCard,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sprout,
  ShoppingBag,
} from "lucide-react";
import { UserRole, Language } from "../types";

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  currentLang?: Language;
}

const tGuide = {
  mr: {
    badge: "शेतकऱ्यांसाठी सुलभ कृषी बाजारपेठ",
    titlePrefix: "Krishi",
    titleSuffix: "Vistar",
    titleRest: " तुमच्यासाठी कसे कार्य करते",
    desc: "शेतापासून थेट बाजारापर्यंत अधिक फायदेशीर निर्णय. शेतकरी आणि खरेदीदार दोघांनाही हमीभाव आणि सुरक्षित एस्क्रो पेमेंटद्वारे खात्रीशीर व्यापार कसा करता येतो ते जाणून घ्या.",
    farmerGuide: "शेतकरी मार्गदर्शक",
    buyerGuide: "खरेदीदार मार्गदर्शक",
    step1: "नोंदणी आणि प्रोफाइल",
    step1Desc: "शेतकरी किंवा खरेदीदार म्हणून सामील व्हा. पडताळणीमुळे विश्वास बॅज मिळतो आणि थेट सुरक्षित व्यापार सुरू होतो.",
    step2: "बाजारभाव आणि एआय सल्ला",
    step2Desc: "थेट बाजार भाव, ७ दिवसांचा हवामान व पावसाचा अंदाज आणि एआय विक्री-वेळ शिफारशी तपासा.",
    step3: "लॉट तयार करा / ऑफर द्या",
    step3Desc: "शेतकरी शेतमालाचा दर्जा व आधारभूत किमतीसह लॉट नोंदवतात; खरेदीदार थेट डिजिटल बोली व काऊंटर-ऑफर देतात.",
    step4: "निश्चिती आणि वाहतूक बुकिंग",
    step4Desc: "१-क्लिकमध्ये व्यवहार निश्चित करा. कमी दरात माल विकणे टाळण्यासाठी ट्रान्सपोर्ट किंवा शीतगृह बुक करा.",
    step5: "एस्क्रो पेमेंट आणि ट्रॅकिंग",
    step5Desc: "खरेदीदाराची रक्कम एस्क्रोमध्ये सुरक्षित राहते. डिलिव्हरी तपासणीनंतर शेतकऱ्याला तात्काळ थेट पेमेंट मिळते.",
    step6: "रेटिंग आणि विश्वास वृद्धी",
    step6Desc: "डिलिव्हरीनंतर अभिप्राय आणि रेटिंगमुळे पुढील मोठ्या घाऊक व्यवहारांसाठी मजबूत प्रतिष्ठा निर्माण होते.",
    tipsFarmerTitle: "शेतकऱ्यांसाठी जास्तीत जास्त नफ्यासाठी महत्त्वाच्या टिप्स:",
    tipsBuyerTitle: "खरेदीदारांसाठी उत्कृष्ट गुणवत्तेसाठी महत्त्वाच्या टिप्स:",
    farmerTip1: "पावसामुळे होणारे नुकसान टाळण्यासाठी टोमॅटो किंवा भाजीपाल्याची काढणी करण्यापूर्वी नेहमी **हवामान सल्ला** तपासा.",
    farmerTip2: "वाहतूक खर्च वजा जाता मुंबई की पुण्यात जास्त निव्वळ नफा मिळतो हे तपासण्यासाठी **बाजार तुलना टूल** वापरा.",
    farmerTip3: "जादा शेतमाल आहे? भाव वाढण्याची शक्यता असताना ३-५ दिवस माल सुरक्षित ठेवण्यासाठी जवळचे **शीतगृह (Cold Storage)** शोधा.",
    buyerTip1: "वाहतूक वेळ कमी करण्यासाठी आणि जास्तीत जास्त ताजेपणा मिळवण्यासाठी थेट २५ किमी परिसरातील प्रमाणित **स्थानिक शेतकऱ्यांकडून** खरेदी करा.",
    buyerTip2: "घाऊक सवलतीची गणना करण्यासाठी आणि वाटाघाटी करण्यापूर्वी चालू बाजार बेंचमार्क दर तपासण्यासाठी **एआय मार्केट असिस्टंट** वापरा.",
    buyerTip3: "जोपर्यंत तुम्ही प्रत्यक्ष शेतमाल तपासून स्वीकारत नाही, तोपर्यंत तुमचे पैसे १००% **सुरक्षित एस्क्रो** मध्ये राहतात.",
    footerText: "KrishiVistar २०२६ · स्मार्ट बाजारपेठ, योग्य भाव",
    gotItBtn: "समजले, सुरू करा",
  },
  hi: {
    badge: "किसानों के लिए सरल कृषि बाजार",
    titlePrefix: "Krishi",
    titleSuffix: "Vistar",
    titleRest: " आपके लिए कैसे काम करता है",
    desc: "खेत से बाजार तक बेहतर निर्णय। जानें कि किसान और खरीदार दोनों गारंटीकृत कीमतों और सुरक्षित एस्क्रो भुगतान के साथ विश्वासपूर्वक व्यापार कैसे करते हैं।",
    farmerGuide: "किसान गाइड",
    buyerGuide: "खरीदार गाइड",
    step1: "पंजीकरण और प्रोफाइल",
    step1Desc: "किसान या खरीदार के रूप में जुड़ें। सत्यापन से विश्वास बैज मिलता है और सुरक्षित व्यापार संभव होता है।",
    step2: "मंडी भाव एवं एआई सलाह",
    step2Desc: "लाइव मंडी भाव, ७-दिवसीय मौसम पूर्वानुमान और एआई बिक्री-समय सिफारिशें देखें।",
    step3: "लॉट बनाएं / ऑफर दें",
    step3Desc: "किसान ग्रेड व आधार मूल्य के साथ फसल लॉट डालते हैं; खरीदार डिजिटल बोली व काउंटर-ऑफर भेजते हैं।",
    step4: "पुष्टि और परिवहन बुकिंग",
    step4Desc: "१-क्लिक में सौदा पक्का करें। औने-पौने दाम पर बेचने से बचने के लिए ट्रांसपोर्ट या कोल्ड स्टोरेज बुक करें।",
    step5: "एस्क्रो भुगतान और ट्रैकिंग",
    step5Desc: "खरीदार का पैसा सुरक्षित एस्क्रो में रहता है। डिलीवरी जांच के बाद किसान को सीधे भुगतान जारी होता है।",
    step6: "रेटिंग और विश्वास",
    step6Desc: "डिलीवरी के बाद रेटिंग से भविष्य के बड़े थोक सौदों के लिए भरोसेमंद प्रतिष्ठा बनती है।",
    tipsFarmerTitle: "किसानों के लिए अधिकतम लाभ के टिप्स:",
    tipsBuyerTitle: "खरीदारों के लिए सर्वोत्तम गुणवत्ता के टिप्स:",
    farmerTip1: "बारिश के नुकसान से बचने के लिए टमाटर या नाजुक सब्जियों की तुड़ाई से पहले **मौसम सलाह** अवश्य देखें।",
    farmerTip2: "परिवहन खर्च घटाने के बाद मुंबई या पुणे में अधिक शुद्ध मुनाफा कहां मिलेगा, यह जांचने के लिए **मल्टी-मंडी तुलना टूल** का उपयोग करें।",
    farmerTip3: "अतिरिक्त फसल है? भाव बढ़ने की उम्मीद होने पर ३-५ दिन रखने के लिए निकटतम **कोल्ड स्टोरेज** खोजें।",
    buyerTip1: "पारगमन समय घटाने और ताजगी सुनिश्चित करने के लिए २५ किमी के दायरे में सत्यापित **स्थानीय किसानों** से सीधे ऑर्डर करें।",
    buyerTip2: "थोक छूट की गणना करने और बातचीत से पहले चालू मंडी बेंचमार्क दरें देखने के लिए **एआई मार्केट असिस्टेंट** का उपयोग करें।",
    buyerTip3: "जब तक आप फसल प्राप्त और निरीक्षण नहीं कर लेते, आपका भुगतान १००% **सुरक्षित एस्क्रो** में रहता है।",
    footerText: "KrishiVistar २०२६ · स्मार्ट बाजार, बेहतर भाव",
    gotItBtn: "समझ गया, शुरू करें",
  },
  en: {
    badge: "Beginner-Friendly Agricultural Marketplace",
    titlePrefix: "Krishi",
    titleSuffix: "Vistar",
    titleRest: " Works For You",
    desc: "From farm to market with smarter decisions. Learn how both farmers and buyers transact safely with guaranteed prices and secure escrow payments.",
    farmerGuide: "Farmer Guide",
    buyerGuide: "Buyer Guide",
    step1: "Register & Profile",
    step1Desc: "Join as Farmer or Buyer. Profile verification provides trust badge and access to verified trading.",
    step2: "Check Market & AI",
    step2Desc: "Check live mandi rates, 7-day weather rain alerts, and AI sale-window recommendations.",
    step3: "Create Lot / Make Offer",
    step3Desc: "Farmers post crop lots with grade and base price; buyers submit digital bids & counteroffers.",
    step4: "Confirm & Book Logistics",
    step4Desc: "Finalize deal with 1-click. Book optimized trucks or cold storage to avoid distress selling.",
    step5: "Escrow Payment & Track",
    step5Desc: "Buyer funds are safely held in escrow. Payout is released directly to farmer upon delivery inspection.",
    step6: "Rate & Build Trust",
    step6Desc: "Post-delivery reviews and rating build long-term reputation for repeat wholesale deals.",
    tipsFarmerTitle: "Farmer Quick Tips to Maximize Profit:",
    tipsBuyerTitle: "Buyer Quick Tips for Best Quality:",
    farmerTip1: "Always check the **Weather Harvest Advisory** before plucking tomatoes or sensitive vegetables to avoid rain damage.",
    farmerTip2: "Use the **Multi-Market Compare Tool** to check whether shipping to Mumbai or Pune yields higher net profit after subtracting transport costs.",
    farmerTip3: "Got excess crop? Discover nearest **Cold Storage** to hold for 3-5 days when prices are expected to surge.",
    buyerTip1: "Order directly from verified **Nearby Farmers** (within 25km) to cut transit time and get maximum freshness.",
    buyerTip2: "Use **AI Market Assistant** to calculate bulk discounts and check current mandi benchmark rates before negotiating.",
    buyerTip3: "Your payment stays 100% in **Safe Escrow** until you physically receive and inspect your produce.",
    footerText: "KrishiVistar 2026 · Smarter Markets, Better Prices",
    gotItBtn: "Got It, Start Exploring",
  },
};

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole,
  currentLang = "en",
}) => {
  if (!isOpen) return null;

  const t = tGuide[currentLang] || tGuide.en;

  const journeySteps = [
    {
      step: "Step 1",
      title: t.step1,
      desc: t.step1Desc,
      icon: UserCheck,
      color: "bg-emerald-500",
    },
    {
      step: "Step 2",
      title: t.step2,
      desc: t.step2Desc,
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      step: "Step 3",
      title: t.step3,
      desc: t.step3Desc,
      icon: Handshake,
      color: "bg-amber-500",
    },
    {
      step: "Step 4",
      title: t.step4,
      desc: t.step4Desc,
      icon: Truck,
      color: "bg-indigo-500",
    },
    {
      step: "Step 5",
      title: t.step5,
      desc: t.step5Desc,
      icon: CreditCard,
      color: "bg-teal-500",
    },
    {
      step: "Step 6",
      title: t.step6,
      desc: t.step6Desc,
      icon: Star,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display">
            How {t.titlePrefix}<span className="text-emerald-300">{t.titleSuffix}</span>{t.titleRest}
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {t.desc}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <div className="text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-white/20 text-white border border-white/30">
              {currentRole === "farmer" ? (
                <>
                  <Sprout className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.farmerGuide}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-sky-300" />
                  <span>{t.buyerGuide}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {journeySteps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {item.step}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Role specific tips */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {currentRole === "farmer" ? t.tipsFarmerTitle : t.tipsBuyerTitle}
              </span>
            </h4>
            <ul className="text-xs text-emerald-800 space-y-1.5 pl-5 list-disc">
              {currentRole === "farmer" ? (
                <>
                  <li>{t.farmerTip1}</li>
                  <li>{t.farmerTip2}</li>
                  <li>{t.farmerTip3}</li>
                </>
              ) : (
                <>
                  <li>{t.buyerTip1}</li>
                  <li>{t.buyerTip2}</li>
                  <li>{t.buyerTip3}</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {t.footerText}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{t.gotItBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
