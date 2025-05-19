import React from "react";
import Card from "./common/Card";
import Button from "./common/Button";

const InvestmentCard = ({ 
  fund, 
  onViewDetails, 
  onModifySip 
}) => {
  return (
    <Card 
      key={fund.id} 
      height="h-auto min-h-[24rem]"
      width="w-full max-w-sm"
      padding="p-5 sm:p-6" 
      className="flex flex-col justify-between mx-auto"
    >
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold">{fund.fundName}</h3>
        <p className="text-sm sm:text-base text-[#A3A1A1]">{fund.type} ・ {fund.subType}</p>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Current Value:</span>
            <span className="text-sm sm:text-base">₹{fund.currentValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Invested Value:</span>
            <span className="text-sm sm:text-base">₹{fund.investedValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Monthly SIP:</span>
            <span className="text-sm sm:text-base">₹{fund.sipAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 mb-0">
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-[#A3A1A1]">1Y Returns:</span>
          <span className={`text-sm sm:text-base font-medium ${fund.oneYearReturns > 8 ? 'text-green-400' : fund.oneYearReturns > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
            {fund.oneYearReturns}%
          </span>
        </div>
      </div>

      <div className="bg-[#6FFFE9] mt-auto rounded-b-[15px] sm:rounded-b-[25px] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 px-3 sm:px-5 py-3 flex justify-between items-center">
        <Button 
          text="View Details"
          bgColor="#6FFFE9"
          hoverBgColor="#5aebe9"
          className="text-black text-sm sm:text-base font-medium h-auto py-1 px-2 sm:px-3 w-auto"
          rounded="rounded"
          onClick={() => onViewDetails(fund)}
        />
        <div className="w-4"></div> 
        <Button 
          text="Modify SIP"
          bgColor="black"
          hoverBgColor="rgba(0, 0, 0, 0.8)"
          className="text-white border border-[#6FFFE9] text-sm sm:text-base h-auto py-1 px-2 sm:px-3 w-auto"
          rounded="rounded-full"
          onClick={() => onModifySip(fund)}
        />
      </div>
    </Card>
  );
};

export default InvestmentCard;