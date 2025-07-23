import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaCamera, FaPalette, FaCalendarAlt, FaTshirt, FaLock,
  FaCheckCircle, FaCheck, FaInstagram, FaTwitter, FaPinterest,
  FaTiktok, FaRobot, FaLanguage, FaSmile, FaGamepad, FaShoppingBag,
  FaUsers, FaHeart, FaComments, FaCloudSun, FaUserShield, FaLeaf,
  FaGem, FaMagic, FaMobileAlt, FaChartLine, FaBars, FaTimes
} from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, tag, link, isAvailable, id }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const effectiveLink = isAvailable ? link : "#";
  const effectiveTag = isAvailable ? tag : (tag ? `${tag} | COMING SOON` : "COMING SOON");

  return (
    <motion.a
      href={effectiveLink}
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`feature-card ${!isAvailable ? 'coming-soon' : ''}`}
      whileHover={{ y: -10 }}
      onClick={(e) => !isAvailable && e.preventDefault()}
      title={!isAvailable ? "Coming Soon" : ""}
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {effectiveTag && <span className="feature-tag">{effectiveTag}</span>}
    </motion.a>
  );
};

const PricingCard = ({ title, price, features, popular, buttonText }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`pricing-card ${popular ? 'popular' : ''}`}
    >
      {popular && <div className="popular-tag">MOST POPULAR</div>}
      <h3>{title}</h3>
      <div className="price">{price}</div>
      <div className="pricing-features">
        {features.map((feature, index) => (
          <div key={index} className="pricing-feature">
            <FaCheck />
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pricing-button"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, avatar }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="testimonial-card"
    >
      <p className="quote">"{quote}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">
          <img src={avatar} alt={author} />
        </div>
        <div className="author-info">
          <h4>{author}</h4>
          <p>{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const unicornRef = useRef(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Load Unicorn AI script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.async = true;
    script.onload = () => {
      if (!window.UnicornStudio?.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    document.body.appendChild(script);

    // Track scroll position for header effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Define available features for navigation
  const availableFeatures = [
    "skin-tone",
    "color-palette",
    "virtual-tryon",
    "style-calendar"
  ];

  // Features array with all requested features
  const features = [
    {
      id: "skin-tone",
      icon: <FaCamera />,
      title: "AI Skin Tone Analysis",
      description: "Get personalized color recommendations based on your unique Indian skin tone. We specialize in darker complexions.",
      tag: "BEST SELLER",
      link: "/skin-analyzer",
      isAvailable: true
    },
    {
      id: "color-palette",
      icon: <FaPalette />,
      title: "AI Color Palette Generator",
      description: "Discover the perfect colors that complement your skin tone for any occasion.",
      link: "/color-palette",
      isAvailable: true
    },
    {
      id: "virtual-tryon",
      icon: <FaTshirt />,
      title: "Virtual Try-On (AR)",
      description: "See how clothes, jewelry and hairstyles look on you before buying with our augmented reality technology.",
      tag: "NEW",
      link: "/virtual-tryon",
      isAvailable: true
    },
    {
      id: "style-calendar",
      icon: <FaCalendarAlt />,
      title: "Smart Style Calendar",
      description: "Plan outfits based on weather, events and your schedule with AI recommendations.",
      link: "/style-calendar",
      isAvailable: true
    },
    {
      icon: <FaRobot />,
      title: "AI Style Assistant",
      description: "Chat with our AI stylist in Telugu, Hindi or English for personalized fashion advice.",
      link: "/style-assistant"
    },
    {
      icon: <FaLock />,
      title: "Private AI Wardrobe",
      description: "Catalog your clothes and get AI-generated outfit suggestions from items you own.",
      link: "/wardrobe"
    },
    {
      icon: <FaLanguage />,
      title: "Regional Language Support",
      description: "Get style advice in Telugu, Hindi, Tamil and other Indian languages.",
      tag: "INDIAN SPECIAL",
      link: "/language-support"
    },
    {
      icon: <FaSmile />,
      title: "Mood-Based Recommendations",
      description: "Get outfit suggestions based on your mood and emotional state.",
      link: "/mood-style"
    },
    {
      icon: <FaGamepad />,
      title: "Style Gamification",
      description: "Earn badges and rewards for improving your fashion sense.",
      link: "/gamification"
    },
    {
      icon: <FaShoppingBag />,
      title: "Shopping Integration",
      description: "Connect with Myntra, Ajio and other Indian retailers to shop recommended looks.",
      link: "/shopping"
    },
    {
      icon: <FaUsers />,
      title: "Private Style Community",
      description: "Share and get feedback from real Indian users with similar body types.",
      link: "/community"
    },
    {
      icon: <FaHeart />,
      title: "Will This Suit Me? Scanner",
      description: "Upload any clothing image to see if it will suit your body type and skin tone.",
      tag: "MAGIC",
      link: "/suit-me"
    },
    {
      icon: <FaComments />,
      title: "AI Trend Analysis",
      description: "Stay updated with real-time fashion trends customized for Indian users.",
      link: "/trends"
    },
    {
      icon: <FaCloudSun />,
      title: "Seasonal Style Guide",
      description: "Get recommendations based on Indian seasons and festivals.",
      link: "/seasonal"
    },
    {
      icon: <FaUserShield />,
      title: "Privacy-First AI",
      description: "Your data never leaves your device. No sharing with third parties.",
      tag: "SECURE",
      link: "/privacy"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainable Fashion",
      description: "AI recommendations to help you build an eco-friendly wardrobe.",
      link: "/sustainable"
    },
    {
      icon: <FaGem />,
      title: "Jewelry Recommender",
      description: "Find perfect jewelry pieces that complement your outfits and skin tone.",
      link: "/jewelry"
    },
    {
      icon: <FaMagic />,
      title: "Avatar Cloning",
      description: "Create a digital twin to try unlimited outfits virtually.",
      tag: "COMING SOON",
      link: "/avatar"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile-First Experience",
      description: "Optimized for Indian smartphone users with limited data plans.",
      link: "/mobile"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: "₹0/month",
      features: [
        "5 outfit analyses per month",
        "Basic color recommendations",
        "Style journal",
        "1 Indian language support"
      ],
      buttonText: "Get Started"
    },
    {
      title: "Premium",
      price: "₹299/month",
      features: [
        "Unlimited outfit analyses",
        "Advanced skin tone matching",
        "Virtual try-on (AR)",
        "Smart wardrobe organizer",
        "3 Indian language support",
        "Priority support"
      ],
      popular: true,
      buttonText: "Choose Premium"
    },
    {
      title: "Professional",
      price: "₹799/month",
      features: [
        "Everything in Premium",
        "1-on-1 style consultation",
        "Personal shopping assistant",
        "Exclusive trend reports",
        "All Indian languages",
        "Business expense tracking"
      ],
      buttonText: "Go Professional"
    }
  ];

  const testimonials = [
    {
      quote: "As a dark-skinned Indian woman, I always struggled with colors. StyleSense showed me which shades actually suit me. I've never received so many compliments!",
      author: "Priya K.",
      role: "Software Engineer, Hyderabad",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      quote: "The Telugu language support changed everything for my mother. She finally understands why certain outfits work better than others.",
      author: "Rahul M.",
      role: "College Student, Vijayawada",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    {
      quote: "I wasted so much money on clothes that didn't suit me. The 'Will This Suit Me' scanner saved me thousands of rupees already!",
      author: "Ananya S.",
      role: "Marketing Executive, Bangalore",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  return (
    <div className="stylesense-container">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            Style<span>Sense</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className={`desktop-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li>
                <a 
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  className={activeSection === 'features' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  className={activeSection === 'skin-tone' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('skin-tone'); }}
                >
                  Skin Tone
                </a>
              </li>
              <li>
                <a 
                  className={activeSection === 'virtual-tryon' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('virtual-tryon'); }}
                >
                  Virtual Try-On
                </a>
              </li>
              <li>
                <a 
                  className={activeSection === 'style-calendar' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('style-calendar'); }}
                >
                  Style Calendar
                </a>
              </li>
              <li>
                <a 
                  className={activeSection === 'pricing' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="header-buttons">
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('pricing')}
            >
              Get Started
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <div 
              className="mobile-menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); setMobileMenuOpen(false); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                className={activeSection === 'features' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); setMobileMenuOpen(false); }}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                className={activeSection === 'skin-tone' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('skin-tone'); setMobileMenuOpen(false); }}
              >
                Skin Tone
              </a>
            </li>
            <li>
              <a 
                className={activeSection === 'virtual-tryon' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('virtual-tryon'); setMobileMenuOpen(false); }}
              >
                Virtual Try-On
              </a>
            </li>
            <li>
              <a 
                className={activeSection === 'style-calendar' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('style-calendar'); setMobileMenuOpen(false); }}
              >
                Style Calendar
              </a>
            </li>
            <li>
              <a 
                className={activeSection === 'pricing' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); setMobileMenuOpen(false); }}
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section 
        id="home"
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="hero"
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            India's First <span>AI Personal Style Assistant</span>
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            StyleSense uses advanced artificial intelligence designed specifically for Indian skin tones, body types, and cultural preferences. Get confident with your style while keeping your data 100% private.
          </motion.p>
          <motion.div 
            className="hero-buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a 
              href="#skin-tone"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.preventDefault(); scrollToSection('skin-tone'); }}
            >
              <button className="cta-button">Discover Your Colors</button>
            </motion.a>
            <motion.button 
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('features')}
            >
              See How It Works
            </motion.button>
          </motion.div>
        </div>
        <motion.div 
          className="hero-image"
          initial={{ x: 100, opacity: 0 }}
          animate={heroInView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80" 
            alt="Indian woman using StyleSense" 
          />
          <motion.div 
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ delay: 1.2, type: "spring" }}
          >
            Made for Indian Skin Tones
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Unicorn Embed Section */}
      <section className="unicorn-embed-section min-h-screen w-full bg-[#111827] text-white py-12 px-4">
  <div className="text-center mb-8">
    <h2 className="text-4xl font-extrabold">
      Try Our <span className="text-pink-500">AI Fashion Assistant</span>
    </h2>
    <p className="mt-2 text-lg text-gray-300">
      Get instant style recommendations powered by Unicorn AI ✨
    </p>
  </div>

  <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700">
    <div
      ref={unicornRef}
      data-us-project="pZb9FHkY4j36f8dhAcDE"
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    />
  </div>

  <div className="text-center mt-6">
    <p className="text-sm text-gray-400">✨ Embedded AI Fashion Assistant</p>
  </div>
</section>


      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Revolutionary <span>AI-Powered</span> Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Designed specifically for Indian users with darker skin tones and diverse cultural preferences
          </motion.p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              id={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              tag={feature.tag}
              link={feature.link}
              isAvailable={availableFeatures.includes(feature.id)}
            />
          ))}
        </div>
      </section>

      {/* Indian User Focus Section */}
      <section className="demo" id="indian-focus">
        <div className="demo-content">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Designed for <span>Indian Users</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We understand the unique challenges Indian users face with fashion and style. Our AI is trained specifically for:
          </motion.p>
          
          <div className="demo-features">
            <motion.div 
              className="demo-feature"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FaCheckCircle />
              <div>
                <h4>Darker Skin Tones</h4>
                <p>Specialized color analysis that works beautifully with brown and dark complexions.</p>
              </div>
            </motion.div>
            <motion.div 
              className="demo-feature"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FaCheckCircle />
              <div>
                <h4>Indian Body Types</h4>
                <p>Recommendations that consider common Indian body shapes and proportions.</p>
              </div>
            </motion.div>
            <motion.div 
              className="demo-feature"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <FaCheckCircle />
              <div>
                <h4>Cultural Clothing</h4>
                <p>Expert advice on sarees, kurtas, lehengas and fusion wear for all occasions.</p>
              </div>
            </motion.div>
            <motion.div 
              className="demo-feature"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <FaCheckCircle />
              <div>
                <h4>Regional Preferences</h4>
                <p>Style suggestions that respect regional differences across India's diverse cultures.</p>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="demo-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.1.0&auto=format&fit=crop&w=1025&q=80" 
            alt="Indian women using StyleSense" 
          />
          <motion.div 
            className="demo-badge"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            MADE FOR INDIA
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section className="pricing" id="technology">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cutting-Edge <span>AI Technology</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powered by advanced machine learning models trained on Indian fashion data
          </motion.p>
        </div>
        <div className="features-grid">
          <FeatureCard 
            icon={<FaPalette />}
            title="Skin Tone Engine"
            description="Proprietary AI trained on 50,000+ Indian skin tones for accurate color matching"
            link="/technology"
            isAvailable={false}
          />
          <FeatureCard 
            icon={<FaLanguage />}
            title="Regional Language NLP"
            description="Understands Telugu, Hindi, Tamil and more for natural style conversations"
            link="/technology"
            isAvailable={false}
          />
          <FeatureCard 
            icon={<FaTshirt />}
            title="3D Body Mapping"
            description="Creates accurate virtual models of your body for perfect fit predictions"
            link="/technology"
            isAvailable={false}
          />
          <FeatureCard 
            icon={<FaChartLine />}
            title="Trend Prediction AI"
            description="Analyzes Indian fashion trends to keep your style current"
            link="/technology"
            isAvailable={false}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our <span>Indian Users</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of Indians who have transformed their style confidence
          </motion.p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Simple, <span>Transparent</span> Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Affordable plans designed for Indian users
          </motion.p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <h2>Ready to Transform Your Indian Style?</h2>
          <p>Join over 250,000 Indian users who discovered their perfect look with StyleSense. Start your 7-day free trial today—no credit card required.</p>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('pricing')}
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h3>StyleSense</h3>
            <p>India's first AI personal style assistant, helping you discover and refine your unique style with confidence.</p>
            <div className="social-links">
              <motion.a 
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPinterest />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTiktok />
              </motion.a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Features</h3>
            <ul>
              <li><a href="#skin-tone" onClick={(e) => { e.preventDefault(); scrollToSection('skin-tone'); }}>Skin Tone Analysis</a></li>
              <li><a href="#virtual-tryon" onClick={(e) => { e.preventDefault(); scrollToSection('virtual-tryon'); }}>Virtual Try-On</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>All Features</a></li>
              <li><a href="#style-calendar" onClick={(e) => { e.preventDefault(); scrollToSection('style-calendar'); }}>Style Calendar</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>For Indian Users</h3>
            <ul>
              <li><a href="#indian-focus" onClick={(e) => { e.preventDefault(); scrollToSection('indian-focus'); }}>Darker Skin Tones</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Saree & Kurta Guide</a></li>
              <li><a href="#style-calendar" onClick={(e) => { e.preventDefault(); scrollToSection('style-calendar'); }}>Festival Outfits</a></li>
              <li><a href="#indian-focus" onClick={(e) => { e.preventDefault(); scrollToSection('indian-focus'); }}>Regional Styles</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Affordable Fashion</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 StyleSense. All rights reserved. AI fashion for Indian users.</p>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx global>{`
        :root {
          --primary: #FF4D89;
          --secondary: #FF9E80;
          --dark: #1A1A2E;
          --darker: #16213E;
          --light: #F8F8F8;
          --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
          --indian-gradient: linear-gradient(135deg, #FF9933, #138808, #000080);
          --header-height: 80px;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        body {
          background-color: var(--dark);
          color: var(--light);
          overflow-x: hidden;
          scroll-behavior: smooth;
          scroll-padding-top: var(--header-height);
        }
        
        /* Header */
        .header {
          background: rgba(26, 26, 46, 0.9);
          backdrop-filter: blur(10px);
          position: fixed;
          width: 100%;
          z-index: 1000;
          padding: 1rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          height: var(--header-height);
        }
        
        .header.scrolled {
          background: rgba(26, 26, 46, 0.95);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          height: 70px;
        }
        
        .header-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }
        
        .logo span {
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        nav a {
          color: var(--light);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          font-size: 1rem;
          padding: 0.5rem 0;
        }
        
        nav a:hover {
          color: var(--primary);
        }
        
        nav a.active {
          color: var(--primary);
        }
        
        nav a.active::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--gradient);
          transition: width 0.3s ease;
        }
        
        nav a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--gradient);
          transition: width 0.3s ease;
        }
        
        nav a:hover::after {
          width: 100%;
        }
        
        .cta-button {
          background: var(--gradient);
          color: white;
          padding: 0.8rem 1.8rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(255, 77, 137, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 77, 137, 0.4);
        }
        
        .header-buttons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .mobile-menu-toggle {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: white;
        }
        
        .mobile-nav {
          display: none;
          background: var(--darker);
          position: absolute;
          top: var(--header-height);
          left: 0;
          width: 100%;
          padding: 1rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          z-index: 999;
          transform: translateY(-150%);
          transition: transform 0.3s ease;
        }
        
        .mobile-nav.open {
          transform: translateY(0);
        }
        
        .mobile-nav ul {
          list-style: none;
        }
        
        .mobile-nav li {
          margin-bottom: 1rem;
        }
        
        .mobile-nav a {
          color: var(--light);
          text-decoration: none;
          font-size: 1.1rem;
          display: block;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .mobile-nav a:hover,
        .mobile-nav a.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--primary);
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 5%;
          position: relative;
          overflow: hidden;
          padding-top: var(--header-height);
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
          opacity: 0.2;
          z-index: -1;
        }
        
        .hero-content {
          max-width: 600px;
          z-index: 2;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          font-weight: 700;
        }
        
        .hero h1 span {
          background: var(--indian-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .hero p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .secondary-button {
          background: transparent;
          color: white;
          padding: 0.8rem 1.8rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid var(--primary);
          cursor: pointer;
          font-size: 1rem;
        }
        
        .secondary-button:hover {
          background: rgba(255, 77, 137, 0.2);
          transform: translateY(-3px);
        }
        
        .hero-image {
          position: absolute;
          right: 5%;
          width: 45%;
          max-width: 700px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          border: 5px solid rgba(255, 255, 255, 0.1);
        }
        
        .hero-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .hero-image:hover img {
          transform: scale(1.03);
        }
        
        .hero-badge {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--indian-gradient);
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          animation: pulse 2s infinite;
        }
        
        /* Features Section */
        .features {
          padding: 8rem 5%;
          background-color: var(--darker);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 5rem;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .section-title h2 span {
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .section-title p {
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.8;
          font-size: 1.1rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 2rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          scroll-margin-top: calc(var(--header-height) + 20px);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .feature-card:hover::before {
          opacity: 0.1;
        }
        
        .feature-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--gradient);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: var(--gradient);
          color: white;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover .feature-icon {
          transform: rotate(15deg) scale(1.1);
        }
        
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .feature-card p {
          opacity: 0.8;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .feature-tag {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: rgba(255, 77, 137, 0.2);
          color: var(--primary);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          position: absolute;
          top: 15px;
          right: 15px;
        }
        
        /* Coming Soon Styles */
        .feature-card.coming-soon {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .feature-card.coming-soon:hover {
          transform: none;
          box-shadow: none;
        }
        
        .feature-card.coming-soon .feature-icon {
          filter: grayscale(1);
        }
        
        /* Demo Section */
        .demo {
          padding: 8rem 5%;
          display: flex;
          align-items: center;
          gap: 5rem;
        }
        
        .demo-content {
          flex: 1;
        }
        
        .demo-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          font-weight: 700;
        }
        
        .demo-content h2 span {
          background: var(--indian-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .demo-content p {
          opacity: 0.9;
          margin-bottom: 2rem;
          line-height: 1.6;
          font-size: 1.1rem;
        }
        
        .demo-features {
          margin-top: 2rem;
        }
        
        .demo-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .demo-feature:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .demo-feature svg {
          color: var(--primary);
          font-size: 1.5rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        
        .demo-feature h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .demo-feature p {
          opacity: 0.8;
          margin-bottom: 0;
          font-size: 0.95rem;
        }
        
        .demo-image {
          flex: 1;
          position: relative;
        }
        
        .demo-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          border: 5px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.5s ease;
        }
        
        .demo-image:hover img {
          transform: scale(1.02);
        }
        
        .demo-badge {
          position: absolute;
          top: -20px;
          right: -20px;
          background: var(--indian-gradient);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        /* Testimonials */
        .testimonials {
          padding: 8rem 5%;
          background: url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
          position: relative;
        }
        
        .testimonials::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(26, 26, 46, 0.9);
        }
        
        .testimonials .section-title {
          position: relative;
          z-index: 1;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 1;
        }
        
        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .testimonial-card .quote {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .testimonial-card:hover .author-avatar img {
          transform: scale(1.1);
        }
        
        .author-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
          font-weight: 600;
        }
        
        .author-info p {
          opacity: 0.7;
          font-size: 0.9rem;
        }
        
        /* Pricing */
        .pricing {
          padding: 8rem 5%;
          background-color: var(--darker);
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .pricing-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .pricing-card:hover::before {
          opacity: 0.1;
        }
        
        .pricing-card.popular {
          border: 1px solid var(--primary);
          transform: scale(1.05);
        }
        
        .pricing-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .pricing-card.popular:hover {
          transform: scale(1.05) translateY(-10px);
        }
        
        .popular-tag {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--gradient);
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          transform: rotate(15deg);
        }
        
        .pricing-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .price {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .price span {
          font-size: 1rem;
          opacity: 0.7;
        }
        
        .pricing-features {
          margin-bottom: 2rem;
        }
        
        .pricing-feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        
        .pricing-feature svg {
          color: var(--primary);
          flex-shrink: 0;
        }
        
        .pricing-feature p {
          opacity: 0.9;
        }
        
        .pricing-button {
          width: 100%;
          text-align: center;
          padding: 0.8rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .pricing-card.popular .pricing-button {
          background: var(--gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 77, 137, 0.3);
        }
        
        .pricing-card:not(.popular) .pricing-button {
          background: transparent;
          color: white;
          border: 2px solid var(--primary);
        }
        
        .pricing-card.popular .pricing-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 77, 137, 0.4);
        }
        
        .pricing-card:not(.popular) .pricing-button:hover {
          background: rgba(255, 77, 137, 0.2);
        }
        
        /* CTA Section */
        .cta {
          padding: 8rem 5%;
          text-align: center;
          background: var(--indian-gradient);
          position: relative;
          overflow: hidden;
        }
        
        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.1.0&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
          opacity: 0.2;
          z-index: 0;
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .cta h2 {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          font-weight: 700;
        }
        
        .cta p {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        /* Footer */
        footer {
          background-color: var(--darker);
          padding: 5rem 5% 2rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-col h3 {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
          font-weight: 600;
        }
        
        .footer-col h3::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 3px;
          bottom: -8px;
          left: 0;
          background: var(--gradient);
        }
        
        .footer-col ul {
          list-style: none;
        }
        
        .footer-col li {
          margin-bottom: 0.8rem;
        }
        
        .footer-col a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .footer-col a:hover {
          color: var(--primary);
          padding-left: 5px;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          background: var(--gradient);
          transform: translateY(-3px);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0.7;
          font-size: 0.9rem;
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 2.8rem;
          }
          
          .hero-image {
            width: 50%;
          }
          
          .demo {
            flex-direction: column;
            gap: 3rem;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
          
          .mobile-nav {
            display: block;
          }
          
          .hero {
            flex-direction: column;
            text-align: center;
            padding-top: 8rem;
            height: auto;
            padding-bottom: 5rem;
          }
          
          .hero-content {
            max-width: 100%;
          }
          
          .hero-buttons {
            justify-content: center;
          }
          
          .hero-image {
            position: relative;
            right: auto;
            width: 100%;
            margin-top: 3rem;
          }
          
          .section-title h2 {
            font-size: 2rem;
          }
          
          .cta h2 {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 576px) {
          .hero h1 {
            font-size: 2.2rem;
          }
          
          .hero p {
            font-size: 1rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            gap: 1rem;
          }
          
          .cta h2 {
            font-size: 1.8rem;
          }
          
          .cta p {
            font-size: 1rem;
          }
          
          .header-buttons .cta-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;