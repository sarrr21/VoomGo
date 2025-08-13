import type { AdminUser } from "../types/user";
import type { Driver } from "../types/dashboard";
import type { PendingDriver } from "../types/driver-verify";
import type { ApprovalRequest as UMApprovalRequest, ContactDetails, DocumentSection, DocumentFile } from "../types/user-management";
import type { DriverProfile } from "../types/driver";
import type { UserDetailResponse } from "../services/users.service";

export function mapAdminUserToDriver(user: AdminUser): Driver {
  const vehicleModel = user.vehicleDetails?.vehicleModel?.toString().trim();
  const vehicleColor = user.vehicleDetails?.vehicleColor?.toString().trim();
  const carType = vehicleModel || vehicleColor || "";

  const status = user.status === "active" ? "Available" : "Suspended";
  return {
    id: user._id,
    name: user.fullName,
    email: user.email || "",
    phone: user.mobileNumber || "",
    carType,
    dateCreated: new Date(user.createdAt).toLocaleDateString(),
    status,
    avatar: "/placeholder.svg",
  };
}

export function mapPendingDriverToApprovalCard(d: PendingDriver) {
  return {
    id: d._id,
    name: d.fullName,
    date: new Date(d.createdAt).toLocaleDateString(),
    type: d.driverProfile?.vehicleDetails?.vehicleModel || "Driver",
    avatar: "/placeholder.svg",
  } as const;
}

export function mapPendingDriverToUMApprovalRequest(d: PendingDriver): UMApprovalRequest {
  const category = (d.driverProfile?.vehicleDetails?.vehicleModel || "Delivery") as UMApprovalRequest["category"];
  return {
    id: d._id,
    name: d.fullName,
    avatar: d.profilePicture || "/placeholder.svg",
    timestamp: new Date(d.createdAt).toLocaleString(),
    category,
  };
}

export function mapPendingDriverToContactDetails(d: PendingDriver): ContactDetails {
  return {
    id: d._id,
    name: d.fullName,
    avatar: d.profilePicture || "/placeholder.svg",
    category: d.driverProfile?.vehicleDetails?.vehicleModel || "Driver",
    timestamp: new Date(d.createdAt).toLocaleString(),
    phoneNumber: d.phone || "",
    emailAddress: d.email || "",
    address: "",
    city: "",
    country: "",
  };
}

function inferFileTypeFromUrl(url: string): DocumentFile["type"] {
  const lower = url.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (lower.endsWith(".zip")) return "zip";
  return "pdf";
}

export function mapPendingDriverToDocumentSections(d: PendingDriver): { sections: DocumentSection[]; nameToId: Record<string, string> } {
  const nameToId: Record<string, string> = {};
  const group: Record<string, DocumentFile[]> = {
    "Passport/National ID": [],
    "Driving License": [],
    "Vehicle Information": [],
  };

  for (const doc of d.driverProfile.onboardingDocuments) {
    const displayName = (() => {
      switch (doc.type) {
        case "idCard":
          return `ID Card (${doc.documentType || "id"})`;
        case "driverLicenseFront":
          return "Driving License (Front)";
        case "driverLicenseBack":
          return "Driving License (Back)";
        case "vehicleRegistration":
          return "Vehicle Registration";
        case "vehicleInsurance":
          return "Vehicle Insurance";
        case "inspectionCertificate":
          return "Inspection Certificate";
        case "profilePhoto":
          return "Profile Photo";
        default:
          return doc.type;
      }
    })();

    nameToId[displayName] = doc._id;
    const file: DocumentFile = {
      name: displayName,
      type: inferFileTypeFromUrl(doc.url),
      size: "",
      date: doc.verifiedAt ? new Date(doc.verifiedAt).toLocaleDateString() : "",
      approved: doc.verificationStatus === "approved",
      declined: doc.verificationStatus === "rejected",
    };

    if (doc.type === "idCard") group["Passport/National ID"].push(file);
    else if (doc.type.startsWith("driverLicense")) group["Driving License"].push(file);
    else group["Vehicle Information"].push(file);
  }

  const sections: DocumentSection[] = Object.entries(group).map(([title, files]) => ({ title, files }));
  return { sections, nameToId };
}

export function mapAdminUserToDriverProfile(resp: UserDetailResponse): DriverProfile {
  const u = resp.data.user;
  const v = resp.data.roleSpecificData?.driverProfile?.vehicleDetails as {
    vehicleModel?: string;
    vehicleColor?: string;
    PlateNumber?: string;
    licenseNumber?: string;
    ManfacturedYear?: number;
  } | undefined;
  const rating = resp.data.roleSpecificData?.driverProfile?.overallRating ?? resp.data.stats?.avgRating ?? 0;
  const totalEarnings = resp.data.roleSpecificData?.earnings?.totalEarnings ?? 0;
  return {
    id: u._id,
    name: u.fullName,
    email: u.email || "",
    phone: u.mobileNumber || "",
    userType: u.role || "Driver",
    country: u.country || "",
    totalTrips: resp.data.stats?.totalTrips ?? 0,
    totalEarning: totalEarnings,
    totalWithdrawal: 0,
    averageRating: rating,
    vehicleDetails: {
      licensePlate: v?.PlateNumber || "",
      vehicleType: v?.vehicleModel || "",
      vehicleColor: v?.vehicleColor || "",
      yearManufactured: v?.ManfacturedYear || 0,
    },
  };
}


