import { http } from "./http";
import type { PendingDriversResponse } from "../types/driver-verify";

export async function getPendingDrivers(params: { page?: number; limit?: number; search?: string }) {
  const res = await http.get<PendingDriversResponse>("/admin/drivers/pending", { params });
  return res.data;
}

export async function rejectDriver(driverId: string, reason: string) {
  const res = await http.patch<{ success: boolean; data: unknown }>(`/admin/drivers/${driverId}/reject`, { reason });
  return res.data;
}

export async function verifyDriverDocument(driverId: string, documentId: string, status: "approved" | "rejected") {
  const res = await http.patch<{ success: boolean; data: unknown }>(
    `/admin/drivers/${driverId}/documents/${documentId}/verify`,
    { status },
  );
  return res.data;
}

export async function approveDriver(driverId: string, payload?: { reason?: string; smartMeterId?: string }) {
  const res = await http.patch<{ success: boolean; data: unknown }>(`/admin/drivers/${driverId}/approve`, payload ?? { reason: "Approved" });
  return res.data;
}

export async function getPendingDocuments(params: { page?: number; limit?: number; documentType?: string; search?: string }) {
  const res = await http.get<{ success: boolean; data: unknown }>("/admin/drivers/pending-documents", { params });
  return res.data;
}

export async function exportDrivers(payload: { format: "pdf" | "csv" | "excel" }) {
  const res = await http.post<Blob>("/admin/drivers/export", payload, { responseType: "blob" });
  return res.data;
}

export async function getCommissionRates() {
  const res = await http.get<{ success: boolean; data: unknown }>("/admin/commission-rates");
  return res.data;
}

export async function bulkVerifyDriverDocuments(driverId: string, payload: { documentTypes: string[]; action: "approve" | "reject"; reason?: string }) {
  const res = await http.post<{ success: boolean; data: unknown }>(`/admin/drivers/${driverId}/bulk-verify-documents`, payload);
  return res.data;
}

export async function assignServiceType(driverId: string, payload: { serviceTypeId: string }) {
  const res = await http.post<{ success: boolean; data: unknown }>(`/admin/drivers/${driverId}/assign-service-type`, payload);
  return res.data;
}


