import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const GoalCard = ({ goal, onViewDetails, onDeleteGoal }) => {
  return (
    <Card 
      height="h-auto min-h-[20rem]"
      width="w-full max-w-sm"
      padding="p-5 sm:p-6" 
      className="flex flex-col justify-between mx-auto"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5BC0BE] flex items-center justify-center text-white">
              <FontAwesomeIcon icon={goal.icon} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold">{goal.title}</h3>
          </div>
          
          {onDeleteGoal && (
            <button 
              onClick={() => onDeleteGoal(goal)}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Delete goal"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Target Amount:</span>
            <span className="text-sm sm:text-base">₹{goal.targetAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Saved So Far:</span>
            <span className="text-sm sm:text-base">₹{goal.savedAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-[#A3A1A1]">Target Date:</span>
            <span className="text-sm sm:text-base">{goal.targetDate}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 w-full">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-[#6FFFE9] h-2.5 rounded-full" style={{ width: `${goal.completedPercentage}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-[#6FFFE9] font-medium">{goal.completedPercentage}% Completed</span>
          <span className="text-[#A3A1A1]">{goal.monthsLeft} months left</span>
        </div>
        
        <div className="mt-4 w-full">
          <Button 
            text="View Details"
            bgColor="#6FFFE9"
            hoverBgColor="#5aebe9"
            className="text-black text-sm sm:text-base font-medium w-full"
            width="w-full"
            onClick={() => onViewDetails(goal)}
          />
        </div>
      </div>
    </Card>
  );
};

export default GoalCard;