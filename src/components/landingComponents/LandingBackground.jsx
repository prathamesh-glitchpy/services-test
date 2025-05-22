const LandingBackground = ({ 
	children, 
	className = "", 
	bgColor = "bg-linear-[45deg,#1C2541,#3A506B_47%,#0B132B_90%]",
	fullHeight = true
  }) => {
	return (
	  <div className="relative w-full">
		{/* Fixed background that stays in place */}
		<div 
		  className={`fixed top-0 left-0 w-full h-screen ${bgColor} bg-cover bg-center z-0`}
		/>
		
		{/* Scrollable content container */}
		<div 
		  className={`relative z-10 w-full ${fullHeight ? 'min-h-screen' : ''} ${className}`}
		>
		  {children}
		</div>
	  </div>
	);
  };
  
  export default LandingBackground;