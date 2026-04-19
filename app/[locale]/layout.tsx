import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import './globals.css';
import AccessibilityBar from '@/components/AccessibilityBar';
import ContactBanner from '@/components/ContactBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'HomeGuido',
    description: 'Simple step-by-step guides for every appliance in your home',
};

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
        <body style={{ margin: 0, padding: 0 }}>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>

            {/* Accessibility bar — floating left side */}
            <AccessibilityBar />

            {/* Sticky contact + language bar */}
            <ContactBanner />

            {/* Logo bar */}
            <div style={{
                background: '#F5A623',
                padding: '12px 40px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2.5px solid #1A1A1A',
            }}>
                <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: '#1A1A1A',
                        letterSpacing: '-0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        Home
                        <span style={{
                            background: '#1A1A1A',
                            color: '#F5A623',
                            padding: '2px 10px',
                            borderRadius: 6,
                            marginLeft: 2,
                        }}>
                  Guido
                </span>
                    </div>
                </Link>
            </div>

            {/* Page content */}
            {children}

        </NextIntlClientProvider>
        </body>
        </html>
    );
}