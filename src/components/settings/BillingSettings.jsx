import React, { useState } from 'react';
import Button from '../Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../ToastSystem';

const BillingSettings = ({ billingData = {} }) => {
  const toast = useToast();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  // Default billing data if none provided
  const defaultBillingData = {
    subscriptionPlan: 'Premium Plan',
    status: 'Active',
    price: '₹599/month',
    nextBillingDate: 'June 15, 2025',
    activeSips: [
      { id: 1, name: 'HDFC Mid-Cap Opportunities Fund', amount: '₹5,000', nextDate: 'May 25, 2025' },
      { id: 2, name: 'Axis Blue Chip Fund', amount: '₹3,000', nextDate: 'June 2, 2025' },
      { id: 3, name: 'ICICI Prudential Value Discovery Fund', amount: '₹7,500', nextDate: 'May 28, 2025' }
    ],
    billingHistory: [
      { id: 1, date: 'May 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599', type: 'subscription' },
      { id: 2, date: 'May 10, 2025', description: 'Reliance Industries - Buy 10 shares', amount: '₹2,650', type: 'stock' },
      { id: 3, date: 'May 5, 2025', description: 'SBI Small Cap Fund - SIP', amount: '₹2,500', type: 'sip' },
      { id: 4, date: 'May 1, 2025', description: 'Tata Mutual Fund - Dividend', amount: '+₹780', type: 'dividend' },
      { id: 5, date: 'Apr 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599', type: 'subscription' },
      { id: 6, date: 'Apr 5, 2025', description: 'SBI Small Cap Fund - SIP', amount: '₹2,500', type: 'sip' },
      { id: 7, date: 'Apr 2, 2025', description: 'Infosys - Sell 5 shares', amount: '+₹9,750', type: 'stock' },
      { id: 8, date: 'Mar 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599', type: 'subscription' },
      { id: 9, date: 'Mar 5, 2025', description: 'SBI Small Cap Fund - SIP', amount: '₹2,500', type: 'sip' },
      { id: 10, date: 'Mar 2, 2025', description: 'ICICI Bank - Buy 15 shares', amount: '₹12,750', type: 'stock' }
    ]
  };
  
  // Merge provided data with defaults
  const billingInfo = { ...defaultBillingData, ...billingData };
  
  const initiateCancelSubscription = () => {
    setShowCancelConfirm(true);
  };
  
  const confirmCancelSubscription = () => {
    console.log("Cancelling subscription");
    toast.info("Subscription has been cancelled. You will have access until the end of your billing period.");
  };

  // Function to determine row color based on transaction type
  const getRowClass = (type) => {
    switch(type) {
      case 'subscription':
        return 'border-blue-800';
      case 'stock':
        return 'border-purple-800';
      case 'sip':
        return 'border-green-800';
      case 'dividend':
        return 'border-yellow-800';
      default:
        return 'border-gray-700';
    }
  };
  
  // Function to determine text color for amounts
  const getAmountClass = (amount) => {
    return amount.startsWith('+') ? 'text-green-400' : 'text-white';
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Billing & Subscriptions</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-white font-medium">{billingInfo.subscriptionPlan}</h3>
              <p className="text-[#6FFFE9] text-sm">{billingInfo.status}</p>
            </div>
            <div className="text-white font-medium">
              {billingInfo.price}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <p className="text-gray-400 text-sm">Next billing date: {billingInfo.nextBillingDate}</p>
            <Button 
              text="Cancel Subscription"
              bgColor="#EF4444" 
              hoverBgColor="#DC2626"
              className="text-white"
              width="w-auto sm:w-auto"
              height="h-auto"
              onClick={initiateCancelSubscription}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-white mt-6">Active SIPs</h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-gray-700">
                <th className="text-left py-2 px-4 text-gray-300">Fund Name</th>
                <th className="text-right py-2 px-4 text-gray-300">Amount</th>
                <th className="text-right py-2 px-4 text-gray-300">Next SIP Date</th>
              </tr>
            </thead>
            <tbody>
              {billingInfo.activeSips.map((sip) => (
                <tr key={sip.id} className="border-t border-gray-700 bg-gray-800">
                  <td className="py-3 px-4 text-white">{sip.name}</td>
                  <td className="py-3 px-4 text-white text-right">{sip.amount}</td>
                  <td className="py-3 px-4 text-gray-300 text-right">{sip.nextDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <h3 className="text-lg font-medium text-white mt-6">Billing & Transaction History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-gray-700">
                <th className="text-left py-2 px-4 text-gray-300">Date</th>
                <th className="text-left py-2 px-4 text-gray-300">Description</th>
                <th className="text-right py-2 px-4 text-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {billingInfo.billingHistory.map((item) => (
                <tr 
                  key={item.id} 
                  className={`border-t border-l-4 ${getRowClass(item.type)} bg-gray-800`}
                >
                  <td className="py-3 px-4 text-gray-300">{item.date}</td>
                  <td className="py-3 px-4 text-white">{item.description}</td>
                  <td className={`py-3 px-4 ${getAmountClass(item.amount)} text-right`}>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Confirmation Dialog for canceling subscription */}
      <ConfirmDialog
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={confirmCancelSubscription}
        title="Cancel Subscription"
        message={`Are you sure you want to cancel your ${billingInfo.subscriptionPlan}? You will lose access to premium features at the end of your billing period on ${billingInfo.nextBillingDate}.`}
        confirmText="Cancel Subscription"
        dangerConfirm={true}
      />
    </div>
  );
};

export default BillingSettings;