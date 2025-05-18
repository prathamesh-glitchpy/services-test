import React from 'react';
import Goals from '../components/Goals';
import { 
  faHome, faGraduationCap, faUmbrella
} from '@fortawesome/free-solid-svg-icons';

const FinancialGoals = () => {
  // Sample goals data that would typically come from an API
  const goalsData = [
    {
      id: 1,
      title: 'Home Purchase',
      icon: faHome,
      targetAmount: 5000000,
      savedAmount: 1250000,
      targetDate: 'Dec 2027',
      completedPercentage: 25,
      monthsLeft: 32,
      description: 'Planning to purchase a 2BHK apartment in the city suburbs with good connectivity to work.',
      monthlyContribution: 120000,
      suggestedFunds: [
        { name: 'HDFC Balanced Advantage Fund', allocation: '50%' },
        { name: 'ICICI Prudential Equity & Debt Fund', allocation: '30%' },
        { name: 'SBI Short Term Debt Fund', allocation: '20%' }
      ]
    },
    {
      id: 2,
      title: 'Child Education',
      icon: faGraduationCap,
      targetAmount: 3000000,
      savedAmount: 600000,
      targetDate: 'Jun 2030',
      completedPercentage: 20,
      monthsLeft: 68,
      description: 'Saving for my child\'s higher education in a top university.',
      monthlyContribution: 40000,
      suggestedFunds: [
        { name: 'Axis Long Term Equity Fund', allocation: '40%' },
        { name: 'Mirae Asset Emerging Bluechip Fund', allocation: '40%' },
        { name: 'Kotak Bond Fund', allocation: '20%' }
      ]
    },
    {
      id: 3,
      title: 'Retirement',
      icon: faUmbrella,
      targetAmount: 10000000,
      savedAmount: 1500000,
      targetDate: 'Jan 2045',
      completedPercentage: 15,
      monthsLeft: 240,
      description: 'Building a retirement corpus to maintain current lifestyle post-retirement.',
      monthlyContribution: 36000,
      suggestedFunds: [
        { name: 'UTI Nifty Index Fund', allocation: '35%' },
        { name: 'HDFC Mid-Cap Opportunities Fund', allocation: '30%' },
        { name: 'ICICI Prudential Value Discovery Fund', allocation: '35%' }
      ]
    }
  ];
  
  return (
    <Goals initialGoals={goalsData} />
  );
};

export default FinancialGoals;