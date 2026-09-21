import React, { useState } from "react";
import {
  Star,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
  HelpCircle,
  ThumbsUp,
  Clock,
  X,
} from "lucide-react";
import { TransactionOrder } from "../../types";
import { Language } from "../../translations";

interface ReviewItem {
  id: string;
  orderId: string;
  crop: string;
  farmerName: string;
  stars: number;
  freshness: number;
  gradeAccuracy: number;
  comment: string;
  date: string;
}

interface GrievanceTicket {
  id: string;
  orderId: string;
  crop: string;
  farmerName: string;
  category: string;
  details: string;
  status: "Under Review" | "Resolved (Refund Initiated)" | "Closed";
  requestedResolution: string;
  date: string;
}

interface BuyerPostDeliveryRatingsProps {
  orders: TransactionOrder[];
  currentLang?: Language;
}

const tPostDeliveryRatings = {
  mr: {
    heroTitle: "डिलिव्हरीनंतर अभिप्राय आणि तक्रार निवारण",
    heroSubtitle: "KrishiVistar सहभाग: शेतकऱ्यांचा विश्वास वाढवण्यासाठी गुणवत्ता रेटिंग द्या किंवा १००% ग्राहक संरक्षणाखाली तक्रार नोंदवा",
    tabRate: "★ मिळालेल्या शेतमालाला रेटिंग द्या",
    tabGrievance: "🛡️ तक्रार / वाद नोंदवा",
    rateTitle: "प्राप्त झालेल्या शेतमालाचे मूल्यांकन करा",
    rateSuccessMsg: "धन्यवाद! तुमच्या रेटिंगमुळे शेतकऱ्याचा विश्वास गुणांक व सार्वजनिक प्रोफाइल अद्ययावत झाली आहे.",
    selectOrder: "पूर्ण झालेली ऑर्डर निवडा",
    overallRating: "एकूण गुणवत्ता रेटिंग:",
    starsOutOf: "/ ५ स्टार",
    freshnessParam: "कापणी ताजेपणा (रंग / ताजेपणा):",
    feedbackLabel: "शेतकऱ्यासाठी अभिप्राय (टिप्पणी व गुणवत्तेच्या नोंदी)",
    feedbackPlaceholder: "चव, पॅकिंग, क्रेटची स्थिती किंवा वक्तशीरपणाबद्दल माहिती लिहा...",
    publishReviewBtn: "प्रमाणित अभिप्राय प्रसिद्ध करा",
    pastReviewsTitle: "तुमचे मागील प्रमाणित अभिप्राय",
    soldBy: "विक्रेता:",
    orderHash: "ऑर्डर #",
    freshnessScore: "ताजेपणा गुण:",
    grievanceTitle: "गुणवत्ता तक्रार किंवा वाद दाखल करा",
    grievanceSubtitle: "आमचे निवारण केंद्र पडताळणी करत असताना एस्क्रो पेमेंट थांबवले जाते",
    grievanceSuccessMsg: "तक्रार तिकीट तयार झाले! KrishiVistar एस्क्रोने ऑर्डरच्या पेमेंटवर तात्पुरती स्थगिती दिली आहे.",
    selectIssueOrder: "समस्या असलेली ऑर्डर निवडा",
    issueCategory: "तक्रारीचा प्रकार",
    optDefect: "शेतमाल खराब / दाबलेला",
    optWeight: "काट्यावर वजन कमी",
    optWrongGrade: "ग्रेड A ऐवजी ग्रेड B मिळाला",
    optDelay: "वाहतुकीस जास्त उशीर / माल नासला",
    requestedResolution: "अपेक्षित उपाय",
    optPartialRefund: "२०% अंशतः परतावा (एस्क्रो कपात)",
    optFullRefund: "पूर्ण माल परत व १००% परतावा",
    optReplace: "दुसऱ्या शेतकऱ्याकडून नवीन लॉट",
    explainIssue: "समस्येचे स्पष्टीकरण द्या (फोटोच्या नोंदींसह)",
    explainPlaceholder: "क्रेटची स्थिती, नासलेल्या मालाची टक्केवारी किंवा वजन पावतीतील फरक लिहा...",
    submitGrievanceBtn: "एस्क्रो मध्यस्थाकडे तक्रार पाठवा",
    pastGrievancesTitle: "सक्रिय व मागील तक्रार प्रकरणे",
    ticketHash: "तिकीट #",
    resolution: "उपाय:",
  },
  hi: {
    heroTitle: "डिलीवरी के बाद रेटिंग एवं शिकायत निवारण",
    heroSubtitle: "KrishiVistar यात्रा: किसानों का विश्वास बढ़ाने के लिए गुणवत्ता रेटिंग दें या १००% खरीदार सुरक्षा के तहत शिकायत दर्ज करें",
    tabRate: "★ प्राप्त उपज को रेट करें",
    tabGrievance: "🛡️ शिकायत / विवाद दर्ज करें",
    rateTitle: "अपनी प्राप्त उपज को रेट करें",
    rateSuccessMsg: "धन्यवाद! आपकी रेटिंग ने किसान के विश्वास स्कोर और सत्यापित खरीदार स्कोर को अपडेट कर दिया है।",
    selectOrder: "पूर्ण हुआ ऑर्डर चुनें",
    overallRating: "समग्र गुणवत्ता रेटिंग:",
    starsOutOf: "/ ५ स्टार",
    freshnessParam: "फसल की ताजगी (कुरकुरापन / रंग):",
    feedbackLabel: "किसान के लिए फीडबैक (टिप्पणी एवं गुणवत्ता नोट्स)",
    feedbackPlaceholder: "स्वाद, पैकिंग, क्रेट की स्थिति या समयबद्धता के बारे में विवरण लिखें...",
    publishReviewBtn: "सत्यापित समीक्षा प्रकाशित करें",
    pastReviewsTitle: "आपकी पिछली सत्यापित समीक्षाएं",
    soldBy: "विक्रेता:",
    orderHash: "ऑर्डर #",
    freshnessScore: "ताजगी स्कोर:",
    grievanceTitle: "गुणवत्ता शिकायत या विवाद दर्ज करें",
    grievanceSubtitle: "जब तक हमारा समाधान डेस्क दावे की समीक्षा करता है, एस्क्रो भुगतान रोक दिया जाता है",
    grievanceSuccessMsg: "शिकायत टिकट बन गया! KrishiVistar एस्क्रो ने ऑर्डर भुगतान पर अस्थायी रोक लगा दी है।",
    selectIssueOrder: "समस्या वाला ऑर्डर चुनें",
    issueCategory: "समस्या की श्रेणी",
    optDefect: "उपज गुणवत्ता दोष / दबा हुआ माल",
    optWeight: "वजन कांटे पर कमी",
    optWrongGrade: "ग्रेड A की जगह ग्रेड B मिला",
    optDelay: "परिवहन में अत्यधिक देरी / खराबी",
    requestedResolution: "वांछित समाधान",
    optPartialRefund: "आंशिक २०% रिफंड (एस्क्रो कटौती)",
    optFullRefund: "पूरी वापसी और १००% रिफंड",
    optReplace: "निकटवर्ती किसान से प्रतिस्थापन लॉट",
    explainIssue: "समस्या का विवरण दें (फोटो नोट्स सहित)",
    explainPlaceholder: "क्रेट की स्थिति, सड़ी हुई उपज का प्रतिशत या वजन पर्ची अंतर बताएं...",
    submitGrievanceBtn: "एस्क्रो मध्यस्थ को शिकायत भेजें",
    pastGrievancesTitle: "सक्रिय एवं पिछले शिकायत मामले",
    ticketHash: "टिकट #",
    resolution: "समाधान:",
  },
  en: {
    heroTitle: "Post-Delivery Ratings & Grievance Redressal",
    heroSubtitle: "KrishiVistar journey: Rate quality to build farmer trust, or resolve disputes under 100% buyer protection",
    tabRate: "★ Rate Delivered Produce",
    tabGrievance: "🛡️ File Grievance / Dispute",
    rateTitle: "Rate Your Received Produce",
    rateSuccessMsg: "Thank you! Your rating has updated the farmer's public trust badge and verified buyer score.",
    selectOrder: "Select Completed Order",
    overallRating: "Overall Quality Rating:",
    starsOutOf: "/ 5 Stars",
    freshnessParam: "Harvest Freshness (Crispness / Color):",
    feedbackLabel: "Feedback for Farmer (Comments & Quality Notes)",
    feedbackPlaceholder: "Share details about flavor, packing, crate condition, or promptness...",
    publishReviewBtn: "Publish Verified Review",
    pastReviewsTitle: "Your Past Verified Reviews",
    soldBy: "Sold by",
    orderHash: "Order #",
    freshnessScore: "Freshness Score:",
    grievanceTitle: "File Quality Grievance or Dispute",
    grievanceSubtitle: "Escrow payment is halted while our resolution desk audits your claim",
    grievanceSuccessMsg: "Grievance ticket created! KrishiVistar Escrow has placed a temporary hold on the order payout.",
    selectIssueOrder: "Select Order with Issue",
    issueCategory: "Issue Category",
    optDefect: "Produce Quality Defect / Bruised",
    optWeight: "Weight Deficit at Weighbridge",
    optWrongGrade: "Received Grade B instead of Grade A",
    optDelay: "Excess Transit Delay / Spoilage",
    requestedResolution: "Requested Resolution",
    optPartialRefund: "Partial 20% Refund (Escrow Deduction)",
    optFullRefund: "Full Return & 100% Refund",
    optReplace: "Replacement Lot Dispatch",
    explainIssue: "Explain the Issue (with photo notes)",
    explainPlaceholder: "Describe crate condition, percentage of rotten/soft produce, or weight slip difference...",
    submitGrievanceBtn: "Submit Grievance to Escrow Mediator",
    pastGrievancesTitle: "Active & Past Grievance Cases",
    ticketHash: "Ticket #",
    resolution: "Resolution:",
  },
};

