import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Info,
  Check,
  ShieldCheck,
  Compass,
  Plus,
  Edit3,
  Trash2,
  Syringe,
  AlertTriangle,
  X,
  RotateCcw,
  Calendar,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { CattleKeeper, CattleType, CattleRecord } from "../../types";
import { Language } from "../../translations";
import { initialCattleKeepers } from "../../mockData";
import cattleLivestockBg from "../../assets/images/cattle_livestock_pasture_1789905230900.jpg";
import nearbyCattleBarnBg from "../../assets/images/nearby_cattle_barn_1789908135321.jpg";

interface FarmerCattleKeepersProps {
  currentLang?: Language;
}

const defaultMyCattle: CattleRecord[] = [
  {
    id: "cat-1",
    type: "Cow",
    breed: "Gir (गीर गाय)",
    count: 2,
    milkingStatus: "Milking",
    milkYieldLpd: 14,
    tagNumber: "MH-NSK-2024-8192",
    ageYears: 4,
    vaccinationStatus: true,
    vaccineDetails: "FMD & Lumpy Skin Vaccine administered (Valid till Dec 2026)",
    remarks: "High butterfat indigenous A2 milk, healthy and in peak lactation",
    updatedAt: "2026-09-15",
  },
  {
    id: "cat-2",
    type: "Buffalo",
    breed: "Murrah (मुर्रा म्हैस)",
    count: 1,
    milkingStatus: "Milking",
    milkYieldLpd: 12,
    tagNumber: "MH-NSK-2023-4410",
    ageYears: 5,
    vaccinationStatus: true,
    vaccineDetails: "HS & BQ vaccination completed",
    remarks: "Daily yield 12L, regular vet checkups conducted",
    updatedAt: "2026-09-10",
  },
  {
    id: "cat-3",
    type: "Bullock",
    breed: "Khillari (खिल्लार बैल जोडी)",
    count: 2,
    milkingStatus: "Working",
    milkYieldLpd: 0,
    tagNumber: "MH-NSK-2022-1923",
    ageYears: 6,
    vaccinationStatus: true,
    vaccineDetails: "Anthrax & FMD booster verified",
    remarks: "Trained for deep ploughing and farm transport",
    updatedAt: "2026-08-28",
  },
  {
    id: "cat-4",
    type: "Goat",
    breed: "Osmanabadi (उस्मानाबादी शेळी)",
    count: 4,
    milkingStatus: "Dry",
    milkYieldLpd: 2,
    tagNumber: "MH-NSK-2025-0914",
    ageYears: 2,
    vaccinationStatus: false,
    vaccineDetails: "PPR vaccine scheduled for next week",
    remarks: "High disease resistance, good for dual purpose meat and milk",
    updatedAt: "2026-09-18",
  },
];

