export default function Mascot({ size = 64 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 72" fill="none">
            <ellipse cx="32" cy="66" rx="18" ry="5" fill="#C7D2FE"/>
            <rect x="18" y="44" width="28" height="24" rx="5" fill="#6366F1"/>
            <rect x="10" y="48" width="10" height="18" rx="5" fill="#8B5CF6"/>
            <rect x="44" y="48" width="10" height="18" rx="5" fill="#8B5CF6"/>
            <rect x="21" y="58" width="9" height="14" rx="4" fill="#4338CA"/>
            <rect x="34" y="58" width="9" height="14" rx="4" fill="#4338CA"/>
            <circle cx="32" cy="26" r="18" fill="#FBBF24"/>
            <circle cx="26" cy="24" r="2.5" fill="#1F2937"/>
            <circle cx="38" cy="24" r="2.5" fill="#1F2937"/>
            <path d="M26 32 Q32 37 38 32" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <ellipse cx="23" cy="28" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
            <ellipse cx="41" cy="28" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
            <rect x="24" y="42" width="16" height="6" rx="3" fill="#6366F1"/>
            <rect x="26" y="8" width="12" height="6" rx="3" fill="#FCD34D"/>
        </svg>
    );
}