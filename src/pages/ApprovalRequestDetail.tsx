"use client"

import { useState } from "react"
import UserManagement from "../components/user-management"
import type { UserManagementData, UserManagementActions } from "../types/user-management"

// Mock data - replace with actual API calls
const mockData: UserManagementData = {
  approvalRequests: [
    {
      id: "1",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "XL Van",
    },
    {
      id: "2",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Boda Boda",
    },
    {
      id: "3",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Economy",
    },
    {
      id: "4",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "XL Van",
    },
    {
      id: "5",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Boda Boda",
    },
    {
      id: "6",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Economy",
    },
    {
      id: "7",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Delivery",
    },
    {
      id: "8",
      name: "Nesredin Haji",
      avatar: "/abstract-profile.png",
      timestamp: "04/17/23 at 8:25 PM",
      category: "Delivery",
    },
  ],
  selectedUser: {
    id: "1",
    name: "Nesredin Haji",
    avatar: "/abstract-profile.png",
    category: "XL Van",
    timestamp: "04/17/23 at 8:25 PM",
    phoneNumber: "+1 (203) 3458",
    emailAddress: "nesrilbaba@gmail.com",
    address: "312, Imperical Arc, New western corner",
    city: "New York",
    country: "United Stats",
  },
  documents: [
    {
      title: "Passport/National ID",
      files: [
        {
          name: "Front.pdf",
          type: "pdf",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
        {
          name: "Back.zip",
          type: "zip",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
      ],
    },
    {
      title: "Driving License",
      files: [
        {
          name: "Front.pdf",
          type: "pdf",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
        {
          name: "Back.zip",
          type: "zip",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
      ],
    },
    {
      title: "Vehicle Information",
      files: [
        {
          name: "Vehicle Registration.pdf",
          type: "pdf",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
        {
          name: "Vehicle Insurance.pdf",
          type: "pdf",
          size: "2 MB",
          date: "2 Dec 2022",
          approved: true,
          declined: false,
        },
      ],
    },
  ],
}

export default function ApprovalRequestDetail() {
  const [data, setData] = useState<UserManagementData>(mockData)

  const actions: UserManagementActions = {
    onApprove: async (userId: string) => {
      // TODO: Implement API call
      console.log("Approving user:", userId)
      // Example API call:
      // await fetch(`/api/users/${userId}/approve`, { method: 'POST' });
    },

    onDecline: async (userId: string) => {
      // TODO: Implement API call
      console.log("Declining user:", userId)
      // Example API call:
      // await fetch(`/api/users/${userId}/decline`, { method: 'POST' });
    },

    onDelete: async (userId: string) => {
      // TODO: Implement API call
      console.log("Deleting user:", userId)
      // Example API call:
      // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    },

    onSelectUser: (userId: string) => {
      const selectedUser = data.approvalRequests.find((user) => user.id === userId)
      if (selectedUser) {
        // In a real app, you'd fetch full user details from API
        setData((prev) => ({
          ...prev,
          selectedUser: {
            ...selectedUser,
            phoneNumber: "+1 (203) 3458",
            emailAddress: "nesrilbaba@gmail.com",
            address: "312, Imperical Arc, New western corner",
            city: "New York",
            country: "United Stats",
          },
        }))
      }
    },

    onDocumentAction: async (documentName: string, action: "approve" | "decline") => {
      // TODO: Implement API call
      console.log(`${action}ing document:`, documentName)
      // Example API call:
      // await fetch(`/api/documents/${documentName}/${action}`, { method: 'POST' });

      // Update local state
      setData((prev) => ({
        ...prev,
        documents: prev.documents.map((section) => ({
          ...section,
          files: section.files.map((file) =>
            file.name === documentName
              ? {
                  ...file,
                  approved: action === "approve" ? true : file.approved,
                  declined: action === "decline" ? true : file.declined,
                }
              : file,
          ),
        })),
      }))
    },
  }

  return <UserManagement data={data} actions={actions} />
}
