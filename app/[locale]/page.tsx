import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import TTSBar from '@/components/TTSBar';

const categories = [
    { key: 'tv',          slug: 'tv',          label: 'Television',      bg: '#EEF2FF', border: '#C7D2FE', text: '#3730A3', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="3" y="6" width="30" height="20" rx="3" fill="#6366F1"/>
                <rect x="6" y="9" width="24" height="13" rx="1" fill="#EEF2FF"/>
                <rect x="14" y="27" width="8" height="4" rx="2" fill="#4338CA"/>
                <circle cx="18" cy="24" r="1.5" fill="#fff"/>
            </svg>
        )},
    { key: 'kitchen',     slug: 'kitchen',     label: 'Oven & Kitchen',  bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="5" y="10" width="26" height="18" rx="3" fill="#F59E0B"/>
                <rect x="8" y="14" width="20" height="10" rx="1" fill="#FEF3C7"/>
                <rect x="11" y="7" width="14" height="5" rx="2" fill="#D97706"/>
                <circle cx="18" cy="19" r="3" fill="#F59E0B"/>
            </svg>
        )},
    { key: 'laundry',     slug: 'laundry',     label: 'Laundry',         bg: '#D1FAE5', border: '#6EE7B7', text: '#065F46', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="5" width="24" height="28" rx="4" fill="#10B981"/>
                <circle cx="18" cy="20" r="8" fill="#D1FAE5"/>
                <circle cx="18" cy="20" r="4" fill="#10B981"/>
                <rect x="12" y="8" width="12" height="4" rx="2" fill="#D1FAE5"/>
            </svg>
        )},
    { key: 'hearing',     slug: 'hearing',     label: 'Hearing Aids',    bg: '#EDE9FE', border: '#DDD6FE', text: '#4C1D95', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <ellipse cx="18" cy="23" rx="12" ry="7" fill="#8B5CF6"/>
                <path d="M11 23 Q18 11 25 23" fill="#A78BFA"/>
                <circle cx="18" cy="15" r="4" fill="#EDE9FE"/>
                <rect x="16" y="28" width="4" height="5" rx="2" fill="#7C3AED"/>
            </svg>
        )},
    { key: 'hvac',        slug: 'hvac',        label: 'Heating & Cooling',bg: '#E0F2FE', border: '#7DD3FC', text: '#075985', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="4" y="10" width="28" height="18" rx="4" fill="#0EA5E9"/>
                <rect x="7" y="14" width="22" height="10" rx="2" fill="#E0F2FE"/>
                <rect x="10" y="17" width="16" height="4" rx="2" fill="#0EA5E9" opacity="0.4"/>
            </svg>
        )},
    { key: 'electronics', slug: 'electronics', label: 'Small Electronics',bg: '#FCE7F3', border: '#F9A8D4', text: '#9D174D', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="10" y="4" width="16" height="28" rx="4" fill="#EC4899"/>
                <rect x="13" y="8" width="10" height="16" rx="1" fill="#FCE7F3"/>
                <circle cx="18" cy="28" r="2" fill="#FCE7F3"/>
            </svg>
        )},
    { key: 'walking',     slug: 'walking',     label: 'Walking Aids',    bg: '#FEF9C3', border: '#FDE047', text: '#713F12', icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 4 C18 4 14 12 14 20 L14 32" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <path d="M14 20 L8 28" stroke="#CA8A04" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <circle cx="18" cy="4" r="3" fill="#EAB308"/>
            </svg>
        )},
];

export default function HomePage({ params }: { params: { locale: string } }) {
    const t = useTranslations();
    const ttsText = `Welcome to HomeGuide. ${t('home.subtitle')}. Choose a category to get started.`;

    return (
        <div className="page-wrapper">
            <div style={{ background: '#EEF2FF', padding: '20px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 16 }}>
                    <Mascot size={72} />
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)', lineHeight: 1.2, marginBottom: 4 }}>
                            {t('home.title')}
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.4 }}>
                            {t('home.subtitle')}
                        </p>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    background: '#fff',
                    borderRadius: 30,
                    border: '2px solid var(--primary)',
                    overflow: 'hidden',
                }}>
                    <input
                        type="text"
                        placeholder="Search e.g. microwave, Samsung TV..."
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '12px 16px',
                            fontSize: 14,
                            outline: 'none',
                            background: 'transparent',
                            color: 'var(--dark)',
                        }}
                    />
                    <button style={{
                        background: 'var(--primary)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 20px',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}>
                        Search
                    </button>
                </div>
            </div>

            <TTSBar text={ttsText} />

            <div style={{ padding: '16px 16px 32px' }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark)', marginBottom: 12 }}>
                    {t('home.categories')}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                }}>
                    {categories.map((cat) => (
                        <Link
                            key={cat.key}
                            href={`/${params.locale}/${cat.slug}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="category-card" style={{
                                background: cat.bg,
                                border: `1.5px solid ${cat.border}`,
                                borderRadius: 16,
                                padding: '16px 12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                            >
                                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                                    {cat.icon}
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: cat.text, lineHeight: 1.3 }}>
                                    {t(`categories.${cat.key}`) || cat.label}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}