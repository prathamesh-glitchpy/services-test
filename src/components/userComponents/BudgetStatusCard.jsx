import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import AdjustBudgetModal from '../modals/AdjustBudgetModal';
import { motion } from 'framer-motion';

const BudgetStatusCard = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetCategories, setBudgetCategories] = useState(categories || []);

  // Format number as currency
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  const handleSaveBudgets = (updatedCategories) => {
    setBudgetCategories(updatedCategories);
    // Here you would typically call an API or dispatch an action to save changes
    console.log('Updated budget categories:', updatedCategories);
  };

  // Get the appropriate color for budget progress based on percentage
  const getBudgetColor = (percentage) => {
    if (percentage > 100) return 'bg-red-400';
    if (percentage > 85) return 'bg-gradient-to-r from-yellow-400 to-red-400';
    if (percentage > 70) return 'bg-yellow-400';
    if (percentage > 50) return 'bg-gradient-to-r from-green-400 to-yellow-400';
    return 'bg-green-400';
  };

  // Create pulse animation variants for Framer Motion
  const pulseVariants = {
    initial: {
      opacity: 0.9,
      width: 0
    },
    animate: (percentage) => ({
      opacity: [0.9, 1, 0.9],
      width: `${percentage > 100 ? 100 : percentage}%`,
      transition: {
        opacity: {
          repeat: Infinity,
          duration: 2,
        },
        width: {
          type: "spring",
          duration: 1.5,
          bounce: 0.1
        }
      }
    })
  };

  return (
    <>
      <Card className="text-white p-4 h-full flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Budget Status</h2>
        
        <div className="flex-1 space-y-4">
          {budgetCategories.map((category, index) => {
            const percentage = Math.round((category.amount / category.budget) * 100);
            const isOverBudget = percentage > 100;
            const budgetColor = getBudgetColor(percentage);
            
            return (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <div className="text-right">
                    <span className={isOverBudget ? 'text-red-400' : ''}>
                      {formatCurrency(category.amount)}/{formatCurrency(category.budget)}
                    </span>
                    <span className={`ml-2 ${isOverBudget ? 'text-red-400' : 'text-cyan-300'}`}>
                      ({percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full mt-1 overflow-hidden relative">
                  <motion.div 
                    className={`h-2 ${budgetColor} rounded-full`}
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    custom={percentage}
                    transition={{
                      delay: index * 0.2 // Stagger the animations
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6">
          <Button 
            text="Adjust Budget"
            bgColor="#6FFFE9"
            hoverBgColor="#5aebe9"
            className="text-black font-semibold"
            rounded="rounded-full"
            width="w-full"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </Card>

      <AdjustBudgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={budgetCategories}
        onSave={handleSaveBudgets}
      />
    </>
  );
};

export default BudgetStatusCard;