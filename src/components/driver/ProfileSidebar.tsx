import { useEffect, useState } from "react";
import type { UserProfile } from "../../types/driver";
import { useParams } from "react-router-dom";
import { useUserDetail } from "../../hooks/useUserDetail";
import Profile2 from "../../assets/image/profile2.svg"
import { Phone, Eye, ChevronDown, ChevronUp, EllipsisVertical, MessageCircle } from "lucide-react"
import No from "../../assets/icons/no.svg"
import User from "../../assets/icons/user.svg"
import Country from "../../assets/icons/country.svg"
import Doc from "../../assets/icons/doc.svg"
import Id from "../../assets/icons/id.svg"
export default function ProfileSidebar() {
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({});
  const params = useParams();
  const { data } = useUserDetail(params.id || "");

  useEffect(() => {
    if (!data) return;
    const user = data.data.user;
    setProfile({
      id: user._id,
      name: user.fullName,
      email: user.email || "",
      phoneNumber: user.mobileNumber || "",
      userType: user.role,
      country: user.country || "",
      avatarUrl: "",
      documents: (data.data.roleSpecificData?.documents || []).map((d, idx) => ({
        id: String(idx),
        type: d.type,
        imageUrl: d.url,
      })),
    });
  }, [data]);

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col items-center">
      <img
        src={Profile2}
        alt={profile.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />

      <h2 className="text-lg font-semibold">{profile.name}</h2>
      <p className="text-sm text-gray-500">{profile.email}</p>

      <div className="flex gap-3 my-3 ">
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Phone className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </div>

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
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setExpandedDocs((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                  aria-label="Toggle preview"
                >
                  {expandedDocs[doc.id] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <EllipsisVertical className="w-4 h-4 text-gray-500" />
              )}
            </div>
            {doc.imageUrl && expandedDocs[doc.id] && (
              <img
                src={Id}
                alt={doc.type}
                className="mt-2 rounded-lg max-h-56 w-full object-contain bg-white"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
