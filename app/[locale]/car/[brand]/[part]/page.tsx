import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { findBestVideo } from '@/lib/youtube';
import YouTubeEmbed from '@/components/YouTubeEmbed';

const partMeta: Record<string, {
    emoji: string;
    strip: string;
    bg: string;
    videoQuery: string;
}> = {
    tires: { emoji: '🔄', strip: '#F97316', bg: '#FFF7ED', videoQuery: 'how to replace car tires' },
    wipers: { emoji: '🌧️', strip: '#3B82F6', bg: '#EFF6FF', videoQuery: 'how to replace wiper blades' },
    'front-headlights': { emoji: '💡', strip: '#EAB308', bg: '#FEFCE8', videoQuery: 'how to replace front headlight bulb' },
    'back-headlights': { emoji: '🔴', strip: '#EF4444', bg: '#FFF1F2', videoQuery: 'how to replace rear tail light bulb' },
};

export default async function CarPartPage({
                                              params,
                                          }: {
    params: Promise<{ locale: string; brand: string; part: string }>;
}) {
    const { locale, brand, part } = await params;
    const t = await getTranslations({ locale });
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const meta = partMeta[part];

    if (!meta) {
        return (
            <div style={{ background: '#F5A623', minHeight: '100vh', padding: 40 }}>
                <p>Part not found</p>
            </div>
        );
    }

    let title = part;
    let steps: string[] = [];
    try {
        title = t(`car.${part}.title`);
        steps = t.raw(`car.${part}.steps`) as string[];
    } catch {
        steps = [];
    }

    const videoId = await findBestVideo(`${brandName} ${meta.videoQuery}`);

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
                    🚗 {t('categories.car')}
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
                <Link href={`/${locale}/car/${brand}`} style={{
                    color: '#1A1A1A', textDecoration: 'none',
                    background: '#fff', border: '2px solid #1A1A1A',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 12, fontWeight: 700,
                    boxShadow: '2px 2px 0 #1A1A1A',
                    whiteSpace: 'nowrap' as const,
                }}>
                    {brandName}
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
                <span style={{ fontWeight: 800, fontSize: 13 }}>{title}</span>
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
                    <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>
                        {meta.emoji}
                    </div>
                    <div>
                        <div style={{
                            fontSize: 11, fontWeight: 700, color: '#888',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em', marginBottom: 4,
                        }}>
                            {brandName} — {t('categories.car')}
                        </div>
                        <div style={{
                            fontSize: 'clamp(18px, 4vw, 26px)',
                            fontWeight: 800, color: '#1A1A1A', marginBottom: 4,
                        }}>
                            {title}
                        </div>
                        <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                            {steps.length} {t('brand.steps')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content card */}
            <div className="page-pad">
                <div style={{
                    background: '#fff',
                    border: '2.5px solid #1A1A1A',
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '4px 4px 0 #1A1A1A',
                }}>
                    <div style={{ height: 6, background: meta.strip }} />

                    {videoId ? (
                        <YouTubeEmbed videoId={videoId} title={title} />
                    ) : (
                        <div style={{
                            height: 200, background: '#F3F4F6',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13, color: '#9CA3AF', fontWeight: 600,
                        }}>
                            {t('brand.videoComingSoon')}
                        </div>
                    )}

                    <div style={{ padding: '20px 20px 24px' }}>
                        <div style={{
                            fontSize: 11, fontWeight: 700, color: '#888',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.08em', marginBottom: 16,
                        }}>
                            {t('car.stepsLabel')}
                        </div>
                        {steps.map((step, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: 12,
                                marginBottom: 14, alignItems: 'flex-start',
                            }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: meta.strip,
                                    border: '2px solid #1A1A1A',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 12, fontWeight: 800,
                                    color: '#fff', flexShrink: 0, marginTop: 1,
                                }}>
                                    {i + 1}
                                </div>
                                <div style={{
                                    fontSize: 'clamp(13px, 2vw, 15px)',
                                    color: '#374151',
                                    lineHeight: 1.6, fontWeight: 500,
                                    paddingTop: 4,
                                }}>
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="page-pad" style={{ marginTop: 24 }}>
                <div style={{
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: 12,
                    fontSize: 11,
                    color: '#4A3000',
                    lineHeight: 1.6,
                    border: '1px solid rgba(0,0,0,0.1)',
                }}>
                    ⚠️ {t('car.disclaimer')}
                </div>
            </div>
        </div>
    );
}