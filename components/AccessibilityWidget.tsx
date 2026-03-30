'use client';

import { useState, useEffect } from 'react';

export default function AccessibilityBar() {
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    useEffect(() => {
        if (highContrast) {
            document.body.style.filter = 'contrast(1.5)';
        } else {
            document.body.style.filter = 'none';
        }
    }, [highContrast]);

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: '8px 6px',
            background: '#1A1A1A',
            borderRadius: '0 12px 12px 0',
            border: '2px solid #F5A623',
            borderLeft: 'none',
        }}>
            {/* Increase font */}
            <button
                onClick={() => setFontSize(f => Math.min(f + 10, 150))}
                title="Increase text size"
                style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: '#F5A623',
                    border: '2px solid #1A1A1A',
                    color: '#1A1A1A',
                    fontSize: 16, fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                A+
            </button>

            {/* Decrease font */}
            <button
                onClick={() => setFontSize(f => Math.max(f - 10, 80))}
                title="Decrease text size"
                style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: '#fff',
                    border: '2px solid #F5A623',
                    color: '#1A1A1A',
                    fontSize: 13, fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                A-
            </button>

            {/* Reset font */}
            <button
                onClick={() => setFontSize(100)}
                title="Reset text size"
                style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: '#374151',
                    border: '2px solid #F5A623',
                    color: '#fff',
                    fontSize: 11, fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                ↺
            </button>

            {/* High contrast toggle */}
            <button
                onClick={() => setHighContrast(h => !h)}
                title="Toggle high contrast"
                style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: highContrast ? '#F5A623' : '#374151',
                    border: '2px solid #F5A623',
                    color: highContrast ? '#1A1A1A' : '#fff',
                    fontSize: 16, fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                ◑
            </button>
        </div>
    );
}