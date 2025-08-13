import { useMemo, useState } from "react"
import UserManagement from "../components/user-management"
import type { UserManagementData, UserManagementActions } from "../types/user-management"
import { useParams } from "react-router-dom"
import { usePendingDrivers, useApproveDriver, useRejectDriver, useVerifyDriverDocument } from "../hooks/usePendingDrivers"
import { mapPendingDriverToContactDetails, mapPendingDriverToDocumentSections, mapPendingDriverToUMApprovalRequest } from "../utils/mappers"

export default function ApprovalRequestDetail() {
  const { id } = useParams();
  const { data: pendingDrivers } = usePendingDrivers({ page: 1, limit: 50 });
  const approveMutation = useApproveDriver();
  const rejectMutation = useRejectDriver();
  const verifyMutation = useVerifyDriverDocument();

  const selected = useMemo(() => {
    const list = pendingDrivers?.data?.drivers || [];
    return list.find((d) => d._id === id) || list[0];
  }, [pendingDrivers, id]);

  const { sections, nameToId } = useMemo(() => {
    if (!selected) return { sections: [], nameToId: {} };
    return mapPendingDriverToDocumentSections(selected);
  }, [selected]);

  const [data, setData] = useState<UserManagementData>({
    approvalRequests: (pendingDrivers?.data?.drivers || []).map(mapPendingDriverToUMApprovalRequest),
    selectedUser: selected ? mapPendingDriverToContactDetails(selected) : null,
    documents: sections,
  })


  
  useMemo(() => {
    const approvals = (pendingDrivers?.data?.drivers || []).map(mapPendingDriverToUMApprovalRequest)
    const sel = selected ? mapPendingDriverToContactDetails(selected) : null
    setData({ approvalRequests: approvals, selectedUser: sel, documents: sections })
  }, [pendingDrivers, selected, sections])

  const actions: UserManagementActions = {
    onApprove: async (userId: string) => {
      await approveMutation.mutateAsync({
        driverId: userId,
        reason: ""
      })
    },

    onDecline: async (userId: string) => {
      await rejectMutation.mutateAsync({ driverId: userId, reason: "Rejected by admin" })
    },

    onDelete: async (userId: string) => {
      console.log("Delete not implemented", userId)
    },

    onSelectUser: (userId: string) => {
      if (!pendingDrivers?.data?.drivers) return
      const d = pendingDrivers.data.drivers.find((x) => x._id === userId)
      if (!d) return
      const mappedContact = mapPendingDriverToContactDetails(d)
      const mappedDocs = mapPendingDriverToDocumentSections(d)
      setData((prev) => ({ ...prev, selectedUser: mappedContact, documents: mappedDocs.sections }))
    },

    onDocumentAction: async (documentName: string, action: "approve" | "decline") => {
      if (!selected) return
      const docId = nameToId[documentName]
      if (!docId) return
      await verifyMutation.mutateAsync({ driverId: selected._id, documentId: docId, status: action === "approve" ? "approved" : "rejected" })
      setData((prev) => ({
        ...prev,
        documents: prev.documents.map((section) => ({
          ...section,
          files: section.files.map((file) =>
            file.name === documentName
              ? {
                  ...file,
                  approved: action === "approve",
                  declined: action === "decline",
                }
              : file,
          ),
        })),
      }))
    },
  }

  return <UserManagement data={data} actions={actions} />
}
