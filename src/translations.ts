export type Language = "en" | "hi" | "mr";

export interface TranslationSchema {
  appName: string;
  brandTitle: string;
  smartTech: string;
  subTagline: string;
  loginHeading: string;
  loginSubheading: string;
  
  // Farmer Login Card
  farmerLoginTitle: string;
  farmerLoginSub: string;
  farmerIdLabel: string;
  farmerIdPlaceholder: string;
  farmerPassLabel: string;
  farmerPassPlaceholder: string;
  farmerCategoryLabel: string;
  farmerCategory1: string;
  farmerCategory2: string;
  farmerCategory3: string;
  farmerCategory4: string;
  accessFarmerPortal: string;
  quickDemoFarmer: string;
  
  // Buyer Login Card
  buyerLoginTitle: string;
  buyerLoginSub: string;
  buyerIdLabel: string;
  buyerIdPlaceholder: string;
  buyerPassLabel: string;
  buyerPassPlaceholder: string;
  forgotPassword: string;
  buyerCategoryLabel: string;
  buyerCategory1: string;
  buyerCategory2: string;
  buyerCategory3: string;
  buyerCategory4: string;
  accessBuyerPortal: string;
  registerBuyerBtn: string;
  quickDemoBuyer: string;

  // General & Navigation
  tagline: string;
  switchRole: string;
  farmerRole: string;
  buyerRole: string;
  howItWorks: string;
  askAi: string;
  menu: string;
  featuresTitle: string;
  sidebarNotice: string;
  closeMenu: string;
  activeFeature: string;
  
  // Features (for Farmer & Buyer)
  overview: string;
  overviewDesc: string;
  weatherAlert: string;
  weatherDesc: string;
  marketPrices: string;
  mandiDesc: string;
  priceTrend: string;
  priceTrendDesc: string;
  marketCompare: string;
  marketCompareDesc: string;
  lotManagement: string;
  lotManagementDesc: string;
  buyerMatching: string;
  buyerMatchingDesc: string;
  logistics: string;
  logisticsDesc: string;
  coldStorage: string;
  coldStorageDesc: string;
  finance: string;
  financeDesc: string;
  calamityRefund: string;
  calamityRefundDesc: string;
  thGovtRefund: string;
  cattleKeepers: string;
  cattleKeepersDesc: string;
  marketplace: string;
  marketplaceDesc: string;
  nearbyFarmers: string;
  nearbyFarmersDesc: string;
  ratingsAndGrievances: string;
  ratingsDesc: string;
  
  // Actions & Labels
  createLot: string;
  welcomeFarmer: string;
  farmerSubText: string;
  welcomeBuyer: string;
  buyerSubText: string;
  logout: string;
  backToLogin: string;
  quickDemo: string;
  viewDetails: string;
  accept: string;
  counter: string;
  reject: string;
  trackOrder: string;
  status: string;
  languageSelect: string;
  english: string;
  hindi: string;
  marathi: string;
  demoNotice: string;
  safeEscrowNotice: string;
  bidsActive: string;
  escrowLocked: string;
  rainWarning: string;
  fixRatesPrompt: string;
  threeDashHint: string;
  fullScreen: string;
  exitFullScreen: string;
  backToDashboard: string;
  fullScreenNotice: string;
  liveEnamSync: string;
  portalLoading: string;
  connectingMandiData: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appName: "KrishiVistar",
    brandTitle: "KrishiVistar",
    smartTech: "SMART AGRI PLATFORM",
    subTagline: "DIRECT FARM-TO-BUYER ECOSYSTEM",
    loginHeading: "Portal Access",
    loginSubheading: "Authorized agricultural producers and registered buyers login.",
    
