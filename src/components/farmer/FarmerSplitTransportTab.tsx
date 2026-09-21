import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Fuel,
  Sparkles,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  X,
  Check,
  DollarSign,
  Leaf,
  Info,
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";
import { SplitTransportPool, SplitTransportPoolParticipant } from "../../types";
import { Language } from "../../translations";

interface FarmerSplitTransportTabProps {
  currentLang?: Language;
  pools: SplitTransportPool[];
  onAddPool: (pool: SplitTransportPool) => void;
  onJoinPool: (poolId: string, participant: SplitTransportPoolParticipant) => void;
}

const tSplit = {
  mr: {
    badge: "सामाईक वाहतूक खर्च बचत",
    title: "शेतकरी गट वाहतूक व खर्च वाटप",
    subtitle:
      "एकाच बाजारपेठेत माल नेणाऱ्या शेतकऱ्यांनी एकत्र येऊन वाहन शेअर करा. भाडे निम्मे करा, वेळ वाचवा आणि इंधनाची बचत करून स्वतःचा नफा वाढवा.",
    hostPoolBtn: "+ नवीन सामाईक गट सुरू करा",
    openPools: "सध्या उपलब्ध सामाईक वाहतूक गट",
    joinPoolBtn: "गटात सहभागी व्हा व खर्च वाटा",
    poolFullBadge: "क्षमता पूर्ण",
    openBadge: "जागा शिल्लक",
    destination: "गंतव्य बाजार समिती:",
    departure: "निघण्याची वेळ:",
    vehicle: "वाहन प्रकार:",
    capacityStatus: "वाहन क्षमता स्थिती:",
    availableSpace: "शिल्लक जागा:",
    totalTripFare: "एकूण वाहन भाडे:",
    participantsTitle: "सहभागी शेतकरी व माल वाटप:",
    fuelSavedNotice: "इंधन व डिझेल बचत:",
    collaborationSavingsTitle: "एकत्र आल्यामुळे थेट बचत:",
    soloTripComparison: "एकट्याने वाहन केल्यास खर्च:",
    pooledRateLabel: "सामाईक दर:",
    soloRateLabel: "एकट्याने दर:",
    youSaveLabel: "तुमची निव्वळ बचत:",
    dieselSavedBadge: "डिझेल बचत",

    // Benefits Bar
    benefit1Title: "४०% ते ६०% भाडे बचत",
    benefit1Desc: "शेतकऱ्यांचा थेट निव्वळ नफा वाढतो",
    benefit2Title: "इंधन व डिझेल संवर्धन",
    benefit2Desc: "कमी वाहने, पर्यावरणपूरक वाहतूक",
    benefit3Title: "वेळेवर बाजारपेठेत हजेरी",
    benefit3Desc: "सकाळी थेट मुख्य लिलावात विक्री",

    // Interactive Calculator
    calcTitle: "सामाईक वाहतूक खर्च व नफा बचत सिम्युलेटर",
    calcSubtitle:
      "२ किंवा ३ शेतकरी एकत्र आल्यास प्रत्येकी किती पैसे व डिझेल वाचते आणि नफा वाढतो ते तपासा.",
    numFarmers: "एकत्र येणारे शेतकरी:",
    numFarmers2: "२ शेतकरी (५०% बचत)",
    numFarmers3: "३ शेतकरी (६५% बचत)",
    numFarmers4: "४+ शेतकरी (७५% बचत)",
    farmersCountSuffix: "शेतकरी",
    routeDistanceLabel: "मार्गाचे अंतर:",
    distNashik: "नाशिक (२० किमी)",
    distVashi: "वाशी (१७० किमी)",
    distPune: "पुणे (१८० किमी)",
    distSurat: "सुरत (२३० किमी)",
    soloCostPerFarmer: "एकट्याने स्वतंत्र खर्च:",
    splitCostPerFarmer: "सामाईक वाटणी खर्च:",
    totalSavedPerFarmer: "प्रत्येकी थेट बचत:",
    calcProfitTip: "सामाईक वाहतुकीमुळे वाहतूक खर्चात मोठी कपात होते व शेतमालावर प्रति किलो ₹१.५ ते ₹२.० अधिक नफा मिळतो.",

    // Filters
    filterHeading: "वाहतूक गट शोधा व फिल्टर करा",
    filterSizeLabel: "उपलब्ध वजन क्षमता:",
    filterAllSizes: "सर्व वजन क्षमता",
    filter500Plus: "किमान ५०० किलो शिल्लक",
    filter1000Plus: "किमान १,००० किलो शिल्लक",
    filter1500Plus: "किमान १,५०० किलो शिल्लक",
    filter2000Plus: "किमान २,००० किलो शिल्लक",
    filterOriginLabel: "शेतकरी ठिकाण / पट्टा:",
    filterAllOrigins: "सर्व शेतकरी ठिकाणे",
    filterDestLabel: "गंतव्य बाजार समिती:",
    filterAllDests: "सर्व बाजार समित्या",
    filterSearchPlaceholder: "शेतमाल, शेतकरी किंवा गाव शोधा...",
    resetFiltersBtn: "फिल्टर्स पूर्ववत करा",
    showingPoolsCount: "सामाईक वाहतूक गट उपलब्ध",
    noPoolsMatch: "निवडलेल्या फिल्टरनुसार कोणताही सामाईक गट आढळला नाही. कृपया फिल्टर बदला किंवा नवीन गट तयार करा.",

    // Join Modal
    modalJoinTitle: "सामाईक वाहतूक गटात सामील व्हा",
    joinCropLabel: "आपला शेतमाल प्रकार *",
    joinWeightLabel: "आपल्या शेतमालाचे वजन (किलो मध्ये) *",
    joinFarmerNameLabel: "आपले नाव *",
    joinPhoneLabel: "आपला संपर्क मोबाईल नंबर *",
    joinVillageLabel: "आपले गाव / पिकअप ठिकाण *",
    yourSplitShare: "आपला अंदाजे वाटणी खर्च:",
    soloTripCompare: "एकट्याने स्वतंत्र वाहन भाडे:",
    instantSavings: "एकूण थेट बचत:",
    fuelSavedEst: "अंदाजे डिझेल बचत:",
    confirmJoinBtn: "नक्की करा व गटात सहभागी व्हा",
    cancelBtn: "रद्द करा",
    joinSuccessNotice: "आपण सामाईक गटात यशस्वीरीत्या जोडले गेला आहात! ग्रुप प्रमुखाशी संपर्क साधा.",

    // Host Pool Modal
    modalHostTitle: "नवीन सामाईक वाहतूक गट तयार करा",
    hostDestLabel: "गंतव्य बाजार समिती *",
    hostDateLabel: "प्रस्थान दिनांक *",
    hostTimeLabel: "प्रस्थान वेळ *",
    hostVehicleLabel: "वाहन प्रकार व क्षमता *",
    hostCapacityLabel: "एकूण वाहन क्षमता (किलो मध्ये) *",
    hostMyCropLabel: "आपला शेतमाल *",
    hostMyWeightLabel: "आपला स्वतःचा माल भार (किलो) *",
    hostTotalFareLabel: "एकूण संपूर्ण फेरी भाडे (₹) *",
    hostOriginLabel: "सुरुवात ठिकाण / पिकअप पट्टा *",
    hostPhoneLabel: "आपला मोबाईल नंबर *",
    hostNotesLabel: "इतर शेतकऱ्यांसाठी विशेष सूचना *",
    createPoolBtn: "सामाईक गट प्रकाशित करा",
    hostSuccessNotice: "नवीन सामाईक वाहतूक गट प्रकाशित झाला आहे! इतर शेतकरी आता सहभागी होऊ शकतात.",
    hostLabel: "गट प्रमुख:",
    callBtn: "कॉल करा",
    whatsappBtn: "व्हॉट्सॲप",
  },
  hi: {
    badge: "साझा परिवहन खर्च बचत",
    title: "किसान समूह परिवहन एवं खर्च बंटवारा",
    subtitle:
      "एक ही मंडी में माल ले जाने वाले किसान एक साथ आकर वाहन साझा करें। मालभाड़ा आधा करें, समय बचाएं, ईंधन की बचत करें और अपना मुनाफा बढ़ाएं।",
    hostPoolBtn: "+ नया साझा पूल शुरू करें",
    openPools: "सक्रिय साझा परिवहन समूह",
    joinPoolBtn: "समूह में शामिल हों एवं खर्च बांटें",
    poolFullBadge: "क्षमता पूर्ण",
    openBadge: "स्थान उपलब्ध",
    destination: "गंतव्य मंडी:",
    departure: "रवानगी का समय:",
    vehicle: "वाहन प्रकार:",
    capacityStatus: "वाहन क्षमता स्थिति:",
    availableSpace: "शेष उपलब्ध स्थान:",
    totalTripFare: "कुल यात्रा भाड़ा:",
    participantsTitle: "शामिल किसान एवं भार बंटवारा:",
    fuelSavedNotice: "ईंधन एवं डीजल बचत:",
    collaborationSavingsTitle: "एक साथ आने से सीधी बचत:",
    soloTripComparison: "अकेले वाहन करने पर खर्च:",
    pooledRateLabel: "साझा दर:",
    soloRateLabel: "एकल दर:",
    youSaveLabel: "आपकी शुद्ध बचत:",
    dieselSavedBadge: "डीजल बचत",

    // Benefits Bar
    benefit1Title: "४०% से ६०% भाड़ा बचत",
    benefit1Desc: "किसानों का सीधा शुद्ध मुनाफा बढ़ता है",
    benefit2Title: "ईंधन व डीजल संरक्षण",
    benefit2Desc: "कम वाहन, पर्यावरण अनुकूल परिवहन",
    benefit3Title: "समय पर मंडी में उपस्थिति",
    benefit3Desc: "सुबह सीधे मुख्य नीलामी में बिक्री",

    // Interactive Calculator
    calcTitle: "साझा परिवहन खर्च एवं मुनाफा बचत कैलकुलेटर",
    calcSubtitle:
      "2 या 3 किसान एक साथ आने पर प्रति किसान कितनी राशि व ईंधन बचता है और मुनाफा बढ़ता है, गणना करें।",
    numFarmers: "एकत्रित किसान संख्या:",
    numFarmers2: "२ किसान (५०% बचत)",
    numFarmers3: "३ किसान (६५% बचत)",
    numFarmers4: "४+ किसान (७५% बचत)",
    farmersCountSuffix: "किसान",
    routeDistanceLabel: "मार्ग की दूरी:",
    distNashik: "नासिक (२० किमी)",
    distVashi: "वाशी (१७० किमी)",
    distPune: "पुणे (१८० किमी)",
    distSurat: "सूरत (२३० किमी)",
    soloCostPerFarmer: "अकेले स्वतंत्र खर्च:",
    splitCostPerFarmer: "साझा बंटवारा खर्च:",
    totalSavedPerFarmer: "प्रति किसान सीधी बचत:",
    calcProfitTip: "साझा परिवहन से भाड़े में भारी कटौती होती है और उपज पर प्रति किलो ₹१.५ से ₹२.० अतिरिक्त शुद्ध लाभ होता है।",

    // Filters
    filterHeading: "परिवहन पूल खोजें एवं फ़िल्टर करें",
    filterSizeLabel: "उपलब्ध वजन क्षमता:",
    filterAllSizes: "सभी वजन क्षमता",
    filter500Plus: "न्यूनतम 500 किग्रा उपलब्ध",
    filter1000Plus: "न्यूनतम 1,000 किग्रा उपलब्ध",
    filter1500Plus: "न्यूनतम 1,500 किग्रा उपलब्ध",
    filter2000Plus: "न्यूनतम 2,000 किग्रा उपलब्ध",
    filterOriginLabel: "किसान क्षेत्र / पिकअप:",
    filterAllOrigins: "सभी किसान क्षेत्र",
    filterDestLabel: "गंतव्य मंडी:",
    filterAllDests: "सभी गंतव्य मंडियां",
    filterSearchPlaceholder: "फसल, किसान या गांव खोजें...",
    resetFiltersBtn: "फ़िल्टर रीसेट करें",
    showingPoolsCount: "साझा परिवहन समूह उपलब्ध",
    noPoolsMatch: "चयनित फ़िल्टर के अनुसार कोई समूह नहीं मिला। कृपया फ़िल्टर बदलें या नया साझा पूल बनाएं।",

    // Join Modal
    modalJoinTitle: "साझा परिवहन समूह में शामिल हों",
    joinCropLabel: "आपकी फसल का नाम *",
    joinWeightLabel: "आपकी उपज का वजन (किग्रा में) *",
    joinFarmerNameLabel: "आपका नाम *",
    joinPhoneLabel: "आपका मोबाइल नंबर *",
    joinVillageLabel: "आपका गांव / पिकअप स्थान *",
    yourSplitShare: "आपका अनुमानित साझा खर्च:",
    soloTripCompare: "अकेले स्वतंत्र वाहन भाड़ा:",
    instantSavings: "कुल सीधी बचत:",
    fuelSavedEst: "अनुमानित डीजल बचत:",
    confirmJoinBtn: "पुष्टि करें एवं समूह में जुड़ें",
    cancelBtn: "रद्द करें",
    joinSuccessNotice: "आप सफलतापूर्वक साझा समूह में शामिल हो गए हैं! समूह प्रमुख से संपर्क करें।",

    // Host Pool Modal
    modalHostTitle: "नया साझा परिवहन समूह बनाएं",
    hostDestLabel: "गंतव्य मंडी *",
    hostDateLabel: "प्रस्थान तिथि *",
    hostTimeLabel: "प्रस्थान समय *",
    hostVehicleLabel: "वाहन प्रकार एवं क्षमता *",
    hostCapacityLabel: "कुल वाहन क्षमता (किग्रा में) *",
    hostMyCropLabel: "आपकी फसल *",
    hostMyWeightLabel: "आपका स्वयं का फसल वजन (किग्रा) *",
    hostTotalFareLabel: "कुल पूर्ण यात्रा भाड़ा (₹) *",
    hostOriginLabel: "प्रारंभिक पिकअप क्षेत्र *",
    hostPhoneLabel: "आपका मोबाइल नंबर *",
    hostNotesLabel: "अन्य किसानों हेतु विशेष निर्देश *",
    createPoolBtn: "साझा समूह प्रकाशित करें",
    hostSuccessNotice: "नया साझा परिवहन समूह प्रकाशित हो गया है! अन्य किसान अब जुड़ सकते हैं।",
    hostLabel: "समूह प्रमुख:",
    callBtn: "कॉल करें",
    whatsappBtn: "व्हाट्सएप",
  },
  en: {
    badge: "Shared Freight & Split Transport Expense",
    title: "Farmer Group Transit & Cost Splitting",
    subtitle:
      "Farmers travelling to the same wholesale market share truck cargo space together. Cut freight expenses in half, eliminate empty miles, save fuel, and boost net farm profits.",
    hostPoolBtn: "+ Host / Create Split Pool",
    openPools: "Active Shared Transport Pools",
    joinPoolBtn: "Join Pool & Share Expense",
    poolFullBadge: "Full",
    openBadge: "Space Available",
    destination: "Target Mandi:",
    departure: "Departure:",
    vehicle: "Vehicle Fleet:",
    capacityStatus: "Capacity Status:",
    availableSpace: "Available Space:",
    totalTripFare: "Total Trip Freight:",
    participantsTitle: "Co-Farmers & Load Manifest:",
    fuelSavedNotice: "Estimated Fuel & Diesel Saved:",
    collaborationSavingsTitle: "Collaboration Savings:",
    soloTripComparison: "Solo Vehicle Hire Would Cost:",
    pooledRateLabel: "Pooled Rate:",
    soloRateLabel: "Solo Rate:",
    youSaveLabel: "Your Direct Savings:",
    dieselSavedBadge: "Diesel Saved",

    // Benefits Bar
    benefit1Title: "40% to 60% Freight Savings",
    benefit1Desc: "Directly increases net profit per kg sold",
    benefit2Title: "Fuel & Diesel Conservation",
    benefit2Desc: "Fewer trucks, greener farm-to-market logistics",
    benefit3Title: "On-Time Morning Auctions",
    benefit3Desc: "Arrive fresh for opening wholesale price bidding",

    // Interactive Calculator
    calcTitle: "Interactive Freight & Fuel Split Calculator",
    calcSubtitle:
      "Simulate how 2, 3, or 4 farmers grouping together slashes individual transport overhead and boosts profit.",
    numFarmers: "Participating Farmers:",
    numFarmers2: "2 Farmers (50% savings)",
    numFarmers3: "3 Farmers (65% savings)",
    numFarmers4: "4+ Farmers (75% savings)",
    farmersCountSuffix: "Farmers",
    routeDistanceLabel: "Route Distance:",
    distNashik: "Nashik (20 km)",
    distVashi: "Vashi APMC (170 km)",
    distPune: "Pune Mandi (180 km)",
    distSurat: "Surat APMC (230 km)",
    soloCostPerFarmer: "Solo Cost Per Farmer:",
    splitCostPerFarmer: "Pooled Cost Per Farmer:",
    totalSavedPerFarmer: "Net Savings Per Farmer:",
    calcProfitTip: "Collaborative pooling drastically cuts transport overhead, retaining ₹1.50 to ₹2.00 more profit per kg of produce sold.",

    // Filters
    filterHeading: "Search & Filter Shared Transport Pools",
    filterSizeLabel: "Available Capacity:",
    filterAllSizes: "All Capacities",
    filter500Plus: "Min 500 kg available",
    filter1000Plus: "Min 1,000 kg available",
    filter1500Plus: "Min 1,500 kg available",
    filter2000Plus: "Min 2,000 kg available",
    filterOriginLabel: "Farmer Origin / Hub:",
    filterAllOrigins: "All Origins",
    filterDestLabel: "Destination Mandi:",
    filterAllDests: "All Destination Mandis",
    filterSearchPlaceholder: "Search by crop, farmer name, or village...",
    resetFiltersBtn: "Reset Filters",
    showingPoolsCount: "Shared Pools Available",
    noPoolsMatch: "No shared transport pools match your active filters. Try clearing filters or create a new pool.",

    // Join Modal
    modalJoinTitle: "Join Shared Transport Pool",
    joinCropLabel: "Your Crop / Commodity *",
    joinWeightLabel: "Your Produce Weight (in kg) *",
    joinFarmerNameLabel: "Your Full Name *",
    joinPhoneLabel: "Your Contact Mobile *",
    joinVillageLabel: "Your Village / Farm Gate *",
    yourSplitShare: "Your Proportional Split Share:",
    soloTripCompare: "Solo Vehicle Hire Would Cost:",
    instantSavings: "Net Direct Savings:",
    fuelSavedEst: "Estimated Diesel Saved:",
    confirmJoinBtn: "Confirm & Join Shared Ride",
    cancelBtn: "Cancel",
    joinSuccessNotice: "Successfully joined the shared pool! Contact the host farmer to coordinate pickup.",

    // Host Pool Modal
    modalHostTitle: "Create New Shared Transport Pool",
    hostDestLabel: "Destination Mandi *",
    hostDateLabel: "Departure Date *",
    hostTimeLabel: "Departure Time *",
    hostVehicleLabel: "Vehicle Model & Specs (e.g., Eicher 14-ft 4T) *",
    hostCapacityLabel: "Total Vehicle Capacity (kg) *",
    hostMyCropLabel: "Your Own Crop *",
    hostMyWeightLabel: "Your Own Load Weight (kg) *",
    hostTotalFareLabel: "Total Vehicle Hire Fare (₹) *",
    hostOriginLabel: "Origin Hub / Route Corridor *",
    hostPhoneLabel: "Your Phone Number *",
    hostNotesLabel: "Notes for Co-Farmers *",
    createPoolBtn: "Publish Shared Pool",
    hostSuccessNotice: "New shared transport pool published! Fellow farmers can now join.",
    hostLabel: "Group Host:",
    callBtn: "Call Host",
    whatsappBtn: "WhatsApp",
  },
};

