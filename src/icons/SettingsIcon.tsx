import React from "react";

type Props = { size?: number; className?: string };

const SettingsIcon: React.FC<Props> = ({ size = 44, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    shapeRendering="geometricPrecision"
  >
    {/* smooth scalloped gear */}
    <path
      d="
        M12 4.6
        C13.3 4.6 13.6 5.6 14.4 5.9
        C15.2 6.2 16.1 5.6 17 6.5
        C17.9 7.4 17.3 8.3 17.6 9.1
        C17.9 9.9 19 10.2 19 11.5
        C19 12.8 17.9 13.1 17.6 13.9
        C17.3 14.7 17.9 15.6 17 16.5
        C16.1 17.4 15.2 16.8 14.4 17.1
        C13.6 17.4 13.3 18.4 12 18.4
        C10.7 18.4 10.4 17.4 9.6 17.1
        C8.8 16.8 7.9 17.4 7 16.5
        C6.1 15.6 6.7 14.7 6.4 13.9
        C6.1 13.1 5 12.8 5 11.5
        C5 10.2 6.1 9.9 6.4 9.1
        C6.7 8.3 6.1 7.4 7 6.5
        C7.9 5.6 8.8 6.2 9.6 5.9
        C10.4 5.6 10.7 4.6 12 4.6
        Z
      "
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />

    {/* center ring */}
    <circle
      cx="12"
      cy="11.5"
      r="2.35"
      stroke="currentColor"
      strokeWidth="1.4"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default SettingsIcon;
