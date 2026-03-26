import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'he', 'fr', 'es'],
    defaultLocale: 'en'
});