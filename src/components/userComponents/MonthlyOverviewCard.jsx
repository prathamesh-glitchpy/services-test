import React from 'react';
import Card from '../common/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MonthlyOverviewCard = ({ data }) => {
  // Calculate percentage of budget spent
  const budgetPercentage = Math.round((data.totalSpent / data.totalBudget) * 100);
  
  // Format number as currency
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  // Custom tooltip for the line chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded border border-gray-700 shadow-lg">
          <p className="text-cyan-300 font-medium">{`Day ${payload[0].payload.day}`}</p>
          <p className="text-green-400">{`Income: ${formatCurrency(payload[0].payload.income)}`}</p>
          <p className="text-red-400">{`Expenses: ${formatCurrency(payload[0].payload.expenses)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="text-white p-1 sm:p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Monthly overview</h2>
          <span className="text-base sm:text-lg font-medium text-gray-100">
            {formatCurrency(data.totalSpent)} of {formatCurrency(data.totalBudget)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress circle showing budget usage */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={budgetPercentage}
              text={`${budgetPercentage}%`}
              styles={buildStyles({
                rotation: 0,
                strokeLinecap: 'round',
                textSize: '16px',
                pathTransitionDuration: 1.5,
                pathColor: budgetPercentage > 90 ? '#ef4444' : budgetPercentage > 75 ? '#f59e0b' : '#6FFFE9',
                textColor: '#ffffff',
                trailColor: '#374151',
              })}
            />
          </div>
          <p className="mt-4 text-center text-sm sm:text-base">
            {budgetPercentage > 90 
              ? 'You have almost reached your budget limit!' 
              : budgetPercentage > 75 
                ? 'You are approaching your budget limit.' 
                : 'You are within your budget.'}
          </p>
        </div>
        
        {/* Enhanced chart showing income vs expenses */}
        <div className="md:col-span-2 h-72 pb-4">
          <p className="text-sm text-gray-300 mb-2">Monthly Financial Flow</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.dailySpending}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#A3A1A1' }} 
                axisLine={{ stroke: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                padding={{ left: 15, right: 15 }}
              />
              <YAxis 
                tick={{ fill: '#A3A1A1' }} 
                axisLine={{ stroke: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-white">{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Income"
                dot={{ fill: '#22c55e', r: 4 }}
                activeDot={{ r: 6, fill: '#16a34a', stroke: '#dcfce7', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Expenses"
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6, fill: '#dc2626', stroke: '#fee2e2', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyOverviewCard;