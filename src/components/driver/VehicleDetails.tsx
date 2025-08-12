import type { VehicleDetails } from "../../types/driver";
import Car from "../../assets/image/car.svg"

interface VehicleDetailsProps {
  vehicleDetails: VehicleDetails;
}

export function VehicleDetailsCard({ vehicleDetails }: VehicleDetailsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
      <h3 className="text-lg font-medium mb-4">Vehicle Detail</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-24">
            <label className="text-sm text-gray-600">
              License Plate Number
            </label>
            <div className="font-medium">{vehicleDetails.licensePlate}</div>
          </div>
          <div className="flex gap-40">
            <label className="text-sm text-gray-600">Vehicle Type</label>
            <div className="font-medium">{vehicleDetails.vehicleType}</div>
          </div>
          <div className="flex gap-44">
            <label className="text-sm text-gray-600">Vehicle Color</label>
            <div className="font-medium">{vehicleDetails.vehicleColor}</div>
          </div>
          <div className="flex gap-32">
            <label className="text-sm text-gray-600">
              Year of Manufactured
            </label>
            <div className="font-medium">{vehicleDetails.yearManufactured}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-82 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={Car}
              alt="Vehicle"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
