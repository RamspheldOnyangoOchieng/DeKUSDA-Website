import React, { useState } from 'react';
import { 
  FaHeart, FaHandsHelping, FaBuilding, FaGraduationCap, 
  FaCreditCard, FaMobileAlt, FaUniversity, FaLock,
  FaDollarSign, FaChartBar, FaCalendarAlt, FaDownload,
  FaGift, FaUsers, FaShieldAlt, FaChurch, FaBus, FaBook
} from 'react-icons/fa';

// Helper functions for dynamic project rendering
const getProjectIcon = (category) => {
  const iconClass = "text-white text-4xl";
  switch (category.toLowerCase()) {
    case 'construction':
      return <FaChurch className={iconClass} />;
    case 'education':
      return <FaGraduationCap className={iconClass} />;
    case 'healthcare':
      return <FaHeart className={iconClass} />;
    case 'youth':
      return <FaUsers className={iconClass} />;
    case 'evangelism':
      return <FaBus className={iconClass} />;
    default:
      return <FaBuilding className={iconClass} />;
  }
};

const getProjectColor = (category) => {
  switch (category.toLowerCase()) {
    case 'construction':
      return 'from-blue-500 to-blue-600';
    case 'education':
      return 'from-green-500 to-green-600';
    case 'healthcare':
      return 'from-red-500 to-red-600';
    case 'youth':
      return 'from-purple-500 to-purple-600';
    case 'evangelism':
      return 'from-orange-500 to-orange-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const OnlineGiving = ({ projects = [] }) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('tithe');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000, 20000];
  
  const givingFunds = [
    {
      id: 'tithe',
      name: 'Tithe',
      description: 'Regular tithe - "Bring the whole tithe into the storehouse" (Malachi 3:10). Supporting God\'s work through faithful stewardship.',
      icon: FaBuilding,
      color: 'from-blue-500 to-cyan-500',
      priority: 'high'
    },
    {
      id: 'sabbath-school',
      name: 'Sabbath School Offering',
      description: 'Weekly Sabbath School mission offering supporting global evangelism and church development worldwide.',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
      priority: 'high'
    },
    {
      id: 'local-church',
      name: 'Local Church Offering',
      description: 'Supporting DeKUSDA church operations, ministries, and local community outreach programs.',
      icon: FaUsers,
      color: 'from-purple-500 to-indigo-500',
      priority: 'medium'
    },
    {
      id: 'thirteenth-sabbath',
      name: 'Thirteenth Sabbath Offering',
      description: 'Special quarterly offering supporting specific mission projects worldwide as designated by the General Conference.',
      icon: FaGraduationCap,
      color: 'from-green-500 to-emerald-500',
      priority: 'medium'
    },
    {
      id: 'church-budget',
      name: 'Church Budget Offering',
      description: 'Monthly offering for DeKUSDA church operational expenses, utilities, and ministry support.',
      icon: FaHandsHelping,
      color: 'from-orange-500 to-yellow-500',
      priority: 'medium'
    },
    {
      id: 'special-projects',
      name: 'Special Projects',
      description: 'Support for church equipment, evangelistic campaigns, and special ministry initiatives at DeKUSDA.',
      icon: FaBuilding,
      color: 'from-gray-500 to-slate-500',
      priority: 'low'
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FaCreditCard, fees: '2.9% + $0.30' },
    { id: 'bank', name: 'Bank Transfer', icon: FaUniversity, fees: '$1.00 flat fee' },
    { id: 'mobile', name: 'Mobile Money', icon: FaMobileAlt, fees: '1.5% + $0.25' }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Tithes & Offerings
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            "Bring the whole tithe into the storehouse, that there may be food in my house" (Malachi 3:10). 
            Your faithful stewardship supports God's work at DeKUSDA and around the world.
          </p>
          <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Giving Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <FaGift className="text-blue-600 text-lg sm:text-xl" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Give Your Tithes & Offerings</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Support God's work through faithful stewardship</p>
                </div>
              </div>

              {/* Giving Fund Selection */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Choose a Fund</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {givingFunds.map((fund) => {
                    const IconComponent = fund.icon;
                    
                    return (
                      <div
                        key={fund.id}
                        onClick={() => setSelectedFund(fund.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedFund === fund.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`bg-gradient-to-r ${fund.color} p-2 rounded-lg`}>
                            <IconComponent className="text-white text-lg" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-gray-800">{fund.name}</h5>
                              {fund.priority === 'high' && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                  Priority
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{fund.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Select Amount</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-2 sm:p-3 rounded-lg border-2 font-semibold transition-all text-sm sm:text-base ${
                        selectedAmount === amount
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500">KSh</span>
                  </div>
                </div>
              </div>

              {/* Recurring Donation */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className="text-lg font-semibold text-gray-800">
                    Make this a recurring donation
                  </label>
                </div>
                
                {isRecurring && (
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h4>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <IconComponent className="text-gray-600 text-xl" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{method.name}</div>
                          <div className="text-sm text-gray-600">Processing fee: {method.fees}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-green-600 text-xl" />
                  <div>
                    <div className="font-semibold text-green-800">Secure & Encrypted</div>
                    <div className="text-green-700 text-sm">
                      All transactions are processed securely with 256-bit SSL encryption
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                disabled={getCurrentAmount() === 0}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                  getCurrentAmount() > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FaLock />
                  <span>
                    Donate {getCurrentAmount() > 0 ? formatCurrency(getCurrentAmount()) : 'Amount'}
                    {isRecurring ? ` ${frequency}` : ''}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Impact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Stewardship Impact</h3>
              {getCurrentAmount() > 0 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-blue-800 font-semibold">
                      Your {formatCurrency(getCurrentAmount())} faithful giving to {givingFunds.find(f => f.id === selectedFund)?.name} supports:
                    </div>
                    <ul className="text-blue-700 text-sm mt-2 space-y-1">
                      {selectedFund === 'tithe' && (
                        <>
                          <li>• Gospel ministry and pastoral support</li>
                          <li>• Church operations and evangelism</li>
                          <li>• Conference-wide mission work</li>
                        </>
                      )}
                      {selectedFund === 'sabbath-school' && (
                        <>
                          <li>• Global mission field projects</li>
                          <li>• Evangelistic campaigns worldwide</li>
                          <li>• Church development in mission areas</li>
                        </>
                      )}
                      {selectedFund === 'local-church' && (
                        <>
                          <li>• DeKUSDA ministry programs</li>
                          <li>• Community outreach initiatives</li>
                          <li>• University campus evangelism</li>
                        </>
                      )}
                      {selectedFund === 'thirteenth-sabbath' && (
                        <>
                          <li>• Special mission projects</li>
                          <li>• Educational and health ministries</li>
                          <li>• Church building in mission fields</li>
                        </>
                      )}
                      {selectedFund === 'church-budget' && (
                        <>
                          <li>• Church operational expenses</li>
                          <li>• Utilities and facility maintenance</li>
                          <li>• Ministry resource funding</li>
                        </>
                      )}
                      {selectedFund === 'special-projects' && (
                        <>
                          <li>• Evangelistic campaign support</li>
                          <li>• Church equipment and technology</li>
                          <li>• Special ministry initiatives</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Stewardship Principles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Biblical Stewardship</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="font-medium text-blue-800 mb-2">Faithful Tithing</div>
                  <p className="text-blue-700 text-sm">
                    "Bring the whole tithe into the storehouse, that there may be food in my house." - Malachi 3:10
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="font-medium text-green-800 mb-2">Cheerful Giving</div>
                  <p className="text-green-700 text-sm">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <div className="font-medium text-purple-800 mb-2">Mission Focus</div>
                  <p className="text-purple-700 text-sm">
                    Your offerings support global evangelism and local ministry at DeKUSDA Church.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Ways to Give */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Ways to Give</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <FaUniversity className="text-blue-500" />
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-gray-600">Direct deposit to church account</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FaMobileAlt className="text-blue-500" />
                  <div>
                    <div className="font-medium">Mobile Money</div>
                    <div className="text-sm text-gray-600">M-Pesa/Airtel Money</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FaDollarSign className="text-blue-500" />
                  <div>
                    <div className="font-medium">In-Person</div>
                    <div className="text-sm text-gray-600">During worship services</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                <div className="flex items-center justify-center space-x-2">
                  <FaDownload />
                  <span>Download Giving Guide</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Ongoing Church Projects */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ongoing Church Projects That Need Support</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join us in advancing God's kingdom through these vital ministry projects at DeKUSDA Church. 
              Your support helps build strong foundations for gospel outreach and community transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dynamic Church Projects */}
            {projects.length > 0 ? projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-br ${getProjectColor(project.category)} h-40 flex items-center justify-center`}>
                  {getProjectIcon(project.category)}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-blue-600">{project.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${project.progress_percentage}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {project.target_amount ? 'Target' : 'Status'}
                      </span>
                      <span className="font-medium">
                        {project.target_amount 
                          ? `KSh ${project.target_amount.toLocaleString()}` 
                          : project.updates || 'In Progress'}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                    Support This Project
                  </button>
                </div>
              </div>
            )) : (
              // Fallback static projects if no dynamic data
              <>
                {/* Church Sanctuary Renovation */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-40 flex items-center justify-center">
                    <FaChurch className="text-white text-4xl" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Sanctuary Renovation Project</h4>
                    <p className="text-gray-600 mb-4 text-sm">
                      Upgrading our worship space with modern audio-visual equipment, improved acoustics, and accessibility features to enhance worship experience.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-blue-600">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target</span>
                        <span className="font-medium">KSh 2,500,000</span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                      Support This Project
                    </button>
                  </div>
                </div>

                {/* Student Scholarship Fund */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 h-40 flex items-center justify-center">
                    <FaGraduationCap className="text-white text-4xl" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Student Scholarship Program</h4>
                    <p className="text-gray-600 mb-4 text-sm">
                      Supporting DeKUSDA students with financial assistance for tuition, books, and living expenses to ensure education accessibility.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Students Supported</span>
                        <span className="font-medium text-green-600">28 of 50</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '56%'}}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Annual Goal</span>
                        <span className="font-medium">KSh 1,800,000</span>
                      </div>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                      Support Students
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Community Health Clinic */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-red-500 to-red-600 h-40 flex items-center justify-center">
                <FaHeart className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Community Health Clinic</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Establishing a health clinic to provide affordable healthcare services to the university and surrounding community.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Equipment Funded</span>
                    <span className="font-medium text-red-600">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target</span>
                    <span className="font-medium">KSh 3,200,000</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                  Support Health Ministry
                </button>
              </div>
            </div>

            {/* Youth Ministry Center */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-40 flex items-center justify-center">
                <FaUsers className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Youth Ministry Center</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Building a dedicated space for youth activities, Bible studies, and community programs to strengthen young people's faith.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Construction Phase</span>
                    <span className="font-medium text-purple-600">Phase 2 of 3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-medium">KSh 1,500,000</span>
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                  Support Youth Ministry
                </button>
              </div>
            </div>

            {/* Evangelism Outreach Vehicle */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-40 flex items-center justify-center">
                <FaBus className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Mobile Evangelism Unit</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Acquiring a vehicle equipped for mobile evangelism, health screenings, and community outreach programs in rural areas.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fundraising Progress</span>
                    <span className="font-medium text-orange-600">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target</span>
                    <span className="font-medium">KSh 4,000,000</span>
                  </div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                  Support Evangelism
                </button>
              </div>
            </div>

            {/* Church Library & Media Center */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 h-40 flex items-center justify-center">
                <FaBook className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Digital Library & Media Center</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Creating a modern library with Adventist literature, multimedia resources, and study spaces for spiritual growth and learning.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resources Acquired</span>
                    <span className="font-medium text-indigo-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target</span>
                    <span className="font-medium">KSh 1,200,000</span>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                  Support Education
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Every Gift Makes a Difference</h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether large or small, your contribution to these projects helps advance God's kingdom and strengthens our church community. 
              Thank you for partnering with us in ministry.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineGiving;
