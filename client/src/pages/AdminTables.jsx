import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AdminTables() {
    const [tableCount, setTableCount] = useState(0);
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCurrentTables = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
            if (res.data.tables) {
                setTableCount(res.data.tables);
                // If they have tables, generate the QR codes display
                handleGenerate(null, res.data.tables);
            }
        } catch (err) {
            console.error("Error fetching admin details", err);
        }
    };

    useEffect(() => {
        fetchCurrentTables();
    }, []);

    const handleGenerate = async (e, countOverride) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const count = countOverride || tableCount;
            const res = await axios.post(
                "http://localhost:5000/api/admin/tables",
                { tables: count },
                { withCredentials: true }
            );
            setQrCodes(res.data.qrCodes);
            alert(res.data.message);
        } catch (err) {
            alert("Failed to generate tables");
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = (qr, table) => {
        const link = document.createElement("a");
        link.href = qr;
        link.download = `Table-${table}-QR.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={styles.page}>
            <AdminNavbar />
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Table & QR Management</h1>
                    <p style={styles.subtitle}>Generate and download QR codes for each table in your restaurant.</p>
                </header>

                <div style={styles.setupCard}>
                    <h2 style={styles.cardTitle}>Set Table Count</h2>
                    <form onSubmit={handleGenerate} style={styles.form}>
                        <input
                            type="number"
                            value={tableCount}
                            onChange={(e) => setTableCount(e.target.value)}
                            placeholder="Enter number of tables (e.g. 10)"
                            style={styles.input}
                            min="1"
                        />
                        <button type="submit" disabled={loading} style={styles.generateBtn}>
                            {loading ? "Generating..." : "Generate & Save QR Codes"}
                        </button>
                    </form>
                </div>

                {qrCodes.length > 0 && (
                    <div style={styles.qrGrid}>
                        {qrCodes.map((item) => (
                            <div key={item.table} style={styles.qrCard}>
                                <div style={styles.qrHeader}>
                                    <span style={styles.qrLabel}>TABLE</span>
                                    <span style={styles.qrNum}>{item.table}</span>
                                </div>
                                <img src={item.qr} alt={`Table ${item.table}`} style={styles.qrImage} />
                                <p style={styles.qrUrl}>{item.url}</p>
                                <button onClick={() => downloadQR(item.qr, item.table)} style={styles.downloadBtn}>
                                    Download PNG
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Outfit', sans-serif"
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px"
    },
    header: {
        marginBottom: "40px"
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#0f172a",
        margin: 0
    },
    subtitle: {
        color: "#64748b",
        fontSize: "1.1rem"
    },
    setupCard: {
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        marginBottom: "40px",
        maxWidth: "500px"
    },
    cardTitle: {
        fontSize: "1.25rem",
        fontWeight: "700",
        marginBottom: "20px",
        color: "#1e293b"
    },
    form: {
        display: "flex",
        gap: "15px"
    },
    input: {
        flex: 1,
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        fontSize: "1rem",
        outline: "none"
    },
    generateBtn: {
        padding: "12px 24px",
        background: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "background 0.2s"
    },
    qrGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
    },
    qrCard: {
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        border: "1px solid #f1f5f9"
    },
    qrHeader: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px"
    },
    qrLabel: {
        fontSize: "0.65rem",
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: "0.1em"
    },
    qrNum: {
        fontSize: "1.25rem",
        fontWeight: "800",
        color: "#1e293b"
    },
    qrImage: {
        width: "100%",
        maxWidth: "150px",
        margin: "0 auto 15px",
        display: "block"
    },
    qrUrl: {
        fontSize: "0.7rem",
        color: "#94a3b8",
        wordBreak: "break-all",
        marginBottom: "15px"
    },
    downloadBtn: {
        width: "100%",
        padding: "10px",
        background: "#f1f5f9",
        color: "#4f46e5",
        borderRadius: "8px",
        border: "none",
        fontWeight: "700",
        fontSize: "0.85rem",
        cursor: "pointer"
    }
};

export default AdminTables;
