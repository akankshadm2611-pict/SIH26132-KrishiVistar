import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Umbrella,
  Landmark,
  FileCheck2,
  AlertTriangle,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  X,
  FileText,
  PlusCircle,
  Building,
  Camera,
  BookOpen,
  RefreshCw,
  Info,
  Video,
  Upload,
  Sparkles,
  Layers,
  MapPin,
  Check,
  ArrowLeft,
  ArrowRight,
  Table,
  AlertCircle,
  Sprout,
} from "lucide-react";
import {
  TransactionOrder,
  GovtCalamityClaimRecord,
  GeotaggedPhotoData,
  SubmittedDocumentItem,
  OfficeAppointmentPass,
} from "../../types";
import { Language, translations } from "../../translations";
import { initialCalamityClaims } from "../../mockData";
import { GeotaggedCameraCapture } from "./GeotaggedCameraCapture";
import { PmfbyHelplineModal } from "./PmfbyHelplineModal";
import { CalamityOfficeAppointmentModal } from "./CalamityOfficeAppointmentModal";
import { CalamityUserManualModal } from "./CalamityUserManualModal";
import { SdrfNormsModal } from "./SdrfNormsModal";
import { EPanchnamaRegistrationForm } from "./EPanchnamaRegistrationForm";
import { SDRF_CATEGORIES, SdrfItemCategory, SdrfSubOption } from "../../data/sdrfNorms";
import { AiGovtSchemeEngine } from "./AiGovtSchemeEngine";
import farmerSunriseGovtBg from "../../assets/images/farmer_sunrise_govt_1789932408810.jpg";

interface FarmerCalamityRefundProps {
  orders?: TransactionOrder[];
  currentLang?: Language;
  onNavigateToFinance?: () => void;
}

