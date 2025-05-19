import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';

const FinancialHealthScore = ({ data }) => {
  const [progress, setProgress] = useState(0);
  
  const { 
    monthlyIncome, 
    monthlySaved, 
    monthlyDebtPayment, 
    totalDebt,
    assetClassesOwned,
  } = data;

  // Improved calculations
  const savingsRate = monthlySaved / monthlyIncome;
  
  // Simplified debt calculation using total debt
  const debtToIncomeRatio = monthlyDebtPayment / monthlyIncome;
  const totalDebtToAnnualIncomeRatio = totalDebt / (monthlyIncome * 12);
  
  // Calculate investment diversity based on both count and distribution
  const totalInvestments = assetClassesOwned.reduce((sum, asset) => sum + asset.value, 0);
  const diversityCount = assetClassesOwned.length;
  
  // Calculate percentage for each asset class
  const assetPercentages = assetClassesOwned.map(asset => asset.value / totalInvestments);
  
  // Calculate standard deviation to measure how evenly distributed the assets are
  // Lower standard deviation means more evenly distributed
  const mean = 1 / diversityCount; // Ideal mean for even distribution
  const variance = assetPercentages.reduce((sum, pct) => sum + Math.pow(pct - mean, 2), 0) / diversityCount;
  const stdDev = Math.sqrt(variance);
  
  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const getBarColor = (score) => {
    if (score >= 90) return '#10b981'; // green-500
    if (score >= 70) return '#facc15'; // yellow-400
    if (score >= 50) return '#fb923c'; // orange-400
    return '#ef4444'; // red-500
  };

  // Enhanced scoring
  const savingsScore = 
    savingsRate > 0.3 ? 95 : 
    savingsRate > 0.2 ? 80 : 
    savingsRate > 0.1 ? 60 : 40;
    
  // Simplified debt score
  const debtScore = 
    (debtToIncomeRatio < 0.1 && totalDebtToAnnualIncomeRatio < 1) ? 95 : 
    (debtToIncomeRatio < 0.2 && totalDebtToAnnualIncomeRatio < 2) ? 80 : 
    (debtToIncomeRatio < 0.35 && totalDebtToAnnualIncomeRatio < 3) ? 60 : 40;
    
  // Improved diversity score using standard deviation
  const diversityScore = 
    (diversityCount >= 4 && stdDev < 0.15) ? 95 : 
    (diversityCount >= 3 && stdDev < 0.25) ? 80 : 
    (diversityCount >= 2 && stdDev < 0.35) ? 60 : 40;

  const finalScore = Math.round(
    savingsScore * 0.35 + 
    debtScore * 0.35 + 
    diversityScore * 0.30
  );

  // Animate the progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(finalScore);
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [finalScore]);

  // Define metrics to display
  const metrics = [
    { label: 'Savings Rate', score: savingsScore, description: 'How much of your income you save' },
    { label: 'Debt Management', score: debtScore, description: 'Your debt levels relative to income' },
    { label: 'Investment Diversity', score: diversityScore, description: 'How well diversified your investments are' },
  ];

  return (
    <Card className='mt-6'>
      <div className="bg-[#1f2a40] text-white p-4 sm:p-6 md:p-8 m-2 sm:m-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-12 xl:gap-24">
          <div className="w-48 sm:w-56 md:w-64 h-auto mx-auto md:mx-0 mb-6 md:mb-0 flex flex-col justify-center">
            <div className="w-full">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  rotation: 0, // Start from top
                  strokeLinecap: 'round',
                  textSize: '20px',
                  pathTransitionDuration: 1.5,
                  pathColor: '#6FFFE9',
                  textColor: '#ffffff',
                  trailColor: '#374151',
                })}
              />
            </div>
            <p className="text-center mt-4 text-base sm:text-lg md:text-xl font-medium">{getScoreLabel(progress)}</p>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8">Financial Health Score</h2>
            
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {metrics.map(({ label, score, description }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm sm:text-base md:text-lg mb-2 md:mb-3">
                    <span className="text-gray-300">{label}</span>
                    <span className="text-white font-medium">{getScoreLabel(score)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4 md:h-5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-3 sm:h-4 md:h-5 rounded-full`}
                      style={{ backgroundColor: getBarColor(score) }}
                    ></motion.div>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1 md:mt-2">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialHealthScore;
