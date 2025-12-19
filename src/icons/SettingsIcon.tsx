export default function SettingsIcon({ size = 22, color = "#D8C2FF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 01-.33 1.82l-.06.06a2 2 0 01-2.83 0l-.12-.12a8 8 0 01-1.41.82l-.09.33a2 2 0 01-2 1.52h-0.18a2 2 0 01-2-1.52l-.09-.33a8 8 0 01-1.41-.82l-.12.12a2 2 0 01-2.83 0l-.06-.06A1.65 1.65 0 014.6 15l.33-.57a8 8 0 010-1.82L4.6 12a1.65 1.65 0 01.33-1.82l.06-.06a2 2 0 012.83 0l.12.12a8 8 0 011.41-.82l.09-.33A2 2 0 0111.94 8h.12a2 2 0 011.94 1.52l.09.33a8 8 0 011.41.82l.12-.12a2 2 0 012.83 0l.06.06A1.65 1.65 0 0119.4 12l-.33.57c.1.6.1 1.22 0 1.82z" />
    </svg>
  );
}
