import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import TTSBar from '@/components/TTSBar';
import BrandLogo from '@/components/BrandLogo';

const categoryConfig: Record<string, { strip: string; bg: string; emoji: string }> = {
    tv:          { strip: '#3B82F6', bg: '#EFF6FF', emoji: '📺' },
    kitchen:     { strip: '#EF4444', bg: '#FFF1F1', emoji: '🍳' },
    laundry:     { strip: '#10B981', bg: '#F0FDF4', emoji: '🫧' },
    vacuum:      { strip: '#6366F1', bg: '#F0FDF4', emoji: '🧹' },
    hearing:     { strip: '#8B5CF6', bg: '#FAF5FF', emoji: '🦻' },
    hvac:        { strip: '#0EA5E9', bg: '#F0F9FF', emoji: '❄️' },
    electronics: { strip: '#EC4899', bg: '#FDF2F8', emoji: '🔌' },
    walking:     { strip: '#EAB308', bg: '#FEFCE8', emoji: '🦯' },
};

const brandsData: Record<string, { name: string; slug: string; domain: string; models: number }[]> = {
    tv: [
        { name: 'Samsung',   slug: 'samsung',   domain: 'samsung.com',   models: 12 },
        { name: 'LG',        slug: 'lg',        domain: 'lg.com',        models: 9  },
        { name: 'Sony',      slug: 'sony',      domain: 'sony.com',      models: 8  },
        { name: 'Philips',   slug: 'philips',   domain: 'philips.com',   models: 6  },
        { name: 'Hisense',   slug: 'hisense',   domain: 'hisense.com',   models: 5  },
        { name: 'TCL',       slug: 'tcl',       domain: 'tcl.com',       models: 4  },
        { name: 'Panasonic', slug: 'panasonic', domain: 'panasonic.com', models: 4  },
        { name: 'Toshiba',   slug: 'toshiba',   domain: 'toshiba.com',   models: 3  },
    ],
    kitchen: [
        { name: 'Bosch',     slug: 'bosch',     domain: 'bosch.com',     models: 8  },
        { name: 'Samsung',   slug: 'samsung',   domain: 'samsung.com',   models: 6  },
        { name: 'Whirlpool', slug: 'whirlpool', domain: 'whirlpool.com', models: 7  },
        { name: 'Siemens',   slug: 'siemens',   domain: 'siemens.com',   models: 5  },
        { name: 'Electrolux',slug: 'electrolux',domain: 'electrolux.com',models: 6  },
        { name: 'LG',        slug: 'lg',        domain: 'lg.com',        models: 5  },
        { name: 'AEG',       slug: 'aeg',       domain: 'aeg.com',       models: 4  },
        { name: 'Miele',     slug: 'miele',     domain: 'miele.com',     models: 5  },
        { name: 'Nespresso', slug: 'nespresso', domain: 'nespresso.com', models: 4  },
        { name: 'Beko',      slug: 'beko',      domain: 'beko.com',      models: 4  },
    ],
    laundry: [
        { name: 'Bosch',     slug: 'bosch',     domain: 'bosch.com',     models: 7  },
        { name: 'Samsung',   slug: 'samsung',   domain: 'samsung.com',   models: 6  },
        { name: 'LG',        slug: 'lg',        domain: 'lg.com',        models: 5  },
        { name: 'Miele',     slug: 'miele',     domain: 'miele.com',     models: 4  },
        { name: 'AEG',       slug: 'aeg',       domain: 'aeg.com',       models: 4  },
        { name: 'Whirlpool', slug: 'whirlpool', domain: 'whirlpool.com', models: 5  },
    ],
    vacuum: [
        { name: 'Dyson',     slug: 'dyson',     domain: 'dyson.com',     models: 8  },
        { name: 'iRobot',    slug: 'irobot',    domain: 'irobot.com',    models: 6  },
        { name: 'Shark',     slug: 'shark',     domain: 'sharkclean.com',models: 5  },
        { name: 'Miele',     slug: 'miele',     domain: 'miele.com',     models: 4  },
        { name: 'Bosch',     slug: 'bosch',     domain: 'bosch.com',     models: 3  },
        { name: 'Electrolux',slug: 'electrolux',domain: 'electrolux.com',models: 4  },
    ],
    hearing: [
        { name: 'Phonak',    slug: 'phonak',    domain: 'phonak.com',    models: 5  },
        { name: 'Oticon',    slug: 'oticon',    domain: 'oticon.com',    models: 4  },
        { name: 'Signia',    slug: 'signia',    domain: 'signia.pro',    models: 4  },
        { name: 'Widex',     slug: 'widex',     domain: 'widex.com',     models: 3  },
        { name: 'ReSound',   slug: 'resound',   domain: 'resound.com',   models: 4  },
    ],
    hvac: [
        { name: 'Daikin',    slug: 'daikin',    domain: 'daikin.com',    models: 6  },
        { name: 'Mitsubishi',slug: 'mitsubishi',domain: 'mitsubishi.com',models: 5  },
        { name: 'LG',        slug: 'lg',        domain: 'lg.com',        models: 5  },
        { name: 'Samsung',   slug: 'samsung',   domain: 'samsung.com',   models: 4  },
        { name: 'Panasonic', slug: 'panasonic', domain: 'panasonic.com', models: 5  },
        { name: 'Carrier',   slug: 'carrier',   domain: 'carrier.com',   models: 4  },
        { name: 'Toshiba',   slug: 'toshiba',   domain: 'toshiba.com',   models: 4  },
    ],
    electronics: [
        { name: 'Apple',     slug: 'apple',     domain: 'apple.com',     models: 8  },
        { name: 'Samsung',   slug: 'samsung',   domain: 'samsung.com',   models: 7  },
        { name: 'Sony',      slug: 'sony',      domain: 'sony.com',      models: 6  },
        { name: 'Philips',   slug: 'philips',   domain: 'philips.com',   models: 5  },
        { name: 'Bose',      slug: 'bose',      domain: 'bose.com',      models: 5  },
        { name: 'JBL',       slug: 'jbl',       domain: 'jbl.com',       models: 4  },
        { name: 'Panasonic', slug: 'panasonic', domain: 'panasonic.com', models: 4  },
        { name: 'LG',        slug: 'lg',        domain: 'lg.com',        models: 5  },
        { name: 'Xiaomi',    slug: 'xiaomi',    domain: 'xiaomi.com',    models: 6  },
        { name: 'Huawei',    slug: 'huawei',    domain: 'huawei.com',    models: 4  },
    ],
    walking: [
        { name: 'Rollz',     slug: 'rollz',     domain: 'rollz.eu',      models: 4  },
        { name: 'Drive',     slug: 'drive',     domain: 'drivemedical.com', models: 5 },
        { name: 'Invacare',  slug: 'invacare',  domain: 'invacare.com',  models: 3  },
        { name: 'Topro',     slug: 'topro',     domain: 'topro.no',      models: 3  },
    ],
};

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ locale: string; category: string }>;
}) {
    const { locale, category } = await params;
    const t = await getTranslations({ locale });

    const config = categoryConfig[category] ?? { strip: '#888', bg: '#F9FAFB', emoji: '📦' };
    const brands = brandsData[category] ?? [];
    const categoryName = t(`categories.${category}`);
    const ttsText = `${categoryName}. ${brands.length} brands available.`;

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh' }}>
            {/* Header */}
            <div className="cat-header-pad">
                <Link
                    href={`/${locale}`}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: '#fff', border: '2px solid #1A1A1A',
                        borderRadius: 20, padding: '6px 14px',
                        fontSize: 13, fontWeight: 600, color: '#1A1A1A',
                        textDecoration: 'none', marginBottom: 20,
                        boxShadow: '2px 2px 0 #1A1A1A',
                    }}
                >
                    ← {t('nav.home')}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: config.bg, border: '2.5px solid #1A1A1A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 32,
                    }}>
                        {config.emoji}
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: 36, fontWeight: 800, color: '#1A1A1A',
                            lineHeight: 1.1, letterSpacing: '-1px', margin: 0,
                        }}>
                            {categoryName}
                        </h1>
                        <p style={{ fontSize: 14, color: '#4A3000', margin: '4px 0 0', fontWeight: 500 }}>
                            {brands.length} brands available
                        </p>
                    </div>
                </div>
            </div>

            <TTSBar text={ttsText} />

            <div className="cat-section-pad">
                <p style={{
                    fontSize: 12, fontWeight: 700, color: '#4A3000',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                    {t('home.categories')}
                </p>
            </div>

            {/* Brand Grid */}
            <div className="grid-4">
                {brands.map((brand) => (
                    <Link
                        key={brand.slug}
                        href={`/${locale}/${category}/${brand.slug}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className="card-hover"
                            style={{
                                background: '#fff', border: '2.5px solid #1A1A1A',
                                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                boxShadow: '4px 4px 0 #1A1A1A', position: 'relative',
                            }}
                        >
                            <div style={{ height: 6, background: config.strip }} />
                            <div style={{
                                position: 'absolute', top: 14, right: 12,
                                width: 24, height: 24, borderRadius: '50%',
                                background: '#F5A623', border: '2px solid #1A1A1A',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 800, color: '#1A1A1A',
                            }}>↗</div>
                            <div style={{
                                height: 110,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: config.bg,
                            }}>
                                <BrandLogo brand={{ name: brand.name, color: config.strip }} />
                            </div>
                            <div style={{ padding: '10px 14px 14px', borderTop: '2px solid #1A1A1A' }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', marginBottom: 3 }}>
                                    {brand.name}
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>
                                    {brand.models} models
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
