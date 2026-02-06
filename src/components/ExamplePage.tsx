/**
 * EXAMPLE: Using DashboardSimulation in a real page
 * 
 * This shows how to integrate the dashboard into a landing page
 * with scroll-triggered animation.
 */

import DashboardSimulation from './PlatformShowcase';
import '../style/PlatformShowcase.css';

export default function ExamplePage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Financial Observability Platform</h1>
        <p>Real-time detection of revenue integrity issues</p>
        <div className="scroll-hint">Scroll down to see the demo ↓</div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔍 Automated Detection</h3>
            <p>AI-powered analysis of your financial systems</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Real-time Alerts</h3>
            <p>Instant notifications for revenue discrepancies</p>
          </div>
          <div className="feature-card">
            <h3>📊 Root Cause Analysis</h3>
            <p>Drill down to transaction-level details</p>
          </div>
        </div>
      </section>

      {/* DEMO SECTION - Dashboard Simulation */}
      <section className="demo-section" id="live-demo">
        <div className="demo-header">
          <h2>See It In Action</h2>
          <p>Watch as our AI agent analyzes your financial data in real-time</p>
        </div>
        
        {/* THE DASHBOARD COMPONENT */}
        <div className="dashboard-wrapper">
          <DashboardSimulation />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to secure your revenue?</h2>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Zavvis. All rights reserved.</p>
      </footer>

      {/* Styles for this example page */}
      <style>{`
        .landing-page {
          background: #0a0a14;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        section {
          padding: 80px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #4a9eff, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 1.5rem;
          color: #a8a8c0;
          margin-bottom: 40px;
        }

        .scroll-hint {
          color: #6b6b85;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .features {
          background: rgba(255,255,255,0.02);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .feature-card {
          background: rgba(18, 18, 31, 0.8);
          border: 1px solid #2a2a40;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        .feature-card p {
          color: #a8a8c0;
        }

        .demo-section {
          padding: 40px 20px;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .demo-header h2 {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .demo-header p {
          color: #a8a8c0;
          font-size: 1.1rem;
        }

        .dashboard-wrapper {
          min-height: 800px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 80px rgba(0,0,0,0.5);
        }

        .cta {
          text-align: center;
          padding: 100px 20px;
        }

        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
        }

        .cta-button {
          padding: 16px 40px;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #4a9eff, #a855f7);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(74, 158, 255, 0.3);
        }

        footer {
          text-align: center;
          padding: 40px;
          border-top: 1px solid #2a2a40;
          color: #6b6b85;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-wrapper {
            min-height: 600px;
          }
        }
      `}</style>
    </div>
  );
}