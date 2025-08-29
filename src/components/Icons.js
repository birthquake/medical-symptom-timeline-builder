import React from 'react';

// Universal Icon System for TrackRX
// Consistent styling and behavior across all components

const Icon = ({ children, size = 20, color = "#64748B", className = "", ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ flexShrink: 0 }}
    {...props}
  >
    {React.cloneElement(children, { 
      stroke: color, 
      strokeWidth: "2", 
      strokeLinecap: "round", 
      strokeLinejoin: "round" 
    })}
  </svg>
);

// Navigation Icons
export const HomeIcon = ({ size = 20, color = "#64748B", active = false }) => (
  <Icon size={size} color={active ? "#3B82F6" : color}>
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
          fill={active ? "#EFF6FF" : "none"} />
    <path d="M9 22V12H15V22" />
  </Icon>
);

export const SymptomsIcon = ({ size = 20, color = "#64748B", active = false, severity }) => (
  <Icon size={size} color={active ? "#3B82F6" : (severity ? getSeverityColor(severity) : color)}>
    <path d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.8945 18.9999 9.14881 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" 
          fill={active ? "#EFF6FF" : "none"} />
  </Icon>
);

export const MedsIcon = ({ size = 20, color = "#64748B", active = false }) => (
  <Icon size={size} color={active ? "#3B82F6" : color}>
    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
          fill={active ? "#EFF6FF" : color} />
  </Icon>
);

export const TimelineIcon = ({ size = 20, color = "#64748B", active = false }) => (
  <Icon size={size} color={active ? "#3B82F6" : color}>
    <circle cx="12" cy="12" r="3" fill={active ? "#3B82F6" : "none"} />
    <path d="M12 1V9M21 5L16 7.5M21 19L16 16.5M12 15V23M3 5L8 7.5M3 19L8 16.5" />
  </Icon>
);

export const ReportsIcon = ({ size = 20, color = "#64748B", active = false }) => (
  <Icon size={size} color={active ? "#3B82F6" : color}>
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
          fill={active ? "#EFF6FF" : "none"} />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </Icon>
);

export const InfoIcon = ({ size = 20, color = "#DC2626", active = false }) => (
  <Icon size={size} color={active ? "#DC2626" : color}>
    <circle cx="12" cy="12" r="10" fill={active ? "#FEF2F2" : "none"} />
    <path d="M12 16V12M12 8H12.01" />
  </Icon>
);

// Action Icons
export const PlusIcon = ({ size = 20, color = "white" }) => (
  <Icon size={size} color={color}>
    <path d="M12 5V19M5 12H19" />
  </Icon>
);

export const CheckIcon = ({ size = 20, color = "white" }) => (
  <Icon size={size} color={color}>
    <polyline points="20,6 9,17 4,12" />
  </Icon>
);

export const CheckCircleIcon = ({ size = 20, color = "#10B981" }) => (
  <Icon size={size} color={color}>
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18211 2.99721 7.13214 4.39828 5.49883C5.79935 3.86553 7.69279 2.72636 9.79619 2.24899C11.8996 1.77161 14.1003 1.98166 16.07 2.85" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </Icon>
);

export const CloseIcon = ({ size = 20, color = "#64748B" }) => (
  <Icon size={size} color={color}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const TrashIcon = ({ size = 16, color = "#EF4444" }) => (
  <Icon size={size} color={color}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" />
  </Icon>
);

// Medical Icons
export const AlertTriangleIcon = ({ size = 24, color = "#DC2626" }) => (
  <Icon size={size} color={color}>
    <path d="M10.29 3.86L1.82 18C1.64466 18.3024 1.55611 18.6453 1.56331 18.9945C1.57051 19.3437 1.67328 19.6831 1.8602 19.9768C2.04711 20.2705 2.31235 20.5068 2.62701 20.6599C2.94167 20.813 3.29322 20.8774 3.64 20.845H20.36C20.7068 20.8774 21.0583 20.813 21.373 20.6599C21.6876 20.5068 21.9529 20.2705 22.1398 19.9768C22.3267 19.6831 22.4295 19.3437 22.4367 18.9945C22.4439 18.6453 22.3553 18.3024 22.18 18L13.71 3.86C13.5217 3.56611 13.2592 3.32312 12.9476 3.15447C12.6359 2.98582 12.2849 2.89746 11.9286 2.89746C11.5723 2.89746 11.2213 2.98582 10.9096 3.15447C10.598 3.32312 10.3355 3.56611 10.1472 3.86H10.29Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" fill={color} />
  </Icon>
);

export const PhoneIcon = ({ size = 20, color = "#EF4444" }) => (
  <Icon size={size} color={color}>
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06719 2.16708 8.43828 2.48353C8.80936 2.79999 9.05307 3.23945 9.10999 3.72C9.21656 4.68007 9.42138 5.62273 9.71999 6.53C9.86681 6.88792 9.90788 7.27691 9.83889 7.65088C9.7699 8.02485 9.59408 8.36811 9.32999 8.64L8.08999 9.88C9.513 12.4135 11.5865 14.487 14.12 15.91L15.36 14.67C15.6319 14.4059 15.9751 14.2301 16.3491 14.1611C16.7231 14.0921 17.1121 14.1332 17.47 14.28C18.3773 14.5786 19.3199 14.7834 20.28 14.89C20.7658 14.9485 21.2094 15.1962 21.5265 15.5739C21.8437 15.9516 22.0122 16.4297 21.9999 16.92H22Z" />
  </Icon>
);

export const ShieldIcon = ({ size = 24, color = "#3B82F6" }) => (
  <Icon size={size} color={color}>
    <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" />
  </Icon>
);

export const BookOpenIcon = ({ size = 24, color = "#10B981" }) => (
  <Icon size={size} color={color}>
    <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" />
    <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" />
  </Icon>
);

export const ScaleIcon = ({ size = 24, color = "#64748B" }) => (
  <Icon size={size} color={color}>
    <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z" />
    <path d="M8 21C10.2091 21 12 19.2091 12 17C12 14.7909 10.2091 13 8 13C5.79086 13 4 14.7909 4 17C4 19.2091 5.79086 21 8 21Z" />
    <path d="M8 3L16 21" />
  </Icon>
);

// Utility Icons
export const CalendarIcon = ({ size = 16, color = "#64748B" }) => (
  <Icon size={size} color={color}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const ClockIcon = ({ size = 16, color = "#64748B" }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </Icon>
);

export const FilterIcon = ({ size = 16, color = "#64748B" }) => (
  <Icon size={size} color={color}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
  </Icon>
);

export const ChartIcon = ({ size = 16, color = "#3B82F6" }) => (
  <Icon size={size} color={color}>
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
  </Icon>
);

export const PrintIcon = ({ size = 20, color = "white" }) => (
  <Icon size={size} color={color}>
    <polyline points="6,9 6,2 18,2 18,9" />
    <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" />
    <rect x="6" y="14" width="12" height="8" />
  </Icon>
);

// Helper Functions
export const getSeverityColor = (severity) => {
  if (severity <= 3) return '#10B981'; // Green - mild
  if (severity <= 6) return '#F59E0B'; // Yellow - moderate  
  return '#EF4444'; // Red - severe
};

export const getSeverityBgColor = (severity) => {
  if (severity <= 3) return '#ECFDF5'; // Green bg
  if (severity <= 6) return '#FFFBEB'; // Yellow bg 
  return '#FEF2F2'; // Red bg
};

export const getSeverityLabel = (severity) => {
  if (severity <= 3) return 'Mild';
  if (severity <= 6) return 'Moderate';
  return 'Severe';
};
