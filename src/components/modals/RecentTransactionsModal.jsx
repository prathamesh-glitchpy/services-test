import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const RecentTransactionsModal = ({ isOpen, onClose, transactions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    sortBy: 'date-desc'
  });

  // Update filtered transactions when search query or filters change
  useEffect(() => {
    let result = [...transactions];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(txn => 
        txn.title.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      result = result.filter(txn => txn.type === filters.type);
    }
    
    // Apply sorting
    switch(filters.sortBy) {
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date.split(' ').slice(1).join(' ')) - new Date(b.date.split(' ').slice(1).join(' ')));
        break;
      case 'date-desc':
      default:
        result.sort((a, b) => new Date(b.date.split(' ').slice(1).join(' ')) - new Date(a.date.split(' ').slice(1).join(' ')));
    }
    
    setFilteredTransactions(result);
  }, [searchQuery, filters, transactions]);
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">All Transactions</h2>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6FFFE9]"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            icon={<FontAwesomeIcon icon={faFilter} className="mr-2" />}
            text="Filters"
            bgColor={filterOpen ? "#6FFFE9" : "#3A506B"}
            hoverBgColor={filterOpen ? "#5aebe9" : "#2D3F55"}
            className={filterOpen ? "text-black" : "text-white"}
            width="w-full md:w-auto"
            onClick={() => setFilterOpen(!filterOpen)}
          />
        </div>
        
        {/* Filter Options */}
        {filterOpen && (
          <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Transaction Type</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={filters.type}
                onChange={e => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="credit">Credits Only</option>
                <option value="debit">Debits Only</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Sort By</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                value={filters.sortBy}
                onChange={e => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="amount-desc">Amount (Highest First)</option>
                <option value="amount-asc">Amount (Lowest First)</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Transactions List */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn) => (
              <div 
                key={txn.id} 
                className="flex justify-between items-start p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{txn.title}</p>
                  <p className="text-sm text-gray-300">{txn.date}</p>
                </div>
                <span className={`text-md font-bold ${txn.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No transactions found matching your search criteria.</p>
            </div>
          )}
        </div>
        
        {/* Total Count */}
        <div className="text-right text-sm text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
      </div>
    </Modal>
  );
};

export default RecentTransactionsModal;