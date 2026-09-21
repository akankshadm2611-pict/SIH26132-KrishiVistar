import React from "react";
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Upload,
  Camera,
  Video,
  PlusCircle,
  Trash2,
  Building,
  Info,
  ArrowLeft,
  ArrowRight,
  Table,
  BookOpen,
  Calendar,
  AlertCircle,
  HelpCircle,
  FileCheck2,
  Edit3,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  GovtCalamityClaimRecord,
  GeotaggedPhotoData,
} from "../../types";
import { Language } from "../../translations";
import { SDRF_CATEGORIES, SdrfItemCategory, SdrfSubOption } from "../../data/sdrfNorms";
import { GeotaggedCameraCapture } from "./GeotaggedCameraCapture";

interface EPanchnamaRegistrationFormProps {
  currentLang: Language;
  // Step navigation
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onJumpToStep: (step: number) => void;
  validationError: string | null;
  // SDRF state
  sdrfCategoryId: string;
  setSdrfCategoryId: (id: string) => void;
  sdrfSubOptionId: string;
  setSdrfSubOptionId: (id: string) => void;
  sdrfUnitsCount: number;
  setSdrfUnitsCount: (val: number) => void;
  currentSdrfCategory: SdrfItemCategory;
  currentSdrfSubOption: SdrfSubOption;
  calculatedSdrfAssistance: number;
  areaInHectares: number;
  onOpenSdrfNormsModal: () => void;
  onOpenUserManual: () => void;
  // Form fields state
  formAadhaar: string;
  setFormAadhaar: (v: string) => void;
  aadhaarFile: string | null;
  setAadhaarFile: (v: string | null) => void;
  formAadhaarMobile: string;
  setFormAadhaarMobile: (v: string) => void;
  aadhaarSeedingStatus: string;
  setAadhaarSeedingStatus: (v: string) => void;
  formGatNumber: string;
  setFormGatNumber: (v: string) => void;
  formTaluka: string;
  setFormTaluka: (v: string) => void;
  formVillage: string;
  setFormVillage: (v: string) => void;
  sevenTwelveFile: string | null;
  setSevenTwelveFile: (v: string | null) => void;
  hasEightA: boolean;
  setHasEightA: (v: boolean) => void;
  eightAFile: string | null;
  setEightAFile: (v: string | null) => void;
  bankPassbookFile: string | null;
  setBankPassbookFile: (v: string | null) => void;
  formCrop: string;
  setFormCrop: (v: string) => void;
  formCropVariety: string;
  setFormCropVariety: (v: string) => void;
  formCropStage: string;
  setFormCropStage: (v: string) => void;
  formDamagedAreaVal: string;
  setFormDamagedAreaVal: (v: string) => void;
  formDamagedAreaUnit: "Acres" | "Hectares" | "Gunthas";
  setFormDamagedAreaUnit: (v: "Acres" | "Hectares" | "Gunthas") => void;
  formLossPercent: number;
  setFormLossPercent: (v: number) => void;
  formCalamity: string;
  setFormCalamity: (v: string) => void;
  formDateOfDamage: string;
  setFormDateOfDamage: (v: string) => void;
  formCalamityDetails: string;
  setFormCalamityDetails: (v: string) => void;
  geotaggedPhoto: GeotaggedPhotoData | null;
  setGeotaggedPhoto: (v: GeotaggedPhotoData | null) => void;
  fieldMediaList: { name: string; type: "photo" | "video"; size: string }[];
  onAddMedia: () => void;
  onRemoveMedia: (index: number) => void;
  onSubmitClaim: (e: React.FormEvent) => void;
  formSuccessClaim: GovtCalamityClaimRecord | null;
  onDismissSuccess: () => void;
  onViewReportsAndStatus?: () => void;
}

