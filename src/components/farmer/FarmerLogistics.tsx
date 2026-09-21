import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Route,
  Navigation,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Users,
  Check,
  X,
  Plus,
  MessageCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  initialTransportOptions,
  initialFarmerVehicles,
  initialTransportBookingRequests,
  initialSplitPools,
} from "../../mockData";
import {
  TransportOption,
  FarmerVehicle,
  TransportBookingRequest,
  SplitTransportPool,
  SplitTransportPoolParticipant,
} from "../../types";
import { Language } from "../../translations";
import { FarmerOwnVehiclesTab } from "./FarmerOwnVehiclesTab";
import { FarmerSplitTransportTab } from "./FarmerSplitTransportTab";
import transportTractorSunsetImg from "../../assets/images/transport_tractor_sunset_1789910975502.jpg";

interface FarmerLogisticsProps {
  currentLang?: Language;
  onBookTransport?: (transport: TransportOption) => void;
  defaultTab?: "route" | "ownVehicles" | "splitExpense";
}

const tLogistics = {
  mr: {
    // Tabs
    tabRoute: "१. AI मार्ग व वाहतूक बुकिंग",
    tabOwnVehicles: "२. माझी वाहने व शेतकरी मंजुरी",
    tabSplitExpense: "३. सामाईक वाहतूक खर्च बचत",
    tabSplitBadge: "बचत",

    title: "वाहतूक व्यवस्था (शेत ते खरेदीदार)",
    subtitle: "GPS ट्रॅकिंग, तापमान नोंद आणि कमीत कमी वेळेचे मार्ग असणारा विश्वासू वाहतूक ताफा",
    destination: "गंतव्य स्थान:",
    optEngine: "AI मार्ग नियोजन इंजिन",
    optRoute: "पर्यावरणपूरक व जलद मार्ग: नाशिक शेत →",
    routeDesc: "कसारा घाटातील वाहतूक कोंडी टाळण्यासाठी समृद्धी महामार्गाचा वापर. कमी वेळात पोहोचल्यामुळे मालाचे नुकसान ४०% कमी होते.",
    distance: "अंतर",
    savedKm: "-१८ किमी बचत",
    transitTime: "प्रवास वेळ",
    transitValLong: "३ तास ४५ मिनिटे",
    transitValShort: "३० मिनिटे",
    fastDelivery: "जलद डिलिव्हरी",
    tollFuel: "अंदाजे टोल व इंधन",
    lowFreight: "कमी मालवाहतूक दर",
    livePath: "थेट डिलिव्हरी मार्ग",
    farmPickup: "दिंडोरी शेतातून उचल",
    dockReady: "लोडिंग डॉक सज्ज",
    weighbridge: "इलेक्ट्रॉनिक वजन काटा व तपासणी",
    slipIssued: "इलेक्ट्रॉनिक वजन पावती",
    escrowUnlock: "एस्क्रो रक्कम त्वरित जमा",
    availableFleet: "उपलब्ध व्यावसायिक वाहतूक भागीदार",
    cargoInsurance: "(मालाचा विमा व चालक पडताळणी समाविष्ट)",
    maxPayload: "कमाल वजन क्षमता:",
    ratePerKm: "प्रति किमी दर:",
    estTotalTrip: "अंदाजे एकूण भाडे:",
    bookedMsg: "बुक झाले! चालक नियुक्त केला",
    bookVehicle: "वाहन बुक करा",
    destMumbai: "मुंबई वाशी बाजार समिती (१७० किमी)",
    destPune: "पुणे गुलटेकडी बाजार समिती (१८० किमी)",
    destNashik: "स्थानिक नाशिक बाजार समिती (१२ किमी)",
    destSurat: "सुरत घाऊक बाजार समिती (२३० किमी)",

    // Farmer Owned Vehicles for Hire in Tab 1
    farmerFleetTitle: "परिसरातील शेतकरी वाहने",
    farmerFleetSubtitle: "स्थानिक शेतकऱ्यांची स्वतःची उपलब्ध वाहने. शेतकरी स्वतः ठरवून वाहन देतात.",
    postVehicleBtn: "+ स्वतःचे वाहन नोंदवा",
    requestBookingBtn: "वाहन आरक्षण मागणी करा",
    ownerLabel: "वाहन मालक शेतकरी:",
    modalRequestTitle: "शेतकऱ्याकडून वाहन आरक्षित करण्याची मागणी पाठवा",
    produceLabel: "शेतमाल व प्रकार *",
    loadLabel: "वजन (किलो) *",
    pickupLabel: "उचल ठिकाण (Farm Gate) *",
    nameLabel: "आपले नाव *",
    phoneLabel: "आपला मोबाईल क्रमांक *",
    modalDestLabel: "गंतव्य बाजार समिती:",
    modalFareLabel: "अंदाजे एकूण भाडे:",
    modalOwnerLabel: "मालक:",
    modalMaxWeightLabel: "कमाल वजन क्षमता:",
    sendRequestBtn: "आरक्षण मागणी पाठवा",
    cancelBtn: "रद्द करा",
    requestSuccessNotice: "आरक्षण मागणी वाहन मालक शेतकऱ्याकडे पाठवण्यात आली आहे! ते मंजुरी दिल्यावर संपर्क करतील.",
  },
  hi: {
    // Tabs
    tabRoute: "१. AI मार्ग एवं वाहन बुकिंग",
    tabOwnVehicles: "२. मेरे वाहन एवं किसान स्वीकृति",
    tabSplitExpense: "३. साझा परिवहन खर्च बचत",
    tabSplitBadge: "बचत",

    title: "परिवहन व्यवस्था (खेत से खरीदार)",
    subtitle: "जीपीएस ट्रैकिंग, तापमान लॉग और सबसे तेज मार्ग वाला सत्यापित वाहन बेड़ा",
    destination: "गंतव्य स्थान:",
    optEngine: "AI मार्ग अनुकूलन इंजन",
    optRoute: "अनुकूलित ग्रीन रूट: नासिक फार्म →",
    routeDesc: "कसारा घाट के ट्रैफिक से बचने के लिए समृद्धि एक्सप्रेसवे फीडर। पारगमन समय घटने से फसल खराबी में ४०% की कमी।",
    distance: "दूरी",
    savedKm: "-१८ किमी बचत",
    transitTime: "यात्रा समय",
    transitValLong: "३ घंटे ४५ मिनट",
    transitValShort: "३० मिनट",
    fastDelivery: "तेज डिलीवरी",
    tollFuel: "अनुमानित टोल व ईंधन",
    lowFreight: "कम मालभाड़ा दर",
    livePath: "लाइव डिलीवरी रूट",
    farmPickup: "दिंडोरी फार्म पिकअप",
    dockReady: "लोडिंग डॉक तैयार",
    weighbridge: "इलेक्ट्रॉनिक वजन कांटा व चेकपॉइंट",
    slipIssued: "इलेक्ट्रॉनिक वजन पर्ची",
    escrowUnlock: "एस्क्रो भुगतान अनलॉक",
    availableFleet: "उपलब्ध वाणिज्यिक परिवहन भागीदार",
    cargoInsurance: "(कार्गो बीमा एवं चालक सत्यापन सहित)",
    maxPayload: "अधिकतम क्षमता:",
    ratePerKm: "प्रति किमी दर:",
    estTotalTrip: "अनुमानित कुल भाड़ा:",
    bookedMsg: "बुक हो गया! चालक नियत किया गया",
    bookVehicle: "वाहन बुक करें",
    destMumbai: "मुंबई वाशी एपीएमसी (१७० किमी)",
    destPune: "पुणे गुलटेकड़ी मंडी (१८० किमी)",
    destNashik: "स्थानीय नासिक एपीएमसी (१२ किमी)",
    destSurat: "सूरत थोक मंडी (२३० किमी)",

    // Farmer Owned Vehicles for Hire in Tab 1
    farmerFleetTitle: "आसपास के किसानों के वाहन",
    farmerFleetSubtitle: "स्थानीय किसानों के निजी वाहन। वाहन स्वामी किसान स्वयं निर्णय लेकर वाहन उपलब्ध कराते हैं।",
    postVehicleBtn: "+ अपना वाहन जोड़ें",
    requestBookingBtn: "वाहन आरक्षण अनुरोध भेजें",
    ownerLabel: "वाहन स्वामी किसान:",
    modalRequestTitle: "किसान से वाहन किराए पर लेने का अनुरोध भेजें",
    produceLabel: "फसल एवं किस्म *",
    loadLabel: "वजन (किग्रा) *",
    pickupLabel: "पिकअप स्थान (Farm Gate) *",
    nameLabel: "आपका नाम *",
    phoneLabel: "आपका मोबाइल नंबर *",
    modalDestLabel: "गंतव्य मंडी:",
    modalFareLabel: "अनुमानित कुल भाड़ा:",
    modalOwnerLabel: "मालिक:",
    modalMaxWeightLabel: "अधिकतम वजन क्षमता:",
    sendRequestBtn: "अनुरोध भेजें",
    cancelBtn: "रद्द करें",
    requestSuccessNotice: "बुकिंग अनुरोध वाहन स्वामी किसान को भेज दिया गया है! उनकी स्वीकृति के बाद संपर्क किया जाएगा।",
  },
  en: {
    // Tabs
    tabRoute: "1. AI Route & Fleet Booking",
    tabOwnVehicles: "2. My Vehicles & Approvals",
    tabSplitExpense: "3. Split Transport Expense & Pool",
    tabSplitBadge: "SAVE",

    title: "Transport System (Farm to Buyer)",
    subtitle: "Verified transport fleet with GPS tracking, temperature logs, and optimized route calculation",
    destination: "Destination:",
    optEngine: "AI Route Optimizer Engine",
    optRoute: "Optimized Green Route: Nashik Farm →",
    routeDesc: "Avoids traffic congestion at Kasara Ghat via Samruddhi Expressway feeder. Less transit time reduces crop spoilage by 40%.",
    distance: "Distance",
    savedKm: "-18 km saved",
    transitTime: "Transit Time",
    transitValLong: "3 hrs 45 mins",
    transitValShort: "30 mins",
    fastDelivery: "Fast delivery",
    tollFuel: "Estimated Toll & Fuel",
    lowFreight: "Low freight rate",
    livePath: "Live Delivery Path",
    farmPickup: "Dindori Farm Pickup",
    dockReady: "Loading dock ready",
    weighbridge: "Weighbridge & Checkpoint",
    slipIssued: "Electronic weight slip",
    escrowUnlock: "Escrow funds unlock",
    availableFleet: "Commercial Logistics Partners",
    cargoInsurance: "(Includes cargo insurance & driver verification)",
    maxPayload: "Max Payload:",
    ratePerKm: "Per km Rate:",
    estTotalTrip: "Est. Total Trip:",
    bookedMsg: "Booked! Driver Assigned",
    bookVehicle: "Book Vehicle",
    destMumbai: "Mumbai Vashi APMC (170 km)",
    destPune: "Pune Gultekdi Mandi (180 km)",
    destNashik: "Local Nashik APMC (12 km)",
    destSurat: "Surat Wholesale Mandi (230 km)",

    // Farmer Owned Vehicles for Hire in Tab 1
    farmerFleetTitle: "Nearby Farmers' Own Transport Vehicles",
    farmerFleetSubtitle: "Farm-owned utility vehicles available for hire. Vehicle owners review transit requests and decide whom to assign transport to.",
    postVehicleBtn: "+ Post My Vehicle",
    requestBookingBtn: "Request Transit Booking",
    ownerLabel: "Owner Farmer:",
    modalRequestTitle: "Send Transport Booking Request to Farmer",
    produceLabel: "Produce / Crop Name *",
    loadLabel: "Load Weight (kg) *",
    pickupLabel: "Pickup Farm Location *",
    nameLabel: "Your Full Name *",
    phoneLabel: "Your Mobile Number *",
    modalDestLabel: "Destination Mandi:",
    modalFareLabel: "Estimated Total Fare:",
    modalOwnerLabel: "Owner:",
    modalMaxWeightLabel: "Max Payload Capacity:",
    sendRequestBtn: "Send Booking Request",
    cancelBtn: "Cancel",
    requestSuccessNotice: "Booking request sent to vehicle owner! They will review and coordinate pickup.",
  },
};

