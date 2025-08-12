"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfileStats } from "../components/driver/ProfileStats";
import { VehicleDetailsCard } from "../components/driver/VehicleDetails";
import { ProfileTabs } from "../components/driver/ProfileTabs";

import {
  mockDriverProfile,
  mockReviews,
  mockTripHistory,
} from "../data/mockData";
import type {
  DriverProfile as DriverProfileType,
  Review,
  TripHistory,
} from "../types/driver";
import { ReviewCard } from "../components/driver/ReviewCard";
import ProfileSidebar from "../components/driver/ProfileSidebar";

export function DriverProfile() {
  const params = useParams();
  const [driverProfile, setDriverProfile] = useState<DriverProfileType | null>(
    null
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tripHistory, setTripHistory] = useState<TripHistory[]>([]);

  useEffect(() => {
    // In a real app, these would be API calls using params.id
    setDriverProfile(mockDriverProfile);
    setReviews(mockReviews);
    setTripHistory(mockTripHistory);
  }, [params.id]);

  if (!driverProfile) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl text-[#2A2A2A] font-semibold  mb-2">
          User Management
        </h1>
        <p className="text-[#888888] font-normal">Drivers/detail</p>
      </div>

      <ProfileStats profile={driverProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VehicleDetailsCard vehicleDetails={driverProfile.vehicleDetails} />
          <ReviewCard
        avatarUrl="https://via.placeholder.com/150"
        title="Problem with Arriving"
        isNew={true}
        date="Aug 11 2023"
        time="09:30"
        message="Lorem ipsum dolor sit amet consectetur. Sollicitudin varius et erat egestas. Nisl vulputate dolor dignissim elementum posuere aliquam. Praesent aliquam viverra tristique convallis eu. Diam turpis nunc mauris auctor dignissim a elementum massa."
        currentPage={1}
        totalPages={5}
      />
          <ProfileTabs reviews={reviews} tripHistory={tripHistory} />
        </div>

        <ProfileSidebar />
      </div>
    </div>
  );
}
