import type { DriverProfile } from "../../types/driver";
import Box from "../../assets/icons/box.svg"
import Vector from "../../assets/icons/Vector.svg"
import Frame from "../../assets/icons/frame.svg"
import Vector1 from "../../assets/icons/Vector (1).svg"
import Element from "../../assets/icons/elements.svg"
import Invoice from "../../assets/icons/invoice.svg"
import Star from "../../assets/icons/star.svg"
interface ProfileStatsProps {
  profile: DriverProfile;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg mb-2">
    <h1 className="font-medium text-xl mb-2">Esmail Abdulkadir</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8   ">
      
    <div className="bg-blue-600 text-white p-3 rounded-lg">
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white p-3 rounded-xl flex items-center justify-center">
        <img src={Box} alt="box" className="w-4 h-4" />
      </div>
      <span className="text-2xl font-medium">Total Tips</span>
    </div>

    
      <img
      src={Vector} alt="verctor" className="w-4 h-4"
      >
        
      </img>
   
  </div>

  <div className="flex gap-2">
    <div className="text-3xl font-bold">
      291
    </div>
    <div className="text-sm opacity-75 mt-2">+12%</div>
  </div>
</div>


<div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
            <img src={Frame} alt="frame" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Total Earning</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        <div className="flex gap-2">
        <div className="text-2xl font-bold text-[#0E121B]">
         
        </div>
        <div className="text-2xl text-[#0E121B]">Birr 120, 230</div>
        </div>

      </div>


      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
        <img src={Element} alt="element" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Total Withdrawal</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        <div className="flex gap-2">
        <div className="text-2xl font-bold text-[#0E121B]">
         
        </div>
        <div className="text-2xl text-[#0E121B]">Birr 30, 400</div>
        </div>

      </div>

      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex justify-between items-center  mb-2">
          <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
        <img src={Invoice} alt="invoice" className="w-4 h-4" />
            </div>
        
          <span className="text-sm text-[#0E121B] font-medium">Avrage Rating</span>
          
        </div>
        <img
      src={Vector1} alt="verctor1" className="w-4 h-4"
     />
        </div>
        <div className="flex gap-2">
        <div className="text-2xl font-bold text-[#0E121B]">
         
        </div>
        <div className="text-2xl text-[#0E121B] flex gap-2">4.5 <span className="mt-2"><img src={Star} alt="star" className=" w-4 h-4"/></span></div>
        </div>

      </div>
    </div>
    </div>
  );
}
