import {useTranslations} from 'next-intl';
import Link from 'next/link';

const categories = [
    { key: 'kitchen', emoji: '🍳', slug: 'kitchen' },
    { key: 'laundry', emoji: '🫧', slug: 'laundry' },
    { key: 'hvac', emoji: '❄️', slug: 'hvac' },
    { key: 'electronics', emoji: '🔌', slug: 'electronics' },
    { key: 'tv', emoji: '📺', slug: 'tv' },
    { key: 'hearing', emoji: '👂', slug: 'hearing' },
    { key: 'walking', emoji: '🦯', slug: 'walking' },
];

export default function HomePage() {
    const t = useTranslations();

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        {t('home.title')}
                    </h1>
                    <p className="text-2xl text-gray-500">
                        {t('home.subtitle')}
                    </p>
                </div>

                {/* Category Grid */}
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                    {t('home.categories')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.key}
                            href={`/${cat.slug}`}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md
                         transition-all text-center cursor-pointer border
                         border-gray-100 hover:border-blue-200"
                        >
                            <div className="text-5xl mb-3">{cat.emoji}</div>
                            <div className="text-xl font-medium text-gray-700">
                                {t(`categories.${cat.key}`)}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}