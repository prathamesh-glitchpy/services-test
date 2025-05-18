import React, { useState } from 'react';
import Button from './Button';
import GoalCard from './GoalCard';
import GoalDetailsModal from './modals/GoalDetailsModal';
import AddGoalModal from './modals/AddGoalModal';
import ConfirmDialog from './modals/ConfirmDialog';
import useToast from './ToastSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Goals = ({ initialGoals = [] }) => {
  const toast = useToast();
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  
  const openDetailsModal = (goal) => {
    setSelectedGoal(goal);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedGoal(null);
  };
  
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };
  
  const handleAddGoal = (newGoal) => {
    // Add ID to the new goal
    const goalWithId = {
      id: goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1,
      ...newGoal
    };
    
    // Add the new goal to the state
    setGoals([...goals, goalWithId]);
    
    // Close the modal
    closeAddModal();
    
    // Show success toast
    toast.success(`New goal "${newGoal.title}" has been added successfully!`);
  };
  
  const initiateDeleteGoal = (goal) => {
    setGoalToDelete(goal);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteGoal = () => {
    if (goalToDelete) {
      setGoals(goals.filter(goal => goal.id !== goalToDelete.id));
      toast.info(`Goal "${goalToDelete.title}" has been deleted.`);
      setGoalToDelete(null);
    }
  };
  
  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    toast.success(`Goal "${updatedGoal.title}" has been updated successfully!`);
  };
  
  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">Your Financial Goals</h2>
        <Button 
          text="+ New Goal"
          bgColor="#6FFFE9"
          hoverBgColor="#5aebe9"
          className="text-black font-medium"
          width="w-auto sm:w-auto"
          onClick={openAddModal}
        />
      </div>
      
      {/* Goal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {goals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onViewDetails={openDetailsModal}
            onDeleteGoal={initiateDeleteGoal}
          />
        ))}
      </div>
      
      {/* Goal Details Modal */}
      <GoalDetailsModal 
        isOpen={showDetailsModal}
        onClose={closeDetailsModal}
        goal={selectedGoal}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={initiateDeleteGoal}
      />
      
      {/* Add New Goal Modal */}
      <AddGoalModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        onAddGoal={handleAddGoal}
      />
      
      {/* Confirmation Dialog for deleting goals */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteGoal}
        title="Delete Financial Goal"
        message={
          goalToDelete 
            ? `Are you sure you want to delete your "${goalToDelete.title}" goal? This action cannot be undone.`
            : "Are you sure you want to delete this goal? This action cannot be undone."
        }
        confirmText="Delete Goal"
        dangerConfirm={true}
      />
    </div>
  );
};

export default Goals;