export const EPanchnamaRegistrationForm: React.FC<EPanchnamaRegistrationFormProps> = ({
  currentLang,
  currentStep,
  onNextStep,
  onPrevStep,
  onJumpToStep,
  validationError,
  sdrfCategoryId,
  setSdrfCategoryId,
  sdrfSubOptionId,
  setSdrfSubOptionId,
  sdrfUnitsCount,
  setSdrfUnitsCount,
  currentSdrfCategory,
  currentSdrfSubOption,
  calculatedSdrfAssistance,
  areaInHectares,
  onOpenSdrfNormsModal,
  onOpenUserManual,
  formAadhaar,
  setFormAadhaar,
  aadhaarFile,
  setAadhaarFile,
  formAadhaarMobile,
  setFormAadhaarMobile,
  aadhaarSeedingStatus,
  setAadhaarSeedingStatus,
  formGatNumber,
  setFormGatNumber,
  formTaluka,
  setFormTaluka,
  formVillage,
  setFormVillage,
  sevenTwelveFile,
  setSevenTwelveFile,
  hasEightA,
  setHasEightA,
  eightAFile,
  setEightAFile,
  bankPassbookFile,
  setBankPassbookFile,
  formCrop,
  setFormCrop,
  formCropVariety,
  setFormCropVariety,
  formCropStage,
  setFormCropStage,
  formDamagedAreaVal,
  setFormDamagedAreaVal,
  formDamagedAreaUnit,
  setFormDamagedAreaUnit,
  formLossPercent,
  setFormLossPercent,
  formCalamity,
  setFormCalamity,
  formDateOfDamage,
  setFormDateOfDamage,
  formCalamityDetails,
  setFormCalamityDetails,
  geotaggedPhoto,
  setGeotaggedPhoto,
  fieldMediaList,
  onAddMedia,
  onRemoveMedia,
  onSubmitClaim,
  formSuccessClaim,
  onDismissSuccess,
  onViewReportsAndStatus,
}) => {
  // Stepper labels matching Image 2 structure
  const stepItems = [
    { number: 1, label: currentLang === "mr" ? "वैयक्तिक तपशील" : "Personal Details", sub: "Aadhaar & Mobile" },
    { number: 2, label: currentLang === "mr" ? "जमीन तपशील" : "Land Details", sub: "7/12 & Gat No." },
    { number: 3, label: currentLang === "mr" ? "नुकसान तपशील (SDRF)" : "Damage & SDRF", sub: "SDRF Norms & Area" },
    { number: 4, label: currentLang === "mr" ? "आपत्ती तपशील" : "Calamity Details", sub: "Event & Date" },
    { number: 5, label: currentLang === "mr" ? "कागदपत्रे अपलोड" : "Documents Upload", sub: "Field Photos & Passbook" },
    { number: 6, label: currentLang === "mr" ? "पडताळणी व सादर" : "Review & Submit", sub: "Confirmation & VK No." },
  ];

  return (
    <div className="space-y-6">
      {/* Success Notification Banner if just lodged */}
      {formSuccessClaim && (
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 space-y-4 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-emerald-950">
                  {currentLang === "mr"
                    ? "आपला ई-पंचनामा अर्ज यशस्वीरीत्या दाखल झाला!"
                    : "e-Panchnama Crop Damage Report Lodged Successfully!"}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded border border-emerald-300">
                    Report ID: {formSuccessClaim.id}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Status: Pending (तपासणी प्रलंबित)</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-800 bg-white/90 px-2 py-0.5 rounded border border-emerald-200">
                    Ref: {formSuccessClaim.surveyReportNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onViewReportsAndStatus && (
                <button
                  type="button"
                  onClick={onViewReportsAndStatus}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-800 hover:bg-teal-900 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>{currentLang === "mr" ? "अहवाल व स्थिती पहा" : "View in Reports & Status"}</span>
                </button>
              )}
              <button
                type="button"
                onClick={onDismissSuccess}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
              >
                {currentLang === "mr" ? "नवीन अर्ज भरा" : "Fill Another Report"}
              </button>
            </div>
          </div>

          {/* Forwarding Desk */}
          <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-teal-50/70 border border-teal-200">
              <span className="font-bold text-teal-950 block">१. कृषी अधिकारी कार्यालय</span>
              <span className="text-[11px] text-slate-600 block mt-0.5">
                {formSuccessClaim.assignedAgencies?.localAgriOffice}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
              <span className="font-bold text-amber-950 block">२. महसूल मंडळ अधिकारी / तलाठी</span>
              <span className="text-[11px] text-slate-600 block mt-0.5">
                {formSuccessClaim.assignedAgencies?.revenueOfficer}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200">
              <span className="font-bold text-indigo-950 block">३. विमा कंपनी प्रतिनिधी</span>
              <span className="text-[11px] text-slate-600 block mt-0.5">
                {formSuccessClaim.assignedAgencies?.insuranceCompany}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Two-Column Side-by-Side Responsive Layout matching Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Brand Banner & Hero Card matching Screenshot 2 */}
        {/* Fixed position sticky on desktop and length adjusted according to right side even if scrolled */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-6rem)] lg:min-h-[640px] lg:max-h-[860px] bg-[#edf6f1] rounded-2xl border border-[#d2e6da] overflow-hidden shadow-2xs flex flex-col justify-between">
          {/* Top Brand and Text */}
          <div className="p-7 sm:p-9 shrink-0">
            {/* Logo: Three green leaves icon matching Screenshot 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 40 40" className="w-10 h-10 fill-[#1b7937]" xmlns="http://www.w3.org/2000/svg">
                  {/* Central upright leaf */}
                  <path d="M20 4 C20 4 26 13 23 21 C21 18 19 18 17 21 C14 13 20 4 20 4 Z" />
                  {/* Left angled leaf */}
                  <path d="M17 22 C17 22 7 19 4 26 C9 27 14 25 16 26 C16 23 17 22 17 22 Z" />
                  {/* Right angled leaf */}
                  <path d="M23 22 C23 22 33 19 36 26 C31 27 26 25 24 26 C24 23 23 22 23 22 Z" />
                  {/* Stem */}
                  <path d="M19 25 C19 29 19 33 20 36 C21 33 21 29 21 25 Z" />
                </svg>
              </div>
              <div>
                <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#0c3920] block font-sans leading-none">
                  KrishiVistar
                </span>
                <span className="text-xs text-[#395b46] font-semibold tracking-normal block mt-1">
                  Better Information. Stronger Farmers.
                </span>
              </div>
            </div>

            {/* Main Headline from Screenshot 2 */}
            <h2 className="text-2xl sm:text-[28px] font-bold text-[#0c3920] font-sans leading-snug mt-8 sm:mt-10">
              Empowering Farmers <br />
              for a Brighter Tomorrow
            </h2>

            {/* Subtitle text from Screenshot 2 */}
            <p className="text-xs sm:text-sm text-[#486653] leading-relaxed mt-4 max-w-sm">
              Access real-time information, expert guidance and essential services for a smarter and more profitable farming journey.
            </p>
          </div>

          {/* Bottom Hero Image seamlessly anchored to bottom as in Screenshot 2 */}
          <div className="flex-1 w-full relative min-h-[280px] overflow-hidden">
            <img
              src="/farmer_field_hero.jpg"
              alt="Indian farmer overlooking lush crop fields"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* Right Side: Multi-Step Sequential Form Card matching Image 3 */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header Title & Subtitle matching Image 3 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {currentLang === "mr"
                  ? "आपत्ती पीक नुकसान नोंद (ई-पंचनामा)"
                  : "Calamity Crop Damage Report (e-Panchnama)"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {currentLang === "mr"
                  ? "ई-पंचनामा नोंदणी सुरू करण्यासाठी पायरीनुसार तपशील प्रविष्ट करा"
                  : "Complete the sequential steps to lodge your verified crop damage report"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenUserManual}
                className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                <span>{currentLang === "mr" ? "मार्गदर्शिका" : "User Manual"}</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar (1 to 6) connected with green track matching Image 3 */}
          <div className="py-2">
            <div className="relative flex items-center justify-between">
              {/* Background connecting track */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 z-0" />
              {/* Active progress track */}
              <div
                className="absolute top-4 left-4 h-0.5 bg-emerald-600 transition-all duration-300 z-0"
                style={{
                  width: `${((currentStep - 1) / (stepItems.length - 1)) * 100}%`,
                }}
              />

              {/* Step Bubbles */}
              {stepItems.map((st) => {
                const isCompleted = currentStep > st.number;
                const isActive = currentStep === st.number;
                return (
                  <div
                    key={st.number}
                    onClick={() => onJumpToStep(st.number)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        isCompleted
                          ? "bg-emerald-600 text-white ring-2 ring-emerald-600"
                          : isActive
                          ? "bg-emerald-700 text-white ring-4 ring-emerald-100 scale-105"
                          : "bg-white text-slate-400 border-2 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : st.number}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-1.5 text-center hidden md:block max-w-[80px] leading-tight ${
                        isActive
                          ? "text-emerald-900 font-bold"
                          : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Error Alert Banner: "unless the first step is completed don't jump to next step" */}
          {validationError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">पायरी अपूर्ण आहे / Step Required:</span>
                <span className="text-[11px] text-rose-800">{validationError}</span>
              </div>
            </div>
          )}

          {/* Form Content Body with Step-Specific Fields */}
          <form onSubmit={onSubmitClaim} className="space-y-6">
            {/* STEP 1: PERSONAL DETAILS (Aadhaar, Mobile, Seeding) */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      १
                    </span>
                    <span>
                      {currentLang === "mr" ? "वैयक्तिक तपशील व आधार माहिती" : "Personal Details & Aadhaar"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "आधार कार्ड क्रमांक आणि आधारशी जोडलेला मोबाईल क्रमांक अचूक प्रविष्ट करा."
                      : "Enter your valid 12-digit Aadhaar card and Aadhaar-linked mobile number for instant verification."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Aadhaar Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>
                        आधार कार्ड क्रमांक (Aadhaar Number) <span className="text-rose-500">*</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">UIDAI Verified</span>
                    </label>
                    <input
                      type="text"
                      id="form-aadhaar-number-input"
                      value={formAadhaar}
                      onChange={(e) => setFormAadhaar(e.target.value)}
                      placeholder="उदा. 8492-3011-9402"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs font-mono bg-white"
                    />
                    <p className="text-[10px] text-slate-500">
                      १२-अंकी आधार क्रमांक प्रविष्ट करा (प्रमाणपत्रावर छापल्याप्रमाणे).
                    </p>
                  </div>

                  {/* Mobile Number Linked with Aadhaar */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      आधारशी जोडलेला मोबाईल (Aadhaar Mobile) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 rounded-xl border border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="form-aadhaar-mobile-input"
                        value={formAadhaarMobile}
                        onChange={(e) => setFormAadhaarMobile(e.target.value)}
                        placeholder="98221 48190"
                        required
                        className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs font-mono bg-white"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">
                      या मोबाईलवर ई-पंचनामा अहवाल व VK क्रमांक एसएमएसद्वारे पाठवला जाईल.
                    </p>
                  </div>

                  {/* Aadhaar Card Proof Attachment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      आधार कार्ड प्रत जोडली आहे का? (Aadhaar File Proof)
                    </label>
                    <div className="p-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-700" />
                        <span className="font-mono text-slate-700 text-[11px]">
                          {aadhaarFile || "Aadhaar_Card_Front_Back.pdf"}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        जोडले ✓
                      </span>
                    </div>
                  </div>

                  {/* Aadhaar-Linked Seeding Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      बँक खात्याची आधार सीडिंग स्थिती (NPCI Seeding) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={aadhaarSeedingStatus}
                      onChange={(e) => setAadhaarSeedingStatus(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs bg-white font-medium"
                    >
                      <option value="Aadhaar Seeded & Active on NPCI (आधार संलग्न व NPCI वर सक्रिय ✓)">
                        Aadhaar Seeded & Active on NPCI (आधार संलग्न व NPCI वर सक्रिय ✓)
                      </option>
                      <option value="Aadhaar Seeding Under Verification (पडताळणी सुरू)">
                        Aadhaar Seeding Under Verification (पडताळणी सुरू)
                      </option>
                      <option value="Direct Mandate Verified (थेट शासकीय मंजुरी प्रमाणित)">
                        Direct Mandate Verified (थेट शासकीय मंजुरी प्रमाणित)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LAND DETAILS (Gat / Survey Number, Village, Taluka, 7/12 & 8-A) */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      २
                    </span>
                    <span>
                      {currentLang === "mr" ? "शेतजमीन तपशील व सातबारा (७/१२)" : "Land & Revenue Details"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "जमीन/गट क्रमांक, गाव, तालुका व ७/१२ उतारा तपशील अचूक प्रविष्ट करा."
                      : "Provide land survey / gat number, village, taluka, and attach your 7/12 extract."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Land/Survey/Gat Number */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-700">
                      जमीन / गट किंवा सर्व्हे क्रमांक (Land / Survey / Gat Number) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-gat-number-input"
                      value={formGatNumber}
                      onChange={(e) => setFormGatNumber(e.target.value)}
                      placeholder="उदा. गट नं. ४२/ब, सर्व्हे नं. ११८"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs bg-white"
                    />
                  </div>

                  {/* Village */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      गाव (Village) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-village-input"
                      value={formVillage}
                      onChange={(e) => setFormVillage(e.target.value)}
                      placeholder="उदा. जानोरी"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs bg-white"
                    />
                  </div>

                  {/* Taluka & District */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      तालुका व जिल्हा (Taluka & District) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-taluka-input"
                      value={formTaluka}
                      onChange={(e) => setFormTaluka(e.target.value)}
                      placeholder="उदा. दिंडोरी, नाशिक"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs bg-white"
                    />
                  </div>

                  {/* 7/12 Extract Upload */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      ७/१२ उतारा (सातबारा - 7/12 Extract) <span className="text-rose-500">*</span>
                    </label>
                    <div className="p-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-700" />
                        <span className="font-mono text-slate-800 text-[11px]">
                          {sevenTwelveFile || "7-12_Extract_Gat42B_Janori.pdf"}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                        संलग्न ✓
                      </span>
                    </div>
                  </div>

                  {/* 8-A Extract */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        ८-अ खाते उतारा (8-A Extract, if applicable)
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasEightA}
                          onChange={(e) => setHasEightA(e.target.checked)}
                          className="rounded text-emerald-600"
                        />
                        <span>उपलब्ध आहे</span>
                      </label>
                    </div>
                    {hasEightA ? (
                      <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-teal-700" />
                          <span className="font-mono text-slate-700 text-[11px]">
                            {eightAFile || "8-A_KhataExtract_No118.pdf"}
                          </span>
                        </div>
                        <span className="text-[10px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded">
                          संलग्न ✓
                        </span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-500 italic border border-slate-200">
                        ८-अ उतारा लागू नाही किंवा नंतर प्रत्यक्ष पंचनाम्यात सादर केला जाईल.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DAMAGE DETAILS (SDRF Assistance Categories from Images 1 & 2!) */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                        ३
                      </span>
                      <span>
                        {currentLang === "mr"
                          ? "नुकसान तपशील व SDRF साहाय्य वर्गवारी (SDRF Norms)"
                          : "Damage Details & SDRF Assistance Category"}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {currentLang === "mr"
                        ? "शासन निर्णयानुसार नुकसानीचा अचूक प्रवर्ग निवडा व अंदाजे क्षेत्र प्रविष्ट करा."
                        : "Select the applicable SDRF disaster assistance category (Items 1 to 11) and affected acreage."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenSdrfNormsModal}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Table className="w-3.5 h-3.5 text-amber-700" />
                    <span>{currentLang === "mr" ? "दर तक्ता उघडा" : "View Norms Table"}</span>
                  </button>
                </div>

                {/* SDRF Primary Category Selector (11 items from the user-uploaded images) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>
                      SDRF साहाय्य प्रवर्ग निवडा (Select SDRF Assistance Category) <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Current: Item #{currentSdrfCategory.srNo}
                    </span>
                  </label>

                  <select
                    id="sdrf-category-select"
                    value={sdrfCategoryId}
                    onChange={(e) => {
                      const newCatId = e.target.value;
                      setSdrfCategoryId(newCatId);
                      const cat = SDRF_CATEGORIES.find((c) => c.id === newCatId);
                      if (cat) {
                        setSdrfSubOptionId(cat.defaultSubOptionId);
                      }
                    }}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  >
                    {SDRF_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        Item #{cat.srNo} - {cat.title} ({cat.titleMr})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub-Category Options & Rates (Specific to selected SDRF Item) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    SDRF दर व निकष (Assistance Rate & Criteria) <span className="text-rose-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {currentSdrfCategory.options.map((opt) => {
                      const isSelected = sdrfSubOptionId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSdrfSubOptionId(opt.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-emerald-50/80 border-emerald-500 shadow-xs ring-1 ring-emerald-500"
                              : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900 leading-tight">
                                {opt.label}
                              </span>
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                                  ✓
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {opt.labelMr}
                            </span>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-200/60">
                            <span className="text-[11px] font-mono font-bold text-emerald-800 block">
                              {opt.criteriaText}
                            </span>
                            {opt.maxLimit && (
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                मर्यादा: {opt.maxLimit}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* If Crop Damage (Item 9), show specific Crop & Variety details */}
                {sdrfCategoryId === "crop_damage" && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-800 border-b border-slate-200 pb-2">
                      <Sprout className="w-4 h-4 text-emerald-700" />
                      <span>पिकाचा सविस्तर तपशील (Crop & Variety Details)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Crop Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          पिकाचे नाव (Crop Name) <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="form-crop-select"
                          value={formCrop}
                          onChange={(e) => setFormCrop(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                        >
                          <option value="Tomato (Hybrid)">Tomato (टोमॅटो हायब्रिड)</option>
                          <option value="Onion (Nashik Red)">Onion (कांदा / नाशिक लाल)</option>
                          <option value="Soybean (JS-335)">Soybean (सोयाबीन)</option>
                          <option value="Cotton (Bt Hybrid)">Cotton (कापूस)</option>
                          <option value="Grapes (Thomson Seedless)">Grapes (द्राक्षे / थॉमसन)</option>
                          <option value="Pomegranate (Bhagwa)">Pomegranate (डाळिंब / भगवा)</option>
                          <option value="Wheat (Sharbati Golden)">Wheat (गहू / शरबती)</option>
                          <option value="Sugarcane (Co-86032)">Sugarcane (ऊस)</option>
                        </select>
                      </div>

                      {/* Crop Variety */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          पिकाचा वाण / हायब्रिड (Variety) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="form-crop-variety-input"
                          value={formCropVariety}
                          onChange={(e) => setFormCropVariety(e.target.value)}
                          placeholder="उदा. अभिनव F1 हायब्रिड"
                          required
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>

                      {/* Crop Growth Stage */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          नुकसानीच्या वेळी वाढीची अवस्था (Stage)
                        </label>
                        <select
                          value={formCropStage}
                          onChange={(e) => setFormCropStage(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs"
                        >
                          <option value="Flowering & Fruit Setting Stage (५० दिवस)">
                            Flowering & Fruit Setting (फुलोरा व फळधारणा)
                          </option>
                          <option value="Vegetative Growth Stage (३० दिवस)">
                            Vegetative Stage (शाकीय वाढ अवस्था)
                          </option>
                          <option value="Peak Harvest / Picking Stage (कापणी काळ)">
                            Harvest / Picking Stage (तोडणी / काढणी काळ)
                          </option>
                          <option value="Post-Harvest Field Spoilage (काढणी पश्चात)">
                            Post-Harvest Standing Furrows (काढणी पश्चात)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Damaged Area / Unit Count & Live Calculation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {/* Damaged Area Input */}
                  <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span>
                        अंदाजे नुकसान क्षेत्र (Approximate Damaged Area) <span className="text-rose-500">*</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-800 font-bold">
                        = {areaInHectares.toFixed(2)} Hectares (हेक्टर)
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        id="form-damaged-area-input"
                        value={formDamagedAreaVal}
                        onChange={(e) => setFormDamagedAreaVal(e.target.value)}
                        placeholder="2.5"
                        required
                        className="flex-1 p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900"
                      />

                      <select
                        value={formDamagedAreaUnit}
                        onChange={(e) =>
                          setFormDamagedAreaUnit(e.target.value as "Acres" | "Hectares" | "Gunthas")
                        }
                        className="p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700"
                      >
                        <option value="Acres">Acres (एकर)</option>
                        <option value="Hectares">Hectares (हेक्टर)</option>
                        <option value="Gunthas">Gunthas (गुंठे)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        SDRF नियमानुसार एका शेतकरी कुटुंबासाठी कमाल २ हेक्टरपर्यंत मदत लागू राहते.
                      </span>
                    </div>

                    {/* Assessed Loss Percentage Slider */}
                    <div className="pt-2 border-t border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700">नुकसानीची अंदाजे टक्केवारी (Loss %):</span>
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono">
                          {formLossPercent}% Loss
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={formLossPercent}
                        onChange={(e) => setFormLossPercent(parseInt(e.target.value, 10))}
                        className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>१०%</span>
                        <span className="text-emerald-700 font-bold">३३% SDRF निकष पात्रता</span>
                        <span>१००% पूर्ण नुकसान</span>
                      </div>
                    </div>
                  </div>

                  {/* Live SDRF Relief Compensation Calculation Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <Table className="w-4 h-4 text-emerald-700" />
                        <span>SDRF साहाय्य अंदाज (Estimated Relief Norm)</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Item #{currentSdrfCategory.srNo}
                      </span>
                    </div>

                    <div className="p-3 bg-white/90 rounded-lg border border-emerald-200 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-600 text-[11px]">
                        <span>अधिकृत शासकीय दर:</span>
                        <span className="font-semibold text-slate-800">
                          ₹{currentSdrfSubOption.ratePerUnit.toLocaleString("en-IN")} / {currentSdrfSubOption.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600 text-[11px]">
                        <span>मदत पात्र क्षेत्र (कमाल २ हे.):</span>
                        <span className="font-semibold text-slate-800">
                          {Math.min(areaInHectares, 2).toFixed(2)} हेक्टर
                        </span>
                      </div>
                      <div className="pt-2 border-t border-emerald-100 flex justify-between items-baseline">
                        <span className="font-bold text-emerald-950">अंदाजे पात्र SDRF रक्कम:</span>
                        <span className="font-black text-lg text-emerald-900 font-mono">
                          ₹{calculatedSdrfAssistance.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-600 leading-tight">
                      * प्रत्यक्ष पंचनामा पाहणीअंती कृषी अधिकारी व तलाठी यांच्या अहवालानुसार अंतिम रक्कम निश्चित केली जाईल.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CALAMITY DETAILS (Natural Calamity Event & Date) */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      ४
                    </span>
                    <span>
                      {currentLang === "mr"
                        ? "नैसर्गिक आपत्ती प्रकार व नुकसान दिनांक"
                        : "Natural Calamity Event & Date"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "आपत्तीचा अचूक प्रकार, तारीख आणि शेतातील नुकसानीचे संक्षिप्त वर्णन लिहा."
                      : "Specify the exact natural disaster event, date of damage occurrence, and brief description."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Calamity Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      नैसर्गिक आपत्तीचा प्रकार (Calamity Type) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="form-calamity-select"
                      value={formCalamity}
                      onChange={(e) => setFormCalamity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                    >
                      <option value="Unseasonal Hailstorm & Cloudburst">
                        Unseasonal Hailstorm & Cloudburst (गारपीट व ढगफुटीसदृश पाऊस)
                      </option>
                      <option value="Torrential Rains & Severe Inundation">
                        Torrential Excess Rains & Flooding (अतिवृष्टी व पूरपरिस्थिती)
                      </option>
                      <option value="Severe Cyclone & Gale Winds">
                        Severe Cyclone & High Velocity Winds (चक्रीवादळ व वादळी वारे)
                      </option>
                      <option value="Extended Flash Drought / Dry Spell">
                        Extended Severe Dry Spell (दीर्घकालीन अवर्षण / दुष्काळ)
                      </option>
                      <option value="Pest Outbreak & Viral Blight">
                        Unprecedented Pest Outbreak (मोठ्या प्रमाणावर कीड व रोग)
                      </option>
                    </select>
                  </div>

                  {/* Date of Damage */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      नुकसान झालेला दिनांक (Date of Damage) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        id="form-date-of-damage-input"
                        value={formDateOfDamage}
                        onChange={(e) => setFormDateOfDamage(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">
                      नुकसान झाल्यापासून ७२ तासांच्या आत नोंदणी करणे आवश्यक आहे.
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-700">
                      शेतातील नुकसानीचे सविस्तर वर्णन (Observations & Calamity Details) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      id="form-calamity-details-textarea"
                      value={formCalamityDetails}
                      onChange={(e) => setFormCalamityDetails(e.target.value)}
                      placeholder="उदा. ४५ मिनिटे झालेल्या तीव्र गारपीट व ढगफुटीमुळे टोमॅटो पिकाचे खोड मोडले, फळे गळाली व शेतात १.५ फूट पाणी साचले."
                      required
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed"
                    />
                    <p className="text-[10px] text-slate-500">
                      किमान १० अक्षरे. प्रत्यक्ष पाहणी करणाऱ्या कृषी अधिकाऱ्याला परिस्थिती समजण्यासाठी स्पष्ट लिहा.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: DOCUMENTS UPLOAD (Clear Field Photos & Videos, Geotag, Bank Passbook) */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      ५
                    </span>
                    <span>
                      {currentLang === "mr"
                        ? "शेतातील फोटो/व्हिडिओ व पुरावे (Field Evidence)"
                        : "Field Photographs, Videos & Passbook Proof"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "शेतात स्पष्ट दिसणारे फोटो किंवा व्हिडिओ अपलोड करा किंवा थेट कॅमेऱ्याने जिओ-टॅग फोटो घ्या."
                      : "Photographs / videos of damaged crop, preferably showing the field clearly, and bank passbook."}
                  </p>
                </div>

                {/* Geotagged Camera Capture Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      <span>थेट GPS जिओ-टॅग फोटो कॅप्चर (Live Geotagged Photo)</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                      GPS Enabled
                    </span>
                  </div>

                  <GeotaggedCameraCapture
                    onPhotoCaptured={(photo) => setGeotaggedPhoto(photo)}
                    currentLang={currentLang}
                    existingPhoto={geotaggedPhoto}
                  />
                </div>

                {/* Field Photos & Videos Upload List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-teal-700" />
                      <span>
                        शेतातील स्पष्ट फोटो व व्हिडिओ पुरावे (Field Media Files) <span className="text-rose-500">*</span>
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={onAddMedia}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{currentLang === "mr" ? "अधिक पुरावा जोडा" : "Add More Media"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fieldMediaList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {item.type === "video" ? (
                            <Video className="w-4 h-4 text-indigo-600 shrink-0" />
                          ) : (
                            <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          <div className="truncate">
                            <span className="font-semibold text-slate-800 truncate block text-[11px]">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.size}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveMedia(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Passbook Copy (For Identity Proof & Direct Mandate) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    बँक पासबुक प्रत (Bank Passbook Copy - Identity Verification) <span className="text-rose-500">*</span>
                  </label>
                  <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-700" />
                      <div>
                        <span className="font-mono text-slate-800 text-[11px] block">
                          {bankPassbookFile || "Bank_Passbook_Front_Copy.jpg"}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          नाव व खाते क्रमांक पडताळणीसाठी (No transaction records displayed)
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-800 font-bold bg-indigo-100 px-2 py-0.5 rounded">
                      संलग्न ✓
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & SUBMIT (Comprehensive Structured Review of All Filled Data) */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                        ६
                      </span>
                      <span>
                        {currentLang === "mr"
                          ? "ई-पंचनामा सर्व माहिती पडताळणी व सादर करा"
                          : "Review All Filled Information & Submit"}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {currentLang === "mr"
                        ? "कृपया खालील सर्व भरलेली माहिती तपासा. कोणत्याही भागात बदल करण्यासाठी 'संपादन (Edit)' बटणावर क्लिक करा."
                        : "Please review all entered details below. Click 'Edit' on any section to modify before final submission."}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    ५ पैकी ५ पायऱ्या पूर्ण ✓
                  </span>
                </div>

                {/* Structured Review Cards for All Filled Sections */}
                <div className="space-y-3.5">
                  {/* Review Section 1: Personal Details & Aadhaar */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          1
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {currentLang === "mr" ? "वैयक्तिक तपशील व आधार" : "Personal Details & Aadhaar"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToStep(1)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{currentLang === "mr" ? "संपादन (Edit)" : "Edit"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          आधार कार्ड क्रमांक
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-xs block mt-0.5">
                          {formAadhaar || "Not provided"}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                          ✓ {aadhaarFile || "Aadhaar_Card_Front_Back.pdf"}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          आधारशी जोडलेला मोबाईल
                        </span>
                        <span className="font-bold text-slate-800 text-xs block mt-0.5">
                          +91 {formAadhaarMobile || "Not provided"}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                          ✓ OTP द्वारे सत्यापित
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          बँक NPCI आधार सीडिंग
                        </span>
                        <span className="font-bold text-emerald-800 text-xs block mt-0.5">
                          सक्रिय व सत्यापित (Seeded ✓)
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          पासबुक: {bankPassbookFile || "Bank_Passbook_Front_Copy.jpg"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Section 2: Land & Revenue Details */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          2
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {currentLang === "mr" ? "शेतजमीन व महसूल तपशील" : "Land & Revenue Details"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToStep(2)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{currentLang === "mr" ? "संपादन (Edit)" : "Edit"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          गट / सर्व्हे क्रमांक
                        </span>
                        <span className="font-bold text-slate-800 text-xs block mt-0.5">
                          {formGatNumber || "Not provided"}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          गाव, तालुका व जिल्हा
                        </span>
                        <span className="font-bold text-slate-800 text-xs block mt-0.5">
                          {formVillage}, {formTaluka}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          महसूल कागदपत्रे पडताळणी
                        </span>
                        <span className="text-[11px] text-emerald-800 font-semibold block mt-0.5">
                          ✓ ७/१२ उतारा: {sevenTwelveFile || "7-12_Extract.pdf"}
                        </span>
                        <span className="text-[10px] text-slate-600 block">
                          {hasEightA
                            ? `✓ ८-अ खाते उतारा: ${eightAFile || "8-A_KhataExtract.pdf"}`
                            : "८-अ लागू नाही"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Section 3: Damage & SDRF Assistance Norms */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          3
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {currentLang === "mr"
                            ? "पीक नुकसान व SDRF साहाय्य दर"
                            : "Crop Damage & SDRF Norms"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToStep(3)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{currentLang === "mr" ? "संपादन (Edit)" : "Edit"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          SDRF दर प्रवर्ग (Norms Category)
                        </span>
                        <span className="font-bold text-emerald-950 text-xs block mt-0.5">
                          Item #{currentSdrfCategory.srNo}: {currentSdrfCategory.title}
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          उपप्रवर्ग: {currentSdrfSubOption.label}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          पीक, वाण व वाढीची अवस्था
                        </span>
                        <span className="font-bold text-slate-800 text-xs block mt-0.5">
                          {formCrop} ({formCropVariety})
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          अवस्था: {formCropStage}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          बाधित क्षेत्र व नुकसानीची टक्केवारी
                        </span>
                        <span className="font-bold text-rose-700 text-xs block mt-0.5">
                          {formDamagedAreaVal} {formDamagedAreaUnit} ({areaInHectares.toFixed(2)} Ha) · {formLossPercent}% Loss
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          ३३% पेक्षा जास्त नुकसान निकष पात्र ✓
                        </span>
                      </div>
                    </div>

                    {/* Highlighted Assistance Amount */}
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
                      <div>
                        <span className="font-bold text-emerald-950 text-xs block">
                          शासन निर्णयानुसार अंदाजे पात्र SDRF साहाय्य:
                        </span>
                        <span className="text-[11px] text-emerald-800 block">
                          दर: {currentSdrfSubOption.criteriaText} (कमाल २ हेक्टर मर्यादेत)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-black text-lg sm:text-xl text-emerald-900 block">
                          ₹{calculatedSdrfAssistance.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Section 4: Calamity Details */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          4
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {currentLang === "mr" ? "नैसर्गिक आपत्ती तपशील" : "Natural Calamity Details"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToStep(4)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{currentLang === "mr" ? "संपादन (Edit)" : "Edit"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          आपत्तीचा प्रकार व दिनांक
                        </span>
                        <span className="font-bold text-rose-900 text-xs block mt-0.5">
                          {formCalamity}
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          आपत्ती दिनांक: {formDateOfDamage} (७२ तासांच्या आत नोंदणीकृत ✓)
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          शेतातील प्रत्यक्ष निरीक्षण नोंद
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed mt-0.5 line-clamp-2">
                          {formCalamityDetails}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Section 5: Documents & Media Evidence */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          5
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {currentLang === "mr" ? "कागदपत्रे व शेतातील डिजिटल पुरावे" : "Documents & Digital Evidence"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToStep(5)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{currentLang === "mr" ? "संपादन (Edit)" : "Edit"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          GPS जिओ-टॅग लाइव्ह कॅमेरा फोटो
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-semibold text-slate-800">
                            {geotaggedPhoto
                              ? `Lat: ${geotaggedPhoto.latitude.toFixed(4)}, Long: ${geotaggedPhoto.longitude.toFixed(4)}`
                              : "GPS अक्षांश/रेखांश व वेळ मुद्रित फोटो संलग्न ✓"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          शेतातील फोटो व व्हिडिओ पुरावे ({fieldMediaList.length} फाइल्स)
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {fieldMediaList.map((m, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/70 text-slate-700"
                            >
                              {m.name} ({m.size})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Official VK Number & Verification Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">
                      ई-पंचनामा सादर केल्यानंतरची अधिकृत कार्यप्रणाली (Official Workflow):
                    </span>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      हा अर्ज सादर केल्यावर तो आपोआप <strong>Pending (प्रलंबित)</strong> स्थितीत नोंदवला जाईल. त्यानंतर पुढील ७२ तासांत तालुका कृषी अधिकारी, महसूल मंडळ तलाठी आणि पीक विमा प्रतिनिधी आपल्या शेताची संयुक्त प्रत्यक्ष पाहणी करतील. अहवाल मंजूर होताच अधिकृत <strong>VK क्रमांक (उदा. VK-MH-2026-XXXXX)</strong> स्वयंचलित तयार होऊन अहवाल व स्थिती विभागात उपलब्ध होईल.
                    </p>
                  </div>
                </div>

                {/* Farmer Declaration Undertaking */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-800 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="declaration-checkbox"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="declaration-checkbox" className="text-[11px] text-slate-700 leading-relaxed cursor-pointer">
                    <strong>शेतकरी स्वयंघोषणा (Undertaking):</strong> मी याद्वारे प्रमाणित करतो/करते की वर दिलेली पीक नुकसानीची, शेतजमिनीची व आधारसंलग्न माहिती पूर्णपणे खरी आहे. अपलोड केलेले फोटो माझ्या प्रत्यक्ष नुकसानीच्या शेतातील आहेत.
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Stepper Navigation Actions matching Image 3 */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              {/* Previous Step Button */}
              {currentStep > 1 ? (
                <button
                  type="button"
                  id="form-prev-step-btn"
                  onClick={onPrevStep}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{currentLang === "mr" ? "मागील (Previous)" : "Previous"}</span>
                </button>
              ) : (
                <div />
              )}

              {/* Next Step Button / Submit Button */}
              {currentStep < 6 ? (
                <button
                  type="button"
                  id="form-next-step-btn"
                  onClick={onNextStep}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-101 active:scale-99"
                >
                  <span>{currentLang === "mr" ? "पुढील पायरी (Next)" : "Next Step"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  id="submit-calamity-claim-btn"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-101 active:scale-99"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>
                    {currentLang === "mr"
                      ? "ई-पंचनामा सादर करा (Submit e-Panchnama)"
                      : "Submit e-Panchnama Online"}
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
