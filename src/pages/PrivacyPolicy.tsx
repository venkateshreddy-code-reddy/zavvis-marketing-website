export default function PrivacyPolicy() {
  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <h1 style={styles.h1}>Privacy Policy</h1>
        <p style={styles.muted}>Last updated: January 14, 2026</p>

        <p style={styles.p}>
          Zavvis Technologies, Inc. (“Zavvis”, “we”, “our”, or “us”) provides a financial data observability platform
          designed to help organizations monitor, understand, and control their financial data. This Privacy Policy
          explains how we collect, use, disclose, and safeguard information when you use our website, platform, and
          services (collectively, the “Services”).
        </p>

        <p style={styles.p}>
          By using the Services, you agree to the practices described in this policy.
        </p>

        <h2 style={styles.h2}>1. Information We Collect</h2>

        <h3 style={styles.h3}>a. Information You Provide</h3>
        <p style={styles.p}>We may collect:</p>
        <ul style={styles.ul}>
          <li>Name, email address, company name, job title</li>
          <li>Contact information submitted via forms or demos</li>
          <li>Account credentials (if applicable)</li>
          <li>Communications with us</li>
          <li>Configuration preferences and feedback</li>
        </ul>

        <h3 style={styles.h3}>b. Financial and Business Data</h3>
        <p style={styles.p}>
          When you connect data sources (such as accounting, ERP, CRM, or banking systems), we may process:
        </p>
        <ul style={styles.ul}>
          <li>Transaction records (e.g., invoices, bills, payments, journal entries)</li>
          <li>Account structures and chart of accounts</li>
          <li>Customer and vendor identifiers</li>
          <li>Financial statements and derived metrics</li>
        </ul>
        <p style={styles.p}>This data remains your property.</p>

        <h3 style={styles.h3}>c. Technical Data</h3>
        <p style={styles.p}>We may collect:</p>
        <ul style={styles.ul}>
          <li>IP address and device information</li>
          <li>Browser type and usage logs</li>
          <li>System performance and error logs</li>
          <li>Session metadata</li>
        </ul>

        <h2 style={styles.h2}>2. How We Use Information</h2>
        <p style={styles.p}>We use information to:</p>
        <ul style={styles.ul}>
          <li>Provide and operate the Services</li>
          <li>Detect financial signals and generate explanations</li>
          <li>Improve platform accuracy and reliability</li>
          <li>Provide customer support</li>
          <li>Communicate about the Services</li>
          <li>Maintain security and prevent abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p style={styles.p}>We do not sell customer data.</p>

        <h2 style={styles.h2}>3. AI &amp; Automated Processing Disclosure</h2>
        <p style={styles.p}>
          Zavvis uses automated systems, machine learning models, and rule-based engines to analyze financial data and
          generate signals, explanations, and recommendations.
        </p>
        <p style={styles.p}>Important notes:</p>
        <ul style={styles.ul}>
          <li>Outputs are informational only</li>
          <li>They may be incomplete, inaccurate, or delayed</li>
          <li>They should not be considered accounting, legal, or financial advice</li>
          <li>Human review is required for all business decisions</li>
        </ul>

        <h2 style={styles.h2}>4. Data Sharing</h2>
        <p style={styles.p}>We may share information:</p>
        <ul style={styles.ul}>
          <li>With infrastructure providers (cloud hosting, databases, monitoring tools)</li>
          <li>With service providers assisting in platform operation</li>
          <li>If required by law or legal process</li>
          <li>In connection with a business transaction (e.g., acquisition)</li>
        </ul>
        <p style={styles.p}>All providers are contractually required to protect data confidentiality.</p>

        <h2 style={styles.h2}>5. Data Retention</h2>
        <p style={styles.p}>We retain data:</p>
        <ul style={styles.ul}>
          <li>For as long as your account is active</li>
          <li>As required to provide Services</li>
          <li>As necessary for compliance and audit purposes</li>
        </ul>
        <p style={styles.p}>
          You may request deletion of your data, subject to legal and contractual obligations.
        </p>

        <h2 style={styles.h2}>6. Security</h2>
        <p style={styles.p}>
          We implement administrative, technical, and organizational safeguards to protect data. However, no system is
          completely secure. We cannot guarantee absolute security.
        </p>

        <h2 style={styles.h2}>7. Your Rights</h2>
        <p style={styles.p}>
          Depending on your jurisdiction, you may have rights to:
        </p>
        <ul style={styles.ul}>
          <li>Access your data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion</li>
          <li>Restrict processing</li>
          <li>Data portability</li>
        </ul>
        <p style={styles.p}>Contact us at contact@zavvis.ai for requests.</p>

        <h2 style={styles.h2}>8. International Transfers</h2>
        <p style={styles.p}>
          Your data may be processed in the United States or other jurisdictions where our providers operate.
        </p>

        <h2 style={styles.h2}>9. Children’s Privacy</h2>
        <p style={styles.p}>Zavvis is not intended for use by individuals under 18.</p>

        <h2 style={styles.h2}>10. Changes to This Policy</h2>
        <p style={styles.p}>
          We may update this policy from time to time. Material changes will be communicated.
        </p>

        <h2 style={styles.h2}>11. Contact</h2>
        <p style={styles.p}>
          Zavvis Technologies, Inc.<br />
          Dover, Delaware<br />
          Email: contact@zavvis.ai
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
  h3: { fontSize: 16, margin: "18px 0 6px", color: "rgba(255,255,255,0.9)" },
  p: { color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: "10px 0" },
  muted: { color: "rgba(255,255,255,0.55)", margin: "0 0 22px" },
  ul: { color: "rgba(255,255,255,0.78)", lineHeight: 1.65, margin: "10px 0 0 18px" },
};
