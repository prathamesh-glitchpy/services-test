import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faShield, faBell, faWallet, 
  faCreditCard, faGlobe, faAngleRight, faMobile
} from '@fortawesome/free-solid-svg-icons';

// Import the individual settings components
import ProfileSettings from '../../components/settings/ProfileSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import PaymentSettings from '../../components/settings/PaymentSettings';
import BillingSettings from '../../components/settings/BillingSettings';
import ConnectedAccounts from '../../components/settings/ConnectedAccounts';
import DevicesSettings from '../../components/settings/DevicesSettings';

// Custom scrollbar styles
const scrollbarStyles = `
  .settings-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .settings-scrollbar::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 10px;
    margin: 6px 0;
  }
  
  .settings-scrollbar::-webkit-scrollbar-thumb {
    background: #5BC0BE;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  
  .settings-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6FFFE9;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;

const AccountSettings = () => {
  // Try to get the active section from localStorage or default to 'profile'
  const savedSection = localStorage.getItem('activeSettingsSection') || 'profile';
  const [activeSection, setActiveSection] = useState(savedSection);
  
  // Sample data for each settings panel
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Financial District, Mumbai, Maharashtra 400001"
  };
  
  const securityData = {
    isTwoFactorEnabled: false
  };
  
  const notificationData = {
    email: {
      accountUpdates: true,
      investmentAlerts: true,
      educationContent: true
    },
    push: {
      sipReminders: true,
      goalUpdates: true,
      marketNews: false
    }
  };
  
  const paymentMethodsData = [
    {
      id: 1,
      type: 'creditCard',
      name: 'HDFC Bank Credit Card',
      details: 'Ending in 4587 • Expires 05/26',
      icon: faCreditCard,
      bgColor: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'bank',
      name: 'SBI NetBanking',
      details: 'Account ending in 8721',
      icon: faWallet,
      bgColor: 'bg-green-500'
    }
  ];
  
  const billingData = {
    subscriptionPlan: 'Premium Plan',
    status: 'Active',
    price: '₹599/month',
    nextBillingDate: 'June 15, 2025',
    billingHistory: [
      { id: 1, date: 'May 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599' },
      { id: 2, date: 'Apr 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599' },
      { id: 3, date: 'Mar 15, 2025', description: 'Premium Plan - Monthly', amount: '₹599' }
    ]
  };
  
  const accountsData = [
    {
      id: 'google',
      name: 'Google',
      isConnected: true,
      className: 'bg-blue-600',
      iconClass: 'fab fa-google'
    },
    {
      id: 'apple',
      name: 'Apple',
      isConnected: false,
      className: 'bg-gray-900',
      iconClass: 'fab fa-apple'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      isConnected: false,
      className: 'bg-blue-800',
      iconClass: 'fab fa-facebook-f'
    }
  ];
  
  const devicesData = [
    {
      id: 1,
      deviceName: 'Windows PC - Chrome',
      location: 'Mumbai, India',
      isCurrentSession: true,
      status: 'Active Now',
      lastActive: null
    },
    {
      id: 2,
      deviceName: 'iPhone 15 - Safari',
      location: 'Mumbai, India',
      isCurrentSession: false,
      status: null,
      lastActive: 'Today, 10:45 AM'
    },
    {
      id: 3,
      deviceName: 'MacBook Pro - Chrome',
      location: 'Pune, India',
      isCurrentSession: false,
      status: null,
      lastActive: 'May 18, 2025, 08:30 PM'
    }
  ];

  // Navigation menu items
  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: faUser },
    { id: 'security', label: 'Security & Login', icon: faShield },
    { id: 'notifications', label: 'Notification Settings', icon: faBell },
    { id: 'payment', label: 'Payment Methods', icon: faWallet },
    { id: 'billing', label: 'Billing & Subscriptions', icon: faCreditCard },
    { id: 'connected', label: 'Connected Accounts', icon: faGlobe },
    { id: 'devices', label: 'Devices & Sessions', icon: faMobile },
  ];
  
  // Save the active section to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('activeSettingsSection', activeSection);
  }, [activeSection]);

  // Set up a listener to handle page reloads while preserving the active section
  useEffect(() => {
    // This will intercept form submissions that would normally reload the page
    const handleBeforeUnload = () => {
      localStorage.setItem('activeSettingsSection', activeSection);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeSection]);

  // Handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Render the content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings userData={userData} />;
      case 'security':
        return <SecuritySettings securityData={securityData} />;
      case 'notifications':
        return <NotificationSettings notificationData={notificationData} />;
      case 'payment':
        return <PaymentSettings paymentMethodsData={paymentMethodsData} />;
      case 'billing':
        return <BillingSettings billingData={billingData} />;
      case 'connected':
        return <ConnectedAccounts accountsData={accountsData} />;
      case 'devices':
        return <DevicesSettings devicesData={devicesData} />;
      default:
        return <ProfileSettings userData={userData} />;
    }
  };

  return (
    <div className="text-white w-full">
      {/* Add custom scrollbar styles */}
      <style>{scrollbarStyles}</style>
      
      <h1 className="text-2xl md:text-4xl font-semibold mb-6">Account Settings</h1>
      
      <Card className="flex flex-col md:flex-row p-0 md:h-[600px]">
        {/* Left Navigation Panel */}
        <div className="md:w-1/4 bg-[#1C2541] rounded-t-[15px] md:rounded-r-none md:rounded-l-[25px] overflow-hidden">
          <nav className="py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full text-left py-3 px-4 flex items-center justify-between
                              transition-colors duration-200 hover:bg-[#3A506B]/50
                              ${activeSection === item.id ? 'bg-[#3A506B] text-white' : 'text-gray-300'}`}
                    onClick={() => handleSectionChange(item.id)}
                  >
                    <span className="flex items-center truncate">
                      <FontAwesomeIcon icon={item.icon} className="mr-3 w-5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} className="opacity-70 flex-shrink-0 ml-2" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Vertical Divider - Hidden on mobile */}
        <div className="hidden md:block w-px bg-gray-700 h-auto"></div>
        
        {/* Right Content Area with Custom Scrollbar */}
        <div className="md:w-3/4 bg-[#0B132B] rounded-b-[15px] md:rounded-l-none md:rounded-r-[25px] md:overflow-hidden">
          <div className="settings-scrollbar md:h-full overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettings;