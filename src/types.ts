export type UserRole = "farmer" | "buyer";

export type Language = "en" | "hi" | "mr";

export type QualityGrade = "Grade A" | "Grade B" | "Grade C";

export interface MandiPrice {
  id: string;
  crop: string;
  category: "Vegetables" | "Grains" | "Pulses" | "Fruits";
  mandi: string;
  district: string;
  minPrice: number; // in ₹/kg
  maxPrice: number;
  modalPrice: number;
  prevModalPrice: number;
  arrivalsTonnes: number;
  priceChangePercent: number;
  lastUpdated: string;
  variety?: string;
  change24h?: number;
  state?: string;
  associationBenchmark?: number; // Wholesale benchmark published by Local Traders Association
  associationName?: string; // e.g. "Nashik District Wholesale Merchants Association"
  auctionSession?: "Morning Primary Auction" | "Midday Spot Trading" | "Evening Settlement";
  lotTradeStatus?: "Active Bidding" | "Benchmarked" | "Session Closed";
  lastAuctionBidTime?: string;
  bulletinRefId?: string;
  dateIso?: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  dateIso?: string;
  tempMax: number;
  tempMin: number;
  condition: "Sunny" | "Partly Cloudy" | "Heavy Rain" | "Thunderstorm" | "Moderate Rain";
  rainProb: number; // percentage
  humidity: number;
  harvestRisk: "Low" | "Medium" | "High";
  advice: string;
}

export interface WeatherAlert {
  id: string;
  targetDate: string; // ISO string: YYYY-MM-DD
  daysFromNow: number;
  severity: "High" | "Medium" | "Low";
  title: {
    mr: string;
    hi: string;
    en: string;
  };
  advisory: {
    mr: string;
    hi: string;
    en: string;
  };
  isSeen?: boolean;
}

export interface BuyerTrustMetrics {
  confidenceScore: number; // e.g. 98 (%)
  avgPaymentDays: number; // e.g. 0.8
  paymentSpeedLabel: string; // e.g. "Instant / Same Day Escrow Release"
  farmerReviewRating: number; // e.g. 4.9
  totalFarmerReviews: number; // e.g. 42
  completedTradesCount: number; // e.g. 128
  totalPayoutAmount: number; // e.g. 3480000
  disputeRatePercent: number; // e.g. 0.1
  kycVerified: boolean;
  gstApmcLicenseVerified: boolean;
  zeroDefaultGuarantee: boolean;
  recentReviews?: {
    farmerName: string;
    village: string;
    rating: number;
    daysToPay: number;
    comment: string;
    date: string;
  }[];
}

export interface FarmerLotTrustMetrics {
  confidenceScore: number; // e.g. 97 (%)
  gradeAccuracyScore: number; // e.g. 98%
  onTimeDispatchScore: number; // e.g. 99%
  weightAccuracyScore: number; // e.g. 100%
  completedDeliveriesCount: number; // e.g. 48
  buyerSatisfactionRating: number; // e.g. 4.9
  totalBuyerReviews: number; // e.g. 36
  landRecordVerified: boolean; // e.g. 7/12 & 8A Land record verified
  kisanCreditVerified: boolean;
  moisturePercent?: number;
  brixSweetnessScore?: number;
  labAssayCertified?: boolean;
  recentBuyerReviews?: {
    buyerName: string;
    buyerType: string;
    rating: number;
    qualityComment: string;
    date: string;
  }[];
}

export interface ProduceLot {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  crop: string;
  variety: string;
  quantityKg: number;
  availableKg: number;
  qualityGrade: QualityGrade;
  harvestDate: string;
  askingPricePerKg: number;
  status: "Active" | "Bidding" | "Sold" | "Stored" | "Available" | "Partially Sold";
  offersCount: number;
  image: string;
  organicCertified: boolean;
  minOrderQuantityKg: number;
  distanceKm?: number;
  trustMetrics?: FarmerLotTrustMetrics;
}

export interface LotOffer {
  id: string;
  lotId: string;
  buyerId: string;
  buyerName: string;
  buyerType: "Retail Chain" | "Wholesaler" | "Supermarket" | "Household Consumer" | "Restaurant";
  offeredPricePerKg: number;
  quantityRequestedKg: number;
  totalValue: number;
  distanceKm: number;
  status: "Pending" | "Accepted" | "Countered" | "Rejected";
  timestamp: string;
  notes?: string;
  buyerTrustMetrics?: BuyerTrustMetrics;
}

