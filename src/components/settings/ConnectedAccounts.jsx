import React, { useState } from 'react';
import Button from '../common/Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../common/ToastSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const ConnectedAccounts = ({ accountsData = [] }) => {
  const toast = useToast();
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [accountToToggle, setAccountToToggle] = useState(null);
  
  // Default connected accounts if none provided
  const defaultAccounts = [
    {
      id: 'google',
      name: 'Google',
      isConnected: true,
      className: 'bg-blue-600',
      icon: faGoogle
    },
    {
      id: 'apple',
      name: 'Apple',
      isConnected: false,
      className: 'bg-gray-900',
      icon: faApple
    },
    {
      id: 'facebook',
      name: 'Facebook',
      isConnected: false,
      className: 'bg-blue-800',
      icon: faFacebookF
    }
  ];
  
  // Merge provided accounts with defaults
  const initialAccounts = accountsData.length > 0 ? accountsData : defaultAccounts;
  
  const [accounts, setAccounts] = useState(initialAccounts);
  
  const initiateToggleConnection = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    setAccountToToggle(account);
    
    if (account.isConnected) {
      // Show confirmation dialog before disconnecting
      setShowDisconnectConfirm(true);
    } else {
      // Connect account directly (in a real app, this would open OAuth flow)
      handleConnectAccount(account);
    }
  };
  
  const handleConnectAccount = (account) => {
    console.log(`Connecting ${account.name} account`);
    setAccounts(accounts.map(acc => 
      acc.id === account.id ? { ...acc, isConnected: true } : acc
    ));
    toast.success(`Your ${account.name} account has been successfully connected.`);
  };
  
  const confirmDisconnectAccount = () => {
    if (accountToToggle) {
      console.log(`Disconnecting ${accountToToggle.name} account`);
      setAccounts(accounts.map(acc => 
        acc.id === accountToToggle.id ? { ...acc, isConnected: false } : acc
      ));
      toast.info(`Your ${accountToToggle.name} account has been disconnected.`);
      setAccountToToggle(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Connected Accounts</h2>
      
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${account.className} p-2 rounded mr-3 w-10 h-10 flex items-center justify-center`}>
                <FontAwesomeIcon icon={account.icon} className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white font-medium">{account.name}</p>
                <p className={`${account.isConnected ? 'text-green-400' : 'text-gray-400'} text-sm`}>
                  {account.isConnected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <Button 
              text={account.isConnected ? "Disconnect" : "Connect"}
              bgColor={account.isConnected ? "transparent" : "#3B82F6"} 
              hoverBgColor={account.isConnected ? "transparent" : "#2563EB"}
              className={account.isConnected ? "text-red-400 hover:text-red-300" : "text-white"}
              width="w-auto"
              onClick={() => initiateToggleConnection(account.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Confirmation Dialog for disconnecting accounts */}
      <ConfirmDialog
        isOpen={showDisconnectConfirm}
        onClose={() => setShowDisconnectConfirm(false)}
        onConfirm={confirmDisconnectAccount}
        title="Disconnect Account"
        message={
          accountToToggle 
            ? `Are you sure you want to disconnect your ${accountToToggle.name} account? This may limit some functionality that relies on this integration.`
            : "Are you sure you want to disconnect this account?"
        }
        confirmText="Disconnect"
        dangerConfirm={true}
      />
    </div>
  );
};

export default ConnectedAccounts;