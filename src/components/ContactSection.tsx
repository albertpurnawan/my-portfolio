import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const TEMPLATE_ID_PENGIRIM = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_PENGIRIM;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_PENGIRIM,
      {
        from_name: formData.name,
        reply_to: formData.email,
        whatsapp: formData.whatsapp,
        subject: formData.subject,
        message: formData.message,
        to_email: CONTACT_EMAIL
      },
      USER_ID
    )
    .then(() => {
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: 'Jonathan Albert Purnawan',
          reply_to: CONTACT_EMAIL,
          subject: 'Thanks for reaching out, ' + formData.name + '!',
          message: `Hi ${formData.name},\n`,
          to_email: formData.email
        },
        USER_ID
      )
      .then(() => {
        alert('Pesan berhasil dikirim dan auto reply sudah dikirim!');
        setLoading(false);
      })
      .catch(() => {
        alert('Pesan berhasil dikirim, tapi auto reply gagal.');
        setLoading(false);
      });
    })
    .catch(() => {
      alert('Gagal mengirim pesan.');
      setLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue">
              <div className="text-portfolio-accent mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold text-portfolio-text mb-2">Email</h3>
              <p className="text-portfolio-muted">albertpurnawan1@gmail.com</p>
            </div>

            <div className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue">
              <div className="text-portfolio-accent mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold text-portfolio-text mb-2">Phone</h3>
              <p className="text-portfolio-muted">+62 851 5684 5984</p>
            </div>

            <div className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue">
              <div className="text-portfolio-accent mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold text-portfolio-text mb-2">Location</h3>
              <p className="text-portfolio-muted">Tangerang, Indonesia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-in">
            <form onSubmit={handleSubmit} className="bg-portfolio-navy p-8 rounded-xl border border-portfolio-blue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-portfolio-text text-sm font-medium mb-2">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-portfolio-text text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-6 flex flex-row gap-4">
                
                <div className="w-full">
                  <label className="block text-portfolio-text text-sm font-medium mb-2">Subject <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-portfolio-text text-sm font-medium mb-2">WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none"
                    placeholder="08xxxxxxxxxx"
                    
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-portfolio-text text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-portfolio-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : (
                  <Send size={20} />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
