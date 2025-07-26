
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
                  <label className="block text-portfolio-text text-sm font-medium mb-2">
                    Name
                  </label>
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
                  <label className="block text-portfolio-text text-sm font-medium mb-2">
                    Email
                  </label>
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

              <div className="mb-6">
                <label className="block text-portfolio-text text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-portfolio-dark border border-portfolio-blue rounded-lg text-portfolio-text focus:border-portfolio-accent focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-portfolio-text text-sm font-medium mb-2">
                  Message
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
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
