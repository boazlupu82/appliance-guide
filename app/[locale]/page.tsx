import { useTranslations } from 'next-intl';
import Link from 'next/link';
import TTSBar from '@/components/TTSBar';

const categories = [
    { key: 'tv', slug: 'tv', emoji: '📺', bg: '#EFF6FF', strip: '#3B82F6', count: '8 brands · 60+ models', svg: null },
    { key: 'kitchen', slug: 'kitchen', emoji: '🍳', bg: '#FFF1F1', strip: '#EF4444', count: '12 brands · 80+ models', svg: null },
    { key: 'laundry', slug: 'laundry', emoji: '🫧', bg: '#F0FDF4', strip: '#10B981', count: '6 brands · 40+ models', svg: null },
    { key: 'vacuum', slug: 'vacuum', emoji: '', bg: '#F0FDF4', strip: '#6366F1', count: '6 brands · 30+ models', svg: (
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <ellipse cx="32" cy="58" rx="22" ry="10" fill="#2D2D2D"/>
                <ellipse cx="32" cy="55" rx="22" ry="10" fill="#3D3D3D"/>
                <ellipse cx="32" cy="55" rx="18" ry="7" fill="#4CAF50"/>
                <ellipse cx="32" cy="52" rx="18" ry="7" fill="#66BB6A"/>
                <ellipse cx="32" cy="52" rx="14" ry="5" fill="#4CAF50"/>
                <circle cx="20" cy="58" r="6" fill="#2D2D2D"/>
                <circle cx="20" cy="58" r="4" fill="#1A1A1A"/>
                <circle cx="44" cy="58" r="6" fill="#2D2D2D"/>
                <circle cx="44" cy="58" r="4" fill="#1A1A1A"/>
                <path d="M46 50 Q55 40 62 28 Q65 22 68 18" stroke="#9E9E9E" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <path d="M46 50 Q55 40 62 28 Q65 22 68 18" stroke="#BDBDBD" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <rect x="60" y="12" width="14" height="10" rx="3" fill="#2D2D2D" transform="rotate(-20 60 12)"/>
                <rect x="61" y="13" width="12" height="8" rx="2" fill="#3D3D3D" transform="rotate(-20 60 12)"/>
                <ellipse cx="36" cy="48" rx="6" ry="3" fill="#81C784" opacity="0.6"/>
            </svg>
        )},
    { key: 'hearing', slug: 'hearing', emoji: '🦻', bg: '#FAF5FF', strip: '#8B5CF6', count: '5 brands · 20+ models', svg: null },
    { key: 'hvac', slug: 'hvac', emoji: '❄️', bg: '#F0F9FF', strip: '#0EA5E9', count: '7 brands · 35+ models', svg: null },
    { key: 'electronics', slug: 'electronics', emoji: '🔌', bg: '#FDF2F8', strip: '#EC4899', count: '10 brands · 50+ models', svg: null },
    { key: 'walking', slug: 'walking', emoji: '🦯', bg: '#FEFCE8', strip: '#EAB308', count: '4 brands · 15+ models', svg: null },
];

