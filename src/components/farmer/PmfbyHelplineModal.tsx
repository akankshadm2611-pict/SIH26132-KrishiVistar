import React, { useState } from "react";
import {
  PhoneCall,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  Shield,
  FileText,
  Send,
  Building,
  Headphones,
} from "lucide-react";
import { Language } from "../../translations";

interface PmfbyHelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  farmerName?: string;
  farmerPhone?: string;
  claimId?: string;
  cropName?: string;
}

export const PmfbyHelplineModal: React.FC<PmfbyHelplineModalProps> = ({
  isOpen,
  onClose,
  currentLang = "en",
  farmerName = "Ramesh Patil",
  farmerPhone = "9822014819",
  claimId = "CLM-MH-9481",
  cropName = "Tomato / Onion Crop",
}) => {
  const [complaintType, setComplaintType] = useState("Survey Delay (72 Hours Exceeded)");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const handleLogOnlineComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNo = `PMFBY-GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketNo);
  };

  const phoneScript = `Hello Sir/Madam, I am ${farmerName} (Phone: ${farmerPhone}). I want to lodge a complaint under Pradhan Mantri Fasal Bima Yojana (PMFBY). My Claim ID is ${claimId} for crop ${cropName}. Issue: ${complaintType}. Please escalate to the district grievance redressal cell.`;

  const copyScript = () => {
    navigator.clipboard.writeText(phoneScript);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-400/30 flex items-center justify-center text-amber-300">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-mono font-bold mb-0.5">
                <span>PMFBY OFFICIAL GRIEVANCE REDRESSAL</span>
              </div>
              <h3 className="text-base font-bold font-display">
                {currentLang === "mr"
                  ? "प्रधानमंत्री पीक विमा योजना (PMFBY) टोल-फ्री तक्रार नोंदवा"
                  : currentLang === "hi"
                  ? "प्रधानमंत्री फसल बीमा योजना (PMFBY) टोल-फ्री शिकायत दर्ज करें"
                  : "PMFBY Crop Insurance Toll-Free Complaint & Helpline"}
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
          {/* Toll Free Helpline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wide block">
                  {currentLang === "mr" ? "राष्ट्रीय PMFBY हेल्पलाइन" : "National PMFBY Helpline"}
                </span>
                <a
                  href="tel:14447"
                  className="text-lg font-black text-teal-900 font-display block mt-1 hover:underline flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>14447</span>
                </a>
                <span className="text-[10px] text-teal-700 block mt-0.5">
                  {currentLang === "mr" ? "टोल-फ्री २४x७ (सर्व भाषा उपलब्ध)" : "Toll-Free 24x7 (Toll Free All India)"}
                </span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-teal-200/80 text-[10px] text-teal-900 font-medium">
                {currentLang === "mr" ? "मराठीसाठी '१' दाबा" : "Press 1 for Marathi, 2 for Hindi"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wide block">
                  {currentLang === "mr" ? "शेतकरी मदत हेल्पलाइन" : "Kisan Support Helpline"}
                </span>
                <a
                  href="tel:18001801551"
                  className="text-lg font-black text-amber-950 font-display block mt-1 hover:underline flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>1800-180-1551</span>
                </a>
                <span className="text-[10px] text-amber-800 block mt-0.5">
                  {currentLang === "mr" ? "सकाळी ६:०० ते रात्री १०:००" : "6:00 AM to 10:00 PM Daily"}
                </span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-amber-200/80 text-[10px] text-amber-900 font-medium">
                {currentLang === "mr" ? "तालुका कृषी समन्वयक सहाय्य" : "Direct Agri Officer Escalation"}
              </div>
            </div>
          </div>

          {/* Success Ticket Banner */}
          {submittedTicket ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-scaleUp">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {currentLang === "mr"
                    ? "तक्रार यशस्वीरीत्या नोंदवली गेली!"
                    : "Complaint Lodged Successfully!"}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Grievance Ticket ID:</span>
                  <span className="font-bold text-emerald-800">{submittedTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Resolution SLA:</span>
                  <span className="font-bold text-slate-800">48 Hours (District Desk)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Claim Ref:</span>
                  <span className="font-bold text-slate-800">{claimId}</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-800">
                {currentLang === "mr"
                  ? "आपल्या नोंदणीकृत मोबाईल नंबरवर SMS द्वारे ट्रॅकिंग लिंक पाठवली आहे. जिल्हा तक्रार निवारण अधिकारी लवकरच संपर्क साधतील."
                  : "SMS confirmation has been dispatched. The Taluka Krishi Officer and Insurance Nodal Officer have been tagged."}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                {currentLang === "mr" ? "पुन्हा नवीन तक्रार नोंदवा" : "Log Another Grievance"}
              </button>
            </div>
          ) : (
            /* Online Complaint Submission Form */
            <form onSubmit={handleLogOnlineComplaint} className="space-y-3.5 border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>
                    {currentLang === "mr"
                      ? "थेट ऑनलाइन तक्रार दाखल करा (e-Grievance)"
                      : "File Online Complaint directly with PMFBY Nodal Officer"}
                  </span>
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  SLA: 48h Resolution
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {currentLang === "mr" ? "तक्रारीचा प्रकार (Grievance Category):" : "Complaint Category:"}
                </label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Survey Delay (72 Hours Exceeded)">
                    {currentLang === "mr" ? "पंचनामा करण्यास विलंब (७२ तास उलटूनही पंचनामा नाही)" : "Survey Delay (72 Hours Exceeded, No Surveyor Visited)"}
                  </option>
                  <option value="Claim Under-Assessment Discrepancy">
                    {currentLang === "mr" ? "नुकसान टक्केवारी कमी नोंदवली (Under-Assessment)" : "Claim Under-Assessment (Surveyor Under-reported damage %)"}
                  </option>
                  <option value="Rejection without Proper Reason">
                    {currentLang === "mr" ? "अकारण दावा नाकारणे (Unjustified Claim Rejection)" : "Unjustified Claim Rejection / Disallowance"}
                  </option>
                  <option value="DBT Bank Transfer Delayed">
                    {currentLang === "mr" ? "मंजूर भरपाई DBT खात्यात जमा नाही" : "DBT Bank Transfer Pending Despite Approval"}
                  </option>
                  <option value="Insurance Policy Receipt Discrepancy">
                    {currentLang === "mr" ? "विमा हप्ता कापला पण पावती मिळाली नाही" : "Premium Deducted but Policy Not Generated"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {currentLang === "mr" ? "तपशील / शेरा (Comments):" : "Details / Description:"}
                </label>
                <textarea
                  rows={2}
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                  placeholder={
                    currentLang === "mr"
                      ? "आपल्या समस्येचे संक्षिप्त वर्णन लिहा (उदा. पंचनामा अधिकारी यांनी संपर्क केला नाही)..."
                      : "Describe your issue with the surveyor visit, insurance policy or claim..."
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Ready-to-speak IVR Script */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <span>🗣️</span>
                    <span>
                      {currentLang === "mr"
                        ? "हेल्पलाइन कॉल करताना बोलण्यासाठी तयार वाक्य (Script):"
                        : "Ready-to-use Script for Calling Helpline:"}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={copyScript}
                    className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedText ? (currentLang === "mr" ? "कॉपी झाले!" : "Copied!") : (currentLang === "mr" ? "कॉपी करा" : "Copy")}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 bg-white p-2 rounded border border-slate-200 font-mono leading-relaxed">
                  "{phoneScript}"
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  {currentLang === "mr" ? "रद्द करा" : "Cancel"}
                </button>
                <button
                  type="submit"
                  id="submit-pmfby-complaint-btn"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {currentLang === "mr"
                      ? "तक्रार दाखल करा (Submit Grievance)"
                      : "Submit PMFBY Grievance"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
