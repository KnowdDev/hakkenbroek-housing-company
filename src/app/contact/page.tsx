'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1920&q=80"
            alt="Amsterdam architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone-200 mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            Start a conversation
          </h1>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                Send a Message
              </p>
              <h2 className="font-display text-3xl text-charcoal mb-10">
                We&apos;d love to hear from you
              </h2>

              {submitted ? (
                <div className="border border-emerald-200 bg-emerald-50 p-8">
                  <p className="text-emerald-800 font-body">
                    Thank you for your message. We will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  data-netlify="true"
                  name="contact"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors placeholder:text-stone-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors placeholder:text-stone-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors placeholder:text-stone-300"
                        placeholder="+31 6 12345678"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                      >
                        Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors"
                      >
                        <option value="">Select a service</option>
                        <option value="buying">Buying</option>
                        <option value="selling">Selling</option>
                        <option value="renting">Renting</option>
                        <option value="leasing">Leasing</option>
                        <option value="management">Property Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors resize-none placeholder:text-stone-300"
                      placeholder="Tell us about your real estate needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                Contact Details
              </p>
              <h2 className="font-display text-3xl text-charcoal mb-10">
                Visit our office
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    Address
                  </h3>
                  <p className="text-ink leading-relaxed">
                    Leliegracht 21
                    <br />
                    Amsterdam, Netherlands
                  </p>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@hakkenbroek.com"
                    className="text-ink hover:text-brass transition-colors border-b border-stone-200 hover:border-brass pb-0.5"
                  >
                    info@hakkenbroek.com
                  </a>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+31201234567"
                    className="text-ink hover:text-brass transition-colors border-b border-stone-200 hover:border-brass pb-0.5"
                  >
                    +31 20 123 4567
                  </a>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    Office Hours
                  </h3>
                  <p className="text-ink leading-relaxed">
                    Monday – Friday: 9:00 – 18:00
                    <br />
                    Saturday: 10:00 – 16:00
                    <br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">
                    Languages
                  </h3>
                  <div className="flex gap-3">
                    {['Dutch', 'English'].map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1.5 bg-stone-100 text-warm-gray text-sm font-body"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80"
              alt="Amsterdam canals near Leliegracht"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-display text-2xl mb-2">Leliegracht 21</p>
                <p className="font-body text-sm opacity-90">
                  Amsterdam, Netherlands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
