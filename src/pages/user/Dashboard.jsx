import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faWallet, faGraduationCap, 
  faBullseye, faMoneyBillWave, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample data from portfolio overview
  const portfolioSummary = {
    totalValue: '₹8,45,230',
    monthlyChange: '+12.4%',
    isPositive: true
  };
  
  // Sample data from investments
  const investmentSummary = {
    funds: [
      {
        id: 1,
        fundName: "HDFC Midcap Opportunities Fund",
        currentValue: 245320,
        oneYearReturns: 12.5
      },
      {
        id: 2,
        fundName: "Axis Bluechip Fund",
        currentValue: 187450,
        oneYearReturns: 8.7
      }
    ]
  };
  
  // Sample data from expenses tracking
  const expensesSummary = {
    totalSpent: 37250,
    totalBudget: 45000,
    topCategories: [
      { name: 'Housing', amount: 12000, budget: 15000 },
      { name: 'Food', amount: 8500, budget: 10000 },
      { name: 'Transportation', amount: 4500, budget: 5000 }
    ]
  };
  
  // Sample data from financial goals
  const goalsSummary = {
    goals: [
      {
        id: 1,
        title: 'Home Purchase',
        targetAmount: 5000000,
        savedAmount: 1250000,
        completedPercentage: 25
      }
    ]
  };
  
  // Sample data from financial education
  const educationSummary = {
    latestContent: {
      title: 'Investment Basics: Getting Started',
      level: 'Beginner'
    }
  };

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl md:text-4xl font-semibold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Overview Card */}
        <Card className="hover:shadow-lg transition duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3 className="text-xl font-semibold">Portfolio Overview</h3>
            </div>
            
            <div className="flex-grow">
              <div className="mb-4">
                <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                <p className="text-3xl font-bold">{portfolioSummary.totalValue}</p>
                <p className={`text-sm ${portfolioSummary.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {portfolioSummary.monthlyChange} this month
                </p>
              </div>
            </div>
            
            <Button 
              text="View Portfolio"
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium mt-4 flex items-center justify-center"
              width="w-full"
              height="h-10"
              onClick={() => navigate('/portfolio-overview')}
              icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
            />
          </div>
        </Card>
        
        {/* Investments Card */}
        <Card className="hover:shadow-lg transition duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <h3 className="text-xl font-semibold">Your Investments</h3>
            </div>
            
            <div className="flex-grow">
              <div className="space-y-3">
                {investmentSummary.funds.map(fund => (
                  <div key={fund.id} className="bg-gray-800 rounded-lg p-3">
                    <p className="font-medium">{fund.fundName}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-sm">Value:</span>
                      <span>₹{fund.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">1Y Returns:</span>
                      <span className={fund.oneYearReturns > 8 ? 'text-green-400' : 'text-yellow-400'}>
                        {fund.oneYearReturns}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              text="Manage Investments"
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium mt-4 flex items-center justify-center"
              width="w-full"
              height="h-10"
              onClick={() => navigate('/your-investments')}
              icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
            />
          </div>
        </Card>
        
        {/* Expenses Tracking Card */}
        <Card className="hover:shadow-lg transition duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>
              <h3 className="text-xl font-semibold">Expenses Tracking</h3>
            </div>
            
            <div className="flex-grow">
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <p className="text-gray-400 text-sm">Monthly Spent</p>
                  <p className="text-sm">{Math.round((expensesSummary.totalSpent / expensesSummary.totalBudget) * 100)}% of budget</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${Math.min((expensesSummary.totalSpent / expensesSummary.totalBudget) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p>₹{expensesSummary.totalSpent.toLocaleString()}</p>
                  <p className="text-gray-400">₹{expensesSummary.totalBudget.toLocaleString()}</p>
                </div>
              </div>
              
              <p className="text-sm font-medium mb-2">Top Spending Categories:</p>
              <div className="space-y-2">
                {expensesSummary.topCategories.map((category, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400 text-sm">{category.name}</span>
                    <span className="text-sm">₹{category.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              text="View Expenses"
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium mt-4 flex items-center justify-center"
              width="w-full"
              height="h-10"
              onClick={() => navigate('/expenses-tracking')}
              icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
            />
          </div>
        </Card>
        
        {/* Financial Goals Card */}
        <Card className="hover:shadow-lg transition duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h3 className="text-xl font-semibold">Financial Goals</h3>
            </div>
            
            <div className="flex-grow">
              {goalsSummary.goals.length > 0 ? (
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="font-medium">{goalsSummary.goals[0].title}</p>
                  <div className="my-2">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-[#6FFFE9] h-2.5 rounded-full" 
                        style={{ width: `${goalsSummary.goals[0].completedPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6FFFE9]">{goalsSummary.goals[0].completedPercentage}% Complete</span>
                    <span>
                      ₹{goalsSummary.goals[0].savedAmount.toLocaleString()} / 
                      ₹{goalsSummary.goals[0].targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">No financial goals set yet.</p>
              )}
              
              <p className="text-sm mt-4">Set and track your financial goals to build your wealth systematically.</p>
            </div>
            
            <Button 
              text="Manage Goals"
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium mt-4 flex items-center justify-center"
              width="w-full"
              height="h-10"
              onClick={() => navigate('/financial-goals')}
              icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
            />
          </div>
        </Card>
        
        {/* Financial Education Card */}
        <Card className="hover:shadow-lg transition duration-300 md:col-span-2">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <h3 className="text-xl font-semibold">Financial Education</h3>
            </div>
            
            <div className="flex-grow mb-4">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-green-500 text-xs rounded-md mr-3">
                  {educationSummary.latestContent.level}
                </div>
                <p className="font-medium">{educationSummary.latestContent.title}</p>
              </div>
              
              <p className="text-sm mt-4">Enhance your financial knowledge with our educational content and make more informed investment decisions.</p>
            </div>
            
            <Button 
              text="Browse Learning Resources"
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium flex items-center justify-center"
              width="w-full"
              height="h-10"
              onClick={() => navigate('/financial-education')}
              icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;