export interface ColdStorageFacility {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  totalCapacityMT: number;
  availableCapacityMT: number;
  temperatureRange: string;
  pricePerKgPerDay: number;
  pricePerBagPerMonth: number;
  rating: number;
  verified: boolean;
  phone: string;
  suitableCrops: string[];
  isFarmerOwned?: boolean;
  ownerName?: string;
}

export interface ColdStorageBookingRequest {
  id: string;
  facilityId: string;
  facilityName: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerVillage: string;
  crop: string;
  quantityMT: number;
  requestedDays: number;
  startDate: string;
  expectedDispatchDate: string;
  status: "pending" | "accepted" | "rejected" | "dispatched";
  createdAt: string;
  notes?: string;
  rejectionReason?: string;
  dailyRatePerKg: number;
  totalEstimatedRent: number;
  token?: string;
  actualDispatchedDate?: string;
}

export interface FarmerColdStorageFacility {
  id: string;
  ownerFarmerId: string;
  ownerName: string;
  facilityName: string;
  location: string;
  taluka: string;
  district: string;
  phone: string;
  isPubliclyVisible: boolean;
  totalCapacityMT: number;
  ratePerKgPerDay: number;
  pricePerBagPerMonth: number;
  temperatureRange: string;
  suitableCrops: string[];
}

export interface TransportOption {
  id: string;
  vehicleType: "Mini Truck (1T)" | "Eicher (3T)" | "Heavy Truck (10T)" | "Reefer Cold Van (4T)" | string;
  capacityKg: number;
  baseFare: number;
  ratePerKm: number;
  availability: "Available Now" | "In 2 Hours" | "Scheduled" | string;
  partnerName: string;
  rating: number;
  isFarmerOwned?: boolean;
  ownerFarmerName?: string;
  ownerPhone?: string;
  village?: string;
  vehicleNumber?: string;
}

export interface FarmerVehicle {
  id: string;
  ownerFarmerName: string;
  ownerPhone: string;
  village: string;
  taluka: string;
  vehicleModel: string; // e.g. "Mahindra Bolero Pik-Up", "Tata 407", "John Deere 5050D Tractor Trolley"
  vehicleNumber: string; // e.g. "MH-15-EG-4421"
  vehicleCategory: "Pickup / Light Truck" | "Medium Eicher / 407" | "Tractor-Trolley" | "Heavy Truck";
  capacityKg: number;
  ratePerKm: number;
  baseFare: number;
  features: string[]; // ["Tarpaulin Cover", "Crate Racks", "GPS Tracking", "Hydraulic Lift"]
  availability: "Available Now" | "On Trip / Busy" | "Available Tomorrow";
  rating: number;
  completedTrips: number;
  createdAt: string;
}

export interface TransportBookingRequest {
  id: string;
  vehicleId: string;
  vehicleModel: string;
  requesterFarmerName: string;
  requesterPhone: string;
  requesterVillage: string;
  cropName: string;
  loadWeightKg: number;
  pickupLocation: string;
  destinationMandi: string;
  distanceKm: number;
  proposedDate: string;
  estimatedFare: number;
  status: "Pending Approval" | "Accepted" | "Declined" | "Completed";
  createdAt: string;
  notes?: string;
}

export interface SplitTransportPoolParticipant {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  crop: string;
  loadWeightKg: number;
  splitCost: number;
  joinedAt: string;
}

export interface SplitTransportPool {
  id: string;
  hostFarmerName: string;
  hostPhone: string;
  originTaluka: string; // e.g. "Dindori, Nashik"
  destinationMandi: string; // e.g. "Mumbai Vashi APMC"
  distanceKm: number;
  departureTime: string; // e.g. "Tomorrow 04:30 AM"
  departureDate: string;
  vehicleType: string; // e.g. "Eicher 14ft (4T)"
  totalCapacityKg: number;
  totalTripFare: number;
  status: "Open for Sharing" | "Fully Booked" | "In Transit";
  participants: SplitTransportPoolParticipant[];
  notes?: string;
}

