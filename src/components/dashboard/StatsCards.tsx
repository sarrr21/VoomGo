import type { DashboardStats } from "../../types/dashboard";
import WorkAlert from "../../assets/icons/work-alert.svg";
import Element from "../../assets/icons/elements.svg"
import Vector from "../../assets/icons/Vector.svg"
import Vector1 from "../../assets/icons/Vector (1).svg"
interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-600 text-white p-3 rounded-lg">
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white p-3 rounded-xl flex items-center justify-center">
        <img src={WorkAlert} alt="Work Alert" className="w-4 h-4" />
      </div>
      <span className="text-2xl font-medium">Total Drivers</span>
    </div>

    
      <img
      src={Vector} alt="verctor" className="w-4 h-4"
      >
        
      </img>
   
  </div>

  <div className="flex gap-2">
    <div className="text-3xl font-bold">
      {stats.totalDrivers.toLocaleString()}
    </div>
    <div className="text-sm opacity-75 mt-2">+12%</div>
  </div>
</div>


      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
            <img src={Element} alt="element" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Online Drivers</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        <div className="flex gap-2">
        <div className="text-2xl font-bold text-[#0E121B]">
          {stats.onlineDrivers}
        </div>
        <div className="text-2xl text-[#0E121B]">Drivers</div>
        </div>

      </div>

      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
            <img src={Element} alt="element" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Trips in progress</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        
        <div className="text-2xl font-bold text-[#0E121B]">
          {stats.tripsInProgress}
        </div>
        
        

      </div>

      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
            <img src={Element} alt="element" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Today's New Sign-ups</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        <div className="flex gap-2">
        <div className="text-2xl font-bold text-[#0E121B]">
          {stats.newSignups}
        </div>
        <div className="text-sm opacity-75 mt-2">+6%</div>
        </div>
      </div>

      </div>
  );
}
