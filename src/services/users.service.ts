import { http } from "./http";
import type { UsersListQuery, UsersListResponse } from "../types/user";

export async function getUsers(params: UsersListQuery) {
  const res = await http.get<UsersListResponse>("/admin/users", { params });
  return res.data;
}

export type UserDetailResponse = {
  success: boolean;
  data: {
    user: {
      _id: string;
      fullName: string;
      email?: string;
      mobileNumber?: string;
      role: string;
      status: string;
      createdAt: string;
      country?: string;
    };
    stats: {
      totalTrips: number;
      completedTrips: number;
      totalSpent?: number;
      avgRating?: number;
      lastTrip?: unknown;
    };
    roleSpecificData?: {
      driverProfile?: {
        driverStatus?: string;
        email?: string;
        vehicleDetails?: Partial<{
          vehicleModel: string;
          vehicleColor: string;
          PlateNumber: string;
          licenseNumber: string;
          ManfacturedYear: number;
          numberOfSeat: number;
        }>;
        serviceType?: string[];
        currentLocation?: unknown;
        onlineStatus?: boolean;
        availability?: string;
        overallRating?: number;
        performanceMetrics?: Partial<{
          acceptanceRate: string;
          totalTripsCompleted: number;
          totalTripsRequested: number;
        }>;
      };
      earnings?: Partial<{
        totalEarnings: number;
        totalCommission: number;
        netEarnings: number;
        averageCommissionRate: number;
        currentBalance: number;
      }>;
      withdrawalHistory?: unknown[];
      ratings?: Partial<{ averageRating: number; totalRatings: number; ratingsHistory: unknown[] }>;
      documents?: Array<{
        type: string;
        status: string;
        verifiedAt?: string | null;
        notes?: string | null;
        url: string;
      }>;
      trips?: Partial<{ totalTrips: number; completedTrips: number; recentTrips: unknown[] }>;
      rejectionReason?: string | null;
      reviewedAt?: string | null;
      reviewedBy?: string | null;
      resubmissionInfo?: Partial<{ totalResubmissions: number }>;
    };
  };
};

export async function getUserById(userId: string) {
  const res = await http.get<UserDetailResponse>(`/admin/users/${userId}`);
  return res.data;
}

export async function activateUser(userId: string, reason: string) {
  const res = await http.patch<{ success: boolean; data: unknown }>(
    `/admin/users/${userId}/activate`,
    { reason },
  );
  return res.data;
}

export async function suspendUser(userId: string, payload: { reason: string; duration?: number; suspensionType: "temporary" | "permanent" }) {
  const res = await http.patch<{ success: boolean; data: unknown }>(
    `/admin/users/${userId}/suspend`,
    payload,
  );
  return res.data;
}


