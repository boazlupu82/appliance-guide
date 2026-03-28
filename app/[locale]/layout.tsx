import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'HomeGuide',
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
        <body>
        <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} />
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}