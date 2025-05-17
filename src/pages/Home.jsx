import React from 'react';
import Welcome from '../components/Welcome';
import Trending from '../components/Trending';

// Sample blog posts data
const blogPosts = [
    { title: "How to Master Personal Finance", backgroundColor: "#3A506B" },
    { title: "Investment Strategies for Beginners", backgroundColor: "#1C2541" },
    { title: "Understanding Cryptocurrency Markets", backgroundColor: "#5BC0BE" }
  ];

const Home = () => {
  return (
    <div>
      <Welcome />
      <Trending blogPosts={blogPosts}/>
      <div className='sm:h-0 h-6'></div>
    </div>
  );
};

export default Home;