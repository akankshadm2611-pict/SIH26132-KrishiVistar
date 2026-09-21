import React, { useState } from "react";
import {
  Sprout,
  ShoppingBag,
  ShieldCheck,
  X,
  ArrowRight,
  TrendingUp,
  CloudSun,
  Truck,
  CheckCircle,
  Phone,
  Lock,
} from "lucide-react";
import { UserRole, Language } from "../types";
import { translations } from "../translations";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
  currentRole: UserRole;
  currentLang?: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  currentRole,
  currentLang = "en",
}) => {
  const t = translations[currentLang] || translations.en;
  const [activeTab, setActiveTab] = useState<UserRole>(currentRole);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemo = (role: UserRole) => {
    onSelectRole(role);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtp("7492"); // Pre-filled convenience OTP
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectRole(activeTab);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
          id="close-login-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">
              Krishi<span className="text-emerald-400">Vistar</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold font-display">
            {currentLang === "mr"
              ? "आपली खाते भूमिका निवडा"
              : currentLang === "hi"
              ? "अपनी खाता भूमिका चुनें"
              : "Select Your Account Role"}
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1">
            {currentLang === "mr"
              ? "शेतकरी आणि खरेदीदार दोघांसाठीही सोपे लॉगिन"
              : currentLang === "hi"
              ? "किसान और खरीदार दोनों के लिए सरल लॉगिन"
              : "Easy login for both agricultural producers and retail/bulk buyers"}
          </p>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("farmer");
                setOtpSent(false);
              }}
              id="tab-farmer-login-btn"
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                activeTab === "farmer"
                  ? "bg-white text-slate-900 border-white shadow-md font-bold"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  activeTab === "farmer" ? "bg-emerald-100 text-emerald-700" : "bg-white/20 text-white"
                }`}
              >
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">
                  {currentLang === "mr" ? "शेतकरी / FPO" : currentLang === "hi" ? "किसान / FPO" : "Farmer / FPO"}
                </div>
                <div className="text-[11px] opacity-75">
                  {currentLang === "mr" ? "शेतमाल विक्री व भाव ट्रॅकिंग" : currentLang === "hi" ? "फसल बिक्री व भाव ट्रैकिंग" : "Sell produce & track rates"}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("buyer");
                setOtpSent(false);
              }}
              id="tab-buyer-login-btn"
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                activeTab === "buyer"
                  ? "bg-white text-slate-900 border-white shadow-md font-bold"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  activeTab === "buyer" ? "bg-sky-100 text-sky-700" : "bg-white/20 text-white"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">
                  {currentLang === "mr" ? "खरेदीदार" : currentLang === "hi" ? "खरीदार" : "Buyer"}
                </div>
                <div className="text-[11px] opacity-75">
                  {currentLang === "mr" ? "घाऊक व किरकोळ खरेदी" : currentLang === "hi" ? "थोक व खुदरा खरीद" : "Buy small/bulk & escrow"}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick 1-Click Demo Section (For easiest evaluation) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1-Click Quick Demo Login (No Password Needed)
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Instant Access
              </span>
            </div>

            {activeTab === "farmer" ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-sm font-bold text-slate-900">👨‍🌾 Ramesh Patil (Nashik Farmer)</div>
                  <div className="text-xs text-slate-500">
                    2,000 kg Tomato Lot #1025 active · 3 incoming buyer bids
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("farmer")}
                  id="quick-demo-farmer-btn"
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Enter as Farmer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-sm font-bold text-slate-900">🛒 Anita Sharma (Pune Buyer)</div>
                  <div className="text-xs text-slate-500">
                    Household & wholesale grocery purchaser · 2 active escrow orders
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("buyer")}
                  id="quick-demo-buyer-btn"
                  className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Enter as Buyer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase tracking-wider absolute">
              Or Login via Mobile OTP
            </span>
          </div>

          {/* Phone / OTP Form */}
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {activeTab === "farmer" ? "Kisan Mobile Number / PM-KISAN ID" : "Mobile Number / Email Address"}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder={activeTab === "farmer" ? "+91 98220 14890" : "+91 94231 55678"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter 4-Digit Verification Code (OTP)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="7492"
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-emerald-600 mt-1">
                  Demo auto-filled: <strong>7492</strong> (Valid for 5 mins)
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="submit-auth-btn"
              className={`w-full py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 ${
                activeTab === "farmer"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                  : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20"
              }`}
            >
              {loading ? (
                <span>Verifying...</span>
              ) : otpSent ? (
                <span>Verify & Enter Dashboard</span>
              ) : (
                <span>Send Verification OTP</span>
              )}
            </button>
          </form>

          {/* Feature Highlights Grid for Selected Role */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-2">
              {activeTab === "farmer"
                ? "Key Tools in Farmer Dashboard:"
                : "Key Tools in Buyer Dashboard:"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600 text-xs">
              {activeTab === "farmer" ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Price Discovery & Mandis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Weather & Harvest Alerts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Digital Lot Trading</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Route & Transport Match</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Cold Storage Booking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Guaranteed Escrow Payouts</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
                    <span>Direct Farm Marketplace</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Small & Bulk Orders</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>100% Escrow Protection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nearby Farmers Search</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quality Rating & Reviews</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                    <span>Dispute & Grievance Care</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
