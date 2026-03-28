import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'he', 'fr', 'es'] as const;
type Locale = typeof locales[number];

const countryToLocale: Record<string, Locale> = {
    // Hebrew
    IL: 'he',
    // French
    FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr',
    DZ: 'fr', MA: 'fr', TN: 'fr', SN: 'fr', CI: 'fr',
    // Spanish
    ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es',
    CL: 'es', VE: 'es', EC: 'es', GT: 'es', CU: 'es',
    BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es',
    NI: 'es', CR: 'es', PA: 'es', UY: 'es',
};

function getLocaleFromAcceptLanguage(acceptLanguage: string): Locale | null {
    const languages = acceptLanguage
        .split(',')
        .map(lang => {
            const [code, q = 'q=1'] = lang.trim().split(';');
            return { code: code.trim().split('-')[0].toLowerCase(), q: parseFloat(q.split('=')[1]) };
        })
        .sort((a, b) => b.q - a.q);

    for (const { code } of languages) {
        if (code === 'he' || code === 'iw') return 'he';
        if (code === 'fr') return 'fr';
        if (code === 'es') return 'es';
        if (code === 'en') return 'en';
    }
    return null;
}

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // If user already has a locale in the URL, respect it
    const hasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!hasLocale && pathname === '/') {
        let detectedLocale: Locale = 'en';

        // Layer 1: Check Accept-Language header
        const acceptLanguage = request.headers.get('accept-language') || '';
        const langLocale = getLocaleFromAcceptLanguage(acceptLanguage);
        if (langLocale) detectedLocale = langLocale;

        // Layer 2: Check IP geolocation via Vercel header (free, no API needed!)
        const country = request.headers.get('x-vercel-ip-country') || '';

        if (country && countryToLocale[country.toUpperCase()]) {
            detectedLocale = countryToLocale[country.toUpperCase()];
        }

        // Check if user has a saved preference in cookie
        const savedLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale;
        if (savedLocale && locales.includes(savedLocale)) {
            detectedLocale = savedLocale;
        }

        return NextResponse.redirect(
            new URL(`/${detectedLocale}`, request.url)
        );
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};