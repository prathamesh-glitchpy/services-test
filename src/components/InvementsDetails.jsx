import React, { useState, useEffect, useRef } from "react";
import InvestmentCard from "./InvestmentCard";
import FundDetailsModal from "./modals/FundDetailsModal";
import ModifySipModal from "./modals/ModifySipModal";

const InvementsDetails = ({ tabOptions, investmentData }) => {
	const [activeTab, setActiveTab] = useState("All");
	const [selectedFund, setSelectedFund] = useState(null);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [showSipModal, setShowSipModal] = useState(false);
	const [sipAmount, setSipAmount] = useState(0);
	const [sipDate, setSipDate] = useState("");
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
	};
  
	const closeDetailsModal = () => {
	  setShowDetailsModal(false);
	};
  
	const openSipModal = (fund) => {
	  setSelectedFund(fund);
	  setSipAmount(fund.sipAmount);
	  setSipDate(fund.investmentDate);
	  setShowSipModal(true);
	};
  
	const closeSipModal = () => {
	  setShowSipModal(false);
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
			<InvestmentCard
			  key={fund.id}
			  fund={fund}
			  onViewDetails={openDetailsModal}
			  onModifySip={openSipModal}
			/>
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
  
		{/* Using the new modular components */}
		<FundDetailsModal 
		  isOpen={showDetailsModal}
		  onClose={closeDetailsModal}
		  fund={selectedFund}
		/>
  
		<ModifySipModal 
		  isOpen={showSipModal}
		  onClose={closeSipModal}
		  fund={selectedFund}
		  sipAmount={sipAmount}
		  setSipAmount={setSipAmount}
		  sipDate={sipDate}
		  setSipDate={setSipDate}
		  onSubmit={handleSipSubmit}
		/>
	  </div>
	);
}

export default InvementsDetails