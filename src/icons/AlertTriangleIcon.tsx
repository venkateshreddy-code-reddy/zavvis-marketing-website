import React from "react";

type Props = { size?: number; className?: string };

const AlertTriangleIcon: React.FC<Props> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 4l9 16H3L12 4z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M12 9v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default AlertTriangleIcon;
