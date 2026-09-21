import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  AlertTriangle,
  Sprout,
  User,
  ShoppingBag,
  MapPin,
  FileText,
  ShieldCheck,
  Truck,
  Plus,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  RegisteredAccount,
  Language,
  CattleRecord,
} from "../types";
import { locationHierarchy } from "../data/locationHierarchy";

interface RegistrationStepwiseModalProps {
  currentLang: Language;
  initialRole?: "farmer" | "buyer";
  registeredAccounts: RegisteredAccount[];
  persistAccounts: (accounts: RegisteredAccount[]) => void;
  onCancel: () => void;
  onSuccessLogin: (role: "farmer" | "buyer", account: RegisteredAccount) => void;
  onSwitchToLoginWithExisting: (account: RegisteredAccount) => void;
}

export const RegistrationStepwiseModal: React.FC<RegistrationStepwiseModalProps> = ({
  currentLang,
  initialRole = "farmer",
  registeredAccounts,
  persistAccounts,
  onCancel,
  onSuccessLogin,
  onSwitchToLoginWithExisting,
}) => {
  const [signupRole, setSignupRole] = useState<"farmer" | "buyer">(initialRole);

  // Sync role when initialRole changes
  useEffect(() => {
    if (initialRole) {
      setSignupRole(initialRole);
    }
  }, [initialRole]);

  // Wizard Step state (1, 2, 3, 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [stepCompleted, setStepCompleted] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [stepNotification, setStepNotification] = useState<string | null>(null);

  // Scroll container ref for Back to Top
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScrollToTop = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleModalScroll = () => {
    if (modalBodyRef.current) {
      setShowBackToTop(modalBodyRef.current.scrollTop > 90);
    }
  };

  // STEP 1: Basic Info
  const [regFullName, setRegFullName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAadhaar, setRegAadhaar] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [alreadyRegisteredAccount, setAlreadyRegisteredAccount] = useState<RegisteredAccount | null>(null);

  // STEP 2: Address & Location with Auto-suggestions
  const [regState, setRegState] = useState("Maharashtra");
  const [regDistrict, setRegDistrict] = useState("");
  const [regTaluka, setRegTaluka] = useState("");
  const [regVillage, setRegVillage] = useState("");
  const [regPincode, setRegPincode] = useState("");

  const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
  const [showTalukaSuggestions, setShowTalukaSuggestions] = useState(false);

  const selectedStateData = useMemo(() => {
    return (
      locationHierarchy.find(
        (s) => s.state.toLowerCase() === regState.toLowerCase()
      ) || locationHierarchy[0]
    );
  }, [regState]);

  const matchingDistricts = useMemo(() => {
    if (!selectedStateData) return [];
    const q = (regDistrict || "").trim().toLowerCase();
    if (!q) {
      return selectedStateData.districts.map((d) => d.name);
    }
    return selectedStateData.districts
      .map((d) => d.name)
      .filter((name) => name.toLowerCase().includes(q));
  }, [selectedStateData, regDistrict]);

  const selectedDistrictObj = useMemo(() => {
    if (!selectedStateData || !regDistrict.trim()) return undefined;
    return selectedStateData.districts.find(
      (d) => d.name.toLowerCase() === regDistrict.trim().toLowerCase()
    );
  }, [selectedStateData, regDistrict]);

  const matchingTalukas = useMemo(() => {
    const q = (regTaluka || "").trim().toLowerCase();
    if (selectedDistrictObj) {
      if (!q) return selectedDistrictObj.talukas;
      return selectedDistrictObj.talukas.filter((t) =>
        t.toLowerCase().includes(q)
      );
    }
    if (selectedStateData) {
      const allTalukas = Array.from<string>(
        new Set(selectedStateData.districts.flatMap((d) => d.talukas))
      );
      if (!q) return allTalukas.slice(0, 15);
      return allTalukas.filter((t) => t.toLowerCase().includes(q));
    }
    return [];
  }, [selectedDistrictObj, selectedStateData, regTaluka]);

  // STEP 3: Farmer Profile
  const [farmerScope, setFarmerScope] = useState<"crops_only" | "crops_and_more">("crops_only");
  const [primaryCrops, setPrimaryCrops] = useState("");
  const [landAcres, setLandAcres] = useState<string | number>("");

  // Farmer Transport
  const [hasTransportVehicles, setHasTransportVehicles] = useState(false);
  const [vehicleType, setVehicleType] = useState("Mini Truck (Tata Ace 1T)");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [capacityTonnes, setCapacityTonnes] = useState<string | number>("1.2");
  const [willingToTransport, setWillingToTransport] = useState(true);

  // Farmer Cattle
  const [hasCattles, setHasCattles] = useState(false);
  const [cattleList, setCattleList] = useState<CattleRecord[]>([
    {
      id: "c-init",
      type: "Cow",
      breed: "Gir (गीर गाय)",
      count: 2,
      milkingStatus: "Milking",
      milkYieldLpd: 12,
      ageYears: 4,
      vaccinationStatus: true,
      remarks: "Tag: MH-15-209",
    },
  ]);

  // STEP 3: Buyer Profile
  const [buyerType, setBuyerType] = useState("Wholesale Mandi Trader / Commission Agent");
  const [buyerBusinessName, setBuyerBusinessName] = useState("");
  const [buyerCommodities, setBuyerCommodities] = useState("Tomato, Onion, Soybean, Pomegranate");
  const [monthlyProcurementKg, setMonthlyProcurementKg] = useState<string | number>("2500");
  const [buyerGst, setBuyerGst] = useState("");

  // STEP 4: Password Setup & Verification - Let user decide own password (no default password)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Check duplicate phone against all registered accounts
  const checkPhoneDuplicate = (phone: string): RegisteredAccount | null => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return null;
    return (
      registeredAccounts.find((acc) => {
        const accClean = acc.phone.replace(/\D/g, "");
        return (
          accClean === clean ||
          (accClean.length >= 10 && (accClean.endsWith(clean) || clean.endsWith(accClean)))
        );
      }) || null
    );
  };

  // Real-time phone check on input change
  const handlePhoneChange = (val: string) => {
    setRegPhone(val);
    const clean = val.replace(/\D/g, "");
    if (clean.length >= 10) {
      const existing = checkPhoneDuplicate(clean);
      if (existing) {
        setAlreadyRegisteredAccount(existing);
        setStepNotification(
          currentLang === "mr"
            ? `⚠️ हा मोबाईल नंबर (+91 ${clean}) आधीच ${existing.fullName} (${existing.id}) यांच्या नावे नोंदणीकृत आहे! कृपया दुसरा नंबर वापरा किंवा थेट लॉगिन करा.`
            : currentLang === "hi"
            ? `⚠️ यह मोबाइल नंबर (+91 ${clean}) पहले से ${existing.fullName} (${existing.id}) के नाम पर पंजीकृत है! कृपया दूसरा नंबर दर्ज करें या सीधे लॉगिन करें।`
            : `⚠️ This mobile number (+91 ${clean}) is already registered with ${existing.fullName} (${existing.id})! Please enter another number or login directly.`
        );
      } else {
        setAlreadyRegisteredAccount(null);
        if (
          stepNotification &&
          (stepNotification.includes("मोबाईल नंबर आधीच") ||
            stepNotification.includes("already registered") ||
            stepNotification.includes("पहले से पंजीकृत"))
        ) {
          setStepNotification(null);
        }
      }
    } else {
      setAlreadyRegisteredAccount(null);
    }
  };

  // Fill demo registration data
  const handleFillDemo = () => {
    if (signupRole === "farmer") {
      setRegFullName("Ramesh Tukaram Patil");
      setRegPhone("9822481920");
      setRegEmail("ramesh.patil@krishivistar.in");
      setRegAadhaar("541289012345");
      setRegState("Maharashtra");
      setRegDistrict("Nashik");
      setRegTaluka("Dindori");
      setRegVillage("Dindori Shivar, Gat No. 102");
      setRegPincode("422202");
      setFarmerScope("crops_only");
      setPrimaryCrops("Soybean, Onion, Tomato, Pomegranate");
      setLandAcres("4.5");
      setHasTransportVehicles(true);
      setVehicleType("Mini Truck (Tata Ace 1T)");
      setVehicleNumber("MH-15-EG-8291");
      setCapacityTonnes("1.5");
      setHasCattles(true);
      setNewPassword("Kisan@2026");
      setConfirmPassword("Kisan@2026");
    } else {
      setRegFullName("Anita Sharma");
      setRegPhone("9823098765");
      setRegEmail("anita.sharma@freshagro.com");
      setRegAadhaar("890123456789");
      setRegState("Maharashtra");
      setRegDistrict("Pune");
      setRegTaluka("Haveli");
      setRegVillage("Market Yard, Gultekdi Hub");
      setRegPincode("411037");
      setBuyerType("Wholesale Mandi Trader / Commission Agent");
      setBuyerBusinessName("M/s Sahyadri Agro Fresh Traders");
      setBuyerCommodities("Tomato, Onion, Soybean, Pomegranate, Wheat");
      setMonthlyProcurementKg("3500");
      setBuyerGst("27AABCS1429B1Z8");
      setNewPassword("Buyer@2026");
      setConfirmPassword("Buyer@2026");
    }
    setStepCompleted({ 1: true, 2: true, 3: true, 4: false });
    setStepNotification(
      signupRole === "farmer"
        ? currentLang === "mr"
          ? "✓ शेतकरी डेमो माहिती यशस्वीरित्या भरली गेली!"
          : currentLang === "hi"
          ? "✓ किसान डेमो जानकारी सफलतापूर्वक भरी गई!"
          : "✓ Demo Farmer details filled successfully!"
        : currentLang === "mr"
        ? "✓ खरेदीदार डेमो माहिती यशस्वीरित्या भरली गेली!"
        : currentLang === "hi"
        ? "✓ खरीदार डेमो जानकारी सफलतापूर्वक भरी गई!"
        : "✓ Demo Buyer details filled successfully!"
    );
    setAlreadyRegisteredAccount(null);
  };

  const handleClearForm = () => {
    setRegFullName("");
    setRegPhone("");
    setRegEmail("");
    setRegAadhaar("");
    setRegState("Maharashtra");
    setRegDistrict("");
    setRegTaluka("");
    setRegVillage("");
    setRegPincode("");
    setPrimaryCrops("");
    setLandAcres("");
    setHasTransportVehicles(false);
    setVehicleNumber("");
    setHasCattles(false);
    setBuyerBusinessName("");
    setBuyerCommodities("");
    setMonthlyProcurementKg("");
    setBuyerGst("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentStep(1);
    setStepCompleted({ 1: false, 2: false, 3: false, 4: false });
    setStepNotification(null);
    setAlreadyRegisteredAccount(null);
  };

  // Cattle handlers
  const handleAddCattle = () => {
    const newRecord: CattleRecord = {
      id: "c-" + Date.now(),
      type: "Cow",
      breed: "Khillari (खिल्लारी)",
      count: 1,
      milkingStatus: "Milking",
      milkYieldLpd: 8,
      ageYears: 3,
      vaccinationStatus: true,
      remarks: "Healthy",
    };
    setCattleList([...cattleList, newRecord]);
  };

  const handleRemoveCattle = (id: string) => {
    setCattleList(cattleList.filter((c) => c.id !== id));
  };

  const handleUpdateCattle = (id: string, updates: Partial<CattleRecord>) => {
    setCattleList(cattleList.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  // Step Validation Logic
  const validateStep1 = (showAlert = true): boolean => {
    if (!regFullName.trim()) {
      if (showAlert) {
        setStepNotification(
          currentLang === "mr"
            ? "⚠️ कृपया तुमचे पूर्ण नाव प्रविष्ट करा."
            : currentLang === "hi"
            ? "⚠️ कृपया अपना पूरा नाम दर्ज करें।"
            : "⚠️ Please enter your full name."
        );
      }
      return false;
    }
    const clean = regPhone.replace(/\D/g, "");
    if (clean.length < 10) {
      if (showAlert) {
        setStepNotification(
          currentLang === "mr"
            ? "⚠️ कृपया १० अंकी वैध मोबाईल फोन नंबर प्रविष्ट करा."
            : currentLang === "hi"
            ? "⚠️ कृपया १० अंकों का वैध मोबाइल नंबर दर्ज करें।"
            : "⚠️ Please enter a valid 10-digit mobile number."
        );
      }
      return false;
    }
    const duplicate = checkPhoneDuplicate(clean);
    if (duplicate) {
      setAlreadyRegisteredAccount(duplicate);
      if (showAlert) {
        setStepNotification(
          currentLang === "mr"
            ? `⚠️ हा मोबाईल नंबर (+91 ${clean}) आधीच ${duplicate.fullName} यांच्या नावे नोंदणीकृत आहे! कृपया दुसरा नंबर वापरा किंवा थेट लॉगिन करा.`
            : currentLang === "hi"
            ? `⚠️ यह मोबाइल नंबर पहले से पंजीकृत है! कृपया दूसरा नंबर दर्ज करें या लॉगिन करें।`
            : `⚠️ This mobile number is already registered! Please use another number or log in.`
        );
      }
      return false;
    }
    return true;
  };

  const validateStep2 = (showAlert = true): boolean => {
    if (!regDistrict.trim() || !regTaluka.trim() || !regVillage.trim()) {
      if (showAlert) {
        setStepNotification(
          currentLang === "mr"
            ? "⚠️ कृपया जिल्हा, तालुका आणि गाव/पत्ता हे आवश्यक रकाने पूर्ण भरा."
            : currentLang === "hi"
            ? "⚠️ कृपया जिला, तहसील और गाँव/पता के विवरण भरें।"
            : "⚠️ Please enter District, Taluka and Village/Address."
        );
      }
      return false;
    }
    return true;
  };

  const validateStep3 = (showAlert = true): boolean => {
    if (signupRole === "farmer") {
      if (!primaryCrops.trim()) {
        if (showAlert) {
          setStepNotification(
            currentLang === "mr"
              ? "⚠️ कृपया तुम्ही घेत असलेल्या मुख्य पिकांची नावे प्रविष्ट करा."
              : currentLang === "hi"
              ? "⚠️ कृपया प्रमुख फसलों के नाम दर्ज करें।"
              : "⚠️ Please enter primary crops cultivated."
          );
        }
        return false;
      }
    } else {
      if (!buyerBusinessName.trim() && !buyerCommodities.trim()) {
        if (showAlert) {
          setStepNotification(
            currentLang === "mr"
              ? "⚠️ कृपया खरेदीदार व्यापार नाव किंवा खरेदी करावयाच्या शेतमालाची नावे प्रविष्ट करा."
              : currentLang === "hi"
              ? "⚠️ कृपया व्यापार/फर्म का नाम या आवश्यक कृषि उपज दर्ज करें।"
              : "⚠️ Please enter Trade/Business Name or target farm commodities."
          );
        }
        return false;
      }
    }
    return true;
  };

  // Step header click navigation: checks prerequisites and notifies if skipped
  const handleStepClick = (targetStep: 1 | 2 | 3 | 4) => {
    if (targetStep === currentStep) return;

    // Moving backwards is always allowed
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      setStepNotification(null);
      return;
    }

    // Moving forward requires step-by-step prerequisite validation
    if (targetStep > 1 && !validateStep1(true)) {
      return;
    }
    if (targetStep > 2 && !validateStep2(true)) {
      return;
    }
    if (targetStep > 3 && !validateStep3(true)) {
      return;
    }

    setCurrentStep(targetStep);
    setStepNotification(null);
  };

  // Next Step button
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1(true)) {
        setStepCompleted((prev) => ({ ...prev, 1: true }));
        setStepNotification(null);
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2(true)) {
        setStepCompleted((prev) => ({ ...prev, 2: true }));
        setStepNotification(null);
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (validateStep3(true)) {
        setStepCompleted((prev) => ({ ...prev, 3: true }));
        setStepNotification(null);
        setCurrentStep(4);
      }
    }
  };

  // Previous Step button
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setStepNotification(null);
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  // Final Submit handler: generates account and immediately logs into Portal
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateStep1(true)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2(true)) {
      setCurrentStep(2);
      return;
    }
    if (!validateStep3(true)) {
      setCurrentStep(3);
      return;
    }

    // Validate password
    if (!newPassword || newPassword.length < 6) {
      setPasswordError(
        currentLang === "mr"
          ? "पासवर्ड किमान ६ अक्षरांचा असावा."
          : currentLang === "hi"
          ? "पासवर्ड कम से कम ६ अक्षरों का होना चाहिए।"
          : "Password must be at least 6 characters."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(
        currentLang === "mr"
          ? "पासवर्ड जुळत नाही. कृपया तपासा."
          : currentLang === "hi"
          ? "पासवर्ड मेल नहीं खा रहे हैं।"
          : "Passwords do not match."
      );
      return;
    }

    const cleanPhone = regPhone.replace(/\D/g, "");
    const duplicate = checkPhoneDuplicate(cleanPhone);
    if (duplicate) {
      setAlreadyRegisteredAccount(duplicate);
      setStepNotification(
        currentLang === "mr"
          ? `⚠️ हा मोबाईल नंबर आधीच नोंदणीकृत आहे! कृपया दुसरा नंबर वापरा.`
          : currentLang === "hi"
          ? `⚠️ यह मोबाइल नंबर पहले से पंजीकृत है! कृपया दूसरा नंबर दर्ज करें।`
          : `⚠️ This mobile number is already registered! Please use another number.`
      );
      setCurrentStep(1);
      return;
    }

    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const generatedId =
      signupRole === "farmer" ? `MH-FARM-${randomSeq}` : `MH-BUY-${randomSeq}`;

    const totalCattleCount = hasCattles
      ? cattleList.reduce((acc, c) => acc + (Number(c.count) || 1), 0)
      : 0;

    const newAccount: RegisteredAccount = {
      id: generatedId,
      role: signupRole,
      fullName: regFullName.trim(),
      phone: cleanPhone,
      email: regEmail.trim() || undefined,
      state: regState || "Maharashtra",
      district: regDistrict.trim(),
      taluka: regTaluka.trim(),
      village: regVillage.trim() || `${regTaluka} Shivar`,
      pincode: regPincode.trim() || "422202",
      password: newPassword,
      createdAt: new Date().toISOString().split("T")[0],
      verified: true,
      farmerDetails:
        signupRole === "farmer"
          ? {
              onlyCrops: farmerScope === "crops_only" && !hasTransportVehicles && !hasCattles,
              primaryCrops: primaryCrops
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean),
              landAcres: Number(landAcres) || 3,
              hasTransportVehicles,
              transportDetails: hasTransportVehicles
                ? {
                    vehicleType: vehicleType || "Mini Truck (Tata Ace 1T)",
                    capacityTonnes: Number(capacityTonnes) || 1.2,
                    vehicleNumber: vehicleNumber || "MH-15-EG-8291",
                    willingToTransportForOthers: willingToTransport,
                  }
                : undefined,
              hasCattle: hasCattles,
              cattleTotalCount: totalCattleCount,
              cattleList: hasCattles ? cattleList : [],
            }
          : undefined,
      buyerDetails:
        signupRole === "buyer"
          ? {
              buyerType: buyerType || "Wholesale Mandi Trader / Commission Agent",
              businessName: buyerBusinessName.trim() || "M/s Sahyadri Agro Fresh Traders",
              monthlyProcurementKg: Number(monthlyProcurementKg) || 1500,
              preferredCrops: buyerCommodities
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean),
            }
          : undefined,
    };

    setStepCompleted({ 1: true, 2: true, 3: true, 4: true });

    const updatedAccounts = [newAccount, ...registeredAccounts];
    persistAccounts(updatedAccounts);

    // Complete login and direct to the respective portal
    onSuccessLogin(newAccount.role, newAccount);
  };

  const stepLabels: { [key: number]: { mr: string; hi: string; en: string } } = {
    1: { mr: "१. मूलभूत माहिती", hi: "१. बुनियादी विवरण", en: "1. Basic Info" },
    2: { mr: "२. पत्ता व स्थान", hi: "२. पता विवरण", en: "2. Address" },
    3: {
      mr: signupRole === "farmer" ? "३. शेती प्रोफाइल" : "३. खरेदीदार व्यापार",
      hi: signupRole === "farmer" ? "३. कृषि प्रोफाइल" : "३. व्यापार विवरण",
      en: signupRole === "farmer" ? "3. Farm Profile" : "3. Buyer Trade",
    },
    4: { mr: "४. तपशील पडताळणी", hi: "४. विवरण सत्यापन", en: "4. Review & Verify" },
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in"
      onClick={onCancel}
    >
      <div 
        className="w-full max-w-4xl h-[92vh] max-h-[94vh] bg-[#eff6ed] border-2 border-emerald-300 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800 relative select-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header: ONLY "Create New Account", Demo, Role Toggle, and Working Cancel Cross */}
        <div className="sticky top-0 z-30 bg-[#eff6ed] border-b border-emerald-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-xs shrink-0">
          {/* Left: Working Back/Cancel Arrow + Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onCancel}
              id="registration-back-btn"
              className="h-8.5 w-8.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300 transition-colors shadow-2xs cursor-pointer inline-flex items-center justify-center shrink-0"
              title={currentLang === "mr" ? "रद्द करा व परत जा" : "Cancel and go back"}
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
            <h2 className="text-base sm:text-xl font-black text-emerald-950 tracking-tight truncate">
              {currentLang === "mr"
                ? "नवीन खाते नोंदणी"
                : currentLang === "hi"
                ? "नया खाता पंजीकरण"
                : "Create New Account"}
            </h2>
          </div>

          {/* Right: Demo Button + Role Toggle + Working Cancel/Cross Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleFillDemo}
              id="registration-demo-btn"
              className="h-8.5 px-3 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs border border-emerald-800 active:scale-95"
              title="Fill realistic sample demo data"
            >
              <span>⚡ Demo</span>
            </button>

            {/* Role Toggle: Farmer or Buyer */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-emerald-200 shadow-2xs">
              <button
                type="button"
                id="select-farmer-role-btn"
                onClick={() => {
                  setSignupRole("farmer");
                  setPasswordError("");
                }}
                className={`h-7 px-2.5 sm:px-3 text-xs font-bold rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  signupRole === "farmer"
                    ? "bg-emerald-700 text-white shadow-2xs font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold"
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>{currentLang === "mr" ? "शेतकरी" : currentLang === "hi" ? "किसान" : "Farmer"}</span>
              </button>
              <button
                type="button"
                id="select-buyer-role-btn"
                onClick={() => {
                  setSignupRole("buyer");
                  setPasswordError("");
                }}
                className={`h-7 px-2.5 sm:px-3 text-xs font-bold rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  signupRole === "buyer"
                    ? "bg-blue-700 text-white shadow-2xs font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{currentLang === "mr" ? "खरेदीदार" : currentLang === "hi" ? "खरीदार" : "Buyer"}</span>
              </button>
            </div>

            {/* Working Cancel / Cross (X) Button */}
            <button
              type="button"
              onClick={onCancel}
              id="registration-cross-cancel-btn"
              className="h-8.5 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-slate-300 hover:border-rose-300 transition-colors shadow-2xs cursor-pointer inline-flex items-center justify-center gap-1.5"
              title={currentLang === "mr" ? "रद्द करा" : "Cancel"}
            >
              <X className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">
                {currentLang === "mr" ? "रद्द करा" : currentLang === "hi" ? "रद्द करें" : "Cancel"}
              </span>
            </button>
          </div>
        </div>

        {/* Stepwise Progress Indicator Bar: Numbered Circles */}
        {/* Completed turn GREEN, Remaining in background color itself */}
        <div className="bg-[#e4efe0] border-b border-emerald-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto shrink-0 select-none">
          <div className="flex items-center gap-2 sm:gap-3 w-full justify-between max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((stepNum, idx) => {
              const isCompleted = stepCompleted[stepNum] || currentStep > stepNum;
              const isActive = currentStep === stepNum;

              return (
                <React.Fragment key={stepNum}>
                  <button
                    type="button"
                    id={`step-indicator-btn-${stepNum}`}
                    onClick={() => handleStepClick(stepNum as 1 | 2 | 3 | 4)}
                    className="flex items-center gap-2 group cursor-pointer focus:outline-hidden"
                    title={`Step ${stepNum}: ${stepLabels[stepNum][currentLang]}`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all shrink-0 ${
                        isCompleted
                          ? "bg-emerald-600 text-white font-bold border-2 border-emerald-600 shadow-xs"
                          : isActive
                          ? "bg-white text-emerald-950 font-black border-2 border-emerald-600 ring-4 ring-emerald-300/60 shadow-md"
                          : "bg-[#eff6ed] text-emerald-900/60 font-bold border-2 border-emerald-300/80"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                    </div>
                    <span
                      className={`text-xs whitespace-nowrap hidden sm:inline font-semibold ${
                        isActive
                          ? "text-emerald-950 font-black"
                          : isCompleted
                          ? "text-emerald-800 font-bold"
                          : "text-slate-600"
                      }`}
                    >
                      {stepLabels[stepNum][currentLang]}
                    </span>
                  </button>
                  {idx < 3 && (
                    <div
                      className={`flex-1 h-1 rounded-full mx-1 sm:mx-2 min-w-[14px] sm:min-w-[28px] transition-colors ${
                        currentStep > stepNum ? "bg-emerald-600" : "bg-emerald-200/80"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* User Notification / Validation Alert Banner */}
        {stepNotification && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 font-semibold animate-in fade-in shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">{stepNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setStepNotification(null)}
              className="p-1 hover:bg-amber-100 rounded text-amber-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Existing Registered Account Notification Banner */}
        {alreadyRegisteredAccount && (
          <div className="bg-amber-100/90 border-b border-amber-300 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-amber-950 font-semibold animate-in fade-in shrink-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {currentLang === "mr"
                  ? `हा मोबाईल नंबर (+91 ${alreadyRegisteredAccount.phone}) आधीच ${alreadyRegisteredAccount.fullName} (${alreadyRegisteredAccount.id}) यांच्या नावे नोंदणीकृत आहे.`
                  : currentLang === "hi"
                  ? `यह मोबाइल नंबर (+91 ${alreadyRegisteredAccount.phone}) पहले से ${alreadyRegisteredAccount.fullName} (${alreadyRegisteredAccount.id}) के नाम पर पंजीकृत है।`
                  : `Mobile (+91 ${alreadyRegisteredAccount.phone}) is already registered with ${alreadyRegisteredAccount.fullName} (${alreadyRegisteredAccount.id}).`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSwitchToLoginWithExisting(alreadyRegisteredAccount)}
              id="switch-to-existing-login-btn"
              className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <span>{currentLang === "mr" ? "या खात्याने लॉगिन करा" : currentLang === "hi" ? "लॉगिन करें" : "Login with this"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Stepwise Content Body Container (One step rendered at a time) */}
        <div 
          ref={modalBodyRef}
          onScroll={handleModalScroll}
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#eff6ed] relative"
        >
          {/* Floating Back to Top button when scrolled down */}
          {showBackToTop && (
            <button
              type="button"
              id="modal-floating-back-to-top-btn"
              onClick={handleScrollToTop}
              className="fixed sm:absolute bottom-20 right-6 z-40 px-3 py-2 rounded-full sm:rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 border border-emerald-700"
              title={currentLang === "mr" ? "वर स्क्रोल करा" : currentLang === "hi" ? "ऊपर जाएं" : "Back to top"}
            >
              <ArrowUp className="w-4 h-4" />
              <span>{currentLang === "mr" ? "वर जा ↑" : currentLang === "hi" ? "ऊपर ↑" : "Back to Top ↑"}</span>
            </button>
          )}

          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                      १
                    </span>
                    <span>
                      {currentLang === "mr"
                        ? "मूलभूत माहिती व संपर्क तपशील"
                        : currentLang === "hi"
                        ? "बुनियादी जानकारी एवं संपर्क विवरण"
                        : "Basic Information & Contact Details"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "कृपया तुमचे अचूक नाव आणि फोन नंबर प्रविष्ट करा."
                      : currentLang === "hi"
                      ? "कृपया अपना नाम और मोबाइल नंबर दर्ज करें।"
                      : "Please enter your legal name and contact mobile number."}
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {signupRole === "farmer"
                    ? currentLang === "mr" ? "शेतकरी नोंदणी" : currentLang === "hi" ? "किसान पंजीकरण" : "Farmer Profile"
                    : currentLang === "mr" ? "खरेदीदार नोंदणी" : currentLang === "hi" ? "खरीदार पंजीकरण" : "Buyer Profile"}
                </span>
              </div>

              {/* Direct Role Switcher in Step 1 */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {currentLang === "mr" ? "मी नोंदणी करत आहे:" : currentLang === "hi" ? "मैं पंजीकरण कर रहा हूँ:" : "I am registering as:"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSignupRole("farmer");
                      setPasswordError("");
                    }}
                    className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      signupRole === "farmer"
                        ? "bg-emerald-700 text-white border-emerald-800 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Sprout className="w-4 h-4" />
                    <span>{currentLang === "mr" ? "शेतकरी (Farmer)" : currentLang === "hi" ? "किसान (Farmer)" : "Farmer / Producer"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSignupRole("buyer");
                      setPasswordError("");
                    }}
                    className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      signupRole === "buyer"
                        ? "bg-blue-700 text-white border-blue-800 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{currentLang === "mr" ? "खरेदीदार (Buyer)" : currentLang === "hi" ? "व्यापारी (Buyer)" : "Buyer / Trader"}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-1">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "पूर्ण नाव *" : currentLang === "hi" ? "पूरा नाम *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    id="reg-full-name-input"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder={
                      signupRole === "farmer"
                        ? currentLang === "mr" ? "उदा. बाळासाहेब तुकाराम शिंदे" : "e.g. Ramesh Tukaram Patil"
                        : "e.g. Anita Sharma"
                    }
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                  />
                </div>

                {/* Mobile Phone Number */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "मोबाईल फोन नंबर *" : currentLang === "hi" ? "मोबाइल फोन नंबर *" : "Mobile Phone Number *"}
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      id="reg-phone-input"
                      value={regPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="98224 81920"
                      className="flex-1 bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono shadow-2xs font-bold"
                    />
                  </div>
                </div>

                {/* Aadhaar Number (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr"
                      ? "आधार क्रमांक (ऐच्छिक)"
                      : currentLang === "hi"
                      ? "आधार कार्ड नंबर (वैकल्पिक)"
                      : "Aadhaar Card No. (Optional)"}
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    id="reg-aadhaar-input"
                    value={regAadhaar}
                    onChange={(e) => setRegAadhaar(e.target.value.replace(/\D/g, ""))}
                    placeholder="XXXX XXXX 8912"
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono shadow-2xs"
                  />
                </div>

                {/* Email Address (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr"
                      ? "ईमेल पत्ता (ऐच्छिक)"
                      : currentLang === "hi"
                      ? "ईमेल आईडी (वैकल्पिक)"
                      : "Email Address (Optional)"}
                  </label>
                  <input
                    type="email"
                    id="reg-email-input"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="kisan@example.com"
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Address & Location */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                      २
                    </span>
                    <span>
                      {currentLang === "mr"
                        ? "पत्ता व भौगोलिक स्थान"
                        : currentLang === "hi"
                        ? "स्थान एवं पता विवरण"
                        : "Location & Address Details"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "mr"
                      ? "स्थानिक बाजारपेठ (मंडी) व शेतमाल दरांसाठी अचूक पत्ता आवश्यक आहे."
                      : currentLang === "hi"
                      ? "सटीक मंडी भाव एवं स्थानीय व्यापार के लिए पता विवरण आवश्यक है।"
                      : "Accurate location ensures correct mandi benchmark and trade connectivity."}
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "राज्य *" : currentLang === "hi" ? "राज्य *" : "State *"}
                  </label>
                  <select
                    value={regState}
                    onChange={(e) => {
                      setRegState(e.target.value);
                      setRegDistrict("");
                      setRegTaluka("");
                    }}
                    id="reg-state-select"
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                  >
                    <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                    <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                    <option value="Gujarat">Gujarat (गुजरात)</option>
                    <option value="Karnataka">Karnataka (कर्नाटक)</option>
                    <option value="Punjab">Punjab (पंजाब)</option>
                  </select>
                </div>

                {/* District with Interactive Auto-suggestion */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "जिल्हा *" : currentLang === "hi" ? "जिला *" : "District *"}
                  </label>
                  <input
                    type="text"
                    required
                    id="reg-district-input"
                    value={regDistrict}
                    onChange={(e) => {
                      setRegDistrict(e.target.value);
                      setShowDistrictSuggestions(true);
                    }}
                    onFocus={() => setShowDistrictSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDistrictSuggestions(false), 250);
                    }}
                    placeholder="e.g. Nashik / Pune"
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                  />
                  {showDistrictSuggestions && matchingDistricts.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-emerald-300 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto divide-y divide-slate-100">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">
                        {currentLang === "mr" ? "जिल्हा निवडा" : currentLang === "hi" ? "जिला चुनें" : "Select District"}
                      </div>
                      {matchingDistricts.map((dName) => (
                        <button
                          key={dName}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setRegDistrict(dName);
                            setShowDistrictSuggestions(false);
                            setShowTalukaSuggestions(true);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer ${
                            regDistrict.toLowerCase() === dName.toLowerCase() ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700"
                          }`}
                        >
                          <span>{dName}</span>
                          <span className="text-[10px] text-slate-400">{regState}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Taluka / Tehsil with Interactive Auto-suggestion */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "तालुका / तहसील *" : currentLang === "hi" ? "तहसील / ब्लॉक *" : "Taluka / Tehsil *"}
                  </label>
                  <input
                    type="text"
                    required
                    id="reg-taluka-input"
                    value={regTaluka}
                    onChange={(e) => {
                      setRegTaluka(e.target.value);
                      setShowTalukaSuggestions(true);
                    }}
                    onFocus={() => setShowTalukaSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowTalukaSuggestions(false), 250);
                    }}
                    placeholder={regDistrict ? `e.g. Taluka in ${regDistrict}` : "e.g. Dindori / Haveli"}
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                  />
                  {showTalukaSuggestions && matchingTalukas.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-emerald-300 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto divide-y divide-slate-100">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">
                        {regDistrict
                          ? (currentLang === "mr" ? `${regDistrict} मधील तालुके` : currentLang === "hi" ? `${regDistrict} के तहसील` : `Talukas in ${regDistrict}`)
                          : (currentLang === "mr" ? "तालुका निवडा" : "Select Taluka")}
                      </div>
                      {matchingTalukas.map((tName) => (
                        <button
                          key={tName}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setRegTaluka(tName);
                            setShowTalukaSuggestions(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer ${
                            regTaluka.toLowerCase() === tName.toLowerCase() ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700"
                          }`}
                        >
                          <span>{tName}</span>
                          {regDistrict && <span className="text-[10px] text-emerald-600">{regDistrict}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Village / Town / Street */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "गाव / वस्ती / रस्ता *" : currentLang === "hi" ? "गाँव / शहर / सड़क *" : "Village / Town / Street *"}
                  </label>
                  <input
                    type="text"
                    required
                    id="reg-village-input"
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    placeholder={
                      currentLang === "mr"
                        ? "उदा. दिंडोरी शिवार, गट क्र. १०२"
                        : "e.g. Dindori Shivar, Gat No. 102"
                    }
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === "mr" ? "पिनकोड" : currentLang === "hi" ? "पिन कोड" : "Pincode"}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    id="reg-pincode-input"
                    value={regPincode}
                    onChange={(e) => setRegPincode(e.target.value)}
                    placeholder="422202"
                    className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 font-mono shadow-2xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Profile (Farmer vs Buyer) */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in">
              {signupRole === "farmer" ? (
                /* FARMER PROFILE */
                <div className="bg-white border border-emerald-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                          ३
                        </span>
                        <span>
                          {currentLang === "mr"
                            ? "कृषी कार्य स्वरूप (पिके, वाहतूक व पशुधन)"
                            : currentLang === "hi"
                            ? "कृषि कार्य स्वरूप (फसलें, वाहन एवं मवेशी)"
                            : "Farm Profile (Crops, Transport & Cattles)"}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentLang === "mr"
                          ? "तुम्ही केवळ शेती करता की सोबत वाहतूक आणि जनावरे सुद्धा आहेत?"
                          : currentLang === "hi"
                          ? "क्या आप केवल फसल उगाते हैं या परिवहन एवं पशुधन भी है?"
                          : "Configure your crops, farm transport vehicles, and cattle inventory."}
                      </p>
                    </div>
                    <Sprout className="w-5 h-5 text-emerald-600" />
                  </div>

                  {/* Primary Scope Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => {
                        setFarmerScope("crops_only");
                        setHasTransportVehicles(false);
                        setHasCattles(false);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        farmerScope === "crops_only" && !hasTransportVehicles && !hasCattles
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="farmerScope"
                        checked={farmerScope === "crops_only" && !hasTransportVehicles && !hasCattles}
                        onChange={() => {}}
                        className="mt-0.5 text-emerald-600"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold">
                          {currentLang === "mr" ? "१. केवळ शेती व पिके" : currentLang === "hi" ? "१. केवल फसल की खेती" : "1. Crops Only"}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {currentLang === "mr" ? "केवळ अन्नधान्य, भाजीपाला किंवा फळबाग लागवड" : "Cultivating farm crops, fruits and vegetables"}
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setFarmerScope("crops_and_more")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        farmerScope === "crops_and_more" || hasTransportVehicles || hasCattles
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="farmerScope"
                        checked={farmerScope === "crops_and_more" || hasTransportVehicles || hasCattles}
                        onChange={() => {}}
                        className="mt-0.5 text-emerald-600"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold">
                          {currentLang === "mr" ? "२. पिके + वाहतूक वाहने / जनावरे" : currentLang === "hi" ? "२. फसल + वाहन / पशुधन" : "2. Crops + Transport / Livestock"}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {currentLang === "mr" ? "शेतीसोबत कृषी वाहतूक किंवा दुग्धव्यवसाय / पशुधन" : "Farm crops plus commercial transport or dairy livestock"}
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Crops & Land Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "मुख्य पिके (स्वल्पविरामाने वेगळे करा) *" : currentLang === "hi" ? "प्रमुख फसलें (कॉमा से अलग करें) *" : "Primary Crops Cultivated *"}
                      </label>
                      <input
                        type="text"
                        required
                        id="farmer-primary-crops-input"
                        value={primaryCrops}
                        onChange={(e) => setPrimaryCrops(e.target.value)}
                        placeholder="Soybean, Onion, Tomato, Pomegranate"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "शेतीचे क्षेत्र (एकर)" : currentLang === "hi" ? "कुल भूमि (एकड़)" : "Land Holding (Acres)"}
                      </label>
                      <input
                        type="number"
                        min={0.1}
                        step={0.5}
                        id="farmer-land-acres-input"
                        value={landAcres}
                        onChange={(e) => setLandAcres(e.target.value)}
                        placeholder="e.g. 4.5"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 font-mono shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Transport Vehicles Module */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={hasTransportVehicles}
                        onChange={(e) => setHasTransportVehicles(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>
                          {currentLang === "mr"
                            ? "माझ्याकडे स्वतःचे वाहतूक वाहन आहे (कृषी माल वाहतुकीसाठी)"
                            : currentLang === "hi"
                            ? "मेरे पास कृषि माल परिवहन हेतु वाहन उपलब्ध है"
                            : "I own transport vehicle(s) for farm produce conveyance"}
                        </span>
                      </span>
                    </label>

                    {hasTransportVehicles && (
                      <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in text-xs">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            {currentLang === "mr" ? "वाहनाचा प्रकार" : "Vehicle Type"}
                          </label>
                          <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:border-emerald-600 shadow-2xs"
                          >
                            <option value="Mini Truck (Tata Ace 1T)">Mini Truck (Tata Ace 1T)</option>
                            <option value="Pickup Truck (Bolero 1.7T)">Pickup (Bolero Maxi 1.7T)</option>
                            <option value="Tractor Trolley (4-6T)">Tractor Trolley (4-6 Tonnes)</option>
                            <option value="Heavy Lorry Truck (10T+)">Heavy Truck (10 Tonnes+)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            {currentLang === "mr" ? "वाहन क्रमांक" : "Vehicle Registration No."}
                          </label>
                          <input
                            type="text"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            placeholder="MH-15-EG-8291"
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            {currentLang === "mr" ? "क्षमता (टन)" : "Capacity (Tonnes)"}
                          </label>
                          <input
                            type="number"
                            step={0.1}
                            value={capacityTonnes}
                            onChange={(e) => setCapacityTonnes(e.target.value)}
                            placeholder="1.2"
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono shadow-2xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cattle / Livestock Module */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={hasCattles}
                        onChange={(e) => setHasCattles(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {currentLang === "mr"
                          ? "माझ्याकडे गायी, म्हशी, बैल किंवा इतर जनावरे आहेत (पशुधन)"
                          : currentLang === "hi"
                          ? "मेरे पास गाय, भैंस अथवा अन्य मवेशी (पशुधन) उपलब्ध हैं"
                          : "I own cattle, dairy cows, buffaloes, or farm livestock"}
                      </span>
                    </label>

                    {hasCattles && (
                      <div className="mt-3 space-y-2.5 animate-in fade-in">
                        {cattleList.map((item, idx) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <input
                                type="text"
                                value={item.breed}
                                onChange={(e) => handleUpdateCattle(item.id, { breed: e.target.value })}
                                placeholder="Gir / Khillari / Murrah"
                                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 w-36 sm:w-44"
                              />
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                              <div className="flex items-center gap-1">
                                <span className="text-slate-500 font-medium">{currentLang === "mr" ? "संख्या:" : "Qty:"}</span>
                                <input
                                  type="number"
                                  min={1}
                                  value={item.count}
                                  onChange={(e) =>
                                    handleUpdateCattle(item.id, { count: Math.max(1, Number(e.target.value)) })
                                  }
                                  className="w-14 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-mono font-bold text-slate-800 text-center"
                                />
                              </div>

                              <select
                                value={item.milkingStatus}
                                onChange={(e) =>
                                  handleUpdateCattle(item.id, { milkingStatus: e.target.value as any })
                                }
                                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800"
                              >
                                <option value="Milking">🥛 Milking (दुभती)</option>
                                <option value="Dry">🌾 Dry (गाभण)</option>
                                <option value="Working">🚜 Working (शेती)</option>
                                <option value="Calf">🌱 Calf (पैदास)</option>
                              </select>

                              {cattleList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCattle(item.id)}
                                  className="p-1 rounded text-rose-600 hover:bg-rose-50 cursor-pointer"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handleAddCattle}
                          className="py-1.5 px-3 rounded-lg border border-dashed border-emerald-400 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{currentLang === "mr" ? "+ आणखी जनावरे जोडा" : currentLang === "hi" ? "+ अन्य मवेशी जोड़ें" : "+ Add Another Cattle"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* BUYER PROFILE */
                <div className="bg-white border border-blue-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-blue-950 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">
                          ३
                        </span>
                        <span>
                          {currentLang === "mr"
                            ? "खरेदीदार व्यापार व खरेदी तपशील"
                            : currentLang === "hi"
                            ? "खरीदार व्यापार एवं खरीद आवश्यकताएं"
                            : "Buyer Procurement & Trade Profile"}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentLang === "mr"
                          ? "शेतकऱ्यांशी थेट व्यवहार करण्यासाठी तुमच्या खरेदीचे स्वरूप निश्चित करा."
                          : currentLang === "hi"
                          ? "किसानों से सीधे जुड़ने हेतु अपनी व्यापारिक आवश्यकताएं दर्ज करें।"
                          : "Specify your trading requirements for direct farmer procurement."}
                      </p>
                    </div>
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-1">
                    {/* Buyer Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "खरेदीदार प्रकार" : currentLang === "hi" ? "खरीदार प्रकार" : "Procurement Category"}
                      </label>
                      <select
                        value={buyerType}
                        onChange={(e) => setBuyerType(e.target.value)}
                        id="buyer-type-select"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                      >
                        <option value="Wholesale Mandi Trader / Commission Agent">
                          Wholesale Mandi Trader (घाऊक अडत व्यापारी)
                        </option>
                        <option value="Retail Supermarket / Grocery Chain">
                          Retail Supermarket / Grocery Chain (सुपरमार्केट)
                        </option>
                        <option value="Food Processing / Agro Exporter">
                          Food Processing / Exporter (अन्न प्रक्रिया / निर्यात)
                        </option>
                        <option value="Restaurant / Hotel Syndicate">
                          Restaurant / Catering Unit (हॉटेल / केटरिंग)
                        </option>
                        <option value="Direct Household Consumer">
                          Direct Household Consumer (घरगुती थेट ग्राहक)
                        </option>
                      </select>
                    </div>

                    {/* Enterprise / Business Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "दुकान / कंपनी / फर्मचे नाव *" : currentLang === "hi" ? "फर्म / दुकान का नाम *" : "Business / Enterprise / Shop Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        id="buyer-business-name-input"
                        value={buyerBusinessName}
                        onChange={(e) => setBuyerBusinessName(e.target.value)}
                        placeholder="e.g. M/s Sahyadri Agro Fresh Traders"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                      />
                    </div>

                    {/* Preferred Crops / Commodities */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "खरेदी करावयाचा शेतमाल (स्वल्पविरामाने वेगळे करा) *" : currentLang === "hi" ? "आवश्यक कृषि उपज (कॉमा से अलग करें) *" : "Target Commodities / Required Farm Produce *"}
                      </label>
                      <input
                        type="text"
                        required
                        id="buyer-commodities-input"
                        value={buyerCommodities}
                        onChange={(e) => setBuyerCommodities(e.target.value)}
                        placeholder="Tomato, Onion, Soybean, Pomegranate, Wheat"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                      />
                    </div>

                    {/* Monthly Volume */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "अंदाजे मासिक खरेदी (किलो)" : currentLang === "hi" ? "अनुमानित मासिक खरीद (किग्रा)" : "Estimated Monthly Volume (Kg)"}
                      </label>
                      <input
                        type="number"
                        id="buyer-monthly-volume-input"
                        value={monthlyProcurementKg}
                        onChange={(e) => setMonthlyProcurementKg(e.target.value)}
                        placeholder="2500"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 font-mono shadow-2xs"
                      />
                    </div>

                    {/* GST / Trade License Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {currentLang === "mr" ? "जीएसटी किंवा मंडी लायसन्स (ऐच्छिक)" : currentLang === "hi" ? "जीएसटी अथवा व्यापार लाइसेंस (वैकल्पिक)" : "GST / Trade License No. (Optional)"}
                      </label>
                      <input
                        type="text"
                        id="buyer-gst-input"
                        value={buyerGst}
                        onChange={(e) => setBuyerGst(e.target.value)}
                        placeholder="27AABCS1429B1Z8"
                        className="w-full bg-slate-50/60 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 font-mono shadow-2xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PRE-FINAL STAGE - VERIFY ALL THE FILLED DETAILS + SUBMIT */}
          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in">
              <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center text-emerald-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black tracking-tight">
                      {currentLang === "mr"
                        ? "४. भरलेल्या माहितीची अंतिम पडताळणी (Review Details)"
                        : currentLang === "hi"
                        ? "४. भरे गए संपूर्ण विवरण का सत्यापन"
                        : "4. Pre-Final Verification of All Details"}
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      {currentLang === "mr"
                        ? "नोंदणी पूर्ण करण्यासाठी खालील माहिती तपासा आणि पासवर्ड निश्चित करा."
                        : currentLang === "hi"
                        ? "पंजीकरण सबमिट करने हेतु विवरण की पुष्टि करें एवं पासवर्ड सेट करें।"
                        : "Verify your entered data below and confirm your security password."}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-700/60">
                  {signupRole === "farmer" ? "Farmer / शेतकरी" : "Buyer / खरेदीदार"}
                </span>
              </div>

              {/* Review Card 1: Basic Information */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {currentLang === "mr" ? "मूलभूत माहिती" : currentLang === "hi" ? "बुनियादी विवरण" : "Basic Information"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    {currentLang === "mr" ? "बदला ✎" : currentLang === "hi" ? "संशोधित करें ✎" : "Edit ✎"}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "नाव:" : "Name:"}</span>
                    <span className="font-bold text-slate-900">{regFullName || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "मोबाईल:" : "Mobile:"}</span>
                    <span className="font-bold text-slate-900 font-mono">+91 {regPhone || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "आधार:" : "Aadhaar:"}</span>
                    <span className="font-bold text-slate-900 font-mono">{regAadhaar ? `XXXX-XXXX-${regAadhaar.slice(-4)}` : "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "ईमेल:" : "Email:"}</span>
                    <span className="font-bold text-slate-900 truncate block">{regEmail || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Review Card 2: Address & Location */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {currentLang === "mr" ? "पत्ता व स्थान" : currentLang === "hi" ? "स्थान विवरण" : "Location & Address"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    {currentLang === "mr" ? "बदला ✎" : currentLang === "hi" ? "संशोधित करें ✎" : "Edit ✎"}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "राज्य:" : "State:"}</span>
                    <span className="font-bold text-slate-900">{regState}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "जिल्हा:" : "District:"}</span>
                    <span className="font-bold text-slate-900">{regDistrict || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "तालुका:" : "Taluka:"}</span>
                    <span className="font-bold text-slate-900">{regTaluka || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "पिनकोड:" : "Pincode:"}</span>
                    <span className="font-bold text-slate-900 font-mono">{regPincode || "—"}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-4">
                    <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "गाव / वस्ती / पत्ता:" : "Village / Full Address:"}</span>
                    <span className="font-bold text-slate-900">{regVillage || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Review Card 3: Profile Details */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    {signupRole === "farmer" ? (
                      <Sprout className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-blue-700" />
                    )}
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {signupRole === "farmer"
                        ? currentLang === "mr" ? "शेती व कृषी कार्य तपशील" : "Farm Profile Details"
                        : currentLang === "mr" ? "खरेदीदार व्यापार तपशील" : "Buyer Procurement Profile"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    {currentLang === "mr" ? "बदला ✎" : currentLang === "hi" ? "संशोधित करें ✎" : "Edit ✎"}
                  </button>
                </div>

                {signupRole === "farmer" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "शेती क्षेत्र:" : "Land Acres:"}</span>
                      <span className="font-bold text-slate-900">{landAcres ? `${landAcres} Acres` : "3.0 Acres"}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "मुख्य पिके:" : "Primary Crops:"}</span>
                      <span className="font-bold text-slate-900">{primaryCrops || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "वाहतूक वाहन:" : "Transport:"}</span>
                      <span className="font-bold text-slate-900">
                        {hasTransportVehicles ? `${vehicleType} (${vehicleNumber || "Available"})` : "No vehicles"}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "पशुधन (जनावरे):" : "Livestock:"}</span>
                      <span className="font-bold text-slate-900">
                        {hasCattles
                          ? cattleList.map((c) => `${c.count} ${c.breed} (${c.milkingStatus})`).join(", ")
                          : "None"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "व्यापार प्रकार:" : "Category:"}</span>
                      <span className="font-bold text-slate-900">{buyerType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "फर्म / दुकान नाव:" : "Business Name:"}</span>
                      <span className="font-bold text-slate-900">{buyerBusinessName || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "मासिक प्रमाण:" : "Monthly Volume:"}</span>
                      <span className="font-bold text-slate-900">{monthlyProcurementKg ? `${monthlyProcurementKg} Kg` : "1500 Kg"}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "आवश्यक शेतमाल:" : "Target Commodities:"}</span>
                      <span className="font-bold text-slate-900">{buyerCommodities || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">{currentLang === "mr" ? "जीएसटी क्रमांक:" : "GST Number:"}</span>
                      <span className="font-bold text-slate-900 font-mono">{buyerGst || "Not provided"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Password & Security Card */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {currentLang === "mr" ? "खाते पासवर्ड व सुरक्षा" : currentLang === "hi" ? "पासवर्ड एवं सुरक्षा" : "Account Password & Security"}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {currentLang === "mr" ? "किमान ६ अक्षरे" : "Min 6 characters"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {currentLang === "mr" ? "तुमचा पासवर्ड निश्चित करा *" : currentLang === "hi" ? "अपना पासवर्ड सेट करें *" : "Set Your Password *"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        id="reg-password-input"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError("");
                        }}
                        placeholder={
                          currentLang === "mr"
                            ? "किमान ६ अक्षरांचा स्वतःचा पासवर्ड टाका"
                            : currentLang === "hi"
                            ? "कम से कम ६ अक्षरों का पासवर्ड दर्ज करें"
                            : "Create your own password (min 6 chars)"
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-3 pr-9 py-2 text-xs font-mono text-slate-900 focus:border-emerald-600 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {currentLang === "mr" ? "पासवर्ड पुन्हा प्रविष्ट करा *" : currentLang === "hi" ? "पासवर्ड की पुष्टि करें *" : "Confirm Password *"}
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      id="reg-confirm-password-input"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError("");
                      }}
                      placeholder={
                        currentLang === "mr"
                          ? "तोच पासवर्ड पुन्हा टाका"
                          : currentLang === "hi"
                          ? "वही पासवर्ड दोबारा दर्ज करें"
                          : "Re-type your password to confirm"
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:border-emerald-600 shadow-2xs"
                    />
                  </div>
                </div>

                {passwordError && (
                  <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR: Cancel, Previous, Next, Back to Top, and Final SUBMIT */}
        <div className="sticky bottom-0 z-30 bg-[#eff6ed] border-t border-emerald-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-2">
            {/* Working Cancel Button */}
            <button
              type="button"
              id="bottom-cancel-registration-btn"
              onClick={onCancel}
              className="h-9 px-3.5 sm:px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-bold text-xs border border-slate-300 transition-colors cursor-pointer shadow-2xs inline-flex items-center justify-center"
            >
              {currentLang === "mr" ? "रद्द करा" : currentLang === "hi" ? "रद्द करें" : "Cancel"}
            </button>

            {/* Back to Top Button */}
            <button
              type="button"
              id="bottom-back-to-top-btn"
              onClick={handleScrollToTop}
              className="h-9 px-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 font-bold text-xs border border-slate-300 transition-colors cursor-pointer shadow-2xs inline-flex items-center justify-center gap-1.5"
              title={currentLang === "mr" ? "पृष्ठाच्या वर जा" : currentLang === "hi" ? "ऊपर जाएं" : "Back to top"}
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">{currentLang === "mr" ? "वर जा ↑" : currentLang === "hi" ? "ऊपर ↑" : "Back to Top"}</span>
            </button>

            {/* Previous Step Button */}
            {currentStep > 1 && (
              <button
                type="button"
                id="bottom-prev-step-btn"
                onClick={handlePrevStep}
                className="h-9 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-bold text-xs border border-slate-300 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
                <span>{currentLang === "mr" ? "मागील पायरी" : currentLang === "hi" ? "पिछला चरण" : "Previous"}</span>
              </button>
            )}
          </div>

          <div>
            {currentStep < 4 ? (
              /* Next Step Button */
              <button
                type="button"
                id="bottom-next-step-btn"
                onClick={handleNextStep}
                className="h-9 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>
                  {currentLang === "mr"
                    ? "पुढील पायरी"
                    : currentLang === "hi"
                    ? "अगला चरण"
                    : "Next Step"}
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              /* FINAL ACTION BUTTON: STRICTLY "Submit" */
              <button
                type="button"
                id="final-submit-registration-btn"
                onClick={handleSubmit}
                className="h-9 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>
                  {currentLang === "mr"
                    ? "नोंदणी सबमिट करा (Submit)"
                    : currentLang === "hi"
                    ? "पंजीकरण सबमिट करें (Submit)"
                    : "Submit Registration"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
