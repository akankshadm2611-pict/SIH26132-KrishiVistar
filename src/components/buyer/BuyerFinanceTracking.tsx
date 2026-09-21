import React, { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
  FileText,
  Truck,
  Download,
  AlertCircle,
  X,
} from "lucide-react";
import { TransactionOrder } from "../../types";
import { Language } from "../../translations";

interface BuyerFinanceTrackingProps {
  orders: TransactionOrder[];
  onConfirmReceiptAndReleaseEscrow?: (orderId: string) => void;
  onFileGrievance?: (order: TransactionOrder) => void;
  currentLang?: Language;
}

const tFinanceTracking = {
  mr: {
    totalSpend: "एकूण खरेदी खर्च",
    acrossShipments: "थेट शेतातून",
    shipments: "डिलिव्हरी",
    protectedEscrow: "सुरक्षित एस्क्रोमध्ये",
    refundable: "समाधानी नसल्यास १००% परतावा",
    buyerProtection: "खरेदीदार संरक्षण दर्जा",
    fullyInsured: "पूर्णपणे विम्यासह सुरक्षित",
    autoVerifyClause: "स्वयंचलित गुणवत्ता पडताळणी अट",
    escrowHeading: "एस्क्रो खरेदीदारांचे कसे रक्षण करते:",
    escrowDesc: "तुमचे पैसे लगेच शेतकऱ्याकडे वर्ग होत नाहीत. ते KrishiVistar एस्क्रो खात्यात सुरक्षित लॉक राहतात. शेतमाल आल्यानंतर व दर्जा तपासल्यानंतर तुम्ही 'पेमेंट रिलीज करा' दाबता. मालाचा दर्जा योग्य नसल्यास पैसे तुमच्या खात्यात परत मिळतात.",
    tableTitle: "तुमच्या एस्क्रो ऑर्डर्स आणि पेमेंट ट्रॅकिंग",
    tableSubtitle: "ऑर्डर स्थिती, वाहतूक आणि एस्क्रो वर्ग करण्याचे रिअल-टाइम ट्रॅकिंग",
    colOrderId: "ऑर्डर क्र. व दिनांक",
    colFarmerCrop: "शेतकरी व पीक",
    colQty: "प्रमाण",
    colAmount: "रक्कम",
    colStatus: "एस्क्रो स्थिती",
    colActions: "कृती",
    releasedToFarmer: "शेतकऱ्याला वर्ग",
    lockedInEscrow: "एस्क्रोमध्ये सुरक्षित",
    releaseEscrow: "एस्क्रो वर्ग करा",
    invoice: "बिल",
    invoiceModalTitle: "खरेदीदार पावती व देयक",
    deliverTo: "डिलिव्हरी पत्ता:",
    soldBy: "शेतकरी (विक्रेता):",
    verifiedProducer: "प्रमाणित शेतकरी उत्पादक",
    product: "उत्पादन:",
    quantity: "प्रमाण:",
    unitRate: "दर:",
    totalEscrow: "एकूण एस्क्रो रक्कम:",
    downloadInvoice: "बिल डाउनलोड करा (PDF)",
    close: "बंद करा",
    downloadedMsg: "बिल यशस्वीरीत्या सेव्ह झाले.",
  },
  hi: {
    totalSpend: "कुल खरीद व्यय",
    acrossShipments: "सीधे खेत से",
    shipments: "शिपमेंट",
    protectedEscrow: "सुरक्षित एस्क्रो में",
    refundable: "संतुष्ट न होने पर १००% रिफंड",
    buyerProtection: "खरीदार सुरक्षा स्थिति",
    fullyInsured: "पूरी तरह बीमित",
    autoVerifyClause: "स्वचालित गुणवत्ता सत्यापन खंड",
    escrowHeading: "एस्क्रो खरीदारों की सुरक्षा कैसे करता है:",
    escrowDesc: "आपका पैसा तुरंत सीधे किसान के पास नहीं जाता। यह KrishiVistar एस्क्रो खाते में सुरक्षित रहता है। माल पहुंचने व गुणवत्ता जांचने के बाद आप 'पेमेंट रिलीज करें' पर क्लिक करते हैं। गुणवत्ता सही न होने पर पूरा पैसा रिफंड होता है।",
    tableTitle: "आपके एस्क्रो ऑर्डर एवं भुगतान ट्रैकिंग",
    tableSubtitle: "ऑर्डर प्रगति, परिवहन स्थिति और एस्क्रो निकासी की रीयल-टाइम ट्रैकिंग",
    colOrderId: "ऑर्डर आईडी एवं दिनांक",
    colFarmerCrop: "किसान एवं फसल",
    colQty: "मात्रा",
    colAmount: "राशि",
    colStatus: "एस्क्रो स्थिति",
    colActions: "कार्रवाई",
    releasedToFarmer: "किसान को जारी",
    lockedInEscrow: "एस्क्रो में सुरक्षित",
    releaseEscrow: "एस्क्रो रिलीज करें",
    invoice: "बिल",
    invoiceModalTitle: "खरीदार रसीद एवं चालान",
    deliverTo: "डिलीवरी पता:",
    soldBy: "किसान (विक्रेता):",
    verifiedProducer: "सत्यापित किसान उत्पादक",
    product: "उत्पाद:",
    quantity: "मात्रा:",
    unitRate: "दर:",
    totalEscrow: "कुल एस्क्रो राशि:",
    downloadInvoice: "चालान डाउनलोड करें (PDF)",
    close: "बंद करें",
    downloadedMsg: "चालान सफलतापूर्वक डाउनलोड हुआ।",
  },
  en: {
    totalSpend: "Total Sourcing Spend",
    acrossShipments: "Across",
    shipments: "farm-direct shipments",
    protectedEscrow: "Protected in Safe Escrow",
    refundable: "100% Refundable if not satisfied",
    buyerProtection: "Buyer Protection Status",
    fullyInsured: "Fully Insured",
    autoVerifyClause: "Automatic quality verification clause",
    escrowHeading: "How Escrow Protects Buyers:",
    escrowDesc: "Your money does not go directly to the farmer immediately. It stays locked inside a secure KrishiVistar escrow vault. Once your produce arrives and you verify quality, you click 'Confirm & Release Payment'. If quality is substandard, funds are refunded to your account.",
    tableTitle: "Your Escrow Orders & Payment Tracking",
    tableSubtitle: "Real-time tracking of order progression, transit status, and escrow releases",
    colOrderId: "Order ID & Date",
    colFarmerCrop: "Farmer & Crop",
    colQty: "Quantity",
    colAmount: "Amount",
    colStatus: "Escrow Status",
    colActions: "Actions",
    releasedToFarmer: "Released to Farmer",
    lockedInEscrow: "Locked in Escrow",
    releaseEscrow: "Release Escrow",
    invoice: "Invoice",
    invoiceModalTitle: "Buyer Invoice & Payment Receipt",
    deliverTo: "Deliver To:",
    soldBy: "Sold By (Farmer):",
    verifiedProducer: "Verified Farm Producer",
    product: "Product:",
    quantity: "Quantity:",
    unitRate: "Unit Rate:",
    totalEscrow: "Total Escrow Amount:",
    downloadInvoice: "Download Invoice PDF",
    close: "Close",
    downloadedMsg: "Invoice slip saved to downloads.",
  },
};

