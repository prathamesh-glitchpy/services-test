import React, { useState } from 'react';
import Toggle from '../common/Toggle';
import Button from '../common/Button';
import useToast from '../common/ToastSystem';

const NotificationSettings = ({ notificationData = {} }) => {
  const toast = useToast();
  
  // Default notification settings
  const defaultNotifications = {
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
  
  // Merge provided settings with defaults
  const initialSettings = {
    email: { ...defaultNotifications.email, ...(notificationData.email || {}) },
    push: { ...defaultNotifications.push, ...(notificationData.push || {}) }
  };
  
  const [settings, setSettings] = useState(initialSettings);
  const [originalSettings] = useState(initialSettings);

  const handleToggle = (category, settingName) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [settingName]: !prev[category][settingName]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification settings submitted:", settings);
    
    // Show success toast
    toast.success("Notification preferences saved successfully!");
  };
  
  const handleReset = () => {
    // Check if there are any changes
    if (JSON.stringify(settings) !== JSON.stringify(originalSettings)) {
      setSettings(originalSettings);
      toast.info("Notification settings have been reset to defaults.");
    } else {
      toast.info("No changes to reset.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Notification Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white">Email Notifications</h3>
          
          <Toggle 
            id="account-updates"
            label="Account updates"
            checked={settings.email.accountUpdates}
            onChange={() => handleToggle('email', 'accountUpdates')}
          />
          
          <Toggle 
            id="investment-alerts"
            label="Investment alerts"
            checked={settings.email.investmentAlerts}
            onChange={() => handleToggle('email', 'investmentAlerts')}
          />
          
          <Toggle 
            id="education-content"
            label="Financial education content"
            checked={settings.email.educationContent}
            onChange={() => handleToggle('email', 'educationContent')}
          />
        </div>
        
        <div className="space-y-3 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-medium text-white">Push Notifications</h3>
          
          <Toggle 
            id="sip-reminders"
            label="SIP reminders"
            checked={settings.push.sipReminders}
            onChange={() => handleToggle('push', 'sipReminders')}
          />
          
          <Toggle 
            id="goal-updates"
            label="Goal progress updates"
            checked={settings.push.goalUpdates}
            onChange={() => handleToggle('push', 'goalUpdates')}
          />
          
          <Toggle 
            id="market-news"
            label="Market news alerts"
            checked={settings.push.marketNews}
            onChange={() => handleToggle('push', 'marketNews')}
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            text="Reset"
            bgColor="#4B5563" 
            hoverBgColor="#374151"
            className="text-white"
            width="w-auto"
            type="button"
            onClick={handleReset}
          />
          
          <Button 
            text="Save Preferences"
            bgColor="#6FFFE9" 
            hoverBgColor="#5aebe9"
            className="text-black"
            width="w-auto"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;