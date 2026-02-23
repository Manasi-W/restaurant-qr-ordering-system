import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Dine<span>Dash</span></div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it Works</a>
                    <button onClick={() => navigate("/admin/login")} className="btn-food" style={{ background: 'transparent', color: 'var(--text-dark)', padding: '0.8rem 1.5rem' }}>Login</button>
                    <button onClick={() => navigate("/admin/register")} className="btn-food btn-primary-food">Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1>QR Ordering for Modern Restaurants</h1>
                    <p>
                        Eliminate manual order taking and reduce service delays.
                        Allow customers to scan a QR code at their table to view
                        your digital menu and place orders directly from their phones.
                    </p>
                    <div className="hero-ctas">
                        <button onClick={() => navigate("/admin/register")} className="btn-food btn-primary-food">Get Started</button>
                        <button onClick={() => navigate("/admin/login")} className="btn-food btn-secondary-food">Admin Dashboard</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <img
                        src="https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=800&h=600&fit=crop&auto=format"
                        alt="Fresh plated dish"
                        className="floating-plate"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&auto=format';
                        }}
                    />
                </div>
            </header>

            {/* Features Section - Reusing "Top List" Grid */}
            <section id="features" className="top-list">
                <div className="section-head">
                    <h2>Key Benefits</h2>
                    <p>Structured order management for your restaurant</p>
                </div>
                <div className="dishes-grid">
                    <div className="dish-card">
                        <div className="service-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                        <div className="dish-info">
                            <h3>Digital Menus</h3>
                            <p>Beautiful, contactless menus that are always up to date. No more paper menu costs.</p>
                        </div>
                    </div>
                    <div className="dish-card">
                        <div className="service-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                        <div className="dish-info">
                            <h3>Instant Orders</h3>
                            <p>Orders go straight to the kitchen. Track preparation and service from your dashboard.</p>
                        </div>
                    </div>
                    <div className="dish-card">
                        <div className="service-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                        <div className="dish-info">
                            <h3>Secure Analytics</h3>
                            <p>Monitor total orders, revenue, and popular items through your dedicated admin dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - Reusing "Featured" Style */}
            <section id="how-it-works" className="featured-dish">
                <div className="featured-img-container">
                    <img 
                        src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop&auto=format" 
                        className="featured-img" 
                        alt="Fresh food presentation"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format';
                        }}
                    />
                </div>
                <div className="featured-text">
                    <h2>Everything in One Place</h2>
                    <p>
                        Manage your menu—add, update, or remove items in seconds.
                        Orders flow to the kitchen and you stay in control with a
                        simple dashboard that keeps your restaurant running smoothly.
                    </p>
                    <button onClick={() => navigate("/admin/register")} className="btn-food btn-secondary-food">Create Your Account →</button>
                </div>
            </section>

            {/* Popular / Feedback-style section with food imagery */}
            <section className="feedback-section">
                <div className="section-head">
                    <h2>Why Restaurants Love Us</h2>
                    <p>Simple, reliable ordering that fits your flow</p>
                </div>
                <div className="feedback-grid">
                    <div className="feedback-card">
                        <img 
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format" 
                            alt="Fresh salad" 
                            className="feedback-img"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format';
                            }}
                        />
                        <h3>Fresh & Simple</h3>
                        <p>Customers browse your menu on their phone—no paper, no hassle. Always up to date.</p>
                    </div>
                    <div className="feedback-card">
                        <img 
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format" 
                            alt="Wood-fired pizza" 
                            className="feedback-img"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format';
                            }}
                        />
                        <h3>Orders That Flow</h3>
                        <p>Every order lands in your dashboard. Update status and keep the kitchen in sync.</p>
                    </div>
                    <div className="feedback-card">
                        <img 
                            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format" 
                            alt="Breakfast spread" 
                            className="feedback-img"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&auto=format';
                            }}
                        />
                        <h3>Built for You</h3>
                        <p>One dashboard for menu, orders, and tables. Get started in minutes, not days.</p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem' }}>Core Capabilities</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">📝</div>
                        <h3>Menu Management</h3>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🔔</div>
                        <h3>Order Notifications</h3>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🥘</div>
                        <h3>Order Status</h3>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">💳</div>
                        <h3>Revenue Insight</h3>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-foodly">
                <div className="footer-top">
                    <div className="footer-col">
                        <div className="logo">Dine<span>Dash</span></div>
                        <p style={{ marginTop: '1rem', color: '#bdc3c7' }}>Modernizing the dining experience through simple QR solutions.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li onClick={() => navigate("/admin/login")}>Admin Login</li>
                            <li onClick={() => navigate("/admin/register")}>Get Started</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <p style={{ color: '#bdc3c7' }}>support@dinedash.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 DineDash (QR Ordering System). All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
