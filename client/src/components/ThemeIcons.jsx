import React from 'react';

const IconWrapper = ({ children, size = 48, color = "var(--primary)" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'all 0.3s ease' }}
            className="theme-icon-svg"
        >
            {children}
        </svg>
    );
};

export const MenuIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconWrapper>
);

export const OrdersIcon = (props) => (
    <IconWrapper {...props}>
        <path d="m5 11 4-7" />
        <path d="m19 11-4-7" />
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
    </IconWrapper>
);

export const AnalyticsIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
    </IconWrapper>
);

export const ManagementIcon = (props) => (
    <IconWrapper {...props}>
        {/* Abstract Folder/Grid Container */}
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeOpacity="0.3" />
        {/* Floating Gear/Management Element */}
        <circle cx="12" cy="13" r="3" />
        <path d="M12 10v1m0 4v1m-3-3h1m4 0h1" />
    </IconWrapper>
);

export const NotifIcon = (props) => (
    <IconWrapper {...props}>
        {/* Modern Bell Body */}
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        {/* Duo-tone clapper */}
        <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeOpacity="0.5" />
        {/* Notification dot */}
        <circle cx="18" cy="5" r="2" fill="currentColor" stroke="none" />
    </IconWrapper>
);

export const StatusIcon = (props) => (
    <IconWrapper {...props}>
        {/* Outer Orbit */}
        <path d="M12 2a10 10 0 1 0 10 10" strokeOpacity="0.3" />
        {/* Inner Progress */}
        <path d="M12 6v6l4 2" />
        {/* Accent Point */}
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <path d="M22 12a10 10 0 0 0-10-10" />
    </IconWrapper>
);

export const RevenueIcon = (props) => (
    <IconWrapper {...props}>
        {/* Background Trend Line */}
        <path d="M3 20c2-2 4-8 7-8s5 4 8 2" strokeOpacity="0.3" />
        {/* Revenue Symbol */}
        <path d="M12 3v18M15 7H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H9" />
    </IconWrapper>
);

export const CartIcon = (props) => (
    <IconWrapper {...props}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h1.9l2.6 12.4a2 2 0 0 0 2 1.55h9.8a2 2 0 0 0 2-1.55L21.95 5.05h-15.3" />
    </IconWrapper>
);

export const DishIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M12 11h.01" />
        <path d="M12 7h.01" />
        <path d="M12 15h.01" />
        <path d="M16 11h.01" />
        <path d="M8 11h.01" />
        <path d="M22 17c0 2.209-4.477 4-10 4S2 19.209 2 17s4.477-4 10-4 10 1.791 10 4z" />
        <path d="M19 17a7 7 0 0 0-14 0" />
    </IconWrapper>
);

export const TableIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M12 3v18" />
        <path d="M3 13h18" />
        <path d="M3 7h18" />
    </IconWrapper>
);

export const QRCodeIcon = (props) => (
    <IconWrapper {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M7 7h.01M17 7h.01M7 17h.01" />
    </IconWrapper>
);

export const ForkKnifeIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M18 8V2" />
        <path d="M14 8V2" />
        <path d="M22 2v20" />
        <path d="M18 22v-7a3 3 0 0 0-6 0v7" />
        <path d="M10 2v20" />
        <path d="M2 2v10a3 3 0 0 0 6 0V2" />
    </IconWrapper>
);

export const ArrowUpRightIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </IconWrapper>
);

/* Illustrative Icons Matching 3rd Reference Image */

export const ClocheIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <path d="M2 18h20" stroke="black" strokeWidth="1.5" />
        <path d="M5 18a7 7 0 0 1 14 0" stroke="black" strokeWidth="1.5" />
        <circle cx="12" cy="7" r="1" stroke="black" strokeWidth="1.5" />
        <path d="M12 11h.01" stroke="black" strokeWidth="1.5" />
        <path d="M2 20h20" stroke="black" strokeWidth="1.5" strokeOpacity="0.2" />
    </IconWrapper>
);

export const CalendarChartIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="black" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="black" strokeWidth="1.5" />
        <path d="M8 2v4M16 2v4" stroke="black" strokeWidth="1.5" />
        <path d="M7 14v2M12 12v4M17 13v3" stroke="black" strokeWidth="1.5" />
    </IconWrapper>
);

export const CoinDishIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <ellipse cx="12" cy="16" rx="10" ry="4" stroke="black" strokeWidth="1.5" />
        <circle cx="12" cy="10" r="4" stroke="black" strokeWidth="1.5" />
        <path d="M12 8v4M10 10h4" stroke="black" strokeWidth="1.5" />
        <path d="M22 16v2c0 2.2-4.5 4-10 4s-10-1.8-10-4v-2" stroke="black" strokeWidth="1.5" strokeOpacity="0.3" />
    </IconWrapper>
);

export const GrowthIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <path d="M3 20h18" stroke="black" strokeWidth="1.5" />
        <path d="M6 16l4-4 3 3 7-7" stroke="black" strokeWidth="1.5" />
        <path d="M16 8h4v4" stroke="black" strokeWidth="1.5" />
        <path d="M5 11v1M9 8v1M13 5v1" stroke="black" strokeWidth="1.5" strokeOpacity="0.3" />
    </IconWrapper>
);

export const ClipboardCheckIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <rect x="8" y="2" width="8" height="4" rx="1" stroke="black" strokeWidth="1.5" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="black" strokeWidth="1.5" />
        <path d="M9 14l2 2 4-4" stroke="black" strokeWidth="1.5" />
        <path d="M8 10h8" stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
    </IconWrapper>
);

export const ServerChefIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <path d="M6 3v5c0 2 2 4 4 4s4-2 4-4V3" stroke="black" strokeWidth="2" />
        <path d="M10 12v10M8 22h4" stroke="black" strokeWidth="2" />
        <path d="M18 3v19" stroke="black" strokeWidth="2" />
        <path d="M16 11h4" stroke="black" strokeWidth="2" />
        <path d="M16 15h4" stroke="black" strokeWidth="2" />
    </IconWrapper>
);

export const LogoutIcon = (props) => (
    <IconWrapper {...props} size={props.size || 24}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </IconWrapper>
);

export const SettingsProfileIcon = (props) => (
    <IconWrapper {...props} color="currentColor">
        <circle cx="12" cy="7" r="4" stroke="black" strokeWidth="1.5" />
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" stroke="black" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="3" fill="white" stroke="black" strokeWidth="1" />
        <path d="M18 17v2M17 18h2" stroke="black" strokeWidth="1" />
    </IconWrapper>
);

export const RibbonBadgeIcon = ({ rank = 1, size = 32 }) => {
    const colors = {
        1: "#FFD700", // Gold
        2: "#C0C0C0", // Silver
        3: "#CD7F32"  // Bronze
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M7 12L3 22l4-2 4 2 4-2 4 2-4-10" fill={colors[rank]} stroke="black" strokeWidth="1" strokeLinejoin="round" />
            <circle cx="12" cy="8" r="6" fill={colors[rank]} stroke="black" strokeWidth="1" />
            <text x="12" y="10" fontSize="6" fontWeight="bold" textAnchor="middle" fill="black">#{rank}</text>
        </svg>
    );
};
