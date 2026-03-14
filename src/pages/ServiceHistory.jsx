import { useEffect, useState } from "react";
import { getServiceHistory } from "../api/api";

const iconMap = ["🔧","🛞","⚡","🔋","❄️","🔩","🚗","⚙️"];
const iconBgMap = ["icon-bg-orange","icon-bg-purple","icon-bg-cyan","icon-bg-green"];

function getStatusClass(status) {
  if (!status) return "status-default";
  const s = status.toLowerCase();
  if (s === "pending") return "status-pending";
  if (s === "completed") return "status-completed";
  if (s === "cancelled") return "status-cancelled";
  return "status-default";
}

export default function ServiceHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!customerId) { setLoading(false); return; }
    getServiceHistory(customerId)
      .then(res => setBookings(res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [customerId]);

  if (loading) return (
    <div style={{textAlign:'center',padding:'60px',color:'#94a3b8'}}>
      <div style={{fontSize:'3rem',marginBottom:16,animation:'spin-slow 1s linear infinite',display:'inline-block'}}>⚙️</div>
      <p>Loading your service history...</p>
    </div>
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>📜 Service History</h2>
        <p>All your past and upcoming vehicle service bookings</p>
      </div>

      {/* Booking count banner */}
      <div className="booking-count-banner">
        <div className="booking-count-number">{bookings.length}</div>
        <div className="booking-count-text">
          <strong>{bookings.length === 1 ? "Total Booking" : "Total Bookings"}</strong>
          <span>{bookings.length === 0 ? "No bookings yet — book your first service!" : "All your vehicle service records are listed below"}</span>
        </div>
        <div style={{marginLeft:'auto',fontSize:'3rem',opacity:0.3}}>🚗</div>
      </div>

      {/* Mini stats from bookings */}
      {bookings.length > 0 && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:24}}>
          {[
            { label:'Pending', count: bookings.filter(b=>b.status?.toLowerCase()==='pending').length, color:'#f59e0b' },
            { label:'Completed', count: bookings.filter(b=>b.status?.toLowerCase()==='completed').length, color:'#22c55e' },
            { label:'Total', count: bookings.length, color:'#00d4ff' },
          ].map((s,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.03)', border:`1px solid ${s.color}33`,
              borderRadius:14, padding:'16px 20px', textAlign:'center', animation:`cardPop 0.5s ease ${i*0.1}s both`
            }}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:'1.8rem',fontWeight:900,color:s.color}}>{s.count}</div>
              <div style={{color:'#94a3b8',fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'1px',marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>
          <h3>No Bookings Found</h3>
          <p>You haven't booked any services yet. Click "Book Service" to get started!</p>
        </div>
      ) : (
        <div className="history-grid">
          {bookings.map((b, i) => (
            <div className="booking-card" key={b.id || i} style={{animationDelay:`${i*0.07}s`}}>
              <div className={`booking-card-icon ${iconBgMap[i % iconBgMap.length]}`}>
                {iconMap[i % iconMap.length]}
              </div>
              <div className="booking-card-info">
                <h4>{b.vehicleModel || "Unknown Vehicle"}</h4>
                <p>{b.serviceType || "General Service"}</p>
              </div>
              <div className="booking-card-right">
                <div className={`status-badge ${getStatusClass(b.status)}`}>{b.status || "Unknown"}</div>
                <div className="booking-date">
                  {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN', {
                    day:'numeric', month:'short', year:'numeric'
                  }) : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