const tCalamity = {
  mr: {
    portalBadge: "शासकीय योजना, आपत्ती भरपाई व अधिकृत पोर्टल (AI-Powered)",
    mainTitle: "शासकीय योजना व नुकसान भरपाई (AI शोध व ई-पंचनामा)",
    subtitle:
      "भारतीय शासकीय अधिकृत पोर्टल (PMFBY, महाडीबीटी, SDRF) वरील योजना शोध, थेट अर्ज, ई-पंचनामा नोंदणी आणि अहवाल स्थिती ट्रॅकिंग.",
    totalReports: "एकूण नोंदवलेले ई-पंचनामे",
    approvedReports: "मंजूर अहवाल (VK जनरेट)",
    activeSurveys: "सुरू असलेले पंचनामे",
    aadhaarStatus: "बँक आधार सीडिंग स्थिती",
    aadhaarStatusVal: "सक्रिय व प्रमाणित (NPCI Seeded ✓)",
    helplineText: "आपत्ती २४x७ शेतकरी मदत कक्ष: १४४४७ (PMFBY) / १८००-१८०-१५५१ (टोल-फ्री)",

    // Tabs
    tabAiScheme: "१. शासकीय योजना शोध (AI Engine)",
    tabLedger: "२. अहवाल व स्थिती",
    tabGuide: "३. प्रक्रिया मार्गदर्शक",
    tabUserManual: "४. नियम पुस्तिका",

    // Table Headers
    thClaimId: "अहवाल क्र. व दिनांक",
    thVkNumber: "VK क्रमांक (VK Number)",
    thCropLot: "पीक, वाण व गट/सर्व्हे क्र.",
    thCalamityType: "नैसर्गिक आपत्ती व दिनांक",
    thSurvey: "नुकसान क्षेत्र व टक्केवारी",
    thDbtStatus: "अहवाल स्थिती (Report Status)",
    thSanctionSlip: "तपशील व कृती",

    // Actions & Form
    fileNewClaimBtn: "नवीन ई-पंचनामा नोंदवा",
    reportCalamityTitle: "अचानक उद्भवलेली नैसर्गिक आपत्ती पीक नुकसान नोंदवा (ई-पंचनामा)",
    reportCalamitySub:
      "अवकाळी पाऊस किंवा गारपीट झाल्यानंतर ७२ तासांच्या आत महसूल मंडळ, तालुका कृषी कार्यालय व विमा कंपनीकडे थेट डिजिटल ई-पंचनामा दाखल करा.",
    aadhaarCardLabel: "आधार कार्ड क्रमांक व प्रत",
    aadhaarMobileLabel: "आधारशी जोडलेला मोबाईल क्रमांक",
    sevenTwelveLabel: "७/१२ उतारा (सातबारा)",
    eightALabel: "८-अ खाते उतारा (लागू असल्यास)",
    bankPassbookLabel: "बँक पासबुक प्रत (ओळख पडताळणी)",
    aadhaarSeedingLabel: "बँक खात्याची आधार संलग्न/सीडिंग स्थिती",
    gatSurveyLabel: "जमीन / गट किंवा सर्व्हे क्रमांक",
    cropDetailsLabel: "नुकसान झालेल्या पिकाचा सविस्तर तपशील",
    damagedAreaLabel: "अंदाजे नुकसान क्षेत्र",
    fieldMediaLabel: "पिकांचे शेतात स्पष्ट दिसणारे फोटो व व्हिडिओ पुरावे",
    calamityDetailsLabel: "नैसर्गिक आपत्तीचा प्रकार, दिनांक व सविस्तर माहिती",
    submitClaimBtn: "ई-पंचनामा अर्ज सादर करा (Submit e-Panchnama)",
    claimSuccessMsg: "आपला ई-पंचनामा अर्ज यशस्वीरीत्या दाखल झाला! तपासणीनंतर VK क्रमांक स्वयंचलित जनरेट होईल.",

    // Details Modal
    sanctionTitle: "महाराष्ट्र शासन व कृषी विभाग - ई-पंचनामा अहवाल व मंजुरी आदेश",
    sanctionSubtitle: "नैसर्गिक आपत्ती निवारण व प्रधानमंत्री पीक विमा योजना (PMFBY)",
    govOrderNo: "मंजुरी आदेश क्र.:",
    claimantFarmer: "शेतकरी नाव व आधार:",
    lossAssessment: "नुकसान पाहणी पंचनामा:",
    surveyorName: "तपासणी अधिकारी:",
    disasterType: "आपत्ती तपशील:",
    sanctionDateLabel: "मंजुरी दिनांक:",
    downloadSanctionPdf: "ई-पंचनामा प्रत (PDF) डाउनलोड करा",
    closeBtn: "बंद करा",
    downloadedAlert: "शासकीय ई-पंचनामा अहवाल PDF सेव्ह झाली!",

    // Guide
    guideStep1Title: "१. ई-पंचनामा ऑनलाइन नोंदणी",
    guideStep1Desc: "७२ तासांच्या आत शेतातील फोटो, ७/१२, आधार व गट क्रमांकासह थेट अर्ज भरा.",
    guideStep2Title: "२. तालुका कृषी अधिकारी व तलाठी प्रत्यक्ष पाहणी",
    guideStep2Desc: "GPS व प्रत्यक्ष पाहणीद्वारे शेतातील नुकसानीची टक्केवारी निश्चित केली जाते.",
    guideStep3Title: "३. मंजुरी व स्वयंचलित VK क्रमांक जनरेशन",
    guideStep3Desc: "अहवाल मंजूर होताच अधिकृत VK क्रमांक स्वयंचलित जनरेट होऊन पोर्टलवर उपलब्ध होतो.",
    guideStep4Title: "४. थेट मदत व विमा लाभ वितरण",
    guideStep4Desc: "कोणत्याही मध्यस्थाशिवाय आधार-संलग्न प्रणालीद्वारे अधिकृत मंजुरी प्रक्रिया पूर्ण होते.",
  },
  hi: {
    portalBadge: "सरकारी योजना, आपदा राहत एवं आधिकारिक पोर्टल (AI-Powered)",
    mainTitle: "सरकारी योजना एवं आपदा राहत (AI खोज व ई-पंचनामा)",
    subtitle:
      "भारतीय सरकारी आधिकारिक पोर्टल (PMFBY, MahaDBT, SDRF) से योजनाएं खोजें, सीधा आवेदन करें, ई-पंचनामा दर्ज करें और रिपोर्ट स्थिति ट्रैक करें।",
    totalReports: "कुल दर्ज ई-पंचनामा",
    approvedReports: "स्वीकृत रिपोर्ट (VK जनरेट)",
    activeSurveys: "सक्रिय पंचनामा / सर्वे",
    aadhaarStatus: "बैंक आधार सीडिंग स्थिति",
    aadhaarStatusVal: "सक्रिय व सत्यापित (NPCI Seeded ✓)",
    helplineText: "आपदा 24x7 किसान हेल्पलाइन: 14447 (PMFBY) / 1800-180-1551 (टोल-फ्री)",

    tabAiScheme: "1. सरकारी योजना खोज (AI Engine)",
    tabLedger: "2. रिपोर्ट व स्थिति",
    tabGuide: "3. प्रक्रिया गाइड",
    tabUserManual: "4. नियम पुस्तिका",

    thClaimId: "रिपोर्ट आईडी व दिनांक",
    thVkNumber: "VK क्रमांक (VK Number)",
    thCropLot: "फसल, किस्म व खसरा/गट संख्या",
    thCalamityType: "आपदा का प्रकार व दिनांक",
    thSurvey: "नुकसान क्षेत्र व प्रतिशत",
    thDbtStatus: "रिपोर्ट स्थिति (Report Status)",
    thSanctionSlip: "विवरण व कार्रवाई",

    fileNewClaimBtn: "नया ई-पंचनामा दर्ज करें",
    reportCalamityTitle: "प्राकृतिक आपदा फसल नुकसान दर्ज करें (ई-पंचनामा)",
    reportCalamitySub:
      "बेमौसम बारिश या ओलावृष्टि के 72 घंटे के भीतर स्थानीय कृषि कार्यालय, राजस्व अधिकारी और बीमा कंपनी को ऑनलाइन ई-पंचनामा भेजें।",
    aadhaarCardLabel: "आधार कार्ड संख्या व प्रति",
    aadhaarMobileLabel: "आधार से जुड़ा मोबाइल नंबर",
    sevenTwelveLabel: "7/12 खतौनी / सातबारा",
    eightALabel: "8-A खाता उद्धरण (यदि लागू हो)",
    bankPassbookLabel: "बैंक पासबुक प्रति (पहचान सत्यापन)",
    aadhaarSeedingLabel: "बैंक खाते की आधार सीडिंग स्थिति",
    gatSurveyLabel: "भूमि / गट अथवा खसरा/सर्वे संख्या",
    cropDetailsLabel: "क्षतिग्रस्त फसल का विवरण",
    damagedAreaLabel: "अनुमानित प्रभावित क्षेत्र",
    fieldMediaLabel: "खेत में स्पष्ट दिखने वाले फोटो व वीडियो साक्ष्य",
    calamityDetailsLabel: "आपदा का विवरण, दिनांक एवं स्थिति",
    submitClaimBtn: "ई-पंचनामा जमा करें (Submit e-Panchnama)",
    claimSuccessMsg: "आपका ई-पंचनामा दर्ज हुआ! अनुमोदन के बाद VK क्रमांक स्वतः जनरेट होगा।",

    sanctionTitle: "कृषि विभाग - ई-पंचनामा रिपोर्ट एवं स्वीकृति आदेश",
    sanctionSubtitle: "प्राकृतिक आपदा राहत कोष एवं प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    govOrderNo: "मंजूरी आदेश क्र.:",
    claimantFarmer: "लाभार्थी किसान व आधार:",
    lossAssessment: "नुकसान सर्वे पंचनामा:",
    surveyorName: "निरीक्षण अधिकारी:",
    disasterType: "आपदा विवरण:",
    sanctionDateLabel: "मंजूरी दिनांक:",
    downloadSanctionPdf: "ई-पंचनामा रिपोर्ट PDF डाउनलोड करें",
    closeBtn: "बंद करें",
    downloadedAlert: "सरकारी ई-पंचनामा रिपोर्ट PDF सहेजी गई!",

    guideStep1Title: "1. 72 घंटे में ई-पंचनामा दर्ज करें",
    guideStep1Desc: "खेत के फोटो, 7/12, आधार व खसरा संख्या के साथ तुरंत डिजिटल रिपोर्ट सबमिट करें।",
    guideStep2Title: "2. कृषि अधिकारी व तलाठी द्वारा स्थलीय निरीक्षण",
    guideStep2Desc: "जीपीएस टैगिंग व फील्ड जांच द्वारा वास्तविक क्षति प्रतिशत तय किया जाता है।",
    guideStep3Title: "3. स्वीकृति व स्वतः VK नंबर निर्माण",
    guideStep3Desc: "रिपोर्ट स्वीकृत होते ही आधिकारिक VK क्रमांक स्वतः तैयार होकर दिखाई देगा।",
    guideStep4Title: "4. पारदर्शी स्थिति ट्रैकिंग",
    guideStep4Desc: "बिना किसी बिचौलिए के पारदर्शी डिजिटल रिपोर्टिंग व्यवस्था।",
  },
  en: {
    portalBadge: "GOVERNMENT SCHEMES & CALAMITY RELIEF PORTAL (AI-POWERED)",
    mainTitle: "Government Schemes, Relief & e-Panchnama",
    subtitle:
      "AI-driven matching with official Indian Government schemes (PMFBY, MahaDBT, SDRF, Agricoop), direct portal form submission, digital e-Panchnama filing, and real-time status tracking.",
    totalReports: "Total e-Panchnamas Filed",
    approvedReports: "Approved Reports (VK Generated)",
    activeSurveys: "Active Field Surveys",
    aadhaarStatus: "Bank Aadhaar Seeding Status",
    aadhaarStatusVal: "Active & Verified (NPCI Seeded ✓)",
    helplineText: "Disaster 24x7 Helpline: 14447 (PMFBY Toll-Free) / 1800-180-1551",

    tabAiScheme: "1. AI Scheme Engine",
    tabLedger: "2. Reports & Status",
    tabGuide: "3. Process Guide",
    tabUserManual: "4. User Manual",

    thClaimId: "Report ID & Date",
    thVkNumber: "VK Number (Auto-Generated)",
    thCropLot: "Crop, Variety & Land/Gat No.",
    thCalamityType: "Calamity Event & Date",
    thSurvey: "Damaged Area & Loss %",
    thDbtStatus: "Report Status",
    thSanctionSlip: "Details & Action",

    fileNewClaimBtn: "File New e-Panchnama",
    reportCalamityTitle: "Report Calamity Crop Damage (e-Panchnama)",
    reportCalamitySub:
      "Per PMFBY & SDRF norms, submit crop damage details within 72 hours with mandatory documents and field photos/videos for official verification and VK Number generation.",
    aadhaarCardLabel: "Aadhaar Card Number & Document",
    aadhaarMobileLabel: "Mobile Number Linked with Aadhaar",
    sevenTwelveLabel: "7/12 Extract (सातबारा उतारा)",
    eightALabel: "8-A Extract (८-अ उतारा, if applicable)",
    bankPassbookLabel: "Bank Passbook Copy (Identity Proof)",
    aadhaarSeedingLabel: "Aadhaar-Linked / Seeding Status of Bank Account",
    gatSurveyLabel: "Land / Survey / Gat Number",
    cropDetailsLabel: "Details of the Damaged Crop",
    damagedAreaLabel: "Approximate Damaged Area",
    fieldMediaLabel: "Photographs / Videos of Damaged Crop (Showing Field Clearly)",
    calamityDetailsLabel: "Natural Calamity Details & Date of Damage",
    submitClaimBtn: "Submit e-Panchnama Online",
    claimSuccessMsg: "Your e-Panchnama crop damage report has been successfully lodged! VK Number will be auto-generated upon official approval.",

    sanctionTitle: "Government Agriculture Department - Official e-Panchnama Report",
    sanctionSubtitle: "Natural Calamity Relief Assessment & PMFBY Crop Protection Record",
    govOrderNo: "Sanction / Order Ref:",
    claimantFarmer: "Claimant Farmer & Aadhaar:",
    lossAssessment: "Survey / Panchnama Report:",
    surveyorName: "Inspecting Officer:",
    disasterType: "Calamity Incident:",
    sanctionDateLabel: "Sanction Date:",
    downloadSanctionPdf: "Download e-Panchnama Report (PDF)",
    closeBtn: "Close",
    downloadedAlert: "Official e-Panchnama report copy downloaded.",

    guideStep1Title: "1. 72-Hour Rapid Intimation",
    guideStep1Desc: "Submit e-Panchnama with Aadhaar, 7/12, gat number, and clear field photos/videos.",
    guideStep2Title: "2. Joint Field Spot Panchnama",
    guideStep2Desc: "Taluka Agriculture Officer, Talathi, and Insurance surveyor verify field damage.",
    guideStep3Title: "3. Approval & Auto VK Number Generation",
    guideStep3Desc: "Once approved, a unique official VK Number (VK-MH-2026-XXXXX) is generated instantly.",
    guideStep4Title: "4. Real-Time Status Transparency",
    guideStep4Desc: "Direct tracking of report progression without third-party intervention.",
  },
};

