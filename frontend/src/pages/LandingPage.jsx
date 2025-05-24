import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // arahkan ke halaman LoginPage
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Konten utama */}
      <div className="relative z-10 text-white px-6 flex flex-col items-center">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-150 drop-shadow-md"
        />
        <p className="text-lg mb-3 drop-shadow-md max-w-xl mx-auto">
          Selamat datang di aplikasi kami! 
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-[#3D365C] hover:bg-[#2b2742] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
