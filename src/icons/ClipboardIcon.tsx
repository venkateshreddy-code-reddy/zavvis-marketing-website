export default function ClipboardIcon({ size = 22, color = "#D8C2FF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M4 6h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
    </svg>
  );
}
