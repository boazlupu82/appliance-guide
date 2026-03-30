'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const locales = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'עב' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
    { code: 'ru', label: 'РУ' },
];

export default function ContactBanner() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (newLocale: string) => {
        if (newLocale === locale) return;
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <div style={{
            background: '#1A1A1A',
            padding: '8px clamp(12px, 4vw, 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            position: 'sticky',
            top: 0,
            zIndex: 300,
        }}>
            {/* Left — hidden on very small screens */}
            <div className="contact-banner-msg" style={{
                display: 'flex', alignItems: 'center', gap: 6,
            }}>
                <span style={{ fontSize: 13 }}>🔍</span>
                <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>
          {t('brand.notFound')}
        </span>
            </div>

            {/* Right — always visible */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
                {locales.map((l) => (
                    <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 12,
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

                <div style={{
                    width: 1, height: 16,
                    background: '#374151', margin: '0 4px',
                }} />

                <Link
                    href={`/${locale}/contact`}
                    style={{
                        background: '#F5A623',
                        color: '#1A1A1A',
                        borderRadius: 12,
                        padding: '4px 10px',
                        fontSize: 11,
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