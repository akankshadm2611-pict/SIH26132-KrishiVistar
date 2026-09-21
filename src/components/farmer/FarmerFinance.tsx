import React, { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileText,
  Lock,
  Download,
  Building,
  HelpCircle,
  X,
  ShieldAlert,
  AlertTriangle,
  Umbrella,
  Landmark,
} from "lucide-react";
import { TransactionOrder } from "../../types";
import { Language } from "../../translations";

interface FarmerFinanceProps {
  orders: TransactionOrder[];
  currentLang?: Language;
  onNavigateToCalamity?: () => void;
}

const tFinance = {
  mr: {
    totalPayouts: "एकूण मिळालेली रक्कम (थेट विक्री)",
    transferredBank: "बँक खात्यात थेट जमा",
    safeEscrow: "सुरक्षित एस्क्रोमध्ये जमा",
    guaranteedPayout: "डिलिव्हरीनंतर खात्रीशीर जमा",
    awaitingDeposit: "खरेदीदार ठेवीची प्रतीक्षा",
    activeBidsFinal: "सक्रिय सौदे निश्चित झाले",
    payoutBankDetails: "जमा होणारे बँक खाते",
    autoNeft: "✓ ऑटो-NEFT सत्यापित",
    escrowTitle: "KrishiVistar १००% एस्क्रो संरक्षण हमी",
    escrowSubtitle: "चेक बाऊन्स होणे किंवा उशिरा पेमेंटची कोणतीही चिंता नाही",
    zeroRisk: "शून्य धोका",
    stage1: "टप्पा १",
    stage1Title: "ऑर्डर निश्चित झाली",
    stage1Desc: "शेतकरी व खरेदीदाराचे भावावर एकमत",
    stage2: "टप्पा २",
    stage2Title: "रक्कम एस्क्रोमध्ये जमा",
    stage2Desc: "खरेदीदाराने १००% रक्कम एस्क्रोमध्ये भरली",
    stage3: "टप्पा ३",
    stage3Title: "वाहतूक व डिलिव्हरी",
    stage3Desc: "GPS ट्रॅकिंगने माल खरेदीदारापर्यंत पोहोचतो",
    stage4: "टप्पा ४",
    stage4Title: "थेट बँक खात्यात जमा",
    stage4Desc: "एस्क्रोमधून थेट शेतकरी खात्यात रक्कम वर्ग",
    recordsTitle: "ऑर्डर व व्यवहार नोंदी",
    recordsSubtitle: "सर्व ऑर्डर्स, एस्क्रो ठेवी, शासकीय नुकसान भरपाई व डिजिटल पावत्यांची संपूर्ण नोंद",
    thOrderId: "ऑर्डर क्रमांक व दिनांक",
    thBuyer: "खरेदीदार",
    thCropQty: "पीक / वजन",
    thTotal: "एकूण रक्कम",
    thStatus: "एस्क्रो स्थिती",
    thGovtRefund: "शासकीय नुकसान भरपाई (विमा)",
    thReceipt: "डिजिटल पावती",
    stPaid: "रक्कम प्राप्त",
    stEscrow: "रक्कम एस्क्रोमध्ये",
    stPending: "ठेव बाकी",
    receiptBtn: "पावती",
    invoiceTitle: "KrishiVistar कर बीजक व एस्क्रो पावती",
    receiptNum: "पावती #",
    seller: "विक्रेता (शेतकरी):",
    sellerLoc: "नाशिक जिल्हा, महाराष्ट्र",
    buyerLabel: "खरेदीदार:",
    cropQuality: "पीक व प्रत:",
    harvestQty: "शेतमाल वजन:",
    agreedRate: "निश्चित दर:",
    totalEscrowVal: "एकूण एस्क्रो मूल्य:",
    escrowAcct: "एस्क्रो खाते:",
    statusLabel: "स्थिती:",
    downloadPdf: "PDF पावती डाउनलोड करा",
    close: "बंद करा",
    downloadedMsg: "डिजिटल पावती PDF यशस्वीरित्या सेव्ह झाली!",

    // Calamity Relief & Insurance
    calamityKpiTitle: "शासकीय आपत्ती भरपाई व विमा",
    dbtCreditedBadge: "✓ थेट DBT जमा (Bank of Maharashtra)",
    viewCalamitySlip: "विमा आदेश",
    normalNoCalamity: "निरंक / सुरक्षित पीक",
    fileCalamityPrompt: "आपत्ती नोंदवा",
    sanctionTitle: "महाराष्ट्र शासन कृषी विभाग - नुकसान भरपाई मंजुरी आदेश",
    sanctionSubtitle: "नैसर्गिक आपत्ती निवारण व प्रधानमंत्री पीक विमा योजना (PMFBY)",
    govOrderNo: "मंजुरी आदेश क्र.:",
    claimantFarmer: "लाभार्थी शेतकरी:",
    lossAssessment: "नुकसान पाहणी पंचनामा:",
    surveyorName: "तपासणी अधिकारी:",
    disasterType: "आपत्ती तपशील:",
    approvedAmountLabel: "एकूण मंजूर भरपाई रक्कम:",
    dbtTransferRef: "DBT बँक व्यवहार संदर्भ (UTR):",
    beneficiaryBank: "जमा बँक खाते:",
    sanctionDateLabel: "मंजुरी दिनांक:",
    downloadSanctionPdf: "मंजुरी आदेश PDF डाउनलोड करा",
    calamityDownloadedAlert: "शासकीय नुकसान भरपाई आदेश PDF सेव्ह झाली!",
    openCalamityPortal: "संपूर्ण आपत्ती भरपाई नोंदवही पहा",
  },
  hi: {
    totalPayouts: "कुल प्राप्त भुगतान (सीधी बिक्री)",
    transferredBank: "बैंक खाते में सीधे अंतरित",
    safeEscrow: "सुरक्षित एस्क्रो में जमा",
    guaranteedPayout: "डिलीवरी पर गारंटीकृत भुगतान",
    awaitingDeposit: "खरीदार जमा की प्रतीक्षा",
    activeBidsFinal: "सक्रिय बोलियां तय",
    payoutBankDetails: "भुगतान बैंक विवरण",
    autoNeft: "✓ ऑटो-NEFT सत्यापित",
    escrowTitle: "KrishiVistar १००% एस्क्रो सुरक्षा गारंटी",
    escrowSubtitle: "चेक बाउंस या व्यापारियों से देरी की कोई चिंता नहीं",
    zeroRisk: "शून्य डिफ़ॉल्ट जोखिम",
    stage1: "चरण १",
    stage1Title: "ऑर्डर पुष्ट हुआ",
    stage1Desc: "किसान व खरीदार की भाव पर सहमति",
    stage2: "चरण २",
    stage2Title: "एस्क्रो में भुगतान",
    stage2Desc: "खरीदार ने १००% राशि एस्क्रो में जमा की",
    stage3: "चरण ३",
    stage3Title: "डिस्पैच व डिलीवरी",
    stage3Desc: "जीपीएस ट्रैक वाहन खरीदार तक पहुंचता है",
    stage4: "चरण ४",
    stage4Title: "तुरंत बैंक खाते में भुगतान",
    stage4Desc: "एस्क्रो से सीधे आपके खाते में पैसे ट्रांसफर",
    recordsTitle: "ऑर्डर व लेन-देन रिकॉर्ड",
    recordsSubtitle: "सभी ऑर्डर, एस्क्रो डिपॉजिट, सरकारी आपदा रिफंड और डिजिटल रसीद का पूरा ब्योरा",
    thOrderId: "ऑर्डर आईडी व दिनांक",
    thBuyer: "खरीदार",
    thCropQty: "फसल / मात्रा",
    thTotal: "कुल राशि",
    thStatus: "एस्क्रो स्थिति",
    thGovtRefund: "सरकारी आपदा रिफंड (फसल बीमा)",
    thReceipt: "डिजिटल रसीद",
    stPaid: "भुगतान प्राप्त",
    stEscrow: "भुगतान एस्क्रो में",
    stPending: "जमा लंबित",
    receiptBtn: "रसीद",
    invoiceTitle: "KrishiVistar कर चालान एवं एस्क्रो रसीद",
    receiptNum: "रसीद #",
    seller: "विक्रेता (किसान):",
    sellerLoc: "नासिक जिला, महाराष्ट्र",
    buyerLabel: "खरीदार:",
    cropQuality: "फसल व गुणवत्ता:",
    harvestQty: "फसल मात्रा:",
    agreedRate: "तय इकाई दर:",
    totalEscrowVal: "कुल एस्क्रो मूल्य:",
    escrowAcct: "एस्क्रो खाता:",
    statusLabel: "स्थिति:",
    downloadPdf: "पीडीएफ रसीद डाउनलोड करें",
    close: "बंद करें",
    downloadedMsg: "डिजिटल रसीद पीडीएफ सहेजी गई!",

    // Calamity Relief & Insurance
    calamityKpiTitle: "सरकारी आपदा मुआवजा व बीमा",
    dbtCreditedBadge: "✓ प्रत्यक्ष DBT जमा (Bank of Maharashtra)",
    viewCalamitySlip: "बीमा आदेश",
    normalNoCalamity: "सामान्य / सुरक्षित फसल",
    fileCalamityPrompt: "आपदा दर्ज करें",
    sanctionTitle: "कृषि एवं किसान कल्याण विभाग - आपदा राहत मंजूरी आदेश",
    sanctionSubtitle: "प्राकृतिक आपदा राहत कोष एवं प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    govOrderNo: "मंजूरी आदेश क्र.:",
    claimantFarmer: "लाभार्थी किसान:",
    lossAssessment: "नुकसान सर्वे पंचनामा:",
    surveyorName: "निरीक्षण अधिकारी:",
    disasterType: "आपदा विवरण:",
    approvedAmountLabel: "कुल मंजूर सहायता राशि:",
    dbtTransferRef: "DBT बैंक लेनदेन संदर्भ (UTR):",
    beneficiaryBank: "क्रेडिट बैंक खाता:",
    sanctionDateLabel: "मंजूरी दिनांक:",
    downloadSanctionPdf: "मंजूरी आदेश PDF डाउनलोड करें",
    calamityDownloadedAlert: "सरकारी आपदा मुआवजा आदेश PDF सहेजा गया!",
    openCalamityPortal: "संपूर्ण आपदा मुआवजा रिकॉर्ड देखें",
  },
  en: {
    totalPayouts: "Total Payouts Received (Sales)",
    transferredBank: "Transferred to Bank Account",
    safeEscrow: "Locked in Safe Escrow",
    guaranteedPayout: "Guaranteed payout upon delivery",
    awaitingDeposit: "Awaiting Buyer Deposit",
    activeBidsFinal: "Active bids finalized",
    payoutBankDetails: "Payout Bank Details",
    autoNeft: "✓ Auto-NEFT Verified",
    escrowTitle: "KrishiVistar 100% Escrow Protection Guarantee",
    escrowSubtitle: "Never worry about bounced cheques or delayed trader payments",
    zeroRisk: "Zero Default Risk",
    stage1: "Stage 1",
    stage1Title: "Order Confirmed",
    stage1Desc: "Buyer & farmer agree on lot price",
    stage2: "Stage 2",
    stage2Title: "Payment in Escrow",
    stage2Desc: "Buyer deposits 100% funds into escrow vault",
    stage3: "Stage 3",
    stage3Title: "Dispatch & Delivery",
    stage3Desc: "GPS tracked transport reaches buyer dock",
    stage4: "Stage 4",
    stage4Title: "Instant Bank Release",
    stage4Desc: "Escrow releases money directly to your account",
    recordsTitle: "Order & Transaction Records",
    recordsSubtitle: "Complete audit trail of all orders, escrow deposits, government calamity refunds & receipts",
    thOrderId: "Order ID & Date",
    thBuyer: "Buyer",
    thCropQty: "Crop / Qty",
    thTotal: "Total Amount",
    thStatus: "Escrow Status",
    thGovtRefund: "Govt Calamity Refund (Insurance)",
    thReceipt: "Digital Receipt",
    stPaid: "Payment Received",
    stEscrow: "Payment in Escrow",
    stPending: "Deposit Pending",
    receiptBtn: "Receipt",
    invoiceTitle: "KrishiVistar Tax Invoice & Escrow Slip",
    receiptNum: "Receipt #",
    seller: "Seller (Farmer):",
    sellerLoc: "Nashik District, Maharashtra",
    buyerLabel: "Buyer:",
    cropQuality: "Crop & Quality:",
    harvestQty: "Harvest Quantity:",
    agreedRate: "Agreed Unit Rate:",
    totalEscrowVal: "Total Escrow Value:",
    escrowAcct: "Escrow Account:",
    statusLabel: "Status:",
    downloadPdf: "Download PDF Slip",
    close: "Close",
    downloadedMsg: "Digital invoice PDF generated and saved.",

    // Calamity Relief & Insurance
    calamityKpiTitle: "Govt Calamity Relief & Insurance (DBT)",
    dbtCreditedBadge: "✓ Aadhaar DBT Credited",
    viewCalamitySlip: "Govt Relief Slip",
    normalNoCalamity: "Normal / Protected Harvest",
    fileCalamityPrompt: "Report Loss",
    sanctionTitle: "Govt Disaster Relief & Insurance Settlement Sanction Order",
    sanctionSubtitle: "Pradhan Mantri Fasal Bima Yojana (PMFBY) & State SDRF Calamity Authority",
    govOrderNo: "Sanction Order Ref:",
    claimantFarmer: "Beneficiary Farmer:",
    lossAssessment: "Survey / Panchnama Report:",
    surveyorName: "Inspecting Officer:",
    disasterType: "Calamity Incident:",
    approvedAmountLabel: "Total Approved Relief Amount:",
    dbtTransferRef: "DBT Transaction UTR Reference:",
    beneficiaryBank: "Credit Bank Account:",
    sanctionDateLabel: "Sanction Date:",
    downloadSanctionPdf: "Download Official Sanction PDF",
    calamityDownloadedAlert: "Official Government Disaster Relief Sanction PDF downloaded.",
    openCalamityPortal: "View Full Calamity Refund Portal",
  },
};