    // Farmer Login Card
    farmerLoginTitle: "Farmer Login",
    farmerLoginSub: "Agricultural producers, FPOs & cultivators",
    farmerIdLabel: "Farmer ID / PM-KISAN Mobile",
    farmerIdPlaceholder: "MH-FARM-9402",
    farmerPassLabel: "Secure Password / PIN",
    farmerPassPlaceholder: "••••••••••",
    farmerCategoryLabel: "Farmer Category / Cluster",
    farmerCategory1: "Horticulture & Vegetable Cultivator (Nashik)",
    farmerCategory2: "FPO Cluster / Cooperative Leader",
    farmerCategory3: "Grains & Pulses Cultivator (Pune)",
    farmerCategory4: "Organic Produce Cultivator",
    accessFarmerPortal: "Access Farmer Portal",
    quickDemoFarmer: "Quick 1-Click Demo (Ramesh Patil)",
    
    // Buyer Login Card
    buyerLoginTitle: "Buyer Login",
    buyerLoginSub: "Direct consumers, retail vendors & bulk purchasers",
    buyerIdLabel: "Citizen ID / Email / Mobile",
    buyerIdPlaceholder: "BUYER-PUNE-402 / anita.sharma@example.com",
    buyerPassLabel: "Secure Password",
    buyerPassPlaceholder: "Enter Secure Password",
    forgotPassword: "Forgot Password?",
    buyerCategoryLabel: "Procurement Intent",
    buyerCategory1: "Household Consumer (Daily Fresh Produce)",
    buyerCategory2: "Wholesale Mandi Trader / Commission Agent",
    buyerCategory3: "Supermarket & Retail Procurement Lead",
    buyerCategory4: "Restaurant & Food Processor Partner",
    accessBuyerPortal: "Access Buyer Portal",
    registerBuyerBtn: "Register New Buyer",
    quickDemoBuyer: "Quick 1-Click Demo (Anita Sharma)",

    // General & Navigation
    tagline: "Smarter Markets · Fair Prices · Direct Buyer Connect",
    switchRole: "Switch Role",
    farmerRole: "Farmer / FPO",
    buyerRole: "Buyer / Consumer",
    howItWorks: "User Guide",
    askAi: "AI Market Assistant",
    menu: "☰",
    featuresTitle: "Features & Tools",
    sidebarNotice: "Select any feature to load it directly on your clean dashboard.",
    closeMenu: "Close",
    activeFeature: "Active Feature",
    
    // Features
    overview: "Dashboard Overview",
    overviewDesc: "Summary of bids, weather, active lots & escrow status",
    weatherAlert: "Weather Prediction",
    weatherDesc: "Rainfall alerts, 7-day radar and harvest recommendations",
    marketPrices: "Current Mandi Price",
    mandiDesc: "Real-time rates across APMC mandis & price discovery",
    priceTrend: "Price Trends",
    priceTrendDesc: "Predictive recommendations on when to sell for peak profit",
    marketCompare: "Smart Rate Calculator",
    marketCompareDesc: "Compare multiple mandis to fix your own product rates",
    lotManagement: "Produce Lots & Digital Trading",
    lotManagementDesc: "Create crop batches, view live buyer offers & manage trades",
    buyerMatching: "Smart Buyer Match",
    buyerMatchingDesc: "Direct connection with verified high-demand purchasers",
    logistics: "Transport System",
    logisticsDesc: "Book verified agri-transporters with GPS cost routing",
    coldStorage: "Cold Storage",
    coldStorageDesc: "Find nearby climate-controlled storage to prevent spoilage",
    finance: "Payment Tracking & Escrow Records",
    financeDesc: "100% safe escrow receipts, payouts & bank transaction logs",
    calamityRefund: "Govt Schemes",
    calamityRefundDesc: "AI-powered Indian Govt schemes check, PMFBY crop damage, MahaDBT subsidies & SDRF relief",
    thGovtRefund: "Govt Scheme & Official Relief Portal",
    cattleKeepers: "Cattle and Livestock",
    cattleKeepersDesc: "Manage and edit your own farm cattle, plus verified directory of nearby cattle keepers",
    marketplace: "Direct Farm Market (Small & Bulk)",
    marketplaceDesc: "Order fresh produce in household or commercial quantities",
    nearbyFarmers: "Nearby Farmers with Top Ratings",
    nearbyFarmersDesc: "Locate verified local farmers with 4.8+ customer ratings",
    ratingsAndGrievances: "Post-Delivery, Rating & Grievances",
    ratingsDesc: "Confirm quality, release escrow funds & submit reviews",
    
