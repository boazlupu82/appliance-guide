import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const parts = [
    {
        key: 'tires',
        emoji: '🔄',
        bg: '#FFF7ED',
        strip: '#F97316',
        title: 'Tires',
        desc: 'How to replace & maintain',
    },
    {
        key: 'wipers',
        emoji: '🌧️',
        bg: '#EFF6FF',
        strip: '#3B82F6',
        title: 'Wipers',
        desc: 'How to replace wiper blades',
    },
    {
        key: 'front-headlights',
        emoji: '💡',
        bg: '#FEFCE8',
        strip: '#EAB308',
        title: 'Front Headlights',
        desc: 'How to replace front bulbs',
    },
    {
        key: 'back-headlights',
        emoji: '🔴',
        bg: '#FFF1F2',
        strip: '#EF4444',
        title: 'Back Headlights',
        desc: 'How to replace rear bulbs',
    },
];

export default async function CarBrandPage({
                                               params,
                                           }: {
    params: Promise<{ locale: string; brand: string }>;
}) {
    const { locale, brand } = await params;
    const t = await getTranslations({ locale });
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh', paddingBottom: 40 }}>

            {/* Breadcrumb */}
            <div className="page-pad" style={{
                paddingTop: 12, paddingBottom: 12,
                display: 'flex', alignItems: 'center',
                gap: 8, flexWrap: 'wrap' as const,
            }}>
                <Link href={`/${locale}`} style={{
                    color: '#1A1A1A', textDecoration: 'none',
                    background: '#fff', border: '2px solid #1A1A1A',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 12, fontWeight: 700,
                    boxShadow: '2px 2px 0 #1A1A1A',
                    whiteSpace: 'nowrap' as const,
                }}>
                    ← {t('nav.home')}
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
                <Link href={`/${locale}/car`} style={{
                    color: '#1A1A1A', textDecoration: 'none',
                    background: '#fff', border: '2px solid #1A1A1A',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 12, fontWeight: 700,
                    boxShadow: '2px 2px 0 #1A1A1A',
                    whiteSpace: 'nowrap' as const,
                }}>
                    🚗 Car
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
                <span style={{ fontWeight: 800, fontSize: 13 }}>{brandName}</span>
            </div>

            {/* Header card */}
            <div className="page-pad" style={{ marginBottom: 24 }}>
                <div style={{
                    background: '#fff',
                    border: '2.5px solid #1A1A1A',
                    borderRadius: 20,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    boxShadow: '4px 4px 0 #1A1A1A',
                }}>
                    <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>🚗</div>
                    <div>
                        <div style={{
                            fontSize: 11, fontWeight: 700, color: '#888',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em', marginBottom: 4,
                        }}>
                            Car Maintenance
                        </div>
                        <div style={{
                            fontSize: 'clamp(18px, 4vw, 26px)',
                            fontWeight: 800, color: '#1A1A1A', marginBottom: 4,
                        }}>
                            {brandName}
                        </div>
                        <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                            4 parts — select below to see instructions
                        </div>
                    </div>
                </div>
            </div>

            {/* Section label */}
            <div className="page-pad" style={{ paddingBottom: 12 }}>
                <p style={{
                    fontSize: 12, fontWeight: 700, color: '#4A3000',
                    textTransform: 'uppercase' as const, letterSpacing: '0.1em',
                }}>
                    Select a part
                </p>
            </div>

            {/* Parts Grid */}
            <div className="cat-grid page-pad">
                {parts.map((part) => (
                    <Link
                        key={part.key}
                        href={`/${locale}/car/${brand}/${part.key}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className="card-hover"
                            style={{
                                background: '#fff',
                                border: '2.5px solid #1A1A1A',
                                borderRadius: 16,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                boxShadow: '4px 4px 0 #1A1A1A',
                                position: 'relative',
                            }}
                        >
                            <div style={{ height: 6, background: part.strip }} />
                            <div style={{
                                position: 'absolute', top: 10, right: 8,
                                width: 22, height: 22, borderRadius: '50%',
                                background: '#F5A623', border: '2px solid #1A1A1A',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11, fontWeight: 800, color: '#1A1A1A',
                            }}>↗</div>
                            <div style={{
                                height: 'clamp(80px, 12vw, 110px)',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center',
                                background: part.bg,
                                fontSize: 'clamp(48px, 8vw, 64px)',
                            }}>
                                {part.emoji}
                            </div>
                            <div style={{
                                padding: '8px 10px 12px',
                                borderTop: '2px solid #1A1A1A',
                            }}>
                                <div style={{
                                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                                    fontWeight: 800, color: '#1A1A1A', marginBottom: 3,
                                }}>
                                    {part.title}
                                </div>
                                <div style={{
                                    fontSize: 'clamp(10px, 1.2vw, 11px)',
                                    fontWeight: 600, color: '#888',
                                }}>
                                    {part.desc}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}