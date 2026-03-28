'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'עב' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
];

export default function Navbar({ locale }: { locale: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (newLocale: string) => {
        // Save preference in cookie for 1 year
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <nav style={{
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#F5A623',
        }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.5px' }}>
                    Home
                    <span style={{
                        background: '#1A1A1A',
                        color: '#F5A623',
                        padding: '2px 10px',
                        borderRadius: 6,
                        marginLeft: 2,
                    }}>
            Guide
          </span>
                </div>
            </Link>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {locales.map((l) => (
                    <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: 20,
                            border: '2px solid #1A1A1A',
                            background: locale === l.code ? '#1A1A1A' : 'transparent',
                            color: locale === l.code ? '#F5A623' : '#1A1A1A',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}
                    >
                        {l.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}