export const FarmerSplitTransportTab: React.FC<FarmerSplitTransportTabProps> = ({
  currentLang = "en",
  pools,
  onAddPool,
  onJoinPool,
}) => {
  const t = tSplit[currentLang] || tSplit.en;

  // Modals
  const [selectedPoolForJoin, setSelectedPoolForJoin] = useState<SplitTransportPool | null>(null);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Split Simulator State (TOP COMPONENT)
  const [simFarmersCount, setSimFarmersCount] = useState<number>(3);
  const [simTripDistanceKm, setSimTripDistanceKm] = useState<number>(170);

  // Filter States
  const [filterMinCapacity, setFilterMinCapacity] = useState<string>("all");
  const [filterOrigin, setFilterOrigin] = useState<string>("all");
  const [filterDestination, setFilterDestination] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Join Form State
  const [joinFarmerName, setJoinFarmerName] = useState(
    currentLang === "en" ? "Balasaheb Shirole" : "बाळासाहेब शिरोळे"
  );
  const [joinPhone, setJoinPhone] = useState("9822194820");
  const [joinVillage, setJoinVillage] = useState(
    currentLang === "en" ? "Dindori Gate 2" : "दिंडोरी गेट २"
  );
  const [joinCrop, setJoinCrop] = useState(
    currentLang === "en" ? "Tomato (Hybrid)" : "टोमॅटो (हायब्रिड)"
  );
  const [joinWeightKg, setJoinWeightKg] = useState<number>(1000);

  // Host Pool Form State
  const [hostDestMandi, setHostDestMandi] = useState("Mumbai Vashi APMC");
  const [hostDepartureDate, setHostDepartureDate] = useState("Tomorrow");
  const [hostDepartureTime, setHostDepartureTime] = useState("04:30 AM");
  const [hostVehicleType, setHostVehicleType] = useState("Eicher 14-Foot (4,000 kg Capacity)");
  const [hostTotalCapacity, setHostTotalCapacity] = useState<number>(4000);
  const [hostMyCrop, setHostMyCrop] = useState("Tomato (Abhinav)");
  const [hostMyWeight, setHostMyWeight] = useState<number>(2000);
  const [hostTotalFare, setHostTotalFare] = useState<number>(5200);
  const [hostOrigin, setHostOrigin] = useState("Dindori & Niphad Belt");
  const [hostPhone, setHostPhone] = useState("9822481920");
  const [hostNotes, setHostNotes] = useState(
    "Express transit via Samruddhi feeder. Looking for fellow farmers to share remaining capacity."
  );

  // Simulator Math
  const simTotalVehicleCost = 1200 + simTripDistanceKm * 24; // Base + Rate
  const simSoloCostPerFarmer = Math.round(simTotalVehicleCost * 0.85); // Booking individual vehicle
  const simPooledCostPerFarmer = Math.round(simTotalVehicleCost / simFarmersCount);
  const simSavedPerFarmer = Math.round(simSoloCostPerFarmer - simPooledCostPerFarmer);
  const simPercentSaved = Math.round((simSavedPerFarmer / simSoloCostPerFarmer) * 100);
  const simDieselSavedLitres = Math.round((simFarmersCount - 1) * (simTripDistanceKm / 10) * 1.1);

  // Filter Logic
  const filteredPools = useMemo(() => {
    return pools.filter((pool) => {
      // Calculate current reserved and available space
      const reservedKg = pool.participants.reduce((sum, p) => sum + p.loadWeightKg, 0);
      const availableSpaceKg = Math.max(0, pool.totalCapacityKg - reservedKg);

      // Capacity Filter
      if (filterMinCapacity !== "all") {
        const minVal = Number(filterMinCapacity);
        if (availableSpaceKg < minVal) return false;
      }

      // Origin Filter
      if (filterOrigin !== "all") {
        const poolOrigin = (pool.originTaluka || "").toLowerCase();
        if (!poolOrigin.includes(filterOrigin.toLowerCase())) return false;
      }

      // Destination Filter
      if (filterDestination !== "all") {
        const poolDest = (pool.destinationMandi || "").toLowerCase();
        if (!poolDest.includes(filterDestination.toLowerCase())) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (pool.hostFarmerName || "").toLowerCase().includes(q);
        const matchesOrigin = (pool.originTaluka || "").toLowerCase().includes(q);
        const matchesDest = (pool.destinationMandi || "").toLowerCase().includes(q);
        const matchesVehicle = (pool.vehicleType || "").toLowerCase().includes(q);
        const matchesParticipants = pool.participants.some(
          (p) =>
            (p.farmerName || "").toLowerCase().includes(q) ||
            (p.crop || "").toLowerCase().includes(q) ||
            (p.village || "").toLowerCase().includes(q)
        );
        if (
          !matchesName &&
          !matchesOrigin &&
          !matchesDest &&
          !matchesVehicle &&
          !matchesParticipants
        ) {
          return false;
        }
      }

      return true;
    });
  }, [pools, filterMinCapacity, filterOrigin, filterDestination, searchQuery]);

  const hasActiveFilters =
    filterMinCapacity !== "all" ||
    filterOrigin !== "all" ||
    filterDestination !== "all" ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setFilterMinCapacity("all");
    setFilterOrigin("all");
    setFilterDestination("all");
    setSearchQuery("");
  };

  // Join Pool Submit
  const handleConfirmJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoolForJoin) return;

    const currentReserved = selectedPoolForJoin.participants.reduce(
      (acc, p) => acc + p.loadWeightKg,
      0
    );
    const newTotalLoad = currentReserved + joinWeightKg;
    const splitCost = Math.round((joinWeightKg / newTotalLoad) * selectedPoolForJoin.totalTripFare);

    const participant: SplitTransportPoolParticipant = {
      id: `part-${Date.now()}`,
      farmerName: joinFarmerName,
      phone: joinPhone,
      village: joinVillage,
      crop: joinCrop,
      loadWeightKg: joinWeightKg,
      splitCost,
      joinedAt: currentLang === "en" ? "Just now" : currentLang === "hi" ? "अभी-अभी" : "आत्ताच",
    };

    onJoinPool(selectedPoolForJoin.id, participant);
    setSelectedPoolForJoin(null);
    setNoticeMessage(t.joinSuccessNotice);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  // Host Pool Submit
  const handleCreatePool = (e: React.FormEvent) => {
    e.preventDefault();
    const mySplit = Math.round((hostMyWeight / hostTotalCapacity) * hostTotalFare);

    const newPool: SplitTransportPool = {
      id: `pool-${Date.now()}`,
      hostFarmerName: currentLang === "en" ? "Rameshwar Patil (Host)" : "रामेश्वर पाटील (गट प्रमुख)",
      hostPhone,
      originTaluka: hostOrigin,
      destinationMandi: hostDestMandi,
      distanceKm: hostDestMandi.includes("Mumbai") ? 170 : hostDestMandi.includes("Pune") ? 180 : 220,
      departureDate: hostDepartureDate,
      departureTime: hostDepartureTime,
      vehicleType: hostVehicleType,
      totalCapacityKg: Number(hostTotalCapacity),
      totalTripFare: Number(hostTotalFare),
      status: "Open for Sharing",
      notes: hostNotes,
      participants: [
        {
          id: `part-host-${Date.now()}`,
          farmerName: currentLang === "en" ? "Rameshwar Patil (Host)" : "रामेश्वर पाटील (गट प्रमुख)",
          phone: hostPhone,
          village: currentLang === "en" ? "Dindori" : "दिंडोरी",
          crop: hostMyCrop,
          loadWeightKg: Number(hostMyWeight),
          splitCost: mySplit,
          joinedAt: currentLang === "en" ? "Created by Host" : currentLang === "hi" ? "प्रमुख द्वारा निर्मित" : "गट प्रमुखाने तयार केले",
        },
      ],
    };

    onAddPool(newPool);
    setIsHostModalOpen(false);
    setNoticeMessage(t.hostSuccessNotice);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {noticeMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
          <button
            onClick={() => setNoticeMessage(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Create Pool Button */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5 border border-blue-200">
              <Users className="w-3.5 h-3.5" />
              {t.badge}
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsHostModalOpen(true)}
            id="host-split-pool-btn"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t.hostPoolBtn}</span>
          </button>
        </div>

        {/* Benefits summary pill bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-800 font-bold block">
                {t.benefit1Title}
              </span>
              <span className="text-xs text-emerald-950 font-medium">
                {t.benefit1Desc}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Fuel className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-blue-800 font-bold block">
                {t.benefit2Title}
              </span>
              <span className="text-xs text-blue-950 font-medium">
                {t.benefit2Desc}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-amber-800 font-bold block">
                {t.benefit3Title}
              </span>
              <span className="text-xs text-amber-950 font-medium">
                {t.benefit3Desc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 USER REQUEST: INTERACTIVE SPLIT CALCULATOR AT THE VERY TOP */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
                <span>{t.calcTitle}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  +{simPercentSaved}% Profit
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.calcSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Slider 1: Participating Farmers */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <label className="text-slate-300 font-bold">{t.numFarmers}</label>
                <span className="font-extrabold text-blue-300 text-sm bg-blue-500/20 px-2.5 py-0.5 rounded-md border border-blue-400/30 font-mono">
                  {simFarmersCount} {t.farmersCountSuffix}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                step="1"
                value={simFarmersCount}
                onChange={(e) => setSimFarmersCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-300 font-medium mt-2">
                <span>{t.numFarmers2}</span>
                <span>{t.numFarmers3}</span>
                <span>{t.numFarmers4}</span>
              </div>
            </div>

            {/* Slider 2: Route Distance */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <label className="text-slate-300 font-bold">{t.routeDistanceLabel}</label>
                <span className="font-extrabold text-blue-300 text-sm bg-blue-500/20 px-2.5 py-0.5 rounded-md border border-blue-400/30 font-mono">
                  {simTripDistanceKm} km
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="10"
                value={simTripDistanceKm}
                onChange={(e) => setSimTripDistanceKm(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-300 font-medium mt-2">
                <span>{t.distNashik}</span>
                <span>{t.distVashi}</span>
                <span>{t.distPune}</span>
                <span>{t.distSurat}</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Grid (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-white/10 border border-white/15 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-3">
                {currentLang === "en" ? "PROFIT & COST BREAKDOWN" : currentLang === "hi" ? "लाभ एवं खर्च विवरण" : "नफा व खर्च वाटप तपशील"}
              </span>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>{t.soloCostPerFarmer}</span>
                  <span className="line-through text-slate-400 font-mono font-bold">
                    ₹{simSoloCostPerFarmer.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span className="font-semibold">{t.splitCostPerFarmer}</span>
                  <span className="text-emerald-400 font-extrabold text-base font-mono">
                    ₹{simPooledCostPerFarmer.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-white/15 flex justify-between items-center text-sm font-bold">
                  <span className="text-blue-300">{t.totalSavedPerFarmer}</span>
                  <div className="text-right">
                    <span className="text-emerald-300 font-display font-extrabold text-xl block leading-tight">
                      +₹{simSavedPerFarmer.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      ({simPercentSaved}% {currentLang === "en" ? "cheaper trip" : currentLang === "hi" ? "सस्ती यात्रा" : "कमी खर्च"})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs text-blue-200">
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-amber-400" />
                  <span>{t.fuelSavedNotice}</span>
                </span>
                <span className="font-extrabold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                  ~{simDieselSavedLitres} {currentLang === "en" ? "Litres Diesel" : currentLang === "hi" ? "लीटर डीजल" : "लिटर डिझेल"}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                {t.calcProfitTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 USER REQUEST: FILTERS FOR AVAILABLE SIZE, FARMER LOCATION & DESTINATION */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900 font-display">
              {t.filterHeading}
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              ({filteredPools.length} {t.showingPoolsCount})
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetFiltersBtn}</span>
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Filter 1: Size Available */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t.filterSizeLabel}
            </label>
            <select
              value={filterMinCapacity}
              onChange={(e) => setFilterMinCapacity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="all">{t.filterAllSizes}</option>
              <option value="500">{t.filter500Plus}</option>
              <option value="1000">{t.filter1000Plus}</option>
              <option value="1500">{t.filter1500Plus}</option>
              <option value="2000">{t.filter2000Plus}</option>
            </select>
          </div>

          {/* Filter 2: Farmer Origin / Hub */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t.filterOriginLabel}
            </label>
            <select
              value={filterOrigin}
              onChange={(e) => setFilterOrigin(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="all">{t.filterAllOrigins}</option>
              <option value="dindori">Dindori / दिंडोरी</option>
              <option value="pimpalgaon">Pimpalgaon & Ozar / पिंपळगाव व ओझर</option>
              <option value="sinnar">Sinnar / सिन्नर</option>
              <option value="niphad">Niphad / निफाड</option>
            </select>
          </div>

          {/* Filter 3: Target Destination Mandi */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t.filterDestLabel}
            </label>
            <select
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="all">{t.filterAllDests}</option>
              <option value="vashi">Mumbai Vashi APMC / वाशी</option>
              <option value="gultekdi">Pune Gultekdi Mandi / पुणे</option>
              <option value="surat">Surat Wholesale APMC / सुरत</option>
              <option value="nashik">Local Nashik APMC / नाशिक</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {currentLang === "en" ? "Keyword Search:" : currentLang === "hi" ? "खोजें:" : "शोधा:"}
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.filterSearchPlaceholder}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Pools List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>{t.openPools}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {filteredPools.length}
            </span>
          </h4>
        </div>

        {filteredPools.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              {t.noPoolsMatch}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-colors cursor-pointer"
              >
                {t.resetFiltersBtn}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredPools.map((pool) => {
              const reservedKg = pool.participants.reduce((sum, p) => sum + p.loadWeightKg, 0);
              const availableSpaceKg = Math.max(0, pool.totalCapacityKg - reservedKg);
              const percentFilled = Math.min(100, Math.round((reservedKg / pool.totalCapacityKg) * 100));
              const isFull = availableSpaceKg <= 100;

              // Collaborative Savings Calculation for this pool
              // Average solo trip hire for this distance:
              const soloTripCost = Math.round(pool.totalTripFare * 0.85);
              const avgPooledShare = Math.round(pool.totalTripFare / Math.max(2, pool.participants.length + 1));
              const estimatedTripSavings = Math.max(0, soloTripCost - avgPooledShare);
              const dieselSavedTrip = Math.round((pool.distanceKm / 10) * 1.1);

              return (
                <div
                  key={pool.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  {/* Card Top */}
                  <div className="p-5">
                    {/* Destination & Status Header */}
                    <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-1">
                          {pool.originTaluka}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 font-display flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{pool.destinationMandi}</span>
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          {pool.distanceKm} km • {pool.departureDate} ({pool.departureTime})
                        </span>
                      </div>

                      {isFull ? (
                        <span className="text-[10px] font-extrabold px-2 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                          {t.poolFullBadge}
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 animate-pulse">
                          {t.openBadge}
                        </span>
                      )}
                    </div>

                    {/* Vehicle & Capacity Progress Bar */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-500" />
                          <span>{pool.vehicleType}</span>
                        </span>
                        <span className="font-bold text-slate-800">
                          {reservedKg} / {pool.totalCapacityKg} kg ({percentFilled}%)
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all rounded-full ${
                            percentFilled > 85 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-emerald-700">
                          {t.availableSpace} {availableSpaceKg.toLocaleString("en-IN")} kg
                        </span>
                        <span className="text-slate-700">
                          {t.totalTripFare} ₹{pool.totalTripFare.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* 🎯 USER REQUEST: HIGHLIGHT HOW MUCH THE FARMER SAVES BY COLLABORATING */}
                    <div className="p-3 my-3 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{t.collaborationSavingsTitle}</span>
                        </span>
                        <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300 font-mono">
                          ~₹{estimatedTripSavings.toLocaleString("en-IN")} ({t.youSaveLabel})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-emerald-200/50">
                        <div>
                          <span>{t.soloTripComparison} </span>
                          <span className="line-through text-slate-400 font-bold">
                            ₹{soloTripCost.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-800 font-bold flex items-center justify-end gap-1">
                            <Leaf className="w-3 h-3 text-emerald-600" />
                            <span>~{dieselSavedTrip} {t.dieselSavedBadge}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Participants / Manifest */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        {t.participantsTitle}
                      </span>
                      <div className="space-y-1.5">
                        {pool.participants.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200"
                          >
                            <div>
                              <span className="font-bold text-slate-800 block">
                                {p.farmerName} ({p.village})
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {p.crop} • {p.loadWeightKg} kg
                              </span>
                            </div>
                            <span className="font-bold text-emerald-700 font-mono">
                              ₹{p.splitCost.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-600">
                      <span>{t.hostLabel} </span>
                      <strong>{pool.hostFarmerName}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${pool.hostPhone}`}
                        className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3 text-slate-600" />
                        <span>{t.callBtn}</span>
                      </a>
                      <a
                        href={`https://wa.me/91${pool.hostPhone}?text=${encodeURIComponent(
                          `Hello ${pool.hostFarmerName}, I would like to join your shared transport pool to ${pool.destinationMandi}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>{t.whatsappBtn}</span>
                      </a>

                      {!isFull && (
                        <button
                          type="button"
                          onClick={() => setSelectedPoolForJoin(pool)}
                          id={`join-pool-btn-${pool.id}`}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.joinPoolBtn}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Join Pool */}
      {selectedPoolForJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{t.modalJoinTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPoolForJoin(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 my-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
              <span className="font-bold block">
                {selectedPoolForJoin.originTaluka} → {selectedPoolForJoin.destinationMandi}
              </span>
              <span className="text-[11px] text-blue-800">
                {selectedPoolForJoin.vehicleType} • {selectedPoolForJoin.departureDate} ({selectedPoolForJoin.departureTime})
              </span>
            </div>

            <form onSubmit={handleConfirmJoin} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.joinCropLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={joinCrop}
                    onChange={(e) => setJoinCrop(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.joinWeightLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    max="5000"
                    step="50"
                    value={joinWeightKg}
                    onChange={(e) => setJoinWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.joinFarmerNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={joinFarmerName}
                    onChange={(e) => setJoinFarmerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.joinPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={joinPhone}
                    onChange={(e) => setJoinPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinVillageLabel}
                </label>
                <input
                  type="text"
                  required
                  value={joinVillage}
                  onChange={(e) => setJoinVillage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Dynamic Split Math & Direct Savings Breakdown */}
              {(() => {
                const currentReserved = selectedPoolForJoin.participants.reduce(
                  (acc, p) => acc + p.loadWeightKg,
                  0
                );
                const newTotalLoad = currentReserved + joinWeightKg;
                const estSplitCost = Math.round(
                  (joinWeightKg / newTotalLoad) * selectedPoolForJoin.totalTripFare
                );
                const soloCost = Math.round(1200 + joinWeightKg * 2.2);
                const netSavings = Math.max(0, soloCost - estSplitCost);
                const dieselSaved = Math.round((joinWeightKg / 1000) * 8.5);

                return (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-slate-800 space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                      {currentLang === "en" ? "YOUR COLLABORATIVE SAVINGS" : currentLang === "hi" ? "आपकी साझा बचत" : "तुमची सामाईक बचत"}
                    </span>

                    <div className="flex justify-between">
                      <span className="text-slate-600">{t.soloTripCompare}</span>
                      <span className="line-through text-slate-500 font-mono">
                        ₹{soloCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-700 font-semibold">{t.yourSplitShare}</span>
                      <span className="font-extrabold text-emerald-800 font-mono text-sm">
                        ₹{estSplitCost.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
                      <span className="text-emerald-900">{t.instantSavings}</span>
                      <span className="text-emerald-700 font-display font-extrabold text-base">
                        +₹{netSavings.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.fuelSavedEst}</span>
                      </span>
                      <span className="font-bold">~{dieselSaved} {currentLang === "en" ? "Litres Diesel" : currentLang === "hi" ? "लीटर डीजल" : "लिटर डिझेल"}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedPoolForJoin(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="confirm-join-shared-btn"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t.confirmJoinBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Host New Pool */}
      {isHostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>{t.modalHostTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsHostModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePool} className="space-y-3.5 text-xs mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostDestLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={hostDestMandi}
                    onChange={(e) => setHostDestMandi(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostOriginLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={hostOrigin}
                    onChange={(e) => setHostOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostVehicleLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={hostVehicleType}
                    onChange={(e) => setHostVehicleType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostCapacityLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="500"
                    value={hostTotalCapacity}
                    onChange={(e) => setHostTotalCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostMyCropLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={hostMyCrop}
                    onChange={(e) => setHostMyCrop(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostMyWeightLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    max={hostTotalCapacity}
                    value={hostMyWeight}
                    onChange={(e) => setHostMyWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostTotalFareLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={hostTotalFare}
                    onChange={(e) => setHostTotalFare(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.hostPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={hostPhone}
                    onChange={(e) => setHostPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.hostNotesLabel}
                </label>
                <textarea
                  rows={2}
                  value={hostNotes}
                  onChange={(e) => setHostNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsHostModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="create-shared-pool-btn"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t.createPoolBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
