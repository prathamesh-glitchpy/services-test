import React, { useState, useEffect } from 'react';
import MonthlyOverviewCard from '../../components/userComponents/MonthlyOverviewCard';
import SpendingByCategoryCard from '../../components/userComponents/SpendingByCategoryCard';
import BudgetStatusCard from '../../components/userComponents/BudgetStatusCard';
import RecentTransactionsCard from '../../components/userComponents/RecentTransactionsCard';
import MonthSelection from '../../components/userComponents/MonthSelection';

const ExpensesTracking = () => {
  // Get the current month and year formatted as "Month YYYY"
  const getCurrentMonthFormatted = () => {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthFormatted());
  
  // Update the month whenever the component mounts
  useEffect(() => {
    setSelectedMonth(getCurrentMonthFormatted());
  }, []);
  
  // Handler for month changes
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    // In a real app, this would trigger data reload for the selected month
  };

  // Sample expense data - in a real app, this would come from an API
  const monthlyExpenseData = {
    month: selectedMonth,
    totalSpent: 37250,
    totalBudget: 45000,
    categories: [
      { name: 'Housing', amount: 5000, budget: 15000, color: '#FF6384' },
      { name: 'Food', amount: 8500, budget: 10000, color: '#36A2EB' },
      { name: 'Transportation', amount: 4500, budget: 5000, color: '#FFCE56' },
      { name: 'Entertainment', amount: 3250, budget: 3000, color: '#4BC0C0' },
      { name: 'Shopping', amount: 5000, budget: 4000, color: '#9966FF' },
      { name: 'Utilities', amount: 4000, budget: 4000, color: '#FF9F40' }
    ],
    // Daily spending data for the line chart with income and expenses
    dailySpending: [
      { day: '1', income: 2500, expenses: 1200 },
      { day: '5', income: 3000, expenses: 9000 },
      { day: '10', income: 4000, expenses: 1500 },
      { day: '15', income: 85000, expenses: 2200 },
      { day: '20', income: 2500, expenses: 18000 },
      { day: '25', income: 2000, expenses: 1000 },
      { day: '30', income: 1500, expenses: 1300 }
    ]
  };

  // Recent transactions data - removed category field
  const recentTransactionsData = [
    { 
      id: 1, 
      title: 'Salary Credit', 
      date: '15 May 2025', 
      amount: 85000.00, 
      type: 'credit'
    },
    { 
      id: 2, 
      title: 'Rent Payment', 
      date: '12 May 2025', 
      amount: 12000.00, 
      type: 'debit'
    },
    { 
      id: 3, 
      title: 'Groceries - Big Basket', 
      date: '10 May 2025', 
      amount: 3250.75, 
      type: 'debit'
    },
    { 
      id: 4, 
      title: 'Uber Ride', 
      date: '9 May 2025', 
      amount: 450.50, 
      type: 'debit'
    },
    { 
      id: 5, 
      title: 'Amazon Order', 
      date: '8 May 2025', 
      amount: 2199.99, 
      type: 'debit'
    },
    { 
      id: 6, 
      title: 'Dividend Income', 
      date: '5 May 2025', 
      amount: 1500.00, 
      type: 'credit'
    },
    { 
      id: 7, 
      title: 'Electricity Bill', 
      date: '4 May 2025', 
      amount: 2300.00, 
      type: 'debit'
    },
    { 
      id: 8, 
      title: 'Internet Bill', 
      date: '4 May 2025', 
      amount: 1000.00, 
      type: 'debit'
    },
    { 
      id: 9, 
      title: 'Movie - PVR Cinemas', 
      date: '3 May 2025', 
      amount: 750.00, 
      type: 'debit'
    },
    { 
      id: 10, 
      title: 'Restaurant - Taj Hotel', 
      date: '2 May 2025', 
      amount: 2500.00, 
      type: 'debit'
    },
    { 
      id: 11, 
      title: 'Mutual Fund Investment', 
      date: '1 May 2025', 
      amount: 10000.00, 
      type: 'debit'
    },
    { 
      id: 12, 
      title: 'Metro Card Recharge', 
      date: '1 May 2025', 
      amount: 1000.00, 
      type: 'debit'
    },
    { 
      id: 13, 
      title: 'Freelance Payment', 
      date: '30 Apr 2025', 
      amount: 20000.00, 
      type: 'credit'
    },
    { 
      id: 14, 
      title: 'Mobile Bill', 
      date: '29 Apr 2025', 
      amount: 699.00, 
      type: 'debit'
    },
    { 
      id: 15, 
      title: 'Health Insurance', 
      date: '28 Apr 2025', 
      amount: 5000.00, 
      type: 'debit'
    },
    { 
      id: 16, 
      title: 'Gym Membership', 
      date: '27 Apr 2025', 
      amount: 1800.00, 
      type: 'debit'
    },
    { 
      id: 17, 
      title: 'Online Course', 
      date: '25 Apr 2025', 
      amount: 3500.00, 
      type: 'debit'
    },
    { 
      id: 18, 
      title: 'Stock Dividend', 
      date: '23 Apr 2025', 
      amount: 3200.00, 
      type: 'credit'
    },
    { 
      id: 19, 
      title: 'Water Bill', 
      date: '22 Apr 2025', 
      amount: 450.00, 
      type: 'debit'
    },
    { 
      id: 20, 
      title: 'Birthday Gift Purchase', 
      date: '20 Apr 2025', 
      amount: 1500.00, 
      type: 'debit'
    }
  ];

  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">Expenses Tracking</h2>
        <MonthSelection 
          selectedMonth={selectedMonth} 
          onMonthChange={handleMonthChange}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">

          <MonthlyOverviewCard data={monthlyExpenseData} />
        
          <RecentTransactionsCard transactions={recentTransactionsData} />
        </div>
        
        {/* Right column - 1/3 width */}
        <div className="lg:h-full flex flex-col">
          <div className="flex-1 pb-6">
            <SpendingByCategoryCard categories={monthlyExpenseData.categories} />
          </div>
          
          <div className="flex-1">
            <BudgetStatusCard categories={monthlyExpenseData.categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesTracking;