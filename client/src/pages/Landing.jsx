import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "./Landing.css";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

function Landing() {
    const navigate = useNavigate();

    return (
<<<<<<< HEAD
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
=======
        <div style={styles.page}>
            <nav style={styles.nav}>
                <div style={styles.logo}>Portal<span style={{ color: "#4f46e5" }}>QR</span></div>
                <div style={styles.navLinks}>
                    <button onClick={() => navigate("/admin/login")} style={styles.loginBtn}>Admin Login</button>
                    <button onClick={() => navigate("/admin/register")} style={styles.registerBtn}>Get Started</button>
                </div>
            </nav>

            <main style={styles.hero}>
                <h1 style={styles.heroTitle}>Transform Your Restaurant with <span style={styles.gradientText}>QR Ordering</span></h1>
                <p style={styles.heroSubtitle}>
                    The complete SaaS solution for modern dining. Manage menus, track analytics, and let your customers order instantly from their tables.
                </p>
                <div style={styles.ctaGroup}>
                    <button onClick={() => navigate("/admin/register")} style={styles.mainCta}>Build Your Digital Menu</button>
                    <button style={styles.secondaryCta}>View Live Demo</button>
                </div>
            </main>

            <section style={styles.features}>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Instant menu loads and real-time order tracking for your kitchen.</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>📊</div>
                    <h3>Power Analytics</h3>
                    <p>Track revenue, popular items, and customer behavior with ease.</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>📱</div>
                    <h3>Zero App Install</h3>
                    <p>Customers just scan and order. No app downloads required.</p>
                </div>
            </section>

            <footer style={styles.footer}>
                <p>© 2026 PortalQR SaaS. All rights reserved.</p>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            </footer>
        </div>
    );
}

<<<<<<< HEAD
=======
const styles = {
    page: {
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "'Outfit', sans-serif"
    },
    nav: {
        padding: "20px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    logo: {
        fontSize: "1.75rem",
        fontWeight: "800",
        letterSpacing: "-1px"
    },
    navLinks: {
        display: "flex",
        gap: "20px"
    },
    loginBtn: {
        background: "none",
        border: "none",
        color: "#94a3b8",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "1rem"
    },
    registerBtn: {
        background: "#4f46e5",
        color: "white",
        padding: "10px 24px",
        borderRadius: "10px",
        border: "none",
        fontWeight: "700",
        cursor: "pointer"
    },
    hero: {
        padding: "120px 20px",
        textAlign: "center",
        maxWidth: "1000px",
        margin: "0 auto"
    },
    heroTitle: {
        fontSize: "4.5rem",
        fontWeight: "900",
        lineHeight: 1.1,
        marginBottom: "25px",
        letterSpacing: "-2px"
    },
    gradientText: {
        background: "linear-gradient(to right, #818cf8, #c084fc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    heroSubtitle: {
        fontSize: "1.25rem",
        color: "#94a3b8",
        maxWidth: "700px",
        margin: "0 auto 40px",
        lineHeight: 1.6
    },
    ctaGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "20px"
    },
    mainCta: {
        padding: "18px 36px",
        fontSize: "1.1rem",
        fontWeight: "700",
        background: "#4f46e5",
        color: "white",
        borderRadius: "14px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)"
    },
    secondaryCta: {
        padding: "18px 36px",
        fontSize: "1.1rem",
        fontWeight: "700",
        background: "rgba(255,255,255,0.05)",
        color: "white",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer"
    },
    features: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "30px",
        padding: "100px 80px",
        maxWidth: "1400px",
        margin: "0 auto"
    },
    featureCard: {
        background: "rgba(255,255,255,0.03)",
        padding: "40px",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "transform 0.3s"
    },
    icon: {
        fontSize: "2.5rem",
        marginBottom: "20px"
    },
    footer: {
        padding: "40px",
        textAlign: "center",
        color: "#475569",
        borderTop: "1px solid rgba(255,255,255,0.05)"
    }
};

>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
export default Landing;
