import React from "react";
import type { ReviewCardProps } from "../../types/driver";
import Avator2 from "../../assets/icons/avator2.svg"
import Close2 from "../../assets/icons/close2.svg"

export const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  isNew = false,
  date,
  time,
  message,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-medium">Reviews / Feedback</h2>
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <button className="hover:text-gray-700">&lt;</button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button className="hover:text-gray-700">&gt;</button>
          <img src={Close2} alt="close" className="w-4 h-4" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
        <div className="flex items-start">
          {/* Avatar */}
          <img
            src={Avator2}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover mr-4"
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">{title}</h3>
                {isNew && (
                  <span className="bg-[#D0FBE9] text-[#16643B] text-xs font-semibold px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {date}, At {time}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
