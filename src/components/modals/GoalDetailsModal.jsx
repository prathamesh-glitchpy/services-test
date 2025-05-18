import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import useToast from '../ToastSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const GoalDetailsModal = ({ isOpen, onClose, goal, onUpdateGoal, onDeleteGoal }) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);

  if (!goal) return null;

  const handleEditClick = () => {
    setEditedGoal({...goal});
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedGoal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'targetAmount' || name === 'savedAmount' || name === 'monthlyContribution') {
      setEditedGoal(prev => ({
        ...prev,
        [name]: parseInt(value.replace(/,/g, ''), 10) || 0
      }));
    } else {
      setEditedGoal(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveEdit = () => {
    if (onUpdateGoal) {
      // Calculate percentage completed
      const completedPercentage = Math.floor((editedGoal.savedAmount / editedGoal.targetAmount) * 100);
      const updatedGoal = {
        ...editedGoal,
        completedPercentage
      };
      
      onUpdateGoal(updatedGoal);
      setIsEditing(false);
      setEditedGoal(null);
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#5BC0BE] flex items-center justify-center text-white text-xl">
            <FontAwesomeIcon icon={goal.icon} />
          </div>
          {isEditing ? (
            <input
              type="text"
              name="title"
              className="text-2xl font-bold text-white bg-gray-700 border border-gray-600 rounded p-2"
              value={editedGoal.title}
              onChange={handleInputChange}
            />
          ) : (
            <h3 className="text-2xl font-bold text-white">{goal.title}</h3>
          )}
        </div>
        
        <div className="flex space-x-2">
          {!isEditing && onUpdateGoal && (
            <button 
              onClick={handleEditClick}
              className="text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Edit goal"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          )}
          
          {!isEditing && onDeleteGoal && (
            <button 
              onClick={() => onDeleteGoal(goal)}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Delete goal"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-[#6FFFE9] h-3 rounded-full" style={{ width: `${goal.completedPercentage}%` }}></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6FFFE9] font-medium">{goal.completedPercentage}% Completed</span>
          <span className="text-[#A3A1A1]">{goal.monthsLeft} months left</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-[#A3A1A1]">Target Amount</p>
            {isEditing ? (
              <input
                type="text"
                name="targetAmount"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={editedGoal.targetAmount.toLocaleString()}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-white text-lg font-medium">₹{goal.targetAmount.toLocaleString()}</p>
            )}
          </div>
          <div>
            <p className="text-[#A3A1A1]">Saved So Far</p>
            {isEditing ? (
              <input
                type="text"
                name="savedAmount"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={editedGoal.savedAmount.toLocaleString()}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-white text-lg font-medium">₹{goal.savedAmount.toLocaleString()}</p>
            )}
          </div>
          <div>
            <p className="text-[#A3A1A1]">Target Date</p>
            {isEditing ? (
              <input
                type="text"
                name="targetDate"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={editedGoal.targetDate}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-white text-lg font-medium">{goal.targetDate}</p>
            )}
          </div>
          <div>
            <p className="text-[#A3A1A1]">Monthly Contribution</p>
            {isEditing ? (
              <input
                type="text"
                name="monthlyContribution"
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={editedGoal.monthlyContribution.toLocaleString()}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-white text-lg font-medium">₹{goal.monthlyContribution.toLocaleString()}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Goal Description</p>
          {isEditing ? (
            <textarea
              name="description"
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white min-h-[80px]"
              value={editedGoal.description}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-white">{goal.description}</p>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-[#A3A1A1] mb-2">Suggested Funds</p>
          <div className="space-y-2">
            {goal.suggestedFunds.map((fund, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded flex justify-between">
                <p className="text-white">{fund.name}</p>
                <p className="text-[#6FFFE9] font-medium">{fund.allocation}</p>
              </div>
            ))}
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              text="Cancel"
              bgColor="#4B5563" 
              hoverBgColor="#374151"
              className="text-white"
              width="w-auto"
              onClick={handleCancelEdit}
            />
            <Button 
              text="Save Changes"
              bgColor="#6FFFE9" 
              hoverBgColor="#5aebe9"
              className="text-black"
              width="w-auto"
              onClick={handleSaveEdit}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GoalDetailsModal;