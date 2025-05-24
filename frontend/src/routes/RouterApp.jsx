import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";  // Import LandingPage baru
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import DaftarKonser from "../pages/DaftarKonser";
import Merchandise from "../pages/Merchandise";
import Documentation from "../pages/Documentation";
import ProtectedRoute from "../pages/ProtectedRoute";

function RouterApp() {
  return (
    <Router>
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<LandingPage />} />    {/* Landing page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Halaman terlindungi */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daftar-konser"
          element={
            <ProtectedRoute>
              <DaftarKonser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/merchandise"
          element={
            <ProtectedRoute>
              <Merchandise />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documentation"
          element={
            <ProtectedRoute>
              <Documentation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterApp;