const tCattle = {
  mr: {
    // Tabs
    tabMyCattle: "१. माझे पशुधन (My Cattle Register & Edit)",
    tabDirectory: "२. जवळचे पशुपालक संपर्क (Nearby Keepers)",

    // My Cattle Section
    myCattleBadge: "माझे शेत पशुधन व्यवस्थापन",
    myCattleTitle: "माझ्या जनावरांची नोंदणी व व्यवस्थापन",
    myCattleSubtitle:
      "आपल्या गोठ्यातील गाय, म्हैस, बैल आणि शेळ्यांची संख्या, दूध उत्पादन, वय, पशु आधार टॅग व लसीकरण नोंद ठेवा आणि हवे तेव्हा सहज संपादित करा.",
    addCattleBtn: "+ नवीन जनावर जोडा",
    editCattleBtn: "संपादित करा",
    deleteCattleBtn: "हटवा",
    quickAdjustCount: "संख्या बदल:",
    tagLabel: "पशु आधार / टॅग क्र.:",
    ageLabel: "वय:",
    yearsOld: "वर्षे",
    milkYieldLabel: "दैनंदिन दूध:",
    litresPerDay: "लिटर/दिवस",
    statusMilking: "दुभती (Milking)",
    statusDry: "भाकड (Dry)",
    statusWorking: "शेती मशागत (Working)",
    statusCalf: "वासरू / लहान (Calf)",
    vaccinatedYes: "लसीकरण पूर्ण (Vaccinated)",
    vaccinatedNo: "लसीकरण प्रलंबित (Pending)",
    vaccineDetailsLabel: "लस तपशील:",
    remarksLabel: "आरोग्य व काळजी नोंद:",
    lastUpdated: "शेवटचे अपडेट:",

    // Modal
    modalAddTitle: "नवीन पशुधन जोडा (Add Cattle)",
    modalEditTitle: "पशुधनाची माहिती संपादित करा (Edit Cattle)",
    animalTypeLabel: "जनावराचा प्रकार (Cattle Type) *",
    breedLabel: "जात / वाण (Breed Name) *",
    countLabel: "संख्या (Headcount) *",
    purposeStatusLabel: "स्थिती / उपयोग (Purpose / Status) *",
    milkYieldInputLabel: "दैनिक दूध उत्पादन (लिटर / दिवस)",
    ageInputLabel: "वय (वर्षे)",
    tagInputLabel: "पशु आधार / कान टॅग क्रमांक (Ear Tag No.)",
    vaccinationCheckboxLabel: "या जनावरांचे अधिकृत लसीकरण पूर्ण झाले आहे का?",
    vaccineNameInputLabel: "दिलेल्या लसीचे नाव व दिनांक (उदा. FMD, लंपी, HS/BQ)",
    remarksInputLabel: "आरोग्य विषयक विशेष नोंदी / शेरा",
    saveChangesBtn: "बदल सेव्ह करा",
    addRecordBtn: "पशुधन नोंदवा",
    cancelBtn: "रद्द करा",
    deleteConfirm: "तुम्हाला ही पशुधन नोंद नक्की हटवायची आहे का?",
    emptyCattleTitle: "अद्याप कोणतीही जनावरे नोंदवलेली नाहीत",
    emptyCattleDesc: "आपल्या गोठ्यातील जनावरांची नोंद करण्यासाठी खालील बटणावर क्लिक करा किंवा नमुना जनावरे लोड करा.",
    loadDemoBtn: "नमुना जनावरे लोड करा (Load Demo)",

    // Stats
    statTotalAnimals: "एकूण जनावरे",
    statMilking: "दुभती जनावरे",
    statDailyMilk: "अंदाजे दूध उत्पादन",
    statVaccinated: "लसीकरण सुरक्षितता",

    // Vet helpline
    vetHelplineTitle: "पशुवैद्यकीय मोफत सल्ला व आपत्कालीन कक्ष",
    vetHelplineDesc: "राष्ट्रीय पशु रोग नियंत्रण कार्यक्रम (NADCP) अंतर्गत मोफत लसीकरण व पशू आधार नोंदणीसाठी संपर्क: १९६२ (टोल-फ्री)",

    // Directory
    badge: "परिसरातील पशुपालक संपर्क निर्देशिका",
    title: "जवळचे पशुपालक व जनावरांची उपलब्धता",
    subtitle:
      "शेतकऱ्यांच्या जवळ असणाऱ्या अधिकृत पशुपालकांचे थेट संपर्क क्रमांक, पत्ता व सध्या उपलब्ध असलेल्या गाय, म्हैस, बैल आणि शेळ्यांच्या देशी-विदेशी जातींची अचूक माहिती.",
    farmerLocationAnchor: "आपले शेत स्थान: दिंडोरी, नाशिक (३५ किमी परिसरातील पशुपालक)",
    searchPlaceholder: "जात (उदा. गीर, खिल्लार, मुर्रा) किंवा गाव शोधा...",
    allTypes: "सर्व जनावरे",
    cows: "गाय (Cow)",
    buffaloes: "म्हैस (Buffalo)",
    bullocks: "बैल (Bullock / शेती)",
    goats: "शेळी (Goat)",
    distFilterAll: "सर्व अंतर",
    dist10km: "१० किमी आत",
    dist25km: "२५ किमी आत",
    dist40km: "४० किमी आत",
    verifiedBadge: "पडताळणीकृत पशुपालक",
    callNow: "थेट फोन करा",
    whatsapp: "व्हॉट्सॲप",
    copyNumber: "नंबर कॉपी करा",
    copiedToast: "फोन नंबर कॉपी झाला!",
    availableLivestock: "उपलब्ध जनावरे व जाती (Availability):",
    headCountSuffix: "उपलब्ध",
    purposeDairy: "दुग्धव्यवसाय / दुभती",
    purposePlough: "शेती मशागत / नांगरणी",
    purposeBreeding: "पैदास / ब्रीडिंग",
    healthTagged: "आरोग्य टॅग प्रमाणित",
    primaryPhone: "प्राथमिक संपर्क:",
    altPhoneLabel: "पर्यायी फोन:",
    locationLabel: "स्थान व पत्ता:",
    distanceLabel: "अंतर:",
    away: "किमी दूर",
    noResultsTitle: "कोणतेही पशुपालक सापडले नाहीत",
    noResultsDesc: "कृपया शोध शब्द किंवा फिल्टर बदलून पुन्हा प्रयत्न करा.",
    resetFilter: "सर्व फिल्टर रीसेट करा",
    totalKeepersCount: "पशुपालक संपर्क उपलब्ध",
    directContactNote: "नोंद: कोणत्याही मध्यस्थाशिवाय थेट पशुपालकाशी बोलून जनावरांची पाहणी व व्यवहार ठरवा.",
  },
  hi: {
    // Tabs
    tabMyCattle: "१. मेरे मवेशी (My Cattle Register & Edit)",
    tabDirectory: "२. निकटवर्ती पशुपालक संपर्क (Nearby Keepers)",

    // My Cattle Section
    myCattleBadge: "खेत पशुधन प्रबंधन",
    myCattleTitle: "मेरे मवेशियों का पंजीकरण एवं संपादन",
    myCattleSubtitle:
      "अपने बाड़े की गाय, भैंस, बैल एवं बकरियों की संख्या, दुग्ध उत्पादन, उम्र, पशु आधार टैग व टीकाकरण का पूरा विवरण रखें और जब चाहें आसानी से संपादित करें।",
    addCattleBtn: "+ नया मवेशी जोड़ें",
    editCattleBtn: "संपादित करें",
    deleteCattleBtn: "हटाएं",
    quickAdjustCount: "संख्या बदलें:",
    tagLabel: "पशु आधार / टैग नं.:",
    ageLabel: "आयु:",
    yearsOld: "वर्ष",
    milkYieldLabel: "दैनिक दूध:",
    litresPerDay: "लीटर/दिन",
    statusMilking: "दुधारू (Milking)",
    statusDry: "सूखी / गभिन (Dry)",
    statusWorking: "खेत कार्य / जुताई (Working)",
    statusCalf: "बछड़ा / बछिया (Calf)",
    vaccinatedYes: "टीकाकरण पूर्ण (Vaccinated)",
    vaccinatedNo: "टीकाकरण लंबित (Pending)",
    vaccineDetailsLabel: "टीका विवरण:",
    remarksLabel: "स्वास्थ्य एवं देखभाल टिप्पणी:",
    lastUpdated: "अंतिम अद्यतन:",

    // Modal
    modalAddTitle: "नया मवेशी जोड़ें (Add Cattle)",
    modalEditTitle: "मवेशी विवरण संपादित करें (Edit Cattle)",
    animalTypeLabel: "पशु का प्रकार (Cattle Type) *",
    breedLabel: "नस्ल का नाम (Breed Name) *",
    countLabel: "संख्या (Headcount) *",
    purposeStatusLabel: "स्थिति / उपयोग (Purpose / Status) *",
    milkYieldInputLabel: "दैनिक दुग्ध उत्पादन (लीटर / दिन)",
    ageInputLabel: "आयु (वर्ष)",
    tagInputLabel: "पशु आधार / कान टैग नंबर (Ear Tag No.)",
    vaccinationCheckboxLabel: "क्या इस मवेशी का टीकाकरण पूर्ण हो चुका है?",
    vaccineNameInputLabel: "लगाए गए टीके का नाम व तिथि (उदा. FMD, लंपी, HS/BQ)",
    remarksInputLabel: "स्वास्थ्य संबंधी विशेष विवरण",
    saveChangesBtn: "बदलाव सहेजें",
    addRecordBtn: "मवेशी जोड़ें",
    cancelBtn: "रद्द करें",
    deleteConfirm: "क्या आप इस मवेशी रिकॉर्ड को हटाना चाहते हैं?",
    emptyCattleTitle: "कोई मवेशी पंजीकृत नहीं है",
    emptyCattleDesc: "अपने मवेशियों को दर्ज करने के लिए ऊपर दिए बटन पर क्लिक करें या डेमो मवेशी लोड करें।",
    loadDemoBtn: "डेमो मवेशी लोड करें (Load Demo)",

    // Stats
    statTotalAnimals: "कुल मवेशी",
    statMilking: "दुधारू पशु",
    statDailyMilk: "अनुमानित दुग्ध उत्पादन",
    statVaccinated: "टीकाकरण सुरक्षा",

    // Vet helpline
    vetHelplineTitle: "पशु चिकित्सा हेल्पलाइन एवं आपातकालीन सहायता",
    vetHelplineDesc: "राष्ट्रीय पशु रोग नियंत्रण कार्यक्रम (NADCP) अंतर्गत निःशुल्क टीकाकरण व पशु आधार सहायता: १९६२ (टोल-फ्री)",

    // Directory
    badge: "निकटवर्ती पशुपालक संपर्क निर्देशिका",
    title: "निकटवर्ती पशुपालक एवं पशु उपलब्धता",
    subtitle:
      "किसानों के नजदीकी पंजीकृत पशुपालकों के सीधे संपर्क नंबर, स्थान और वर्तमान में उपलब्ध गाय, भैंस, बैल एवं बकरियों की नस्लवार सटीक जानकारी।",
    farmerLocationAnchor: "आपका खेत स्थान: दिंडोरी, नासिक (३५ किमी दायरे के पशुपालक)",
    searchPlaceholder: "नस्ल (उदा. गीर, खिल्लार, मुर्रा) या गांव खोजें...",
    allTypes: "सभी पशु",
    cows: "गाय (Cow)",
    buffaloes: "भैंस (Buffalo)",
    bullocks: "बैल (Bullock / जुताई)",
    goats: "बकरी (Goat)",
    distFilterAll: "सभी दूरी",
    dist10km: "१० किमी के अंदर",
    dist25km: "२५ किमी के अंदर",
    dist40km: "४० किमी के अंदर",
    verifiedBadge: "सत्यापित पशुपालक",
    callNow: "सीधा कॉल करें",
    whatsapp: "व्हाट्सएप",
    copyNumber: "नंबर कॉपी करें",
    copiedToast: "फ़ोन नंबर कॉपी हो गया!",
    availableLivestock: "उपलब्ध पशु एवं नस्लें (Availability):",
    headCountSuffix: "उपलब्ध",
    purposeDairy: "दुग्ध उत्पादन / दुधारू",
    purposePlough: "खेत जुताई / कृषि कार्य",
    purposeBreeding: "प्रजनन / ब्रीडिंग",
    healthTagged: "स्वास्थ्य टैग प्रमाणित",
    primaryPhone: "प्राथमिक संपर्क:",
    altPhoneLabel: "वैकल्पिक फ़ोन:",
    locationLabel: "स्थान एवं पता:",
    distanceLabel: "दूरी:",
    away: "किमी दूर",
    noResultsTitle: "कोई पशुपालक नहीं मिला",
    noResultsDesc: "कृपया खोज शब्द या फ़िल्टर बदलकर दोबारा प्रयास करें।",
    resetFilter: "फ़िल्टर रीसेट करें",
    totalKeepersCount: "पशुपालक संपर्क उपलब्ध",
    directContactNote: "सूचना: बिना किसी बिचौलिए के सीधे पशुपालक से बात कर पशुओं का मुआयना व सौदा करें।",
  },
  en: {
    // Tabs
    tabMyCattle: "1. My Own Cattle (Register & Edit)",
    tabDirectory: "2. Nearby Keepers Directory",

    // My Cattle Section
    myCattleBadge: "My Farm Cattle Management",
    myCattleTitle: "My Farm Cattle & Livestock Inventory",
    myCattleSubtitle:
      "Manage and edit your registered cows, buffaloes, bullocks, and goats with accurate count, milk yields, age, ear tags, and vaccination audit records.",
    addCattleBtn: "+ Add My Cattle",
    editCattleBtn: "Edit Details",
    deleteCattleBtn: "Remove",
    quickAdjustCount: "Adjust Count:",
    tagLabel: "Ear Tag / Pashu Aadhaar:",
    ageLabel: "Age:",
    yearsOld: "yrs",
    milkYieldLabel: "Daily Milk:",
    litresPerDay: "L/day",
    statusMilking: "Milking / Lactating",
    statusDry: "Dry / Gestating",
    statusWorking: "Ploughing / Draft",
    statusCalf: "Calf / Growing",
    vaccinatedYes: "Fully Vaccinated",
    vaccinatedNo: "Vaccination Due",
    vaccineDetailsLabel: "Vaccine Details:",
    remarksLabel: "Health & Feed Notes:",
    lastUpdated: "Last Updated:",

    // Modal
    modalAddTitle: "Add Cattle to Farm",
    modalEditTitle: "Edit Cattle Record",
    animalTypeLabel: "Cattle Type *",
    breedLabel: "Breed Name *",
    countLabel: "Headcount (Quantity) *",
    purposeStatusLabel: "Status / Primary Use *",
    milkYieldInputLabel: "Daily Milk Yield (Litres / Day)",
    ageInputLabel: "Age in Years",
    tagInputLabel: "Pashu Aadhaar / 12-Digit Ear Tag",
    vaccinationCheckboxLabel: "Has this animal received mandatory vaccinations?",
    vaccineNameInputLabel: "Vaccine Names & Dates (e.g. FMD, Lumpy Skin, HS/BQ)",
    remarksInputLabel: "Health, Feed & Production Remarks",
    saveChangesBtn: "Save Changes",
    addRecordBtn: "Save Cattle Record",
    cancelBtn: "Cancel",
    deleteConfirm: "Are you sure you want to remove this cattle record?",
    emptyCattleTitle: "No Cattle Registered Yet",
    emptyCattleDesc: "Add your farm cattle to keep track of milk yields, health records, and ear tags.",
    loadDemoBtn: "Load Demo Cattle",

    // Stats
    statTotalAnimals: "Total Livestock",
    statMilking: "Milking Stock",
    statDailyMilk: "Est. Milk Yield",
    statVaccinated: "Vaccination Ratio",

    // Vet helpline
    vetHelplineTitle: "Veterinary Support & Emergency Care",
    vetHelplineDesc: "National Animal Disease Control Programme (NADCP) free vaccination & Pashu Aadhaar support: 1962 (Toll-Free)",

    // Directory
    badge: "Nearby Cattle Keepers Directory",
    title: "Nearby Cattle Keepers & Breed Availability",
    subtitle:
      "Direct contact numbers, verified locations, and real-time availability of indigenous and dairy cattle breeds (Cows, Buffaloes, Bullocks & Goats) near your farm.",
    farmerLocationAnchor: "Your Farm Location: Dindori, Nashik (Showing cattle keepers within 35 km)",
    searchPlaceholder: "Search breed (e.g. Gir, Murrah, Khillari) or village...",
    allTypes: "All Cattle",
    cows: "Cows",
    buffaloes: "Buffaloes",
    bullocks: "Bullocks (Ploughing)",
    goats: "Goats",
    distFilterAll: "Any Distance",
    dist10km: "Within 10 km",
    dist25km: "Within 25 km",
    dist40km: "Within 40 km",
    verifiedBadge: "Verified Livestock Keeper",
    callNow: "Call Now",
    whatsapp: "WhatsApp",
    copyNumber: "Copy Phone",
    copiedToast: "Phone number copied!",
    availableLivestock: "Available Cattle & Breeds:",
    headCountSuffix: "available",
    purposeDairy: "Milking / Dairy",
    purposePlough: "Ploughing / Farm Work",
    purposeBreeding: "Breeding / Stud",
    healthTagged: "Vet Health Tagged",
    primaryPhone: "Primary Phone:",
    altPhoneLabel: "Alt Phone:",
    locationLabel: "Location & Address:",
    distanceLabel: "Distance:",
    away: "km away",
    noResultsTitle: "No Cattle Keepers Found",
    noResultsDesc: "Try adjusting your search criteria or removing distance filters.",
    resetFilter: "Reset Filters",
    totalKeepersCount: "Livestock Keepers Available",
    directContactNote: "Note: Contact cattle keepers directly with zero mediator commission to inspect and negotiate cattle.",
  },
};