export const FarmerCalamityRefund: React.FC<FarmerCalamityRefundProps> = ({
  orders = [],
  currentLang = "en",
  onNavigateToFinance,
}) => {
  const t = tCalamity[currentLang] || tCalamity.en;

  const [claims, setClaims] = useState<GovtCalamityClaimRecord[]>(initialCalamityClaims);
  // Default to AI Government Scheme Engine as requested by user
  const [activeSubTab, setActiveSubTab] = useState<"scheme_ai" | "form" | "ledger" | "guide" | "manual">("scheme_ai");
  const [selectedClaim, setSelectedClaim] = useState<GovtCalamityClaimRecord | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "survey" | "rejected" | "appeal"
  >("all");
  const [isSubmissionSuccessModalOpen, setIsSubmissionSuccessModalOpen] = useState(false);

  // Modals
  const [isPmfbyHelplineOpen, setIsPmfbyHelplineOpen] = useState(false);
  const [isUserManualOpen, setIsUserManualOpen] = useState(false);
  const [appointmentClaim, setAppointmentClaim] = useState<GovtCalamityClaimRecord | null>(null);

  // e-Panchnama Required Fields State:
  // 1. Aadhaar Card
  const [formAadhaar, setFormAadhaar] = useState("8492-3011-9402");
  const [aadhaarFile, setAadhaarFile] = useState<string | null>("Aadhaar_Card_Front_Back.pdf");

  // 2. Mobile number linked with Aadhaar
  const [formAadhaarMobile, setFormAadhaarMobile] = useState("98221 48190");

  // 3. 7/12 extract (सातबारा)
  const [sevenTwelveFile, setSevenTwelveFile] = useState<string | null>("7-12_Extract_Janori_Gat42B.pdf");

  // 4. 8-A extract, if applicable
  const [hasEightA, setHasEightA] = useState(true);
  const [eightAFile, setEightAFile] = useState<string | null>("8-A_KhataExtract_No118.pdf");

  // 5. Bank passbook
  const [bankPassbookFile, setBankPassbookFile] = useState<string | null>("Bank_Passbook_Front_Copy.jpg");

  // 6. Aadhaar-linked/seeding status of bank account
  const [aadhaarSeedingStatus, setAadhaarSeedingStatus] = useState(
    "Aadhaar Seeded & Active on NPCI (आधार संलग्न व NPCI वर सक्रिय ✓)"
  );

  // 7. Land/survey/gat number
  const [formGatNumber, setFormGatNumber] = useState("Gat No. 42/B, Survey No. 118");
  const [formTaluka, setFormTaluka] = useState("Dindori, Nashik");
  const [formVillage, setFormVillage] = useState("Janori");

  // 8. Details of the damaged crop
  const [formCrop, setFormCrop] = useState("Tomato (Hybrid)");
  const [formCropVariety, setFormCropVariety] = useState("Abhinav F1 Hybrid (Syngenta)");
  const [formCropStage, setFormCropStage] = useState("Flowering & Fruit Setting Stage (५० दिवस)");

  // 9. Approximate damaged area
  const [formDamagedAreaVal, setFormDamagedAreaVal] = useState("2.5");
  const [formDamagedAreaUnit, setFormDamagedAreaUnit] = useState<"Acres" | "Hectares" | "Gunthas">("Acres");

  // 10. Photographs/videos of the damaged crop, preferably showing the field clearly
  const [geotaggedPhoto, setGeotaggedPhoto] = useState<GeotaggedPhotoData | null>(null);
  const [fieldMediaList, setFieldMediaList] = useState<
    { name: string; type: "photo" | "video"; size: string }[]
  >([
    { name: "Field_Damage_WideView_Gat42.jpg", type: "photo", size: "3.2 MB" },
    { name: "Crop_Stem_Breakage_Closeup.jpg", type: "photo", size: "2.8 MB" },
    { name: "Field_Waterlogging_30sec.mp4", type: "video", size: "14.5 MB" },
  ]);

  // 11. Details of the natural calamity and date of damage
  const [formCalamity, setFormCalamity] = useState("Unseasonal Hailstorm & Cloudburst");
  const [formDateOfDamage, setFormDateOfDamage] = useState("2026-09-15");
  const [formCalamityDetails, setFormCalamityDetails] = useState(
    "Unseasonal torrential cloudburst accompanied by severe 20-30mm hailstones lasting for 45 minutes. Caused heavy stem breakage, flower drop, and 1.5-foot standing waterlogging across the field."
  );

  const [formLossPercent, setFormLossPercent] = useState(65);
  const [formSuccessClaim, setFormSuccessClaim] = useState<GovtCalamityClaimRecord | null>(null);
  const [activeStepHelp, setActiveStepHelp] = useState<string | null>(null);

  // Step Navigation State (1: Personal Details, 2: Land Details, 3: Damage Details, 4: Calamity Details, 5: Documents Upload, 6: Review & Submit)
  const [currentFormStep, setCurrentFormStep] = useState<number>(1);
  const [stepValidationError, setStepValidationError] = useState<string | null>(null);

  // SDRF Assistance Categories State (From SDRF Norms Table)
  const [sdrfCategoryId, setSdrfCategoryId] = useState<string>("crop_damage");
  const [sdrfSubOptionId, setSdrfSubOptionId] = useState<string>("crop_irrigated");
  const [sdrfUnitsCount, setSdrfUnitsCount] = useState<number>(1);
  const [isSdrfNormsModalOpen, setIsSdrfNormsModalOpen] = useState<boolean>(false);

  // Retrieve selected SDRF item & sub-option
  const currentSdrfCategory =
    SDRF_CATEGORIES.find((c) => c.id === sdrfCategoryId) || SDRF_CATEGORIES[0];
  const currentSdrfSubOption =
    currentSdrfCategory.options.find((o) => o.id === sdrfSubOptionId) ||
    currentSdrfCategory.options[0];

  // Convert damaged area to hectares for SDRF calculation
  const damagedAreaNum = parseFloat(formDamagedAreaVal) || 0;
  let areaInHectares = 0;
  if (formDamagedAreaUnit === "Hectares") {
    areaInHectares = damagedAreaNum;
  } else if (formDamagedAreaUnit === "Acres") {
    areaInHectares = damagedAreaNum * 0.404686;
  } else {
    // Gunthas (1 Guntha = 0.010117 Ha)
    areaInHectares = damagedAreaNum * 0.010117;
  }

  // Calculated SDRF Relief Assistance
  let calculatedSdrfAssistance = 0;
  if (sdrfCategoryId === "crop_damage" || sdrfCategoryId === "agri_land_damage") {
    // Capped at 2 hectares per SDRF rules: "(up to 2 hectares)"
    const eligibleHectares = Math.min(areaInHectares, 2);
    calculatedSdrfAssistance = Math.round(eligibleHectares * currentSdrfSubOption.ratePerUnit);
  } else {
    // Per unit count (e.g. per animal, per house, per shed, etc.)
    calculatedSdrfAssistance = Math.round(sdrfUnitsCount * currentSdrfSubOption.ratePerUnit);
  }

  // Step Validation logic: "unless the first step is completed don't jump to next step"
  const validateStep = (step: number): { valid: boolean; error?: string } => {
    if (step === 1) {
      const cleanAadhaar = formAadhaar.replace(/\D/g, "");
      if (cleanAadhaar.length < 12) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया पायरी १ पूर्ण करा: आपला वैध १२-अंकी आधार कार्ड क्रमांक प्रविष्ट करा."
              : "Please complete Step 1: Enter your valid 12-digit Aadhaar Card number.",
        };
      }
      const cleanMobile = formAadhaarMobile.replace(/\D/g, "");
      if (cleanMobile.length < 10) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया पायरी १ पूर्ण करा: आधारशी जोडलेला १०-अंकी मोबाईल क्रमांक प्रविष्ट करा."
              : "Please complete Step 1: Enter a valid 10-digit mobile number linked with Aadhaar.",
        };
      }
      if (!aadhaarSeedingStatus) {
        return {
          valid: false,
          error: "Please select Aadhaar bank account seeding status.",
        };
      }
      return { valid: true };
    }

    if (step === 2) {
      if (!formGatNumber.trim()) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया पायरी २ पूर्ण करा: जमीन / गट किंवा सर्व्हे क्रमांक प्रविष्ट करा."
              : "Please complete Step 2: Enter Land / Survey / Gat Number.",
        };
      }
      if (!formVillage.trim()) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया गावाचे नाव प्रविष्ट करा."
              : "Please enter village name.",
        };
      }
      if (!formTaluka.trim()) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया तालुका आणि जिल्हा प्रविष्ट करा."
              : "Please enter taluka and district.",
        };
      }
      if (!sevenTwelveFile) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया ७/१२ उतारा (सातबारा) प्रत जोडा."
              : "Please attach 7/12 Extract (सातबारा) document copy.",
        };
      }
      return { valid: true };
    }

    if (step === 3) {
      if (!formDamagedAreaVal || parseFloat(formDamagedAreaVal) <= 0) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया पायरी ३ पूर्ण करा: नुकसान झालेले क्षेत्र (Area) प्रविष्ट करा."
              : "Please complete Step 3: Enter approximate damaged area greater than 0.",
        };
      }
      if (sdrfCategoryId === "crop_damage") {
        if (!formCrop.trim()) {
          return {
            valid: false,
            error: "Please select damaged crop.",
          };
        }
        if (!formCropVariety.trim()) {
          return {
            valid: false,
            error: "Please specify crop variety / hybrid.",
          };
        }
      }
      return { valid: true };
    }

    if (step === 4) {
      if (!formCalamity.trim()) {
        return {
          valid: false,
          error: "Please select calamity type.",
        };
      }
      if (!formDateOfDamage) {
        return {
          valid: false,
          error: "Please specify exact date of damage.",
        };
      }
      if (!formCalamityDetails.trim() || formCalamityDetails.trim().length < 10) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया नैसर्गिक आपत्तीचे सविस्तर वर्णन (किमान १० अक्षरे) लिहा."
              : "Please provide natural calamity observations description (min 10 characters).",
        };
      }
      return { valid: true };
    }

    if (step === 5) {
      if (fieldMediaList.length === 0 && !geotaggedPhoto) {
        return {
          valid: false,
          error:
            currentLang === "mr"
              ? "कृपया पायरी ५ पूर्ण करा: शेतात स्पष्ट दिसणारा किमान एक फोटो किंवा व्हिडिओ पुरावा जोडा."
              : "Please complete Step 5: Attach at least one clear photograph or video showing the field clearly.",
        };
      }
      if (!bankPassbookFile) {
        return {
          valid: false,
          error: "Please attach bank passbook copy for identity verification.",
        };
      }
      return { valid: true };
    }

    return { valid: true };
  };

  const handleNextStep = () => {
    const check = validateStep(currentFormStep);
    if (!check.valid) {
      setStepValidationError(
        check.error || "Please complete all required fields in this step before proceeding."
      );
      return;
    }
    setStepValidationError(null);
    setCurrentFormStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setStepValidationError(null);
    setCurrentFormStep((prev) => Math.max(prev - 1, 1));
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep <= currentFormStep) {
      setStepValidationError(null);
      setCurrentFormStep(targetStep);
      return;
    }
    // Check all previous steps before jumping forward!
    for (let s = 1; s < targetStep; s++) {
      const check = validateStep(s);
      if (!check.valid) {
        setStepValidationError(
          check.error || `Please complete Step ${s} before jumping forward.`
        );
        return;
      }
    }
    setStepValidationError(null);
    setCurrentFormStep(targetStep);
  };

  // Counts for status
  const totalReportsCount = claims.length;
  const pendingCount = claims.filter((c) => c.status === "Pending").length;
  const approvedCount = claims.filter(
    (c) => c.status === "Approved" || c.status === "Approved (Transfer in 24h)"
  ).length;
  const activeSurveysCount = claims.filter(
    (c) => c.status === "Field Survey Underway" || c.status === "Claim Lodged"
  ).length;
  const rejectedCount = claims.filter((c) => c.status === "Rejected").length;

  // Auto-generate VK Number on approval
  const handleApproveAndGenerateVk = (claimId: string) => {
    const autoVk = `VK-MH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? {
              ...c,
              status: "Approved",
              vkNumber: autoVk,
              sanctionDate: "Today (Sep 16, 2026)",
            }
          : c
      )
    );
    if (selectedClaim?.id === claimId) {
      setSelectedClaim((prev) =>
        prev
          ? {
              ...prev,
              status: "Approved",
              vkNumber: autoVk,
              sanctionDate: "Today (Sep 16, 2026)",
            }
          : null
      );
    }
  };

  // Direct Online Submission handler for e-Panchnama
  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();

    // Final check on all steps
    for (let s = 1; s <= 5; s++) {
      const check = validateStep(s);
      if (!check.valid) {
        setCurrentFormStep(s);
        setStepValidationError(check.error || `Please complete Step ${s}.`);
        return;
      }
    }

    const newClaim: GovtCalamityClaimRecord = {
      id: "CLM-MH-" + Math.floor(1000 + Math.random() * 9000),
      // VK Number will be auto-generated once approved
      vkNumber: undefined,
      sdrfItemNumber: currentSdrfCategory.srNo,
      sdrfCategory: currentSdrfCategory.title,
      sdrfSubCategory: currentSdrfSubOption.label,
      sdrfAssistanceRateText: currentSdrfSubOption.criteriaText,
      sdrfCalculatedAmount: calculatedSdrfAssistance,
      crop: sdrfCategoryId === "crop_damage" ? formCrop : currentSdrfCategory.title,
      cropVariety: sdrfCategoryId === "crop_damage" ? formCropVariety : currentSdrfSubOption.label,
      cropStage: sdrfCategoryId === "crop_damage" ? formCropStage : "Direct Assessment",
      district: formTaluka.includes("Pune") ? "Pune" : "Nashik",
      taluka: formTaluka.split(",")[0].trim(),
      village: formVillage,
      gatNumber: formGatNumber,
      damagedArea: `${formDamagedAreaVal} ${formDamagedAreaUnit} (${areaInHectares.toFixed(2)} Ha)`,
      calamityType: formCalamity,
      calamityDetails: formCalamityDetails,
      dateOfDamage: formDateOfDamage,
      eventDate: formDateOfDamage,
      surveyorOfficer: "Taluka Krishi Adhikari & Revenue Inspection Desk",
      lossPercentage: formLossPercent,
      assessedDamageValue: calculatedSdrfAssistance,
      approvedRefundAmount: calculatedSdrfAssistance,
      status: "Pending", // Set to Pending status as requested
      schemeName: "Pradhan Mantri Fasal Bima Yojana (PMFBY) & State SDRF",
      supportHelpline: "14447 (PMFBY Toll Free)",
      surveyReportNumber: "EPANCHNAMA-MH-" + Math.floor(1000 + Math.random() * 9000),
      aadhaarNumber: formAadhaar,
      aadhaarMobile: formAadhaarMobile,
      aadhaarSeedingStatus: aadhaarSeedingStatus,
      hasSevenTwelveExtract: Boolean(sevenTwelveFile),
      sevenTwelveDocName: sevenTwelveFile || undefined,
      hasEightAExtract: hasEightA,
      eightAExtractDocName: hasEightA ? eightAFile || undefined : undefined,
      hasBankPassbook: Boolean(bankPassbookFile),
      bankPassbookDocName: bankPassbookFile || undefined,
      fieldMediaFiles: fieldMediaList,
      geotaggedPhoto: geotaggedPhoto || undefined,
      assignedAgencies: {
        localAgriOffice: `Taluka Krishi Adhikari Karyalaya (${formTaluka.split(",")[0].trim()})`,
        revenueOfficer: `Circle Revenue Officer / Talathi (${formVillage})`,
        insuranceCompany: "Agriculture Insurance Company of India (AIC) - PMFBY Empaneled",
      },
      suggestedSteps: [
        "DO NOT clear, harvest, or disturb the damaged field for 48-72 hours so spot e-panchnama can be conducted.",
        "Keep your original 7/12 extract, 8-A certificate, and Aadhaar card accessible for verification.",
        "Once your field inspection is verified and approved, an official VK Number (उदा. VK-MH-2026-XXXXX) will be automatically generated.",
      ],
    };

    setClaims((prev) => [newClaim, ...prev]);
    setFormSuccessClaim(newClaim);
    setIsSubmissionSuccessModalOpen(true);
    setStepValidationError(null);
  };

  const handleUpdateAppointment = (updatedClaim: GovtCalamityClaimRecord) => {
    setClaims((prev) => prev.map((c) => (c.id === updatedClaim.id ? updatedClaim : c)));
    if (selectedClaim?.id === updatedClaim.id) {
      setSelectedClaim(updatedClaim);
    }
  };

  const handleAddMedia = () => {
    const simulatedFiles = [
      { name: "Field_Damage_Survey_North.jpg", type: "photo" as const, size: "3.5 MB" },
      { name: "Field_Furrow_Flooding_Clip.mp4", type: "video" as const, size: "18.2 MB" },
      { name: "Damaged_Crop_Roots_Exposed.jpg", type: "photo" as const, size: "2.9 MB" },
    ];
    const pick = simulatedFiles[fieldMediaList.length % simulatedFiles.length];
    setFieldMediaList([...fieldMediaList, pick]);
  };

  const handleRemoveMedia = (index: number) => {
    setFieldMediaList(fieldMediaList.filter((_, idx) => idx !== index));
  };

  const filteredClaims = claims.filter((claim) => {
    if (statusFilter === "pending") return claim.status === "Pending";
    if (statusFilter === "approved")
      return claim.status === "Approved" || claim.status === "Approved (Transfer in 24h)";
    if (statusFilter === "survey")
      return claim.status === "Field Survey Underway" || claim.status === "Claim Lodged";
    if (statusFilter === "rejected") return claim.status === "Rejected";
    if (statusFilter === "appeal") return claim.status === "Appeal Scheduled";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Calamity Relief & e-Panchnama Banner with Farmer Sunrise Background Image */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-400/40 shadow-2xl relative overflow-hidden group">
        {/* Background Image: Farmer standing in green fields at sunrise */}
        <img
          src={farmerSunriseGovtBg}
          alt="Scenic fertile Indian agricultural fields with farmer at sunrise"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-1000 ease-out group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Atmospheric Gradient Overlays: Keeps the farm sunrise bright and vivid while ensuring 100% crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/65 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-slate-950/20 pointer-events-none z-0" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10 pt-1">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 border border-emerald-400/40 text-emerald-200 text-xs font-bold shadow-xs backdrop-blur-[2px]">
              <Umbrella className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.portalBadge}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.mainTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveSubTab("scheme_ai")}
              id="top-ai-scheme-engine-btn"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98 border border-emerald-400/50 backdrop-blur-xs"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>
                {currentLang === "mr"
                  ? "शासकीय योजना AI शोध"
                  : currentLang === "hi"
                  ? "सरकारी योजना AI खोज"
                  : "AI Scheme Engine"}
              </span>
            </button>

            {/* Farmer User Manual Button */}
            <button
              onClick={() => setIsUserManualOpen(true)}
              id="open-farmer-user-manual-btn"
              className="px-3.5 py-2.5 rounded-xl bg-black/35 hover:bg-black/50 text-white border border-white/30 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs backdrop-blur-[2px]"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>
                {currentLang === "mr"
                  ? "वापरकर्ता मार्गदर्शिका"
                  : "Scheme & Calamity Manual"}
              </span>
            </button>

            {onNavigateToFinance && (
              <button
                onClick={onNavigateToFinance}
                id="view-escrow-finance-btn"
                className="px-3.5 py-2.5 rounded-xl bg-black/35 hover:bg-black/50 text-white border border-white/30 font-bold text-xs transition-colors cursor-pointer shadow-xs backdrop-blur-[2px]"
              >
                <span>{translations[currentLang]?.finance || "Trade Escrow Ledger"}</span>
              </button>
            )}
          </div>
        </div>

        {/* 4-KPI Row: Transparent Cards with Clearly Readable Text */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/20 text-xs relative z-10">
          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] border border-white/25 hover:border-emerald-400/40 rounded-2xl p-4 shadow-md text-white transition-all">
            <span className="text-emerald-300 text-[11px] font-bold block drop-shadow-sm">
              {t.totalReports}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {totalReportsCount}
            </span>
            <span className="text-[10px] text-emerald-200 font-bold flex items-center gap-1 mt-1.5 bg-black/40 px-2 py-0.5 rounded-md w-fit border border-emerald-400/40 backdrop-blur-[2px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Digital e-Panchnama Lodged</span>
            </span>
          </div>

          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] border border-white/25 hover:border-emerald-400/40 rounded-2xl p-4 shadow-md text-white transition-all">
            <span className="text-emerald-300 text-[11px] font-bold block drop-shadow-sm">
              {t.approvedReports}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {approvedCount} {currentLang === "mr" ? "मंजूर" : "Approved"}
            </span>
            <span className="text-[10px] text-amber-200 font-bold flex items-center gap-1 mt-1.5 bg-black/40 px-2 py-0.5 rounded-md w-fit border border-amber-400/40 backdrop-blur-[2px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>VK Numbers Assigned ✓</span>
            </span>
          </div>

          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] border border-white/25 hover:border-emerald-400/40 rounded-2xl p-4 shadow-md text-white transition-all">
            <span className="text-amber-300 text-[11px] font-bold block drop-shadow-sm">
              {t.activeSurveys}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5 block font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {activeSurveysCount} {currentLang === "mr" ? "सुरू" : "In Progress"}
            </span>
            <span className="text-[10px] text-slate-100 mt-1.5 block font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              Taluka Krishi & Insurer Spot Survey
            </span>
          </div>

          <div className="bg-black/25 hover:bg-black/35 backdrop-blur-[2px] border border-white/25 hover:border-emerald-400/40 rounded-2xl p-4 shadow-md text-white flex flex-col justify-between transition-all">
            <div>
              <span className="text-emerald-300 text-[11px] font-bold block drop-shadow-sm">
                {t.aadhaarStatus}
              </span>
              <span className="text-xs font-black text-white mt-0.5 block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                {t.aadhaarStatusVal}
              </span>
            </div>
            <span className="text-[10px] text-emerald-200 font-bold bg-black/40 px-2 py-0.5 rounded-md w-fit mt-1.5 border border-emerald-400/40 backdrop-blur-[2px]">
              UIDAI & NPCI Linked
            </span>
          </div>
        </div>

        {/* Helpline footer strip (Transparent Glass Dock) */}
        <div className="mt-5 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 px-6 sm:px-7 py-3.5 bg-black/35 backdrop-blur-[2px] border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-200 font-medium relative z-10 rounded-b-3xl">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-100 drop-shadow-xs">{t.helplineText}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200 text-xs font-medium">
            <button
              onClick={() => setIsPmfbyHelplineOpen(true)}
              className="text-amber-300 hover:text-amber-200 underline font-bold cursor-pointer transition-colors"
            >
              {currentLang === "mr" ? "तक्रार नोंदवा (14447)" : "PMFBY Grievance Desk"}
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => setIsUserManualOpen(true)}
              className="text-emerald-200 hover:text-white underline font-bold cursor-pointer transition-colors"
            >
              {currentLang === "mr" ? "ई-पंचनामा मार्गदर्शिका" : "e-Panchnama Guidelines"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Subtabs: 5 options including AI Scheme Engine as first */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#eff6ed] p-2.5 rounded-2xl border-2 border-emerald-300/80 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {/* Option 1: AI Scheme Engine (Primary) */}
          <button
            onClick={() => setActiveSubTab("scheme_ai")}
            id="subtab-ai-scheme-engine"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeSubTab === "scheme_ai"
                ? "bg-emerald-700 text-white shadow-xs border border-emerald-500 ring-2 ring-emerald-400/30"
                : "text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 hover:text-emerald-950 border border-emerald-200/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{t.tabAiScheme}</span>
          </button>

          {/* Option 2: Reports and Status */}
          <button
            onClick={() => setActiveSubTab("ledger")}
            id="subtab-calamity-ledger"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeSubTab === "ledger"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>{t.tabLedger}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-mono">
              {claims.length}
            </span>
          </button>

          {/* Option 3: Process Guide */}
          <button
            onClick={() => setActiveSubTab("guide")}
            id="subtab-calamity-guide"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeSubTab === "guide"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.tabGuide}</span>
          </button>

          {/* Option 4: User Manual */}
          <button
            onClick={() => setActiveSubTab("manual")}
            id="subtab-calamity-manual"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeSubTab === "manual"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-300" />
            <span>{t.tabUserManual}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPmfbyHelplineOpen(true)}
            id="subtab-helpline-btn"
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
            <span>24x7 Helpline: 14447 Toll-Free</span>
          </button>
        </div>
      </div>

      {/* Subtab 1: AI Government Scheme & Relief Engine (Matching user flow) */}
      {activeSubTab === "scheme_ai" && (
        <AiGovtSchemeEngine currentLang={currentLang} />
      )}

      {/* Subtab 2: Report Calamity Crop Damage (e-Panchnama) */}
      {activeSubTab === "form" && (
        <EPanchnamaRegistrationForm
          currentLang={currentLang}
          currentStep={currentFormStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onJumpToStep={handleJumpToStep}
          validationError={stepValidationError}
          sdrfCategoryId={sdrfCategoryId}
          setSdrfCategoryId={setSdrfCategoryId}
          sdrfSubOptionId={sdrfSubOptionId}
          setSdrfSubOptionId={setSdrfSubOptionId}
          sdrfUnitsCount={sdrfUnitsCount}
          setSdrfUnitsCount={setSdrfUnitsCount}
          currentSdrfCategory={currentSdrfCategory}
          currentSdrfSubOption={currentSdrfSubOption}
          calculatedSdrfAssistance={calculatedSdrfAssistance}
          areaInHectares={areaInHectares}
          onOpenSdrfNormsModal={() => setIsSdrfNormsModalOpen(true)}
          onOpenUserManual={() => setIsUserManualOpen(true)}
          formAadhaar={formAadhaar}
          setFormAadhaar={setFormAadhaar}
          aadhaarFile={aadhaarFile}
          setAadhaarFile={setAadhaarFile}
          formAadhaarMobile={formAadhaarMobile}
          setFormAadhaarMobile={setFormAadhaarMobile}
          aadhaarSeedingStatus={aadhaarSeedingStatus}
          setAadhaarSeedingStatus={setAadhaarSeedingStatus}
          formGatNumber={formGatNumber}
          setFormGatNumber={setFormGatNumber}
          formTaluka={formTaluka}
          setFormTaluka={setFormTaluka}
          formVillage={formVillage}
          setFormVillage={setFormVillage}
          sevenTwelveFile={sevenTwelveFile}
          setSevenTwelveFile={setSevenTwelveFile}
          hasEightA={hasEightA}
          setHasEightA={setHasEightA}
          eightAFile={eightAFile}
          setEightAFile={setEightAFile}
          bankPassbookFile={bankPassbookFile}
          setBankPassbookFile={setBankPassbookFile}
          formCrop={formCrop}
          setFormCrop={setFormCrop}
          formCropVariety={formCropVariety}
          setFormCropVariety={setFormCropVariety}
          formCropStage={formCropStage}
          setFormCropStage={setFormCropStage}
          formDamagedAreaVal={formDamagedAreaVal}
          setFormDamagedAreaVal={setFormDamagedAreaVal}
          formDamagedAreaUnit={formDamagedAreaUnit}
          setFormDamagedAreaUnit={setFormDamagedAreaUnit}
          formLossPercent={formLossPercent}
          setFormLossPercent={setFormLossPercent}
          formCalamity={formCalamity}
          setFormCalamity={setFormCalamity}
          formDateOfDamage={formDateOfDamage}
          setFormDateOfDamage={setFormDateOfDamage}
          formCalamityDetails={formCalamityDetails}
          setFormCalamityDetails={setFormCalamityDetails}
          geotaggedPhoto={geotaggedPhoto}
          setGeotaggedPhoto={setGeotaggedPhoto}
          fieldMediaList={fieldMediaList}
          onAddMedia={handleAddMedia}
          onRemoveMedia={handleRemoveMedia}
          onSubmitClaim={handleCreateClaim}
          formSuccessClaim={formSuccessClaim}
          onDismissSuccess={() => setFormSuccessClaim(null)}
          onViewReportsAndStatus={() => {
            setIsSubmissionSuccessModalOpen(false);
            setStatusFilter("all");
            setActiveSubTab("ledger");
          }}
        />
      )}

      {/* Subtab 2: e-Panchnama Damage Reports & Status Ledger (NO bank transfers, shows ONLY report status & VK Numbers) */}
      {activeSubTab === "ledger" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t.tabLedger}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentLang === "mr"
                  ? "नोंदवलेल्या ई-पंचनाम्यांची अधिकृत स्थिती, तपासणी अहवाल व स्वयंचलित VK क्रमांक."
                  : "Track official e-Panchnama report status, field inspection findings, and auto-generated VK Numbers."}
              </p>
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium text-[11px] mr-1">Filter:</span>
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All ({claims.length})
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  statusFilter === "pending"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setStatusFilter("approved")}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  statusFilter === "approved"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                Approved (VK Generated) ({approvedCount})
              </button>
              <button
                onClick={() => setStatusFilter("survey")}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  statusFilter === "survey"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                }`}
              >
                In Survey ({activeSurveysCount})
              </button>
              <button
                onClick={() => setStatusFilter("rejected")}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  statusFilter === "rejected"
                    ? "bg-rose-700 text-white"
                    : "bg-rose-50 text-rose-800 hover:bg-rose-100"
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">{t.thClaimId}</th>
                  <th className="p-3">{t.thVkNumber}</th>
                  <th className="p-3">{t.thCropLot}</th>
                  <th className="p-3">{t.thCalamityType}</th>
                  <th className="p-3">{t.thSurvey}</th>
                  <th className="p-3">{t.thDbtStatus}</th>
                  <th className="p-3 text-right">{t.thSanctionSlip}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClaims.map((claim) => {
                  const isApproved =
                    claim.status === "Approved" ||
                    claim.status === "Approved (Transfer in 24h)" ||
                    claim.status === "Disbursed (DBT)";
                  const isRejected = claim.status === "Rejected";
                  const isAppealScheduled = claim.status === "Appeal Scheduled";
                  const isPending = claim.status === "Pending";
                  const isSurveyUnderway =
                    claim.status === "Field Survey Underway" || claim.status === "Claim Lodged";

                  return (
                    <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                      {/* 1. Report ID & Date */}
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block font-mono">
                          {claim.id}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {claim.eventDate || claim.dateOfDamage || "Sep 15, 2026"}
                        </span>
                        {claim.surveyReportNumber && (
                          <span className="text-[10px] text-teal-700 block font-mono">
                            {claim.surveyReportNumber}
                          </span>
                        )}
                      </td>

                      {/* 2. VK Number (Auto-generated upon approval) */}
                      <td className="p-3">
                        {claim.vkNumber ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              <span>{claim.vkNumber}</span>
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold block">
                              ✓ Auto-Generated on Sanction
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending Official Approval</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleApproveAndGenerateVk(claim.id)}
                              className="text-[10px] text-teal-700 font-bold underline hover:text-teal-900 block cursor-pointer"
                              title="Click to simulate approval & auto-generate VK Number"
                            >
                              + Approve & Generate VK
                            </button>
                          </div>
                        )}
                      </td>

                      {/* 3. Crop, Variety & Gat Number */}
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{claim.crop}</span>
                        {claim.cropVariety && (
                          <span className="text-[11px] text-slate-500 block">
                            {claim.cropVariety}
                          </span>
                        )}
                        <span className="text-[10px] text-teal-800 font-semibold block mt-0.5">
                          📍 {claim.gatNumber || "Gat No. 42/B, Survey 118"} ({claim.village || claim.taluka})
                        </span>
                      </td>

                      {/* 4. Calamity & Date of Damage */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                          <span className="font-semibold text-slate-800">
                            {claim.calamityType}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Date: {claim.dateOfDamage || claim.eventDate || "Sep 15, 2026"}
                        </span>
                      </td>

                      {/* 5. Damaged Area & Loss % */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-extrabold px-2 py-0.5 rounded border ${
                              isRejected
                                ? "text-slate-600 bg-slate-100 border-slate-300"
                                : "text-rose-700 bg-rose-50 border-rose-200"
                            }`}
                          >
                            {claim.lossPercentage}% Loss
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-700 font-medium block mt-0.5">
                          Area: {claim.damagedArea || "2.5 Acres"}
                        </span>
                      </td>

                      {/* 6. Report Status (PURELY REPORT STATUS) */}
                      <td className="p-3">
                        {isPending && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                              <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                              <span>Pending (प्रलंबित)</span>
                            </span>
                            <span className="text-[10px] text-amber-700 font-semibold block">
                              Survey team assigned
                            </span>
                          </div>
                        )}

                        {isApproved && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Approved (मंजूर ✓)</span>
                          </span>
                        )}

                        {isRejected && (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Rejected (नाकारले)</span>
                            </span>
                            {claim.rejectionReason && (
                              <p className="text-[10px] text-rose-700 max-w-xs line-clamp-2">
                                {claim.rejectionReason}
                              </p>
                            )}
                          </div>
                        )}

                        {isAppealScheduled && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                              <Calendar className="w-3.5 h-3.5 text-blue-600" />
                              <span>Appeal Scheduled</span>
                            </span>
                            {claim.officeAppointment && (
                              <span className="text-[10px] text-blue-950 font-semibold block">
                                📅 {claim.officeAppointment.appointmentDate}
                              </span>
                            )}
                          </div>
                        )}

                        {isSurveyUnderway && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Field Survey Underway</span>
                          </span>
                        )}
                      </td>

                      {/* 7. Action Column */}
                      <td className="p-3 text-right">
                        {isRejected ? (
                          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5">
                            <button
                              onClick={() => setAppointmentClaim(claim)}
                              id={`appeal-rejected-claim-${claim.id}`}
                              className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {currentLang === "mr"
                                  ? "कार्यालय भेट वेळ निश्चित करा"
                                  : "Schedule Office Visit"}
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedClaim(claim)}
                            id={`view-calamity-order-${claim.id}`}
                            className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-lg border border-teal-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5 text-teal-700" />
                            <span>{currentLang === "mr" ? "ई-पंचनामा पहा" : "View e-Panchnama"}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Process Guide */}
      {activeSubTab === "guide" && (
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t.tabGuide}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                KrishiVistar's direct digital e-panchnama and official verification workflow.
              </p>
            </div>
            <button
              onClick={() => setIsUserManualOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-teal-100"
            >
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>
                {currentLang === "mr" ? "सविस्तर शेतकरी मार्गदर्शिका (Manual)" : "Detailed Farmer Manual"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-black flex items-center justify-center text-xs">
                1
              </div>
              <span className="font-bold text-slate-900 block">{t.guideStep1Title}</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.guideStep1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 font-black flex items-center justify-center text-xs">
                2
              </div>
              <span className="font-bold text-slate-900 block">{t.guideStep2Title}</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.guideStep2Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-bold text-slate-900 block">{t.guideStep3Title}</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.guideStep3Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-black flex items-center justify-center text-xs">
                4
              </div>
              <span className="font-bold text-emerald-950 block">{t.guideStep4Title}</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {t.guideStep4Desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: User Manual */}
      {activeSubTab === "manual" && (
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                <span>ई-पंचनामा शेतकरी वापर मार्गदर्शिका (Farmer User Manual)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {t.tabUserManual} - संपूर्ण कार्यप्रणाली व नियम
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                नैसर्गिक आपत्ती पीक नुकसानीचा ई-पंचनामा अचूक भरण्यासाठी व स्थिती तपासण्यासाठी मार्गदर्शक सूचना.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveSubTab("scheme_ai");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>1. शासकीय योजना शोध (AI Engine)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab("ledger")}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-slate-600" />
                <span>2. Reports and Status</span>
              </button>
            </div>
          </div>

          {/* Core Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>१. ७२ तासांची कालमर्यादा</span>
              </div>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                अतिवृष्टी, गारपीट किंवा पूर आल्यानंतर ७२ तासांच्या आत ई-पंचनामा नोंदवणे आवश्यक आहे. वेळेवर नोंद केल्यास संयुक्त पंचनामा पथक त्वरित भेट देते.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
              <div className="flex items-center gap-2 text-teal-950 font-bold text-xs">
                <Camera className="w-4 h-4 text-teal-700" />
                <span>२. भू-टॅग (Geotagged) फोटो</span>
              </div>
              <p className="text-[11px] text-teal-900/80 leading-relaxed">
                वेबसाइटवरील कॅमेऱ्याद्वारे किंवा थेट नुकसानीच्या शेतातून जीपीएस अक्षांश-रेखांश असलेले फोटो अपलोड करा, ज्यामुळे अहवाल तात्काळ मंजूर होतो.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>३. स्वयंचलित VK क्रमांक</span>
              </div>
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                अर्ज सुरुवातीला <strong>Pending</strong> स्थितीत नोंदवला जाईल. कृषी अधिकारी व तलाठी यांनी पाहणी मंजूर करताच अधिकृत VK क्रमांक स्वयंचलित तयार होतो.
              </p>
            </div>
          </div>

          {/* Detailed 6-Step Workflow */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>६ सोप्या टप्प्यांत ई-पंचनामा नोंदणी (Step-by-Step Workflow)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>पायरी १: वैयक्तिक व आधार माहिती</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  १२ अंकी आधार क्रमांक आणि आधारसंलग्न मोबाईल नंबर नमूद करा. आधार NPCI बँक खात्याशी जोडलेले असल्याची खात्री करा.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>पायरी २: जमीन व शेत तपशील</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  जिल्हा, तालुका, गाव निवडून अचूक गट किंवा सर्व्हे क्रमांक नमूद करा व डिजिटल ७/१२ उतारा जोडा.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>पायरी ३: पीक व नुकसान प्रमाण</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  नुकसान झालेले पीक, वाण, पिकाची अवस्था व बाधित क्षेत्र (गुंठा/एकर/हेक्टर) तसेच अंदाजे नुकसान टक्केवारी निवडा.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">4</span>
                  <span>पायरी ४: आपत्ती प्रकार व दिनांक</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  अतिवृष्टी, गारपीट, पूर किंवा दुष्काळ यापैकी योग्य आपत्ती प्रकार आणि ज्या दिवशी घटना घडली ती अचूक तारीख निवडा.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">5</span>
                  <span>पायरी ५: प्रत्यक्ष फोटो व पुरावे</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  खेत परिसरातील नुकसानीचे स्पष्ट फोटो किंवा व्हिडिओ जोडा. जीपीएस लोकेशन सुरू ठेवून थेट कॅमेऱ्याने फोटो घ्या.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">6</span>
                  <span>पायरी ६: संपूर्ण आढावा (Review) व सबमिशन</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  भरलेली सर्व माहिती तपासून घ्या. काही बदल असल्यास "Edit" बटणावर क्लिक करा. स्वयंघोषणा मान्य करून ई-पंचनामा सादर करा.
                </p>
              </div>
            </div>
          </div>

          {/* SDRF Norms Matrix preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 block">
              शासकीय SDRF / NDRF मदत दर व निकष (SDRF Assistance Norms):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block">जिरायत (Rainfed) पिके</span>
                <span className="text-sm font-black text-slate-900">₹८,५०० / हेक्टर</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">नुकसान ३३% पेक्षा जास्त आवश्यक</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block">बागायत (Assured Irrigation) पिके</span>
                <span className="text-sm font-black text-slate-900">₹१७,००० / हेक्टर</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">नुकसान ३३% पेक्षा जास्त आवश्यक</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block">बहुवार्षिक फळबागा (Perennial Orchards)</span>
                <span className="text-sm font-black text-slate-900">₹२२,५०० / हेक्टर</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">३३% नुकसान + किमान ३ वर्षे बागेचे वय</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official e-Panchnama Report Details Modal (No bank transaction data or bank account names!) */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-mono font-bold mb-1">
                  <Landmark className="w-3 h-3" />
                  <span>OFFICIAL E-PANCHNAMA DAMAGE RECORD</span>
                </div>
                <h3 className="text-base font-bold font-display">{t.sanctionTitle}</h3>
                <p className="text-xs text-teal-200/80">{t.sanctionSubtitle}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedClaim(null);
                  setDownloadNotice(null);
                }}
                className="p-1 text-white/70 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs overflow-y-auto">
              {downloadNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{downloadNotice}</span>
                </div>
              )}

              {/* Order reference and VK Number Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
                <div>
                  <span className="text-slate-400 block">{t.govOrderNo}</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">
                    MH-PANCHNAMA-2026-{selectedClaim.id}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block">VK Number (विहित क्र.):</span>
                  {selectedClaim.vkNumber ? (
                    <span className="font-black text-emerald-800 font-mono text-sm bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      {selectedClaim.vkNumber}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-amber-800 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pending Approval
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApproveAndGenerateVk(selectedClaim.id)}
                        className="text-[10px] font-bold text-teal-700 underline cursor-pointer"
                      >
                        Approve Now
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Report Details */}
              <div className="space-y-2.5 py-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.claimantFarmer}</span>
                  <span className="font-bold text-slate-900">
                    Ramesh Patil · UID: {selectedClaim.aadhaarNumber || "XXXX-XXXX-9402"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Mobile (Aadhaar Linked):</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {selectedClaim.aadhaarMobile || "+91 98221 48190"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Land / Gat / Survey Number:</span>
                  <span className="font-bold text-teal-900">
                    {selectedClaim.gatNumber || "Gat No. 42/B, Survey No. 118"} ({selectedClaim.village || selectedClaim.taluka})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Damaged Crop & Stage:</span>
                  <span className="font-bold text-slate-900">
                    {selectedClaim.crop} ({selectedClaim.cropVariety || "Hybrid"}) · {selectedClaim.cropStage || "Fruiting Stage"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Approximate Damaged Area:</span>
                  <span className="font-bold text-slate-900">
                    {selectedClaim.damagedArea || "2.5 Acres"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">{t.disasterType}</span>
                  <span className="font-bold text-rose-700">
                    {selectedClaim.calamityType} ({selectedClaim.dateOfDamage || selectedClaim.eventDate})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">{t.lossAssessment}</span>
                  <span className="font-bold text-rose-700">
                    {selectedClaim.lossPercentage}% Verified Crop Loss
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">{t.surveyorName}</span>
                  <span className="font-bold text-slate-800">
                    {selectedClaim.surveyorOfficer}
                  </span>
                </div>
              </div>

              {/* Status & Compliance Box (Purely verification status) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Aadhaar Seeding Status:</span>
                  <span className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedClaim.aadhaarSeedingStatus || "Active & Seeded on NPCI ✓"}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Document Check:</span>
                  <span className="text-slate-700 text-[11px]">
                    7/12 Extract (Verified) · 8-A (Verified) · Passbook ID (Attached)
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-slate-600 font-bold">Report Status:</span>
                  <span className="font-black text-sm text-teal-900">
                    {selectedClaim.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setDownloadNotice(t.downloadedAlert);
                    setTimeout(() => {
                      setDownloadNotice(null);
                      setSelectedClaim(null);
                    }, 2500);
                  }}
                  id="download-sanction-pdf-btn"
                  className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadSanctionPdf}</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedClaim(null);
                    setDownloadNotice(null);
                  }}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer hover:bg-slate-50"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PMFBY Toll-Free Complaint & Helpline Modal */}
      <PmfbyHelplineModal
        isOpen={isPmfbyHelplineOpen}
        onClose={() => setIsPmfbyHelplineOpen(false)}
        currentLang={currentLang}
      />

      {/* Office Appointment Booking Modal for Rejected / Appealed Claims */}
      {appointmentClaim && (
        <CalamityOfficeAppointmentModal
          isOpen={Boolean(appointmentClaim)}
          onClose={() => setAppointmentClaim(null)}
          claim={appointmentClaim}
          currentLang={currentLang}
          onAppointmentConfirmed={(updated) => {
            handleUpdateAppointment(updated);
          }}
        />
      )}

      {/* Calamity User Manual Modal */}
      <CalamityUserManualModal
        isOpen={isUserManualOpen}
        onClose={() => setIsUserManualOpen(false)}
        currentLang={currentLang}
        onJumpToForm={() => {
          setActiveSubTab("scheme_ai");
        }}
      />

      {/* Submission Success Confirmation Modal */}
      {isSubmissionSuccessModalOpen && formSuccessClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-300 overflow-hidden animate-scaleUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 text-center relative">
              <button
                type="button"
                onClick={() => setIsSubmissionSuccessModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 rounded-full bg-emerald-500/30 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-2 text-emerald-200 shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold font-display">
                {currentLang === "mr"
                  ? "आपला ई-पंचनामा यशस्वीरीत्या सादर झाला आहे!"
                  : "Your Form is Submitted Successfully!"}
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                {currentLang === "mr"
                  ? "अहवाल '2. Reports and Status' विभागात Pending स्थितीत नोंदवला गेला आहे."
                  : "Form has been added to '2. Reports and Status' with Pending status."}
              </p>
            </div>

            <div className="p-5 space-y-4">
              {/* Status Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-950 block">
                      सध्याची स्थिती: Pending (प्रलंबित)
                    </span>
                    <span className="text-[11px] text-amber-800">
                      तालुका कृषी अधिकारी व तलाठी प्रत्यक्ष पाहणीसाठी नियुक्त
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-amber-200 text-amber-900">
                  {formSuccessClaim.id}
                </span>
              </div>

              {/* Summary Details Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs space-y-2">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>नोंदवलेला तपशील (Submitted Summary):</span>
                  <span className="font-mono text-[10px] text-slate-500">
                    Ref: {formSuccessClaim.surveyReportNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">पीक व वाण:</span>
                    <span className="font-semibold text-slate-900">
                      {formSuccessClaim.crop} {formSuccessClaim.cropVariety ? `(${formSuccessClaim.cropVariety})` : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">गट / सर्व्हे क्र.:</span>
                    <span className="font-semibold text-slate-900">
                      {formSuccessClaim.gatNumber || "Gat No. 42/B"} ({formSuccessClaim.village})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">आपत्ती व दिनांक:</span>
                    <span className="font-semibold text-rose-700">
                      {formSuccessClaim.calamityType} ({formSuccessClaim.dateOfDamage})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">बाधित क्षेत्र व टक्केवारी:</span>
                    <span className="font-semibold text-slate-900">
                      {formSuccessClaim.damagedArea} ({formSuccessClaim.lossPercentage}% नुकसान)
                    </span>
                  </div>
                </div>

                {formSuccessClaim.sdrfCalculatedAmount ? (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">अपेक्षित SDRF मदत:</span>
                    <span className="font-black text-emerald-800 text-sm">
                      ₹{formSuccessClaim.sdrfCalculatedAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Next Steps Notification */}
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                  पुढील प्रक्रिया (Next Steps):
                </span>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  आपला अर्ज "2. Reports and Status" मध्ये यशस्वीपणे जोडला गेला आहे. पाहणी पथकाने प्रत्यक्ष अहवाल प्रमाणित केल्यानंतर अधिकृत <strong>VK क्रमांक</strong> स्वयंचलित तयार होऊन तिथे दिसेल.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  id="view-in-reports-and-status-btn"
                  onClick={() => {
                    setIsSubmissionSuccessModalOpen(false);
                    setStatusFilter("all");
                    setActiveSubTab("ledger");
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>
                    {currentLang === "mr"
                      ? "2. Reports and Status मध्ये पहा"
                      : "View in Reports and Status"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmissionSuccessModalOpen(false);
                    setCurrentFormStep(1);
                    setFormSuccessClaim(null);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
                >
                  {currentLang === "mr" ? "नवीन अर्ज भरा" : "Fill Another"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SDRF Norms Table & Official Assistance Matrix Modal */}
      <SdrfNormsModal
        isOpen={isSdrfNormsModalOpen}
        onClose={() => setIsSdrfNormsModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
};