export const BuyerFinanceTracking: React.FC<BuyerFinanceTrackingProps> = ({
  orders,
  onConfirmReceiptAndReleaseEscrow,
  onFileGrievance,
  currentLang = "en",
}) => {
  const t = tFinanceTracking[currentLang] || tFinanceTracking.en;
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionOrder | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeEscrowAmount = orders
    .filter((o) => o.paymentStatus === "In Escrow")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.totalSpend}</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block font-display">
            ₹{totalSpent.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {t.acrossShipments} {orders.length} {t.shipments}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-xs ring-1 ring-sky-500/20">
          <span className="text-xs font-semibold text-sky-800 block">{t.protectedEscrow}</span>
          <span className="text-2xl font-black text-sky-700 mt-1 block font-display">
            ₹{activeEscrowAmount.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <Lock className="w-3.5 h-3.5" /> {t.refundable}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">{t.buyerProtection}</span>
          <span className="text-lg font-bold text-emerald-700 mt-1 block flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> {t.fullyInsured}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {t.autoVerifyClause}
          </span>
        </div>
      </div>

      {/* Escrow Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-950">
          <span className="font-bold block">{t.escrowHeading}</span>
          {t.escrowDesc}
        </div>
      </div>

      {/* Orders Table */}
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
                <th className="p-3">{t.colOrderId}</th>
                <th className="p-3">{t.colFarmerCrop}</th>
                <th className="p-3">{t.colQty}</th>
                <th className="p-3">{t.colAmount}</th>
                <th className="p-3">{t.colStatus}</th>
                <th className="p-3 text-right">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const isInEscrow = order.paymentStatus === "In Escrow";
                const isPaid = order.paymentStatus === "Paid";

                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block font-mono">{order.id}</span>
                      <span className="text-[11px] text-slate-400">{order.createdAt}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{order.crop}</span>
                      <span className="text-xs text-slate-500">
                        👨‍🌾 {order.farmerName} · {order.qualityGrade}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 font-semibold">
                      {order.quantityKg.toLocaleString("en-IN")} kg
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          isPaid
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{isPaid ? t.releasedToFarmer : t.lockedInEscrow}</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isInEscrow && onConfirmReceiptAndReleaseEscrow && (
                          <button
                            onClick={() => onConfirmReceiptAndReleaseEscrow(order.id)}
                            className="h-7 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Confirm delivery & release escrow payment to farmer"
                          >
                            {t.releaseEscrow}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setDownloadSuccess(false);
                            setSelectedReceipt(order);
                          }}
                          className="h-7 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                        >
                          {t.invoice}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95">
            <div className="bg-sky-800 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">{t.invoiceModalTitle}</h3>
                <span className="text-xs text-sky-200 font-mono">#{selectedReceipt.id}</span>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-8 h-8 inline-flex items-center justify-center text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-slate-400 block">{t.deliverTo}</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.buyerName}</span>
                  <span className="text-slate-500 block">{selectedReceipt.deliveryAddress}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">{t.soldBy}</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.farmerName}</span>
                  <span className="text-slate-500 block">{t.verifiedProducer}</span>
                </div>
              </div>

              <div className="space-y-2 py-2">
                <div className="flex justify-between">
                  <span>{t.product}</span>
                  <span className="font-bold">{selectedReceipt.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.quantity}</span>
                  <span>{selectedReceipt.quantityKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.unitRate}</span>
                  <span>₹{selectedReceipt.pricePerKg}/kg</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.totalEscrow}</span>
                  <span className="text-sky-700">
                    ₹{selectedReceipt.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {downloadSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.downloadedMsg}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-3">
                <button
                  onClick={() => {
                    setDownloadSuccess(true);
                  }}
                  className="flex-1 h-8.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadInvoice}</span>
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="h-8.5 px-4 border border-slate-300 text-slate-800 font-bold rounded-lg hover:bg-slate-100 cursor-pointer inline-flex items-center justify-center"
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
