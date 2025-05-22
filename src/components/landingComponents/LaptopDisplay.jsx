import laptopImage from '/src/assets/images/DisplayImages/Mock_laptop.webp';
import ellipseLarge from '/src/assets/images/DisplayImages/Ellipse_large.webp';
import ellipseSmall from '/src/assets/images/DisplayImages/Ellipse_small.webp';

const LaptopDisplay = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      {/* Background Ellipses */}
      <div className="absolute w-full h-full flex justify-center items-center z-10">
        <img 
          src={ellipseLarge} 
          alt="Background Circle" 
          className="absolute max-w-[85%] max-h-[85%] object-contain z-10"
        />
        <img 
          src={ellipseSmall} 
          alt="Small Background Circle" 
          className="absolute max-w-[40%] max-h-[40%] left-[5%] md:left-[15%] bottom-[20%] md:bottom-[10%] object-contain z-10"
        />
      </div>
      
      <div className="relative z-20 left-[7.5%] max-w-[90%] md:max-w-[75%] flex justify-center">
        <img 
          src={laptopImage} 
          alt="Analytics Dashboard" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default LaptopDisplay;