import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./App.css";

function Particles() {
  const colors = ["#ff6b35","#f59e0b","#00d4ff","#a855f7","#22c55e"];
  return (
    <div className="particles">
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${(i * 4.7 + Math.sin(i) * 10 + 100) % 100}%`,
          width:  `${4 + (i % 4) * 2}px`,
          height: `${4 + (i % 4) * 2}px`,
          background: colors[i % colors.length],
          animationDuration: `${10 + (i % 8) * 2}s`,
          animationDelay: `${(i * 1.3) % 12}s`,
          opacity: 0.3 + (i % 5) * 0.06,
        }} />
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ background: "#05050f", minHeight: "100vh" }}>
        <Particles />
        <div className="page-wrapper">
          <Navbar />
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
