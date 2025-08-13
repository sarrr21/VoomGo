import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";
import type { ApprovalRequest } from "../../types/dashboard";
import ProfileImage from "../../assets/image/profileimage.svg";
import Avator1 from "../../assets/icons/Vector (1).svg"
import Arrow from "../../assets/icons/arrow.svg"

interface ApprovalRequestsProps {
  requests: ApprovalRequest[];
}

export function ApprovalRequests({ requests }: ApprovalRequestsProps) {
  return (
    <div>
      <h2 className="text-2xl  text-[#0E121B] font-medium ">Approval Requests</h2>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-normal text-[#525866] mt-3">
        Manage your marketplace location and other informations.
      </p>
      
        <Link to="/approval-requests">
          <Button variant="ghost" size="sm" className="bg-gray-100 p-2 ">
             <img src={Arrow} alt="arrow" className="w-4 h-4" />
            </Button>
        </Link>
      
      </div>
      {requests.length === 0 ? (
        <div className="p-4  border-gray-200 rounded-lg text-sm text-gray-500 flex items-center justify-center text-center py-12">
          There is no pending document.
        </div>
      ) : (
        <div className="space-y-2">
          {requests.map((request) => (
            <Link
              key={request.id}
              to={`/approval-requests/${request.id}`}
              className="block"
            >
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <img
                  src={ProfileImage}
                  alt={request.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {request.name}
                  </div>
                  <div className="text-xs text-gray-500">{request.date}</div>
                </div>
                <div className="flex gap-2">
                  <div className="text-xs text-gray-600">{request.type}</div>
                  <img src={Avator1} alt="avator1" className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
