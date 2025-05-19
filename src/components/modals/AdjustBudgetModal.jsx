import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import Slider from '../common/Slider';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from '../common/ToastSystem';

const AdjustBudgetModal = ({ isOpen, onClose, categories, onSave }) => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState(5000);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  // Toast notifications
  const toast = useToast();

  useEffect(() => {
    if (categories) {
      setBudgetCategories([...categories]);
    }
  }, [categories, isOpen]);

  // Format number as currency
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  const handleBudgetChange = (index, value) => {
    const updatedCategories = [...budgetCategories];
    updatedCategories[index].budget = value;
    setBudgetCategories(updatedCategories);
  };

  const handleConfirmDeleteCategory = () => {
    if (categoryToDelete !== null) {
      const updatedCategories = budgetCategories.filter((_, i) => i !== categoryToDelete);
      setBudgetCategories(updatedCategories);
      toast.success("Category deleted successfully");
      setCategoryToDelete(null);
    }
  };

  const handleRemoveCategory = (index) => {
    setCategoryToDelete(index);
    setConfirmDialogOpen(true);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    
    const newCategory = {
      name: newCategoryName.trim(),
      budget: newCategoryBudget,
      amount: 0 // New categories start with zero spending
    };
    
    setBudgetCategories([...budgetCategories, newCategory]);
    setNewCategoryName('');
    setNewCategoryBudget(5000);
    toast.success("Category added successfully");
  };

  const handleSave = () => {
    if (onSave) {
      onSave(budgetCategories);
    }
    toast.success("Budget changes saved successfully");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
        <div className="text-white">
          <h2 className="text-2xl font-semibold mb-6">Adjust Budget</h2>
          
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-medium mb-3">Current Budget Categories</h3>
            
            {budgetCategories.map((category, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center">
                    <span className="mr-6 text-cyan-300">{formatCurrency(category.budget)}</span>
                    <button 
                      onClick={() => handleRemoveCategory(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <Slider 
                  min={1000} 
                  max={50000} 
                  step={500} 
                  defaultValue={category.budget} 
                  onChange={(value) => handleBudgetChange(index, value)}
                  valueLabelFormat={formatCurrency}
                  trackColor="#6FFFE9"
                  backgroundColor="#4B5563"
                />
                
                <div className="mt-2 text-xs text-gray-400">
                  <span>Current spending: {formatCurrency(category.amount)}</span>
                  <span className="mx-2">•</span>
                  <span className={category.amount > category.budget ? 'text-red-400' : 'text-green-400'}>
                    {category.amount > category.budget 
                      ? `${formatCurrency(category.amount - category.budget)} over budget` 
                      : `${formatCurrency(category.budget - category.amount)} remaining`}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-4">Add New Category</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <Button 
                text="Add Category"
                onClick={handleAddCategory}
                bgColor="#6FFFE9"
                hoverBgColor="#5aebe9"
                className="text-black font-medium"
                rounded="rounded-lg"
                disabled={newCategoryName.trim() === ''}
              />
            </div>
            
            <div className="mb-1">
              <span className="font-medium">Budget Amount: {formatCurrency(newCategoryBudget)}</span>
            </div>
            
            <Slider 
              min={1000} 
              max={50000} 
              step={500} 
              defaultValue={newCategoryBudget} 
              onChange={setNewCategoryBudget}
              valueLabelFormat={formatCurrency}
              trackColor="#6FFFE9"
              backgroundColor="#4B5563"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              text="Cancel"
              onClick={onClose}
              bgColor="#4B5563"
              hoverBgColor="#374151"
              textColor="white"
              className="border border-gray-600"
              rounded="rounded-lg"
            />
            <Button 
              text="Save Changes"
              onClick={handleSave}
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
              className="text-black font-medium"
              rounded="rounded-lg"
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDeleteCategory}
        title="Delete Budget Category"
        message="Are you sure you want to delete this budget category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        dangerConfirm={true}
      />
    </>
  );
};

export default AdjustBudgetModal;