import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import RecentTransactionsModal from './modals/RecentTransactionsModal';

const RecentTransactionsCard = ({ transactions }) => {
  const [showModal, setShowModal] = useState(false);
  
  // Show only the 6 most recent transactions in the card
  const displayedTransactions = transactions.slice(0, 6);
  
  return (
    <>
      <Card className="text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button 
            text="View All"
            bgColor="#6FFFE9"
            hoverBgColor="#5aebe9"
            className="text-black text-sm font-semibold h-auto py-1 px-4 w-auto"
            rounded="rounded-full"
            onClick={() => setShowModal(true)}
          />
        </div>
        
        <div className="space-y-3">
          {displayedTransactions.map((txn) => (
            <div 
              key={txn.id} 
              className="flex justify-between items-center p-2 border border-gray-500 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <div>
                <p className="font-semibold">{txn.title}</p>
                <p className="text-sm text-gray-300">{txn.date}</p>
              </div>
              <span className={`text-md font-bold ${txn.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Modal for viewing all transactions */}
      <RecentTransactionsModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        transactions={transactions}
      />
    </>
  );
};

export default RecentTransactionsCard;