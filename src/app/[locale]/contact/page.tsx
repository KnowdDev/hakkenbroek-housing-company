'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ContactPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    en: {
      heroSubtitle: 'Contact',
      heroTitle: 'Begin a Conversation',
      formSubtitle: 'Send an Inquiry',
      formTitle: 'We look forward to hearing from you',
      successMessage: 'Thank you for your inquiry. We will be in touch shortly — typically within a few hours during business days.',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      service: 'Service',
      selectService: 'Select a service',
      buying: 'Buying',
      selling: 'Selling',
      renting: 'Renting',
      leasing: 'Leasing',
      management: 'Property Management',
      other: 'Other',
      message: 'Message',
      submit: 'Send Message',
      infoSubtitle: 'Visit Our Office',
      infoTitle: 'Leliegracht 21',
      address: 'Address',
      addressText: 'Leliegracht 21\n1015 DE Amsterdam\nNetherlands',
      emailAddress: 'Email',
      phoneNumber: 'Phone',
      officeHours: 'Office Hours',
      officeHoursText: 'Monday - Friday: 9:00 - 17:00\nSaturday: By appointment\nSunday: Closed',
      languages: 'Languages',
      languagesList: ['English', 'Dutch', 'Spanish']
    },
    nl: {
      heroSubtitle: 'Contact',
      heroTitle: 'Begin een Gesprek',
      formSubtitle: 'Stuur een Aanvraag',
      formTitle: 'Wij kijken ernaar uit van u te horen',
      successMessage: 'Bedankt voor uw aanvraag. Wij nemen spoedig contact met u op — doorgaans binnen enkele uren op werkdagen.',
      fullName: 'Volledige Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      service: 'Dienst',
      selectService: 'Selecteer een dienst',
      buying: 'Kopen',
      selling: 'Verkopen',
      renting: 'Huren',
      leasing: 'Verhuur',
      management: 'Vastgoedbeheer',
      other: 'Anders',
      message: 'Bericht',
      submit: 'Bericht Versturen',
      infoSubtitle: 'Bezoek Ons Kantoor',
      infoTitle: 'Leliegracht 21',
      address: 'Adres',
      addressText: 'Leliegracht 21\n1015 DE Amsterdam\nNederland',
      emailAddress: 'E-mail',
      phoneNumber: 'Telefoon',
      officeHours: 'Kantooruren',
      officeHoursText: 'Maandag - Vrijdag: 9:00 - 17:00\nZaterdag: Op afspraak\nZondag: Gesloten',
      languages: 'Talen',
      languagesList: ['Engels', 'Nederlands', 'Spaans']
    },
    es: {
      heroSubtitle: 'Contacto',
      heroTitle: 'Comience una Conversación',
      formSubtitle: 'Envíe una Consulta',
      formTitle: 'Esperamos tener noticias suyas',
      successMessage: 'Gracias por su consulta. Nos pondremos en contacto en breve — normalmente en unas horas durante los días laborables.',
      fullName: 'Nombre Completo',
      email: 'Dirección de Correo',
      phone: 'Número de Teléfono',
      service: 'Servicio',
      selectService: 'Seleccione un servicio',
      buying: 'Comprar',
      selling: 'Vender',
      renting: 'Alquilar',
      leasing: 'Arrendamiento',
      management: 'Administración de Propiedades',
      other: 'Otro',
      message: 'Mensaje',
      submit: 'Enviar Mensaje',
      infoSubtitle: 'Visite Nuestra Oficina',
      infoTitle: 'Leliegracht 21',
      address: 'Dirección',
      addressText: 'Leliegracht 21\n1015 DE Amsterdam\nPaíses Bajos',
      emailAddress: 'Correo',
      phoneNumber: 'Teléfono',
      officeHours: 'Horario de Oficina',
      officeHoursText: 'Lunes - Viernes: 9:00 - 17:00\nSábado: Con cita\nDomingo: Cerrado',
      languages: 'Idiomas',
      languagesList: ['Inglés', 'Neerlandés', 'Español']
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

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
            {t.heroSubtitle}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t.heroTitle}
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
                {t.formSubtitle}
              </p>
              <h2 className="font-display text-3xl text-charcoal mb-10">
                {t.formTitle}
              </h2>

              {submitted ? (
                <div className="border border-emerald-200 bg-emerald-50 p-8">
                  <p className="text-emerald-800 font-body">
                    {t.successMessage}
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
                        {t.fullName} *
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
                        {t.email} *
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
                        {t.phone}
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
                        {t.service} *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b border-stone-200 text-ink font-body focus:outline-none focus:border-brass transition-colors"
                      >
                        <option value="">{t.selectService}</option>
                        <option value="buying">{t.buying}</option>
                        <option value="selling">{t.selling}</option>
                        <option value="renting">{t.renting}</option>
                        <option value="leasing">{t.leasing}</option>
                        <option value="management">{t.management}</option>
                        <option value="other">{t.other}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-xs uppercase tracking-wider text-warm-gray mb-2"
                    >
                      {t.message} *
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
                    {t.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-warm-gray mb-4">
                {t.infoSubtitle}
              </p>
              <h2 className="font-display text-3xl text-charcoal mb-10">
                {t.infoTitle}
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    {t.address}
                  </h3>
                  <p className="text-ink leading-relaxed whitespace-pre-line">
                    {t.addressText}
                  </p>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-2">
                    {t.emailAddress}
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
                    {t.phoneNumber}
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
                    {t.officeHours}
                  </h3>
                  <p className="text-ink leading-relaxed whitespace-pre-line">
                    {t.officeHoursText}
                  </p>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-wider text-warm-gray mb-3">
                    {t.languages}
                  </h3>
                  <div className="flex gap-3">
                    {t.languagesList.map((lang) => (
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