export default function HomePage({
                                     params,
                                 }: {
    params: Promise<{ locale: string }>;
}) {
    const t = useTranslations();
    const ttsText = `Welcome to HomeGuide. ${t('home.subtitle')}`;

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh' }}>

            {/* Contact Us Banner — TOP */}
            <div style={{
                background: '#1A1A1A',
                padding: '10px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
            }}>
        <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
          🔍 {t('brand.notFound')} — {t('brand.notFoundDesc')}
        </span>
                <Link href="/en/contact" style={{
                    background: '#F5A623',
                    color: '#1A1A1A',
                    borderRadius: 20,
                    padding: '6px 18px',
                    fontSize: 12,
                    fontWeight: 800,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                }}>
                    {t('brand.contactUs')} ↗
                </Link>
            </div>

            {/* Hero */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: '20px 40px 0',
                alignItems: 'end',
                gap: 20,
            }}>
                <div style={{ paddingBottom: 32 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: '#fff', border: '2px solid #1A1A1A',
                        borderRadius: 20, padding: '4px 14px',
                        fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 16,
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
                        {t('home.tag')}
                    </div>
                    <h1 style={{
                        fontSize: 48, fontWeight: 800, color: '#1A1A1A',
                        lineHeight: 1.1, marginBottom: 12, letterSpacing: '-1.5px',
                    }}>
                        {t('home.titleLine1')}<br />
                        <span style={{
                            background: '#1A1A1A', color: '#F5A623',
                            padding: '0 12px', borderRadius: 10, display: 'inline-block',
                        }}>
              {t('home.titleLine2')}
            </span><br />
                        {t('home.titleLine3')}
                    </h1>
                    <p style={{
                        fontSize: 15, color: '#4A3000', lineHeight: 1.6,
                        marginBottom: 24, maxWidth: 380,
                    }}>
                        {t('home.subtitle')}
                    </p>
                    <div style={{
                        display: 'flex', background: '#fff',
                        border: '2.5px solid #1A1A1A', borderRadius: 50,
                        overflow: 'hidden', maxWidth: 420,
                        boxShadow: '4px 4px 0 #1A1A1A',
                    }}>
                        <input
                            type="text"
                            placeholder={t('home.searchPlaceholder')}
                            style={{
                                flex: 1, border: 'none', padding: '14px 20px',
                                fontSize: 14, outline: 'none',
                                background: 'transparent', fontWeight: 500,
                            }}
                        />
                        <button style={{
                            background: '#1A1A1A', color: '#F5A623',
                            border: 'none', padding: '14px 24px',
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        }}>
                            {t('home.search')} ↗
                        </button>
                    </div>
                </div>

                {/* Illustration */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <svg width="360" height="300" viewBox="0 0 360 300" fill="none">
                        <rect x="60" y="20" width="240" height="180" rx="14" fill="#fff" stroke="#1A1A1A" strokeWidth="3"/>
                        <rect x="75" y="35" width="100" height="75" rx="8" fill="#DBEAFE" stroke="#1A1A1A" strokeWidth="2"/>
                        <rect x="185" y="35" width="100" height="75" rx="8" fill="#FCE7F3" stroke="#1A1A1A" strokeWidth="2"/>
                        <rect x="75" y="120" width="100" height="65" rx="8" fill="#D1FAE5" stroke="#1A1A1A" strokeWidth="2"/>
                        <rect x="185" y="120" width="100" height="65" rx="8" fill="#FEF3C7" stroke="#1A1A1A" strokeWidth="2"/>
                        <rect x="95" y="52" width="60" height="38" rx="4" fill="#3B82F6" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <rect x="99" y="56" width="52" height="28" rx="2" fill="#93C5FD"/>
                        <rect x="113" y="91" width="22" height="6" rx="3" fill="#1A1A1A"/>
                        <rect x="200" y="52" width="68" height="42" rx="4" fill="#EF4444" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <rect x="206" y="60" width="56" height="26" rx="2" fill="#FCA5A5"/>
                        <circle cx="234" cy="73" r="8" fill="#EF4444" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <rect x="87" y="130" width="76" height="46" rx="6" fill="#10B981" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <circle cx="125" cy="153" r="14" fill="#D1FAE5" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <circle cx="125" cy="153" r="6" fill="#10B981"/>
                        <rect x="196" y="130" width="78" height="34" rx="6" fill="#0EA5E9" stroke="#1A1A1A" strokeWidth="1.5"/>
                        <rect x="202" y="138" width="66" height="18" rx="3" fill="#BAE6FD"/>
                        <rect x="155" y="200" width="50" height="10" rx="3" fill="#1A1A1A"/>
                        <rect x="140" y="210" width="80" height="8" rx="4" fill="#1A1A1A"/>
                        <circle cx="180" cy="260" r="28" fill="#1A1A1A"/>
                        <circle cx="170" cy="254" r="4" fill="#fff"/>
                        <circle cx="190" cy="254" r="4" fill="#fff"/>
                        <path d="M170 266 Q180 274 190 266" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <ellipse cx="160" cy="259" rx="5" ry="3" fill="#F87171" opacity="0.7"/>
                        <ellipse cx="200" cy="259" rx="5" ry="3" fill="#F87171" opacity="0.7"/>
                        <path d="M152 255 Q140 245 132 258" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                        <path d="M208 255 Q220 245 228 258" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                        <rect x="162" y="228" width="36" height="28" rx="8" fill="#1A1A1A"/>
                    </svg>
                </div>
            </div>

            <TTSBar text={ttsText} />

            <div style={{ padding: '20px 40px 8px' }}>
                <p style={{
                    fontSize: 12, fontWeight: 700, color: '#4A3000',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                    {t('home.categories')}
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                padding: '0 40px 40px',
            }}>
                {categories.map((cat) => (
                    <Link key={cat.key} href={`/en/${cat.slug}`} style={{ textDecoration: 'none' }}>
                        <div
                            className="card-hover"
                            style={{
                                background: '#fff', border: '2.5px solid #1A1A1A',
                                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                boxShadow: '4px 4px 0 #1A1A1A', position: 'relative',
                            }}
                        >
                            <div style={{ height: 6, background: cat.strip }} />
                            <div style={{
                                position: 'absolute', top: 14, right: 12,
                                width: 24, height: 24, borderRadius: '50%',
                                background: '#F5A623', border: '2px solid #1A1A1A',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 800, color: '#1A1A1A',
                            }}>↗</div>
                            <div style={{
                                height: 110, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', background: cat.bg,
                                fontSize: 72,
                                filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.15))',
                            }}>
                                {cat.svg ? cat.svg : cat.emoji}
                            </div>
                            <div style={{ padding: '10px 14px 14px', borderTop: '2px solid #1A1A1A' }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', marginBottom: 3 }}>
                                    {t(`categories.${cat.key}`)}
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>
                                    {cat.count}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                <div style={{
                    background: '#fff', border: '2.5px dashed #D1D5DB',
                    borderRadius: 20, overflow: 'hidden', opacity: 0.5,
                }}>
                    <div style={{ height: 6, background: '#D1D5DB' }} />
                    <div style={{
                        height: 110, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', background: '#F9FAFB', fontSize: 56,
                    }}>➕</div>
                    <div style={{ padding: '10px 14px 14px', borderTop: '2px dashed #D1D5DB' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#9CA3AF' }}>More soon</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#D1D5DB' }}>coming soon</div>
                    </div>
                </div>
            </div>
        </div>
    );
}