import React, { useState } from 'react'
import BlogpostCard from './BlogpostCard'
import BlogpostDetailModal from '../modals/BlogpostDetailModal'

const Trending = ({blogPosts}) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openBlogpostModal = (post) => {
    setSelectedPost(post);
  };

  const closeBlogpostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="mt-4 px-3 sm:px-4">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Trending</h2>
      </div>
      
      {/* Responsive grid for blog posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {blogPosts.map((post, index) => (
          <div 
            key={index} 
            className="cursor-pointer transition-transform hover:scale-[1.02]" 
            onClick={() => openBlogpostModal(post)}
          >
            <BlogpostCard 
              title={post.title}
              backgroundColor={post.backgroundColor}
              backgroundImage={post.image || post.backgroundImage}
            />
          </div>
        ))}
      </div>
      
      {/* View More button centered */}
      <div className="flex justify-center mt-3 sm:mt-4">
        <button className="text-[#6FFFE9] hover:text-[#6FFFE9]/50 font-medium transition-colors duration-300 text-sm sm:text-base">
          View More &gt;&gt;
        </button>
      </div>

      {/* Blogpost Detail Modal */}
      <BlogpostDetailModal
        isOpen={selectedPost !== null}
        onClose={closeBlogpostModal}
        title={selectedPost?.title}
        image={selectedPost?.image || selectedPost?.backgroundImage}
        date={selectedPost?.date || "May 22, 2025"}
        author={selectedPost?.author || "Arthasva Team"}
        description={selectedPost?.description || "Learn more about this important financial topic."}
        content={selectedPost?.content || "<p>This article will teach you the fundamentals of this important financial topic. Stay tuned for more detailed content.</p>"}
      />
    </div>
  )
}
export default Trending