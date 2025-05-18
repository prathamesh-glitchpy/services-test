import React from "react";
import Modal from "./Modal";

const FundDetailsModal = ({ isOpen, onClose, fund }) => {
  if (!fund) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <h3 className="text-2xl font-bold text-white mb-4">{fund.fundName}</h3>
      <p className="text-[#A3A1A1] mb-6">{fund.type} • {fund.subType}</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#A3A1A1]">Current Value</p>
            <p className="text-white text-lg font-medium">₹{fund.currentValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#A3A1A1]">Invested Value</p>
            <p className="text-white text-lg font-medium">₹{fund.investedValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#A3A1A1]">Monthly SIP</p>
            <p className="text-white text-lg font-medium">₹{fund.sipAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#A3A1A1]">1Y Returns</p>
            <p className={`text-lg font-medium ${fund.oneYearReturns > 8 ? 'text-green-400' : fund.oneYearReturns > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
              {fund.oneYearReturns}%
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Fund Manager</p>
          <p className="text-white">{fund.fundManager}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Expense Ratio</p>
          <p className="text-white">{fund.expenseRatio}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Asset Allocation</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(fund.assetAllocation).map(([key, value]) => (
              <div key={key} className="bg-gray-800 p-2 rounded">
                <p className="text-[#A3A1A1] text-sm capitalize">{key}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Investment Strategy</p>
          <p className="text-white text-sm">{fund.investmentStrategy}</p>
        </div>
      </div>
    </Modal>
  );
};

export default FundDetailsModal;