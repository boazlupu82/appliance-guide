import Link from 'next/link';

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
    return (
        <div style={{
            padding: '8px 16px',
            background: '#F9FAFB',
            borderBottom: '1px solid var(--border)',
            fontSize: 11,
            color: 'var(--gray)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
        }}>
            {crumbs.map((crumb, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {i > 0 && <span>›</span>}
                    {crumb.href ? (
                        <Link href={crumb.href} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                            {crumb.label}
                        </Link>
                    ) : (
                        <span style={{ color: 'var(--dark)', fontWeight: 500 }}>{crumb.label}</span>
                    )}
        </span>
            ))}
        </div>
    );
}