export const FarmerLogistics: React.FC<FarmerLogisticsProps> = ({
  currentLang = "en",
  onBookTransport,
  defaultTab = "route",
}) => {
  const t = tLogistics[currentLang] || tLogistics.en;

  // Active Tab
  const [activeTab, setActiveTab] = useState<"route" | "ownVehicles" | "splitExpense">(defaultTab);

  // Destination & Route State
  const [targetDestination, setTargetDestination] = useState("Mumbai Vashi APMC");
  const [bookedVehicleId, setBookedVehicleId] = useState<string | null>(null);

  // Dynamic distance calculation
  const destinationDistanceKm = targetDestination.includes("Mumbai")
    ? 170
    : targetDestination.includes("Pune")
    ? 180
    : targetDestination.includes("Surat")
    ? 230
    : 12;

  // Persistent States for Farmer Vehicles, Booking Requests, and Split Pools
  const [farmerVehicles, setFarmerVehicles] = useState<FarmerVehicle[]>(() => {
    try {
      const saved = localStorage.getItem("kv_farmer_vehicles");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialFarmerVehicles;
  });

  const [bookingRequests, setBookingRequests] = useState<TransportBookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem("kv_booking_requests");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialTransportBookingRequests;
  });

  const [splitPools, setSplitPools] = useState<SplitTransportPool[]>(() => {
    try {
      const saved = localStorage.getItem("kv_split_pools");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialSplitPools;
  });

  // Modal State for requesting a farmer vehicle from Tab 1
  const [requestModalVehicle, setRequestModalVehicle] = useState<FarmerVehicle | null>(null);
  const [reqCrop, setReqCrop] = useState(
    currentLang === "en" ? "Tomato (Abhinav)" : currentLang === "hi" ? "टमाटर (अभिनव)" : "टोमॅटो (अभिनव)"
  );
  const [reqWeightKg, setReqWeightKg] = useState<number>(1200);
  const [reqPickupLoc, setReqPickupLoc] = useState(
    currentLang === "en" ? "Dindori Farm Gate 3" : currentLang === "hi" ? "दिंडोरी फार्म गेट ३" : "दिंडोरी शेत गेट ३"
  );
  const [reqFarmerName, setReqFarmerName] = useState(
    currentLang === "en" ? "Kisan Mitra Farmer" : currentLang === "hi" ? "किसान मित्र" : "शेतकरी मित्र"
  );
  const [reqPhone, setReqPhone] = useState("9822987123");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Handlers for Farmer Vehicles
  const handleAddVehicle = (v: FarmerVehicle) => {
    const updated = [v, ...farmerVehicles];
    setFarmerVehicles(updated);
    try {
      localStorage.setItem("kv_farmer_vehicles", JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateVehicle = (updatedV: FarmerVehicle) => {
    const updated = farmerVehicles.map((v) => (v.id === updatedV.id ? updatedV : v));
    setFarmerVehicles(updated);
    try {
      localStorage.setItem("kv_farmer_vehicles", JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteVehicle = (id: string) => {
    const updated = farmerVehicles.filter((v) => v.id !== id);
    setFarmerVehicles(updated);
    try {
      localStorage.setItem("kv_farmer_vehicles", JSON.stringify(updated));
    } catch {}
  };

  // Handlers for Booking Requests
  const handleUpdateRequestStatus = (requestId: string, newStatus: "Accepted" | "Declined") => {
    const updated = bookingRequests.map((req) =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setBookingRequests(updated);
    try {
      localStorage.setItem("kv_booking_requests", JSON.stringify(updated));
    } catch {}
  };

  // Submit Request from Tab 1 to Farmer Vehicle
  const handleSubmitBookingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestModalVehicle) return;

    const estimatedFare =
      requestModalVehicle.baseFare + requestModalVehicle.ratePerKm * destinationDistanceKm;

    const newRequest: TransportBookingRequest = {
      id: `tbr-${Date.now()}`,
      vehicleId: requestModalVehicle.id,
      vehicleModel: `${requestModalVehicle.vehicleModel} (${requestModalVehicle.vehicleNumber})`,
      requesterFarmerName: reqFarmerName,
      requesterPhone: reqPhone,
      requesterVillage: reqPickupLoc,
      cropName: reqCrop,
      loadWeightKg: Number(reqWeightKg),
      pickupLocation: reqPickupLoc,
      destinationMandi: targetDestination,
      distanceKm: destinationDistanceKm,
      proposedDate:
        currentLang === "en" ? "Tomorrow 05:00 AM" : currentLang === "hi" ? "कल सुबह 05:00" : "उद्या सकाळी ०५:००",
      estimatedFare,
      status: "Pending Approval",
      createdAt: currentLang === "en" ? "Just now" : currentLang === "hi" ? "अभी" : "आत्ताच",
      notes:
        currentLang === "en"
          ? "Farmer transport booking initiated via route optimizer."
          : currentLang === "hi"
          ? "मार्ग अनुकूलन के माध्यम से किसान परिवहन बुकिंग का अनुरोध।"
          : "मार्ग नियोजनाद्वारे शेतकरी वाहतूक आरक्षणाची विनंती पाठवली.",
    };

    const updated = [newRequest, ...bookingRequests];
    setBookingRequests(updated);
    try {
      localStorage.setItem("kv_booking_requests", JSON.stringify(updated));
    } catch {}

    setRequestModalVehicle(null);
    setNoticeMessage(t.requestSuccessNotice);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  // Handlers for Split Transport Pools
  const handleAddPool = (pool: SplitTransportPool) => {
    const updated = [pool, ...splitPools];
    setSplitPools(updated);
    try {
      localStorage.setItem("kv_split_pools", JSON.stringify(updated));
    } catch {}
  };

  const handleJoinPool = (poolId: string, participant: SplitTransportPoolParticipant) => {
    const updated = splitPools.map((pool) => {
      if (pool.id !== poolId) return pool;
      const newParticipants = [...pool.participants, participant];
      const newTotalLoad = newParticipants.reduce((acc, p) => acc + p.loadWeightKg, 0);
      const isFull = newTotalLoad >= pool.totalCapacityKg * 0.95;
      return {
        ...pool,
        participants: newParticipants,
        status: isFull ? ("Fully Booked" as const) : ("Open for Sharing" as const),
      };
    });
    setSplitPools(updated);
    try {
      localStorage.setItem("kv_split_pools", JSON.stringify(updated));
    } catch {}
  };

  // Commercial fleet booking
  const handleBook = (item: TransportOption) => {
    setBookedVehicleId(item.id);
    onBookTransport?.(item);
    setTimeout(() => setBookedVehicleId(null), 4000);
  };

  const pendingRequestsCount = bookingRequests.filter(
    (r) => r.status === "Pending Approval"
  ).length;

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

      {/* Top 3 Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("route")}
          id="tab-route-fleet-btn"
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "route"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Route className="w-4 h-4 text-emerald-600" />
          <span>{t.tabRoute}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ownVehicles")}
          id="tab-own-vehicles-btn"
          className={`flex-1 min-w-[220px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "ownVehicles"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>{t.tabOwnVehicles}</span>
          {pendingRequestsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("splitExpense")}
          id="tab-split-expense-btn"
          className={`flex-1 min-w-[220px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "splitExpense"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>{t.tabSplitExpense}</span>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md font-bold">
            {t.tabSplitBadge}
          </span>
        </button>
      </div>

      {/* Tab 1: AI Route & Fleet Booking */}
      {activeTab === "route" && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Banner with Mandi Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>{t.title}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 text-xs self-start sm:self-center">
              <span className="font-semibold text-slate-600">{t.destination}</span>
              <select
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="Mumbai Vashi APMC">{t.destMumbai}</option>
                <option value="Pune Gultekdi Mandi">{t.destPune}</option>
                <option value="Surat Wholesale Mandi">{t.destSurat}</option>
                <option value="Local Nashik APMC">{t.destNashik}</option>
              </select>
            </div>
          </div>

          {/* AI Route Optimizer Card with Tractor Sunset Photographic Background */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] p-6 sm:p-8 flex flex-col justify-between text-white transition-all group">
            {/* Background Tractor & Farmer at Sunset Image */}
            <img
              src={transportTractorSunsetImg}
              alt="Farmer and tractor loaded with harvested crop sacks on farm dirt road at golden sunset"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay for high text readability while preserving the warm sunset tractor and crops */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/65 pointer-events-none" />

            {/* Tricolor micro-accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />

            {/* Top Text Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10 pt-1">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 bg-black/60 px-3 py-1 rounded-lg border border-white/25 backdrop-blur-md shadow-sm">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  {t.optEngine}
                </span>

                <h4 className="text-xl sm:text-3xl font-black font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {t.optRoute} {targetDestination}
                </h4>

                <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {t.routeDesc}
                </p>
              </div>
            </div>

            {/* Middle open space: Tractor loaded with sacks and farmer on dirt road at sunset clearly visible here */}
            <div className="flex-1 min-h-[120px] sm:min-h-[160px] pointer-events-none" />

            {/* Bottom Shifted Transparent Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
              {/* Card 1: Distance */}
              <div className="p-3.5 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/50 border border-white/30 backdrop-blur-xs shadow-lg transition-all flex flex-col justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase text-slate-200 font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.distance}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white mt-0.5 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {destinationDistanceKm} km
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-300 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] mt-1">
                  {t.savedKm}
                </span>
              </div>

              {/* Card 2: Transit Time */}
              <div className="p-3.5 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/50 border border-white/30 backdrop-blur-xs shadow-lg transition-all flex flex-col justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase text-slate-200 font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.transitTime}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white mt-0.5 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {destinationDistanceKm > 100 ? t.transitValLong : t.transitValShort}
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-300 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] mt-1">
                  {t.fastDelivery}
                </span>
              </div>

              {/* Card 3: Toll & Fuel */}
              <div className="p-3.5 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/50 border border-white/30 backdrop-blur-xs shadow-lg transition-all flex flex-col justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase text-slate-200 font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.tollFuel}
                </span>
                <span className="text-lg sm:text-2xl font-black text-emerald-300 mt-0.5 block font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  ₹{Math.round(destinationDistanceKm * 16.5).toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-300 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] mt-1">
                  {t.lowFreight}
                </span>
              </div>

              {/* Card 4: Live Delivery Route Path */}
              <div className="p-3.5 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-black/50 border border-white/30 backdrop-blur-xs shadow-lg transition-all flex flex-col justify-between">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-100 block mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                  {t.livePath}
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 shrink-0" />
                    <span className="font-bold text-white text-[11px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.farmPickup}</span>
                    <span className="text-[9px] text-emerald-300 font-semibold ml-auto">{t.dockReady}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                    <span className="font-bold text-white text-[11px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{t.weighbridge}</span>
                    <span className="text-[9px] text-sky-200 font-semibold ml-auto">{t.slipIssued}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-bold text-white text-[11px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{targetDestination}</span>
                    <span className="text-[9px] text-amber-200 font-semibold ml-auto">{t.escrowUnlock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Farmer-Owned Transport Vehicles Available for Hire */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>{t.farmerFleetTitle}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.farmerFleetSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("ownVehicles")}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto transition-colors cursor-pointer"
              >
                {t.postVehicleBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {farmerVehicles.map((v) => {
                const estimatedCost = v.baseFare + v.ratePerKm * destinationDistanceKm;

                return (
                  <div
                    key={v.id}
                    className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block">
                            {v.vehicleModel}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-800">
                            {v.vehicleNumber}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          ★ {v.rating || 4.9}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 mb-2">
                        <span>{t.ownerLabel} </span>
                        <strong>{v.ownerFarmerName}</strong> ({v.village})
                      </div>

                      <div className="my-2 p-2 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                        <div className="flex justify-between text-slate-600">
                          <span>{t.maxPayload}</span>
                          <span className="font-bold text-slate-800">{v.capacityKg} kg</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>{t.ratePerKm}</span>
                          <span className="font-bold text-slate-800">₹{v.ratePerKm}/km</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>{t.estTotalTrip}</span>
                          <span className="font-bold text-emerald-700">
                            ₹{estimatedCost.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {v.features.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>

                      <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {v.availability}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setRequestModalVehicle(v)}
                        id={`request-hire-${v.id}`}
                        className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>{t.requestBookingBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Commercial Logistics Fleet */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>{t.availableFleet}</span>
              <span className="text-xs font-normal text-slate-500">
                {t.cargoInsurance}
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {initialTransportOptions.map((item) => {
                const isBooked = bookedVehicleId === item.id;
                const estimatedCost = item.baseFare + item.ratePerKm * destinationDistanceKm;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-900">{item.vehicleType}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">
                          ★ {item.rating}
                        </span>
                      </div>

                      <span className="text-xs text-slate-500 block">{item.partnerName}</span>

                      <div className="my-3 p-2.5 rounded-lg bg-slate-50 text-xs space-y-1">
                        <div className="flex justify-between text-slate-600">
                          <span>{t.maxPayload}</span>
                          <span className="font-bold text-slate-800">{item.capacityKg} kg</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>{t.ratePerKm}</span>
                          <span className="font-bold text-slate-800">₹{item.ratePerKm}/km</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>{t.estTotalTrip}</span>
                          <span className="font-bold text-emerald-700">
                            ₹{estimatedCost.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.availability}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {isBooked ? (
                        <div className="w-full py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {t.bookedMsg}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBook(item)}
                          id={`book-truck-${item.id}`}
                          className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>{t.bookVehicle}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Vehicles & Farmer Booking Approvals */}
      {activeTab === "ownVehicles" && (
        <div className="animate-fade-in">
          <FarmerOwnVehiclesTab
            currentLang={currentLang}
            myVehicles={farmerVehicles}
            bookingRequests={bookingRequests}
            onAddVehicle={handleAddVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onUpdateRequestStatus={handleUpdateRequestStatus}
          />
        </div>
      )}

      {/* Tab 3: Split Transport Expense & Shared Pools */}
      {activeTab === "splitExpense" && (
        <div className="animate-fade-in">
          <FarmerSplitTransportTab
            currentLang={currentLang}
            pools={splitPools}
            onAddPool={handleAddPool}
            onJoinPool={handleJoinPool}
          />
        </div>
      )}

      {/* Modal: Send Booking Request to Farmer Vehicle Owner */}
      {requestModalVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>{t.modalRequestTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setRequestModalVehicle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 my-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <div className="font-bold">{requestModalVehicle.vehicleModel} ({requestModalVehicle.vehicleNumber})</div>
              <div className="text-[11px] text-emerald-800">
                {t.modalOwnerLabel} <strong>{requestModalVehicle.ownerFarmerName}</strong> • {requestModalVehicle.village} • {t.modalMaxWeightLabel} {requestModalVehicle.capacityKg} kg
              </div>
            </div>

            <form onSubmit={handleSubmitBookingRequest} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.produceLabel}</label>
                  <input
                    type="text"
                    required
                    value={reqCrop}
                    onChange={(e) => setReqCrop(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.loadLabel}</label>
                  <input
                    type="number"
                    required
                    min="100"
                    max={requestModalVehicle.capacityKg}
                    value={reqWeightKg}
                    onChange={(e) => setReqWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={reqFarmerName}
                    onChange={(e) => setReqFarmerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    value={reqPhone}
                    onChange={(e) => setReqPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.pickupLabel}</label>
                <input
                  type="text"
                  required
                  value={reqPickupLoc}
                  onChange={(e) => setReqPickupLoc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span>{t.modalDestLabel}</span>
                  <strong>{targetDestination} ({destinationDistanceKm} km)</strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.modalFareLabel}</span>
                  <strong className="text-emerald-700 font-extrabold text-sm">
                    ₹{(requestModalVehicle.baseFare + requestModalVehicle.ratePerKm * destinationDistanceKm).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRequestModalVehicle(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="submit-transit-request-btn"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t.sendRequestBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
