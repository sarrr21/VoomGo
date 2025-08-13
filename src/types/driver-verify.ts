export type OnboardingDocument = {
  _id: string;
  type: string;
  url: string;
  verificationStatus: "pending" | "approved" | "rejected";
  documentType?: string;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  notes?: string | null;
};

export type PendingDriver = {
  _id: string;
  fullName: string;
  email?: string;
  phone?: string;
  profilePicture?: string | null;
  createdAt: string;
  driverProfile: {
    vehicleDetails?: Partial<{
      vehicleModel: string;
      vehicleColor: string;
      PlateNumber: string;
      licenseNumber: string;
      ManfacturedYear: number;
      numberOfSeat: number;
    }>;
    onboardingDocuments: OnboardingDocument[];
    driverStatus: "pending" | "approved" | "rejected" | string;
    rejectionReason?: string | null;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
  };
};

export type PendingDriversResponse = {
  success: boolean;
  data: {
    drivers: PendingDriver[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalDrivers: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};


