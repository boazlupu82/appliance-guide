import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { findBestVideo } from '@/lib/youtube';

const modelsData: Record<string, Record<string, {
    name: string;
    year: string;
    videoId?: string;
    instructionKey: string;
}[]>> = {
    tv: {
        samsung: [
            { name: 'The Frame 55"', year: '2023', instructionKey: 'instructions.tv.samsung.frame55' },
            { name: 'Crystal 43" 4K', year: '2022', instructionKey: 'instructions.tv.samsung.crystal43' },
            { name: 'Neo QLED 65"', year: '2023', instructionKey: 'instructions.tv.samsung.neoqled65' },
        ],
        lg: [
            { name: 'OLED C3 55"', year: '2023', instructionKey: 'instructions.tv.lg.oledc3' },
            { name: 'NanoCell 50"', year: '2022', instructionKey: 'instructions.tv.lg.nanocell50' },
        ],
        sony: [
            { name: 'Bravia XR 55"', year: '2023', instructionKey: 'instructions.tv.sony.bravia55' },
        ],
    },
    kitchen: {
        bosch: [
            { name: 'Serie 6 Oven', year: '2022', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
            { name: 'Serie 4 Microwave', year: '2023', instructionKey: 'instructions.kitchen.bosch.serie4microwave' },
        ],
        samsung: [
            { name: 'Bespoke Fridge', year: '2023', instructionKey: 'instructions.kitchen.samsung.bespokefridge' },
        ],
    },
    laundry: {
        bosch: [
            { name: 'Serie 6 Washing Machine', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        samsung: [
            { name: 'EcoBubble 9kg', year: '2023', instructionKey: 'instructions.laundry.samsung.ecobubble' },
        ],
    },
    hvac: {
        daikin: [
            { name: 'Perfera Wall Unit', year: '2023', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        mitsubishi: [
            { name: 'MSZ-AP Series', year: '2022', instructionKey: 'instructions.hvac.mitsubishi.mszap' },
        ],
    },
    hearing: {
        phonak: [
            { name: 'Audeo Lumity', year: '2023', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
        oticon: [
            { name: 'More 1 miniRITE', year: '2022', instructionKey: 'instructions.hearing.oticon.more1' },
        ],
    },
    electronics: {
        apple: [
            { name: 'iPhone 15', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        samsung: [
            { name: 'Galaxy S23', year: '2023', instructionKey: 'instructions.electronics.samsung.galaxys23' },
        ],
    },
    walking: {
        'drive-medical': [
            { name: 'Nitro Euro Style Rollator', year: '2022', instructionKey: 'instructions.walking.drivemedical.nitro' },
        ],
        invacare: [
            { name: 'Alu Rehab Rollator', year: '2023', instructionKey: 'instructions.walking.invacare.alurehab' },
        ],
    },
    vacuum: {
        dyson: [
            { name: 'V15 Detect', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
            { name: 'V12 Slim', year: '2022', instructionKey: 'instructions.vacuum.dyson.v12' },
        ],
        miele: [
            { name: 'Complete C3', year: '2023', instructionKey: 'instructions.vacuum.miele.completec3' },
        ],
        bosch: [
            { name: 'Unlimited 7', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        samsung: [
            { name: 'Bespoke Jet', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        lg: [
            { name: 'CordZero A9', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        irobot: [
            { name: 'Roomba j7+', year: '2023', instructionKey: 'instructions.vacuum.irobot.roombaj7' },
        ],
    },
};

const categoryStrip: Record<string, string> = {
    tv: '#3B82F6', kitchen: '#EF4444', laundry: '#10B981',
    hvac: '#0EA5E9', electronics: '#EC4899', hearing: '#8B5CF6',
    walking: '#EAB308', vacuum: '#6366F1',
};

const categoryEmoji: Record<string, string> = {
    tv: '📺', kitchen: '🍳', laundry: '🫧', hvac: '❄️',
    electronics: '🔌', hearing: '🦻', walking: '🦯', vacuum: '🧹',
};

export default async function BrandPage({
                                            params,
                                        }: {
    params: Promise<{ locale: string; category: string; brand: string }>;
}) {
    const { locale, category, brand } = await params;
    const t = await getTranslations({ locale });
    const brandModels = modelsData[category]?.[brand] || [];
    const strip = categoryStrip[category] || '#6366F1';
    const emoji = categoryEmoji[category] || '🏠';
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const categoryName = t(`categories.${category}`);

    const modelsWithVideos = await Promise.all(
        brandModels.map(async (model) => {
            const videoId = await findBestVideo(
                `${brandName} ${model.name}`,
                model.videoId
            );
            let instructions: string[] = [];
            try {
                instructions = t.raw(model.instructionKey) as string[];
            } catch {
                instructions = [];
            }
            return { ...model, resolvedVideoId: videoId, instructions };
        })
    );

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh', paddingBottom: 40 }}>

            <div style={{
                padding: '12px 40px', display: 'flex',
                alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, flexWrap: 'wrap',
            }}>
                <Link href={`/${locale}`} style={{ color: '#1A1A1A', textDecoration: 'none', opacity: 0.6 }}>
                    {t('nav.home')}
                </Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <Link href={`/${locale}/${category}`} style={{ color: '#1A1A1A', textDecoration: 'none', opacity: 0.6 }}>
                    {emoji} {categoryName}
                </Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <span style={{ color: '#1A1A1A' }}>{brandName}</span>
            </div>

            <div style={{
                margin: '0 40px 24px', background: '#fff',
                border: '2.5px solid #1A1A1A', borderRadius: 20,
                padding: '20px 28px', display: 'flex',
                alignItems: 'center', gap: 20,
                boxShadow: '4px 4px 0 #1A1A1A',
            }}>
                <div style={{ fontSize: 48, lineHeight: 1 }}>{emoji}</div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                        {t('brand.category')} — {categoryName}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>
                        {brandName}
                    </div>
                    <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                        {modelsWithVideos.length} {t('brand.models')} — {t('brand.selectBelow')}
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 40px 12px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#4A3000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t('brand.selectModel')}
                </p>
            </div>

            {modelsWithVideos.length > 0 ? (
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 14, padding: '0 40px',
                }}>
                    {modelsWithVideos.map((model, index) => (
                        <div key={index} style={{
                            background: '#fff', border: '2.5px solid #1A1A1A',
                            borderRadius: 20, overflow: 'hidden',
                            boxShadow: '4px 4px 0 #1A1A1A',
                        }}>
                            <div style={{ height: 6, background: strip }} />
                            {model.resolvedVideoId ? (
                                <YouTubeEmbed videoId={model.resolvedVideoId} title={model.name} />
                            ) : (
                                <div style={{
                                    height: 160, background: '#F3F4F6',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: 13,
                                    color: '#9CA3AF', fontWeight: 600,
                                }}>
                                    {t('brand.videoComingSoon')}
                                </div>
                            )}
                            <div style={{ padding: '14px 16px 6px' }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 6 }}>
                                    {model.name}
                                </div>
                                <div style={{
                                    display: 'inline-block', background: '#F5A623',
                                    border: '1.5px solid #1A1A1A', borderRadius: 20,
                                    padding: '2px 10px', fontSize: 11, fontWeight: 700,
                                    color: '#1A1A1A', marginBottom: 14,
                                }}>
                                    {model.year}
                                </div>
                            </div>
                            <div style={{ padding: '0 16px 16px' }}>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, color: '#888',
                                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
                                }}>
                                    {t('brand.steps')}
                                </div>
                                {model.instructions?.map((step: string, i: number) => (
                                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: '50%',
                                            background: strip, border: '2px solid #1A1A1A',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 11, fontWeight: 800, color: '#fff',
                                            flexShrink: 0, marginTop: 1,
                                        }}>
                                            {i + 1}
                                        </div>
                                        <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    margin: '0 40px', background: '#fff',
                    border: '2.5px dashed #D1D5DB', borderRadius: 20,
                    padding: '40px', textAlign: 'center',
                }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 6 }}>
                        {t('brand.comingSoon')}
                    </div>
                    <div style={{ fontSize: 14, color: '#888' }}>
                        {t('brand.comingSoonDesc')}
                    </div>
                </div>
            )}

            <div style={{
                margin: '32px 40px 0', background: '#1A1A1A',
                border: '2.5px solid #1A1A1A', borderRadius: 20,
                padding: '28px 32px', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                flexWrap: 'wrap', gap: 16,
            }}>
                <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F5A623', marginBottom: 6 }}>
                        🔍 {t('brand.notFound')}
                    </div>
                    <div style={{ fontSize: 14, color: '#9CA3AF' }}>
                        {t('brand.notFoundDesc')}
                    </div>
                </div>
                <a href="mailto:contact@homeguide.com" style={{
                    background: '#F5A623', color: '#1A1A1A',
                    border: '2.5px solid #F5A623', borderRadius: 50,
                    padding: '12px 28px', fontSize: 14, fontWeight: 800,
                    textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                    {t('brand.contactUs')} ↗
                </a>
            </div>

            <div style={{
                margin: '16px 40px 0', padding: '16px 20px',
                background: 'rgba(255,255,255,0.5)', borderRadius: 12,
                fontSize: 11, color: '#4A3000', lineHeight: 1.6,
                border: '1px solid rgba(0,0,0,0.1)',
            }}>
                📋 {t('brand.disclaimer')}
            </div>
        </div>
    );
}