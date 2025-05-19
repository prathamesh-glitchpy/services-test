import React, { useState } from 'react';
import Button from '../common/Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../common/ToastSystem';

const ProfileSettings = ({ userData = {} }) => {
  const toast = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Default values if userData is not provided
  const defaultUserData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Financial District, Mumbai, Maharashtra 400001"
  };
  
  // Merge provided userData with defaults
  const initialData = { ...defaultUserData, ...userData };
  
  const [formData, setFormData] = useState(initialData);
  const [originalData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data submitted:", formData);
    
    // Show success toast instead of alert
    toast.success("Profile information updated successfully!");
  };
  
  const initiateReset = () => {
    // Only show confirmation if form has changes
    if (JSON.stringify(formData) !== JSON.stringify(originalData)) {
      setShowResetConfirm(true);
    } else {
      toast.info("No changes to reset.");
    }
  };
  
  const confirmReset = () => {
    setFormData(originalData);
    toast.info("Profile information has been reset to original values.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Profile Information</h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-400 mb-2">First Name</label>
            <input 
              type="text" 
              name="firstName"
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-400 mb-2">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Address</label>
          <textarea 
            name="address"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            rows="3"
            value={formData.address}
            onChange={handleChange}
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
            onClick={initiateReset}
          />
          
          <Button 
            text="Save Changes"
            bgColor="#6FFFE9" 
            hoverBgColor="#5aebe9"
            className="text-black"
            width="w-auto"
            type="submit"
          />
        </div>
      </form>
      
      {/* Confirmation Dialog for resetting form */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={confirmReset}
        title="Reset Profile Information"
        message="Are you sure you want to reset all your changes? This will revert all fields to their original values."
        confirmText="Reset"
        dangerConfirm={true}
      />
    </div>
  );
};

export default ProfileSettings;