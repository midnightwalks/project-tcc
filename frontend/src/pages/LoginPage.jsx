import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import backgroundImage from "../assets/bg.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(username, password);
      if (result) {
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo di atas */}
      <img
        src="/logo.png"
        alt="Logo"
        className="w-70 mb-3  drop-shadow-md"
      />

      {/* Container Form Login */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-purple-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-black">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-3 text-center text-red-500">{error}</p>}
        <p className="mt-6 text-center text-sm text-black">
          <Link to="/register" className="text-black-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
