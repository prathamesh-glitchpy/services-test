const Card = ({ 
  children, 
  className = "", 
  bgColor = "bg-linear-[45deg,#1e2b45_31%,#273b64_50%,#44818d_76%,#4a9a9c_100%]",
  width = "w-full",
  height = "h-auto",
  padding = "p-3 sm:p-4",
  rounded = "rounded-[15px] sm:rounded-[25px]",
  
}) => {
  return (
    <div 
      className={`relative z-0 ${bgColor} bg-cover bg-center ${width} ${height} ${padding} ${rounded} ${className}`}
    >
      {children}
    </div>
  );
};
  
export default Card;