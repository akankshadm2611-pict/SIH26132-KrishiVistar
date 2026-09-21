import React, { useState } from "react";
import {
  Truck,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  X,
  Check,
  CheckCheck,
  XCircle,
  DollarSign,
  TrendingUp,
  Award,
  Navigation,
} from "lucide-react";
import { FarmerVehicle, TransportBookingRequest } from "../../types";
import { Language } from "../../translations";

interface FarmerOwnVehiclesTabProps {
  currentLang?: Language;
  myVehicles: FarmerVehicle[];
  bookingRequests: TransportBookingRequest[];
  onAddVehicle: (vehicle: FarmerVehicle) => void;
  onUpdateVehicle: (vehicle: FarmerVehicle) => void;
  onDeleteVehicle: (vehicleId: string) => void;
  onUpdateRequestStatus: (requestId: string, newStatus: "Accepted" | "Declined") => void;
}

const tOwn = {
  mr: {
    badge: "शेतकरी स्वतःची वाहतूक व्यवस्था",
    title: "माझी वाहतूक वाहने व शेतकरी बुकिंग मंजुरी",
    subtitle:
      "आपल्या मालकीचे वाहन (पिकअप, ट्रॅक्टर-ट्रॉली, आयशर, टेम्पो) इतर शेतकऱ्यांसाठी भाड्याने नोंदवा, बुकिंग विनंत्या तपासा आणि कोणाला वाहन द्यायचे ते स्वतः ठरवा.",
    postVehicleBtn: "+ नवीन वाहन नोंदणी करा",
    statTotalVehicles: "माझी नोंदणीकृत वाहने",
    statAvailable: "सध्या उपलब्ध",
    statCompletedTrips: "पूर्ण झालेल्या फेऱ्या",
    statPendingRequests: "मंजुरीसाठी प्रलंबित विनंत्या",
    regNo: "वाहन क्र.:",
    capacity: "वजन क्षमता:",
    rateKm: "दर प्रति किमी:",
    baseFare: "किमान भाडे:",
    featuresLabel: "सुविधा:",
    statusLabel: "स्थिती:",
    editBtn: "संपादित करा",
    deleteBtn: "हटवा",
    availableNow: "सध्या उपलब्ध",
    busyOnTrip: "फेरीवर / व्यस्त",
    availableTomorrow: "उद्या उपलब्ध",
    fleetHeading: "माझी नोंदणीकृत वाहने",
    completedTripsSuffix: "फेऱ्या पूर्ण",
    dateTimeLabel: "तारीख व वेळ:",
    
    // Categories
    catPickup: "पिकअप / लहान टेम्पो (१.५T - २T)",
    catMedium: "मध्यम आयशर / ४०७ (३T - ५T)",
    catTractor: "ट्रॅक्टर-ट्रॉली (स्थानिक शेतमाल)",
    catHeavy: "मोठा ट्रक (६ चाकी १०T+)",

    // Booking approvals section
    requestsTitle: "इतर शेतकऱ्यांच्या वाहतूक आरक्षण विनंत्या",
    requestsSubtitle: "इतर शेतकऱ्यांनी आपल्या वाहनासाठी पाठवलेल्या मागण्या. आपण स्वतः ठरवून वाहन द्या किंवा नाकारा.",
    requester: "मागणी करणारा शेतकरी:",
    cropLot: "शेतमाल व वजन:",
    pickup: "उचल ठिकाण:",
    destination: "बाजारपेठ गंतव्य:",
    fareOffered: "एकूण भाडे रक्कम:",
    pendingBadge: "मंजुरी प्रलंबित",
    acceptedBadge: "स्वीकृत व वाहन नियुक्त",
    declinedBadge: "नाकारले",
    acceptBtn: "वाहन देण्यास मान्यता द्या",
    declineBtn: "नाकारा",
    callRequester: "शेतकऱ्यास कॉल करा",
    whatsappRequester: "व्हॉट्सॲप मेसेज",
    noRequests: "अद्याप कोणतीही नवीन आरक्षण मागणी प्रलंबित नाही.",
    acceptedSuccessNotice: "वाहन यशस्वीरीत्या नियुक्त केले! शेतकऱ्याशी लोडिंग वेळेसाठी संपर्क साधा.",
    declinedNotice: "आरक्षण विनंती नाकारण्यात आली आहे.",

    // Modal
    modalAddTitle: "स्वतःचे वाहतूक वाहन नोंदवा",
    modalEditTitle: "वाहन माहिती संपादित करा",
    vehicleModelLabel: "वाहन मॉडेल व नाव * (उदा. महिंद्रा बोलेरो पिकअप / टाटा ४०७)",
    vehicleNumberLabel: "अधिकृत वाहन क्रमांक * (उदा. MH-15-EG-4421)",
    categoryLabel: "वाहन प्रकार *",
    capacityKgLabel: "कमाल वजन क्षमता (किलो मध्ये) *",
    rateKmLabel: "अपेक्षित दर (₹ प्रति किमी) *",
    baseFareLabel: "किमान प्राथमिक भाडे (₹) *",
    villageLabel: "गाव / शेत ठिकाण *",
    talukaLabel: "तालुका व जिल्हा *",
    phoneLabel: "चालक / मालक संपर्क फोन क्रमांक *",
    featuresSelectLabel: "वाहनातील विशेष सुविधा (अल्पविरामाने वेगळे करा)",
    featuresHint: "उदा. ताडपत्री कव्हर, क्रेट रॅक, जीपीएस ट्रॅकिंग, हायड्रॉलिक लिफ्ट",
    saveBtn: "वाहन नोंदणी जतन करा",
    cancelBtn: "रद्द करा",
    deleteConfirm: "तुम्हाला हे वाहन नक्की हटवायचे आहे का?",
  },
  hi: {
    badge: "किसान स्वयं की परिवहन व्यवस्था",
    title: "मेरे परिवहन वाहन एवं किसान बुकिंग स्वीकृति",
    subtitle:
      "अपना वाहन (पिकअप, ट्रैक्टर-ट्रॉली, आयशर, टेम्पो) अन्य किसानों के लिए सूचीबद्ध करें, बुकिंग अनुरोध देखें और स्वयं तय करें कि वाहन किसे देना है।",
    postVehicleBtn: "+ नया वाहन पंजीकृत करें",
    statTotalVehicles: "मेरे पंजीकृत वाहन",
    statAvailable: "वर्तमान में उपलब्ध",
    statCompletedTrips: "पूर्ण की गई यात्राएं",
    statPendingRequests: "स्वीकृति हेतु लंबित अनुरोध",
    regNo: "वाहन क्र.:",
    capacity: "वजन क्षमता:",
    rateKm: "प्रति किमी दर:",
    baseFare: "न्यूनतम आधार भाड़ा:",
    featuresLabel: "सुविधाएं:",
    statusLabel: "स्थिति:",
    editBtn: "संपादित करें",
    deleteBtn: "हटाएं",
    availableNow: "वर्तमान में उपलब्ध",
    busyOnTrip: "यात्रा पर / व्यस्त",
    availableTomorrow: "कल उपलब्ध",
    fleetHeading: "मेरे पंजीकृत वाहन",
    completedTripsSuffix: "यात्राएं पूर्ण",
    dateTimeLabel: "तारीख व समय:",

    // Categories
    catPickup: "पिकअप / छोटा टेम्पो (1.5T - 2T)",
    catMedium: "मध्यम आयशर / 407 (3T - 5T)",
    catTractor: "ट्रैक्टर-ट्रॉली (स्थानीय कृषि उपज)",
    catHeavy: "बड़ा ट्रक (6 पहिया 10T+)",

    // Booking approvals section
    requestsTitle: "अन्य किसानों के परिवहन बुकिंग अनुरोध",
    requestsSubtitle: "अन्य किसानों द्वारा आपके वाहन के लिए भेजे गए अनुरोध। आप स्वयं निर्णय लें कि वाहन किसे देना है।",
    requester: "अनुरोधकर्ता किसान:",
    cropLot: "फसल एवं वजन:",
    pickup: "पिकअप स्थान:",
    destination: "गंतव्य मंडी:",
    fareOffered: "कुल प्रस्तावित भाड़ा:",
    pendingBadge: "स्वीकृति लंबित",
    acceptedBadge: "स्वीकृत व वाहन नियत",
    declinedBadge: "अस्वीकृत",
    acceptBtn: "स्वीकृति दें",
    declineBtn: "अस्वीकार करें",
    callRequester: "किसान को कॉल करें",
    whatsappRequester: "व्हाट्सएप संदेश",
    noRequests: "वर्तमान में कोई नया बुकिंग अनुरोध लंबित नहीं है।",
    acceptedSuccessNotice: "वाहन सफलतापूर्वक नियत कर दिया गया! लोडिंग के लिए किसान से संपर्क करें।",
    declinedNotice: "बुकिंग अनुरोध अस्वीकृत कर दिया गया है।",

    // Modal
    modalAddTitle: "स्वयं का परिवहन वाहन पंजीकृत करें",
    modalEditTitle: "वाहन जानकारी संपादित करें",
    vehicleModelLabel: "वाहन मॉडल व नाम * (उदा. महिंद्रा बोलेरो पिकअप / टाटा 407)",
    vehicleNumberLabel: "वाहन पंजीकरण संख्या * (उदा. MH-15-EG-4421)",
    categoryLabel: "वाहन श्रेणी *",
    capacityKgLabel: "अधिकतम वजन क्षमता (किग्रा में) *",
    rateKmLabel: "अपेक्षित दर (₹ प्रति किमी) *",
    baseFareLabel: "आधार भाड़ा (₹) *",
    villageLabel: "गांव / फार्म स्थान *",
    talukaLabel: "तहसील व जिला *",
    phoneLabel: "चालक / मालिक मोबाइल नंबर *",
    featuresSelectLabel: "वाहन सुविधाएं (अल्पविराम से अलग करें)",
    featuresHint: "उदा. तिरपाल कवर, क्रेट रैक, जीपीएस ट्रैकिंग, हाइड्रोलिक लिफ्ट",
    saveBtn: "वाहन सहेजें",
    cancelBtn: "रद्द करें",
    deleteConfirm: "क्या आप वाकई इस वाहन को हटाना चाहते हैं?",
  },
  en: {
    badge: "Farmer Own Transport Fleet & Logistics Dispatch",
    title: "My Transport Vehicles & Booking Approvals",
    subtitle:
      "Post your own pickup, tractor-trolley, or cargo truck for fellow farmers to hire. Review incoming transit requests and decide whom to assign your vehicle to.",
    postVehicleBtn: "+ Post / Register My Vehicle",
    statTotalVehicles: "My Registered Vehicles",
    statAvailable: "Available Now",
    statCompletedTrips: "Completed Trips",
    statPendingRequests: "Pending Approvals",
    regNo: "Reg No:",
    capacity: "Max Payload:",
    rateKm: "Per Km Rate:",
    baseFare: "Base Fare:",
    featuresLabel: "Equipment & Features:",
    statusLabel: "Status:",
    editBtn: "Edit Details",
    deleteBtn: "Delete",
    availableNow: "Available Now",
    busyOnTrip: "On Trip / Busy",
    availableTomorrow: "Available Tomorrow",
    fleetHeading: "Vehicles in My Fleet",
    completedTripsSuffix: "Trips Completed",
    dateTimeLabel: "Date & Time:",

    // Categories
    catPickup: "Pickup / Light Truck (1.5T - 2T)",
    catMedium: "Medium Eicher / 407 (3T - 5T)",
    catTractor: "Tractor-Trolley (Local Farm Loads)",
    catHeavy: "Heavy Truck (6 Wheeler 10T+)",

    // Booking approvals section
    requestsTitle: "Transit Booking Requests from Other Farmers",
    requestsSubtitle: "Crop transit requests sent by neighboring farmers for your vehicle. As the vehicle owner, you decide whom to grant transport to.",
    requester: "Requester Farmer:",
    cropLot: "Produce Lot & Weight:",
    pickup: "Farm Pickup Location:",
    destination: "Destination Mandi:",
    fareOffered: "Total Trip Fare:",
    pendingBadge: "Pending Approval",
    acceptedBadge: "Accepted & Assigned",
    declinedBadge: "Declined",
    acceptBtn: "Accept & Assign Vehicle",
    declineBtn: "Decline",
    callRequester: "Call Farmer",
    whatsappRequester: "WhatsApp",
    noRequests: "No pending transport booking requests at this moment.",
    acceptedSuccessNotice: "Vehicle assigned successfully! Coordinate with the farmer for loading time.",
    declinedNotice: "Booking request was declined.",

    // Modal
    modalAddTitle: "Register Your Own Transport Vehicle",
    modalEditTitle: "Edit Vehicle Details",
    vehicleModelLabel: "Vehicle Model & Name * (e.g., Mahindra Bolero Pik-Up / Tata 407)",
    vehicleNumberLabel: "Official Registration Number * (e.g., MH-15-EG-4421)",
    categoryLabel: "Vehicle Category *",
    capacityKgLabel: "Max Payload Capacity (in kg) *",
    rateKmLabel: "Asking Rate (₹ per km) *",
    baseFareLabel: "Base Starting Fare (₹) *",
    villageLabel: "Home Village / Farm Location *",
    talukaLabel: "Taluka & District *",
    phoneLabel: "Driver / Owner Phone Number *",
    featuresSelectLabel: "Vehicle Equipment / Features (comma-separated)",
    featuresHint: "e.g., Tarpaulin Weather Cover, Plastic Crate Racks, GPS Tracking, Hydraulic Tipping",
    saveBtn: "Save Vehicle Registration",
    cancelBtn: "Cancel",
    deleteConfirm: "Are you sure you want to remove this vehicle from your registry?",
  },
};

