import React, { useState } from 'react';
import EducationCard from '../components/EducationCard';
import EducationDetailModal from '../components/EducationDetailModal';

const FinancialEducation = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample education content with expanded data
  const educationContent = [
    {
      id: 1,
      thumbnail: '#0B132B', // Using the color as thumbnail
      level: 'Beginner',
      title: 'Investment Basics: Getting Started',
      description: 'Learn the fundamentals of investing and how to build a strong portfolio from scratch',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example YouTube link
      content: `
        <h2 class="text-xl font-semibold mb-4">Understanding Investment Basics</h2>
        <p class="mb-4">Investing is the process of allocating resources, usually money, with the expectation of generating an income or profit. It's about putting your money to work for you, so it can grow over time.</p>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Key Investment Terms</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Asset:</strong> Anything of value that can be converted into cash</li>
          <li><strong>Diversification:</strong> Spreading investments across various financial instruments to minimize risk</li>
          <li><strong>Equity:</strong> Ownership in a company in the form of shares</li>
          <li><strong>Portfolio:</strong> Collection of financial investments</li>
        </ul>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Getting Started Steps</h3>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
          <li>Define your investment goals</li>
          <li>Understand your risk tolerance</li>
          <li>Research different investment options</li>
          <li>Create a diversified portfolio</li>
          <li>Monitor and adjust your investments regularly</li>
        </ol>
      `
    },
    {
      id: 2,
      thumbnail: '#0B132B', // Using the color as thumbnail
      level: 'Advanced',
      title: 'Maximizing returns with SIPS',
      description: 'Discover Strategies to optimize your SIP investments for long term wealth creation.',
      content: `
        <h2 class="text-xl font-semibold mb-4">Advanced SIP Strategies</h2>
        <p class="mb-4">Systematic Investment Plans (SIPs) are a disciplined approach to investing, but there are advanced strategies that can significantly boost your returns over time.</p>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Optimization Techniques</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>SIP Top-up:</strong> Gradually increasing your investment amount annually</li>
          <li><strong>Value Averaging:</strong> Adjusting investment based on performance</li>
          <li><strong>Rupee Cost Averaging:</strong> How market fluctuations work to your advantage</li>
          <li><strong>Multi-cap SIP Strategy:</strong> Diversifying across market capitalizations</li>
        </ul>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Long-term Wealth Creation</h3>
        <p class="mb-4">The power of compounding works best over extended periods. A 15-20 year SIP horizon can transform modest investments into significant wealth.</p>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Tax Efficiency with SIPs</h3>
        <p class="mb-4">Strategic withdrawal planning and ELSS funds can maximize post-tax returns on your SIP investments.</p>
      `
    },
    {
      id: 3,
      thumbnail: '#0B132B', // Using the color as thumbnail
      level: 'Intermediate',
      title: 'Tax Efficient Investments Strategies',
      description: 'Learn how to structure your investments to minimize tax liability and maximize returns',
      videoUrl: 'https://youtu.be/Xe5b-9BEQTs?si=DR9YYSjd4V9vGtDU', // Example YouTube link
      content: `
        <h2 class="text-xl font-semibold mb-4">Tax-Efficient Investment Strategies</h2>
        <p class="mb-4">Strategic tax planning is crucial for preserving investment returns. Learn how to legally structure your investments to minimize tax impact.</p>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Tax-Advantaged Investments</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ELSS Funds:</strong> Equity-linked savings schemes with tax benefits</li>
          <li><strong>PPF:</strong> Public Provident Fund's long-term tax advantages</li>
          <li><strong>NPS:</strong> National Pension System tax deductions</li>
          <li><strong>Tax-Free Bonds:</strong> Government securities with tax-exempt interest</li>
        </ul>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Holding Period Strategies</h3>
        <p class="mb-4">Understanding short-term vs long-term capital gains and strategically timing your investment exits can significantly reduce tax liability.</p>
        
        <h3 class="text-lg font-medium mb-3 mt-5">Asset Location Optimization</h3>
        <p class="mb-4">Learn which investments should be held in taxable accounts vs tax-advantaged accounts for maximum efficiency.</p>
      `
    },
  ];

  const handleCardClick = (content) => {
    console.log("Card clicked:", content.title); // Debug log
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Debug log
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  return (
    <div className="text-white space-y-8">
      <h2 className="text-2xl md:text-4xl font-semibold">Financial Education</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationContent.map((content) => (
          <EducationCard
            key={content.id}
            thumbnail={content.thumbnail}
            level={content.level}
            title={content.title}
            description={content.description}
            onClick={() => handleCardClick(content)}
          />
        ))}
      </div>

      {/* Education Detail Modal */}
      <EducationDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedContent?.title || ""}
        level={selectedContent?.level || ""}
        description={selectedContent?.description || ""}
        videoUrl={selectedContent?.videoUrl || ""}
        content={selectedContent?.content || ""}
      />
    </div>
  );
};

export default FinancialEducation;