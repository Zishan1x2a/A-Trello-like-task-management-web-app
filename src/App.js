import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";   
import SignUp from "./pages/SignUp";
import Boards from "./pages/Boards";   
import BoardDetail from "./pages/BoardDetail";  
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<BoardDetail />} /> 
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
