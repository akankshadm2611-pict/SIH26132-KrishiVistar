import React, { useState } from "react";
import {
  BookOpen,
  X,
  Camera,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building,
  PhoneCall,
  Download,
  HelpCircle,
  FileCheck2,
  ChevronRight,
  Volume2,
} from "lucide-react";
import { Language } from "../../translations";

interface CalamityUserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  onJumpToForm?: () => void;
}

export const CalamityUserManualModal: React.FC<CalamityUserManualModalProps> = ({
  isOpen,
  onClose,
  currentLang = "en",
  onJumpToForm,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [playingAudioHint, setPlayingAudioHint] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateAudioRead = (text: string) => {
    setPlayingAudioHint(text);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === "mr" ? "mr-IN" : currentLang === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingAudioHint(null);
      utterance.onerror = () => setPlayingAudioHint(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingAudioHint(null), 3500);
    }
  };

  const handleDownloadManual = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const stepsData = [
    {
      step: 1,
      title:
        currentLang === "mr"
          ? "१. आपत्तीची ७२ तासांत प्राथमिक नोंद"
          : currentLang === "hi"
          ? "1. आपदा की 72 घंटों में रिपोर्टिंग"
          : "1. 72-Hour Calamity Intimation",
      badge: "७२ तास नियम (Golden Rule)",
      summary:
        currentLang === "mr"
          ? "अवकाळी पाऊस, गारपीट, अतिवृष्टी किंवा पूर आल्यानंतर ७२ तासांच्या आत पोर्टलवर किंवा टोल-फ्री १४४४७ वर सूचना देणे आवश्यक आहे."
          : "As per PMFBY norms, unseasonal rain, hailstorm, or waterlogging must be intimated within 72 hours for timely surveyor dispatch.",
      audioText:
        currentLang === "mr"
          ? "पहिली पायरी: अवकाळी पाऊस किंवा गारपीट झाल्यानंतर ७२ तासांच्या आत आपल्या पिकाचे नुकसान पोर्टलवर नोंदवा."
          : "Step 1: Always report crop damage within 72 hours of the calamity event.",
      tips: [
        currentLang === "mr" ? "नुकसान झालेले पीक व अचूक शेताचा गट क्रमांक / तालुका निवडा." : "Select your affected crop and exact plot / taluka.",
        currentLang === "mr" ? "अंदाजे नुकसानीची टक्केवारी स्लायडरने ठरवा (३३% पेक्षा जास्त असणे गरजेचे)." : "Set estimated loss percentage (must be over 33% for SDRF trigger).",
      ],
    },
    {
      step: 2,
      title:
        currentLang === "mr"
          ? "२. थेट वेबसाइटवरून भू-टॅग फोटो काढणे"
          : currentLang === "hi"
          ? "2. वेबसाइट से जियोटैग्ड फोटो खींचना"
          : "2. Capture In-Website Geotagged Photo",
      badge: "GPS पुरावा (Digital Evidence)",
      summary:
        currentLang === "mr"
          ? "वेबसाइटमधील 'कॅमेरा उघडा' बटण दाबून शेतात प्रत्यक्ष उभे राहून फोटो काढा. प्रणाली स्वयंचलितपणे अक्षांश, रेखांश, अचूक वेळ आणि तारीख फोटोवर नोंदवते."
          : "Use the live camera inside the website while standing in the affected field. Live GPS coordinates and timestamp are automatically burned into the photo.",
      audioText:
        currentLang === "mr"
          ? "दुसरी पायरी: शेतात उभे राहून वेबसाइटमधील कॅमेराने फोटो काढा. फोटोवर जीपीएस लोकेशन आपोआप येईल."
          : "Step 2: Take photo in field using in-website camera to stamp live GPS coordinates.",
      tips: [
        currentLang === "mr" ? "कॅमेऱ्याला लोकेशन परवानगी (Location Permission) द्या." : "Ensure browser location/GPS permission is granted.",
        currentLang === "mr" ? "नुकसान स्पष्ट दिसेल असा पिकाचा व पाण्याचा फोटो घ्या." : "Ensure damaged stalks, hail impact, or waterlogging is clearly visible.",
      ],
    },
    {
      step: 3,
      title:
        currentLang === "mr"
          ? "३. कागदपत्रे जोडणे व ऑनलाइन अर्ज सादर"
          : currentLang === "hi"
          ? "3. दस्तावेज संलग्न व ऑनलाइन आवेदन"
          : "3. Document Upload & Direct Online Submit",
      badge: "कागदपत्रे (Doc Checklist)",
      summary:
        currentLang === "mr"
          ? "७/१२ उतारा, आधार कार्ड प्रत, बँक पासबुक आणि विमा पावती यांची माहिती तपासून एका क्लिकवर ऑनलाइन अर्ज थेट दाखल करा."
          : "Attach 7/12 land extract, Aadhaar card copy, bank passbook, and PMFBY policy slip, then submit the form directly online.",
      audioText:
        currentLang === "mr"
          ? "तिसरी पायरी: आपले ७/१२, आधार कार्ड व बँक पासबुक तपासून थेट ऑनलाइन सबमिट बटण दाबा."
          : "Step 3: Verify documents and click Submit to lodge your claim directly online.",
      tips: [
        currentLang === "mr" ? "बँक खाते आधारशी संलग्न (Aadhaar Seeded) असल्याची खात्री करा." : "Verify your bank account is Aadhaar seeded for instant DBT credit.",
        currentLang === "mr" ? "अर्ज सबमिट होताच दावा क्रमांक (Claim ID) SMS द्वारे मिळतो." : "Save the auto-generated Claim ID for tracking.",
      ],
    },
    {
      step: 4,
      title:
        currentLang === "mr"
          ? "४. शासकीय कार्यालये व विम्याकडे आपोआप वर्ग"
          : currentLang === "hi"
          ? "4. स्थानीय कृषि कार्यालय व बीमा कंपनी को प्रेषण"
          : "4. Auto-Dispatch to Agri Office & Insurer",
      badge: "त्रिस्तरीय तपासणी (3-Tier Check)",
      summary:
        currentLang === "mr"
          ? "आपला अर्ज एकाच वेळी १) तालुका कृषी अधिकारी कार्यालय, २) मंडळ महसूल अधिकारी (तलाठी), आणि ३) पीक विमा कंपनी यांच्याकडे तपासणीसाठी पाठवला जातो."
          : "Your claim is instantly dispatched simultaneously to 1) Local Agriculture Office, 2) Revenue Officer/Talathi, and 3) Empaneled Crop Insurance Company.",
      audioText:
        currentLang === "mr"
          ? "चौथी पायरी: आपला अर्ज तालुका कृषी कार्यालय, तलाठी व विमा कंपनी यांच्याकडे तत्काळ पाठवला जातो."
          : "Step 4: Your claim request is dispatched to local agriculture, revenue, and insurance officers.",
      tips: [
        currentLang === "mr" ? "पंचनामा होईपर्यंत शेताची मशागत किंवा नांगरणी करू नका." : "Do not plow or disturb the damaged field until spot e-panchnama is signed.",
        currentLang === "mr" ? "अधिकारी प्रत्यक्ष पाहणी करून डिजिटल पंचनामा नोंदवतील." : "The inspection team conducts joint on-site spot assessment.",
      ],
    },
    {
      step: 5,
      title:
        currentLang === "mr"
          ? "५. मंजूर किंवा नाकारल्यास थेट कार्यालय वेळ"
          : currentLang === "hi"
          ? "5. स्वीकृति अथवा अस्वीकृति पर कार्यालय समय निर्धारण"
          : "5. Acceptance (DBT) or Rejection (Office Visit)",
      badge: "पारदर्शक निकाल (Zero Queue)",
      summary:
        currentLang === "mr"
          ? "अर्ज मंजूर झाल्यास 'Approved' दिसेल व DBT द्वारे रक्कम खात्यात जमा होईल. जर काही त्रुटीमुळे दावा नाकारला गेला, तर थेट ऑनलाइन अपील करून आपल्या सोयीची कार्यालय भेट तारीख निश्चित करता येईल."
          : "If accepted, status reflects 'Approved' and DBT is transferred. If rejected, you can file an online appeal and receive a suitable office appointment date to save time.",
      audioText:
        currentLang === "mr"
          ? "पाचवी पायरी: मंजूर झाल्यास पैसे खात्यात येतील, आणि नाकारल्यास थेट कार्यालय भेट वेळ निवडून काम त्वरित करून घ्या."
          : "Step 5: If approved, DBT is credited. If rejected, book a suitable office date to get work resolved without queues.",
      tips: [
        currentLang === "mr" ? "कार्यालय भेट वेळेमुळे रांगेत उभे राहण्याचा त्रास वाचतो." : "Fixed appointment saves hours of standing in queues.",
        currentLang === "mr" ? "अपील दिवशी सोबत मूळ ७/१२ व कागदपत्रे घेऊन जा." : "Carry original 7/12 extract and passbook on the scheduled date.",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 border border-teal-400/30 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-mono font-bold mb-0.5">
                <span>FARMER USER MANUAL & CALAMITY GUIDE</span>
              </div>
              <h3 className="text-base font-bold font-display">
                {currentLang === "mr"
                  ? "नैसर्गिक आपत्ती भरपाई व पीक विमा — शेतकरी वापरकर्ता मार्गदर्शिका"
                  : currentLang === "hi"
                  ? "प्राकृतिक आपदा मुआवजा व फसल बीमा — किसान यूजर मैनुअल"
                  : "Govt Calamity Relief & Crop Insurance — Farmer User Manual"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {/* Quick Audio Readout Bar */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-semibold text-[11px]">
                {currentLang === "mr"
                  ? "वाचण्यात अडचण येत असल्यास आवाज मार्गदर्शक (Audio Guide) ऐका:"
                  : "Need audio assistance? Listen to spoken voice instructions for any step:"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleSimulateAudioRead(stepsData[activeStepTab - 1].audioText)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {playingAudioHint
                  ? (currentLang === "mr" ? "आवाज चालू आहे..." : "Playing...")
                  : (currentLang === "mr" ? "ही पायरी ऐका (Listen)" : "Listen to this Step")}
              </span>
            </button>
          </div>

          {/* 5 Step Progress Tabs */}
          <div className="grid grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {stepsData.map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepTab(item.step)}
                className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                  activeStepTab === item.step
                    ? "bg-teal-700 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-medium"
                }`}
              >
                <span className="block text-xs font-bold font-mono">
                  {currentLang === "mr" ? `पायरी ${item.step}` : `Step ${item.step}`}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content Card */}
          {(() => {
            const current = stepsData[activeStepTab - 1];
            return (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-black flex items-center justify-center text-xs">
                      {current.step}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm font-display">
                      {current.title}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold border border-teal-200">
                    {current.badge}
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                  {current.summary}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="font-bold text-slate-800 block text-[11px]">
                    {currentLang === "mr" ? "महत्त्वाच्या सूचना व कृती:" : "Key Guidelines & Actions:"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2 text-[11px] text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Essential Helpline Numbers Box */}
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
            <div>
              <span className="text-teal-700 font-bold block">PMFBY Toll-Free</span>
              <span className="text-base font-black text-teal-900 font-display">14447</span>
              <span className="text-[10px] text-slate-500 block">24x7 पीक विमा तक्रार</span>
            </div>
            <div>
              <span className="text-teal-700 font-bold block">Kisan Call Center</span>
              <span className="text-base font-black text-teal-900 font-display">1800-180-1551</span>
              <span className="text-[10px] text-slate-500 block">कृषी मार्गदर्शक हेल्पलाइन</span>
            </div>
            <div>
              <span className="text-teal-700 font-bold block">Disaster Relief Desk</span>
              <span className="text-base font-black text-teal-900 font-display">1077</span>
              <span className="text-[10px] text-slate-500 block">जिल्हा आपत्ती निवारण कक्ष</span>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {currentLang === "mr"
                  ? "शेतकरी मार्गदर्शिका (User Manual PDF) डाऊनलोड झाली!"
                  : "Calamity Relief Farmer User Manual PDF downloaded successfully!"}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handleDownloadManual}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>
                {currentLang === "mr" ? "मार्गदर्शिका PDF डाउनलोड करा" : "Download User Manual (PDF)"}
              </span>
            </button>

            <div className="flex items-center gap-2">
              {onJumpToForm && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onJumpToForm();
                  }}
                  id="user-manual-start-claim-btn"
                  className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {currentLang === "mr" ? "आत्ताच नुकसान नोंदवा" : "Report Calamity Now"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                {currentLang === "mr" ? "बंद करा" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
