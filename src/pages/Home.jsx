import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Passport & Visa Documentation',
    description:
      'End-to-end support for new passport applications, renewals, and visa interview preparation with document verification.',
    icon: '🛂',
  },
  {
    title: 'Global Travel Compliance',
    description:
      'Stay compliant with country-specific regulations using our constantly updated advisory and checklist builder.',
    icon: '🌐',
  },
  {
    title: 'Fast-Track Processing',
    description:
      'Priority handling for urgent travel needs with dedicated concierge support and real-time updates.',
    icon: '⚡',
  },
];

const highlights = [
  {
    label: 'Applications Processed',
    value: '12K+',
  },
  {
    label: 'Countries Covered',
    value: '45+',
  },
  {
    label: 'Success Rate',
    value: '98%',
  },
  {
    label: 'Avg. Processing Time',
    value: '48 hrs',
  },
];

const processSteps = [
  {
    title: 'Submit Profile',
    detail: 'Complete the secure digital form with your personal and travel details in minutes.',
  },
  {
    title: 'Document Review',
    detail: 'Our specialists validate every document to avoid embassy rejections or delays.',
  },
  {
    title: 'Track Progress',
    detail: 'Receive proactive updates, schedule appointments, and download confirmations instantly.',
  },
];

const testimonials = [
  {
    name: 'Priya S.',
    role: 'Travel Manager, VoyageX',
    quote:
      '“Sanjay Consultancy transformed our visa processing. Their dashboard keeps our team synchronized and compliant.”',
  },
  {
    name: 'Mohammed R.',
    role: 'Frequent Flyer',
    quote:
      '“Renewing my passport during peak season was stress-free. The alerts and concierge support were spot on.”',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-[#04172a] to-darker text-white">
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-52 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          {/* Hero Section */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-3 border-primary/40 overflow-hidden flex-shrink-0 shadow-lg shadow-primary/20 bg-white/5 flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Sanjay Consultancy Logo" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <span style={{ display: 'none' }} className="text-2xl font-bold text-primary">SC</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm text-primary">
                  <span className="text-xl">🛂</span> Passport Consultancy Experts since 2005
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Seamless Passport & Visa Solutions for Confident Global Travel
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                Manage every document, deadline, and approval in one futuristic portal. From individual travellers to corporate teams, we keep your journeys compliant and on schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3 rounded-lg bg-primary text-darker font-semibold shadow-lg shadow-primary/40 hover:bg-blue-400 transition"
                >
                  Start Your Application
                </Link>
                <Link
                  to="/admin/login"
                  className="px-8 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition text-center"
                >
                  Admin Dashboard
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {highlights.map((item) => (
                  <div key={item.label} className="bg-white/5 border border-primary/20 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{item.value}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-darker/60 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-2xl font-bold text-darker shadow-lg">
                    SC
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Real-time Status</p>
                    <p className="text-xl font-semibold text-white">Passport Concierge Panel</p>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Application ID</span>
                    <span className="font-medium">SC-AP-45829</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Embassy Appointment</span>
                    <span className="text-primary font-medium">Confirmed</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Progress</p>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[78%] bg-gradient-to-r from-primary to-blue-500" />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Document Verification 78%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Upcoming</p>
                    <p className="font-semibold text-white mt-1">Biometrics</p>
                    <p className="text-xs text-gray-400 mt-2">Wed, 14 Nov · Mumbai VFS</p>
                  </div>
                  <div className="bg-white/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Needed</p>
                    <p className="font-semibold text-white mt-1">Photograph</p>
                    <p className="text-xs text-primary mt-2">Upload high-resolution image</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Our Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold">Tailored Consultancy for Every Traveller</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Whether you are a corporate travel coordinator or a first-time applicant, our specialists deliver precision, speed, and compliance confidence for every journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-darker/60 border border-primary/20 rounded-2xl p-7 hover:-translate-y-2 transition transform duration-300 hover:border-primary/40 shadow-lg hover:shadow-primary/20"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="bg-black/40 border border-primary/20 rounded-3xl p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">How it works</p>
                <h2 className="text-3xl font-bold">Your Passport Journey in Three Steps</h2>
                <p className="text-gray-300 max-w-xl">
                  We blend human expertise with intelligent automation to accelerate screenings, embassy appointments, and document verification.
                </p>
              </div>
              <Link
                to="/register"
                className="self-start md:self-end px-6 py-3 rounded-xl bg-primary text-darker font-semibold hover:bg-blue-400 transition"
              >
                Begin Application
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative bg-white/5 border border-primary/20 rounded-2xl p-6">
                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center font-bold text-darker shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-10">
            <div className="text-center space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Voices of Trust</p>
              <h2 className="text-3xl font-bold">Chosen by Travellers & Enterprise Teams</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((item) => (
                <div key={item.name} className="bg-darker/60 border border-primary/20 rounded-2xl p-8 space-y-4">
                  <p className="text-lg italic text-gray-200">{item.quote}</p>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-primary">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-primary/20 via-blue-600/10 to-primary/30 border border-primary/30 rounded-3xl p-10 text-center space-y-6 shadow-xl shadow-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Passport Consultancy?</h2>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Empower your applicants, streamline approvals, and gain full visibility into every journey. The Sanjay Consultancy Portal keeps your operations audit-ready and client-centric.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 rounded-xl bg-primary text-darker font-semibold hover:bg-blue-400 transition"
              >
                Register an Applicant
              </Link>
              <Link
                to="/admin/register"
                className="px-8 py-3 rounded-xl border border-primary/40 text-primary hover:bg-primary/10 transition"
              >
                Create Admin Account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
