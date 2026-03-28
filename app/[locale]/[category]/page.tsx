import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
function getBrandDomain(brandName: string): string {
    const domains: Record<string, string> = {
        'Samsung': 'samsung.com',
        'LG': 'lg.com',
        'Sony': 'sony.com',
        'Philips': 'philips.com',
        'Hisense': 'hisense.com',
        'TCL': 'tcl.com',
        'Bosch': 'bosch.com',
        'Whirlpool': 'whirlpool.com',
        'Siemens': 'siemens.com',
        'Electrolux': 'electrolux.com',
        'Miele': 'miele.com',
        'Daikin': 'daikin.com',
        'Mitsubishi': 'mitsubishielectric.com',
        'Carrier': 'carrier.com',
        'Panasonic': 'panasonic.com',
        'Apple': 'apple.com',
        'JBL': 'jbl.com',
        'Phonak': 'phonak.com',
        'Oticon': 'oticon.com',
        'Widex': 'widex.com',
        'ReSound': 'resound.com',
        'Starkey': 'starkey.com',
        'Drive Medical': 'drivemedical.com',
        'Invacare': 'invacare.com',
        'Nova': 'novamed.com',
        'Rollator': 'rollator.com',
        'Grundig': 'grundig.com',
        'Toshiba': 'toshiba.com',
        'Sharp': 'sharp.com',
        'Haier': 'haier.com',
        'AEG': 'aeg.com',
        'Zanussi': 'zanussi.com',
        'Beko': 'beko.com',
        'Candy': 'candy.com',
        'Hotpoint': 'hotpoint.com',
        'Dyson': 'dyson.com',
        'Nespresso': 'nespresso.com',
        'De\'Longhi': 'delonghi.com',
        'Braun': 'braun.com',
        'Tefal': 'tefal.com',
        'Rowenta': 'rowenta.com',
    };
    return domains[brandName] || `${brandName.toLowerCase().replace(/\s+/g, '')}.com`;
}

const brandsData: Record<string, { name: string; color: string; models: number }[]> = {
    tv: [
        { name: 'Samsung', color: '#1428A0', models: 12 },
        { name: 'LG', color: '#A50034', models: 9 },
        { name: 'Sony', color: '#000000', models: 8 },
        { name: 'Philips', color: '#0066CC', models: 6 },
        { name: 'Hisense', color: '#E4000F', models: 5 },
        { name: 'TCL', color: '#D0021B', models: 4 },
        { name: 'Panasonic', color: '#003087', models: 4 },
        { name: 'Toshiba', color: '#FF0000', models: 3 },
    ],
    kitchen: [
        { name: 'Bosch', color: '#005691', models: 15 },
        { name: 'Samsung', color: '#1428A0', models: 10 },
        { name: 'Whirlpool', color: '#003087', models: 8 },
        { name: 'Siemens', color: '#009999', models: 7 },
        { name: 'Electrolux', color: '#006AA7', models: 6 },
        { name: 'LG', color: '#A50034', models: 5 },
        { name: 'AEG', color: '#C8002D', models: 5 },
        { name: 'Miele', color: '#1C1C1B', models: 4 },
        { name: 'De\'Longhi', color: '#8B0000', models: 4 },
        { name: 'Nespresso', color: '#1B3A2D', models: 3 },
        { name: 'Tefal', color: '#E4000F', models: 3 },
        { name: 'Beko', color: '#005691', models: 3 },
    ],
    laundry: [
        { name: 'Bosch', color: '#005691', models: 10 },
        { name: 'Samsung', color: '#1428A0', models: 8 },
        { name: 'LG', color: '#A50034', models: 7 },
        { name: 'Miele', color: '#1C1C1B', models: 6 },
        { name: 'Siemens', color: '#009999', models: 5 },
        { name: 'Electrolux', color: '#006AA7', models: 4 },
        { name: 'AEG', color: '#C8002D', models: 4 },
        { name: 'Whirlpool', color: '#003087', models: 4 },
        { name: 'Zanussi', color: '#E4000F', models: 3 },
        { name: 'Beko', color: '#005691', models: 3 },
        { name: 'Candy', color: '#FF6600', models: 3 },
        { name: 'Hotpoint', color: '#003087', models: 3 },
    ],
    hvac: [
        { name: 'Daikin', color: '#0067B1', models: 10 },
        { name: 'Mitsubishi', color: '#E60012', models: 8 },
        { name: 'LG', color: '#A50034', models: 7 },
        { name: 'Samsung', color: '#1428A0', models: 6 },
        { name: 'Carrier', color: '#004B87', models: 5 },
        { name: 'Panasonic', color: '#003087', models: 4 },
        { name: 'Bosch', color: '#005691', models: 4 },
        { name: 'Sharp', color: '#003087', models: 3 },
    ],
    electronics: [
        { name: 'Apple', color: '#555555', models: 12 },
        { name: 'Samsung', color: '#1428A0', models: 10 },
        { name: 'Sony', color: '#000000', models: 8 },
        { name: 'Philips', color: '#0066CC', models: 7 },
        { name: 'Panasonic', color: '#003087', models: 5 },
        { name: 'JBL', color: '#FF6600', models: 4 },
        { name: 'Braun', color: '#1A1A1A', models: 4 },
        { name: 'Rowenta', color: '#C8002D', models: 3 },
        { name: 'Dyson', color: '#CC3300', models: 3 },
        { name: 'Tefal', color: '#E4000F', models: 3 },
    ],
    hearing: [
        { name: 'Phonak', color: '#E4032E', models: 8 },
        { name: 'Oticon', color: '#003C71', models: 7 },
        { name: 'Siemens', color: '#009999', models: 6 },
        { name: 'Widex', color: '#00539F', models: 5 },
        { name: 'ReSound', color: '#E4032E', models: 4 },
        { name: 'Starkey', color: '#003087', models: 3 },
    ],
    walking: [
        { name: 'Drive Medical', color: '#005691', models: 6 },
        { name: 'Invacare', color: '#003087', models: 5 },
        { name: 'Rollator', color: '#006400', models: 4 },
        { name: 'Nova', color: '#8B0000', models: 3 },
    ],
};

