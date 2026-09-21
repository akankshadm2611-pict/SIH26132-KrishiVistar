import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2,
  Download,
  Printer,
  X,
  Building,
  FileText,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { GovtCalamityClaimRecord, OfficeAppointmentPass } from "../../types";
import { Language } from "../../translations";

interface CalamityOfficeAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: GovtCalamityClaimRecord;
  currentLang?: Language;
  onAppointmentConfirmed: (updatedClaim: GovtCalamityClaimRecord) => void;
}

export const CalamityOfficeAppointmentModal: React.FC<CalamityOfficeAppointmentModalProps> = ({
  isOpen,
  onClose,
  claim,
  currentLang = "en",
  onAppointmentConfirmed,
}) => {
  // Dates: Next 3 suitable working days
  const today = new Date();
  const date1 = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  const date2 = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  const date3 = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const [selectedDate, setSelectedDate] = useState(formatDate(date1));
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM - 12:00 PM (Priority Fast-Track)");
  const [reasonNotes, setReasonNotes] = useState(
    "Request for on-spot physical 7/12 re-measurement and dispute resolution for rejected damage percentage."
  );
  const [isBooked, setIsBooked] = useState(Boolean(claim.officeAppointment));
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAppointment: OfficeAppointmentPass = claim.officeAppointment || {
    tokenNumber: `TOK-${claim.taluka.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`,
    officeName: `Taluka Krishi Adhikari Karyalaya (${claim.taluka}, ${claim.district})`,
    officerName: `Shri. S. K. Deshmukh (Desk Officer & Appeal Authority)`,
    counter: "Fast-Track Special Counter #3",
    appointmentDate: selectedDate,
    appointmentTime: selectedSlot,
    documentsToBring: [
      "Original 7/12 Land Record (७/१२ उतारा) & 8-A Certificate",
      "Aadhaar Card (Original & Self-attested Copy)",
      "Bank Passbook showing IFSC code & Aadhaar linkage",
      "PMFBY Crop Insurance Sowing Receipt / Premium deduction slip",
      "Geotagged damage photo printout / mobile evidence",
    ],
    status: "Confirmed",
    notes: reasonNotes,
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmedPass: OfficeAppointmentPass = {
      ...currentAppointment,
      appointmentDate: selectedDate,
      appointmentTime: selectedSlot,
      notes: reasonNotes,
      status: "Confirmed",
    };

    const updatedClaim: GovtCalamityClaimRecord = {
      ...claim,
      status: "Appeal Scheduled",
      officeAppointment: confirmedPass,
    };

    onAppointmentConfirmed(updatedClaim);
    setIsBooked(true);
  };

  const handleDownloadSlip = () => {
    setDownloadNotice(
      currentLang === "mr"
        ? "कार्यालय भेट प्राधान्य पास (PDF) यशस्वीरित्या सेव्ह झाली!"
        : "Fast-Track Office Appointment Pass downloaded successfully!"
    );
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 border border-teal-400/30 flex items-center justify-center text-amber-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-mono font-bold mb-0.5">
                <span>ONLINE APPEAL & DIRECT OFFICE APPOINTMENT</span>
              </div>
              <h3 className="text-base font-bold font-display">
                {currentLang === "mr"
                  ? "नुकसान भरपाई पुनरावलोकन व थेट कार्यालय भेट वेळ (Fast-Track)"
                  : currentLang === "hi"
                  ? "आपदा मुआवजा पुनर्विचार व कार्यालय प्रत्यक्ष नियुक्ति (Fast-Track)"
                  : "File Refund Online & Schedule Office Visit Appointment"}
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

        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Why this helps the farmer */}
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              {currentLang === "mr"
                ? "आपला वेळ वाचवण्यासाठी आणि कार्यालयात तासनतास रांगेत उभे न राहता काम त्वरित होण्यासाठी, ही प्रणाली आपल्याला थेट योग्य अधिकारी, काऊंटर आणि निश्चित वेळ स्लॉट देत आहे."
                : currentLang === "hi"
                ? "आपका बहुमूल्य समय बचाने व कतार से बचने हेतु, प्रणाली आपको समर्पित अधिकारी, काउंटर व समय स्लॉट आवंटित करती है।"
                : "To save your valuable time and avoid standing in queues at the government office, this portal schedules an appointment with the designated appeal officer at a dedicated fast-track counter."}
            </p>
          </div>

          {/* Rejection context info */}
          {claim.rejectionReason && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
              <span className="font-bold text-[11px] flex items-center gap-1.5 text-rose-800">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>
                  {currentLang === "mr" ? "दावा नाकारण्याचे कारण:" : "Original Reason for Rejection:"}
                </span>
              </span>
              <p className="text-[11px] text-rose-700 pl-5">
                {claim.rejectionReason}
              </p>
            </div>
          )}

          {isBooked ? (
            /* Confirmed Pass Display */
            <div className="space-y-4">
              {downloadNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{downloadNotice}</span>
                </div>
              )}

              {/* Priority Token Pass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-teal-50/50 border-2 border-teal-600 shadow-md space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 tracking-wider uppercase block">
                      FAST-TRACK PRIORITY TOKEN
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      {currentAppointment.tokenNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{currentAppointment.status}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Ref: {claim.id}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">
                      {currentLang === "mr" ? "भेट दिनांक व वेळ:" : "Appointment Date & Slot:"}
                    </span>
                    <span className="font-bold text-slate-900 text-xs block">
                      📅 {currentAppointment.appointmentDate}
                    </span>
                    <span className="text-teal-700 font-semibold text-[11px] block">
                      ⏰ {currentAppointment.appointmentTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">
                      {currentLang === "mr" ? "कार्यालय व काऊंटर:" : "Office & Counter:"}
                    </span>
                    <span className="font-bold text-slate-900 text-xs block">
                      🏢 {currentAppointment.officeName}
                    </span>
                    <span className="text-amber-700 font-semibold text-[11px] block">
                      🚪 {currentAppointment.counter}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800 block text-[11px] mb-1">
                    {currentLang === "mr"
                      ? "कार्यालयात सोबत घेऊन यावयाची मूळ कागदपत्रे:"
                      : "Mandatory Documents to Carry for Fast Clearance:"}
                  </span>
                  <ul className="space-y-1 text-[10px] text-slate-600 pl-1">
                    {currentAppointment.documentsToBring.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* QR Code Watermark Simulation */}
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-slate-800" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Quick Entry QR Code
                      </span>
                      <span className="text-slate-500">
                        Scan at security gate for direct priority entry
                      </span>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold">No Waiting Queue</span>
                </div>
              </div>

              {/* Download / Print Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadSlip}
                  id="download-appointment-slip-btn"
                  className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {currentLang === "mr"
                      ? "कार्यालय भेट पास (PDF) डाउनलोड करा"
                      : "Download Fast-Track Pass (PDF)"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  {currentLang === "mr" ? "बंद करा" : "Close"}
                </button>
              </div>
            </div>
          ) : (
            /* Appointment Scheduling Form */
            <form onSubmit={handleConfirmAppointment} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {currentLang === "mr"
                    ? "आपल्या सोयीचा दिनांक निवडा (Select Suitable Date):"
                    : "Select Suitable Working Day for Office Visit:"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[formatDate(date1), formatDate(date2), formatDate(date3)].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === d
                          ? "border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-2xs"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block text-[11px]">{d.split(",")[0]}</span>
                      <span className="block text-xs font-bold font-mono">
                        {d.split(",")[1]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {currentLang === "mr"
                    ? "वेळ स्लॉट निवडा (Time Slot):"
                    : "Select Priority Time Slot:"}
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                >
                  <option value="10:30 AM - 11:30 AM (Morning Slot)">
                    10:30 AM - 11:30 AM (सकाळ सत्र - Morning Priority)
                  </option>
                  <option value="11:30 AM - 12:30 PM (Peak Desk Slot)">
                    11:30 AM - 12:30 PM (दुपार सत्र - Peak Fast-Track)
                  </option>
                  <option value="02:30 PM - 03:30 PM (Afternoon Hearing)">
                    02:30 PM - 03:30 PM (सुनावणी सत्र - Hearing Desk)
                  </option>
                  <option value="04:00 PM - 05:00 PM (Document Clearance)">
                    04:00 PM - 05:00 PM (कागदपत्र निर्गती सत्र)
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {currentLang === "mr"
                    ? "पुनरावलोकन मागण्याचे कारण / टिप्पणी:"
                    : "Brief Appeal Note for the Officer:"}
                </label>
                <textarea
                  rows={2}
                  value={reasonNotes}
                  onChange={(e) => setReasonNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 space-y-1">
                <span className="font-bold block text-slate-900">
                  {currentAppointment.officeName}
                </span>
                <span className="text-[11px] block text-slate-600">
                  अधिकारी: {currentAppointment.officerName} · {currentAppointment.counter}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  {currentLang === "mr" ? "रद्द करा" : "Cancel"}
                </button>
                <button
                  type="submit"
                  id="confirm-office-appointment-btn"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentLang === "mr"
                      ? "कार्यालय भेट वेळ निश्चित करा व टोकन मिळवा"
                      : "Confirm Appointment & Get Fast-Track Token"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
