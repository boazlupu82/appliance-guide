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
        philips: [
            { name: 'OLED 807 55"', year: '2023', instructionKey: 'instructions.tv.samsung.frame55' },
            { name: '4K UHD 50"', year: '2022', instructionKey: 'instructions.tv.samsung.crystal43' },
        ],
        hisense: [
            { name: 'U8K Mini-LED 55"', year: '2023', instructionKey: 'instructions.tv.samsung.frame55' },
        ],
        tcl: [
            { name: 'C835 QLED 55"', year: '2023', instructionKey: 'instructions.tv.samsung.crystal43' },
        ],
        panasonic: [
            { name: 'MZ2000 OLED 55"', year: '2023', instructionKey: 'instructions.tv.samsung.frame55' },
        ],
        toshiba: [
            { name: 'UF3D 43"', year: '2022', instructionKey: 'instructions.tv.samsung.crystal43' },
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
        whirlpool: [
            { name: 'W7 OM4 4S1 Oven', year: '2023', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
        siemens: [
            { name: 'iQ700 Oven', year: '2023', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
        electrolux: [
            { name: 'SteamPro Oven', year: '2022', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
        lg: [
            { name: 'InstaView Fridge', year: '2023', instructionKey: 'instructions.kitchen.samsung.bespokefridge' },
        ],
        aeg: [
            { name: 'Mastery Oven', year: '2022', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
        miele: [
            { name: 'H 7860 BPX Oven', year: '2023', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
        nespresso: [
            { name: 'Vertuo Next', year: '2023', instructionKey: 'instructions.kitchen.bosch.serie4microwave' },
        ],
        beko: [
            { name: 'AeroPerfect Oven', year: '2022', instructionKey: 'instructions.kitchen.bosch.serie6oven' },
        ],
    },
    laundry: {
        bosch: [
            { name: 'Serie 6 Washing Machine', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
            { name: 'Serie 8 Washer Dryer', year: '2023', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        samsung: [
            { name: 'EcoBubble 9kg', year: '2023', instructionKey: 'instructions.laundry.samsung.ecobubble' },
            { name: 'Bespoke AI 11kg', year: '2023', instructionKey: 'instructions.laundry.samsung.ecobubble' },
        ],
        lg: [
            { name: 'TurboWash 9kg', year: '2023', instructionKey: 'instructions.laundry.samsung.ecobubble' },
        ],
        miele: [
            { name: 'WCR 870 WPS', year: '2023', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        siemens: [
            { name: 'iQ700 Washer', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        electrolux: [
            { name: 'PerfectCare 800', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        aeg: [
            { name: 'L9FEC946R', year: '2023', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        whirlpool: [
            { name: 'Supreme Silence', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        beko: [
            { name: 'SteamCure 9kg', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
        hotpoint: [
            { name: 'ActiveCare 9kg', year: '2022', instructionKey: 'instructions.laundry.bosch.serie6washing' },
        ],
    },
    hvac: {
        daikin: [
            { name: 'Perfera Wall Unit', year: '2023', instructionKey: 'instructions.hvac.daikin.perfera' },
            { name: 'Emura 3', year: '2022', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        mitsubishi: [
            { name: 'MSZ-AP Series', year: '2022', instructionKey: 'instructions.hvac.mitsubishi.mszap' },
            { name: 'MSZ-LN Series', year: '2023', instructionKey: 'instructions.hvac.mitsubishi.mszap' },
        ],
        lg: [
            { name: 'DualCool Inverter', year: '2023', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        samsung: [
            { name: 'WindFree Elite', year: '2023', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        carrier: [
            { name: 'Xpower Gold', year: '2022', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        panasonic: [
            { name: 'Etherea Z Series', year: '2023', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        bosch: [
            { name: 'Climate 5000i', year: '2022', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
        sharp: [
            { name: 'AY-XP Series', year: '2022', instructionKey: 'instructions.hvac.daikin.perfera' },
        ],
    },
    hearing: {
        phonak: [
            { name: 'Audeo Lumity', year: '2023', instructionKey: 'instructions.hearing.phonak.audeo' },
            { name: 'Audeo Paradise', year: '2022', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
        oticon: [
            { name: 'More 1 miniRITE', year: '2022', instructionKey: 'instructions.hearing.oticon.more1' },
            { name: 'Real 1 miniRITE', year: '2023', instructionKey: 'instructions.hearing.oticon.more1' },
        ],
        siemens: [
            { name: 'Pure Charge&Go AX', year: '2022', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
        widex: [
            { name: 'Moment 440', year: '2023', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
        resound: [
            { name: 'ONE 9', year: '2022', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
        starkey: [
            { name: 'Evolv AI 2400', year: '2023', instructionKey: 'instructions.hearing.phonak.audeo' },
        ],
    },
    electronics: {
        apple: [
            { name: 'iPhone 15', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
            { name: 'iPhone 14', year: '2022', instructionKey: 'instructions.electronics.apple.iphone15' },
            { name: 'iPad Air', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        samsung: [
            { name: 'Galaxy S23', year: '2023', instructionKey: 'instructions.electronics.samsung.galaxys23' },
            { name: 'Galaxy Tab S9', year: '2023', instructionKey: 'instructions.electronics.samsung.galaxys23' },
        ],
        sony: [
            { name: 'WH-1000XM5 Headphones', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        philips: [
            { name: 'Sonicare 9900', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        panasonic: [
            { name: 'Lumix G9 II', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        jbl: [
            { name: 'Charge 5', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        braun: [
            { name: 'Series 9 Pro Shaver', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
        dyson: [
            { name: 'Airwrap', year: '2023', instructionKey: 'instructions.electronics.apple.iphone15' },
        ],
    },
    walking: {
        'drive-medical': [
            { name: 'Nitro Euro Style Rollator', year: '2022', instructionKey: 'instructions.walking.drivemedical.nitro' },
            { name: 'Nitro Sprint Rollator', year: '2023', instructionKey: 'instructions.walking.drivemedical.nitro' },
        ],
        invacare: [
            { name: 'Alu Rehab Rollator', year: '2023', instructionKey: 'instructions.walking.invacare.alurehab' },
            { name: 'Lima Rollator', year: '2022', instructionKey: 'instructions.walking.invacare.alurehab' },
        ],
        rollator: [
            { name: 'Classic Rollator', year: '2022', instructionKey: 'instructions.walking.invacare.alurehab' },
        ],
        nova: [
            { name: 'Traveler 3 Wheel', year: '2022', instructionKey: 'instructions.walking.invacare.alurehab' },
        ],
    },
    vacuum: {
        dyson: [
            { name: 'V15 Detect', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
            { name: 'V12 Slim', year: '2022', instructionKey: 'instructions.vacuum.dyson.v12' },
            { name: 'V11 Outsize', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        miele: [
            { name: 'Complete C3', year: '2023', instructionKey: 'instructions.vacuum.miele.completec3' },
            { name: 'Triflex HX2', year: '2022', instructionKey: 'instructions.vacuum.miele.completec3' },
        ],
        bosch: [
            { name: 'Unlimited 7', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
            { name: 'BGB45330', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        samsung: [
            { name: 'Bespoke Jet', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
            { name: 'Jet 75E', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        lg: [
            { name: 'CordZero A9', year: '2022', instructionKey: 'instructions.vacuum.dyson.v15' },
            { name: 'CordZero R9', year: '2023', instructionKey: 'instructions.vacuum.dyson.v15' },
        ],
        irobot: [
            { name: 'Roomba j7+', year: '2023', instructionKey: 'instructions.vacuum.irobot.roombaj7' },
            { name: 'Roomba i3+', year: '2022', instructionKey: 'instructions.vacuum.irobot.roombaj7' },
            { name: 'Roomba s9+', year: '2023', instructionKey: 'instructions.vacuum.irobot.roombaj7' },
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

            {/* Breadcrumb */}
            <div className="page-pad" style={{
                paddingTop: 12, paddingBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap' as const,
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
                <Link href={`/${locale}/${category}`} style={{
                    color: '#1A1A1A', textDecoration: 'none',
                    background: '#fff', border: '2px solid #1A1A1A',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 12, fontWeight: 700,
                    boxShadow: '2px 2px 0 #1A1A1A',
                    whiteSpace: 'nowrap' as const,
                }}>
                    {emoji} {categoryName}
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
                    <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>{emoji}</div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{
                            fontSize: 11, fontWeight: 700, color: '#888',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em', marginBottom: 4,
                        }}>
                            {t('brand.category')} — {categoryName}
                        </div>
                        <div style={{
                            fontSize: 'clamp(18px, 4vw, 26px)',
                            fontWeight: 800, color: '#1A1A1A', marginBottom: 4,
                        }}>
                            {brandName}
                        </div>
                        <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                            {modelsWithVideos.length} {t('brand.models')} — {t('brand.selectBelow')}
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
                    {t('brand.selectModel')}
                </p>
            </div>

            {/* Models Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
            {modelsWithVideos.length > 0 ? (
                <div className="model-grid page-pad">
                    {modelsWithVideos.map((model, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#fff',
                                border: '2.5px solid #1A1A1A',
                                borderRadius: 20,
                                overflow: 'hidden',
                                boxShadow: '4px 4px 0 #1A1A1A',
                            }}
                        >
                            <div style={{ height: 6, background: strip }} />

                            {model.resolvedVideoId ? (
                                <YouTubeEmbed
                                    videoId={model.resolvedVideoId}
                                    title={model.name}
                                />
                            ) : (
                                <div style={{
                                    height: 180, background: '#F3F4F6',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 13, color: '#9CA3AF', fontWeight: 600,
                                }}>
                                    {t('brand.videoComingSoon')}
                                </div>
                            )}

                            <div style={{ padding: '14px 16px 6px' }}>
                                <div style={{
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    fontWeight: 800,
                                    color: '#1A1A1A', marginBottom: 6,
                                }}>
                                    {model.name}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    background: '#F5A623',
                                    border: '1.5px solid #1A1A1A',
                                    borderRadius: 20,
                                    padding: '2px 10px',
                                    fontSize: 11, fontWeight: 700,
                                    color: '#1A1A1A', marginBottom: 14,
                                }}>
                                    {model.year}
                                </div>
                            </div>

                            <div style={{ padding: '0 16px 16px' }}>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, color: '#888',
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '0.08em', marginBottom: 10,
                                }}>
                                    {t('brand.steps')}
                                </div>
                                {model.instructions?.map((step: string, i: number) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 10,
                                        marginBottom: 10, alignItems: 'flex-start',
                                    }}>
                                        <div style={{
                                            width: 26, height: 26, borderRadius: '50%',
                                            background: strip, border: '2px solid #1A1A1A',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 12, fontWeight: 800,
                                            color: '#fff', flexShrink: 0, marginTop: 1,
                                        }}>
                                            {i + 1}
                                        </div>
                                        <div style={{
                                            fontSize: 'clamp(13px, 2vw, 14px)',
                                            color: '#374151',
                                            lineHeight: 1.6, fontWeight: 500,
                                        }}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="page-pad">
                    <div style={{
                        background: '#fff',
                        border: '2.5px dashed #D1D5DB',
                        borderRadius: 20,
                        padding: '40px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 6 }}>
                            {t('brand.comingSoon')}
                        </div>
                        <div style={{ fontSize: 14, color: '#888' }}>
                            {t('brand.comingSoonDesc')}
                        </div>
                    </div>
                </div>
            )}

            {/* Legal disclaimer */}
            <div className="page-pad" style={{ marginTop: 32 }}>
                <div style={{
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: 12,
                    fontSize: 11,
                    color: '#4A3000',
                    lineHeight: 1.6,
                    border: '1px solid rgba(0,0,0,0.1)',
                }}>
                    📋 {t('brand.disclaimer')}
                </div>
            </div>
        </div>
    );
}