export const FarmerOwnVehiclesTab: React.FC<FarmerOwnVehiclesTabProps> = ({
  currentLang = "en",
  myVehicles,
  bookingRequests,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onUpdateRequestStatus,
}) => {
  const t = tOwn[currentLang] || tOwn.en;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Form State
  const [vehicleModel, setVehicleModel] = useState("Mahindra Bolero Pik-Up 1.7T");
  const [vehicleNumber, setVehicleNumber] = useState("MH-15-EG-4421");
  const [vehicleCategory, setVehicleCategory] = useState<
    "Pickup / Light Truck" | "Medium Eicher / 407" | "Tractor-Trolley" | "Heavy Truck"
  >("Pickup / Light Truck");
  const [capacityKg, setCapacityKg] = useState<number>(1700);
  const [ratePerKm, setRatePerKm] = useState<number>(22);
  const [baseFare, setBaseFare] = useState<number>(800);
  const [village, setVillage] = useState(currentLang === "en" ? "Dindori" : "दिंडोरी");
  const [taluka, setTaluka] = useState(
    currentLang === "en" ? "Dindori, Nashik" : "दिंडोरी, नाशिक"
  );
  const [ownerPhone, setOwnerPhone] = useState("9822194820");
  const [availability, setAvailability] = useState<
    "Available Now" | "On Trip / Busy" | "Available Tomorrow"
  >("Available Now");
  const [featuresInput, setFeaturesInput] = useState(
    currentLang === "en"
      ? "Tarpaulin Cover, Crate Racks, GPS Tracking"
      : "ताडपत्री कव्हर, क्रेट रॅक, जीपीएस ट्रॅकिंग"
  );

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingVehicleId(null);
    setVehicleModel(currentLang === "en" ? "Mahindra Bolero Pik-Up 1.7T" : "महिंद्रा बोलेरो पिकअप १.७T");
    setVehicleNumber("MH-15-EG-" + Math.floor(1000 + Math.random() * 9000));
    setVehicleCategory("Pickup / Light Truck");
    setCapacityKg(1700);
    setRatePerKm(22);
    setBaseFare(800);
    setVillage(currentLang === "en" ? "Dindori" : "दिंडोरी");
    setTaluka(currentLang === "en" ? "Dindori, Nashik" : "दिंडोरी, नाशिक");
    setOwnerPhone("9822194820");
    setAvailability("Available Now");
    setFeaturesInput(
      currentLang === "en"
        ? "Tarpaulin Cover, Crate Racks, GPS Tracking"
        : "ताडपत्री कव्हर, क्रेट रॅक, जीपीएस ट्रॅकिंग"
    );
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (v: FarmerVehicle) => {
    setEditingVehicleId(v.id);
    setVehicleModel(v.vehicleModel);
    setVehicleNumber(v.vehicleNumber);
    setVehicleCategory(v.vehicleCategory);
    setCapacityKg(v.capacityKg);
    setRatePerKm(v.ratePerKm);
    setBaseFare(v.baseFare);
    setVillage(v.village);
    setTaluka(v.taluka);
    setOwnerPhone(v.ownerPhone);
    setAvailability(v.availability);
    setFeaturesInput(v.features.join(", "));
    setIsModalOpen(true);
  };

  // Submit Save
  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    const features = featuresInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingVehicleId) {
      const existing = myVehicles.find((v) => v.id === editingVehicleId);
      if (!existing) return;

      const updated: FarmerVehicle = {
        ...existing,
        vehicleModel,
        vehicleNumber,
        vehicleCategory,
        capacityKg: Number(capacityKg),
        ratePerKm: Number(ratePerKm),
        baseFare: Number(baseFare),
        village,
        taluka,
        ownerPhone,
        availability,
        features,
      };

      onUpdateVehicle(updated);
      setNoticeMessage(
        currentLang === "en"
          ? "Vehicle details updated successfully!"
          : currentLang === "hi"
          ? "वाहन विवरण सफलतापूर्वक अद्यतन किया गया!"
          : "वाहन माहिती यशस्वीरीत्या अद्यतनित झाली!"
      );
    } else {
      const newV: FarmerVehicle = {
        id: `fv-${Date.now()}`,
        ownerFarmerName:
          currentLang === "en" ? "Balasaheb Shirole" : currentLang === "hi" ? "बालासाहेब शिरोले" : "बाळासाहेब शिरोळे",
        ownerPhone,
        vehicleModel,
        vehicleNumber,
        vehicleCategory,
        capacityKg: Number(capacityKg),
        ratePerKm: Number(ratePerKm),
        baseFare: Number(baseFare),
        village,
        taluka,
        availability,
        features,
        rating: 5.0,
        completedTrips: 0,
        createdAt: "Just now",
      };

      onAddVehicle(newV);
      setNoticeMessage(
        currentLang === "en"
          ? "New vehicle registered to your fleet!"
          : currentLang === "hi"
          ? "नया वाहन आपके बेड़े में पंजीकृत हो गया है!"
          : "नवीन वाहन आपल्या ताफ्यात यशस्वीरीत्या नोंदवले गेले!"
      );
    }

    setIsModalOpen(false);
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  // Quick Toggle Status
  const handleToggleStatus = (v: FarmerVehicle) => {
    const nextStatus =
      v.availability === "Available Now"
        ? "On Trip / Busy"
        : v.availability === "On Trip / Busy"
        ? "Available Tomorrow"
        : "Available Now";

    onUpdateVehicle({ ...v, availability: nextStatus });
  };

  // Delete vehicle
  const handleDelete = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      onDeleteVehicle(id);
    }
  };

  // Stats calculation
  const totalVehicles = myVehicles.length;
  const availableCount = myVehicles.filter((v) => v.availability === "Available Now").length;
  const completedTripsCount = myVehicles.reduce((acc, v) => acc + (v.completedTrips || 0), 0);
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

      {/* Header & Post Vehicle Button */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-1.5 border border-emerald-200">
              <Truck className="w-3.5 h-3.5" />
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
            onClick={handleOpenAdd}
            id="post-farmer-vehicle-btn"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t.postVehicleBtn}</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-medium block">
              {t.statTotalVehicles}
            </span>
            <span className="text-xl font-extrabold text-slate-900 mt-0.5 block font-display">
              {totalVehicles}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11px] text-emerald-700 font-medium block">
              {t.statAvailable}
            </span>
            <span className="text-xl font-extrabold text-emerald-800 mt-0.5 block font-display">
              {availableCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
            <span className="text-[11px] text-blue-700 font-medium block">
              {t.statCompletedTrips}
            </span>
            <span className="text-xl font-extrabold text-blue-800 mt-0.5 block font-display">
              {completedTripsCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-[11px] text-amber-700 font-medium block">
              {t.statPendingRequests}
            </span>
            <span className="text-xl font-extrabold text-amber-800 mt-0.5 block font-display">
              {pendingRequestsCount}
            </span>
          </div>
        </div>

        {/* Registered Vehicles List */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.fleetHeading}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myVehicles.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">
                        {v.vehicleModel}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                        {v.vehicleNumber}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(v)}
                      title="Click to toggle availability"
                      className={`text-[10px] font-bold px-2 py-1 rounded-full cursor-pointer transition-colors ${
                        v.availability === "Available Now"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : v.availability === "Available Tomorrow"
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      {v.availability === "Available Now"
                        ? t.availableNow
                        : v.availability === "Available Tomorrow"
                        ? t.availableTomorrow
                        : t.busyOnTrip}
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{v.taluka || v.village}</span>
                  </div>

                  {/* Specs Card */}
                  <div className="p-2.5 rounded-lg bg-slate-50 text-xs space-y-1 mb-3 border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>{t.capacity}</span>
                      <span className="font-bold text-slate-800">{v.capacityKg} kg</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{t.rateKm}</span>
                      <span className="font-bold text-slate-800">₹{v.ratePerKm}/km</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{t.baseFare}</span>
                      <span className="font-bold text-slate-800">₹{v.baseFare}</span>
                    </div>
                  </div>

                  {/* Features badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {v.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{v.completedTrips || 0} {t.completedTripsSuffix}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(v)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title={t.editBtn}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(v.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title={t.deleteBtn}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transit Booking Requests from Other Farmers */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{t.requestsTitle}</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.requestsSubtitle}
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
            {bookingRequests.length} {currentLang === "en" ? "Requests" : currentLang === "hi" ? "अनुरोध" : "मागण्या"}
          </span>
        </div>

        {bookingRequests.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-50 text-center text-xs text-slate-500 font-medium">
            {t.noRequests}
          </div>
        ) : (
          <div className="space-y-3">
            {bookingRequests.map((req) => {
              const isPending = req.status === "Pending Approval";
              const isAccepted = req.status === "Accepted";

              return (
                <div
                  key={req.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isPending
                      ? "border-amber-200 bg-amber-50/30"
                      : isAccepted
                      ? "border-emerald-200 bg-emerald-50/20"
                      : "border-slate-200 bg-slate-50/40 opacity-70"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Requester Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">
                          {req.requesterFarmerName}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {req.requesterVillage}
                        </span>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isPending
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : isAccepted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-rose-100 text-rose-800 border border-rose-300"
                          }`}
                        >
                          {isPending
                            ? t.pendingBadge
                            : isAccepted
                            ? t.acceptedBadge
                            : t.declinedBadge}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                        <span>
                          <strong>{t.cropLot}:</strong> {req.cropName} (
                          {req.loadWeightKg.toLocaleString("en-IN")} kg)
                        </span>
                        <span>
                          <strong>{t.destination}:</strong> {req.destinationMandi} (
                          {req.distanceKm} km)
                        </span>
                        <span>
                          <strong>{t.dateTimeLabel}</strong> {req.proposedDate}
                        </span>
                        <span>
                          <strong>{t.fareOffered}:</strong>{" "}
                          <span className="text-emerald-700 font-extrabold text-sm">
                            ₹{req.estimatedFare.toLocaleString("en-IN")}
                          </span>
                        </span>
                      </div>

                      {req.notes && (
                        <p className="text-[11px] text-slate-500 italic mt-1">
                          "{req.notes}"
                        </p>
                      )}
                    </div>

                    {/* Decision Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {isPending ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateRequestStatus(req.id, "Accepted");
                              setNoticeMessage(t.acceptedSuccessNotice);
                              setTimeout(() => setNoticeMessage(null), 3500);
                            }}
                            id={`accept-req-${req.id}`}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.acceptBtn}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onUpdateRequestStatus(req.id, "Declined");
                              setNoticeMessage(t.declinedNotice);
                              setTimeout(() => setNoticeMessage(null), 3500);
                            }}
                            id={`decline-req-${req.id}`}
                            className="px-3 py-1.5 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>{t.declineBtn}</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${req.requesterPhone}`}
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>{t.callRequester}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${req.requesterPhone}?text=${encodeURIComponent(
                              `Hello ${req.requesterFarmerName}, regarding your transit booking request for ${req.cropName} to ${req.destinationMandi}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>{t.whatsappRequester}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Register / Edit Vehicle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>{editingVehicleId ? t.modalEditTitle : t.modalAddTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-3.5 text-xs mt-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.vehicleModelLabel}
                </label>
                <input
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.vehicleNumberLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MH-15-EG-4421"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-medium bg-white"
                  >
                    <option value="Pickup / Light Truck">{t.catPickup}</option>
                    <option value="Medium Eicher / 407">{t.catMedium}</option>
                    <option value="Tractor-Trolley">{t.catTractor}</option>
                    <option value="Heavy Truck">{t.catHeavy}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.capacityKgLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    max="20000"
                    step="100"
                    value={capacityKg}
                    onChange={(e) => setCapacityKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.rateKmLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="100"
                    value={ratePerKm}
                    onChange={(e) => setRatePerKm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.baseFareLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="200"
                    max="5000"
                    step="100"
                    value={baseFare}
                    onChange={(e) => setBaseFare(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.villageLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.talukaLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.statusLabel}
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden bg-white font-semibold"
                  >
                    <option value="Available Now">{t.availableNow}</option>
                    <option value="On Trip / Busy">{t.busyOnTrip}</option>
                    <option value="Available Tomorrow">{t.availableTomorrow}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.featuresSelectLabel}
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {t.featuresHint}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="save-farmer-vehicle-btn"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
