export interface DriverProfile {
  id: string
  name: string
  email: string
  phone: string
  userType: string
  country: string
  totalTrips: number
  totalEarning: number
  totalWithdrawal: number
  averageRating: number
  vehicleDetails: VehicleDetails
}

export interface VehicleDetails {
  licensePlate: string
  vehicleType: string
  vehicleColor: string
  yearManufactured: number
}
// src/types.ts
export interface Document {
  id: string;
  type: string; // e.g., "National ID", "Driving License"
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userType: string;
  country: string;
  avatarUrl: string;
  documents: Document[];
}

export interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  isNew: boolean
  problemType: string
}

export interface TripHistory {
  id: string
  riderId: string
  pickup: string
  destination: string
  date: string
  time: string
  amount: string
}

export interface ReviewCardProps {
  avatarUrl: string;
  title: string;
  isNew?: boolean;
  date: string;
  time: string;
  message: string;
  currentPage: number;
  totalPages: number;
}


export type ProfileTab = "Trip History" | "Withdrawal" | "Rating & Feedback"
