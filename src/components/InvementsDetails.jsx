import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const InvementsDetails = ({ tabOptions, investmentData }) => {
	const [activeTab, setActiveTab] = useState("All");
	const [selectedFund, setSelectedFund] = useState(null);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [showSipModal, setShowSipModal] = useState(false);
	const [sipAmount, setSipAmount] = useState(0);
	const [sipDate, setSipDate] = useState("");
	const [detailsAnimation, setDetailsAnimation] = useState(false);
	const [sipAnimation, setSipAnimation] = useState(false);
	const [highlightPosition, setHighlightPosition] = useState({ left: 0, width: 0 });
	const tabsRef = useRef([]);
  
	// Track tab elements for the animation
	useEffect(() => {
	  if (tabsRef.current.length > 0) {
		const activeTabIndex = tabOptions.indexOf(activeTab);
		if (activeTabIndex >= 0 && tabsRef.current[activeTabIndex]) {
		  const tabElement = tabsRef.current[activeTabIndex];
		  setHighlightPosition({
			left: tabElement.offsetLeft,
			width: tabElement.offsetWidth,
		  });
		}
	  }
	}, [activeTab, tabOptions]);
  
	const filteredInvestments =
	  activeTab === "All"
		? investmentData
		: investmentData.filter((item) => item.type === activeTab);
  
	const openDetailsModal = (fund) => {
	  setSelectedFund(fund);
	  setShowDetailsModal(true);
	  setTimeout(() => setDetailsAnimation(true), 10);
	};
  
	const closeDetailsModal = () => {
	  setDetailsAnimation(false);
	  setTimeout(() => setShowDetailsModal(false), 300);
	};
  
	const openSipModal = (fund) => {
	  setSelectedFund(fund);
	  setSipAmount(fund.sipAmount);
	  setSipDate(fund.investmentDate);
	  setShowSipModal(true);
	  setTimeout(() => setSipAnimation(true), 10);
	};
  
	const closeSipModal = () => {
	  setSipAnimation(false);
	  setTimeout(() => setShowSipModal(false), 300);
	};
  
	const handleSipSubmit = (e) => {
	  e.preventDefault();
	  // In a real app, this would send the updated SIP details to a backend
	  console.log("Updated SIP for", selectedFund.fundName, "Amount:", sipAmount, "Date:", sipDate);
	  closeSipModal();
	};
  
	return (
	  <div className="text-white space-y-6">
		<h2 className="text-2xl md:text-4xl font-semibold">Your Investments</h2>
  
		{/* Tabs */}
		<div className="flex justify-center md:justify-end">
		  <div className="relative bg-[#666565] rounded-full inline-flex overflow-x-auto max-w-full md:max-w-none scrollbar-hide">
			{tabOptions.map((tab, index) => (
			  <button
				key={tab}
				ref={(el) => (tabsRef.current[index] = el)}
				onClick={() => setActiveTab(tab)}
				className={`px-3 sm:px-4 py-2 rounded-full transition-colors duration-300 z-10 whitespace-nowrap w-auto sm:w-24 text-center ${
				  activeTab === tab ? "text-[#0B132B]" : "text-white"
				}`}
			  >
				{tab}
			  </button>
			))}
			<div
			  className="absolute top-0 bottom-0 bg-[#6FFFE9] rounded-full transition-all duration-300 ease-in-out"
			  style={{ left: highlightPosition.left, width: highlightPosition.width }}
			/>
		  </div>
		</div>
  
		{/* Investment Cards */}
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
		  {filteredInvestments.map((fund) => (
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
				  onClick={() => openDetailsModal(fund)}
				/>
				<div className="w-4"></div> 
				<Button 
				  text="Modify SIP"
				  bgColor="black"
				  hoverBgColor="rgba(0, 0, 0, 0.8)"
				  className="text-white border border-[#6FFFE9] text-sm sm:text-base h-auto py-1 px-2 sm:px-3 w-auto"
				  rounded="rounded-full"
				  onClick={() => openSipModal(fund)}
				/>
			  </div>
			</Card>
		  ))}
		</div>
  
		{/* View All Button */}
		{activeTab !== "All" && (
		  <div className="text-center">
			<button
			  onClick={() => setActiveTab("All")}
			  className="text-cyan-300 underline"
			>
			  View All Investments &gt;&gt;
			</button>
		  </div>
		)}
  
		{/* Fund Details Modal */}
		{showDetailsModal && selectedFund && (
		  <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
			<div className={`bg-gray-900/90 rounded-xl p-6 max-w-lg w-full relative border border-gray-700 shadow-xl transition-all duration-300 ease-in-out ${detailsAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
			  <button 
				className="absolute top-3 right-3 text-gray-400 hover:text-white"
				onClick={closeDetailsModal}
			  >
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			  </button>
			  
			  <h3 className="text-2xl font-bold text-white mb-4">{selectedFund.fundName}</h3>
			  <p className="text-[#A3A1A1] mb-6">{selectedFund.type} • {selectedFund.subType}</p>
			  
			  <div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
				  <div>
					<p className="text-[#A3A1A1]">Current Value</p>
					<p className="text-white text-lg font-medium">₹{selectedFund.currentValue.toLocaleString()}</p>
				  </div>
				  <div>
					<p className="text-[#A3A1A1]">Invested Value</p>
					<p className="text-white text-lg font-medium">₹{selectedFund.investedValue.toLocaleString()}</p>
				  </div>
				  <div>
					<p className="text-[#A3A1A1]">Monthly SIP</p>
					<p className="text-white text-lg font-medium">₹{selectedFund.sipAmount.toLocaleString()}</p>
				  </div>
				  <div>
					<p className="text-[#A3A1A1]">1Y Returns</p>
					<p className={`text-lg font-medium ${selectedFund.oneYearReturns > 8 ? 'text-green-400' : selectedFund.oneYearReturns > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
					  {selectedFund.oneYearReturns}%
					</p>
				  </div>
				</div>
				
				<div className="mt-4">
				  <p className="text-[#A3A1A1] mb-2">Fund Manager</p>
				  <p className="text-white">{selectedFund.fundManager}</p>
				</div>
				
				<div className="mt-4">
				  <p className="text-[#A3A1A1] mb-2">Expense Ratio</p>
				  <p className="text-white">{selectedFund.expenseRatio}</p>
				</div>
				
				<div className="mt-4">
				  <p className="text-[#A3A1A1] mb-2">Asset Allocation</p>
				  <div className="grid grid-cols-3 gap-2">
					{Object.entries(selectedFund.assetAllocation).map(([key, value]) => (
					  <div key={key} className="bg-gray-800 p-2 rounded">
						<p className="text-[#A3A1A1] text-sm capitalize">{key}</p>
						<p className="text-white font-medium">{value}</p>
					  </div>
					))}
				  </div>
				</div>
				
				<div className="mt-4">
				  <p className="text-[#A3A1A1] mb-2">Investment Strategy</p>
				  <p className="text-white text-sm">{selectedFund.investmentStrategy}</p>
				</div>
			  </div>
			</div>
		  </div>
		)}
  
		{/* Modify SIP Modal */}
		{showSipModal && selectedFund && (
		  <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
			<div className={`bg-gray-900/90 rounded-xl p-6 max-w-md w-full relative border border-gray-700 shadow-xl transition-all duration-300 ease-in-out ${sipAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
			  <button 
				className="absolute top-3 right-3 text-gray-400 hover:text-white"
				onClick={closeSipModal}
			  >
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			  </button>
			  
			  <h3 className="text-xl font-bold text-white mb-4">Modify SIP for {selectedFund.fundName}</h3>
			  
			  <form onSubmit={handleSipSubmit} className="space-y-4">
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
					onClick={closeSipModal}
				  />
				  <Button
					text="Save Changes"
					bgColor="#6FFFE9"
					hoverBgColor="#5aebe9"
					className="text-black font-medium h-auto w-auto px-4"
					onClick={handleSipSubmit}
				  />
				</div>
			  </form>
			</div>
		  </div>
		)}
	  </div>
	);
}

export default InvementsDetails