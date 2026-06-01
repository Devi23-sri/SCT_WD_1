import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const API = process.env.REACT_APP_API_URL || '/api';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  /* ── Client-side validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name    = 'Name is required';
    if (!form.email.trim())             e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim())           e.message = 'Message is required';
    else if (form.message.length < 10)  e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      if (data.success) {
        setSuccess(data.message);
        setForm(INITIAL);
      }
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.msg
        || 'Something went wrong. Please try again.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" aria-hidden="true" />
      <div className="container">
        <div className="contact-grid">
          {/* Left info */}
          <div className="contact-info">
            <div className="eyebrow">Get in touch</div>
            <h2 className="section-title">
              Ready to build<br />
              <span className="hi">something</span><br />
              <span className="hi2">remarkable?</span>
            </h2>
            <p className="section-sub" style={{ marginTop: 16 }}>
              Tell us about your project. We respond within 24 hours and love
              talking to founders, designers, and engineers.
            </p>

            <div className="contact-details">
              <div className="cd-item">
                <div className="cd-icon">✉</div>
                <div>
                  <div className="cd-label">Email</div>
                  <a href="mailto:hello@nexus.studio" className="cd-value">hello@nexus.studio</a>
                </div>
              </div>
              <div className="cd-item">
                <div className="cd-icon">📍</div>
                <div>
                  <div className="cd-label">Location</div>
                  <div className="cd-value">Remote · Worldwide</div>
                </div>
              </div>
              <div className="cd-item">
                <div className="cd-icon">⏱</div>
                <div>
                  <div className="cd-label">Response time</div>
                  <div className="cd-value">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="contact-form-wrap">
            {success ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>{success}</p>
                <button className="btn-fill" onClick={() => setSuccess('')}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your name *</label>
                    <input
                      id="name" name="name" type="text"
                      className={`form-input${errors.name ? ' input-error' : ''}`}
                      placeholder="Alex Johnson"
                      value={form.name} onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email address *</label>
                    <input
                      id="email" name="email" type="email"
                      className={`form-input${errors.email ? ' input-error' : ''}`}
                      placeholder="alex@company.com"
                      value={form.email} onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    id="subject" name="subject" type="text"
                    className="form-input"
                    placeholder="Project inquiry / Partnership / Other"
                    value={form.subject} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message"
                    className={`form-textarea${errors.message ? ' input-error' : ''}`}
                    placeholder="Tell us about your project, timeline, and budget..."
                    value={form.message} onChange={handleChange}
                    rows={5}
                  />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                  <div className="char-count">{form.message.length}/2000</div>
                </div>

                {apiError && (
                  <div className="api-error">{apiError}</div>
                )}

                <button
                  type="submit"
                  className="btn-fill submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner" aria-hidden="true" /> Sending...</>
                  ) : (
                    <>Send message <span aria-hidden="true">→</span></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
