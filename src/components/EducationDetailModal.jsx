import React from 'react';
import Modal from './modals/Modal';

const EducationDetailModal = ({ 
  isOpen, 
  onClose, 
  title, 
  level, 
  description, 
  videoUrl,
  content
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        
        {/* Level badge */}
        <div className="flex items-center">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${level === 'Beginner' ? 'bg-green-500' : 
              level === 'Intermediate' ? 'bg-yellow-500' : 
              level === 'Advanced' ? 'bg-red-500' : 'bg-blue-500'} 
            text-white
          `}>
            {level}
          </span>
        </div>
        
        {/* YouTube video if provided */}
        {videoUrl && (
          <div className="w-full aspect-video overflow-hidden rounded-lg">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl.includes('youtube.com') 
                ? videoUrl.replace('watch?v=', 'embed/') 
                : videoUrl.includes('youtu.be')
                  ? `https://www.youtube.com/embed/${videoUrl.split('/').pop()}`
                  : videoUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        {/* Description */}
        <div className="text-lg text-gray-300">
          {description}
        </div>
        
        {/* Detailed content */}
        {content && (
          <div className="mt-4 text-gray-200">
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

export default EducationDetailModal;