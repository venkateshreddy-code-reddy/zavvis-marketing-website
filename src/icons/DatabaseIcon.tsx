import React from "react";

type Props = { size?: number; className?: string };

const DatabaseIcon: React.FC<Props> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <ellipse cx="12" cy="5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DatabaseIcon;
