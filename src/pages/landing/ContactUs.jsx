import { useState } from 'react';
import Button from '/src/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

// Contact information object
const contactInfo = {
  email: "support@arthasva.com",
  phone: "+91 8459120961"
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.email) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Name and email are required fields.'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid email address.'
      });
      return;
    }

    // Here you would typically send the data to your backend
    // For demo purposes, we'll just show a success message
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div id="contact" className="py-24">
      <div className="max-w-7xl mx-auto bg-[#170D1C]/50 rounded-3xl p-8 backdrop-blur-lg shadow-2xl">
        <div className="flex flex-col md:flex-row md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-2/5 mb-8 md:mb-0">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-xl text-gray-300 mb-6">
              Get in touch with our team for personalized assistance with your financial needs.
            </p>
            <p className="text-gray-300 mb-4">
              Our team of experts is ready to help you navigate your financial journey with confidence.
            </p>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00718A] flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-white" />
                </div>
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-gray-300 hover:text-[#6FFFE9] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#00718A] flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-white" />
                </div>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} 
                  className="text-gray-300 hover:text-[#6FFFE9] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-3/5">
            {formStatus.submitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                <p>{formStatus.message}</p>
              </div>
            ) : formStatus.error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p>{formStatus.message}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6 md:bg-[#2D1F3A]/40 md:p-6 rounded-xl">
              <div>
                <label htmlFor="name" className="block text-gray-200 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-200 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                  placeholder="Your phone number (optional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <div className="flex justify-center">
                <Button
                  text="SUBMIT"
                  bgColor="#00718A"
                  hoverBgColor="#005d73"
                  className="!text-[#6FFFE9] text-base font-medium"
                  width="w-full md:w-1/3"
                  height="h-12"
                  rounded="rounded-full"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;