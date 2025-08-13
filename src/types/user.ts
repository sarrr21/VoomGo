export type AdminUser = {
  _id: string;
  fullName: string;
  email?: string;
  mobileNumber?: string;
  role: string;
  status: string;
  createdAt: string;
  driverStatus?: string | null;
  serviceType?: string[] | null;
  vehicleDetails?: Partial<{
    vehicleModel: string;
    vehicleColor: string;
    PlateNumber: string;
    licenseNumber: string;
    ManfacturedYear: number;
    numberOfSeat: number;
  }>;
  rating?: number;
  stats?: Partial<{
    totalTrips: number;
    completedTrips: number;
    completionRate: number;
    totalEarnings: number;
  }>;
};

export type UsersListResponse = {
  success: boolean;
  data: {
    users: AdminUser[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    filters?: unknown;
  };
};

export type UsersListQuery = Partial<{
  page: number;
  limit: number;
  role: string;
  status: string;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  vehicleColor: string;
  minRating: number;
  maxRating: number;
  minTrips: number;
  maxTrips: number;
  minEarnings: number;
  maxEarnings: number;
  createdDateFrom: string;
  createdDateTo: string;
  documentVerificationStatus: string;
  serviceLevel: string;
  location: string;
  driverStatus: string;
  vehicleModel: string;
  licensePlate: string;
  Online: number;
}>;


