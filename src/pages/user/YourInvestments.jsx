import React from "react";
import InvementsDetails from "../../components/userComponents/InvementsDetails";

const investmentData = [
  {
    id: 1,
    fundName: "HDFC Midcap Opportunities Fund",
    type: "Equity",
    subType: "Mid Cap",
    currentValue: 245320,
    investedValue: 210000,
    sipAmount: 10000,
    oneYearReturns: 12.5,
    investmentDate: "15th of every month",
    assetAllocation: {
      largeCap: "30%",
      midCap: "45%",
      smallCap: "25%"
    },
    fundManager: "John Doe",
    expenseRatio: "1.2%",
    investmentStrategy: "Growth oriented mid-cap focused fund with potential for high returns. Invests in companies with market capitalization between $2-10 billion."
  },
  {
    id: 2,
    fundName: "Axis Bluechip Fund",
    type: "Equity",
    subType: "Large Cap",
    currentValue: 187450,
    investedValue: 165000,
    sipAmount: 7500,
    oneYearReturns: 8.7,
    investmentDate: "10th of every month",
    assetAllocation: {
      largeCap: "75%",
      midCap: "20%",
      smallCap: "5%"
    },
    fundManager: "Jane Smith",
    expenseRatio: "1.0%",
    investmentStrategy: "Stable growth through blue-chip stocks. Invests in established, financially sound companies with strong market presence."
  },
  {
    id: 3,
    fundName: "ICICI Prudential Balanced Advantage",
    type: "Hybrid",
    subType: "Midcap",
    currentValue: 245320,
    investedValue: 210000,
    sipAmount: 10000,
    oneYearReturns: 10.2,
    investmentDate: "5th of every month",
    assetAllocation: {
      equity: "60%",
      debt: "35%",
      cash: "5%"
    },
    fundManager: "Robert Johnson",
    expenseRatio: "1.5%",
    investmentStrategy: "Balanced portfolio with dynamic asset allocation for optimal risk-adjusted returns in varying market conditions."
  },
  {
    id: 4,
    fundName: "Nippon India Gilt Securities Fund",
    type: "Debt",
    subType: "Government Bonds",
    currentValue: 120500,
    investedValue: 100000,
    sipAmount: 5000,
    oneYearReturns: 6.3,
    investmentDate: "20th of every month",
    assetAllocation: {
      govtBonds: "85%",
      treasuryBills: "10%",
      cash: "5%"
    },
    fundManager: "Amy Garcia",
    expenseRatio: "0.8%",
    investmentStrategy: "Low-risk portfolio exclusively investing in government securities for stable returns and capital preservation."
  },
];

const tabOptions = ["All", "Equity", "Debt", "Hybrid"];

const YourInvestments = () => {
  return (
    <>
	  <InvementsDetails investmentData={investmentData} tabOptions={tabOptions} />
	</>
  );
};

export default YourInvestments;
