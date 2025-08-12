"use client"

import { useState } from "react"
import type { SuspensionPopupProps, SuspensionFormData  } from "../../types/approval"
import Info from "../../assets/icons/warn.svg"
import Profile from "../../assets/icons/pic.svg"
import Close from "../../assets/icons/close.svg"

export default function SuspensionPopup({ isOpen, onClose, user, onSubmit }: SuspensionPopupProps) {
  const [suspensionType, setSuspensionType] = useState<"temporary" | "permanent">("temporary")
  const [days, setDays] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [suspensionDate, setSuspensionDate] = useState<string>("")
 

  const handleSubmit = () => {
    const formData: SuspensionFormData = {
      suspensionType,
      reason,
      ...(suspensionType === "temporary" && {
        days: Number.parseInt(days),
        suspensionDate,
      }),
    }
    onSubmit(formData)
  }

  const handleCancel = () => {
    // Reset form
    setSuspensionType("temporary")
    setDays("")
    setReason("")
    setSuspensionDate("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[613px] mx-4">
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-lg font-medium text-[#0E121B] mb-4">Create new Suspension Issue</h2>

          {/* Info Banner */}
          <div className="bg-blue-50  rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Info Icon */}
              <img  src={Info} alt="info" className="w-6 h-6"/>
              <span className="text-[#006EFF] text-sm">You're Sending a suspension for:</span>
              {/* User Avatar */}
              <img src={Profile} alt="profile" className="w-6 h-6" />
              <span className="text-[#006EFF] text-sm font-medium">{user.name}</span>
            </div>
            {/* Close Button */}
            <button onClick={onClose} >
              <img src={Close} alt="close" className="w-4 h-4"/>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 bg-[#F5F7FA] justify-between rounded-xl ">
            <button
              onClick={() => setSuspensionType("temporary")}
              className={`px-4 py-2 text-sm font-medium  ${
                suspensionType === "temporary"
                  ? "text-gray-900 bg-white rounded-xl m-2"
                  : "text-gray-500  hover:text-gray-700"
              }`}
            >
              Temporary Suspension
            </button>
            <button
              onClick={() => setSuspensionType("permanent")}
              className={`px-4 py-2 text-sm font-medium  ml-8 ${
                suspensionType === "permanent"
                  ? "text-gray-900 bg-white rounded-xl m-2"
                  : "text-gray-500  hover:text-gray-700"
              }`}
            >
              Permanent Suspension
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Temporary Suspension Fields */}
            {suspensionType === "temporary" && (
              <div className=" border border-gray-300 rounded-lg p-2">
                <div className="flex items-center gap-2 bg-[#F5F7FA] p-2 w-[250px] rounded-lg">
                  <span className="text-sm text-gray-700">Suspended for</span>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                    placeholder=""
                  />
                  <span className="text-sm text-gray-700">Days</span>
                </div>
                <h2 className="text-[#99A0AE] font-medium text-sm mt-2">Enter Suspention Date</h2>
                
              </div>
            )}

            {/* Reason Text Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What makes you to suspend the user</label>
              <div className="relative">
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the suspension reason here"
                  maxLength={200}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 resize-none"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">{reason.length}/200</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="w-[269px] py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[269px] py-2 text-sm font-medium text-white bg-[#006EFF] rounded-md hover:bg-blue-700"
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  )
}
