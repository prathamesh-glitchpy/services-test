import React, { useState } from 'react';
import Button from '../Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../ToastSystem';

const DevicesSettings = ({ devicesData = [] }) => {
  const toast = useToast();
  
  // Default devices if none provided
  const defaultDevices = [
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
  
  // Merge provided devices with defaults
  const initialDevices = devicesData.length > 0 ? devicesData : defaultDevices;
  
  const [devices, setDevices] = useState(initialDevices);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogoutAllConfirm, setShowLogoutAllConfirm] = useState(false);
  const [deviceToLogout, setDeviceToLogout] = useState(null);
  
  const initiateLogoutDevice = (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    setDeviceToLogout(device);
    setShowLogoutConfirm(true);
  };
  
  const confirmLogoutDevice = () => {
    if (deviceToLogout.isCurrentSession) {
      console.log('Logging out from current session');
      // In a real app, this would call a logout API
      toast.info("Logging you out...");
      setTimeout(() => {
        window.location.href = '/logout';
      }, 1500);
    } else {
      console.log(`Logging out device: ${deviceToLogout.id}`);
      setDevices(devices.filter(d => d.id !== deviceToLogout.id));
      toast.success(`Successfully logged out from ${deviceToLogout.deviceName}`);
    }
  };
  
  const initiateLogoutAllDevices = () => {
    setShowLogoutAllConfirm(true);
  };
  
  const confirmLogoutAllDevices = () => {
    console.log('Logging out from all devices');
    // In a real app, this would call a logout API for all devices
    toast.info('Logging out from all devices...');
    setTimeout(() => {
      window.location.href = '/logout';
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Devices & Sessions</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Currently Active Sessions</h3>
        
        {devices.map((device) => (
          <div 
            key={device.id} 
            className={`bg-gray-800 rounded-lg p-4 ${device.isCurrentSession ? 'border-l-4 border-green-500' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">{device.deviceName}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {device.location}
                  {device.isCurrentSession && ' • Current Session'}
                </p>
                {device.status ? (
                  <p className="text-green-400 text-xs mt-2">{device.status}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-2">Last active: {device.lastActive}</p>
                )}
              </div>
              <Button 
                text="Log Out"
                bgColor="transparent" 
                hoverBgColor="transparent"
                className="text-red-400 hover:text-red-300"
                width="w-auto"
                height="h-auto"
                onClick={() => initiateLogoutDevice(device.id)}
              />
            </div>
          </div>
        ))}
        
        {devices.length > 1 && (
          <div className="flex justify-end pt-4 mt-4 border-t border-gray-700">
            <Button 
              text="Log Out of All Devices"
              bgColor="#EF4444" 
              hoverBgColor="#DC2626"
              className="text-white"
              width="w-auto"
              onClick={initiateLogoutAllDevices}
            />
          </div>
        )}
      </div>

      {/* Confirmation Dialog for logging out a single device */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogoutDevice}
        title="Log Out Device"
        message={
          deviceToLogout?.isCurrentSession
            ? "Are you sure you want to log out from this device? You will be redirected to the login page."
            : `Are you sure you want to log out from device: ${deviceToLogout?.deviceName}?`
        }
        confirmText="Log Out"
        dangerConfirm={true}
      />

      {/* Confirmation Dialog for logging out all devices */}
      <ConfirmDialog
        isOpen={showLogoutAllConfirm}
        onClose={() => setShowLogoutAllConfirm(false)}
        onConfirm={confirmLogoutAllDevices}
        title="Log Out All Devices"
        message="Are you sure you want to log out from all devices? You will be redirected to the login page."
        confirmText="Log Out All"
        dangerConfirm={true}
      />
    </div>
  );
};

export default DevicesSettings;