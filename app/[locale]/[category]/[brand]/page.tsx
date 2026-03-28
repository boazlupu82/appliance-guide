import Link from 'next/link';
import YouTubeEmbed from '@/components/YouTubeEmbed';

const modelsData: Record<string, Record<string, {
    name: string;
    year: string;
    videoId: string;
    thumbnail: string;
    instructions: string[];
}[]>> = {
    tv: {
        samsung: [
            {
                name: 'The Frame 55"',
                year: '2023',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: '📺',
                instructions: [
                    'Connect the power cable to the back of the TV and plug into wall socket',
                    'Press the power button on the remote or on the TV itself',
                    'Follow the on-screen setup wizard to connect to WiFi',
                    'Use the Home button on the remote to access Smart TV features',
                    'Adjust picture settings via Menu → Picture → Expert Settings',
                ],
            },
            {
                name: 'Crystal 43" 4K',
                year: '2022',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: '📺',
                instructions: [
                    'Connect HDMI cable from your device to the HDMI port on the TV',
                    'Press Source button on remote to select the correct input',
                    'Use the volume buttons on the right side of the TV or remote',
                    'Access picture mode via Settings → General → Accessibility',
                    'Set up subtitles via Menu → General → Accessibility → Caption Settings',
                ],
            },
            {
                name: 'Neo QLED 65"',
                year: '2023',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: '📺',
                instructions: [
                    'Mount the TV on the wall using the included VESA mount bracket',
                    'Connect the One Connect Box using the supplied cable',
                    'Power on and complete the Smart Hub setup',
                    'Connect to Bixby voice assistant by holding the microphone button',
                    'Use Multi View to watch two sources simultaneously',
                ],
            },
        ],
        lg: [
            {
                name: 'OLED C3 55"',
                year: '2023',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: '📺',
                instructions: [
                    'Attach the stand by aligning it with the bottom of the TV',
                    'Connect power and press the power button',
                    'Follow initial setup to connect to your home network',
                    'Access webOS Home by pressing the Home button',
                    'Enable ThinQ AI features through the settings menu',
                ],
            },
        ],
    },
    kitchen: {
        bosch: [
            {
                name: 'Serie 6 Oven',
                year: '2022',
                videoId: 'dQw4w9WgXcQ',
                thumbnail: '🍳',
                instructions: [
                    'Before first use, heat the empty oven at 250°C for 1 hour',
                    'Turn the function selector to choose your cooking mode',
                    'Set temperature using the temperature dial',
                    'Press the clock button to set cooking duration',
                    'The oven will beep when preheated to the set temperature',
                ],
            },
        ],
    },
};

const categoryStrip: Record<string, string> = {
    tv: '#3B82F6',
    kitchen: '#EF4444',
    laundry: '#10B981',
    hvac: '#0EA5E9',
    electronics: '#EC4899',
    hearing: '#8B5CF6',
    walking: '#EAB308',
};

const categoryEmoji: Record<string, string> = {
    tv: '📺', kitchen: '🍳', laundry: '🫧',
    hvac: '❄️', electronics: '🔌', hearing: '🦻', walking: '🦯',
};

export default async function BrandPage({
                                            params,
                                        }: {
    params: Promise<{ locale: string; category: string; brand: string }>;
}) {
    const { locale, category, brand } = await params;
    const brandModels = modelsData[category]?.[brand] || [];
    const strip = categoryStrip[category] || '#6366F1';
    const emoji = categoryEmoji[category] || '🏠';
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh', padding: '0 0 40px' }}>

            {/* Breadcrumb */}
            <div style={{
                padding: '12px 40px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                flexWrap: 'wrap',
            }}>
                <Link href={`/${locale}`} style={{ color: '#1A1A1A', textDecoration: 'none', opacity: 0.6 }}>
                    Home
                </Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <Link href={`/${locale}/${category}`} style={{ color: '#1A1A1A', textDecoration: 'none', opacity: 0.6 }}>
                    {emoji} {categoryName}
                </Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <span style={{ color: '#1A1A1A' }}>{brandName}</span>
            </div>

            {/* Header */}
            <div style={{
                margin: '0 40px 24px',
                background: '#fff',
                border: '2.5px solid #1A1A1A',
                borderRadius: 20,
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '4px 4px 0 #1A1A1A',
            }}>
                <div style={{ fontSize: 48, lineHeight: 1 }}>{emoji}</div>
                <div>
                    <div style={{
                        fontSize: 11, fontWeight: 700, color: '#888',
                        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
                    }}>
                        {categoryName}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>
                        {brandName}
                    </div>
                    <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                        {brandModels.length} models available — select yours below
                    </div>
                </div>
            </div>

            {/* Section label */}
            <div style={{ padding: '0 40px 12px' }}>
                <p style={{
                    fontSize: 12, fontWeight: 700, color: '#4A3000',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                    Select your model
                </p>
            </div>

            {/* Models Grid */}
            {brandModels.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 14,
                    padding: '0 40px',
                }}>
                    {brandModels.map((model, index) => (
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
                            {/* Color strip */}
                            <div style={{ height: 6, background: strip }} />

                            {/* Video embed */}
                            <YouTubeEmbed videoId={model.videoId} title={model.name} />

                            {/* Model info */}
                            <div style={{ padding: '14px 16px 6px' }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>
                                    {model.name}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    background: '#F5A623',
                                    border: '1.5px solid #1A1A1A',
                                    borderRadius: 20,
                                    padding: '2px 10px',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#1A1A1A',
                                    marginBottom: 12,
                                }}>
                                    {model.year}
                                </div>
                            </div>

                            {/* Instructions */}
                            <div style={{ padding: '0 16px 16px' }}>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, color: '#888',
                                    textTransform: 'uppercase', letterSpacing: '0.08em',
                                    marginBottom: 10,
                                }}>
                                    Step-by-step instructions
                                </div>
                                {model.instructions.map((step, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: 10,
                                            marginBottom: 8,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background: strip,
                                            border: '2px solid #1A1A1A',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 11,
                                            fontWeight: 800,
                                            color: '#fff',
                                            flexShrink: 0,
                                            marginTop: 1,
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
                    margin: '0 40px',
                    background: '#fff',
                    border: '2.5px dashed #D1D5DB',
                    borderRadius: 20,
                    padding: '40px',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', marginBottom: 6 }}>
                        Coming soon
                    </div>
                    <div style={{ fontSize: 14, color: '#888' }}>
                        We're adding {brandName} models. Check back soon!
                    </div>
                </div>
            )}

            {/* Legal disclaimer */}
            <div style={{
                margin: '32px 40px 0',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: 12,
                fontSize: 11,
                color: '#4A3000',
                lineHeight: 1.6,
                border: '1px solid rgba(0,0,0,0.1)',
            }}>
                📋 All videos are embedded from YouTube and belong to their respective owners.
                Brand names and logos are trademarks of their respective companies.
                HomeGuide is not affiliated with or endorsed by any brand listed on this site.
            </div>
        </div>
    );
}