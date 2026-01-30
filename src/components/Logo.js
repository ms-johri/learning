import React from 'react';

/**
 * Logo Component
 * Displays a shield lock icon representing security
 */
const Logo = ({ size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Security Logo"
    >
      {/* Shield background with gradient */}
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f0f0" />
        </linearGradient>
      </defs>
      
      {/* Shield shape */}
      <path
        d="M50 10 L85 25 L85 50 Q85 75 50 90 Q15 75 15 50 L15 25 Z"
        fill="url(#shieldGradient)"
        stroke="#5568d3"
        strokeWidth="2"
      />
      
      {/* Lock body */}
      <rect
        x="35"
        y="50"
        width="30"
        height="25"
        rx="3"
        fill="url(#lockGradient)"
        stroke="#5568d3"
        strokeWidth="1.5"
      />
      
      {/* Lock shackle */}
      <path
        d="M40 50 L40 42 Q40 35 50 35 Q60 35 60 42 L60 50"
        fill="none"
        stroke="url(#lockGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Keyhole */}
      <circle cx="50" cy="60" r="3" fill="#5568d3" />
      <rect x="48.5" y="60" width="3" height="8" rx="1.5" fill="#5568d3" />
    </svg>
  );
};

export default Logo;
