import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { ToastProvider } from './components/ToastSystem';

// Import all page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PortfolioOverview from './pages/PortfolioOverview';
import YourInvestments from './pages/YourInvestments';
import ExpensesTracking from './pages/ExpensesTracking';
import FinancialGoals from './pages/FinancialGoals';
import FinancialEducation from './pages/FinancialEducation';
import AccountSettings from './pages/AccountSettings';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="font-[MuktaVaani]">
          <Background>
            <Navbar />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolio-overview" element={<PortfolioOverview />} />
                <Route path="/your-investments" element={<YourInvestments />} />
                <Route path="/expenses-tracking" element={<ExpensesTracking />} />
                <Route path="/financial-goals" element={<FinancialGoals />} />
                <Route path="/financial-education" element={<FinancialEducation />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </Layout>
          </Background>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