export interface VerifiedBuyerMatch {
  id: string;
  name: string;
  type:
    | "Supermarket Chain"
    | "Export House"
    | "Processing Unit"
    | "Wholesale Mandi Trader"
    | "Retail Chain"
    | "Hotel / Restaurant Syndicate";
  location: string;
  distanceKm: number;
  cropsNeeded: string[];
  quantityNeededKg: number;
  desiredGrade: QualityGrade;
  maxBudgetPerKg: number;
  paymentReliabilityScore: number; // e.g. 98%
  matchScore: number; // e.g. 96%
  verified: boolean;
  buyerTrustMetrics?: BuyerTrustMetrics;
}

export type EscrowStatus = "Order Confirmed" | "Payment in Escrow" | "Dispatched" | "Delivered & Inspected" | "Payment Released";

export interface CalamityRefundInfo {
  hasCalamity: boolean;
  calamityType?: "Unseasonal Hailstorm" | "Excess Rain & Waterlogging" | "Severe Drought" | "Pest Outbreak / Frost" | "Flash Flood Damage";
  claimStatus: "Disbursed / Credited" | "Approved (Pending DBT)" | "Survey in Progress" | "Eligible / Application Open" | "None / Normal Harvest";
  refundAmount?: number;
  insuranceScheme?: string; // e.g. "PMFBY & Maharashtra SDRF Calamity Relief"
  applicationId?: string;
  dbtUtrNumber?: string;
  surveyDate?: string;
  disbursedDate?: string;
  lossPercentage?: number;
  govtAgency?: string;
  remarks?: string;
}

export interface GeotaggedPhotoData {
  imageDataUrl: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  timestamp: string;
  locationName: string;
}

export interface SubmittedDocumentItem {
  documentName: string;
  type: string;
  fileUrl?: string;
  status: "Verified" | "Uploaded" | "Pending";
}

export interface OfficeAppointmentPass {
  tokenNumber: string;
  officeName: string;
  officerName: string;
  counter: string;
  appointmentDate: string;
  appointmentTime: string;
  documentsToBring: string[];
  status: "Confirmed" | "Completed";
  notes?: string;
}

export interface GovtCalamityClaimRecord {
  id: string;
  vkNumber?: string; // Auto-generated once approved (e.g. VK-MH-2026-84920)
  orderId?: string;
  lotId?: string;
  crop: string;
  cropVariety?: string;
  cropStage?: string;
  district: string;
  taluka: string;
  village?: string;
  gatNumber?: string; // Land / Survey / Gat Number
  damagedArea?: string; // e.g. "2.5 Acres"
  calamityType: string;
  calamityDetails?: string;
  dateOfDamage?: string; // Specific date of calamity impact
  eventDate: string;
  surveyorOfficer: string;
  lossPercentage: number;
  assessedDamageValue?: number;
  approvedRefundAmount?: number;
  status:
    | "Pending"
    | "Disbursed (DBT)"
    | "Approved (Transfer in 24h)"
    | "Approved"
    | "Field Survey Underway"
    | "Claim Lodged"
    | "Rejected"
    | "Appeal Scheduled";
  // SDRF Category & Criteria details (from State/National SDRF norms)
  sdrfItemNumber?: number;
  sdrfCategory?: string;
  sdrfSubCategory?: string;
  sdrfAssistanceRateText?: string;
  sdrfCalculatedAmount?: number;
  // Aadhaar, Mobile, and Document details
  aadhaarNumber?: string;
  aadhaarMobile?: string;
  aadhaarSeedingStatus?: "Aadhaar Seeded & Active" | "Pending Seeding" | "Verified";
  hasSevenTwelveExtract?: boolean;
  sevenTwelveDocName?: string;
  hasEightAExtract?: boolean;
  eightAExtractDocName?: string;
  hasBankPassbook?: boolean;
  bankPassbookDocName?: string;
  fieldMediaFiles?: { type: "photo" | "video"; name: string; size?: string; url?: string }[];
  dbtReferenceNumber?: string;
  beneficiaryAccount?: string;
  schemeName: string;
  sanctionDate?: string;
  supportHelpline: string;
  surveyReportNumber?: string;
  geotaggedPhoto?: GeotaggedPhotoData;
  submittedDocuments?: SubmittedDocumentItem[];
  assignedAgencies?: {
    localAgriOffice: string;
    revenueOfficer: string;
    insuranceCompany: string;
  };
  suggestedSteps?: string[];
  rejectionReason?: string;
  officeAppointment?: OfficeAppointmentPass;
  pmfbyComplaintRef?: string;
}

