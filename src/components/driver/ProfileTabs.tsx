import { useState } from "react";
import { Button } from "../../ui/Button";
import { PROFILE_TABS } from "../../constants";
import type { ProfileTab, Review, TripHistory } from "../../types/driver";
import Export from "../../assets/icons/export.svg";
import Calander from "../../assets/icons/calander.svg";
import Star from "../../assets/icons/star.svg"
import Avator2 from "../../assets/icons/avator2.svg"

interface ProfileTabsProps {
  reviews: Review[];
  tripHistory: TripHistory[];
}

export function ProfileTabs({ reviews, tripHistory }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Trip History");

  const renderStarsComponent = () => {
    return (
      <span className="flex items-center text-sm">
        <span className=""><img src={Star} alt="star" className="w-4 h-4" /></span>

      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex border justify-between border-gray-200">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-24 py-2  text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#D9EDFF] text-blue-600 m-3 rounded-lg"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Rating & Feedback" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Reviews / Feedback</h3>
                <p className="text-sm text-gray-600">
                  View all your clients information.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={Avator2}
                      alt={review.customerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {review.customerName}
                        </h4>
                        <div className="flex items-center gap-1">
                          {renderStarsComponent()}
                          <span className="text-sm text-gray-600 ml-1">
                            {review.rating}
                          </span>
                        </div>
                        {review.isNew && (
                          <span className="bg-[#D0FBE9] text-[#16643B] text-xs px-2 py-1 rounded-md">
                            new
                          </span>
                        )}
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {review.problemType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {review.comment}
                      </p>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Trip History" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Complete Trip History</h3>
                <p className="text-sm text-gray-600">
                  View all your clients information.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm text-gray-600"
                >
                  <span>
                    <img src={Calander} alt="calander" className="w-6 h-6" />
                  </span>{" "}
                  Aug 04 - Aug 11 2023
                </Button>
                <Button variant="outline" size="sm">
                  <span>
                    <img src={Export} alt="export" className="w-6 h-6" />
                  </span>{" "}
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Rider ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Pickup
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Destination
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tripHistory.map((trip, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{trip.id}</td>
                      <td className="py-4 px-4 text-gray-900">
                        {trip.riderId}
                      </td>
                      <td className="py-4 px-4 text-gray-900">{trip.pickup}</td>
                      <td className="py-4 px-4 text-gray-900">
                        {trip.destination}
                      </td>
                      <td className="py-4 px-4 text-gray-900">{trip.date}</td>
                      <td className="py-4 px-4 text-gray-900">{trip.time}</td>
                      <td className="py-4 px-4 text-gray-900">{trip.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">Page 2 of 16</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  ←
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-600 text-white"
                >
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <span className="text-gray-400">...</span>
                <Button variant="outline" size="sm">
                  16
                </Button>
                <Button variant="outline" size="sm">
                  →
                </Button>
              </div>
              <div className="text-sm text-gray-600">7 / page</div>
            </div>
          </div>
        )}

        {activeTab === "Withdrawal" && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Withdrawal history will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
