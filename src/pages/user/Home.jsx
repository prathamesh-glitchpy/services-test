import React from 'react';
import Welcome from '/src/components/userComponents/Welcome';
import Trending from '/src/components/userComponents/Trending';

// Import images
import personalFinanceImg from '/src/assets/images/BlogImages/personalFinance.webp';
import investmentStrategiesImg from '/src/assets/images/BlogImages/invertmentStrategies.webp';
import cryptocurrencyImg from '/src/assets/images/BlogImages/cryptocurrency.webp';

// Sample blog posts data
const blogPosts = [
    { 
      title: "How to Master Personal Finance", 
      backgroundColor: "#3A506B",
      image: personalFinanceImg,
      author: "Arthasva Team",
      date: "May 20, 2025",
      description: "Learn the essential steps to take control of your personal finances and build a secure financial future.",
      content: `
        <p>Personal finance management is the cornerstone of financial freedom. This comprehensive guide will walk you through the essential steps to master your personal finances and set yourself up for long-term success.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">1. Create a Budget That Works</h3>
        <p>The foundation of personal finance is a realistic budget. Track your income and expenses to understand where your money goes each month. Use the 50/30/20 rule as a starting point: allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">2. Build an Emergency Fund</h3>
        <p>Before focusing on investments, establish an emergency fund that covers 3-6 months of essential expenses. This financial buffer protects you from unexpected situations and prevents you from going into debt when emergencies arise.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">3. Tackle High-Interest Debt</h3>
        <p>High-interest debt, especially credit card debt, can derail your financial progress. Focus on paying down these debts using either the avalanche method (highest interest first) or the snowball method (smallest balance first).</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">4. Start Investing Early</h3>
        <p>The power of compound interest means the earlier you start investing, the better. Even small regular contributions can grow significantly over time. Consider tax-advantaged accounts like 401(k)s and IRAs.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">5. Continuously Educate Yourself</h3>
        <p>Financial literacy is an ongoing journey. Stay informed about money management, investment strategies, and economic trends through books, podcasts, and reputable financial websites.</p>
      `
    },
    { 
      title: "Investment Strategies for Beginners", 
      backgroundColor: "#1C2541",
      image: investmentStrategiesImg,
      author: "Arthasva Team",
      date: "May 15, 2025",
      description: "A beginner's guide to building a diversified investment portfolio with minimal risk.",
      content: `
        <p>If you're new to investing, the financial markets can seem intimidating. This guide breaks down essential investment strategies that beginners can use to start building wealth with confidence.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">1. Define Your Investment Goals</h3>
        <p>Before investing, clarify what you're investing for: retirement, a home purchase, education, or other goals. Your timeframe and risk tolerance will shape your investment strategy.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">2. Understand Asset Allocation</h3>
        <p>Asset allocation—dividing your investments among stocks, bonds, and other assets—determines most of your returns. Consider your age, goals, and risk tolerance when deciding your allocation.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">3. Embrace Diversification</h3>
        <p>Don't put all your eggs in one basket. Spread your investments across different sectors, company sizes, and geographic regions to reduce risk.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">4. Consider Index Funds</h3>
        <p>For beginners, low-cost index funds offer instant diversification and typically outperform actively managed funds over the long term. They're a simple way to own a slice of the entire market.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">5. Start with Dollar-Cost Averaging</h3>
        <p>Invest fixed amounts at regular intervals regardless of market conditions. This strategy reduces the impact of market volatility and removes the stress of trying to time the market.</p>
      `
    },
    { 
      title: "Understanding Cryptocurrency Markets", 
      backgroundColor: "#5BC0BE",
      image: cryptocurrencyImg,
      author: "Arthasva Team",
      date: "May 18, 2025",
      description: "Demystifying blockchain technology and cryptocurrency investments for cautious investors.",
      content: `
        <p>Cryptocurrency has evolved from a niche interest to a significant part of the financial landscape. This guide helps you understand the fundamentals of crypto markets and how they might fit into your investment strategy.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">1. Blockchain Fundamentals</h3>
        <p>Blockchain is the underlying technology of cryptocurrencies—a decentralized, distributed ledger that records transactions across many computers. This structure makes it secure and resistant to modification.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">2. Major Cryptocurrencies</h3>
        <p>While Bitcoin was the first cryptocurrency, thousands now exist. Each serves different purposes: Bitcoin as a store of value, Ethereum for smart contracts, and others for specific applications or industries.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">3. Volatility and Risk</h3>
        <p>Crypto markets are highly volatile, with significant price swings common. Most financial advisors suggest limiting crypto investments to a small percentage of your portfolio that you can afford to lose.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">4. Security Best Practices</h3>
        <p>If you invest in crypto, security is paramount. Use reputable exchanges, enable two-factor authentication, and consider hardware wallets for significant holdings.</p>
        
        <h3 class="text-xl font-bold text-white mt-4 mb-2">5. Regulatory Landscape</h3>
        <p>Cryptocurrency regulations vary by country and continue to evolve. Stay informed about regulatory changes in your jurisdiction, as they can significantly impact the market.</p>
      `
    }
  ];

const Home = () => {
  return (
    <div>
      <Welcome />
      <Trending blogPosts={blogPosts}/>
    </div>
  );
};

export default Home;