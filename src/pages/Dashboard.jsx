import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServiceHistory, bookService } from "../api/api";

// ── Inline BookService (no navigation, uses passed customerId) ──────────────
function BookServicePanel({ customerId, onBooked }) {
  const [vehicleModel, setVehicleModel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [bookingDate, setBookingDate]   = useState("");
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [error, setError]               = useState("");

  const serviceTypes = [
    "Oil Change","Brake Service","Tire Rotation","Engine Tuning",
    "AC Service","Battery Replacement","Wheel Alignment","Full Service","Custom",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleModel || !serviceType || !bookingDate) {
      setError("Please fill all fields before booking."); return;
    }
    setError(""); setLoading(true);
    try {
      await bookService({
        vehicleModel, serviceType,
        status: "Pending", bookingDate,
        customer: { id: customerId },
      });
      setSuccess(true);
      setVehicleModel(""); setServiceType(""); setBookingDate("");
      if (onBooked) onBooked();
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="db-section-body">
      <div className="db-book-card">
        {/* Decorative header strip */}
        <div className="db-book-header">
          <div className="db-book-header-icon">🛠️</div>
          <div>
            <h2 className="db-book-title">Book a Service</h2>
            <p className="db-book-sub">Schedule your vehicle service with us</p>
          </div>
        </div>

        {success && (
          <div className="db-alert db-alert-success">
            ✅ Service booked successfully! We'll get in touch soon.
          </div>
        )}
        {error && (
          <div className="db-alert db-alert-error">⚠ {error}</div>
        )}

        <form onSubmit={handleSubmit} className="db-book-form">
          <div className="db-form-row">
            <div className="form-group">
              <label className="form-label">Vehicle Model</label>
              <input type="text" className="form-input"
                placeholder="e.g. Honda City 2022, Toyota Fortuner"
                value={vehicleModel}
                onChange={e => setVehicleModel(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select className="form-input" value={serviceType}
                onChange={e => setServiceType(e.target.value)}
                required style={{ cursor: "pointer" }}>
                <option value="">Select a service...</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Date & Time</label>
            <input type="datetime-local" className="form-input"
              value={bookingDate}
              onChange={e => setBookingDate(e.target.value)} required />
          </div>

          {/* Service cards preview */}
          <div className="db-service-picks">
            {["Oil Change","Brake Service","AC Service","Full Service"].map(s => (
              <button key={s} type="button"
                className={`db-service-pick ${serviceType === s ? "active" : ""}`}
                onClick={() => setServiceType(s)}>
                {s === "Oil Change" ? "🛢️" : s === "Brake Service" ? "🔧" : s === "AC Service" ? "❄️" : "⚙️"} {s}
              </button>
            ))}
          </div>

          <button type="submit" className="submit-btn db-submit" disabled={loading}>
            {loading ? "⏳ Booking..." : "📅 Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Inline ServiceHistory ───────────────────────────────────────────────────
const iconMap  = ["🔧","🛞","⚡","🔋","❄️","🔩","🚗","⚙️"];
const iconBgMap= ["icon-bg-orange","icon-bg-purple","icon-bg-cyan","icon-bg-green"];

function getStatusClass(s) {
  if (!s) return "status-default";
  const v = s.toLowerCase();
  if (v === "pending")   return "status-pending";
  if (v === "completed") return "status-completed";
  if (v === "cancelled") return "status-cancelled";
  return "status-default";
}

function ServiceHistoryPanel({ bookings, loading }) {
  const pending   = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const completed = bookings.filter(b => b.status?.toLowerCase() === "completed").length;

  if (loading) return (
    <div style={{ textAlign:"center", padding:"60px", color:"#94a3b8" }}>
      <div style={{ fontSize:"3rem", marginBottom:16, display:"inline-block",
        animation:"spin-slow 1s linear infinite" }}>⚙️</div>
      <p>Loading your service history...</p>
    </div>
  );

  return (
    <div className="db-section-body">
      {/* Count banner */}
      <div className="booking-count-banner">
        <div className="booking-count-number">{bookings.length}</div>
        <div className="booking-count-text">
          <strong>{bookings.length === 1 ? "Total Booking" : "Total Bookings"}</strong>
          <span>{bookings.length === 0
            ? "No bookings yet — book your first service!"
            : "All your vehicle service records are listed below"}</span>
        </div>
        <div style={{ marginLeft:"auto", fontSize:"3rem", opacity:.28 }}>🚗</div>
      </div>

      {/* Mini stats */}
      {bookings.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Pending",   count:pending,             color:"#f59e0b" },
            { label:"Completed", count:completed,           color:"#22c55e" },
            { label:"Total",     count:bookings.length,     color:"#00d4ff" },
          ].map((s,i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,.03)",
              border:`1px solid ${s.color}33`,
              borderRadius:14, padding:"16px 20px",
              textAlign:"center",
              animation:`cardPop .5s ease ${i*.1}s both`,
            }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:"1.8rem", fontWeight:900, color:s.color }}>
                {s.count}
              </div>
              <div style={{ color:"#94a3b8", fontSize:".78rem", textTransform:"uppercase", letterSpacing:"1px", marginTop:4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>
          <h3>No Bookings Found</h3>
          <p>You haven't booked any services yet. Use "Book Service" to get started!</p>
        </div>
      ) : (
        <div className="history-grid">
          {bookings.map((b, i) => (
            <div className="booking-card" key={b.id || i} style={{ animationDelay:`${i*.07}s` }}>
              <div className={`booking-card-icon ${iconBgMap[i % iconBgMap.length]}`}>
                {iconMap[i % iconMap.length]}
              </div>
              <div className="booking-card-info">
                <h4>{b.vehicleModel || "Unknown Vehicle"}</h4>
                <p>{b.serviceType  || "General Service"}</p>
              </div>
              <div className="booking-card-right">
                <div className={`status-badge ${getStatusClass(b.status)}`}>{b.status || "Unknown"}</div>
                <div className="booking-date">
                  {b.bookingDate
                    ? new Date(b.bookingDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})
                    : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [section,  setSection]  = useState("home");
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const fetchHistory = () => {
    if (!customerId) return;
    getServiceHistory(customerId)
      .then(res => setBookings(res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!customerId) { navigate("/login"); return; }
    fetchHistory();
  }, [customerId]);

  if (!customerId) return null;

  const pending   = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const completed = bookings.filter(b => b.status?.toLowerCase() === "completed").length;
  const lastService = bookings.length > 0
    ? new Date(bookings[bookings.length-1].bookingDate)
        .toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})
    : "None yet";

  const tabs = [
    { id:"home",    label:"🏠 Overview",        icon:"🏠" },
    { id:"book",    label:"🛠️ Book Service",     icon:"🛠️" },
    { id:"history", label:"📜 Service History",  icon:"📜" },
  ];

  return (
    <div className="dashboard-page">
      {/* ── Sidebar ── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-profile">
          <div className="db-avatar">
            <span>👤</span>
          </div>
          <div>
            <div className="db-avatar-name">Customer</div>
            <div className="db-avatar-id">ID #{customerId}</div>
          </div>
        </div>

        <div className="db-sidebar-status">
          <span className="db-dot"></span> Account Active
        </div>

        <nav className="db-sidebar-nav">
          {tabs.map(t => (
            <button key={t.id}
              className={`db-nav-item ${section === t.id ? "active" : ""}`}
              onClick={() => setSection(t.id)}>
              <span className="db-nav-icon">{t.icon}</span>
              <span className="db-nav-label">{
                t.id === "home" ? "Overview" :
                t.id === "book" ? "Book Service" :
                "Service History"
              }</span>
              {t.id === "history" && bookings.length > 0 && (
                <span className="db-nav-badge">{bookings.length}</span>
              )}
              {t.id === "book" && pending > 0 && (
                <span className="db-nav-badge db-nav-badge-warn">{pending}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="db-sidebar-stats">
          <div className="db-ss-item">
            <span className="db-ss-val">{bookings.length}</span>
            <span className="db-ss-lbl">Total</span>
          </div>
          <div className="db-ss-item">
            <span className="db-ss-val" style={{ color:"#f59e0b" }}>{pending}</span>
            <span className="db-ss-lbl">Pending</span>
          </div>
          <div className="db-ss-item">
            <span className="db-ss-val" style={{ color:"#22c55e" }}>{completed}</span>
            <span className="db-ss-lbl">Done</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="db-main">
        {/* Top bar */}
        <div className="db-topbar">
          <div>
            <h1 className="dashboard-title">
              {section === "home" ? "Dashboard Overview"
               : section === "book" ? "Book a Service"
               : "Service History"}
            </h1>
            <p className="dashboard-sub">
              {section === "home" ? "Welcome back! Here's your vehicle service summary."
               : section === "book" ? "Schedule a new service appointment."
               : `${bookings.length} booking${bookings.length !== 1 ? "s" : ""} on record.`}
            </p>
          </div>
          <div className="db-topbar-actions">
            <button className="db-quick-book" onClick={() => setSection("book")}>
              + New Booking
            </button>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {section === "home" && (
          <div style={{ animation:"fadeIn .4s ease" }}>
            {/* Stats row */}
            <div className="stats-grid" style={{ marginBottom:28 }}>
              {[
                { icon:"📅", val:bookings.length, lbl:"Total Bookings", cls:"sc1" },
                { icon:"⏳", val:pending,          lbl:"Pending",        cls:"sc2" },
                { icon:"✅", val:completed,        lbl:"Completed",      cls:"sc3" },
                { icon:"🕐", val:lastService,      lbl:"Last Service",   cls:"sc4", small:true },
              ].map((s,i) => (
                <div key={i} className={`stat-card ${s.cls}`} style={{ animationDelay:`${i*.1}s` }}>
                  <div className="stat-card-icon">{s.icon}</div>
                  <div className="stat-card-value" style={s.small?{fontSize:"1rem"}:{}}>{s.val}</div>
                  <div className="stat-card-label">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Info + actions */}
            <div className="welcome-grid">
              {/* Account info */}
              <div className="welcome-card db-info-card">
                <h3>👤 Account Information</h3>
                {[
                  { k:"Customer ID",   v:`#${customerId}` },
                  { k:"Status",        v:<span className="info-badge badge-active">● Active</span> },
                  { k:"Total Bookings",v:`${bookings.length} services` },
                  { k:"Pending",       v:<span className="info-badge badge-pending">{pending} pending</span> },
                  { k:"Completed",     v:<span className="info-badge badge-done">{completed} done</span> },
                  { k:"Last Service",  v:lastService },
                ].map(({ k, v }, i) => (
                  <div className="customer-info-row" key={i}>
                    <span className="info-key">{k}</span>
                    <span className="info-value">{v}</span>
                  </div>
                ))}
              </div>

              {/* Quick actions + breakdown */}
              <div>
                <div className="welcome-card" style={{ marginBottom:16 }}>
                  <h3>⚡ Quick Actions</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:10 }}>
                    <button className="submit-btn" style={{ marginTop:0 }}
                      onClick={() => setSection("book")}>
                      🛠️ Book New Service
                    </button>
                    <button className="db-outline-btn"
                      onClick={() => { setSection("history"); fetchHistory(); }}>
                      📜 View Service History
                    </button>
                  </div>
                </div>

                {/* Breakdown chart */}
                <div className="welcome-card db-breakdown-card">
                  <h3>📊 Service Breakdown</h3>
                  {bookings.length === 0 ? (
                    <p style={{ color:"#94a3b8", fontSize:".85rem", marginTop:8 }}>
                      No bookings yet.
                    </p>
                  ) : (
                    <>
                      <div className="db-bar-track">
                        {pending   > 0 && <div className="db-bar-seg db-bar-pending"   style={{ flex:pending }}/>}
                        {completed > 0 && <div className="db-bar-seg db-bar-completed" style={{ flex:completed }}/>}
                        {(bookings.length-pending-completed) > 0 &&
                          <div className="db-bar-seg db-bar-other"
                            style={{ flex:bookings.length-pending-completed }}/>}
                      </div>
                      <div className="db-bar-legend">
                        <span><span style={{ color:"#f59e0b" }}>●</span> {pending} Pending</span>
                        <span><span style={{ color:"#22c55e" }}>●</span> {completed} Completed</span>
                        <span><span style={{ color:"#00d4ff" }}>●</span> {bookings.length} Total</span>
                      </div>
                      {/* Recent bookings preview */}
                      <div className="db-recent-list">
                        {bookings.slice(-3).reverse().map((b, i) => (
                          <div key={i} className="db-recent-item">
                            <span className="db-recent-icon">{iconMap[i % iconMap.length]}</span>
                            <div className="db-recent-text">
                              <strong>{b.vehicleModel}</strong>
                              <span>{b.serviceType}</span>
                            </div>
                            <span className={`status-badge ${getStatusClass(b.status)}`} style={{ fontSize:".65rem" }}>
                              {b.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BOOK SERVICE ── */}
        {section === "book" && (
          <BookServicePanel
            customerId={customerId}
            onBooked={() => { fetchHistory(); }}
          />
        )}

        {/* ── SERVICE HISTORY ── */}
        {section === "history" && (
          <ServiceHistoryPanel bookings={bookings} loading={loading} />
        )}
      </main>
    </div>
  );
}
