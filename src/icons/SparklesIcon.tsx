import React from "react";

type Props = { size?: number; className?: string };

const SparklesIcon: React.FC<Props> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 15l.7 1.8L21 17.5l-1.8.7L18.5 20l-.7-1.8L16 17.5l1.8-.7.7-1.8z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

export default SparklesIcon;
