import React from 'react';
import PortfolioSummary from '../components/PortfolioSummary';	
import FinancialHealthScore from '../components/FinancialHealthScore';
const portfolioData = [
    {
      title: 'Total Value',
      value: '₹8,45,230',
      change: '+12.4%',
      isPositive: true
    },
	{
		title: 'Monthly SIP',
		value: '₹30,500',
		info: 'Next: Apr 28',
		showCalendar: true
	},
    {
      title: 'Monthly Saved',
      value: '₹42,500',
      change: '+8.3%',
      isPositive: true
    },
    {
      title: 'Monthly Spend',
      value: '₹37,250',
      change: '+8.3%',
      isPositive: false
    }
  ];

  const userData = {
	monthlyIncome: 80000,
	monthlySaved: 30000,
	monthlyDebtPayment: 24000,
	totalDebt: 1200000,
	
	assetClassesOwned: [
	  { type: 'mutualFunds', value: 500000 },
	  { type: 'gold', value: 200000 },
	  { type: 'stocks', value: 300000 },
	  { type: 'realEstate', value: 2000000 },
	  { type: 'fixedDeposits', value: 150000 },
	],
	
	liabilities: [
	  { type: 'homeLoan', amount: 900000, interest: 7.5 },
	  { type: 'carLoan', amount: 300000, interest: 9.0 },
	],
  };

const PortfolioOverview = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="space-y-6 md:space-y-8">
        <PortfolioSummary portfolioData={portfolioData}/>
        <FinancialHealthScore data={userData}/>
      </div>
    </div>
  );
};

export default PortfolioOverview;
