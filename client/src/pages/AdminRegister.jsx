import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminRegister() {
    const [formData, setFormData] = useState({
        adminName: "",
        restaurantName: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/admin/register", formData, { withCredentials: true });
            alert(res.data.message || "Registration Successful! ✅");
            navigate("/admin/login");
        } catch (err) {
            console.error("Registration Error:", err);
            const msg = err.response?.data?.message || err.message || "Registration failed";
            alert(msg);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Join PortalQR</h2>
                <p style={styles.subtitle}>Setup your restaurant's digital presence in minutes</p>

                <form onSubmit={handleRegister} style={styles.form}>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Admin Name</label>
                            <input
                                name="adminName"
                                placeholder="John Doe"
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Restaurant Name (Unique Slug)</label>
                            <input
                                name="restaurantName"
                                placeholder="marios-pizza"
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Phone Number</label>
                            <input
                                name="phone"
                                placeholder="+91 98765 43210"
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Restaurant Address</label>
                        <textarea
                            name="address"
                            placeholder="123 Street, City, State, ZIP"
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.submitBtn}>
                        Create Company Account
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already have an account? <Link to="/admin/login" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "40px 20px"
    },
    card: {
        width: "100%",
        maxWidth: "800px",
        background: "white",
        padding: "50px",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: "10px",
        textAlign: "center",
        letterSpacing: "-1px"
    },
    subtitle: {
        color: "#64748b",
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "1.1rem"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "20px"
    },
    label: {
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#475569"
    },
    input: {
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        fontSize: "1rem",
        outline: "none",
        transition: "border-color 0.2s"
    },
    textarea: {
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        fontSize: "1rem",
        minHeight: "100px",
        outline: "none",
        resize: "vertical"
    },
    submitBtn: {
        width: "100%",
        padding: "16px",
        background: "#4f46e5",
        color: "white",
        borderRadius: "12px",
        border: "none",
        fontWeight: "700",
        fontSize: "1.1rem",
        cursor: "pointer",
        marginTop: "20px",
        transition: "transform 0.2s, background 0.2s"
    },
    footerText: {
        textAlign: "center",
        marginTop: "30px",
        color: "#64748b"
    },
    link: {
        color: "#4f46e5",
        fontWeight: "600",
        textDecoration: "none"
    }
};

export default AdminRegister;
