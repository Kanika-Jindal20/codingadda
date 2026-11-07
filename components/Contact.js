"use client";

import { useState } from "react";
import "../styles/Contact.css";
import {
  FiMail,
  FiMessageSquare,
  FiLifeBuoy,
  FiAlertCircle,
  FiSend,
  FiCheckCircle
} from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation and temporary success message
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero text-center">
        <span className="contact-tag">CONTACT US</span>

        <h1>
          Let's <span>Connect!</span>
        </h1>

        <p>
          Have a question, facing an issue, or have an idea?
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="container contact-container">
        <div className="row g-4">

          {/* Left Side */}
          <div className="col-lg-5">
            <div className="contact-info">

              <h3>Get in Touch</h3>
              <p className="info-description">
                We're always open to hearing from our users.
                Reach out to us for support, feedback, or suggestions.
              </p>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h5>Email Support</h5>
                  <p>For general questions and assistance.</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiLifeBuoy />
                </div>
                <div>
                  <h5>Technical Support</h5>
                  <p>Need help with the editor or your projects?</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiAlertCircle />
                </div>
                <div>
                  <h5>Report a Bug</h5>
                  <p>Let us know if something isn't working correctly.</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FiMessageSquare />
                </div>
                <div>
                  <h5>Feedback & Suggestions</h5>
                  <p>Share your ideas to help us improve CodingAdda.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-lg-7">
            <div className="contact-form-box">

              <h3>Send Us a Message</h3>
              <p>Fill out the form and tell us how we can help.</p>

              {submitted && (
                <div className="contact-success">
                  <FiCheckCircle />
                  Message submitted successfully!
                  <small>
                    This is a demo confirmation. Connect a backend
                    email service to receive messages.
                  </small>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Subject</label>
                  <select
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Query">General Query</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  Send Message <FiSend />
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Section */}
      <section className="contact-bottom text-center">
        <h3>Every great idea starts with a conversation.</h3>
        <p>
          Your feedback helps us make CodingAdda better for everyone.
        </p>
      </section>

    </div>
  );
}
