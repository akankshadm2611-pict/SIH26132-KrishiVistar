import React, { useState, useEffect } from "react";
import {
  Warehouse,
  Snowflake,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Phone,
  Thermometer,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  TrendingDown,
  Bell,
  Check,
  AlertCircle,
  Truck,
  Plus,
  Eye,
  EyeOff,
  Clock,
  User,
  Package,
  Layers,
  RefreshCw,
} from "lucide-react";
import { initialColdStorages } from "../../mockData";
import { ColdStorageFacility, ColdStorageBookingRequest } from "../../types";
import { Language } from "../../translations";
import farmStorageShedSunsetImg from "../../assets/images/farm_storage_shed_sunset_1789910993337.jpg";

interface FarmerColdStorageProps {
  currentLang?: Language;
  onStorageBooked?: (facility: ColdStorageFacility, days: number, qtyKg: number) => void;
  onBackToDashboard?: () => void;
}

const tStorage = {
  mr: {
    backToDashboard: "← मुख्य डॅशबोर्डवर परत जा",
    closeDashboard: "डॅशबोर्डवर जा",
    badgeDistress: "अवाजवी विक्री प्रतिबंध",
    badgeLoss: "कापणीनंतरचे नुकसान संरक्षण",
    bannerTitle: "शीतगृह",
    bannerSubtitle: "बाजारपेठेत आवक वाढल्यास किंवा पावसात कमी भावात शेतमाल विकू नका. आपल्या शेताजवळ शीतगृह शोधा किंवा स्वतःचे शीतगृह व्यवस्थापित करा.",
    tabFind: "🔍 शीतगृहे शोधा व जागा बुक करा",
    tabMyStorage: "🏭 माझे शीतगृह व जागा व्यवस्थापन",
    typicalCost: "नियमित साठवणूक दर:",
    perKgDay: "₹०.१५ / किलो / दिवस",
    preservesGrade: "२१ दिवसांपर्यंत प्रत अ गुणवत्ता सुरक्षित राहते",
    away: "किमी दूर",
    availableSpace: "उपलब्ध जागा:",
    mtFree: "MT शिल्लक",
    temperature: "तापमान:",
    rate: "दर:",
    monthlySacks: "मासिक पोते दर:",
    bagMonth: "/ पोते / महिना",
    reserveBtn: "जागा आरक्षित करण्यासाठी अर्ज करा",
    modalTitle: "शीतगृह जागा आरक्षण अर्ज",
    reservedSuccess: "शीतगृह अर्ज नोंदवला गेला!",
    receiptDesc: "आपला साठवणूक अर्ज नोंदवला गेला आहे. शीतगृह मालक तपासणी करून जागा मंजूर करतील.",
    facilityPhone: "शीतगृह संपर्क:",
    storedQty: "साठवलेला माल:",
    duration: "कालावधी:",
    days: "दिवस",
    estCost: "अंदाजे खर्च:",
    done: "पूर्ण झाले",
    qtyLabel: "साठवणुकीसाठी शेतमाल वजन (MT)",
    durationLabel: "साठवणूक कालावधी (दिवस)",
    priceSurgeNote: "दरवाढ होईपर्यंत माल सुरक्षित साठवा",
    dailyRate: "दैनिक दर:",
    totalEstStorage: "एकूण अंदाजे साठवणूक शुल्क:",
    cancel: "रद्द करा",
    confirmGatePass: "अर्ज सादर करा व टोकन मिळवा",
    ownerTitle: "माझे शीतगृह सुविधा केंद्र",
    visibilityToggleLabel: "इतर शेतकऱ्यांसाठी दृश्यमानता",
    visibleActive: "🟢 इतर शेतकऱ्यांना दृश्यमान (बुकिंग सुरू)",
    visibleInactive: "⚪ सध्या अप्रकाशित / खाजगी (नवीन बुकिंग बंद)",
    toggleActiveText: "दृश्यमान सुरू",
    togglePrivateText: "खाजगी करा",
    totalCapLabel: "एकूण क्षमता",
    occupiedLabel: "सध्या वापरलेली जागा",
    remainingLabel: "शिल्लक उपलब्ध जागा",
    spaceAlertNote: "शेतकऱ्यांनी अर्ज केल्यावर आणि आपण तो स्वीकारल्यावर जागा कमी होईल. माल रवाना केल्यावर ती जागा पुन्हा उपलब्ध होईल.",
    subTabPending: "नवीन आलेले अर्ज",
    subTabActive: "सध्या शीतगृहात साठवलेला माल",
    subTabHistory: "रवाना झालेला माल व इतिहास",
    acceptBtn: "स्वीकारा व जागा वजा करा",
    rejectBtn: "नाकारा",
    dispatchBtn: "माल रवाना करा व जागा रिकामी करा (+MT)",
    dispatchModalTitle: "माल रवाना करण्याची पुष्टी",
    dispatchConfirmText: "हा माल शीतगृहातून रवाना करायचा आहे का? यामुळे शीतगृहात जागा त्वरित परत उपलब्ध होईल.",
    confirmDispatch: "रवाना करा व जागा मिळवा",
    simulateBtn: "+ नवीन शेतकऱ्याचा अर्ज सिम्युलेट करा",
    notifyHeading: "नवीन साठवणूक अर्ज आले आहेत!",
    farmerOwnedBadge: "👨‍🌾 शेतकरी मालकीचे शीतगृह (आपले)",
    unitMtTons: "MT (मेट्रिक टन)",
    approxBags: "सुमारे",
    bagsText: "पोती / बॅग",
    spaceOccupiedPercent: "जागा व्यापली आहे",
    activeLotsSuffix: "सक्रिय लॉट",
    spaceSufficient: "✅ पुरेशी जागा उपलब्ध आहे",
    spaceLimited: "⚠️ जागा मर्यादित शिल्लक आहे",
    spaceFull: "🔴 शीतगृह पूर्ण भरले आहे",
    utilizationLabel: "शीतगृह जागा वापर प्रमाण:",
    usedWord: "वापरली",
    freeWord: "शिल्लक",
    noPendingTitle: "सर्व अर्ज तपासले आहेत",
    noPendingDesc: "सध्या कोणताही नवीन शेतकरी अर्ज प्रलंबित नाही. इतर शेतकरी जेव्हा आपल्या शीतगृहासाठी अर्ज करतील तेव्हा येथे दिसेल.",
    testApplicantBtn: "+ चाचणी अर्ज तयार करा",
    cropProduce: "शेतमाल / पीक:",
    requestedSpace: "मागणी केलेली जागा:",
    bagsSuffix: "पोती",
    expectedDuration: "अपेक्षित कालावधी:",
    estRevenue: "अंदाजे साठवणूक महसूल:",
    reviewNow: "अर्ज तपासा व स्वीकारा →",
    noActiveTitle: "शीतगृहात सध्या कोणताही माल साठवलेला नाही",
    noActiveDesc: "शेतकऱ्यांचे आलेले अर्ज स्वीकारल्यानंतर ते येथे दिसतील.",
    activeBannerText1: "सध्या एकूण",
    activeBannerText2: "शेतमाल शीतगृहातील विविध चेंबर्समध्ये सुरक्षित साठवलेला आहे. माल जेव्हा बाहेर रवाना होईल, तेव्हा 'माल रवाना करा' बटणावर क्लिक करून ती जागा त्वरित मोकळी करा.",
    statusStored: "साठवला आहे",
    storageDate: "साठवल्याची तारीख:",
    expectedDispatch: "अपेक्षित रवानगी:",
    totalRentLabel: "एकूण भाडे शुल्क:",
    noHistory: "अद्याप कोणताही माल रवाना झालेला नाही.",
    thToken: "टोकन आयडी",
    thFarmer: "शेतकरी",
    thCropWeight: "पीक व वजन",
    thStatus: "स्थिती",
    thDispatchDate: "रवानगी तारीख",
    thTotalRent: "जमा भाडे",
    statusDispatched: "रवाना झाला",
    statusRejected: "नाकारले",
    directoryTitle: "उपलब्ध शीतगृहांची यादी",
    directorySubtitle: "आपल्या शेताजवळील प्रमाणित शीतगृहांची क्षमता तपासा आणि जागेसाठी थेट अर्ज करा.",
    facilitiesCountSuffix: "सुविधा उपलब्ध",
    tokenLabel: "टोकन:",
    farmerLabel: "शेतकरी:",
    cropAndWeightLabel: "पीक व वजन:",
    spaceRestoredLabel: "परत मिळणारी जागा:",
    spaceFreedUpText: "जागा मोकळी होईल",
    availableSpaceColon: "उपलब्ध जागा:",
    myFacilityName: "श्री गणेश किसान समृद्धी शीतगृह व वेअरहाऊस",
    myFacilityLocation: "पिंपळगाव बसवंत, जि. नाशिक",
    myFacilityTemp: "२°C ते १०°C मल्टी-चेंबर आर्द्रता नियंत्रित",
    myFacilityOwner: "आपले शीतगृह",
  },
  hi: {
    backToDashboard: "← मुख्य डैशबोर्ड पर वापस जाएं",
    closeDashboard: "डैशबोर्ड पर जाएं",
    badgeDistress: "मजबूरी में कम बिक्री रोकथाम",
    badgeLoss: "कटाई बाद नुकसान से सुरक्षा",
    bannerTitle: "कोल्ड स्टोरेज",
    bannerSubtitle: "मंडी में अधिक आवक होने पर औने-पौने भाव में न बेचें। कोल्ड स्टोरेज खोजें या अपना स्वयं का कोल्ड स्टोरेज प्रबंधित करें।",
    tabFind: "🔍 कोल्ड स्टोरेज खोजें व जगह बुक करें",
    tabMyStorage: "🏭 मेरा कोल्ड स्टोरेज व स्पेस प्रबंधन",
    typicalCost: "सामान्य भंडारण लागत:",
    perKgDay: "₹०.१५ / किग्रा / दिन",
    preservesGrade: "२१ दिनों तक ग्रेड ए गुणवत्ता सुरक्षित",
    away: "किमी दूर",
    availableSpace: "उपलब्ध स्थान:",
    mtFree: "MT खाली",
    temperature: "तापमान:",
    rate: "दर:",
    monthlySacks: "मासिक बोरी दर:",
    bagMonth: "/ बोरी / माह",
    reserveBtn: "स्थान आरक्षण हेतु आवेदन करें",
    modalTitle: "कोल्ड स्टोरेज स्पेस बुकिंग आवेदन",
    reservedSuccess: "कोल्ड स्टोरेज आवेदन दर्ज हुआ!",
    receiptDesc: "आपका भंडारण आवेदन दर्ज हो गया है। संचालक सत्यापन के बाद स्थान स्वीकृत करेंगे।",
    facilityPhone: "सुविधा संपर्क:",
    storedQty: "भंडारित मात्रा:",
    duration: "अवधि:",
    days: "दिन",
    estCost: "अनुमानित खर्च:",
    done: "हो गया",
    qtyLabel: "भंडारण हेतु फसल मात्रा (MT)",
    durationLabel: "भंडारण अवधि (दिन)",
    priceSurgeNote: "भाव वृद्धि तक सुरक्षित भंडारण",
    dailyRate: "दैनिक दर:",
    totalEstStorage: "कुल अनुमानित भंडारण शुल्क:",
    cancel: "रद्द करें",
    confirmGatePass: "आवेदन प्रस्तुत करें व टोकन प्राप्त करें",
    ownerTitle: "मेरा कोल्ड स्टोरेज सुविधा केंद्र",
    visibilityToggleLabel: "अन्य किसानों के लिए दृश्यता",
    visibleActive: "🟢 अन्य किसानों के लिए दृश्यमान (बुकिंग चालू)",
    visibleInactive: "⚪ वर्तमान में अप्रकाशित / निजी (नई बुकिंग बंद)",
    toggleActiveText: "दृश्यमान सक्रिय",
    togglePrivateText: "निजी करें",
    totalCapLabel: "कुल क्षमता",
    occupiedLabel: "वर्तमान में प्रयुक्त स्थान",
    remainingLabel: "शेष उपलब्ध स्थान",
    spaceAlertNote: "किसान द्वारा आवेदन करने और आपके द्वारा स्वीकारने पर जगह घटेगी। माल रवाना होने पर वह जगह वापस मिल जाएगी।",
    subTabPending: "नए प्राप्त आवेदन",
    subTabActive: "वर्तमान में भंडारित माल",
    subTabHistory: "रवाना माल एवं इतिहास",
    acceptBtn: "स्वीकार करें व जगह घटाएं",
    rejectBtn: "अस्वीकार करें",
    dispatchBtn: "माल रवाना करें व जगह वापस पाएं (+MT)",
    dispatchModalTitle: "माल रवानगी की पुष्टि",
    dispatchConfirmText: "क्या यह माल कोल्ड स्टोरेज से रवाना करना है? इससे आपके स्टोरेज में जगह तुरंत वापस बढ़ जाएगी।",
    confirmDispatch: "रवाना करें व जगह पाएं",
    simulateBtn: "+ नए किसान का आवेदन सिम्युलेट करें",
    notifyHeading: "नए भंडारण आवेदन प्राप्त हुए हैं!",
    farmerOwnedBadge: "👨‍🌾 किसान स्वामित्व कोल्ड स्टोरेज (आपका)",
    unitMtTons: "MT (मीट्रिक टन)",
    approxBags: "लगभग",
    bagsText: "बोरी / बैग",
    spaceOccupiedPercent: "स्थान प्रयुक्त है",
    activeLotsSuffix: "सक्रिय लॉट",
    spaceSufficient: "✅ पर्याप्त जगह उपलब्ध है",
    spaceLimited: "⚠️ सीमित जगह शेष है",
    spaceFull: "🔴 कोल्ड स्टोरेज पूरा भर चुका है",
    utilizationLabel: "कोल्ड स्टोरेज क्षमता उपयोग:",
    usedWord: "प्रयुक्त",
    freeWord: "खाली",
    noPendingTitle: "सभी आवेदन जांच लिए गए हैं",
    noPendingDesc: "वर्तमान में कोई नया आवेदन लंबित नहीं है। जब किसान जगह के लिए आवेदन करेंगे तो यहां दिखाई देगा।",
    testApplicantBtn: "+ टेस्ट आवेदन जोड़ें",
    cropProduce: "फसल / उपज:",
    requestedSpace: "मांगी गई जगह:",
    bagsSuffix: "बोरी",
    expectedDuration: "अपेक्षित अवधि:",
    estRevenue: "अनुमानित भंडारण आय:",
    reviewNow: "आवेदन जांचें व स्वीकारें →",
    noActiveTitle: "कोल्ड स्टोरेज में वर्तमान में कोई माल भंडारित नहीं है",
    noActiveDesc: "स्वीकृत किसान आवेदन सक्रिय भंडारण के रूप में यहां दिखेंगे।",
    activeBannerText1: "वर्तमान में कुल",
    activeBannerText2: "कृषि उपज तापमान नियंत्रित चैंबर में सुरक्षित रखी गई है। जब माल बाहर भेजा जाए, तब 'माल रवाना करें' बटन दबाकर जगह तुरंत मुक्त करें।",
    statusStored: "भंडारित है",
    storageDate: "भंडारण तिथि:",
    expectedDispatch: "अपेक्षित रवानगी:",
    totalRentLabel: "कुल भंडारण शुल्क:",
    noHistory: "अभी तक कोई माल रवाना नहीं हुआ है।",
    thToken: "टोकन आईडी",
    thFarmer: "किसान",
    thCropWeight: "फसल व वजन",
    thStatus: "स्थिति",
    thDispatchDate: "रवानगी तिथि",
    thTotalRent: "कुल किराया",
    statusDispatched: "रवाना हुआ",
    statusRejected: "अस्वीकृत",
    directoryTitle: "उपलब्ध कोल्ड स्टोरेज सूची",
    directorySubtitle: "अपने खेत के निकट सत्यापित कोल्ड स्टोरेज की क्षमता देखें और जगह हेतु सीधा आवेदन करें।",
    facilitiesCountSuffix: "सुविधाएं उपलब्ध",
    tokenLabel: "टोकन:",
    farmerLabel: "किसान:",
    cropAndWeightLabel: "फसल व वजन:",
    spaceRestoredLabel: "वापस मिलने वाली जगह:",
    spaceFreedUpText: "जगह मुक्त होगी",
    availableSpaceColon: "उपलब्ध जगह:",
    myFacilityName: "श्री गणेश किसान समृद्धि कोल्ड स्टोरेज व वेयरहाउस",
    myFacilityLocation: "पिंपलगांव बसवंत, जिला नासिक",
    myFacilityTemp: "2°C से 10°C मल्टी-चैंबर आर्द्रता नियंत्रित",
    myFacilityOwner: "आपकी सुविधा",
  },
  en: {
    backToDashboard: "← Back to Main Dashboard",
    closeDashboard: "To Dashboard",
    badgeDistress: "Distress Sale Prevention",
    badgeLoss: "Post-Harvest Loss Protection",
    bannerTitle: "Cold Storage",
    bannerSubtitle: "Preserve produce during market gluts. Find nearby verified cold storages or manage your own cold storage facility with live space tracking.",
    tabFind: "🔍 Find & Apply for Cold Storage",
    tabMyStorage: "🏭 My Cold Storage & Space Manager",
    typicalCost: "Typical Storage Cost:",
    perKgDay: "₹0.15 / kg / day",
    preservesGrade: "Preserves Grade A quality for up to 21 days",
    away: "km away",
    availableSpace: "Available Space:",
    mtFree: "MT Free",
    temperature: "Temperature:",
    rate: "Rate:",
    monthlySacks: "Monthly Sacks:",
    bagMonth: "/ bag / month",
    reserveBtn: "Apply for Storage Space",
    modalTitle: "Apply for Cold Storage Space",
    reservedSuccess: "Storage Request Submitted!",
    receiptDesc: "Your storage request has been placed. The facility owner will review and confirm your space allocation.",
    facilityPhone: "Facility Phone:",
    storedQty: "Stored Qty:",
    duration: "Duration:",
    days: "days",
    estCost: "Est. Cost:",
    done: "Done",
    qtyLabel: "Produce Quantity to Store (MT)",
    durationLabel: "Holding Duration (Days)",
    priceSurgeNote: "Holding until price surge on market",
    dailyRate: "Daily Rate:",
    totalEstStorage: "Total Estimated Storage:",
    cancel: "Cancel",
    confirmGatePass: "Submit Request & Get Slip",
    ownerTitle: "My Cold Storage Facility Center",
    visibilityToggleLabel: "Visibility to Other Farmers",
    visibleActive: "🟢 Publicly Visible to Other Farmers (Accepting Bookings)",
    visibleInactive: "⚪ Private / Hidden (Bookings Paused)",
    toggleActiveText: "Active / Visible",
    togglePrivateText: "Make Private",
    totalCapLabel: "Total Capacity",
    occupiedLabel: "Currently Stored / Occupied",
    remainingLabel: "Remaining Available Space",
    spaceAlertNote: "When farmers apply and you accept, space reduces automatically. When a stored lot is dispatched, space is gained back.",
    subTabPending: "Pending Applications",
    subTabActive: "Currently Stored Lots",
    subTabHistory: "Dispatched History & Logs",
    acceptBtn: "Accept & Deduct Space",
    rejectBtn: "Reject",
    dispatchBtn: "Mark Dispatched & Gain Space (+MT)",
    dispatchModalTitle: "Confirm Lot Dispatch",
    dispatchConfirmText: "Are you sure you want to dispatch this lot? This will immediately restore and free up storage space in your facility.",
    confirmDispatch: "Confirm Dispatch & Restore Space",
    simulateBtn: "+ Simulate Incoming Farmer Application",
    notifyHeading: "New Storage Applications Waiting!",
    farmerOwnedBadge: "👨‍🌾 Farmer-Owned Facility (Yours)",
    unitMtTons: "MT (Metric Tons)",
    approxBags: "Approx.",
    bagsText: "bags",
    spaceOccupiedPercent: "space occupied",
    activeLotsSuffix: "active lots",
    spaceSufficient: "✅ Ample space available",
    spaceLimited: "⚠️ Limited space remaining",
    spaceFull: "🔴 Cold storage is full",
    utilizationLabel: "Cold Storage Capacity Utilization:",
    usedWord: "used",
    freeWord: "free",
    noPendingTitle: "All applications reviewed",
    noPendingDesc: "No pending farmer applications at the moment. When other farmers apply for storage space, they will appear here.",
    testApplicantBtn: "+ Simulate Test Application",
    cropProduce: "Crop / Produce:",
    requestedSpace: "Requested Space:",
    bagsSuffix: "bags",
    expectedDuration: "Expected Duration:",
    estRevenue: "Estimated Storage Revenue:",
    reviewNow: "Review & Accept Application →",
    noActiveTitle: "No produce currently stored",
    noActiveDesc: "Accepted farmer applications will appear here with active holding duration.",
    activeBannerText1: "Currently a total of",
    activeBannerText2: "produce is securely stored across temperature-controlled chambers. When a lot is dispatched, click 'Mark Dispatched' to instantly restore available capacity.",
    statusStored: "Stored",
    storageDate: "Storage Date:",
    expectedDispatch: "Expected Dispatch:",
    totalRentLabel: "Total Storage Rent:",
    noHistory: "No dispatched lots recorded yet.",
    thToken: "Token ID",
    thFarmer: "Farmer",
    thCropWeight: "Crop & Weight",
    thStatus: "Status",
    thDispatchDate: "Dispatch Date",
    thTotalRent: "Total Rent",
    statusDispatched: "Dispatched",
    statusRejected: "Rejected",
    directoryTitle: "Available Cold Storage Directory",
    directorySubtitle: "Check available capacity at verified facilities near your farm and apply for space directly.",
    facilitiesCountSuffix: "Facilities Available",
    tokenLabel: "Token:",
    farmerLabel: "Farmer:",
    cropAndWeightLabel: "Crop & Weight:",
    spaceRestoredLabel: "Space Restored:",
    spaceFreedUpText: "space will be restored",
    availableSpaceColon: "Available Space:",
    myFacilityName: "Shri Ganesh Kisan Cold Hub & Warehouse",
    myFacilityLocation: "Pimpalgaon Baswant, Dist. Nashik",
    myFacilityTemp: "2°C to 10°C Multi-Chamber Humidity Controlled",
    myFacilityOwner: "Your Facility",
  },
};