export const FarmerCattleKeepers: React.FC<FarmerCattleKeepersProps> = ({
  currentLang = "en",
}) => {
  const t = tCattle[currentLang] || tCattle.en;

  // Active sub-tab: "my-cattle" vs "directory"
  const [activeSubTab, setActiveSubTab] = useState<"my-cattle" | "directory">("my-cattle");

  // Local state for farmer's own cattle with localStorage persistence
  const [myCattle, setMyCattle] = useState<CattleRecord[]>(() => {
    try {
      const saved = localStorage.getItem("krishivistar_my_cattle");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load saved cattle:", e);
    }
    return defaultMyCattle;
  });

  // Persist myCattle on change
  useEffect(() => {
    try {
      localStorage.setItem("krishivistar_my_cattle", JSON.stringify(myCattle));
    } catch (e) {
      console.error("Failed to save cattle:", e);
    }
  }, [myCattle]);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingCattleId, setEditingCattleId] = useState<string | null>(null);

  // Form State
  const [formType, setFormType] = useState<CattleType>("Cow");
  const [formBreed, setFormBreed] = useState("");
  const [formCount, setFormCount] = useState<number>(1);
  const [formStatus, setFormStatus] = useState<"Milking" | "Dry" | "Working" | "Calf">("Milking");
  const [formMilkYield, setFormMilkYield] = useState<number>(10);
  const [formAge, setFormAge] = useState<number>(4);
  const [formTag, setFormTag] = useState("");
  const [formVaccinated, setFormVaccinated] = useState<boolean>(true);
  const [formVaccineDetails, setFormVaccineDetails] = useState("");
  const [formRemarks, setFormRemarks] = useState("");
  const [formError, setFormError] = useState("");

  // Directory State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"All" | CattleType>("All");
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingCattleId(null);
    setFormType("Cow");
    setFormBreed("");
    setFormCount(1);
    setFormStatus("Milking");
    setFormMilkYield(10);
    setFormAge(3);
    setFormTag(`MH-NSK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormVaccinated(true);
    setFormVaccineDetails("FMD & Lumpy Skin Vaccine administered");
    setFormRemarks("");
    setFormError("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (cattle: CattleRecord) => {
    setModalMode("edit");
    setEditingCattleId(cattle.id);
    setFormType(cattle.type);
    setFormBreed(cattle.breed);
    setFormCount(cattle.count || 1);
    setFormStatus(cattle.milkingStatus || "Milking");
    setFormMilkYield(cattle.milkYieldLpd || 0);
    setFormAge(cattle.ageYears || 3);
    setFormTag(cattle.tagNumber || "");
    setFormVaccinated(cattle.vaccinationStatus !== false);
    setFormVaccineDetails(cattle.vaccineDetails || "");
    setFormRemarks(cattle.remarks || "");
    setFormError("");
    setIsModalOpen(true);
  };

  // Save Cattle (Add or Edit)
  const handleSaveCattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBreed.trim()) {
      setFormError(
        currentLang === "mr"
          ? "कृपया जातीचे नाव प्रविष्ट करा"
          : currentLang === "hi"
          ? "कृपया नस्ल का नाम दर्ज करें"
          : "Please enter breed name"
      );
      return;
    }

    const todayDate = new Date().toISOString().split("T")[0];

    if (modalMode === "add") {
      const newRecord: CattleRecord = {
        id: `cat-${Date.now()}`,
        type: formType,
        breed: formBreed.trim(),
        count: Math.max(1, formCount),
        milkingStatus: formStatus,
        milkYieldLpd: formStatus === "Milking" ? formMilkYield : 0,
        ageYears: formAge,
        tagNumber: formTag.trim(),
        vaccinationStatus: formVaccinated,
        vaccineDetails: formVaccineDetails.trim(),
        remarks: formRemarks.trim(),
        updatedAt: todayDate,
      };
      setMyCattle((prev) => [newRecord, ...prev]);
    } else if (modalMode === "edit" && editingCattleId) {
      setMyCattle((prev) =>
        prev.map((item) =>
          item.id === editingCattleId
            ? {
                ...item,
                type: formType,
                breed: formBreed.trim(),
                count: Math.max(1, formCount),
                milkingStatus: formStatus,
                milkYieldLpd: formStatus === "Milking" ? formMilkYield : 0,
                ageYears: formAge,
                tagNumber: formTag.trim(),
                vaccinationStatus: formVaccinated,
                vaccineDetails: formVaccineDetails.trim(),
                remarks: formRemarks.trim(),
                updatedAt: todayDate,
              }
            : item
        )
      );
    }

    setIsModalOpen(false);
  };

  // Delete Cattle
  const handleDeleteCattle = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      setMyCattle((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Quick count change
  const handleAdjustCount = (id: string, delta: number) => {
    setMyCattle((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextCount = Math.max(1, (c.count || 1) + delta);
          return { ...c, count: nextCount, updatedAt: new Date().toISOString().split("T")[0] };
        }
        return c;
      })
    );
  };

  // Quick toggle vaccination
  const handleToggleVaccine = (id: string) => {
    setMyCattle((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.vaccinationStatus;
          return {
            ...c,
            vaccinationStatus: next,
            vaccineDetails: next ? "FMD & Health Tag Verified" : "Pending Booster",
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return c;
      })
    );
  };

  // Preset breed helper chips
  const breedSuggestions: Record<CattleType, string[]> = {
    Cow: ["Gir (गीर)", "Sahiwal (साहिवाल)", "Khillari (खिल्लार)", "Red Sindhi", "HF Cross", "Dangi (डांगी)"],
    Buffalo: ["Murrah (मुर्रा)", "Jaffarabadi (जाफराबादी)", "Mehsana (मेहसाणा)", "Pandharpuri (पंढरपुरी)", "Nagpuri"],
    Bullock: ["Khillari Pair (खिल्लार जोडी)", "Dangi Bullock", "Deoni (देवणी)", "Gaolao", "Kankrej"],
    Goat: ["Osmanabadi (उस्मानाबादी)", "Sirohi (सिरोही)", "Boer Cross", "Beetal", "Barbari"],
  };

  // Filter Directory Keepers
  const filteredKeepers = initialCattleKeepers.filter((keeper) => {
    if (keeper.distanceKm > maxDistance) return false;
    if (selectedType !== "All") {
      const hasType = keeper.availableBreeds.some((b) => b.type === selectedType);
      if (!hasType) return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = keeper.name.toLowerCase().includes(q);
      const matchFarm = keeper.farmName?.toLowerCase().includes(q) || false;
      const matchVillage = keeper.village.toLowerCase().includes(q);
      const matchTaluka = keeper.taluka.toLowerCase().includes(q);
      const matchBreed = keeper.availableBreeds.some(
        (b) => b.breed.toLowerCase().includes(q) || b.type.toLowerCase().includes(q)
      );
      return matchName || matchFarm || matchVillage || matchTaluka || matchBreed;
    }
    return true;
  });

  // Calculate Herd Stats
  const totalHeadcount = myCattle.reduce((sum, item) => sum + (item.count || 1), 0);
  const milkingCount = myCattle
    .filter((c) => c.milkingStatus === "Milking")
    .reduce((sum, item) => sum + (item.count || 1), 0);
  const totalDailyMilk = myCattle
    .filter((c) => c.milkingStatus === "Milking")
    .reduce((sum, item) => sum + (item.milkYieldLpd || 0) * (item.count || 1), 0);
  const vaccinatedRatio =
    myCattle.length > 0
      ? `${myCattle.filter((c) => c.vaccinationStatus).length}/${myCattle.length}`
      : "0/0";

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSubTab("my-cattle")}
          className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "my-cattle"
              ? "bg-emerald-600 text-white shadow-md font-black"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span className="text-base">🐄</span>
          <span>{t.tabMyCattle}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold border border-emerald-400/40">
            {myCattle.length} Types ({totalHeadcount} Heads)
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("directory")}
          className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "directory"
              ? "bg-amber-600 text-white shadow-md font-black"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>{t.tabDirectory}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-bold border border-amber-400/40">
            {filteredKeepers.length} Keepers
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: MY OWN CATTLE MANAGEMENT (Add & Edit Option)                      */}
      {/* ========================================================================= */}
      {activeSubTab === "my-cattle" && (
        <div className="space-y-6">
          {/* Header Banner for My Cattle with Pastoral Meadow Image Background */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[460px] sm:min-h-[500px] md:min-h-[540px] p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white transition-all">
            {/* Background Cattle Pasture Image */}
            <img
              src={cattleLivestockBg}
              alt="Cattle and livestock grazing in green meadow"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay to ensure text is crisp and readable while preserving vibrant pasture, cows, and sunlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/65 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-lg bg-black/55 border border-white/25 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    {t.myCattleBadge}
                  </span>
                  <span className="text-xs text-white/95 font-semibold bg-black/45 px-3 py-1 rounded-lg border border-white/15 backdrop-blur-xs shadow-sm">
                    📍 Dindori, Nashik Herd Register
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white font-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {t.myCattleTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-100 font-medium max-w-2xl mt-1.5 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {t.myCattleSubtitle}
                </p>
              </div>

              {/* Action: Add My Cattle Button — Transparent Glass with High-Contrast Text */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  id="add-my-cattle-btn"
                  onClick={handleOpenAddModal}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white/30 backdrop-blur-md hover:border-white/50"
                >
                  <Plus className="w-4 h-4 text-white stroke-[2.5]" />
                  <span className="drop-shadow-sm">{t.addCattleBtn}</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Stat Bar with Transparent Frosted Glass Cards */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20">
              <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 shadow-md transition-all">
                <span className="text-[11px] sm:text-xs text-white block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.statTotalAnimals}
                </span>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 flex items-baseline gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  <span>{totalHeadcount}</span>
                  <span className="text-xs font-semibold text-slate-200">heads</span>
                </div>
              </div>

              <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 shadow-md transition-all">
                <span className="text-[11px] sm:text-xs text-white block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.statMilking}
                </span>
                <div className="text-lg sm:text-2xl font-black text-emerald-300 mt-1 flex items-baseline gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  <span>{milkingCount}</span>
                  <span className="text-xs font-semibold text-emerald-200">lactating</span>
                </div>
              </div>

              <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 shadow-md transition-all">
                <span className="text-[11px] sm:text-xs text-white block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.statDailyMilk}
                </span>
                <div className="text-lg sm:text-2xl font-black text-teal-300 mt-1 flex items-baseline gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  <span>{totalDailyMilk}</span>
                  <span className="text-xs font-semibold text-teal-200">L / day</span>
                </div>
              </div>

              <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 shadow-md transition-all">
                <span className="text-[11px] sm:text-xs text-white block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.statVaccinated}
                </span>
                <div className="text-lg sm:text-2xl font-black text-amber-300 mt-1 flex items-baseline gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  <span>{vaccinatedRatio}</span>
                  <span className="text-xs font-semibold text-amber-200">protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cattle List Cards */}
          {myCattle.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🐄
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.emptyCattleTitle}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">{t.emptyCattleDesc}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addCattleBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMyCattle(defaultMyCattle)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.loadDemoBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCattle.map((cattle) => {
                const icon =
                  cattle.type === "Cow"
                    ? "🐄"
                    : cattle.type === "Buffalo"
                    ? "🐃"
                    : cattle.type === "Bullock"
                    ? "🐂"
                    : "🐐";

                const statusBadgeColor =
                  cattle.milkingStatus === "Milking"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : cattle.milkingStatus === "Working"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : cattle.milkingStatus === "Calf"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-700 border-slate-200";

                const statusLabel =
                  cattle.milkingStatus === "Milking"
                    ? t.statusMilking
                    : cattle.milkingStatus === "Working"
                    ? t.statusWorking
                    : cattle.milkingStatus === "Calf"
                    ? t.statusCalf
                    : t.statusDry;

                return (
                  <div
                    key={cattle.id}
                    id={`my-cattle-card-${cattle.id}`}
                    className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-emerald-500/80 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Type & Breed + Edit Button + Delete Button */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                            {icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-slate-900 tracking-tight">
                                {cattle.breed}
                              </h3>
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                                {cattle.type}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadgeColor}`}
                              >
                                {statusLabel}
                              </span>
                              {cattle.ageYears && (
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {cattle.ageYears} {t.yearsOld}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Top Right: Edit and Delete Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(cattle)}
                            id={`edit-cattle-btn-${cattle.id}`}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Edit cattle details"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{t.editCattleBtn}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCattle(cattle.id)}
                            id={`delete-cattle-btn-${cattle.id}`}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                            title="Delete cattle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-slate-100">
                        {/* Headcount with Quick Adjust Buttons */}
                        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 block font-medium mb-1">
                            {t.countLabel}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-black text-slate-900">
                              {cattle.count} {cattle.type === "Bullock" ? "Pair" : "Heads"}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleAdjustCount(cattle.id, -1)}
                                className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustCount(cattle.id, 1)}
                                className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Milk Output / Work status */}
                        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 block font-medium mb-1">
                            {t.milkYieldLabel}
                          </span>
                          {cattle.milkingStatus === "Milking" ? (
                            <span className="text-base font-black text-emerald-700">
                              {cattle.milkYieldLpd || 0} {t.litresPerDay}
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-slate-500">
                              {statusLabel}
                            </span>
                          )}
                        </div>

                        {/* Ear Tag */}
                        <div className="col-span-2 flex items-center justify-between py-1 text-[11px] text-slate-600">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <span>🏷️</span>
                            <span>{t.tagLabel}</span>
                          </span>
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {cattle.tagNumber || "Unassigned"}
                          </span>
                        </div>
                      </div>

                      {/* Health & Vaccination Status */}
                      <div className="pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Syringe className="w-3.5 h-3.5 text-blue-600" />
                            <span>Vaccination Status:</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleToggleVaccine(cattle.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 border transition-all cursor-pointer ${
                              cattle.vaccinationStatus
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                                : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                            }`}
                            title="Click to toggle vaccination status"
                          >
                            {cattle.vaccinationStatus ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                <span>{t.vaccinatedYes}</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3 text-amber-700" />
                                <span>{t.vaccinatedNo}</span>
                              </>
                            )}
                          </button>
                        </div>

                        {cattle.vaccineDetails && (
                          <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                            <strong className="text-slate-700 font-bold">{t.vaccineDetailsLabel} </strong>
                            {cattle.vaccineDetails}
                          </p>
                        )}

                        {cattle.remarks && (
                          <p className="text-[11px] text-slate-500 italic">
                            "{cattle.remarks}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata & Quick Edit Action */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {t.lastUpdated} {cattle.updatedAt || "Recent"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(cattle)}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Animal</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Government Animal Welfare Notice */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-950 block">
                {t.vetHelplineTitle}
              </span>
              <p className="text-amber-800 leading-relaxed">
                {t.vetHelplineDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: NEARBY CATTLE KEEPERS DIRECTORY                                    */}
      {/* ========================================================================= */}
      {activeSubTab === "directory" && (
        <div className="space-y-6">
          {/* Header Banner with Cattle Barn & Dairy Shelter Photographic Background */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[440px] sm:min-h-[480px] md:min-h-[520px] p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white transition-all">
            {/* Background Cattle Barn Image */}
            <img
              src={nearbyCattleBarnBg}
              alt="Nearby dairy cattle barn with cows and buffaloes feeding at trough"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay to ensure text is crisp and readable while preserving cows, buffaloes, calves, and barn shelter */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/65 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-3 py-1 rounded-lg bg-black/55 border border-white/25 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-amber-300" />
                  {t.badge}
                </span>
                <span className="text-xs text-white/95 font-semibold bg-black/45 px-3 py-1 rounded-lg border border-white/15 backdrop-blur-xs shadow-sm">
                  📍 {t.farmerLocationAnchor}
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white font-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-100 font-medium max-w-2xl mt-1.5 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                {t.subtitle}
              </p>
            </div>

            {/* Bottom Info Bar with frosted glass */}
            <div className="relative z-10 bg-black/50 border border-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 mt-6 flex flex-wrap items-center gap-3 text-xs shadow-lg">
              <span className="flex items-center gap-1.5 font-black text-amber-300 drop-shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                {filteredKeepers.length} {t.totalKeepersCount}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-slate-100 drop-shadow-sm font-medium">{t.directContactNote}</span>
            </div>
          </div>

          {/* Filter and Search Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="cattle-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Distance Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  id="cattle-distance-filter"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                >
                  <option value={50}>{t.distFilterAll}</option>
                  <option value={10}>{t.dist10km}</option>
                  <option value={25}>{t.dist25km}</option>
                  <option value={40}>{t.dist40km}</option>
                </select>
              </div>
            </div>

            {/* Cattle Type Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => setSelectedType("All")}
                id="cattle-type-all"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedType === "All"
                    ? "bg-amber-500 text-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.allTypes}
              </button>
              <button
                onClick={() => setSelectedType("Cow")}
                id="cattle-type-cow"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "Cow"
                    ? "bg-amber-500 text-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🐄</span>
                <span>{t.cows}</span>
              </button>
              <button
                onClick={() => setSelectedType("Buffalo")}
                id="cattle-type-buffalo"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "Buffalo"
                    ? "bg-amber-500 text-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🐃</span>
                <span>{t.buffaloes}</span>
              </button>
              <button
                onClick={() => setSelectedType("Bullock")}
                id="cattle-type-bullock"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "Bullock"
                    ? "bg-amber-500 text-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🐂</span>
                <span>{t.bullocks}</span>
              </button>
              <button
                onClick={() => setSelectedType("Goat")}
                id="cattle-type-goat"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === "Goat"
                    ? "bg-amber-500 text-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🐐</span>
                <span>{t.goats}</span>
              </button>
            </div>
          </div>

          {/* Directory Grid */}
          {filteredKeepers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="text-base font-bold text-slate-800">{t.noResultsTitle}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.noResultsDesc}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                  setMaxDistance(50);
                }}
                className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
              >
                {t.resetFilter}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredKeepers.map((keeper) => {
                const isCopied = copiedId === keeper.id;

                return (
                  <div
                    key={keeper.id}
                    id={`cattle-keeper-${keeper.id}`}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top: Name, Farm & Distance Badge */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 font-display">
                              {keeper.name}
                            </h3>
                            {keeper.verified && (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/70"
                                title={t.verifiedBadge}
                              >
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                {t.verifiedBadge}
                              </span>
                            )}
                          </div>
                          {keeper.farmName && (
                            <p className="text-xs font-medium text-amber-800 mt-0.5">
                              🏡 {keeper.farmName}
                            </p>
                          )}
                        </div>

                        {/* Distance Tag */}
                        <div className="shrink-0 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-extrabold text-xs border border-amber-200/80">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            {keeper.distanceKm} {t.away}
                          </span>
                        </div>
                      </div>

                      {/* Location Details */}
                      <div className="py-2.5 text-xs text-slate-600 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800">
                            {keeper.village}, {keeper.taluka} ({keeper.district})
                          </span>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                            {keeper.address}
                          </p>
                        </div>
                      </div>

                      {/* Cattle & Breed Availability Section */}
                      <div className="mt-2 pt-2.5 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">
                            {t.availableLivestock}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {keeper.availableBreeds.map((breedItem, idx) => {
                            const icon =
                              breedItem.type === "Cow"
                                ? "🐄"
                                : breedItem.type === "Buffalo"
                                ? "🐃"
                                : breedItem.type === "Bullock"
                                ? "🐂"
                                : "🐐";

                            const purposeText =
                              breedItem.purpose === "Ploughing / Farm Work"
                                ? t.purposePlough
                                : breedItem.purpose === "Milking / Dairy"
                                ? t.purposeDairy
                                : t.purposeBreeding;

                            return (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                                    <span>{icon}</span>
                                    <span className="truncate">{breedItem.breed}</span>
                                  </span>
                                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                                    {breedItem.count} {t.headCountSuffix}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                                  <span className="truncate text-slate-600 font-medium">
                                    {purposeText}
                                  </span>
                                  {breedItem.healthTagged && (
                                    <span
                                      className="text-emerald-700 font-semibold flex items-center gap-0.5 shrink-0"
                                      title={t.healthTagged}
                                    >
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      {currentLang === "mr"
                                        ? "टॅग प्रमाणित"
                                        : currentLang === "hi"
                                        ? "टैग प्रमाणित"
                                        : "Tagged"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Direct Contact Details & Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-200/90 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Phone Numbers Display */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">
                              {t.primaryPhone}
                            </span>
                            <a
                              href={`tel:${keeper.phone.replace(/\s+/g, "")}`}
                              className="text-sm font-black text-slate-950 hover:text-emerald-700 transition-colors tracking-tight font-mono"
                            >
                              {keeper.phone}
                            </a>
                          </div>
                          {keeper.altPhone && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span>{t.altPhoneLabel}</span>
                              <a
                                href={`tel:${keeper.altPhone.replace(/\s+/g, "")}`}
                                className="font-semibold text-slate-700 hover:text-emerald-700 font-mono"
                              >
                                {keeper.altPhone}
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons: Direct Call, WhatsApp & Copy */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Copy Number */}
                          <button
                            onClick={() => handleCopyPhone(keeper.id, keeper.phone)}
                            id={`cattle-copy-btn-${keeper.id}`}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-xs font-medium"
                            title={t.copyNumber}
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          {/* WhatsApp Button */}
                          <a
                            href={`https://wa.me/${keeper.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              currentLang === "mr"
                                ? `नमस्कार ${keeper.name}, मी KrishiVistar ॲपवरून संपर्क करत आहे. आपल्याकडील उपलब्ध जनावरांविषयी माहिती हवी आहे.`
                                : currentLang === "hi"
                                ? `नमस्ते ${keeper.name}, मैं KrishiVistar ऐप से संपर्क कर रहा हूँ। आपके उपलब्ध पशुओं के बारे में जानकारी चाहिए।`
                                : `Hello ${keeper.name}, contacting you via KrishiVistar regarding your available cattle.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            id={`cattle-wa-btn-${keeper.id}`}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                            title={t.whatsapp}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t.whatsapp}</span>
                          </a>

                          {/* Call Button */}
                          <a
                            href={`tel:${keeper.phone.replace(/\s+/g, "")}`}
                            id={`cattle-call-btn-${keeper.id}`}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-colors shadow-xs cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
                            <span>{t.callNow}</span>
                          </a>
                        </div>
                      </div>

                      {/* Copy Feedback Notice */}
                      {isCopied && (
                        <p className="text-[10px] text-emerald-700 font-bold mt-1.5 text-right animate-fadeIn">
                          ✓ {t.copiedToast}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT CATTLE (Fits full screen or responsive dialog)           */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {formType === "Cow"
                    ? "🐄"
                    : formType === "Buffalo"
                    ? "🐃"
                    : formType === "Bullock"
                    ? "🐂"
                    : "🐐"}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                    {modalMode === "add" ? t.modalAddTitle : t.modalEditTitle}
                  </h3>
                  <span className="text-[11px] text-emerald-300">
                    {modalMode === "add"
                      ? "Enter cattle specifications for your herd"
                      : "Modify and update cattle records"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSaveCattle} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Animal Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.animalTypeLabel}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Cow", "Buffalo", "Bullock", "Goat"] as CattleType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setFormType(type);
                        if (type === "Bullock") {
                          setFormStatus("Working");
                        } else if (formStatus === "Working") {
                          setFormStatus("Milking");
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        formType === type
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-xl block">
                        {type === "Cow" ? "🐄" : type === "Buffalo" ? "🐃" : type === "Bullock" ? "🐂" : "🐐"}
                      </span>
                      <span className="text-xs font-bold mt-1 block">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Breed Name with Suggestions */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.breedLabel}
                </label>
                <input
                  type="text"
                  value={formBreed}
                  onChange={(e) => setFormBreed(e.target.value)}
                  placeholder="e.g. Gir, Murrah, Khillari, Osmanabadi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
                />
                {/* Suggestions chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-400 font-medium">Quick Select:</span>
                  {breedSuggestions[formType].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormBreed(b)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors cursor-pointer"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Headcount and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.countLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formCount}
                    onChange={(e) => setFormCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.purposeStatusLabel}
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(e.target.value as "Milking" | "Dry" | "Working" | "Calf")
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
                  >
                    <option value="Milking">{t.statusMilking}</option>
                    <option value="Dry">{t.statusDry}</option>
                    <option value="Working">{t.statusWorking}</option>
                    <option value="Calf">{t.statusCalf}</option>
                  </select>
                </div>
              </div>

              {/* 4. Milk Output (if Milking) & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formStatus === "Milking" ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.milkYieldInputLabel}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      step="0.5"
                      value={formMilkYield}
                      onChange={(e) => setFormMilkYield(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Usage Note
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
                      {formStatus === "Working"
                        ? "Used for farm ploughing & cart transport"
                        : formStatus === "Dry"
                        ? "Currently dry / gestation period"
                        : "Growing calf"}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.ageInputLabel}
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    max={25}
                    step="0.5"
                    value={formAge}
                    onChange={(e) => setFormAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
                  />
                </div>
              </div>

              {/* 5. Ear Tag / Pashu Aadhaar */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.tagInputLabel}
                </label>
                <input
                  type="text"
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  placeholder="e.g. IN-MH-2026-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-mono text-xs"
                />
              </div>

              {/* 6. Vaccination Section */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formVaccinated}
                    onChange={(e) => setFormVaccinated(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {t.vaccinationCheckboxLabel}
                  </span>
                </label>

                {formVaccinated && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.vaccineNameInputLabel}
                    </label>
                    <input
                      type="text"
                      value={formVaccineDetails}
                      onChange={(e) => setFormVaccineDetails(e.target.value)}
                      placeholder="e.g. FMD & Brucellosis administered, valid till Dec 2026"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* 7. Remarks / Health Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.remarksInputLabel}
                </label>
                <textarea
                  rows={2}
                  value={formRemarks}
                  onChange={(e) => setFormRemarks(e.target.value)}
                  placeholder="Health observations, special feed, calving history..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs"
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="save-cattle-submit-btn"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{modalMode === "add" ? t.addRecordBtn : t.saveChangesBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
