import React from 'react';
import Card from './common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SpendingByCategoryCard = ({ categories }) => {
  // More vibrant colors for the pie chart
  const colorfulPalette = [
    '#FF6384', // Pink
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#7ED321', // Green
    '#F05F8A', // Rose
    '#4A90E2', // Sky blue
    '#50E3C2'  // Mint
  ];

  // Format number as currency
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-white font-medium mb-1">{data.name}</p>
          <p className="text-gray-300">Amount: {formatCurrency(data.amount)}</p>
          <p className="text-gray-300">
            {Math.round((data.amount / categories.reduce((sum, cat) => sum + cat.amount, 0)) * 100)}% of total spending
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend renderer with colorful dots
  const renderColorfulLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-200">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="text-white p-4 h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Spending by Category</h2>
      
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              innerRadius="40%"
              paddingAngle={2}
              labelLine={false}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorfulPalette[index % colorfulPalette.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderColorfulLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SpendingByCategoryCard;