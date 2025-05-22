import LaptopDisplay from "/src/components/LandingComponents/LaptopDisplay";

// Import all feature icons
import IconUser from "/src/assets/images/FeaturesIcons/user-friendly.svg";
import IconSupport from "/src/assets/images/FeaturesIcons/customer-support.svg";
import IconSecure from "/src/assets/images/FeaturesIcons/security.svg";

// Features array
const features = [
  {
    icon: IconUser,
    title: 'User Friendly',
    description: 'Simple, clean, and easy to use – made for everyone, no finance background needed.',
  },
  {
    icon: IconSupport,
    title: 'Best Support',
    description: 'Quick, helpful support through chat, email, and FAQs—anytime you need it.',
  },
  {
    icon: IconSecure,
    title: 'Secure',
    description: 'Bank-level security with encryption and multi-factor login to keep your data safe.',
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full min-h-screen text-white flex items-center justify-center md:pt-0 pt-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-0 md:gap-10">
        {/* Left on desktop, Bottom on mobile: Laptop */}
        <div className="md:w-1/2 h-[300px] md:h-[600px] flex items-center justify-center">
          <LaptopDisplay />
        </div>

        {/* Right on desktop, Top on mobile: Text and Features */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Manage Your Finance Effortlessly
          </h2>
          <p className="text-base md:text-xl text-gray-200 mb-2 md:mb-8">
            Take control of your money with one easy-to-use platform.
          </p>

          {/* Feature List */}
          <div className="space-y-2 md:space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 md:gap-4 items-center">
                <div>
                  <img src={feature.icon} alt={feature.title} className="w-20 h-20" />
                </div>
                <div>
                  <h3 className="text-2xl text-[#6FFFE9] font-semibold">{feature.title}</h3>
                  <p className="text-gray-200 text-sm md:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;
