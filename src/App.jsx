import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Background from './components/common/Background';
import Navbar from './components/common/Navbar';
import Layout from './components/common/Layout';
import { ToastProvider } from './components/common/ToastSystem';
import ScrollToTop from './components/common/ScrollToTop';

// Import all page components
import Home from './pages/user/Home';
import Dashboard from './pages/user/Dashboard';
import PortfolioOverview from './pages/user/PortfolioOverview';
import YourInvestments from './pages/user/YourInvestments';
import ExpensesTracking from './pages/user/ExpensesTracking';
import FinancialGoals from './pages/user/FinancialGoals';
import FinancialEducation from './pages/user/FinancialEducation';
import AccountSettings from './pages/user/AccountSettings';
import Logout from './pages/user/Logout';

// Import landing page components
import LandingNavbar from './components/landingComponents/LandingNavbar';
import LandingBackground from './components/landingComponents/LandingBackground';
import Login from './pages/landing/Login';
import Register from './pages/landing/Register';
import Hero from './pages/landing/Hero';
import Features from './pages/landing/Features';
import Benefits from './pages/landing/Benefits';
import Services from './pages/landing/Services';
import ContactUs from './pages/landing/ContactUs';
import ComingSoon from './pages/landing/ComingSoon';
import LandingFooter from './components/landingComponents/LandingFooter';

function DashboardLayout() {
	return (
	  <Background>
		<Navbar />
		<Layout>
		  <Outlet />
		</Layout>
	  </Background>
	);
  }

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <div className="font-[MuktaVaani]">
          {/* Auth routes without navbar */}
          <Routes>
            <Route path="/login" element={
              <div className="font-[MuktaVaani]">
                <LandingBackground>
                  <Login />
                </LandingBackground>
              </div>
            } />
            <Route path="/register" element={
              <div className="font-[MuktaVaani]">
                <LandingBackground>
                  <Register />
                </LandingBackground>
              </div>
            } />

            {/* Main routes with navbar */}
            <Route path="/" element={
              <div className="font-[MuktaVaani]">
                <LandingNavbar />
                <LandingBackground>
                  <div className="container mx-auto px-4">
                    <Routes>
                      <Route path="/" element={<>
                        <Hero />
                        <Features />
                        <Benefits />
                        <Services />
                        <ContactUs />
                        <LandingFooter />
                      </>} />
                      
                      {/* Catch-all route for undefined paths */}
                      <Route path="*" element={<ComingSoon />} />
                    </Routes>
                  </div>
                </LandingBackground>
              </div>
            } />
            
            {/* Dashboard routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio-overview" element={<PortfolioOverview />} />
              <Route path="/your-investments" element={<YourInvestments />} />
              <Route path="/expenses-tracking" element={<ExpensesTracking />} />
              <Route path="/financial-goals" element={<FinancialGoals />} />
              <Route path="/financial-education" element={<FinancialEducation />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            
            {/* Catch-all route for root level undefined paths */}
            <Route path="*" element={
              <div className="font-[MuktaVaani]">
                <LandingNavbar />
                <LandingBackground>
                  <div className="container mx-auto px-4">
                    <ComingSoon />
                    <LandingFooter />
                  </div>
                </LandingBackground>
              </div>
            } />
          </Routes>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
