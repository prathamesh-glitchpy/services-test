import React from 'react';
import Modal from './Modal';

const BlogpostDetailModal = ({ 
  isOpen, 
  onClose, 
  title,
  image,
  date,
  author,
  description,
  content
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col gap-6">
        {/* Image banner */}
        {image && (
          <div className="w-full aspect-[16/9] overflow-hidden rounded-lg -mt-1 -mx-1">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        
        {/* Metadata row - author, date */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          {author && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{author}</span>
            </div>
          )}
          
          {date && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <div className="text-lg text-gray-300 leading-relaxed">
            {description}
          </div>
        )}
        
        {/* Divider */}
        <hr className="border-gray-700 my-2" />
        
        {/* Detailed content */}
        {content && (
          <div className="mt-4 text-gray-200 leading-relaxed">
            {typeof content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              content
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BlogpostDetailModal;