import React, { useState } from "react";
import "../style/contact.css";

const MAX = 800;

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    topic: "",
    updates: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setForm((f) => ({
      ...f,
      [name]: name === "topic" ? String(value).slice(0, MAX) : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.company.trim() ||
      !form.topic.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.ok) {
        alert("❌ Failed to send. " + (data.error || ""));
        return;
      }

      alert("✅ Sent! We’ll get back to you soon.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        topic: "",
        updates: false,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Network error. Is backend running on :8080?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-wrap">
      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-left">
          <h2 className="contact-headline">
            Ready to see how <span className="contact-brand">Zavvis</span> gives you control over your numbers?
          </h2>

          <p className="contact-text">
            We’ll show you how Zavvis helps you:
          </p>

          <ul className="contact-bullets">
            <li>Eliminate financial surprises</li>
            <li>Trust your numbers at every decision point</li>
            <li>Catch issues before they compound</li>
            <li>Trace any change back to its source</li>
          </ul>

          <p className="contact-note">
            Just drop us a note using the form on the right and we’ll show you how financial
            observability works in practice.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-form-card">
          <div className="contact-form-design">
            <h5 className="contact-title">Get in Touch</h5>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="row-2">
                <div>
                  <label className="form-label" htmlFor="firstName">
                    First name <span className="req">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="lastName">
                    Last name <span className="req">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <label className="form-label" htmlFor="email">
                Email <span className="req">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@company.com"
                value={form.email}
                onChange={onChange}
                required
              />

              <label className="form-label" htmlFor="company">
                Company <span className="req">*</span>
              </label>
              <input
                id="company"
                name="company"
                className="form-input"
                placeholder="Company name"
                value={form.company}
                onChange={onChange}
                required
              />

              <label className="form-label" htmlFor="topic">
                What would you like to talk about? <span className="req">*</span>
              </label>
              <textarea
                id="topic"
                name="topic"
                className="form-textarea"
                rows={6}
                placeholder="Tell us what you’re trying to solve…"
                value={form.topic}
                onChange={onChange}
                required
              />
              <div className="char-count">{form.topic.length}/{MAX}</div>

              <label className="check">
                <input
                  type="checkbox"
                  name="updates"
                  checked={form.updates}
                  onChange={onChange}
                />
                <span>Keep me in the loop with news and product updates.</span>
              </label>

              <button type="submit" className="contact-btn" disabled={submitting}>
                {submitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
