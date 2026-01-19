import React from "react";

type Props = { size?: number; className?: string };

const ClipboardIcon: React.FC<Props> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect
      x="7"
      y="5"
      width="10"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M9 5V4h6v1"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ClipboardIcon;
