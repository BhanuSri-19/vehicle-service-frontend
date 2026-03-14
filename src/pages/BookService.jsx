import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password, phone });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">📝</span>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us and start managing your vehicle services</p>
        </div>

        {error && <div className="error-msg">⚠ {error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="John Doe"
              value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-input" placeholder="+91 98765 43210"
              value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "🚀 Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>Login here</span>
        </div>
      </div>
    </div>
  );
}
