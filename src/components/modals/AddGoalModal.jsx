import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faGraduationCap, faUmbrella, faCar, faPlane, 
  faRing, faHeart, faLaptop, faHandHoldingDollar, faMoneyBillWave,
  faPiggyBank, faLandmark, faChartLine, faBaby, faHospital
} from '@fortawesome/free-solid-svg-icons';

const AddGoalModal = ({ isOpen, onClose, onAddGoal }) => {
  // Available icons for the picker
  const availableIcons = [
    { icon: faHome, name: 'Home' },
    { icon: faGraduationCap, name: 'Education' },
    { icon: faUmbrella, name: 'Retirement' },
    { icon: faCar, name: 'Vehicle' },
    { icon: faPlane, name: 'Travel' },
    { icon: faRing, name: 'Wedding' },
    { icon: faHeart, name: 'Health' },
    { icon: faLaptop, name: 'Electronics' },
    { icon: faHandHoldingDollar, name: 'Investments' },
    { icon: faMoneyBillWave, name: 'Emergency Fund' },
    { icon: faPiggyBank, name: 'Savings' },
    { icon: faLandmark, name: 'Property' },
    { icon: faChartLine, name: 'Business' },
    { icon: faBaby, name: 'Family' },
    { icon: faHospital, name: 'Medical' }
  ];

  // Form state for new goal
  const [newGoal, setNewGoal] = useState({
    title: '',
    icon: faHome,
    targetAmount: '',
    savedAmount: '',
    targetDate: '',
    description: '',
    monthlyContribution: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };
  
  const handleIconSelect = (icon) => {
    setNewGoal({
      ...newGoal,
      icon: icon
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate percentage completed
    const completedPercentage = Math.round((newGoal.savedAmount / newGoal.targetAmount) * 100);
    
    // Calculate months left (dummy calculation - would need proper date handling in production)
    const currentDate = new Date();
    const targetYear = parseInt(newGoal.targetDate.split('-')[0]);
    const targetMonth = parseInt(newGoal.targetDate.split('-')[1]) - 1;
    const targetDateObj = new Date(targetYear, targetMonth, 1);
    const monthsLeft = (targetDateObj.getFullYear() - currentDate.getFullYear()) * 12 + 
                       (targetDateObj.getMonth() - currentDate.getMonth());
    
    // Format date for display
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[targetMonth]} ${targetYear}`;
    
    const formattedGoal = {
      title: newGoal.title,
      icon: newGoal.icon,
      targetAmount: parseFloat(newGoal.targetAmount),
      savedAmount: parseFloat(newGoal.savedAmount),
      targetDate: formattedDate,
      completedPercentage: completedPercentage,
      monthsLeft: monthsLeft > 0 ? monthsLeft : 0,
      description: newGoal.description,
      monthlyContribution: parseFloat(newGoal.monthlyContribution),
      suggestedFunds: [] // Would be populated from backend in real app
    };
    
    onAddGoal(formattedGoal);
    
    // Reset form
    setNewGoal({
      title: '',
      icon: faHome,
      targetAmount: '',
      savedAmount: '',
      targetDate: '',
      description: '',
      monthlyContribution: ''
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Add New Financial Goal</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="title">
            Goal Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.title}
            onChange={handleInputChange}
            required
            placeholder="e.g. Home Purchase, Education, etc."
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2">
            Goal Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {availableIcons.map((iconObj, index) => (
              <div 
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${newGoal.icon === iconObj.icon ? 'bg-[#5BC0BE] text-white border-2 border-white' : 'bg-gray-800 text-[#5BC0BE] hover:bg-gray-700'}`}
                onClick={() => handleIconSelect(iconObj.icon)}
                title={iconObj.name}
              >
                <FontAwesomeIcon icon={iconObj.icon} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="targetAmount">
            Target Amount (₹)
          </label>
          <input
            id="targetAmount"
            name="targetAmount"
            type="number"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.targetAmount}
            onChange={handleInputChange}
            required
            min="1000"
            placeholder="Enter goal amount"
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="savedAmount">
            Saved Amount So Far (₹)
          </label>
          <input
            id="savedAmount"
            name="savedAmount"
            type="number"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.savedAmount}
            onChange={handleInputChange}
            required
            min="0"
            placeholder="Enter already saved amount"
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="targetDate">
            Target Date
          </label>
          <input
            id="targetDate"
            name="targetDate"
            type="month"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.targetDate}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="monthlyContribution">
            Monthly Contribution (₹)
          </label>
          <input
            id="monthlyContribution"
            name="monthlyContribution"
            type="number"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.monthlyContribution}
            onChange={handleInputChange}
            required
            min="100"
            placeholder="Enter monthly contribution"
          />
        </div>
        
        <div>
          <label className="block text-[#A3A1A1] mb-2" htmlFor="description">
            Goal Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
            value={newGoal.description}
            onChange={handleInputChange}
            rows="3"
            placeholder="Describe your financial goal"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            text="Cancel"
            bgColor="#4B5563" 
            hoverBgColor="#374151"
            className="text-white"
            width="w-auto sm:w-auto"
            onClick={onClose}
          />
          <Button
            text="Add Goal"
            bgColor="#6FFFE9"
            hoverBgColor="#5aebe9"
            className="text-black font-medium"
            width="w-auto sm:w-auto"
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddGoalModal;