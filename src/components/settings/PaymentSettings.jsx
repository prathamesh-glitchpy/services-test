import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTimes, faPlus, faUniversity, faEye } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import Button from '../common/Button';
import ConfirmDialog from '../modals/ConfirmDialog';
import useToast from '../common/ToastSystem';

const PaymentSettings = ({ paymentMethodsData = [] }) => {
  // Get toast notification functions
  const toast = useToast();
  
  // More robust default payment methods with real-world payment system structure
  const defaultPaymentMethods = [
    {
      id: "pm_1234567890",
      type: 'card',
      cardType: 'visa',
      name: 'HDFC Bank Visa Card',
      maskedNumber: '•••• •••• •••• 4587',
      expiryDate: '05/26',
      isDefault: true,
      createdAt: '2023-12-05T10:30:45Z',
      lastUsed: '2025-05-10T14:22:30Z',
      icon: faCcVisa,
      bgColor: 'bg-blue-600'
    },
    {
      id: "pm_0987654321",
      type: 'card',
      cardType: 'mastercard',
      name: 'ICICI Bank Mastercard',
      maskedNumber: '•••• •••• •••• 1234',
      expiryDate: '09/27',
      isDefault: false,
      createdAt: '2024-01-15T08:45:22Z',
      lastUsed: '2025-04-20T09:15:10Z',
      icon: faCcMastercard,
      bgColor: 'bg-red-600'
    },
    {
      id: "pm_5432167890",
      type: 'bank',
      bankName: 'SBI',
      accountType: 'Savings',
      maskedAccountNumber: '••••••8721',
      ifscCode: 'SBIN0001234',
      isDefault: false,
      createdAt: '2024-02-28T16:20:18Z',
      lastUsed: '2025-03-12T11:30:45Z',
      icon: faUniversity,
      bgColor: 'bg-green-600'
    }
  ];
  
  // Merge provided payment methods with defaults
  const initialPaymentMethods = paymentMethodsData.length > 0 ? paymentMethodsData : defaultPaymentMethods;
  
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingMethodId, setViewingMethodId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [methodToRemove, setMethodToRemove] = useState(null);
  const [newMethod, setNewMethod] = useState({
    type: 'card',
    cardType: 'visa',
    name: '',
    maskedNumber: '',
    expiryDate: '',
    bankName: '',
    accountType: 'Savings',
    maskedAccountNumber: '',
    ifscCode: '',
  });
  
  const handleRemoveClick = (id) => {
    const method = paymentMethods.find(m => m.id === id);
    setMethodToRemove(method);
    setConfirmDialogOpen(true);
  };
  
  const confirmRemoveMethod = () => {
    if (methodToRemove) {
      console.log("Removing payment method:", methodToRemove.id);
      setPaymentMethods(paymentMethods.filter(method => method.id !== methodToRemove.id));
      toast.success(`${methodToRemove.type === 'card' ? methodToRemove.name : methodToRemove.bankName + ' ' + methodToRemove.accountType} has been removed.`);
      setMethodToRemove(null);
    }
  };
  
  const handleAddClick = () => {
    setShowAddForm(true);
    setNewMethod({
      type: 'card',
      cardType: 'visa',
      name: '',
      maskedNumber: '',
      expiryDate: '',
      bankName: '',
      accountType: 'Savings',
      maskedAccountNumber: '',
      ifscCode: '',
    });
  };
  
  const handleNewMethodChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      // Reset relevant fields when changing payment type
      if (value === 'card') {
        setNewMethod(prev => ({
          ...prev,
          type: value,
          cardType: 'visa',
          bankName: '',
          accountType: 'Savings',
          maskedAccountNumber: '',
          ifscCode: '',
        }));
      } else {
        setNewMethod(prev => ({
          ...prev,
          type: value,
          cardType: '',
          maskedNumber: '',
          expiryDate: '',
        }));
      }
    } else if (name === 'cardType') {
      setNewMethod(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewMethod(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    // Generate unique id with timestamp prefix
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const newId = `pm_${timestamp}${randomSuffix}`;
    
    // Set icon and color based on selected type
    let icon, bgColor;
    
    if (newMethod.type === 'card') {
      switch(newMethod.cardType) {
        case 'visa':
          icon = faCcVisa;
          bgColor = 'bg-blue-600';
          break;
        case 'mastercard':
          icon = faCcMastercard;
          bgColor = 'bg-red-600';
          break;
        case 'amex':
          icon = faCcAmex;
          bgColor = 'bg-purple-600';
          break;
        case 'discover':
          icon = faCcDiscover;
          bgColor = 'bg-orange-600';
          break;
        default:
          icon = faCreditCard;
          bgColor = 'bg-gray-600';
      }
    } else {
      icon = faUniversity;
      bgColor = 'bg-green-600';
    }
    
    const currentDate = new Date().toISOString();
    
    const methodToAdd = {
      ...newMethod,
      id: newId,
      icon,
      bgColor,
      isDefault: paymentMethods.length === 0, // Make default if it's the first method
      createdAt: currentDate,
      lastUsed: currentDate
    };
    
    setPaymentMethods([...paymentMethods, methodToAdd]);
    setShowAddForm(false);
    toast.success(`New payment method added successfully!`);
  };
  
  const handleCancel = () => {
    setShowAddForm(false);
  };

  // Function to toggle viewing details for a specific payment method
  const handleViewDetails = (id) => {
    if (viewingMethodId === id) {
      setViewingMethodId(null); // Close if already open
    } else {
      setViewingMethodId(id); // Open the details for this method
    }
  };

  // Function to format and display payment method details
  const getMethodDetails = (method) => {
    if (method.type === 'card') {
      return (
        <>
          <p className="text-white font-medium text-base md:text-lg">{method.name}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-300 inline-flex items-center">
              <FontAwesomeIcon icon={method.icon} className="mr-1.5" />
              {method.cardType.charAt(0).toUpperCase() + method.cardType.slice(1)}
            </span>
            {method.isDefault && 
              <span className="text-xs bg-gradient-to-r from-blue-700 to-blue-900 text-white px-2 py-0.5 rounded-full ml-2 inline-block">
                Default
              </span>
            }
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className="text-white font-medium text-base md:text-lg">{method.bankName} {method.accountType}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-300 inline-flex items-center">
              <FontAwesomeIcon icon={method.icon} className="mr-1.5" />
              Bank Account
            </span>
            {method.isDefault && 
              <span className="text-xs bg-gradient-to-r from-blue-700 to-blue-900 text-white px-2 py-0.5 rounded-full ml-2 inline-block">
                Default
              </span>
            }
          </div>
        </>
      );
    }
  };

  // Function to render the detailed view of a payment method
  const renderMethodDetails = (method) => {
    return (
      <div className="mt-3 pt-3 border-t border-gray-700">
        <h4 className="text-white font-medium mb-2">Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {method.type === 'card' ? (
            <>
              <div>
                <p className="text-gray-400 text-sm">Card Number</p>
                <p className="text-white">{method.maskedNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expiration Date</p>
                <p className="text-white">{method.expiryDate}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-gray-400 text-sm">Account Number</p>
                <p className="text-white">{method.maskedAccountNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">IFSC Code</p>
                <p className="text-white">{method.ifscCode}</p>
              </div>
            </>
          )}
          <div>
            <p className="text-gray-400 text-sm">Added On</p>
            <p className="text-white">{new Date(method.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last Used</p>
            <p className="text-white">{new Date(method.lastUsed).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Payment Methods</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 border border-gray-700 transition-all duration-200 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-start mb-3 sm:mb-0">
                  <div className={`${method.bgColor} p-3 rounded-full mr-4 flex-shrink-0`}>
                    <FontAwesomeIcon icon={method.icon} className="text-white text-lg" />
                  </div>
                  <div className="flex-grow min-w-0">
                    {getMethodDetails(method)}
                  </div>
                </div>
                <div className="flex justify-end sm:justify-center mt-2 sm:mt-0 space-x-2">
                  <Button 
                    icon={<FontAwesomeIcon icon={faEye} />}
                    text="View Details"
                    bgColor="transparent" 
                    hoverBgColor="transparent"
                    className="text-blue-400 hover:text-blue-300 p-0"
                    width="w-auto"
                    height="h-auto"
                    onClick={() => handleViewDetails(method.id)}
                  />
                  <Button 
                    icon={<FontAwesomeIcon icon={faTimes} />}
                    text="Remove"
                    bgColor="transparent" 
                    hoverBgColor="transparent"
                    className="text-red-400 hover:text-red-300 p-0"
                    width="w-auto"
                    height="h-auto"
                    onClick={() => handleRemoveClick(method.id)}
                  />
                </div>
              </div>
              
              {viewingMethodId === method.id && renderMethodDetails(method)}
            </div>
          ))}
        </div>
        
        {showAddForm ? (
          <div className="bg-gray-800 rounded-lg p-4">
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Add New Payment Method</h3>
              
              <div>
                <label className="block text-gray-400 mb-2">Payment Type</label>
                <select
                  name="type"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                  value={newMethod.type}
                  onChange={handleNewMethodChange}
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>
              
              {newMethod.type === 'card' && (
                <>
                  <div>
                    <label className="block text-gray-400 mb-2">Card Type</label>
                    <select
                      name="cardType"
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                      value={newMethod.cardType}
                      onChange={handleNewMethodChange}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="discover">Discover</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="maskedNumber"
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 pl-10 text-white"
                        value={newMethod.maskedNumber}
                        onChange={(e) => {
                          // Format the card number as user types (add spaces every 4 digits)
                          const value = e.target.value.replace(/\s/g, '');
                          const cardNumberGroups = [];
                          
                          // Take the last 4 digits as visible, mask the rest with dots
                          if (value.length > 0) {
                            const lastFourVisible = value.slice(-4);
                            let maskedPart = '';
                            
                            if (value.length > 4) {
                              maskedPart = '•••• '.repeat(Math.min(3, Math.floor((value.length - 4) / 4)));
                            }
                            
                            const formattedValue = maskedPart + lastFourVisible;
                            
                            setNewMethod(prev => ({
                              ...prev,
                              maskedNumber: formattedValue.length > 4 ? 
                                `•••• •••• •••• ${lastFourVisible}` : 
                                formattedValue
                            }));
                          } else {
                            setNewMethod(prev => ({
                              ...prev,
                              maskedNumber: ''
                            }));
                          }
                        }}
                        required
                        placeholder="Enter card number"
                        maxLength={19}
                      />
                      <FontAwesomeIcon 
                        icon={
                          newMethod.cardType === 'visa' ? faCcVisa :
                          newMethod.cardType === 'mastercard' ? faCcMastercard :
                          newMethod.cardType === 'amex' ? faCcAmex :
                          newMethod.cardType === 'discover' ? faCcDiscover :
                          faCreditCard
                        } 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Only the last 4 digits will be stored</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Expiry Date</label>
                    <div className="flex space-x-2">
                      <select
                        name="expiryMonth"
                        className="w-1/2 bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        value={newMethod.expiryDate ? newMethod.expiryDate.split('/')[0] : ''}
                        onChange={(e) => {
                          const month = e.target.value;
                          const year = newMethod.expiryDate ? newMethod.expiryDate.split('/')[1] || '' : '';
                          setNewMethod(prev => ({
                            ...prev,
                            expiryDate: year ? `${month}/${year}` : month
                          }));
                        }}
                        required
                      >
                        <option value="" disabled>Month</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, '0');
                          return <option key={month} value={month}>{month}</option>;
                        })}
                      </select>
                      <select
                        name="expiryYear"
                        className="w-1/2 bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        value={newMethod.expiryDate ? newMethod.expiryDate.split('/')[1] || '' : ''}
                        onChange={(e) => {
                          const year = e.target.value;
                          const month = newMethod.expiryDate ? newMethod.expiryDate.split('/')[0] || '' : '';
                          setNewMethod(prev => ({
                            ...prev,
                            expiryDate: month ? `${month}/${year}` : year
                          }));
                        }}
                        required
                      >
                        <option value="" disabled>Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const currentYear = new Date().getFullYear();
                          const year = (currentYear + i).toString().slice(-2);
                          return <option key={year} value={year}>{year}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              {newMethod.type === 'bank' && (
                <>
                  <div>
                    <label className="block text-gray-400 mb-2">Bank Name</label>
                    <input 
                      type="text" 
                      name="bankName"
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                      value={newMethod.bankName}
                      onChange={handleNewMethodChange}
                      required
                      placeholder="e.g. SBI, HDFC, ICICI"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Account Type</label>
                    <select
                      name="accountType"
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                      value={newMethod.accountType}
                      onChange={handleNewMethodChange}
                    >
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                      <option value="Salary">Salary</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Account Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="maskedAccountNumber"
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 pl-10 text-white"
                        value={newMethod.maskedAccountNumber}
                        onChange={(e) => {
                          // Process account number
                          const value = e.target.value.replace(/\D/g, '');
                          
                          if (value.length > 0) {
                            const lastFourVisible = value.slice(-4);
                            const maskedValue = `••••••${lastFourVisible}`;
                            
                            setNewMethod(prev => ({
                              ...prev,
                              maskedAccountNumber: maskedValue
                            }));
                          } else {
                            setNewMethod(prev => ({
                              ...prev,
                              maskedAccountNumber: ''
                            }));
                          }
                        }}
                        required
                        placeholder="Enter account number"
                        maxLength={20}
                      />
                      <FontAwesomeIcon 
                        icon={faUniversity} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Only the last 4 digits will be stored</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">IFSC Code</label>
                    <input 
                      type="text" 
                      name="ifscCode"
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                      value={newMethod.ifscCode}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setNewMethod(prev => ({
                          ...prev,
                          ifscCode: value
                        }));
                      }}
                      required
                      placeholder="e.g. SBIN0001234"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 4 letters + 0 + 6 alphanumeric characters</p>
                  </div>
                </>
              )}
              
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  text="Cancel"
                  bgColor="#4B5563" 
                  hoverBgColor="#374151"
                  className="text-white w-full sm:w-auto"
                  onClick={handleCancel}
                />
                <Button 
                  text="Add Method"
                  bgColor="#6FFFE9" 
                  hoverBgColor="#5aebe9"
                  className="text-black w-full sm:w-auto"
                  type="submit"
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-4">
            <Button 
              icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
              text="Add New Payment Method"
              bgColor="#3A506B" 
              hoverBgColor="#2D3F55"
              className="text-white w-full sm:w-auto"
              onClick={handleAddClick}
            />
          </div>
        )}
      </div>

      {/* Confirmation Dialog for removing payment methods */}
      <ConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmRemoveMethod}
        title="Remove Payment Method"
        message={
          methodToRemove 
            ? `Are you sure you want to remove ${methodToRemove.type === 'card' 
                ? methodToRemove.name 
                : methodToRemove.bankName + ' ' + methodToRemove.accountType}?`
            : "Are you sure you want to remove this payment method?"
        }
        confirmText="Remove"
        dangerConfirm={true}
      />
    </div>
  );
};

export default PaymentSettings;