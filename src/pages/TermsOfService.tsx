export default function TermsOfService() {
  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <h1 style={styles.h1}>Terms of Service</h1>
        <p style={styles.muted}>Last updated: January 14, 2026</p>

        <p style={styles.p}>
          These Terms of Service (“Terms”) govern your use of Zavvis’s website and platform.
        </p>
        <p style={styles.p}>
          By accessing or using the Services, you agree to these Terms.
        </p>

        <h2 style={styles.h2}>1. The Service</h2>
        <p style={styles.p}>
          Zavvis provides software that analyzes financial data to surface signals, explanations, and insights.
        </p>
        <p style={styles.p}>The Services are currently offered in pilot / MVP stage.</p>

        <h2 style={styles.h2}>2. MVP &amp; Pilot Disclaimer</h2>
        <p style={styles.p}>You acknowledge and agree that:</p>
        <ul style={styles.ul}>
          <li>The platform is under active development</li>
          <li>Features may change or be removed</li>
          <li>Data processing may contain errors</li>
          <li>Signals and explanations may be incomplete or inaccurate</li>
          <li>System downtime or data loss may occur</li>
          <li>The Services are provided “as is” and “as available.”</li>
        </ul>

        <h2 style={styles.h2}>3. No Professional Advice</h2>
        <p style={styles.p}>
          Zavvis does not provide accounting, legal, tax, or financial advice.
        </p>
        <p style={styles.p}>
          All outputs are informational and must be reviewed by qualified professionals before action.
        </p>
        <p style={styles.p}>You remain fully responsible for:</p>
        <ul style={styles.ul}>
          <li>Financial reporting</li>
          <li>Compliance</li>
          <li>Business decisions</li>
        </ul>

        <h2 style={styles.h2}>4. Your Responsibilities</h2>
        <p style={styles.p}>You agree to:</p>
        <ul style={styles.ul}>
          <li>Provide lawful access to data</li>
          <li>Ensure you have rights to connect data sources</li>
          <li>Maintain confidentiality of credentials</li>
          <li>Review outputs before relying on them</li>
          <li>Use the platform in compliance with laws</li>
        </ul>

        <h2 style={styles.h2}>5. Data Ownership</h2>
        <p style={styles.p}>
          You retain ownership of all uploaded or connected data.
        </p>
        <p style={styles.p}>
          You grant Zavvis a limited license to process that data solely to provide the Services.
        </p>

        <h2 style={styles.h2}>6. Confidentiality</h2>
        <p style={styles.p}>
          We will treat customer data as confidential and implement reasonable safeguards.
        </p>

        <h2 style={styles.h2}>7. Acceptable Use</h2>
        <p style={styles.p}>You may not:</p>
        <ul style={styles.ul}>
          <li>Use the platform unlawfully</li>
          <li>Attempt to reverse engineer the system</li>
          <li>Interfere with platform operation</li>
          <li>Upload malicious content</li>
          <li>Access other customers’ data</li>
        </ul>

        <h2 style={styles.h2}>8. Intellectual Property</h2>
        <p style={styles.p}>Zavvis retains all rights to:</p>
        <ul style={styles.ul}>
          <li>Software</li>
          <li>Models</li>
          <li>Platform design</li>
          <li>Trademarks</li>
          <li>Documentation</li>
        </ul>

        <h2 style={styles.h2}>9. Limitation of Liability</h2>
        <p style={styles.p}>To the maximum extent permitted by law:</p>
        <ul style={styles.ul}>
          <li>Zavvis shall not be liable for financial losses</li>
          <li>Business interruption</li>
          <li>Inaccurate signals or reports</li>
          <li>Lost profits</li>
          <li>Data errors</li>
          <li>Indirect or consequential damages</li>
        </ul>
        <p style={styles.p}>
          Total liability shall not exceed fees paid to Zavvis in the prior 12 months (or $100 if none).
        </p>

        <h2 style={styles.h2}>10. Indemnification</h2>
        <p style={styles.p}>You agree to indemnify Zavvis from claims arising from:</p>
        <ul style={styles.ul}>
          <li>Your data</li>
          <li>Your use of the Services</li>
          <li>Violation of these Terms</li>
          <li>Violation of laws or third-party rights</li>
        </ul>

        <h2 style={styles.h2}>11. Termination</h2>
        <p style={styles.p}>You may terminate your account at any time.</p>
        <p style={styles.p}>We may suspend or terminate access:</p>
        <ul style={styles.ul}>
          <li>For violations</li>
          <li>For security reasons</li>
          <li>During pilot phase at our discretion</li>
        </ul>

        <h2 style={styles.h2}>12. Governing Law</h2>
        <p style={styles.p}>These Terms are governed by the laws of the State of Delaware, USA.</p>

        <h2 style={styles.h2}>13. Changes</h2>
        <p style={styles.p}>
          We may update these Terms. Continued use constitutes acceptance.
        </p>

        <h2 style={styles.h2}>14. Contact</h2>
        <p style={styles.p}>
          Zavvis Technologies, Inc.<br />
          Dover, Delaware<br />
          contact@zavvis.ai
        </p>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "#000", color: "#fff", padding: "110px 18px 70px" },
  wrap: { maxWidth: 980, margin: "0 auto" },
  h1: { fontSize: 42, margin: "0 0 10px", letterSpacing: "-0.02em" },
  h2: { fontSize: 22, margin: "28px 0 10px" },
  p: { color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: "10px 0" },
  muted: { color: "rgba(255,255,255,0.55)", margin: "0 0 22px" },
  ul: { color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: "10px 0 0 18px" },
};
