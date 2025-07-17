import React from 'react';
import { FaCamera, FaPalette, FaCalendarAlt, FaTshirt, FaLock, FaCheckCircle, FaCheck, FaInstagram, FaTwitter, FaPinterest, FaTiktok } from 'react-icons/fa';

const StyleSense = () => {
  return (
   <div style={{ paddingTop: '80px' }}>  {/* Add this line */}
      

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Perfect Style with <span>AI Fashion Assistant</span></h1>
          <p>StyleSense uses advanced artificial intelligence to analyze your outfits, suggest improvements, and help you develop a personal style that boosts your confidence. All while keeping your data 100% private.</p>
          <div className="hero-buttons">
            <button className="cta-button">Try It Free</button>
            <button className="secondary-button">See How It Works</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80" alt="StyleSense App Preview" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-title">
          <h2>Revolutionary <span style={{ background: 'linear-gradient(135deg, #FF4D89, #FF9E80)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AI-Powered</span> Features</h2>
          <p>StyleSense combines cutting-edge technology with fashion expertise to transform your style journey</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaCamera />
            </div>
            <h3>Outfit Analysis</h3>
            <p>Upload photos of your outfits and receive instant feedback on color combinations, fit, and style appropriateness.</p>
            <span className="feature-tag">NEW</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaPalette />
            </div>
            <h3>Skin Tone Matching</h3>
            <p>Our AI detects your skin undertones and recommends the most flattering color palettes specifically for you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <h3>Style Calendar</h3>
            <p>Plan your outfits in advance based on weather forecasts, events, and your personal schedule.</p>
            <span className="feature-tag">COMING SOON</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaTshirt />
            </div>
            <h3>Virtual Try-On</h3>
            <p>See how clothes will look on you before buying with our augmented reality technology.</p>
            <span className="feature-tag">BETA</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-wardrobe"></i>
            </div>
            <h3>Smart Wardrobe</h3>
            <p>Catalog your clothes and get AI-generated outfit suggestions from items you already own.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLock />
            </div>
            <h3>100% Private</h3>
            <p>Your photos and style data never leave your device. We believe in fashion without compromise.</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo" id="how-it-works">
        <div className="demo-content">
          <h2>How <span>StyleSense</span> Transforms Your Style</h2>
          <p>Our proprietary AI technology analyzes multiple aspects of your outfits to provide personalized recommendations that evolve with your style journey.</p>
          
          <div className="demo-features">
            <div className="demo-feature">
              <FaCheckCircle />
              <div>
                <h4>Color Harmony Analysis</h4>
                <p>Get detailed feedback on which color combinations work best for your complexion and personal aesthetic.</p>
              </div>
            </div>
            <div className="demo-feature">
              <FaCheckCircle />
              <div>
                <h4>Body Type Recommendations</h4>
                <p>Learn which cuts and silhouettes flatter your unique body shape for maximum confidence.</p>
              </div>
            </div>
            <div className="demo-feature">
              <FaCheckCircle />
              <div>
                <h4>Occasion-Specific Advice</h4>
                <p>From job interviews to first dates, get tailored suggestions for any event in your calendar.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="demo-image">
          <img src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80" alt="StyleSense App Interface" />
          <div className="demo-badge">AI-POWERED</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="section-title">
          <h2>What Our <span style={{ background: 'linear-gradient(135deg, #FF4D89, #FF9E80)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Users</span> Say</h2>
          <p>Join thousands who have transformed their style confidence with StyleSense</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="quote">"StyleSense completely changed how I dress. The color analysis showed me why certain outfits didn't work and helped me build a wardrobe that actually suits me."</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah J." />
              </div>
              <div className="author-info">
                <h4>Sarah J.</h4>
                <p>Marketing Executive</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"I used to waste so much time deciding what to wear. Now I just check StyleSense and know I'll look my best. The privacy focus was what convinced me to try it."</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="David T." />
              </div>
              <div className="author-info">
                <h4>David T.</h4>
                <p>Software Developer</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"The virtual try-on feature saved me hundreds on clothes that wouldn't have suited me. This app pays for itself in avoided fashion mistakes!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya M." />
              </div>
              <div className="author-info">
                <h4>Priya M.</h4>
                <p>Graphic Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="section-title">
          <h2>Simple, <span style={{ background: 'linear-gradient(135deg, #FF4D89, #FF9E80)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Transparent</span> Pricing</h2>
          <p>Choose the plan that fits your style journey</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">$0<span>/month</span></div>
            <div className="pricing-features">
              <div className="pricing-feature">
                <FaCheck />
                <p>5 outfit analyses per month</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Basic color recommendations</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Style journal</p>
              </div>
            </div>
            <button className="pricing-button">Get Started</button>
          </div>
          <div className="pricing-card popular">
            <div className="popular-tag">MOST POPULAR</div>
            <h3>Premium</h3>
            <div className="price">$9.99<span>/month</span></div>
            <div className="pricing-features">
              <div className="pricing-feature">
                <FaCheck />
                <p>Unlimited outfit analyses</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Advanced skin tone matching</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Virtual try-on (AR)</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Smart wardrobe organizer</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Priority support</p>
              </div>
            </div>
            <button className="pricing-button">Choose Premium</button>
          </div>
          <div className="pricing-card">
            <h3>Professional</h3>
            <div className="price">$24.99<span>/month</span></div>
            <div className="pricing-features">
              <div className="pricing-feature">
                <FaCheck />
                <p>Everything in Premium</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>1-on-1 style consultation</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Personal shopping assistant</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Exclusive trend reports</p>
              </div>
              <div className="pricing-feature">
                <FaCheck />
                <p>Business expense tracking</p>
              </div>
            </div>
            <button className="pricing-button">Go Professional</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Style?</h2>
          <p>Join over 250,000 users who have discovered their perfect look with StyleSense. Start your 7-day free trial today—no credit card required.</p>
          <button className="cta-button">Start Your Free Trial</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h3>StyleSense</h3>
            <p>Your personal AI fashion assistant, helping you discover and refine your unique style with confidence.</p>
            <div className="social-links">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaPinterest /></a>
              <a href="#"><FaTiktok /></a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Features</h3>
            <ul>
              <li><a href="#">Outfit Analysis</a></li>
              <li><a href="#">Color Matching</a></li>
              <li><a href="#">Virtual Try-On</a></li>
              <li><a href="#">Smart Wardrobe</a></li>
              <li><a href="#">Style Calendar</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Style Guides</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Developer API</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 StyleSense. All rights reserved. AI fashion for everyone.</p>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        :root {
          --primary: #FF4D89;
          --secondary: #FF9E80;
          --dark: #1A1A2E;
          --darker: #16213E;
          --light: #F8F8F8;
          --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
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
        }
        
        /* Header */
        header {
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
        }
        .hero {
  padding-top: 80px;  /* Add this line */
  height: 100vh;
  /* ... rest of your styles ... */
}
        nav a:hover {
          color: var(--primary);
        }
        
        nav a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
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
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 77, 137, 0.3);
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 5%;
          position: relative;
          overflow: hidden;
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
        }
        
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .hero h1 span {
          background: var(--gradient);
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
        }
        
        .section-title p {
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.8;
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
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
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
        }
        
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
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
        }
        
        .demo-content h2 span {
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .demo-content p {
          opacity: 0.9;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .demo-features {
          margin-top: 2rem;
        }
        
        .demo-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .demo-feature i {
          color: var(--primary);
          font-size: 1.2rem;
          margin-top: 0.2rem;
        }
        
        .demo-feature h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
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
        }
        
        .demo-badge {
          position: absolute;
          top: -20px;
          right: -20px;
          background: var(--gradient);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(255, 77, 137, 0.3);
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
        }
        
        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .author-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
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
        
        .pricing-card.popular {
          border: 1px solid var(--primary);
          transform: scale(1.05);
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
        }
        
        .pricing-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
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
        
        .pricing-feature i {
          color: var(--primary);
        }
        
        .pricing-button {
          width: 100%;
          text-align: center;
          padding: 0.8rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .pricing-card.popular .pricing-button {
          background: var(--gradient);
          color: white;
        }
        
        .pricing-card:not(.popular) .pricing-button {
          background: transparent;
          color: white;
          border: 2px solid var(--primary);
        }
        
        .pricing-card.popular .pricing-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 77, 137, 0.3);
        }
        
        .pricing-card:not(.popular) .pricing-button:hover {
          background: rgba(255, 77, 137, 0.2);
        }
        
        /* CTA Section */
        .cta {
          padding: 8rem 5%;
          text-align: center;
          background: var(--gradient);
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
          nav {
            display: none;
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
        }
      `}</style>
    </div>
  );
};

export default StyleSense;