export const BuyerPostDeliveryRatings: React.FC<BuyerPostDeliveryRatingsProps> = ({
  orders,
  currentLang = "en",
}) => {
  const t = tPostDeliveryRatings[currentLang] || tPostDeliveryRatings.en;
  const [activeTab, setActiveTab] = useState<"ratings" | "grievances">("ratings");

  // New review form
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || "ord-1018");
  const [stars, setStars] = useState<number>(5);
  const [freshnessScore, setFreshnessScore] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState(false);

  // New grievance form
  const [grievanceCategory, setGrievanceCategory] = useState("Produce Quality Defect");
  const [grievanceDetails, setGrievanceDetails] = useState("");
  const [requestedResolution, setRequestedResolution] = useState("Partial 20% Refund");
  const [grievanceSubmittedNotice, setGrievanceSubmittedNotice] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "rev-1",
      orderId: "ord-1018",
      crop: "Red Onion (Garwa)",
      farmerName: "Suresh Jagtap",
      stars: 5,
      freshness: 5,
      gradeAccuracy: 5,
      comment:
        "Exceptional curing quality. Dry crisp skin with zero rot in all 1,500kg bags. Highly recommend this farmer for wholesale supply!",
      date: "Sep 09, 2026",
    },
  ]);

  const [grievances, setGrievances] = useState<GrievanceTicket[]>([
    {
      id: "GRV-8821",
      orderId: "ord-1012",
      crop: "Table Grapes",
      farmerName: "Ganesh Shinde",
      category: "Transit Bruising (5% loss)",
      details: "Top 4 crates had loose berries due to pothole shock during road transit.",
      status: "Resolved (Refund Initiated)",
      requestedResolution: "Partial Refund of ₹2,400",
      date: "Sep 05, 2026",
    },
  ]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

    const newRev: ReviewItem = {
      id: "rev-" + Date.now(),
      orderId: order?.id || "ord-1018",
      crop: order?.crop || "Tomato",
      farmerName: order?.farmerName || "Farmer",
      stars,
      freshness: freshnessScore,
      gradeAccuracy: 5,
      comment: comment || "Delivered fresh directly from farm as described.",
      date: "Just Now",
    };

    setReviews([newRev, ...reviews]);
    setComment("");
    setReviewSubmittedNotice(true);
    setTimeout(() => setReviewSubmittedNotice(false), 3000);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

    const newGrv: GrievanceTicket = {
      id: "GRV-" + Math.floor(1000 + Math.random() * 9000),
      orderId: order?.id || "ord-1018",
      crop: order?.crop || "Tomato",
      farmerName: order?.farmerName || "Farmer",
      category: grievanceCategory,
      details: grievanceDetails,
      status: "Under Review",
      requestedResolution,
      date: "Just Now",
    };

    setGrievances([newGrv, ...grievances]);
    setGrievanceDetails("");
    setGrievanceSubmittedNotice(true);
    setTimeout(() => setGrievanceSubmittedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            {t.heroTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-center">
          <button
            onClick={() => setActiveTab("ratings")}
            className={`h-8 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
              activeTab === "ratings"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.tabRate}
          </button>
          <button
            onClick={() => setActiveTab("grievances")}
            className={`h-8 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
              activeTab === "grievances"
                ? "bg-rose-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.tabGrievance}
          </button>
        </div>
      </div>

      {activeTab === "ratings" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submit Rating Form (Left) */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t.rateTitle}
              </h3>
            </div>

            {reviewSubmittedNotice && (
              <div className="p-3 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.rateSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.selectOrder}
                </label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} - {o.crop} ({o.quantityKg}kg) from {o.farmerName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star rating selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.overallRating} {stars} {t.starsOutOf}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setStars(starVal)}
                      className="p-1 text-2xl hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          starVal <= stars
                            ? "fill-amber-400 text-amber-500"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-parameters */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">{t.freshnessParam}</span>
                  <span className="font-bold text-emerald-700">{freshnessScore} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={freshnessScore}
                  onChange={(e) => setFreshnessScore(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.feedbackLabel}
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-hidden"
                />
              </div>

              <button
                type="submit"
                id="submit-buyer-review-btn"
                className="w-full h-9 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.publishReviewBtn}</span>
              </button>
            </form>
          </div>

          {/* Published Reviews Feed (Right) */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-1">
              {t.pastReviewsTitle} ({reviews.length})
            </span>

            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.crop}</h4>
                    <span className="text-xs text-slate-500">
                      {t.soldBy} <strong>{rev.farmerName}</strong> · {t.orderHash}{rev.orderId}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-xs font-extrabold text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{rev.stars}.0</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{t.freshnessScore} {rev.freshness}/5</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grievances & Dispute Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Grievance Form (Left) */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {t.grievanceTitle}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t.grievanceSubtitle}
                </p>
              </div>
            </div>

            {grievanceSubmittedNotice && (
              <div className="p-3 bg-amber-100 text-amber-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>{t.grievanceSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleGrievanceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.selectIssueOrder}
                </label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} - {o.crop} ({o.farmerName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.issueCategory}
                </label>
                <select
                  value={grievanceCategory}
                  onChange={(e) => setGrievanceCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  <option value="Produce Quality Defect">{t.optDefect}</option>
                  <option value="Weight Deficit">{t.optWeight}</option>
                  <option value="Wrong Grade Delivered">{t.optWrongGrade}</option>
                  <option value="Excess Delay in Transit">{t.optDelay}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.requestedResolution}
                </label>
                <select
                  value={requestedResolution}
                  onChange={(e) => setRequestedResolution(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  <option value="Partial 20% Refund">{t.optPartialRefund}</option>
                  <option value="Full Return & 100% Refund">{t.optFullRefund}</option>
                  <option value="Replacement Lot from Neighboring Farmer">{t.optReplace}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.explainIssue}
                </label>
                <textarea
                  rows={3}
                  value={grievanceDetails}
                  onChange={(e) => setGrievanceDetails(e.target.value)}
                  required
                  placeholder={t.explainPlaceholder}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-hidden"
                />
              </div>

              <button
                type="submit"
                id="submit-buyer-grievance-btn"
                className="w-full h-9 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.submitGrievanceBtn}</span>
              </button>
            </form>
          </div>

          {/* Grievance Tickets List (Right) */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-1">
              {t.pastGrievancesTitle} ({grievances.length})
            </span>

            {grievances.map((grv) => (
              <div
                key={grv.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">
                      {t.ticketHash}{grv.id} · {t.orderHash}{grv.orderId}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{grv.category}</h4>
                    <span className="text-xs text-slate-500">
                      {grv.crop} · {t.soldBy} {grv.farmerName}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      grv.status.includes("Resolved")
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {grv.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {grv.details}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    {t.resolution} <strong>{grv.requestedResolution}</strong>
                  </span>
                  <span>{grv.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
