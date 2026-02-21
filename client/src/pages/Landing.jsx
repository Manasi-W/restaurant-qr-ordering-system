import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
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
            </footer>
        </div>
    );
}

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

export default Landing;
