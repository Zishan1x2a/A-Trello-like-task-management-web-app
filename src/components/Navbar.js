import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

 
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); 
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b shadow-sm">
      <h1
        className="text-3xl text-purple-700 ml-10"
        style={{ fontFamily: "'DM Serif Text', serif" }}
      >
        Task Board
      </h1>

      
      {user ? (
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className="text-gray-700 hover:text-purple-700">
          Log in
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
