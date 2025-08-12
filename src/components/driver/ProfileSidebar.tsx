import { useEffect, useState } from "react";
import type { UserProfile } from "../../types/driver";
import Profile2 from "../../assets/image/profile2.svg"
import Call from "../../assets/icons/Call.svg"
import View from "../../assets/icons/view.svg"
import No from "../../assets/icons/no.svg"
import User from "../../assets/icons/user.svg"
import Country from "../../assets/icons/country.svg"
import Doc from "../../assets/icons/doc.svg"
import Id from "../../assets/icons/id.svg"
export default function ProfileSidebar() {
  
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Mock API simulation (data here, not in separate file)
  const fetchUserProfile = async (): Promise<UserProfile> => {
    return {
      id: "1",
      name: "Esmail Abdulkadir",
      email: "esmail11@gmail.com",
      phoneNumber: "(+251) 987654321",
      userType: "Ride",
      country: "Kenya",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      documents: [
        { id: "1", type: "National ID" },
        {
          id: "2",
          type: "Driving License",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Driving_license_example.jpg",
        },
        { id: "3", type: "Vehicle Registration" },
        { id: "4", type: "Vehicle Registration" },
      ],
    };
  };

  useEffect(() => {
    fetchUserProfile().then(setProfile);
  }, []);

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col items-center">
      {/* Avatar */}
      <img
        src={Profile2}
        alt={profile.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />

      {/* Name & Email */}
      <h2 className="text-lg font-semibold">{profile.name}</h2>
      <p className="text-sm text-gray-500">{profile.email}</p>

      {/* Action Buttons */}
      <div className="flex gap-3 my-3 ">
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        <img src={Call} alt="call" className="w-4 h-4"/>
        </button>
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          
        </button>
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <img src={View} alt="view" className="w-4 h-4" />        </button>
      </div>

      {/* Info */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex gap-2">
            <img src={No} alt="no" className="w-4 h-4"/>
          <span>Phone Number</span>
          </div>
          <span>{profile.phoneNumber}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex gap-2">
            <img src={User} alt="user" className="w-4 h-4" />
          <span>User Type</span>
          </div>
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
            {profile.userType}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex gap-2">
            <img src={Country} alt="country" className="w-4 h-4" />
          <span>Country</span>
          </div>
          <span>{profile.country}</span>
        </div>
      </div>

      {/* Documents */}
      <div className="w-full mt-4">
        <h3 className="font-medium text-gray-800 mb-2">Documents</h3>
        {profile.documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-50 rounded-lg p-2 mb-2 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium">
                <img src={Doc} alt="doc" className="w-4 h-4"/> {doc.type}
              </span>
              {doc.imageUrl ? (
                <button className="text-gray-500 hover:text-black">▲</button>
              ) : (
                <button className="text-gray-500 hover:text-black">⋮</button>
              )}
            </div>
            {doc.imageUrl && (
              <img
                src={Id}
                alt={doc.type}
                className="mt-2 rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
