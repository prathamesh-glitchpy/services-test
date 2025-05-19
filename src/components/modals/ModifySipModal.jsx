import React from "react";
import Modal from "./Modal";
import Button from "../common/Button";

const ModifySipModal = ({ 
  isOpen, 
  onClose, 
  fund, 
  sipAmount, 
  setSipAmount, 
  sipDate, 
  setSipDate, 
  onSubmit 
}) => {
  if (!fund) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <h3 className="text-xl font-bold text-white mb-4">Modify SIP for {fund.fundName}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="sipAmount">
            Monthly SIP Amount (₹)
          </label>
          <input
            id="sipAmount"
            type="number"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            min="100"
            step="100"
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="sipDate">
            Investment Date
          </label>
          <select
            id="sipDate"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={sipDate}
            onChange={(e) => setSipDate(e.target.value)}
          >
            <option value="1st of every month">1st of every month</option>
            <option value="5th of every month">5th of every month</option>
            <option value="10th of every month">10th of every month</option>
            <option value="15th of every month">15th of every month</option>
            <option value="20th of every month">20th of every month</option>
            <option value="25th of every month">25th of every month</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            text="Cancel"
            bgColor="#4B5563" 
            hoverBgColor="#374151"
            className="text-white h-auto w-auto px-4"
            onClick={onClose}
          />
          <Button
            text="Save Changes"
            bgColor="#6FFFE9"
            hoverBgColor="#5aebe9"
            className="text-black font-medium h-auto w-auto px-4"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModifySipModal;