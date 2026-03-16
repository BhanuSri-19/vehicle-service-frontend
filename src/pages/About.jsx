import React from "react";

export default function About() {
    return (
        <div className="container">
            <h2>About 🚗</h2>

            <p style={{ color: "white", marginBottom: "15px", lineHeight: "1.6" }}>
                <strong>Vehicle Service Management</strong> is a simple and efficient platform
                designed to help customers book vehicle services, track their service history,
                and manage their vehicles with ease.
            </p>

            <p style={{ color: "white", marginBottom: "15px", lineHeight: "1.6" }}>
                Our platform allows you to:
            </p>

            <ul style={{ color: "white", textAlign: "left", marginBottom: "20px", lineHeight: "1.8" }}>
                <li>🔑 Register and Login securely</li>
                <li>🛠️ Book vehicle service appointments online</li>
                <li>📜 View your complete service history</li>
                <li>⚡ Manage your vehicle details from one dashboard</li>
            </ul>

            <p style={{ color: "white", marginBottom: "20px", lineHeight: "1.6" }}>
                Built with a focus on simplicity and reliability, this system helps both
                customers and service centers stay organized and connected.
            </p>

            <hr style={{ borderColor: "rgba(255,255,255,0.3)", marginBottom: "20px" }} />

            <p style={{ color: "white", fontSize: "0.95rem" }}>
                <strong>Developed by:</strong> KANDUKURI BHANU SRI
            </p>
        </div>
    );
}