import React from "react";

type Props = { size?: number; className?: string };

const HomeIcon: React.FC<Props> = ({ size = 44, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    shapeRendering="geometricPrecision"
  >
    {/* bars (shorter + softer like screenshot) */}
    <path
      d="M7.2 18v-4.2"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M12 18v-7.6"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M16.8 18v-5.4"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />

    {/* smooth trend (simple arch) */}
    <path
      d="M7.2 10.6C9 9.2 10.6 8.8 12 9.2C13.6 9.6 15 10.6 16.8 11.1"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />

    {/* filled nodes (solid dots like top image) */}
    <circle cx="7.2" cy="10.6" r="1.05" fill="currentColor" />
    <circle cx="12" cy="9.2" r="1.05" fill="currentColor" />
    <circle cx="16.8" cy="11.1" r="1.05" fill="currentColor" />
  </svg>
);

export default HomeIcon;
