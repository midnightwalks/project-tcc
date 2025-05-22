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
      <div className="relative z-10 text-white px-6">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome</h1>
        <p className="text-lg mb-10 drop-shadow-md max-w-xl mx-auto">
          Selamat datang di aplikasi kami! Temukan kemudahan dan kenyamanan di sini.
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
