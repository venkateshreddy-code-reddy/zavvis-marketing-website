import React from "react";

type Props = { size?: number; className?: string };

const GridIcon: React.FC<Props> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);

export default GridIcon;