export const FarmerFinance: React.FC<FarmerFinanceProps> = ({
  orders,
  currentLang = "en",
  onNavigateToCalamity,
}) => {
  const t = tFinance[currentLang] || tFinance.en;
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionOrder | null>(null);
  const [selectedCalamityOrder, setSelectedCalamityOrder] = useState<TransactionOrder | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [calamityDownloadNotice, setCalamityDownloadNotice] = useState<string | null>(null);

  const totalEarned = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const inEscrow = orders
    .filter((o) => o.paymentStatus === "In Escrow")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pending = orders
    .filter((o) => o.paymentStatus === "Pending")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalCalamityDisbursed = orders
    .filter((o) => o.calamityRefund?.claimStatus === "Disbursed / Credited")
    .reduce((sum, o) => sum + (o.calamityRefund?.refundAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.totalPayouts}</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block font-display">
            ₹{totalEarned.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t.transferredBank}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs ring-1 ring-emerald-500/20">
          <span className="text-xs font-semibold text-emerald-800 block">{t.safeEscrow}</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block font-display">
            ₹{inEscrow.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
            <Lock className="w-3 h-3 text-emerald-600" /> {t.guaranteedPayout}
          </span>
        </div>

        {/* Govt Calamity Relief & Insurance Metric Card */}
        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-xs ring-1 ring-teal-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-teal-800 block">
              {t.calamityKpiTitle}
            </span>
            <Umbrella className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-2xl font-black text-teal-900 mt-1 block font-display">
            ₹{totalCalamityDisbursed.toLocaleString("en-IN")}
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> {t.dbtCreditedBadge}
            </span>
            {onNavigateToCalamity && (
              <button
                onClick={onNavigateToCalamity}
                className="text-[10px] font-bold text-teal-800 hover:text-teal-950 underline cursor-pointer"
              >
                Track
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">{t.payoutBankDetails}</span>
            <div className="flex items-center gap-2 mt-1">
              <Building className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-800">Bank of Maharashtra</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              A/C: **** 4819 · IFSC: MAHB0000412
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded w-fit mt-2">
            {t.autoNeft}
          </span>
        </div>
      </div>

      {/* Visual Escrow Pipeline Explanation Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white p-5 sm:p-6 rounded-2xl border border-emerald-500/20 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">
                {t.escrowTitle}
              </h4>
              <p className="text-xs text-emerald-200/80">
                {t.escrowSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-1 rounded text-emerald-300">
            {t.zeroRisk}
          </span>
        </div>

        {/* 4-Step Pipeline Flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.stage1}</span>
            <span className="font-bold text-white mt-1 block">{t.stage1Title}</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {t.stage1Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">{t.stage2}</span>
            <span className="font-bold text-white mt-1 block">{t.stage2Title}</span>
            <p className="text-[11px] text-emerald-200 mt-0.5">
              {t.stage2Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.stage3}</span>
            <span className="font-bold text-white mt-1 block">{t.stage3Title}</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {t.stage3Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.stage4}</span>
            <span className="font-bold text-white mt-1 block">{t.stage4Title}</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {t.stage4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Records Table with Govt Calamity Refund Column */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>{t.recordsTitle}</span>
            </h3>
          </div>

          {onNavigateToCalamity && (
            <button
              onClick={onNavigateToCalamity}
              id="goto-calamity-ledger-btn"
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-teal-700" />
              <span>{t.openCalamityPortal}</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <th className="p-3">{t.thOrderId}</th>
                <th className="p-3">{t.thBuyer}</th>
                <th className="p-3">{t.thCropQty}</th>
                <th className="p-3">{t.thTotal}</th>
                <th className="p-3">{t.thStatus}</th>
                <th className="p-3 bg-teal-50/80 text-teal-900 border-x border-teal-100">
                  <div className="flex items-center gap-1">
                    <Umbrella className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.thGovtRefund}</span>
                  </div>
                </th>
                <th className="p-3 text-right">{t.thReceipt}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const isPaid = order.paymentStatus === "Paid";
                const isInEscrow = order.paymentStatus === "In Escrow";
                const isPending = order.paymentStatus === "Pending";
                const hasCalamity = order.calamityRefund?.hasCalamity;
                const calamityInfo = order.calamityRefund;

                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block font-mono">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-slate-400">{order.createdAt}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-slate-800 block">{order.buyerName}</span>
                      <span className="text-[11px] text-slate-500">{order.deliveryAddress}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-slate-800">{order.crop}</span>
                      <span className="text-slate-500 block text-xs">
                        {order.quantityKg.toLocaleString("en-IN")} kg @ ₹{order.pricePerKg}/kg
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          isPaid
                            ? "bg-emerald-100 text-emerald-800"
                            : isInEscrow
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {isPaid && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isInEscrow && <Lock className="w-3 h-3" />}
                        {isPending && <Clock className="w-3 h-3" />}
                        <span>
                          {isPaid
                            ? t.stPaid
                            : isInEscrow
                            ? t.stEscrow
                            : t.stPending}
                        </span>
                      </span>
                    </td>

                    {/* Govt Calamity Refund (Insurance) Column */}
                    <td className="p-3 bg-teal-50/40 border-x border-teal-100/70">
                      {hasCalamity && calamityInfo ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                              <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                              <span>{calamityInfo.calamityType}</span>
                            </span>
                            {calamityInfo.lossPercentage && (
                              <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                {calamityInfo.lossPercentage}% Loss
                              </span>
                            )}
                          </div>

                          {calamityInfo.refundAmount ? (
                            <div className="flex items-center justify-between gap-2 pt-0.5">
                              <div>
                                <span className="font-extrabold text-xs text-emerald-800 font-display block">
                                  + ₹{calamityInfo.refundAmount.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  <span>{calamityInfo.claimStatus}</span>
                                </span>
                              </div>
                              <button
                                onClick={() => setSelectedCalamityOrder(order)}
                                id={`view-calamity-slip-${order.id}`}
                                className="px-2 py-1 bg-teal-700 hover:bg-teal-800 text-white text-[10px] font-bold rounded-md shadow-2xs transition-colors cursor-pointer shrink-0"
                              >
                                {t.viewCalamitySlip}
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-1 text-[11px] text-amber-800 font-medium pt-0.5">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-600" />
                                {calamityInfo.claimStatus}
                              </span>
                              {onNavigateToCalamity && (
                                <button
                                  onClick={onNavigateToCalamity}
                                  className="text-[10px] text-teal-800 underline font-bold hover:text-teal-950 cursor-pointer"
                                >
                                  Track
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-slate-400 text-xs">
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{t.normalNoCalamity}</span>
                          </span>
                          {onNavigateToCalamity && (
                            <button
                              onClick={onNavigateToCalamity}
                              className="text-[10px] text-slate-400 hover:text-teal-700 hover:underline cursor-pointer"
                            >
                              {t.fileCalamityPrompt}
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedReceipt(order)}
                        id={`view-receipt-${order.id}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t.receiptBtn}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escrow Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold">
                  {t.receiptNum} {selectedReceipt.id}
                </span>
                <h4 className="text-base font-bold font-display">{t.invoiceTitle}</h4>
              </div>
              <button
                onClick={() => {
                  setSelectedReceipt(null);
                  setDownloadNotice(null);
                }}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {downloadNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{downloadNotice}</span>
                </div>
              )}

              <div className="flex justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-slate-400 block">{t.seller}</span>
                  <span className="font-bold text-slate-800">Ramesh Patil</span>
                  <span className="text-[11px] text-slate-500 block">{t.sellerLoc}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">{t.buyerLabel}</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.buyerName}</span>
                </div>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.cropQuality}</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.harvestQty}</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.quantityKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.agreedRate}</span>
                  <span className="font-bold text-slate-800">₹{selectedReceipt.pricePerKg} / kg</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.totalEscrowVal}</span>
                  <span className="text-emerald-700">
                    ₹{selectedReceipt.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>{t.escrowAcct}</span>
                  <span className="font-mono">AGRI-ESCROW-ICICI-009</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t.statusLabel}</span>
                  <span className="font-bold text-emerald-700">
                    {selectedReceipt.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setDownloadNotice(t.downloadedMsg);
                    setTimeout(() => {
                      setSelectedReceipt(null);
                      setDownloadNotice(null);
                    }, 2500);
                  }}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadPdf}</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedReceipt(null);
                    setDownloadNotice(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Calamity Sanction Order / Insurance Slip Modal */}
      {selectedCalamityOrder && selectedCalamityOrder.calamityRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-mono font-bold mb-1">
                  <Landmark className="w-3 h-3" />
                  <span>PMFBY / SDRF OFFICIAL SANCTION</span>
                </div>
                <h4 className="text-base font-bold font-display">{t.sanctionTitle}</h4>
                <p className="text-xs text-teal-200/80">{t.sanctionSubtitle}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCalamityOrder(null);
                  setCalamityDownloadNotice(null);
                }}
                className="p-1 text-white/70 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {calamityDownloadNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{calamityDownloadNotice}</span>
                </div>
              )}

              <div className="flex justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-slate-400 block">{t.govOrderNo}</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {selectedCalamityOrder.calamityRefund.applicationId || "MH-SDRF-2026-9812"}
                  </span>
                  <span className="text-[11px] text-teal-700 font-medium">
                    Order Ref: {selectedCalamityOrder.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">{t.sanctionDateLabel}</span>
                  <span className="font-bold text-slate-900">
                    {selectedCalamityOrder.calamityRefund.disbursedDate || selectedCalamityOrder.calamityRefund.surveyDate || "Sep 12, 2026"}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 py-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.claimantFarmer}</span>
                  <span className="font-bold text-slate-900">
                    Ramesh Patil (Dindori, Nashik)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.disasterType}</span>
                  <span className="font-bold text-rose-700">
                    {selectedCalamityOrder.calamityRefund.calamityType} ({selectedCalamityOrder.crop})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.lossAssessment}</span>
                  <span className="font-bold text-slate-900">
                    {selectedCalamityOrder.calamityRefund.lossPercentage}% Verified Crop Loss
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.surveyorName}</span>
                  <span className="font-bold text-slate-800">
                    Taluka Agriculture Officer & PMFBY Survey Cell
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.approvedAmountLabel}</span>
                  <span className="text-emerald-700">
                    ₹{selectedCalamityOrder.calamityRefund.refundAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.beneficiaryBank}</span>
                  <span className="font-mono font-bold text-slate-800">
                    Bank of Maharashtra (****4819)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.dbtTransferRef}</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {selectedCalamityOrder.calamityRefund.dbtUtrNumber || "DBT-MH-AGRI-2026-98124"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className="font-bold text-emerald-800">
                    {selectedCalamityOrder.calamityRefund.claimStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setCalamityDownloadNotice(t.calamityDownloadedAlert);
                    setTimeout(() => {
                      setCalamityDownloadNotice(null);
                      setSelectedCalamityOrder(null);
                    }, 2500);
                  }}
                  id="download-calamity-pdf-btn"
                  className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadSanctionPdf}</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCalamityOrder(null);
                    setCalamityDownloadNotice(null);
                  }}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer hover:bg-slate-50"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
