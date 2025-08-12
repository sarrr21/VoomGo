export interface ApprovalRequestDetail {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  serviceType: string
  documents: {
    passport: {
      front: DocumentFile
      back: DocumentFile
    }
    drivingLicense: {
      front: DocumentFile
      back: DocumentFile
    }
    vehicleRegistration: DocumentFile
    vehicleInsurance: DocumentFile
  }
  approvalStatus: "approved" | "rejected" | "pending"
  suspensionData?: SuspensionData
}

export interface DocumentFile {
  name: string
  type: string
  size: string
  uploadDate: string
  status: "approved" | "rejected" | "pending"
}

export type SuspensionType = "temporary" | "permanent"

export interface SuspensionData {
  type: SuspensionType
  reason: string
  duration?: number // days for temporary suspension
  notes?: string
}

export interface SuspensionFormData {
  suspensionType: "temporary" | "permanent"
  days?: number
  reason: string
  suspensionDate?: string
}

export interface SuspensionUser {
  id: string
  name: string
  email: string
  avatar: string
}

export interface SuspensionPopupProps {
  isOpen: boolean
  onClose: () => void
  user: SuspensionUser
  onSubmit: (data: SuspensionFormData) => void
}

