export interface Driver {
  id: string
  name: string
  email: string
  phone: string
  carType: string
  dateCreated: string
  status: "Available" | "Offline" | "Suspended"
  avatar: string
}

export interface ApprovalRequest {
  id: string
  name: string
  date: string
  type: string
  avatar: string
}

export interface DashboardStats {
  totalDrivers: number
  onlineDrivers: number
  tripsInProgress: number
  newSignups: number
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

