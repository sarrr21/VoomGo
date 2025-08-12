import type { Driver, ApprovalRequest } from "../types/dashboard";
import type { DriverProfile, Review, TripHistory } from "../types/driver";
import type { ApprovalRequestDetail } from "../types/approval";

export const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Esmail Abdulkadir",
    email: "esmail@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sumaya Abdulkadir",
    email: "sumaya@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Salih Abdulkadir",
    email: "salih@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Offline",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Mensur Mohammed",
    email: "mensur@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Beng Coffee (Naxy)",
    email: "beng@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Available",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Beng Coffee (Naxy)",
    email: "beng2@example.com",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/11/23 at 8:25 PM",
    status: "Suspended",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: "1",
    name: "Nesredin Haji",
    date: "04/17/23 at 8:25 PM",
    type: "XL Van",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Nesredin Haji",
    date: "04/17/23 at 8:25 PM",
    type: "Boda Boda",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Nesredin Haji",
    date: "04/17/23 at 8:25 PM",
    type: "Economy",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Nesredin Haji",
    date: "04/17/23 at 8:25 PM",
    type: "Delivery",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export const mockApprovalRequestDetail: ApprovalRequestDetail = {
  id: "1",
  name: "Nesredin Haji",
  phone: "(1 203) 3459",
  email: "nesredin@gmail.com",
  address: "372, Impervious Ave, New western corner",
  city: "New York",
  country: "United States",
  serviceType: "XL Van",
  documents: {
    passport: {
      front: {
        name: "Front.pdf",
        type: "PDF",
        size: "2 MB",
        uploadDate: "2022",
        status: "approved",
      },
      back: {
        name: "Back.zip",
        type: "ZIP",
        size: "2 MB",
        uploadDate: "2022",
        status: "rejected",
      },
    },
    drivingLicense: {
      front: {
        name: "Front.pdf",
        type: "PDF",
        size: "1 MB",
        uploadDate: "2022",
        status: "approved",
      },
      back: {
        name: "Back.zip",
        type: "ZIP",
        size: "1 MB",
        uploadDate: "2022",
        status: "rejected",
      },
    },
    vehicleRegistration: {
      name: "Vehicle Registration.pdf",
      type: "PDF",
      size: "2 MB",
      uploadDate: "2022",
      status: "approved",
    },
    vehicleInsurance: {
      name: "Vehicle Insurance.pdf",
      type: "PDF",
      size: "2 MB",
      uploadDate: "2022",
      status: "rejected",
    },
  },
};

export const mockDriverProfile: DriverProfile = {
  id: "1",
  name: "Esmail Abdulkadir",
  email: "esmail@gmail.com",
  phone: "+251 987654321",
  userType: "Driver",
  country: "Kenya",
  totalTrips: 291,
  totalEarning: 120230,
  totalWithdrawal: 30400,
  averageRating: 4.5,
  vehicleDetails: {
    licensePlate: "03 A32760",
    vehicleType: "Economy",
    vehicleColor: "White",
    yearManufactured: 2021,
  },
};

export const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Abeba Dikla",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sollicitudin velit ut erat egestas. Nisi vulputate dolor dignissim elementum posuere aliquam. Praesent aliquam viverra tristique consequat sit. Diam turpis risus mauris auctor dignissim a elementum massa.",
    date: "Aug 1, 2023, At 09:30",
    isNew: true,
    problemType: "Problem with Arrival",
  },
  {
    id: "2",
    customerName: "Jewhar Muhammed",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sollicitudin velit ut erat egestas. Nisi vulputate dolor dignissim elementum posuere aliquam. Praesent aliquam viverra tristique consequat sit. Diam turpis risus mauris auctor dignissim a elementum massa.",
    date: "Aug 1, 2023, At 09:30",
    isNew: true,
    problemType: "Problem with Arrival",
  },
  {
    id: "3",
    customerName: "Ugulu Bangada",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sollicitudin velit ut erat egestas. Nisi vulputate dolor dignissim elementum posuere aliquam. Praesent aliquam viverra tristique consequat sit. Diam turpis risus mauris auctor dignissim a elementum massa.",
    date: "Aug 1, 2023, At 09:30",
    isNew: true,
    problemType: "Problem with Arrival",
  },
];

export const mockTripHistory: TripHistory[] = [
  {
    id: "#29RASI",
    riderId: "Furi",
    pickup: "Kenteri",
    destination: "12-09-2024",
    date: "12-09-2024",
    time: "At 8:25 PM",
    amount: "Cash/270 birr",
  },
  {
    id: "#29RASI",
    riderId: "Adama",
    pickup: "Addis Aba...",
    destination: "12-09-2024",
    date: "12-09-2024",
    time: "At 8:25 PM",
    amount: "MP/270 birr",
  },
  {
    id: "#29RASI",
    riderId: "Bole",
    pickup: "Mexico",
    destination: "12-09-2024",
    date: "12-09-2024",
    time: "At 8:25 PM",
    amount: "Air/270 birr",
  },
  {
    id: "#29RASI",
    riderId: "Adama",
    pickup: "Addis Aba...",
    destination: "12-09-2024",
    date: "12-09-2024",
    time: "At 8:25 PM",
    amount: "MP/270 birr",
  },
];
