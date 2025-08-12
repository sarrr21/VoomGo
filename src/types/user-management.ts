export interface ApprovalRequest {
    id: string
    name: string
    avatar: string
    timestamp: string
    category: "XL Van" | "Boda Boda" | "Economy" | "Delivery"
  }
  
  export interface ContactDetails {
    id: string
    name: string
    avatar: string
    category: string
    timestamp: string
    phoneNumber: string
    emailAddress: string
    address: string
    city: string
    country: string
  }
  
  export interface DocumentFile {
    name: string
    type: "pdf" | "zip"
    size: string
    date: string
    approved: boolean
    declined: boolean
  }
  
  export interface DocumentSection {
    title: string
    files: DocumentFile[]
  }
  
  export interface UserManagementData {
    approvalRequests: ApprovalRequest[]
    selectedUser: ContactDetails | null
    documents: DocumentSection[]
  }
  
  export interface UserManagementActions {
    onApprove: (userId: string) => void
    onDecline: (userId: string) => void
    onDelete: (userId: string) => void
    onSelectUser: (userId: string) => void
    onDocumentAction: (documentName: string, action: "approve" | "decline") => void
  }
  