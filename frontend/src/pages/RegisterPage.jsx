import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/utils.js";
import backgroundImage from "../assets/bg.png";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/register`,
        {
          username,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.data) {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-purple-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-black-600">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 p-3 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-400"
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
              className="w-full mt-2 p-3 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-black-700">
          <Link to="/login" className="text-black-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
