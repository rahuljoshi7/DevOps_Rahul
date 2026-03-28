import React, { useState } from "react";
import Layout from "../layout";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return setError("Please fill in all required fields.");
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return setError("Please enter a valid email address.");
    }
    setError("");
    setSubmitted(true);
  };

  const info = [
    { icon: "📍", label: "Address", value: "123 Fabric Lane, Mumbai, Maharashtra 400001, India" },
    { icon: "📞", label: "Phone", value: "+91 98765 43210" },
    { icon: "✉️", label: "Email", value: "support@bffabric.com" },
    { icon: "🕐", label: "Hours", value: "Mon–Sat: 9:00 AM – 6:00 PM IST" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">

        {/* Hero */}
        <div className="bg-gray-900 text-white py-16 px-4 text-center">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-xl mx-auto">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Our Information</h2>
              {info.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-gray-700 mt-1 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Follow Us</p>
                <div className="flex space-x-3">
                  {["Instagram", "Facebook", "Twitter", "Pinterest"].map(s => (
                    <button key={s} className="w-10 h-10 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-600 rounded-full text-xs font-bold transition-all flex items-center justify-center">
                      {s[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center space-x-2">
                      <span>⚠</span><span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
                      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-400">*</span></label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all bg-white">
                      <option value="">Select a subject</option>
                      <option>Order Inquiry</option>
                      <option>Product Question</option>
                      <option>Return & Refund</option>
                      <option>Shipping Issue</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message <span className="text-red-400">*</span></label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                      className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all resize-none" />
                    <p className="text-xs text-gray-400 text-right">{form.message.length}/500</p>
                  </div>

                  <button type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-700 active:scale-95 transition-all">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-10 bg-gray-200 rounded-2xl overflow-hidden h-64 flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="font-medium">123 Fabric Lane, Mumbai, India</p>
              <p className="text-sm mt-1">Google Maps integration available</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