    // Actions & Labels
    createLot: "Create Produce Lot",
    welcomeFarmer: "Namaste, Ramesh Patil",
    farmerSubText: "Dindori, Nashik District · Tomato Lot #1025 is live with active buyer bids. Heavy rain expected in 48h.",
    welcomeBuyer: "Welcome back, Anita Sharma",
    buyerSubText: "Pune/Mumbai Central Hub · Direct fresh farm produce with guaranteed escrow payment safety.",
    logout: "Logout",
    backToLogin: "Back to Login",
    quickDemo: "Quick Demo Switch",
    viewDetails: "View Details",
    accept: "Accept Offer",
    counter: "Counter Offer",
    reject: "Reject",
    trackOrder: "Track Order",
    status: "Status",
    languageSelect: "Language",
    english: "English",
    hindi: "हिंदी (Hindi)",
    marathi: "मराठी (Marathi)",
    demoNotice: "Demo credentials pre-configured for instant preview. Click either portal to test.",
    safeEscrowNotice: "100% Guaranteed Escrow Protected Payments with RBI Compliant Gateways",
    bidsActive: "Bids Active",
    escrowLocked: "In Escrow",
    rainWarning: "Rain Alert",
    fixRatesPrompt: "Fix Product Rates",
    threeDashHint: "Click the three dashes (☰) on top to smoothly open features sidebar",
    fullScreen: "Full Screen View",
    exitFullScreen: "Exit Full Screen",
    backToDashboard: "Back to Dashboard",
    fullScreenNotice: "Distraction-free full screen workspace",
    liveEnamSync: "Live e-NAM & APMC Sync",
    portalLoading: "Loading Agricultural Portal...",
    connectingMandiData: "Connecting to live mandi & harvest data",
  },
  hi: {
    appName: "KrishiVistar",
    brandTitle: "KrishiVistar",
    smartTech: "स्मार्ट कृषि प्लेटफॉर्म",
    subTagline: "प्रत्यक्ष किसान-खरीदार डिजिटल मंच",
    loginHeading: "पोर्टल प्रवेश",
    loginSubheading: "अधिकृत किसान, FPO उत्पादक और पंजीकृत खरीदारों के लिए सुरक्षित प्रवेश।",
    
    // Farmer Login Card
    farmerLoginTitle: "किसान प्रवेश",
    farmerLoginSub: "कृषि उत्पादक, FPO समूह एवं कृषक बंधु",
    farmerIdLabel: "किसान आईडी / PM-KISAN मोबाइल नंबर",
    farmerIdPlaceholder: "MH-FARM-9402",
    farmerPassLabel: "सुरक्षित पासवर्ड / पिन",
    farmerPassPlaceholder: "••••••••••",
    farmerCategoryLabel: "किसान श्रेणी / क्लस्टर",
    farmerCategory1: "सब्जी व बागवानी उत्पादक (नासिक क्लस्टर)",
    farmerCategory2: "FPO अध्यक्ष / सहकारी समूह प्रतिनिधि",
    farmerCategory3: "अनाज व दलहन किसान (पुणे जिला)",
    farmerCategory4: "प्रमाणित जैविक उत्पादक",
    accessFarmerPortal: "किसान पोर्टल में प्रवेश करें",
    quickDemoFarmer: "झटपट १-क्लिक डेमो (रमेश पाटिल)",
    
    // Buyer Login Card
    buyerLoginTitle: "खरीदार प्रवेश",
    buyerLoginSub: "सीधे उपभोक्ता, खुदरा व्यापारी एवं थोक खरीदार",
    buyerIdLabel: "नागरिक आईडी / ईमेल / मोबाइल नंबर",
    buyerIdPlaceholder: "BUYER-PUNE-402 / anita.sharma@example.com",
    buyerPassLabel: "सुरक्षित पासवर्ड",
    buyerPassPlaceholder: "पासवर्ड दर्ज करें",
    forgotPassword: "पासवर्ड भूल गए?",
    buyerCategoryLabel: "खरीद का उद्देश्य / प्रकार",
    buyerCategory1: "घरेलू उपभोक्ता (ताजा सब्जी व फल)",
    buyerCategory2: "थोक मंडी आढ़ती / थोक खरीदार",
    buyerCategory3: "सुपरमार्केट व रिटेल चेन खरीददार",
    buyerCategory4: "होटल व फ़ूड प्रोसेसिंग पार्टनर",
    accessBuyerPortal: "खरीदार पोर्टल में प्रवेश करें",
    registerBuyerBtn: "नया खरीदार खाता बनाएं",
    quickDemoBuyer: "झटपट १-क्लिक डेमो (अनिता शर्मा)",

    // General & Navigation
    tagline: "सही दाम · सीधा खरीदार · समृद्ध किसान",
    switchRole: "भूमिका बदलें",
    farmerRole: "किसान / FPO",
    buyerRole: "खरीदार / उपभोक्ता",
    howItWorks: "उपयोग मार्गदर्शिका",
    askAi: "AI बाज़ार सहायक",
    menu: "☰",
    featuresTitle: "सुविधाएं एवं टूल्स",
    sidebarNotice: "डैशबोर्ड पर किसी भी सुविधा को देखने के लिए साइडबार से चुनें।",
    closeMenu: "बंद करें",
    activeFeature: "सक्रिय सुविधा",
    
    // Features
    overview: "डैशबोर्ड सारांश",
    overviewDesc: "सक्रिय बोलियां, मौसम अलर्ट, लॉट स्थिति और एस्क्रो भुगतान",
    weatherAlert: "मौसम भविष्यवाणी",
    weatherDesc: "बारिश चेतावनी, 7-दिवसीय रडार व फसल कटाई की सलाह",
    marketPrices: "वर्तमान मंडी भाव",
    mandiDesc: "विभिन्न APMC मंडियों के वास्तविक भाव व मूल्य खोज",
    priceTrend: "मूल्य रुझान",
    priceTrendDesc: "अधिकतम मुनाफे के लिए सही समय पर बेचने की सिफारिशें",
    marketCompare: "स्मार्ट रेट कैलकुलेटर",
    marketCompareDesc: "कई मंडियों की तुलना करके अपनी फसल के दाम स्वयं तय करें",
    lotManagement: "फसल लॉट व डिजिटल ट्रेडिंग",
    lotManagementDesc: "नए लॉट बनाएं, खरीदारों की बोलियां देखें व व्यापार करें",
    buyerMatching: "स्मार्ट खरीदार मिलान",
    buyerMatchingDesc: "उच्च मांग वाले सत्यापित खरीदारों से सीधा संपर्क",
    logistics: "परिवहन व्यवस्था",
    logisticsDesc: "जीपीएस युक्त कृषि वाहन और कम खर्च वाले मार्ग की बुकिंग",
    coldStorage: "कोल्ड स्टोरेज",
    coldStorageDesc: "फसल खराब होने से बचाने के लिए नजदीकी शीतगृह",
    finance: "भुगतान ट्रैकिंग व एस्क्रो रिकॉर्ड",
    financeDesc: "100% सुरक्षित भुगतान, बैंक रसीदें व लेनदेन विवरण",
    calamityRefund: "सरकारी योजनाएं",
    calamityRefundDesc: "भारतीय सरकारी योजनाओं की AI जांच, फसल नुकसान पर PMFBY, महाडीबीटी व SDRF सहायता",
    thGovtRefund: "सरकारी योजना एवं राहत पोर्टल",
    cattleKeepers: "पशुधन एवं मवेशी",
    cattleKeepersDesc: "अपने मवेशियों को जोड़ें व संपादित करें, तथा निकटवर्ती पशुपालकों की संपर्क निर्देशिका",
    marketplace: "सीधा शेतमाल बाजार (खुदरा व थोक)",
    marketplaceDesc: "घरेलू या व्यावसायिक मात्रा में ताजा कृषि उत्पाद ऑर्डर करें",
    nearbyFarmers: "नजदीकी किसान (सर्वोच्च रेटिंग)",
    nearbyFarmersDesc: "4.8+ रेटिंग वाले स्थानीय सत्यापित किसानों से खरीदारी",
    ratingsAndGrievances: "डिलिवरी उपरांत रेटिंग व शिकायत निवारण",
    ratingsDesc: "गुणवत्ता पुष्टि, एस्क्रो राशि जारी करना व समीक्षा देना",
    
    // Actions & Labels
    createLot: "नया लॉट जोड़ें",
    welcomeFarmer: "नमस्ते, रमेश पाटिल जी",
    farmerSubText: "दिंडोरी, नासिक जिला · टमाटर लॉट #1025 पर सक्रिय बोलियां चालू हैं। 48 घंटे में भारी बारिश की चेतावनी।",
    welcomeBuyer: "नमस्ते, अनिता शर्मा जी",
    buyerSubText: "पुणे/मुंबई वितरण केंद्र · खेतों से सीधे ताजे उत्पाद, 100% एस्क्रो सुरक्षा के साथ।",
    logout: "लॉग आउट",
    backToLogin: "लॉगिन पेज",
    quickDemo: "डेमो स्विच",
    viewDetails: "विवरण देखें",
    accept: "स्वीकार करें",
    counter: "काउंटर ऑफर",
    reject: "अस्वीकार",
    trackOrder: "ऑर्डर ट्रैक करें",
    status: "स्थिति",
    languageSelect: "भाषा",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
    demoNotice: "तुरंत परीक्षण के लिए डेमो विवरण पहले से भरे हैं। सीधे प्रवेश करें।",
    safeEscrowNotice: "100% सुरक्षित एस्क्रो भुगतान व्यवस्था",
    bidsActive: "बोलियां चालू",
    escrowLocked: "एस्क्रो में सुरक्षित",
    rainWarning: "बारिश चेतावनी",
    fixRatesPrompt: "अपने भाव तय करें",
    threeDashHint: "साइडबार खोलने के लिए ऊपर दी गई तीन रेखाओं (☰) पर क्लिक करें",
    fullScreen: "पूर्ण स्क्रीन दृश्य",
    exitFullScreen: "पूर्ण स्क्रीन से बाहर निकलें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    fullScreenNotice: "सुविधाजनक पूर्ण स्क्रीन कार्यक्षेत्र",
    liveEnamSync: "लाइव ई-नाम और एपीएमसी सिंक",
    portalLoading: "कृषि पोर्टल लोड हो रहा है...",
    connectingMandiData: "लाइव मंडी भाव एवं फसल डेटा से जुड़ रहे हैं",
  },
  mr: {
    appName: "KrishiVistar",
    brandTitle: "KrishiVistar",
    smartTech: "स्मार्ट कृषी प्लॅटफॉर्म",
    subTagline: "थेट शेतकरी-ग्राहक डिजिटल परिसंस्था",
    loginHeading: "पोर्टल प्रवेश",
    loginSubheading: "अधिकृत शेतकरी बांधव, FPO गट आणि नोंदणीकृत खरेदीदारांसाठी सुरक्षित प्रवेश.",
    
    // Farmer Login Card
    farmerLoginTitle: "शेतकरी प्रवेश",
    farmerLoginSub: "शेतकरी, FPO उत्पादक संस्था आणि बागायतदार",
    farmerIdLabel: "शेतकरी आयडी / PM-KISAN मोबाईल क्रमांक",
    farmerIdPlaceholder: "MH-FARM-9402",
    farmerPassLabel: "सुरक्षित पासवर्ड / पिन",
    farmerPassPlaceholder: "••••••••••",
    farmerCategoryLabel: "शेतकरी प्रवर्ग / गट",
    farmerCategory1: "भाजीपाला व फळ उत्पादक (नाशिक परिसर)",
    farmerCategory2: "FPO समूह प्रमुख / सहकारी संस्था प्रतिनिधी",
    farmerCategory3: "धान्य व कडधान्य उत्पादक (पुणे जिल्हा)",
    farmerCategory4: "प्रमाणित सेंद्रिय उत्पादक",
    accessFarmerPortal: "शेतकरी पोर्टल सुरू करा",
    quickDemoFarmer: "झटपट १-क्लिक डेमो (रमेश पाटील)",
    
    // Buyer Login Card
    buyerLoginTitle: "खरेदीदार प्रवेश",
    buyerLoginSub: "थेट ग्राहक, किरकोळ व्यापारी आणि मोठे खरेदीदार",
    buyerIdLabel: "नागरिक आयडी / ई-मेल / मोबाईल नंबर",
    buyerIdPlaceholder: "BUYER-PUNE-402 / anita.sharma@example.com",
    buyerPassLabel: "सुरक्षित पासवर्ड",
    buyerPassPlaceholder: "पासवर्ड टाका",
    forgotPassword: "पासवर्ड विसरलात?",
    buyerCategoryLabel: "खरेदीचा प्रकार / उद्देश",
    buyerCategory1: "घरगुती ग्राहक (ताजा भाजीपाला खरेदी)",
    buyerCategory2: "थोक व्यापारी / बाजार समिती आडतदार",
    buyerCategory3: "सुपरमार्केट आणि रिटेल चेन खरेदीदार",
    buyerCategory4: "हॉटेल व फूड प्रोसेसिंग उद्योजक",
    accessBuyerPortal: "खरेदीदार पोर्टल सुरू करा",
    registerBuyerBtn: "नवीन खरेदीदार नोंदणी करा",
    quickDemoBuyer: "झटपट १-क्लिक डेमो (अनिता शर्मा)",

    // General & Navigation
    tagline: "योग्य भाव · थेट खरेदीदार · समृद्ध बळीराजा",
    switchRole: "भूमिका बदला",
    farmerRole: "शेतकरी / FPO",
    buyerRole: "खरेदीदार / ग्राहक",
    howItWorks: "वापर मार्गदर्शक",
    askAi: "AI कृषी सल्लागार",
    menu: "☰",
    featuresTitle: "सुविधा व साधने",
    sidebarNotice: "डॅशबोर्डवर थेट पाहण्यासाठी साइडबारमधील हवी ती सुविधा निवडा.",
    closeMenu: "बंद करा",
    activeFeature: "सक्रिय सुविधा",
    
    // Features
    overview: "डॅशबोर्ड आढावा",
    overviewDesc: "सक्रिय खरेदीदार बोली, हवामान अंदाज, लॉट्स आणि एस्क्रो शिल्लक",
    weatherAlert: "हवामान अंदाज",
    weatherDesc: "पुढील ७ दिवसांचा रडार अंदाज व काढणी योग्य सल्ला",
    marketPrices: "चालू बाजारभाव",
    mandiDesc: "विविध कृषी उत्पन्न बाजार समित्यांमधील ताजे दर व विश्लेषण",
    priceTrend: "दर कल अंदाज",
    priceTrendDesc: "कमाल नफ्यासाठी शेतमाल विकण्याची सर्वोत्तम वेळ",
    marketCompare: "स्मार्ट दर कॅल्क्युलेटर",
    marketCompareDesc: "वेगवेगळ्या बाजारांची तुलना करून स्वतःच्या मालाचे दर ठरवा",
    lotManagement: "शेतमाल लॉट्स व डिजिटल ट्रेडिंग",
    lotManagementDesc: "नवीन लॉट नोंदवा, खरेदीदारांच्या बोली तपासा व व्यवहार करा",
    buyerMatching: "स्मार्ट खरेदीदार जुळणी",
    buyerMatchingDesc: "उच्च मागणी असलेल्या पडताळणीकृत खरेदीदारांशी थेट संपर्क",
    logistics: "वाहतूक व्यवस्था",
    logisticsDesc: "जीपीएस युक्त कृषी वाहने व कमी खर्चात वाहतूक बुकिंग",
    coldStorage: "शीतगृह",
    coldStorageDesc: "माल खराब होण्यापासून वाचवण्यासाठी जवळचे शितगृह",
    finance: "पेमेंट ट्रॅकिंग व एस्क्रो व्यवहार नोंदी",
    financeDesc: "१००% सुरक्षित एस्क्रो पेमेंट, बँक पावत्या व हिशोब",
    calamityRefund: "शासकीय योजना",
    calamityRefundDesc: "AI द्वारे शासकीय योजना शोध, पिकांचे नुकसान, महाडीबीटी अनुदान व SDRF मदत",
    thGovtRefund: "शासकीय योजना व मदत पोर्टल",
    cattleKeepers: "पशुधन व जनावरे",
    cattleKeepersDesc: "स्वतःची जनावरे जोडा व संपादित करा, तसेच परिसरातील पशुपालक संपर्क निर्देशिका",
    marketplace: "थेट शेतमाल बाजारपेठ (किरकोळ व ठोक)",
    marketplaceDesc: "घरगुती किंवा व्यावसायिक गरजेसाठी थेट शेतातून खरेदी करा",
    nearbyFarmers: "जवळचे शेतकरी (उच्च रेटिंग)",
    nearbyFarmersDesc: "४.८+ रेटिंग असलेल्या स्थानिक शेतकऱ्यांकडून ताजी खरेदी",
    ratingsAndGrievances: "डिलिव्हरीनंतर रेटिंग व तक्रार निवारण",
    ratingsDesc: "दर्जाची खात्री, एस्क्रो रक्कम वर्ग करणे व अभिप्राय देणे",
    
    // Actions & Labels
    createLot: "नवीन लॉट नोंदवा",
    welcomeFarmer: "नमस्कार, रमेश पाटील",
    farmerSubText: "दिंडोरी, नाशिक जिल्हा · टोमॅटो लॉट #1025 थेट सक्रिय असून खरेदीदारांच्या बोली सुरू आहेत. पुढील ४८ तासांत मुसळधार पावसाचा अंदाज.",
    welcomeBuyer: "स्वागत आहे, अनिता शर्मा",
    buyerSubText: "पुणे/मुंबई वितरण केंद्र · थेट शेतातून ताजी आवक, १००% सुरक्षित एस्क्रो व्यवहारासह.",
    logout: "लॉग आउट",
    backToLogin: "लॉगिन पेज",
    quickDemo: "डेमो बदला",
    viewDetails: "तपशील पहा",
    accept: "स्वीकारा",
    counter: "काउंटर द्या",
    reject: "नाकारा",
    trackOrder: "ऑर्डर ट्रॅक करा",
    status: "स्थिती",
    languageSelect: "भाषा",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
    demoNotice: "झटपट चाचणीसाठी डेमो तपशील तयार आहेत. थेट क्लिक करून सुरू करा.",
    safeEscrowNotice: "१००% सुरक्षित एस्क्रो पेमेंट प्रणाली",
    bidsActive: "सक्रिय बोली",
    escrowLocked: "एस्क्रोमध्ये सुरक्षित",
    rainWarning: "पाऊस इशारा",
    fixRatesPrompt: "स्वतःचा दर ठरवा",
    threeDashHint: "साइडबार उघडण्यासाठी वरील तीन रेषांवर (☰) क्लिक करा",
    fullScreen: "पूर्ण स्क्रीन दृश्य",
    exitFullScreen: "पूर्ण स्क्रीनमधून बाहेर पडा",
    backToDashboard: "डॅशबोर्डवर परत जा",
    fullScreenNotice: "विचलित न होता पूर्ण स्क्रीन कार्यक्षेत्र",
    liveEnamSync: "थेट ई-नाम व बाजार समिती सिंक",
    portalLoading: "कृषीविस्तार पोर्टल लोड होत आहे...",
    connectingMandiData: "थेट बाजार समिती व शेती माहिती जोडत आहे",
  },
};
