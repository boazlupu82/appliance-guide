'use client';

import { useState } from 'react';

export default function YouTubeEmbed({
                                         videoId,
                                         title,
                                     }: {
    videoId: string;
    title: string;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ position: 'relative', background: '#000' }}>
            <div style={{
                position: 'relative',
                paddingBottom: expanded ? '56.25%' : '40%',
                height: 0,
                overflow: 'hidden',
                transition: 'padding-bottom 0.3s ease',
            }}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                />
            </div>

            {/* Expand/Collapse button */}
            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    zIndex: 10,
                }}
            >
                {expanded ? '⊡ Collapse' : '⊞ Expand'}
            </button>
        </div>
    );
}