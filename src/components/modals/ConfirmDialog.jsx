import React from 'react';
import Modal from './Modal';
import Button from '../Button';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#6FFFE9",
  confirmHoverColor = "#5aebe9",
  confirmTextColor = "text-black",
  dangerConfirm = false
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <Button 
            text={cancelText}
            bgColor="#4B5563"
            hoverBgColor="#374151"
            className="text-white w-full sm:w-auto"
            onClick={onClose}
          />
          <Button 
            text={confirmText}
            bgColor={dangerConfirm ? "#EF4444" : confirmColor}
            hoverBgColor={dangerConfirm ? "#DC2626" : confirmHoverColor}
            className={`${confirmTextColor} w-full sm:w-auto`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;