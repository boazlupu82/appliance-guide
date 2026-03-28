'use client';

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

export default function BrandLogo({
                                      brand,
                                  }: {
    brand: { name: string; color: string };
}) {
    return (
        <div style={{
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F9FAFB',
            padding: '12px',
        }}>
            <img
                src={`https://cdn.brandfetch.io/${getBrandDomain(brand.name)}/w/200/h/200`}
                alt={brand.name}
                style={{
                    width: 72,
                    height: 72,
                    objectFit: 'contain',
                    borderRadius: 12,
                }}
                onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const fallback = img.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                }}
            />
            <div style={{
                display: 'none',
                width: 64,
                height: 64,
                borderRadius: 16,
                background: brand.color,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 800,
                color: '#fff',
                border: '2px solid #1A1A1A',
            }}>
                {brand.name.slice(0, 3).toUpperCase()}
            </div>
        </div>
    );
}