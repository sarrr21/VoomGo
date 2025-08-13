import type { UserManagementData, UserManagementActions } from "../types/user-management"

interface UserManagementProps {
  data: UserManagementData
  actions: UserManagementActions
}

export default function UserManagement({ data, actions }: UserManagementProps) {
  const getFileIcon = (type: string) => {
    if (type === "pdf") {
      return (
        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">PDF</span>
        </div>
      )
    }
    return (
      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
        <span className="text-white text-xs font-bold">ZIP</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Drivers/Driver Approval</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Approval Requests</h2>
              <p className="text-sm text-gray-600">Manage your markets location and other informations.</p>
            </div>

            {data.approvalRequests.length === 0 ? (
              <div className="p-4  border-gray-200 rounded-lg text-sm text-gray-500 flex items-center justify-center text-center py-12">
                There is no pending document.
              </div>
            ) : (
              <div className="space-y-3">
                {data.approvalRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => actions.onSelectUser(request.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {request.avatar ? (
                          <img
                            src={request.avatar || "/placeholder.svg"}
                            alt={request.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium text-sm">{request.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.name}</p>
                        <p className="text-sm text-gray-500">{request.timestamp}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{request.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>


          {data.selectedUser && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    onClick={() => actions.onApprove(data.selectedUser!.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    onClick={() => actions.onDecline(data.selectedUser!.id)}
                  >
                    Decline
                  </button>
                  <button
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => actions.onDelete(data.selectedUser!.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>


              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {data.selectedUser.avatar ? (
                    <img
                      src={data.selectedUser.avatar || "/placeholder.svg"}
                      alt={data.selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium text-lg">{data.selectedUser.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{data.selectedUser.name}</h3>
                  <p className="text-sm text-gray-600">{data.selectedUser.category}</p>
                  <p className="text-sm text-gray-500">{data.selectedUser.timestamp}</p>
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone number</p>
                  <p className="font-medium text-gray-900">{data.selectedUser.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email address</p>
                  <p className="font-medium text-gray-900">{data.selectedUser.emailAddress}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="font-medium text-gray-900">{data.selectedUser.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">City</p>
                  <p className="font-medium text-gray-900">{data.selectedUser.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Country</p>
                  <p className="font-medium text-gray-900">{data.selectedUser.country}</p>
                </div>
              </div>

              
              {data.documents.length === 0 ? (
                <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-sm text-gray-500 flex items-center justify-center text-center py-12">
                  There is no pending document.
                </div>
              ) : (
                <div className="space-y-6">
                  {data.documents.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 mb-3">{section.title}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {section.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center space-x-3 mb-2">
                              {getFileIcon(file.type)}
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {file.size} {file.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                  file.approved ? "bg-green-500" : "bg-gray-200 hover:bg-green-100"
                                }`}
                                onClick={() => actions.onDocumentAction(file.name, "approve")}
                              >
                                <svg
                                  className={`w-3 h-3 ${file.approved ? "text-white" : "text-gray-400"}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                  file.declined ? "bg-red-500" : "bg-gray-200 hover:bg-red-100"
                                }`}
                                onClick={() => actions.onDocumentAction(file.name, "decline")}
                              >
                                <svg
                                  className={`w-3 h-3 ${file.declined ? "text-white" : "text-gray-400"}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