export interface TransactionOrder {
  id: string;
  lotId?: string;
  crop: string;
  variety?: string;
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  sellerName?: string;
  farmerName?: string;
  sellerLocation?: string;
  farmerLocation?: string;
  buyerId?: string;
  farmerId?: string;
  buyerName: string;
  buyerLocation?: string;
  deliveryAddress?: string;
  orderType: "Small Quantity" | "Bulk Order" | "small" | "bulk";
  escrowStatus?: EscrowStatus;
  paymentStatus?: "In Escrow" | "Paid" | "Pending" | "Refunded";
  orderStatus?: "Confirmed" | "In Transit" | "Delivered" | "Cancelled";
  orderDate?: string;
  createdAt?: string;
  escrowLockedDate?: string;
  paymentReleasedDate?: string;
  estimatedDelivery?: string;
  transportVehicle?: string;
  trackingStep?: number; // 1 to 4
  paymentMode?: "UPI / Net Banking (Escrow Protected)" | "Direct Bank Payout" | string;
  ratingGiven?: number;
  reviewComment?: string;
  grievanceRaised?: boolean;
  qualityGrade?: QualityGrade;
  calamityRefund?: CalamityRefundInfo;
}

export interface GrievanceRecord {
  id: string;
  orderId: string;
  crop: string;
  farmerName: string;
  buyerName: string;
  issueType: "Damaged in Transit" | "Quality Grade Mismatch" | "Shortage in Weight" | "Delayed Delivery";
  description: string;
  status: "Under Review" | "Resolution Proposed" | "Refund Processed" | "Closed";
  submittedAt: string;
  refundAmount?: number;
}

export interface PriceForecastPoint {
  day: string;
  actualPrice?: number;
  predictedPrice: number;
  lowerBound: number;
  upperBound: number;
  demandLevel: "Normal" | "High" | "Peak";
}

export type CattleType = "Cow" | "Buffalo" | "Bullock" | "Goat";

export interface CattleAvailabilityItem {
  type: CattleType;
  breed: string;
  count: number;
  purpose?: "Milking / Dairy" | "Ploughing / Farm Work" | "Breeding / Stud" | "Dairy / Breeding";
  healthTagged?: boolean;
}

export interface CattleKeeper {
  id: string;
  name: string;
  farmName?: string;
  phone: string;
  altPhone?: string;
  village: string;
  taluka: string;
  district: string;
  distanceKm: number;
  availableBreeds: CattleAvailabilityItem[];
  verified: boolean;
  address: string;
}

export interface CattleRecord {
  id: string;
  type: CattleType;
  breed: string;
  count: number;
  milkingStatus: "Milking" | "Dry" | "Working" | "Calf";
  milkYieldLpd?: number;
  tagNumber?: string;
  ageYears?: number;
  vaccinationStatus?: boolean;
  vaccineDetails?: string;
  remarks?: string;
  updatedAt?: string;
}

export interface FarmerRegistrationDetails {
  onlyCrops: boolean;
  primaryCrops?: string[];
  landAcres?: number;
  hasTransportVehicles: boolean;
  transportDetails?: {
    vehicleType: string;
    capacityTonnes?: number;
    vehicleNumber?: string;
    willingToTransportForOthers?: boolean;
  };
  hasCattle: boolean;
  cattleTotalCount?: number;
  cattleList?: CattleRecord[];
}

export interface BuyerRegistrationDetails {
  buyerType: string;
  businessName?: string;
  monthlyProcurementKg?: number;
  preferredCrops?: string[];
}

export interface RegisteredAccount {
  id: string;
  role: UserRole;
  fullName: string;
  phone: string;
  email?: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  pincode: string;
  password?: string;
  farmerDetails?: FarmerRegistrationDetails;
  buyerDetails?: BuyerRegistrationDetails;
  createdAt: string;
  verified: boolean;
}

export type FarmerTab =
  | "overview"
  | "weather"
  | "trends"
  | "compare"
  | "lots"
  | "matching"
  | "logistics"
  | "storage"
  | "finance"
  | "calamity"
  | "cattle"
  | "mandi";

export type BuyerTab =
  | "marketplace"
  | "nearby"
  | "compare"
  | "finance"
  | "ratings";

