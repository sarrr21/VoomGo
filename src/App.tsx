import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { DriverProfile } from "./pages/DriverProfile";
import ApprovalRequestDetail from "./pages/ApprovalRequestDetail";
import LoginPage from "./pages/login";



function AppContent() {
  const location = useLocation();


  const noLayoutPages = ["/login"];

  const isNoLayoutPage = noLayoutPages.includes(location.pathname);
  return isNoLayoutPage ? (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  ) : (

   
      <Layout>
        <Routes>
          
          <Route path="/" element={<Dashboard />} />
          <Route path="/drivers" element={<Dashboard />} />
          <Route path="/drivers/:id" element={<DriverProfile />} />
          <Route path="/approval-requests" element={<ApprovalRequestDetail />} />
          <Route
            path="/approval-requests/:id"
            element={<ApprovalRequestDetail />}
          />
          <Route
            path="/riders"
            element={<div className="p-6">Riders Page</div>}
          />
          <Route
            path="/pricing"
            element={<div className="p-6">Pricing Page</div>}
          />
          <Route
            path="/financials"
            element={<div className="p-6">Financials Page</div>}
          />
          <Route
            path="/support-disputes"
            element={<div className="p-6">Support & Disputes Page</div>}
          />
          <Route
            path="/loyalty"
            element={<div className="p-6">Loyalty & Rewards Page</div>}
          />
          <Route
            path="/settings"
            element={<div className="p-6">Settings Page</div>}
          />
          <Route path="/help" element={<div className="p-6">Help Page</div>} />
        </Routes>
      </Layout>
   
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}