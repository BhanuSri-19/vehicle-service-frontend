import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";
import car7 from "../assets/car7.jpg";
import car8 from "../assets/car8.jpg";
import car9 from "../assets/car9.jpg";

// Hero slider: neon car + night garage + service illustration
const heroSlides = [car2, car6, car9, car3];

// Gallery strip: service related
const galleryItems = [
  { img: car7, label: "Service Center" },
  { img: car8, label: "Expert Mechanics" },
  { img: car4, label: "Diagnostics" },
  { img: car5, label: "Full Service" },
];

// Showcase images
const showcaseImgs = [car9, car6, car7];

export default function Home() {
  const navigate   = useNavigate();
  const isLoggedIn = !!localStorage.getItem("customerId");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % heroSlides.length), 3800);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon:"🔧", cls:"fc1", title:"Expert Mechanics",  desc:"Certified professionals with 10+ years across all vehicle brands." },
    { icon:"📅", cls:"fc2", title:"Easy Booking",      desc:"Schedule your service in seconds, pick date & time with zero hassle." },
    { icon:"📊", cls:"fc3", title:"Service History",   desc:"Full transparency — track every service & inspection in real-time." },
    { icon:"⚡", cls:"fc4", title:"Fast Turnaround",   desc:"Most services completed same day. Get back on the road quickly." },
  ];

  const services = [
    { icon:"🔩", name:"Engine Maintenance",   desc:"Full diagnostics & tune-up" },
    { icon:"🛞", name:"Tire & Wheel Service",  desc:"Rotation, balancing & alignment" },
    { icon:"🔋", name:"Battery Replacement",   desc:"Check, test & replace batteries" },
    { icon:"❄️", name:"AC & Cooling System",  desc:"Recharge & repair cooling" },
    { icon:"🔧", name:"Brake Service",         desc:"Pad, rotor & fluid service" },
    { icon:"🚗", name:"Full Vehicle Check",    desc:"100-point inspection" },
  ];

  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((s, i) => (
            <div key={i} className={`hero-slide ${i === activeSlide ? "active" : ""}`}
              style={{ backgroundImage:`url(${s})` }} />
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">🏁 #1 Vehicle Service Platform</div>
          <h1 className="hero-title">
            <span className="line1">Your Car</span><br />
            <span className="line2">Deserves</span><br />
            <span className="line3">The Best</span>
          </h1>
          <p className="hero-subtitle">
            Premium vehicle service management — book, track, and manage all your car services
            in one place. Fast, reliable, transparent.
          </p>
          <div className="hero-buttons">
            {isLoggedIn ? (
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>
                🏠 Go to Dashboard
              </button>
            ) : (
              <>
                <button className="btn-primary" onClick={() => navigate("/login")}>🔑 Login to Book</button>
                <button className="btn-secondary" onClick={() => navigate("/register")}>📝 Create Account</button>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat-item"><div className="stat-number">500+</div><div className="stat-label">Customers</div></div>
            <div className="stat-item"><div className="stat-number">98%</div><div className="stat-label">Satisfaction</div></div>
            <div className="stat-item"><div className="stat-number">24/7</div><div className="stat-label">Support</div></div>
            <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Services</div></div>
          </div>
        </div>

        {/* Floating showcase card */}
        <div className="hero-showcase">
          <div className="car-showcase-card">
            <img src={heroSlides[activeSlide]} alt="Vehicle" />
            <div className="car-showcase-overlay">
              <span className="car-showcase-label">VehicleServ Pro</span>
              <span className="car-showcase-status">Available Now</span>
            </div>
            {/* Slide dots */}
            <div style={{ position:"absolute", bottom:52, left:0, right:0, display:"flex", justifyContent:"center", gap:6 }}>
              {heroSlides.map((_,i) => (
                <div key={i} onClick={() => setActiveSlide(i)} style={{
                  width:i === activeSlide ? 22 : 8, height:8,
                  borderRadius:6, background: i === activeSlide ? "#ff6b35" : "rgba(255,255,255,.3)",
                  cursor:"pointer", transition:"all .3s"
                }} />
              ))}
            </div>
            <div className="glow-ring" />
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <div className="gallery-strip">
        {galleryItems.map((g, i) => (
          <div key={i} className="gallery-item">
            <img src={g.img} alt={g.label} />
            <div className="gallery-item-overlay">
              <span className="gallery-item-label">{g.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-header">
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">Everything Your Car Needs</h2>
          <p className="section-subtitle">All vehicle service needs in one seamless platform</p>
        </div>
        <div className="feature-cards">
          {features.map((f, i) => (
            <div key={i} className={`feature-card ${f.cls}`}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICE SHOWCASE ── */}
      <section className="service-showcase">
        <div className="section-header">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">World-Class Service</h2>
          <p className="section-subtitle">Professional care for every vehicle, every time</p>
        </div>
        <div className="showcase-grid">
          <div className="showcase-images">
            <div className="showcase-img-wrap" style={{ gridColumn:"span 2", aspectRatio:"16/7" }}>
              <img src={showcaseImgs[0]} alt="Service" />
            </div>
            <div className="showcase-img-wrap"><img src={showcaseImgs[1]} alt="Car" /></div>
            <div className="showcase-img-wrap"><img src={showcaseImgs[2]} alt="Team" /></div>
          </div>
          <div className="showcase-text">
            <h3>Premium Care For Your <span style={{ color:"#00d4ff" }}>Vehicle</span></h3>
            <p>Our state-of-the-art service center combines cutting-edge diagnostics with
              experienced technicians to keep your vehicle at peak performance.</p>
            <div className="service-list">
              {services.map((s, i) => (
                <div key={i} className="service-item">
                  <span className="service-item-icon">{s.icon}</span>
                  <div className="service-item-text">
                    <strong>{s.name}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary"
              onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}>
              {isLoggedIn ? "🛠️ Book a Service" : "🔑 Login & Book Now"}
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {!isLoggedIn && (
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of satisfied customers managing their vehicle services with us</p>
          <div className="cta-btns">
            <button className="btn-primary"  onClick={() => navigate("/register")}>📝 Create Free Account</button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>🔑 Login</button>
          </div>
        </section>
      )}
    </div>
  );
}
