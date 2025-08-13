import { useQuery, useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { approveDriver, getPendingDrivers, rejectDriver, verifyDriverDocument } from "../services/drivers.service";
import type { PendingDriversResponse } from "../types/driver-verify";

export const pendingDriversKeys = {
  list: (params: { page?: number; limit?: number; search?: string }) => ["drivers", "pending", params] as const,
};

export function usePendingDrivers(params: { page?: number; limit?: number; search?: string }): UseQueryResult<PendingDriversResponse, unknown> {
  return useQuery<PendingDriversResponse, unknown>({
    queryKey: pendingDriversKeys.list(params),
    queryFn: () => getPendingDrivers(params),
  });
}

export function useRejectDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ driverId, reason }: { driverId: string; reason: string }) => rejectDriver(driverId, reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "pending"] }),
  });
}

export function useApproveDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ driverId, reason, smartMeterId }: { driverId: string; reason: string; smartMeterId?: string }) =>
      approveDriver(driverId, { reason, smartMeterId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "pending"] }),
  });
}

export function useVerifyDriverDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ driverId, documentId, status }: { driverId: string; documentId: string; status: "approved" | "rejected" }) =>
      verifyDriverDocument(driverId, documentId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "pending"] }),
  });
}


