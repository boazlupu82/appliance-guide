'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const locales = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'עב' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
];

export default function ContactBanner() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (newLocale: string) => {
        if (newLocale === locale) return;

        // Save preference in cookie
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

        // Replace ONLY the locale segment — keep the rest of the path intact
        const segments = pathname.split('/');
        // segments[0] = '' (empty before first slash)
        // segments[1] = current locale (en, he, fr, es)
        // segments[2+] = rest of path (category, brand, etc.)
        segments[1] = newLocale;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className="banner-pad" style={{
            background: '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
            position: 'sticky',
            top: 0,
            zIndex: 300,
        }}>
            {/* Left — message */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>🔍</span>
                <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
          {t('brand.notFound')}
        </span>
            </div>

            {/* Right — language pills + contact button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

                {/* Language selector */}
                {locales.map((l) => (
                    <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: 20,
                            border: `1.5px solid ${locale === l.code ? '#F5A623' : '#374151'}`,
                            background: locale === l.code ? '#F5A623' : 'transparent',
                            color: locale === l.code ? '#1A1A1A' : '#9CA3AF',
                            cursor: locale === l.code ? 'default' : 'pointer',
                            transition: 'all 0.15s',
                        }}
                    >
                        {l.label}
                    </button>
                ))}

                {/* Divider */}
                <div style={{
                    width: 1,
                    height: 20,
                    background: '#374151',
                    margin: '0 4px',
                }} />

                {/* Contact button */}
                <Link
                    href={`/${locale}/contact`}
                    style={{
                        background: '#F5A623',
                        color: '#1A1A1A',
                        borderRadius: 20,
                        padding: '6px 16px',
                        fontSize: 12,
                        fontWeight: 800,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {t('brand.contactUs')} ↗
                </Link>
            </div>
        </div>
    );
}