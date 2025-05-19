const Background = ({ 
  children, 
  className = "", 
  bgColor = "bg-linear-[45deg,#1C2541,#3A506B_47%,#0B132B_90%]",
  fullHeight = true
}) => {
  return (
    <div 
      className={`w-full relative z-0 ${bgColor} bg-cover bg-center ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Background;