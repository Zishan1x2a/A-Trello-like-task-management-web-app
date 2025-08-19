import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const res = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        
        localStorage.setItem("user", JSON.stringify(data[0]));

        
        window.dispatchEvent(new Event("storage"));

        alert("Login Successful 🎉");
        navigate("/boards"); // 
      } else {
        alert("Invalid Email or Password ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 overflow-hidden flex justify-center items-start">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
            required
          />

          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign in with Email
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
