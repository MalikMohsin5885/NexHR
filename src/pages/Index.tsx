import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  PieChart, 
  Shield, 
  Database,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function HRMSProductHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const features = [
    {
      title: "Employee Management",
      description: "Easily manage employee data, profiles, documents, and organizational structure. Streamline onboarding and offboarding processes.",
      icon: <Users size={36} className="text-blue-500" />
    },
    {
      title: "Time & Attendance",
      description: "Track employee attendance, manage shifts, and monitor overtime. Simplify time-off requests and approvals.",
      icon: <Clock size={36} className="text-blue-500" />
    },
    {
      title: "Leave Management",
      description: "Automate leave requests, approvals, and balances. Set custom policies and generate comprehensive reports.",
      icon: <Calendar size={36} className="text-blue-500" />
    },
    {
      title: "Performance Tracking",
      description: "Set goals, conduct reviews, and provide continuous feedback. Identify top performers and growth opportunities.",
      icon: <PieChart size={36} className="text-blue-500" />
    },
    {
      title: "Payroll Integration",
      description: "Seamlessly connect attendance data with payroll processing. Ensure accuracy and compliance with tax regulations.",
      icon: <Database size={36} className="text-blue-500" />
    },
    {
      title: "Compliance & Security",
      description: "Stay compliant with labor laws and protect sensitive HR data with enterprise-grade security features.",
      icon: <Shield size={36} className="text-blue-500" />
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director, TechCorp Inc.",
      content: "This HRMS solution has transformed our HR operations. We've reduced administrative time by 65% and improved employee satisfaction scores by 40%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CEO, GrowthWave",
      content: "The intuitive interface and comprehensive feature set made implementation a breeze. Our team adopted it quickly, and we saw ROI within the first quarter.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "HR Manager, GlobalHealth",
      content: "The reporting capabilities are outstanding. We can now make data-driven decisions about our workforce that align with our strategic goals.",
      rating: 4
    }
  ];
  
  const pricingPlans = [
    {
      name: "Starter",
      price: "$8",
      period: "per employee/month",
      features: [
        "Employee management",
        "Time & attendance tracking",
        "Basic leave management",
        "Mobile app access",
        "Email support"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$15",
      period: "per employee/month",
      features: [
        "Everything in Starter",
        "Performance management",
        "Advanced reporting",
        "Document management",
        "API access",
        "Priority support"
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact for pricing",
      features: [
        "Everything in Professional",
        "Custom workflows",
        "Single sign-on (SSO)",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantees"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header & Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">HRMS</div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
            
            <div className="hidden md:flex space-x-4">
              <a href='/login' className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700">Login</a>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Start Free Trial</button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                <a href="#pricing" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#contact" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <a className="px-4 py-2 text-blue-600 font-medium border border-blue-600 rounded-lg" href='/login'>Login</a>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">Start Free Trial</button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Hero Section with Banner */}
      <section className="relative bg-blue-600">
        <div className="absolute inset-0">
          <img 
            src="/images/hrms-banner.jpg" 
            alt="HRMS Banner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Transform Your HR Operations with Modern Technology
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Our comprehensive HRMS solution streamlines HR processes, empowers your team, and provides valuable insights to make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">
                Request Demo
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                Learn More
              </button>
            </div>
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex">
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden -ml-3">
                  <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden -ml-3">
                  <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-white">
                <p className="font-medium">Trusted by 5,000+ companies</p>
                <p className="text-blue-200 text-sm">Join thousands of satisfied customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-70">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="w-32 h-12 bg-gray-300 rounded flex items-center justify-center">
                <div className="text-gray-500 font-medium">PARTNER {i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive HR Management Features
            </h2>
            <p className="text-xl text-gray-600">
              Our platform offers everything you need to manage your human resources efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our HRMS Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, intuitive, and powerful HR management in three easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deploy & Configure</h3>
              <p className="text-gray-600">
                Get up and running in minutes with our cloud-based solution. Configure to match your organization's structure and policies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manage & Automate</h3>
              <p className="text-gray-600">
                Streamline everyday HR processes with automated workflows, approvals, and notifications for maximum efficiency.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analyze & Optimize</h3>
              <p className="text-gray-600">
                Gain valuable insights from powerful reporting tools to make informed decisions and optimize your workforce.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by HR professionals and business leaders around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your HR operations?</h2>
              <p className="text-xl text-blue-100">Get started with a free 14-day trial. No credit card required.</p>
            </div>
            <div>
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your organization's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm border ${plan.highlight ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-100'} overflow-hidden`}
              >
                {plan.highlight && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <hr className="my-6" />
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-3 rounded-lg font-medium ${
                      plan.highlight 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                    } transition`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact & Footer */}
      <section id="contact" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions or need more information? Our team is here to help you find the perfect HR solution for your business.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Contact Sales</h3>
                    <p className="text-gray-600">sales@hrms-solution.com</p>
                    <p className="text-gray-600">+1 (800) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Support</h3>
                    <p className="text-gray-600">support@hrms-solution.com</p>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Company</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">HRMS</div>
              <p className="text-gray-400 mb-4">
                Comprehensive human resource management solution for businesses of all sizes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Webinars</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 HRMS. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}