export const FarmerColdStorage: React.FC<FarmerColdStorageProps> = ({
  currentLang = "en",
  onStorageBooked,
  onBackToDashboard,
}) => {
  const t = tStorage[currentLang] || tStorage.en;

  // Active Main Tab: "find" or "myStorage"
  const [activeMainTab, setActiveMainTab] = useState<"find" | "myStorage">("myStorage");

  // Sub Tab in My Storage: "pending" | "active" | "history"
  const [subTab, setSubTab] = useState<"pending" | "active" | "history">("pending");

  // Localized Initial Requests & Lots
  const getInitialRequests = (lang: string = "en"): ColdStorageBookingRequest[] => {
    const isMr = lang === "mr";
    const isHi = lang === "hi";
    return [
      {
        id: "req-01",
        facilityId: "cs-my-facility",
        facilityName: isMr
          ? "श्री गणेश किसान समृद्धी शीतगृह व वेअरहाऊस"
          : isHi
          ? "श्री गणेश किसान समृद्धि कोल्ड स्टोरेज व वेयरहाउस"
          : "Shri Ganesh Kisan Cold Hub & Warehouse",
        farmerId: "f-101",
        farmerName: isMr
          ? "रमेश बाळू देशमुख"
          : isHi
          ? "रमेश बालू देशमुख"
          : "Ramesh Balu Deshmukh",
        farmerPhone: "+91 98220 12345",
        farmerVillage: isMr
          ? "पिंपळगाव बसवंत, नाशिक"
          : isHi
          ? "पिंपलगांव बसवंत, नासिक"
          : "Pimpalgaon Baswant, Nashik",
        crop: isMr
          ? "नाशिक लाल कांदा"
          : isHi
          ? "नासिक लाल प्याज"
          : "Nashik Red Onion",
        quantityMT: 25,
        requestedDays: 45,
        startDate: "2025-05-10",
        expectedDispatchDate: "2025-06-25",
        status: "pending",
        createdAt: isMr ? "२ तास आधी" : isHi ? "2 घंटे पहले" : "2 hours ago",
        notes: isMr
          ? "चांगला वाळवलेला प्रत अ कांदा आहे. हवेशीर चेंबरमध्ये जागा हवी."
          : isHi
          ? "अच्छी तरह सूखा हुआ ए-ग्रेड प्याज है। हवादार चैंबर में जगह चाहिए।"
          : "Well-cured Grade-A red onion. Ventilated chamber space required.",
        dailyRatePerKg: 0.15,
        totalEstimatedRent: 16875,
        token: "CS-REQ-9921",
      },
      {
        id: "req-02",
        facilityId: "cs-my-facility",
        facilityName: isMr
          ? "श्री गणेश किसान समृद्धी शीतगृह व वेअरहाऊस"
          : isHi
          ? "श्री गणेश किसान समृद्धि कोल्ड स्टोरेज व वेयरहाउस"
          : "Shri Ganesh Kisan Cold Hub & Warehouse",
        farmerId: "f-102",
        farmerName: isMr
          ? "संजय नामदेव पाटील"
          : isHi
          ? "संजय नामदेव पाटिल"
          : "Sanjay Namdev Patil",
        farmerPhone: "+91 94231 67890",
        farmerVillage: isMr
          ? "दिंडोरी, नाशिक"
          : isHi
          ? "दिंडोरी, नासिक"
          : "Dindori, Nashik",
        crop: isMr ? "हायब्रिड टोमॅटो" : isHi ? "हाइब्रिड टमाटर" : "Hybrid Tomato",
        quantityMT: 15,
        requestedDays: 14,
        startDate: "2025-05-11",
        expectedDispatchDate: "2025-05-25",
        status: "pending",
        createdAt: isMr ? "काल सायंकाळी" : isHi ? "कल शाम" : "Yesterday evening",
        notes: isMr
          ? "क्रेटींग केलेला टोमॅटो माल. ६°C ते ८°C तापमान आवश्यक."
          : isHi
          ? "क्रेट में सुरक्षित टमाटर। 6°C से 8°C तापमान आवश्यक।"
          : "Crated fresh tomatoes. Requires 6°C to 8°C humidity controlled space.",
        dailyRatePerKg: 0.15,
        totalEstimatedRent: 3150,
        token: "CS-REQ-9922",
      },
      {
        id: "req-03",
        facilityId: "cs-my-facility",
        facilityName: isMr
          ? "श्री गणेश किसान समृद्धी शीतगृह व वेअरहाऊस"
          : isHi
          ? "श्री गणेश किसान समृद्धि कोल्ड स्टोरेज व वेयरहाउस"
          : "Shri Ganesh Kisan Cold Hub & Warehouse",
        farmerId: "f-103",
        farmerName: isMr
          ? "आनंद तुकाराम शिंदे"
          : isHi
          ? "आनंद तुकाराम शिंदे"
          : "Anand Tukaram Shinde",
        farmerPhone: "+91 98901 44556",
        farmerVillage: isMr
          ? "निफाड, नाशिक"
          : isHi
          ? "निफाड, नासिक"
          : "Niphad, Nashik",
        crop: isMr
          ? "हिरवी द्राक्षे (थॉमसन)"
          : isHi
          ? "हरी अंगूर (थॉमसन)"
          : "Thompson Export Grapes",
        quantityMT: 40,
        requestedDays: 30,
        startDate: "2025-05-01",
        expectedDispatchDate: "2025-05-31",
        status: "accepted",
        createdAt: isMr ? "१० दिवस आधी" : isHi ? "10 दिन पहले" : "10 days ago",
        notes: isMr
          ? "निर्यात दर्जाची द्राक्षे. ०°C ते २°C चेंबरमध्ये साठवली आहेत."
          : isHi
          ? "निर्यात गुणवत्ता के अंगूर। 0°C से 2°C चैंबर में भंडारित।"
          : "Export grade grapes. Preserved in 0°C to 2°C chamber.",
        dailyRatePerKg: 0.15,
        totalEstimatedRent: 18000,
        token: "CS-PASS-88412",
      },
      {
        id: "req-04",
        facilityId: "cs-my-facility",
        facilityName: isMr
          ? "श्री गणेश किसान समृद्धी शीतगृह व वेअरहाऊस"
          : isHi
          ? "श्री गणेश किसान समृद्धि कोल्ड स्टोरेज व वेयरहाउस"
          : "Shri Ganesh Kisan Cold Hub & Warehouse",
        farmerId: "f-104",
        farmerName: isMr
          ? "कैलास भोर"
          : isHi
          ? "कैलाश भोर"
          : "Kailas Bhor",
        farmerPhone: "+91 97654 33221",
        farmerVillage: isMr
          ? "सिन्नर, नाशिक"
          : isHi
          ? "सिन्नर, नासिक"
          : "Sinnar, Nashik",
        crop: isMr ? "ज्योती बटाटा" : isHi ? "ज्योति आलू" : "Jyoti Seed Potato",
        quantityMT: 30,
        requestedDays: 40,
        startDate: "2025-03-15",
        expectedDispatchDate: "2025-04-25",
        status: "dispatched",
        createdAt: isMr ? "१ महिना आधी" : isHi ? "1 माह पहले" : "1 month ago",
        notes: isMr
          ? "पूर्ण भाडे जमा झाले. माल सुरक्षित रवाना करण्यात आला."
          : isHi
          ? "पूर्ण किराया प्राप्त। माल सुरक्षित रवाना किया गया।"
          : "Full payment cleared. Stored lot safely dispatched.",
        dailyRatePerKg: 0.15,
        totalEstimatedRent: 18000,
        token: "CS-PASS-77109",
        actualDispatchedDate: "2025-04-26",
      },
    ];
  };

  // Facility Settings for the Farmer's Own Cold Storage
  const [myStorageConfig, setMyStorageConfig] = useState({
    id: "cs-my-facility",
    phone: "+91 98224 88990",
    totalCapacityMT: 500, // Total metric tons
    pricePerKgPerDay: 0.15,
    pricePerBagPerMonth: 100,
    isPubliclyVisible: true, // Visible to other farmers
  });

  // Requests / Lots Data State
  const [requests, setRequests] = useState<ColdStorageBookingRequest[]>(() =>
    getInitialRequests(currentLang)
  );

  // Sync requests localization if language changes
  useEffect(() => {
    setRequests((prev) => {
      const fresh = getInitialRequests(currentLang);
      return prev.map((item) => {
        const match = fresh.find((f) => f.id === item.id);
        if (match) {
          return {
            ...item,
            farmerName: match.farmerName,
            farmerVillage: match.farmerVillage,
            crop: match.crop,
            createdAt: match.createdAt,
            notes: match.notes,
            facilityName: t.myFacilityName,
          };
        }
        return item;
      });
    });
  }, [currentLang, t.myFacilityName]);

  // Modals & UI States
  const [selectedFacilityForBooking, setSelectedFacilityForBooking] = useState<ColdStorageFacility | null>(null);
  const [bookingDays, setBookingDays] = useState(30);
  const [bookingQtyMT, setBookingQtyMT] = useState(10);
  const [bookingSuccessToken, setBookingSuccessToken] = useState<string | null>(null);
  const [dispatchConfirmReq, setDispatchConfirmReq] = useState<ColdStorageBookingRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper: Toast alert
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Dynamic Space Math:
  // Occupied = sum of quantityMT of all "accepted" requests
  const occupiedMT = requests
    .filter((r) => r.facilityId === myStorageConfig.id && r.status === "accepted")
    .reduce((acc, curr) => acc + curr.quantityMT, 0);

  const remainingMT = Math.max(0, myStorageConfig.totalCapacityMT - occupiedMT);
  const percentOccupied = Math.min(
    100,
    Math.round((occupiedMT / myStorageConfig.totalCapacityMT) * 100)
  );

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const activeLots = requests.filter((r) => r.status === "accepted");
  const historyLots = requests.filter((r) => r.status === "dispatched" || r.status === "rejected");

  // Accept Request: Deduct space
  const handleAcceptRequest = (reqId: string) => {
    const target = requests.find((r) => r.id === reqId);
    if (!target) return;

    if (target.quantityMT > remainingMT) {
      alert(
        currentLang === "mr"
          ? `क्षमस्व! आपल्याकडे फक्त ${remainingMT} MT जागा शिल्लक आहे, तर अर्ज ${target.quantityMT} MT चा आहे.`
          : `Insufficient space! Only ${remainingMT} MT available, request is for ${target.quantityMT} MT.`
      );
      return;
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: "accepted",
              token: "CS-PASS-" + Math.floor(10000 + Math.random() * 90000),
            }
          : r
      )
    );

    const newRem = remainingMT - target.quantityMT;
    showToast(
      currentLang === "mr"
        ? `✅ अर्ज स्वीकारला! ${target.quantityMT} MT जागा वजा झाली. नवीन शिल्लक जागा: ${newRem} MT.`
        : currentLang === "hi"
        ? `✅ आवेदन स्वीकृत! ${target.quantityMT} MT जगह घटी। नई शेष जगह: ${newRem} MT.`
        : `✅ Request accepted! ${target.quantityMT} MT allocated. New available space: ${newRem} MT.`
    );
  };

  // Reject Request
  const handleRejectRequest = (reqId: string) => {
    const target = requests.find((r) => r.id === reqId);
    if (!target) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, status: "rejected", rejectionReason: "जागा उपलब्ध नाही / चेंबर देखभाल" }
          : r
      )
    );

    showToast(
      currentLang === "mr"
        ? `❌ अर्ज नाकारला गेला. शिल्लक जागेत कोणताही बदल झाला नाही.`
        : `❌ Application rejected. Remaining space remains unchanged.`
    );
  };

  // Dispatch Lot: GAIN THAT MUCH SPACE BACK
  const handleConfirmDispatch = () => {
    if (!dispatchConfirmReq) return;
    const dispatchedQty = dispatchConfirmReq.quantityMT;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === dispatchConfirmReq.id
          ? {
              ...r,
              status: "dispatched",
              actualDispatchedDate: new Date().toISOString().split("T")[0],
            }
          : r
      )
    );

    const newAvailable = remainingMT + dispatchedQty;
    setDispatchConfirmReq(null);

    showToast(
      currentLang === "mr"
        ? `🚚 माल यशस्वीपणे रवाना झाला! +${dispatchedQty} MT जागा परत उपलब्ध झाली. नवीन शिल्लक जागा: ${newAvailable} MT!`
        : currentLang === "hi"
        ? `🚚 माल सफलतापूर्वक रवाना हुआ! +${dispatchedQty} MT जगह वापस मिली। नई उपलब्ध जगह: ${newAvailable} MT!`
        : `🚚 Lot dispatched successfully! +${dispatchedQty} MT space restored. New available space: ${newAvailable} MT!`
    );
  };

  // Simulate a new incoming farmer application for demonstration
  const handleSimulateNewApplicant = () => {
    const isMr = currentLang === "mr";
    const isHi = currentLang === "hi";

    const crops = isMr
      ? [
          { name: "नाशिक लाल कांदा", qty: 20, days: 60 },
          { name: "भगवा डाळिंब", qty: 15, days: 30 },
          { name: "ताजा टोमॅटो", qty: 10, days: 15 },
          { name: "हिरवी तिखट मिरची", qty: 8, days: 20 },
        ]
      : isHi
      ? [
          { name: "नासिक लाल प्याज", qty: 20, days: 60 },
          { name: "भगवा अनार", qty: 15, days: 30 },
          { name: "ताजा टमाटर", qty: 10, days: 15 },
          { name: "तीखी हरी मिर्च", qty: 8, days: 20 },
        ]
      : [
          { name: "Nashik Red Onion", qty: 20, days: 60 },
          { name: "Bhagwa Pomegranate", qty: 15, days: 30 },
          { name: "Fresh Table Tomatoes", qty: 10, days: 15 },
          { name: "Green Chilli", qty: 8, days: 20 },
        ];

    const farmers = isMr
      ? [
          { name: "संतोष ज्ञानदेव गायकवाड", phone: "+91 98234 11223", village: "ओझर, नाशिक" },
          { name: "विठ्ठल हरी जाधव", phone: "+91 97632 44551", village: "सटाणा, नाशिक" },
          { name: "गणपत तुळशीराम शिंदे", phone: "+91 99221 88776", village: "लासलगाव, नाशिक" },
        ]
      : isHi
      ? [
          { name: "संतोष ज्ञानदेव गायकवाड", phone: "+91 98234 11223", village: "ओझर, नासिक" },
          { name: "विठ्ठल हरी जाधव", phone: "+91 97632 44551", village: "सटाणा, नासिक" },
          { name: "गणपत तुलसीराम शिंदे", phone: "+91 99221 88776", village: "लासलगांव, नासिक" },
        ]
      : [
          { name: "Santosh Dnyandev Gaikwad", phone: "+91 98234 11223", village: "Ozar, Nashik" },
          { name: "Vitthal Hari Jadhav", phone: "+91 97632 44551", village: "Satana, Nashik" },
          { name: "Ganpat Tulshiram Shinde", phone: "+91 99221 88776", village: "Lasalgaon, Nashik" },
        ];

    const pickCrop = crops[Math.floor(Math.random() * crops.length)];
    const pickFarmer = farmers[Math.floor(Math.random() * farmers.length)];

    const newReq: ColdStorageBookingRequest = {
      id: "req-" + Date.now(),
      facilityId: myStorageConfig.id,
      facilityName: t.myFacilityName,
      farmerId: "f-" + Math.floor(100 + Math.random() * 900),
      farmerName: pickFarmer.name,
      farmerPhone: pickFarmer.phone,
      farmerVillage: pickFarmer.village,
      crop: pickCrop.name,
      quantityMT: pickCrop.qty,
      requestedDays: pickCrop.days,
      startDate: new Date().toISOString().split("T")[0],
      expectedDispatchDate: "2025-07-01",
      status: "pending",
      createdAt: isMr ? "आत्ताच" : isHi ? "अभी" : "Just now",
      notes: isMr
        ? "चांगली गुणवत्ता प्रत अ. आपल्या शीतगृहातील चेंबरमध्ये साठवणूक करायची आहे."
        : isHi
        ? "उत्तम गुणवत्ता ग्रेड ए उपज। आपके कोल्ड स्टोरेज में सुरक्षित भंडारण चाहिए।"
        : "Grade-A quality produce. Requires reliable temperature preservation.",
      dailyRatePerKg: 0.15,
      totalEstimatedRent: Math.round(pickCrop.qty * 1000 * 0.15 * pickCrop.days),
      token: "CS-REQ-" + Math.floor(1000 + Math.random() * 9000),
    };

    setRequests((prev) => [newReq, ...prev]);
    setActiveMainTab("myStorage");
    setSubTab("pending");

    showToast(
      isMr
        ? `🔔 नवीन अर्ज आला! ${pickFarmer.name} यांनी ${pickCrop.qty} MT साठी अर्ज केला आहे.`
        : isHi
        ? `🔔 नया आवेदन प्राप्त! ${pickFarmer.name} ने ${pickCrop.qty} MT हेतु आवेदन किया है।`
        : `🔔 New application received from ${pickFarmer.name} for ${pickCrop.qty} MT!`
    );
  };

  // Submit booking from "Find & Book" mode
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacilityForBooking) return;

    const token = "CS-SLIP-" + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccessToken(token);

    const isMr = currentLang === "mr";
    const isHi = currentLang === "hi";

    // If booking was placed on user's own facility:
    if (selectedFacilityForBooking.id === myStorageConfig.id) {
      const selfReq: ColdStorageBookingRequest = {
        id: "req-" + Date.now(),
        facilityId: myStorageConfig.id,
        facilityName: t.myFacilityName,
        farmerId: "f-user",
        farmerName: isMr
          ? "स्थानिक शेतकरी अर्ज"
          : isHi
          ? "स्थानीय किसान आवेदन"
          : "Local Farmer Direct Application",
        farmerPhone: "+91 98811 22334",
        farmerVillage: isMr ? "नाशिक परिसर" : isHi ? "नासिक क्षेत्र" : "Nashik Region",
        crop: isMr ? "द्राक्षे व भाजीपाला" : isHi ? "अंगूर व सब्जियां" : "Table Grapes & Fresh Vegetables",
        quantityMT: bookingQtyMT,
        requestedDays: bookingDays,
        startDate: new Date().toISOString().split("T")[0],
        expectedDispatchDate: "2025-06-30",
        status: "pending",
        createdAt: isMr ? "आत्ताच" : isHi ? "अभी" : "Just now",
        notes: isMr
          ? "पोर्टलद्वारे थेट नोंदवलेला अर्ज."
          : isHi
          ? "पोर्टल द्वारा सीधा दर्ज आवेदन।"
          : "Directly booked via farmer portal.",
        dailyRatePerKg: 0.15,
        totalEstimatedRent: Math.round(bookingQtyMT * 1000 * 0.15 * bookingDays),
        token: token,
      };
      setRequests((prev) => [selfReq, ...prev]);
    }

    onStorageBooked?.(selectedFacilityForBooking, bookingDays, bookingQtyMT * 1000);
  };

  // Build the list of facilities to display in "Find" tab with full language support
  const localizedDirectory: ColdStorageFacility[] = initialColdStorages.map((f) => {
    if (currentLang === "mr") {
      if (f.id === "cs-01") {
        return {
          ...f,
          name: "सह्याद्री ॲग्रो कोल्ड हब",
          location: "दिंडोरी रोड, नाशिक",
          temperatureRange: "२°C ते १२°C (आर्द्रता नियंत्रित)",
          suitableCrops: ["टोमॅटो", "द्राक्षे", "डाळिंब", "ढोबळी मिरची"],
        };
      }
      if (f.id === "cs-02") {
        return {
          ...f,
          name: "किसान सहकारी वेअरहाऊसिंग",
          location: "निफाड बायपास, नाशिक",
          temperatureRange: "हवेशीर + शीतगृह चेंबर",
          suitableCrops: ["कांदा", "बटाटा", "लसूण", "आले"],
        };
      }
      if (f.id === "cs-03") {
        return {
          ...f,
          name: "फ्रेशचिल मल्टी-चेंबर लॉजिस्टिक्स",
          location: "एमआयडीसी अंबड, नाशिक",
          temperatureRange: "-२°C ते १५°C (नायट्रोजन फ्लश)",
          suitableCrops: ["द्राक्षे", "स्ट्रॉबेरी", "टोमॅटो", "विदेशी भाज्या"],
        };
      }
    } else if (currentLang === "hi") {
      if (f.id === "cs-01") {
        return {
          ...f,
          name: "सह्याद्रि एग्रो कोल्ड हब",
          location: "दिंडोरी रोड, नासिक",
          temperatureRange: "2°C से 12°C (आर्द्रता नियंत्रित)",
          suitableCrops: ["टमाटर", "अंगूर", "अनार", "शिमला मिर्च"],
        };
      }
      if (f.id === "cs-02") {
        return {
          ...f,
          name: "किसान सहकारी वेयरहाउसिंग",
          location: "निफाड बाईपास, नासिक",
          temperatureRange: "हवादार + शीतगृह चैंबर",
          suitableCrops: ["प्याज", "आलू", "लहसुन", "अदरक"],
        };
      }
      if (f.id === "cs-03") {
        return {
          ...f,
          name: "फ्रेशचिल मल्टी-चैंबर लॉजिस्टिक्स",
          location: "एमआईडीसी अंबड, नासिक",
          temperatureRange: "-2°C से 15°C (नाइट्रोजन फ्लश)",
          suitableCrops: ["अंगूर", "स्ट्रॉबेरी", "टमाटर", "विदेशी सब्जियां"],
        };
      }
    }
    return f;
  });

  const facilitiesToDisplay: ColdStorageFacility[] = [
    ...(myStorageConfig.isPubliclyVisible
      ? [
          {
            id: myStorageConfig.id,
            name: t.myFacilityName,
            location: t.myFacilityLocation,
            distanceKm: 0.8,
            totalCapacityMT: myStorageConfig.totalCapacityMT,
            availableCapacityMT: remainingMT,
            temperatureRange: t.myFacilityTemp,
            pricePerKgPerDay: myStorageConfig.pricePerKgPerDay,
            pricePerBagPerMonth: myStorageConfig.pricePerBagPerMonth,
            rating: 4.9,
            verified: true,
            phone: myStorageConfig.phone,
            suitableCrops:
              currentLang === "mr"
                ? ["कांदा", "टोमॅटो", "द्राक्षे", "डाळिंब", "भाजीपाला"]
                : currentLang === "hi"
                ? ["प्याज", "टमाटर", "अंगूर", "अनार", "सब्जियां"]
                : ["Onion", "Tomato", "Grapes", "Pomegranate", "Vegetables"],
            isFarmerOwned: true,
            ownerName: t.myFacilityOwner,
          },
        ]
      : []),
    ...localizedDirectory,
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Banner with Rural Storage Shed Sunset Photographic Background (Image 3) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[380px] sm:min-h-[420px] md:min-h-[460px] p-6 sm:p-8 md:p-9 flex flex-col justify-between text-white transition-all">
        {/* Farm Storage Shed Sunset Background Image */}
        <img
          src={farmStorageShedSunsetImg}
          alt="Rural Produce Storage Shed filled with stacked sacks in green farm fields at sunset"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%] transition-transform duration-700 hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Ambient gradient overlay so text is crisp and readable while keeping the shed, stacked sacks, and sunset clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/60 pointer-events-none" />

        {/* Tricolor micro-accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />

        {/* Top Header Row with Badges, Title & Subtitle */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10 pt-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/55 border border-white/25 text-amber-300 text-xs font-semibold mb-2.5 backdrop-blur-md shadow-sm">
              <Snowflake className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.badgeDistress}</span>
              <span className="text-white/40">·</span>
              <span className="text-emerald-300">{t.badgeLoss}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black font-display text-white mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t.bannerTitle}
            </h3>
            <p className="text-slate-100 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {t.bannerSubtitle}
            </p>
          </div>

          {/* Right Floating Transparent Card for Cost Metric */}
          <div className="bg-white/5 hover:bg-white/10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/30 backdrop-blur-xs text-xs text-left lg:text-right shrink-0 shadow-md transition-all">
            <span className="text-slate-200 block font-bold text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {t.typicalCost}
            </span>
            <span className="text-base sm:text-xl font-black text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] block mt-0.5">
              {t.perKgDay}
            </span>
            <span className="text-xs text-emerald-300 font-bold block mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {t.preservesGrade}
            </span>
          </div>
        </div>

        {/* Bottom Transparent Cards so the shed and background are clearly visible */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20 text-xs">
          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "उपलब्ध शीतगृहे" : currentLang === "hi" ? "उपलब्ध कोल्ड स्टोरेज" : "Storage Facilities"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              4 {currentLang === "mr" ? "केंद्रे" : currentLang === "hi" ? "केंद्र" : "Near You"}
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "एकूण साठवणूक जागा" : currentLang === "hi" ? "कुल भंडारण क्षमता" : "Total Capacity"}
            </span>
            <span className="text-base sm:text-xl font-black text-emerald-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              3,200 MT
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "साठवणूक मुदत" : currentLang === "hi" ? "भंडारण अवधि" : "Max Safe Hold"}
            </span>
            <span className="text-base sm:text-xl font-black text-amber-300 mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              Up to 6 Months
            </span>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/30 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-md transition-all">
            <span className="text-white text-[11px] sm:text-xs block font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              {currentLang === "mr" ? "भाव वाढ हमी" : currentLang === "hi" ? "मूल्य वृद्धि सुरक्षा" : "Mandi Surge Guard"}
            </span>
            <span className="text-base sm:text-xl font-black text-white mt-1 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              +30% Net Profit
            </span>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveMainTab("myStorage")}
            id="tab-my-cold-storage"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === "myStorage"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Warehouse className="w-4 h-4 text-sky-600" />
            <span>{t.tabMyStorage}</span>
            {pendingRequests.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white animate-pulse">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab("find")}
            id="tab-find-cold-storage"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === "find"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Snowflake className="w-4 h-4 text-teal-600" />
            <span>{t.tabFind}</span>
          </button>
        </div>

        {/* Demo simulator button to easily test application flow */}
        {activeMainTab === "myStorage" && (
          <button
            onClick={handleSimulateNewApplicant}
            id="simulate-farmer-storage-app-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 shadow-2xs transition-colors cursor-pointer"
            title="Simulate a new farmer application to test notifications and space deduction"
          >
            <Plus className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.simulateBtn}</span>
          </button>
        )}
      </div>

      {/* ================= MODE 1: MY COLD STORAGE FACILITY & SPACE MANAGER ================= */}
      {activeMainTab === "myStorage" && (
        <div className="space-y-6">
          {/* Facility Status & Visibility Control Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                    {t.ownerTitle}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    ID: {myStorageConfig.id}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {t.myFacilityName}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {t.myFacilityLocation} · {myStorageConfig.phone}
                </p>
              </div>

              {/* Public Visibility Toggle for Other Farmers */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">
                    {t.visibilityToggleLabel}
                  </span>
                  <span className="text-[11px] font-semibold block mt-0.5">
                    {myStorageConfig.isPubliclyVisible ? (
                      <span className="text-emerald-700 font-bold">{t.visibleActive}</span>
                    ) : (
                      <span className="text-slate-500">{t.visibleInactive}</span>
                    )}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setMyStorageConfig((prev) => ({
                      ...prev,
                      isPubliclyVisible: !prev.isPubliclyVisible,
                    }))
                  }
                  id="toggle-cold-storage-visibility-btn"
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                    myStorageConfig.isPubliclyVisible
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                  }`}
                >
                  {myStorageConfig.isPubliclyVisible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.toggleActiveText}</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>{t.togglePrivateText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* LIVE SPACE METRIC TILES & CAPACITY BAR */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Total Capacity */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.totalCapLabel}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {myStorageConfig.totalCapacityMT}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{t.unitMtTons}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {t.approxBags} {myStorageConfig.totalCapacityMT * 20} {t.bagsText}
                  </span>
                </div>

                {/* 2. Currently Occupied */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    {t.occupiedLabel}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-900">
                      {occupiedMT}
                    </span>
                    <span className="text-xs font-bold text-amber-700">MT</span>
                  </div>
                  <span className="text-[11px] text-amber-800/80 mt-1 block">
                    {percentOccupied}% {t.spaceOccupiedPercent} ({activeLots.length} {t.activeLotsSuffix})
                  </span>
                </div>

                {/* 3. Remaining Space (Bold Emerald Highlight) */}
                <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 shadow-xs">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    {t.remainingLabel}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
                      {remainingMT}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">MT ({t.freeWord})</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                    {remainingMT > 50
                      ? t.spaceSufficient
                      : remainingMT > 0
                      ? t.spaceLimited
                      : t.spaceFull}
                  </span>
                </div>
              </div>

              {/* Visual Space Progress Meter */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{t.utilizationLabel}</span>
                  <span className="text-slate-900">
                    {occupiedMT} MT {t.usedWord} / {remainingMT} MT {t.freeWord} ({percentOccupied}%)
                  </span>
                </div>

                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${percentOccupied}%` }}
                    className={`h-full transition-all duration-500 ${
                      percentOccupied > 90
                        ? "bg-rose-500"
                        : percentOccupied > 70
                        ? "bg-amber-500"
                        : "bg-sky-600"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <AlertCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{t.spaceAlertNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* APPLICATION RECORDS & STORED LOTS MANAGEMENT */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Sub Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2 overflow-x-auto">
              <button
                onClick={() => setSubTab("pending")}
                id="storage-subtab-pending"
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  subTab === "pending"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{t.subTabPending}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    pendingRequests.length > 0
                      ? "bg-amber-500 text-slate-950 font-extrabold animate-pulse"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {pendingRequests.length}
                </span>
              </button>

              <button
                onClick={() => setSubTab("active")}
                id="storage-subtab-active"
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  subTab === "active"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.subTabActive}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-100 text-sky-900 font-bold">
                  {activeLots.length} ({occupiedMT} MT)
                </span>
              </button>

              <button
                onClick={() => setSubTab("history")}
                id="storage-subtab-history"
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  subTab === "history"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.subTabHistory}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-bold">
                  {historyLots.length}
                </span>
              </button>
            </div>

            {/* TAB 1: PENDING REQUESTS */}
            {subTab === "pending" && (
              <div className="p-5 space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800">
                      {t.noPendingTitle}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {t.noPendingDesc}
                    </p>
                    <button
                      onClick={handleSimulateNewApplicant}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-sky-100 text-sky-800 text-xs font-bold hover:bg-sky-200 cursor-pointer"
                    >
                      {t.testApplicantBtn}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="bg-amber-50/30 rounded-xl p-4 border border-amber-200 flex flex-col justify-between space-y-3 hover:border-amber-400 transition-colors shadow-2xs"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                                {req.token || req.id}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">
                                {req.farmerName}
                              </h4>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {req.farmerVillage} · {req.farmerPhone}
                              </p>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">
                              {req.createdAt}
                            </span>
                          </div>

                          <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.cropProduce}</span>
                              <span className="font-bold text-slate-900">{req.crop}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.requestedSpace}</span>
                              <span className="font-extrabold text-amber-900">
                                {req.quantityMT} MT ({req.quantityMT * 20} {t.bagsSuffix})
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.expectedDuration}</span>
                              <span className="font-semibold text-slate-800">
                                {req.requestedDays} {t.days}
                              </span>
                            </div>
                            <div className="flex justify-between border-t border-slate-100 pt-1">
                              <span className="text-slate-500">{t.estRevenue}</span>
                              <span className="font-bold text-emerald-700">
                                ₹{req.totalEstimatedRent?.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {req.notes && (
                            <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-md border border-slate-100 italic">
                              "{req.notes}"
                            </p>
                          )}
                        </div>

                        {/* Action Buttons: Accept & Deduct Space OR Reject */}
                        <div className="flex items-center gap-2 pt-2 border-t border-amber-100">
                          <button
                            onClick={() => handleRejectRequest(req.id)}
                            id={`reject-storage-req-${req.id}`}
                            className="flex-1 py-2 rounded-lg border border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer text-center"
                          >
                            {t.rejectBtn}
                          </button>
                          <button
                            onClick={() => handleAcceptRequest(req.id)}
                            id={`accept-storage-req-${req.id}`}
                            className="flex-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.acceptBtn}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CURRENTLY STORED LOTS (WITH DISPATCH ACTION TO GAIN SPACE) */}
            {subTab === "active" && (
              <div className="p-5 space-y-4">
                {activeLots.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <Package className="w-10 h-10 text-slate-400 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-700">
                      {t.noActiveTitle}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {t.noActiveDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>
                        {t.activeBannerText1} <strong>{occupiedMT} MT</strong> {t.activeBannerText2}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLots.map((lot) => (
                        <div
                          key={lot.id}
                          className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-sky-300 transition-all shadow-2xs space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                                  {lot.token}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                                  {t.statusStored}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">
                                {lot.farmerName}
                              </h4>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {lot.farmerPhone} · {lot.farmerVillage}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="text-base font-extrabold text-sky-900 block">
                                {lot.quantityMT} MT
                              </span>
                              <span className="text-[10px] text-slate-400">
                                ({lot.quantityMT * 20} {t.bagsSuffix})
                              </span>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.cropProduce}</span>
                              <span className="font-bold text-slate-900">{lot.crop}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.storageDate}</span>
                              <span className="font-semibold text-slate-700">{lot.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">{t.expectedDispatch}</span>
                              <span className="font-semibold text-slate-700">
                                {lot.expectedDispatchDate} ({lot.requestedDays} {t.days})
                              </span>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-emerald-800">
                              <span>{t.totalRentLabel}</span>
                              <span>₹{lot.totalEstimatedRent?.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* DISPATCH ACTION: RECOVERS SPACE */}
                          <div className="pt-2 border-t border-slate-100">
                            <button
                              onClick={() => setDispatchConfirmReq(lot)}
                              id={`dispatch-storage-lot-${lot.id}`}
                              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group"
                            >
                              <Truck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                              <span>{t.dispatchBtn}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: HISTORY & DISPATCHED LOGS */}
            {subTab === "history" && (
              <div className="p-5 space-y-3">
                {historyLots.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">
                    {t.noHistory}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                          <th className="py-2.5 px-3">{t.thToken}</th>
                          <th className="py-2.5 px-3">{t.thFarmer}</th>
                          <th className="py-2.5 px-3">{t.thCropWeight}</th>
                          <th className="py-2.5 px-3">{t.thStatus}</th>
                          <th className="py-2.5 px-3">{t.thDispatchDate}</th>
                          <th className="py-2.5 px-3 text-right">{t.thTotalRent}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {historyLots.map((hist) => (
                          <tr key={hist.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                              {hist.token || hist.id}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="font-bold text-slate-900 block">
                                {hist.farmerName}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {hist.farmerVillage}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="font-semibold text-slate-800">{hist.crop}</span>
                              <span className="text-slate-500 block font-bold">
                                {hist.quantityMT} MT
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              {hist.status === "dispatched" ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {t.statusDispatched}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                  {t.statusRejected}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {hist.actualDispatchedDate || "-"}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                              ₹{hist.totalEstimatedRent?.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODE 2: FIND & BOOK COLD STORAGES (FOR OTHER FARMERS) ================= */}
      {activeMainTab === "find" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.directoryTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.directorySubtitle}
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1.5 bg-sky-50 text-sky-900 rounded-lg border border-sky-200">
              {facilitiesToDisplay.length} {t.facilitiesCountSuffix}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {facilitiesToDisplay.map((facility) => {
              const isMine = facility.id === myStorageConfig.id;
              return (
                <div
                  key={facility.id}
                  className={`bg-white rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    isMine
                      ? "border-2 border-emerald-400 shadow-md bg-emerald-50/10"
                      : "border-slate-200 hover:border-sky-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        {isMine && (
                          <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 mb-1 border border-emerald-300">
                            {t.farmerOwnedBadge}
                          </span>
                        )}
                        <h4 className="text-base font-bold text-slate-900">{facility.name}</h4>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {facility.location} ({facility.distanceKm} {t.away})
                        </span>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 shrink-0">
                        ★ {facility.rating}
                      </span>
                    </div>

                    {/* Specs */}
                    <div className="my-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.availableSpace}</span>
                        <span className="font-extrabold text-emerald-700">
                          {facility.availableCapacityMT} {t.mtFree}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.temperature}</span>
                        <span className="font-semibold text-slate-800">
                          {facility.temperatureRange}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.rate}</span>
                        <span className="font-bold text-slate-900">
                          ₹{facility.pricePerKgPerDay} / kg / day
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.monthlySacks}</span>
                        <span className="font-semibold text-slate-700">
                          ₹{facility.pricePerBagPerMonth} {t.bagMonth}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {facility.suitableCrops.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedFacilityForBooking(facility);
                        setBookingSuccessToken(null);
                      }}
                      id={`book-cold-storage-${facility.id}`}
                      className={`w-full py-2 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isMine ? "bg-emerald-600 hover:bg-emerald-700" : "bg-sky-600 hover:bg-sky-700"
                      }`}
                    >
                      <Warehouse className="w-3.5 h-3.5" />
                      <span>{t.reserveBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DISPATCH CONFIRMATION MODAL */}
      {dispatchConfirmReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold font-display">{t.dispatchModalTitle}</h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">{t.tokenLabel} {dispatchConfirmReq.token}</p>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed">
                {t.dispatchConfirmText}
              </p>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-emerald-900">{t.farmerLabel}</span>
                  <span className="font-bold text-slate-900">{dispatchConfirmReq.farmerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900">{t.cropAndWeightLabel}</span>
                  <span className="font-bold text-slate-900">
                    {dispatchConfirmReq.crop} · {dispatchConfirmReq.quantityMT} MT
                  </span>
                </div>
                <div className="flex justify-between font-bold text-emerald-900 border-t border-emerald-200 pt-1">
                  <span>{t.spaceRestoredLabel}</span>
                  <span className="text-sm text-emerald-800 font-extrabold">
                    +{dispatchConfirmReq.quantityMT} MT {t.spaceFreedUpText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDispatchConfirmReq(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDispatch}
                  id="confirm-dispatch-action-btn"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.confirmDispatch}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedFacilityForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="bg-gradient-to-r from-sky-800 to-teal-900 text-white p-5">
              <h3 className="text-lg font-bold font-display">{t.modalTitle}</h3>
              <p className="text-xs text-sky-100">{selectedFacilityForBooking.name}</p>
            </div>

            {bookingSuccessToken ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {t.reservedSuccess}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.receiptDesc}
                  </p>
                  <div className="mt-3 p-3 bg-slate-100 rounded-xl font-mono text-sm font-bold text-slate-800 tracking-wider">
                    {bookingSuccessToken}
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 border-t border-slate-100 pt-3">
                  <p>
                    <strong>{t.facilityPhone}</strong> {selectedFacilityForBooking.phone}
                  </p>
                  <p>
                    <strong>{t.storedQty}</strong> {bookingQtyMT} MT · <strong>{t.duration}</strong>{" "}
                    {bookingDays} {t.days}
                  </p>
                  <p className="text-emerald-700 font-bold">
                    {t.estCost} ₹
                    {Math.round(
                      bookingQtyMT * 1000 * selectedFacilityForBooking.pricePerKgPerDay * bookingDays
                    )}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFacilityForBooking(null)}
                  className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {t.done}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.qtyLabel}
                  </label>
                  <input
                    type="number"
                    value={bookingQtyMT}
                    onChange={(e) => setBookingQtyMT(Number(e.target.value))}
                    min={1}
                    max={selectedFacilityForBooking.availableCapacityMT}
                    step={1}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold outline-hidden"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {t.availableSpaceColon} {selectedFacilityForBooking.availableCapacityMT} MT
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.durationLabel}
                  </label>
                  <input
                    type="number"
                    value={bookingDays}
                    onChange={(e) => setBookingDays(Number(e.target.value))}
                    min={1}
                    max={90}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold outline-hidden"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {t.priceSurgeNote}
                  </span>
                </div>

                <div className="p-3 bg-sky-50 rounded-xl text-xs space-y-1 border border-sky-100">
                  <div className="flex justify-between text-sky-900">
                    <span>{t.dailyRate}</span>
                    <span>₹{selectedFacilityForBooking.pricePerKgPerDay} / kg / day</span>
                  </div>
                  <div className="flex justify-between font-bold text-sky-950 text-sm pt-1 border-t border-sky-200">
                    <span>{t.totalEstStorage}</span>
                    <span>
                      ₹
                      {Math.round(
                        bookingQtyMT * 1000 * selectedFacilityForBooking.pricePerKgPerDay * bookingDays
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFacilityForBooking(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    id="confirm-cold-storage-booking-btn"
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {t.confirmGatePass}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
