import React, { useState } from 'react';
import Button from '../common/Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../common/ToastSystem';

const SecuritySettings = ({ securityData = {} }) => {
  const toast = useToast();
  const defaultSecurityData = {
    isTwoFactorEnabled: false
  };
  
  // Merge provided data with defaults
  const initialData = { ...defaultSecurityData, ...securityData };
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(initialData.isTwoFactorEnabled);
  const [showTwoFactorConfirm, setShowTwoFactorConfirm] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    
    console.log("Password update submitted:", passwords);
    
    // Show success message
    toast.success("Password updated successfully!");
    
    // Reset form
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleInitiate2FAToggle = () => {
    setShowTwoFactorConfirm(true);
  };

  const handle2FAToggleConfirm = () => {
    const newStatus = !twoFactorEnabled;
    setTwoFactorEnabled(newStatus);
    console.log("2FA status changed to:", newStatus);
    
    // In a real app, this would call an API to enable/disable 2FA
    toast.success(`Two-factor authentication ${newStatus ? 'enabled' : 'disabled'} successfully!`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Security & Login</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Password</h3>
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block text-gray-400 mb-2">Current Password</label>
              <input 
                type="password" 
                name="currentPassword"
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                placeholder="••••••••"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">New Password</label>
              <input 
                type="password" 
                name="newPassword"
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                placeholder="••••••••"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button 
                text="Update Password"
                bgColor="#6FFFE9" 
                hoverBgColor="#5aebe9"
                className="text-black"
                width="w-auto"
                type="submit"
              />
            </div>
          </form>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-lg font-medium text-white mb-3">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded">
            <div>
              <p className="text-white">Enhance your account security with 2FA</p>
              <p className="text-gray-400 text-sm mt-1">
                Currently: 
                <span className={twoFactorEnabled ? "text-green-400" : "text-red-400"}>
                  {twoFactorEnabled ? " Enabled" : " Disabled"}
                </span>
              </p>
            </div>
            <Button 
              text={twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
              bgColor={twoFactorEnabled ? "#4B5563" : "#3B82F6"} 
              hoverBgColor={twoFactorEnabled ? "#374151" : "#2563EB"}
              className="text-white h-auto"
              width="w-auto"
              onClick={handleInitiate2FAToggle}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for 2FA toggle */}
      <ConfirmDialog
        isOpen={showTwoFactorConfirm}
        onClose={() => setShowTwoFactorConfirm(false)}
        onConfirm={handle2FAToggleConfirm}
        title={twoFactorEnabled ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
        message={
          twoFactorEnabled 
            ? "Disabling two-factor authentication will reduce your account security. Are you sure you want to proceed?"
            : "Two-factor authentication adds an extra layer of security to your account. Continue to set it up?"
        }
        confirmText={twoFactorEnabled ? "Disable" : "Enable"}
        dangerConfirm={twoFactorEnabled}
        confirmColor={twoFactorEnabled ? "#EF4444" : "#3B82F6"}
        confirmHoverColor={twoFactorEnabled ? "#DC2626" : "#2563EB"}
      />
    </div>
  );
};

export default SecuritySettings;