const categoryEmoji: Record<string, string> = {
    tv: '📺',
    kitchen: '🍳',
    laundry: '🫧',
    hvac: '❄️',
    electronics: '🔌',
    hearing: '🦻',
    walking: '🦯',
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

const categoryNames: Record<string, string> = {
    tv: 'Television',
    kitchen: 'Oven & Kitchen',
    laundry: 'Laundry',
    hvac: 'Heating & Cooling',
    electronics: 'Small Electronics',
    hearing: 'Hearing Aids',
    walking: 'Walking Aids',
};

export default async function CategoryPage({
                                               params,
                                           }: {
    params: Promise<{ locale: string; category: string }>;
}) {
    const { locale, category } = await params;
    const brands = brandsData[category] || [];
    const emoji = categoryEmoji[category] || '🏠';
    const strip = categoryStrip[category] || '#6366F1';
    const categoryName = categoryNames[category] || category;

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
            }}>
                <Link href={`/${locale}`} style={{
                    color: '#1A1A1A',
                    textDecoration: 'none',
                    opacity: 0.6,
                }}>
                    Home
                </Link>
                <span style={{ color: '#1A1A1A', opacity: 0.4 }}>›</span>
                <span style={{ color: '#1A1A1A' }}>{emoji} {categoryName}</span>
            </div>

            {/* Header card */}
            <div style={{
                margin: '0 40px 24px',
                background: '#fff',
                border: '2.5px solid #1A1A1A',
                borderRadius: 20,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '4px 4px 0 #1A1A1A',
            }}>
                <div style={{
                    fontSize: 64,
                    lineHeight: 1,
                    filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.15))',
                }}>
                    {emoji}
                </div>
                <div>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 4,
                    }}>
                        Category
                    </div>
                    <div style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#1A1A1A',
                        marginBottom: 4,
                    }}>
                        {categoryName}
                    </div>
                    <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
                        {brands.length} brands available — select yours to find your model
                    </div>
                </div>
            </div>

            {/* Section label */}
            <div style={{ padding: '0 40px 12px' }}>
                <p style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#4A3000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    Select your brand
                </p>
            </div>

            {/* Brand Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                padding: '0 40px',
            }}>
                {brands.map((brand) => (
                    <Link
                        key={brand.name}
                        href={`/${locale}/${category}/${brand.name.toLowerCase().replace(/[\s']+/g, '-')}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className="card-hover"
                            style={{
                                background: '#fff',
                                border: '2.5px solid #1A1A1A',
                                borderRadius: 20,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                boxShadow: '4px 4px 0 #1A1A1A',
                                position: 'relative',
                            }}
                        >
                            <div style={{ height: 6, background: strip }} />

                            <div style={{
                                position: 'absolute',
                                top: 14,
                                right: 12,
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                background: '#F5A623',
                                border: '2px solid #1A1A1A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 800,
                                color: '#1A1A1A',
                            }}>
                                ↗
                            </div>

                            <BrandLogo brand={brand} />

                            <div style={{
                                padding: '10px 14px 14px',
                                borderTop: '2px solid #1A1A1A',
                            }}>
                                <div style={{
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: '#1A1A1A',
                                    marginBottom: 3,
                                }}>
                                    {brand.name}
                                </div>
                                <div style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: '#888',
                                }}>
                                    {brand.models} models available
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}