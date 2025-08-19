import React, { useState } from "react";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(), 
          fullName,
          email,
          password,
        }),
      });

      alert("Signup Successful ✅");
      window.location.href = "/login"; 
    } catch (err) {
      console.error("Error:", err);
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 overflow-hidden flex justify-center items-start">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          <label className="block mb-2 text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
            required
          />

          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 cursor-pointer">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
