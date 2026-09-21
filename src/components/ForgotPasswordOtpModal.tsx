import React, { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sprout,
  ShoppingBag,
} from "lucide-react";
import { Language } from "../translations";
import { UserRole, RegisteredAccount } from "../types";

export interface ForgotPasswordOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  initialPhone: string;
  currentLang: Language;
  onPasswordResetSuccess: (phone: string, newPass: string, autoLogin?: boolean) => void;
  registeredAccounts: RegisteredAccount[];
}

export const ForgotPasswordOtpModal: React.FC<ForgotPasswordOtpModalProps> = ({
  isOpen,
  onClose,
  role,
  initialPhone,
  currentLang,
  onPasswordResetSuccess,
  registeredAccounts,
}) => {
  // Determine respected phone number
  const cleanInitial = (initialPhone || "").replace(/\D/g, "");
  const defaultRespectedPhone =
    cleanInitial.length >= 10
      ? cleanInitial
      : role === "farmer"
      ? "9822481920"
      : "9823012345";

  const [phone, setPhone] = useState(defaultRespectedPhone);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(defaultRespectedPhone);

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  const [step, setStep] = useState<"otp" | "newPassword" | "success">("otp");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [smsBanner, setSmsBanner] = useState<string | null>(null);

  // Initialize and automatically send OTP to respected phone number when modal opens
  useEffect(() => {
    if (isOpen) {
      const activePhone =
        cleanInitial.length >= 10
          ? cleanInitial
          : role === "farmer"
          ? "9822481920"
          : "9823012345";
      setPhone(activePhone);
      setPhoneInput(activePhone);
      setIsEditingPhone(false);
      setStep("otp");
      setEnteredOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage(null);

      // Auto-dispatch OTP to respected phone number immediately
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      setResendCountdown(30);
      setSmsBanner(
        `KrishiVistar OTP for password reset is ${newOtp}. Valid for 10 minutes. Do not share.`
      );
    }
  }, [isOpen, role, initialPhone]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval: any;
    if (isOpen && otpSent && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, otpSent, resendCountdown]);

  if (!isOpen) return null;

  // Handle Resend OTP
  const handleResendOtp = () => {
    const freshOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(freshOtp);
    setResendCountdown(30);
    setEnteredOtp("");
    setErrorMessage(null);
    setSmsBanner(
      `KrishiVistar OTP for password reset is ${freshOtp}. Valid for 10 minutes. Do not share.`
    );
  };

  // Handle Changing Phone Number
  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneInput.replace(/\D/g, "");
    if (clean.length < 10) {
      setErrorMessage(
        currentLang === "mr"
          ? "कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा."
          : currentLang === "hi"
          ? "कृपया १० अंकों का वैध मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }
    setPhone(clean);
    setIsEditingPhone(false);
    setErrorMessage(null);

    // Send OTP to the new phone
    const freshOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(freshOtp);
    setResendCountdown(30);
    setEnteredOtp("");
    setSmsBanner(
      `KrishiVistar OTP for password reset is ${freshOtp}. Dispatched to +91 ${clean}.`
    );
  };

  // Handle OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (enteredOtp.trim() !== generatedOtp.trim()) {
      setErrorMessage(
        currentLang === "mr"
          ? "चुकीचा OTP! कृपया मोबाईलवर आलेला योग्य OTP टाका किंवा पुन्हा पाठवा वर क्लिक करा."
          : currentLang === "hi"
          ? "गलत OTP! कृपया मोबाइल पर भेजा गया सही OTP दर्ज करें या 'पुनः भेजें' पर क्लिक करें।"
          : "Incorrect OTP! Please enter the code sent to your phone or click Resend."
      );
      return;
    }

    // OTP Verified, advance to set new password
    setStep("newPassword");
  };

  // Handle Set New Password
  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 4) {
      setErrorMessage(
        currentLang === "mr"
          ? "पासवर्ड किमान ४ अक्षरांचा असावा."
          : currentLang === "hi"
          ? "पासवर्ड कम से कम ४ अक्षरों का होना चाहिए।"
          : "Password must be at least 4 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(
        currentLang === "mr"
          ? "पासवर्ड जुळत नाही! दोन्ही रकान्यात एकच पासवर्ड टाका."
          : currentLang === "hi"
          ? "पासवर्ड मेल नहीं खाते! कृपया दोनों खानों में समान पासवर्ड दर्ज करें।"
          : "Passwords do not match! Please enter the same password."
      );
      return;
    }

    // Save password
    setStep("success");
    setTimeout(() => {
      onPasswordResetSuccess(phone, newPassword, false);
    }, 1200);
  };

  const isFarmer = role === "farmer";

  return (
    <div
      id="forgot-password-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="forgot-password-modal-container"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
      >
        {/* Top Header Banner */}
        <div
          className={`px-5 py-4 flex items-center justify-between text-white ${
            isFarmer ? "bg-[#14422b]" : "bg-[#1e3a8a]"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/15 text-white">
              {isFarmer ? <Sprout className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                {currentLang === "mr"
                  ? "पासवर्ड रीसेट - OTP सत्यापन"
                  : currentLang === "hi"
                  ? "पासवर्ड रीसेट - OTP सत्यापन"
                  : "Reset Password via OTP"}
              </h3>
              <p className="text-[11px] text-white/80">
                {isFarmer
                  ? currentLang === "mr"
                    ? "शेतकरी पोर्टल खाते"
                    : currentLang === "hi"
                    ? "किसान पोर्टल खाता"
                    : "Farmer Portal Account"
                  : currentLang === "mr"
                  ? "खरेदीदार पोर्टल खाते"
                  : currentLang === "hi"
                  ? "खरीदार पोर्टल खाता"
                  : "Buyer Portal Account"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-forgot-modal-btn"
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {/* STEP 1: OTP SENT & VERIFICATION */}
          {step === "otp" && (
            <div className="space-y-4">
              {/* Phone Target Card */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {currentLang === "mr"
                          ? "नोंदणीकृत फोन नंबर"
                          : currentLang === "hi"
                          ? "पंजीकृत फोन नंबर"
                          : "Registered Phone Number"}
                      </p>
                      <p className="text-sm font-bold text-slate-900 font-mono">
                        +91 {phone}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingPhone(!isEditingPhone)}
                    id="change-phone-btn"
                    className="h-7 px-2.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                  >
                    {isEditingPhone
                      ? currentLang === "mr"
                        ? "रद्द करा"
                        : currentLang === "hi"
                        ? "रद्द करें"
                        : "Cancel"
                      : currentLang === "mr"
                      ? "नंबर बदला"
                      : currentLang === "hi"
                      ? "नंबर बदलें"
                      : "Change"}
                  </button>
                </div>

                {/* Optional Phone Editor */}
                {isEditingPhone && (
                  <form onSubmit={handleSavePhone} className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="10 digit mobile"
                      maxLength={10}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-emerald-600 font-mono"
                    />
                    <button
                      type="submit"
                      id="save-new-phone-send-otp-btn"
                      className="h-8 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors inline-flex items-center justify-center"
                    >
                      {currentLang === "mr" ? "OTP पाठवा" : currentLang === "hi" ? "OTP भेजें" : "Send OTP"}
                    </button>
                  </form>
                )}
              </div>

              {/* SMS Alert Box simulating SMS Gateway */}
              {smsBanner && (
                <div
                  id="sms-otp-gateway-banner"
                  className="p-3 bg-emerald-50 border border-emerald-300/80 rounded-xl text-emerald-950 flex flex-col gap-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wide uppercase text-emerald-800 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      📲 SMS Gateway Alert
                    </span>
                    <button
                      type="button"
                      id="autofill-otp-chip-btn"
                      onClick={() => setEnteredOtp(generatedOtp)}
                      className="h-6 px-2.5 text-[11px] font-bold text-emerald-900 bg-emerald-200 hover:bg-emerald-300 border border-emerald-300 rounded-md cursor-pointer transition-colors inline-flex items-center justify-center gap-1"
                      title="Click to auto-fill OTP"
                    >
                      ⚡ Auto-fill {generatedOtp}
                    </button>
                  </div>
                  <p className="text-xs font-medium leading-snug">
                    <span className="font-bold text-slate-900">+91 {phone}:</span> "{smsBanner}"
                  </p>
                </div>
              )}

              {/* OTP Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {currentLang === "mr"
                      ? "मोबाईलवर आलेला ४-अंकी OTP टाका:"
                      : currentLang === "hi"
                      ? "मोबाइल पर प्राप्त ४-अंकों का OTP दर्ज करें:"
                      : "Enter the 4-digit OTP sent to your phone:"}
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      id="forgot-password-otp-input"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="• • • •"
                      maxLength={4}
                      autoFocus
                      className="w-full text-center tracking-[0.6em] font-mono text-xl font-bold bg-white border-2 border-slate-300 focus:border-emerald-600 focus:ring-0 rounded-xl py-2.5 px-4 text-slate-900 shadow-inner"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Resend OTP Bar */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-slate-600 font-medium">
                    {resendCountdown > 0
                      ? currentLang === "mr"
                        ? `पुन्हा पाठवा (${resendCountdown} सेकंद)`
                        : currentLang === "hi"
                        ? `पुनः भेजें (${resendCountdown} सेकंड)`
                        : `Resend in ${resendCountdown}s`
                      : currentLang === "mr"
                      ? "OTP मिळाला नाही?"
                      : currentLang === "hi"
                      ? "OTP नहीं मिला?"
                      : "Didn't get OTP?"}
                  </span>
                  <button
                    type="button"
                    id="resend-forgot-otp-btn"
                    disabled={resendCountdown > 0}
                    onClick={handleResendOtp}
                    className={`font-bold inline-flex items-center gap-1 cursor-pointer transition-colors ${
                      resendCountdown > 0
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-emerald-700 hover:text-emerald-900 underline"
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{currentLang === "mr" ? "OTP पुन्हा पाठवा" : currentLang === "hi" ? "OTP पुनः भेजें" : "Resend OTP"}</span>
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  id="verify-forgot-otp-btn"
                  className={`w-full h-10 px-4 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer inline-flex items-center justify-center gap-2 ${
                    isFarmer ? "bg-[#14422b] hover:bg-[#0e2f1f]" : "bg-[#1e3a8a] hover:bg-[#172554]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentLang === "mr" ? "OTP सत्यापित करा" : currentLang === "hi" ? "OTP सत्यापित करें" : "Verify OTP"}</span>
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: SET NEW PASSWORD */}
          {step === "newPassword" && (
            <form onSubmit={handleSetNewPassword} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {currentLang === "mr"
                    ? `मोबाईल +91 ${phone} चे सत्यापन यशस्वी! नवीन पासवर्ड सेट करा.`
                    : currentLang === "hi"
                    ? `मोबाइल +91 ${phone} का सत्यापन सफल! नया पासवर्ड सेट करें।`
                    : `Phone +91 ${phone} verified! Enter your new password.`}
                </span>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {currentLang === "mr" ? "नवीन पासवर्ड" : currentLang === "hi" ? "नया पासवर्ड" : "New Password"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    autoFocus
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-9 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {currentLang === "mr"
                    ? "नवीन पासवर्ड पुन्हा प्रविष्ट करा"
                    : currentLang === "hi"
                    ? "नया पासवर्ड पुनः दर्ज करें"
                    : "Confirm New Password"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirm-new-password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-xs"
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Save Button */}
              <button
                type="submit"
                id="save-new-password-btn"
                className={`w-full h-10 px-4 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer inline-flex items-center justify-center gap-2 ${
                  isFarmer ? "bg-[#14422b] hover:bg-[#0e2f1f]" : "bg-[#1e3a8a] hover:bg-[#172554]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>
                  {currentLang === "mr"
                    ? "पासवर्ड जतन करा व लॉगिन करा"
                    : currentLang === "hi"
                    ? "पासवर्ड सुरक्षित करें एवं लॉगिन करें"
                    : "Save Password & Update"}
                </span>
              </button>
            </form>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === "success" && (
            <div className="py-4 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {currentLang === "mr"
                  ? "पासवर्ड यशस्वीरीत्या बदलला आहे!"
                  : currentLang === "hi"
                  ? "पासवर्ड सफलतापूर्वक रीसेट हो गया है!"
                  : "Password Reset Successfully!"}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                {currentLang === "mr"
                  ? `मोबाईल +91 ${phone} साठी नवीन पासवर्ड अद्ययावत केला आहे. तुम्ही नवीन पासवर्ड वापरून लगेच लॉगिन करू शकता.`
                  : currentLang === "hi"
                  ? `मोबाइल +91 ${phone} हेतु नया पासवर्ड अपडेट हो गया है। आप नए पासवर्ड से तुरंत लॉगिन कर सकते हैं।`
                  : `Your credentials for +91 ${phone} have been updated. You can now log in with your new password.`}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  id="forgot-success-close-btn"
                  onClick={onClose}
                  className="h-9 px-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-colors inline-flex items-center justify-center"
                >
                  {currentLang === "mr" ? "लॉगिन कडे वळा" : currentLang === "hi" ? "लॉगिन पर जाएं" : "Return to Login"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
