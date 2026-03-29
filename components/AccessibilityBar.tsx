'use client';

import { useState, useEffect } from 'react';

export default function AccessibilityBar() {
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    useEffect(() => {
        document.body.style.filter = highContrast ? 'contrast(1.5)' : 'none';
    }, [highContrast]);

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            bottom: 80,
            zIndex: 999,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
        }}>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: '0 8px 8px 0',
                    background: '#1A1A1A',
                    border: '2px solid #F5A623',
                    borderLeft: 'none',
                    color: '#F5A623',
                    fontSize: 18,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                title="Accessibility"
            >
                ♿
            </button>

            {/* Panel */}
            {open && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    padding: '8px 6px',
                    background: '#1A1A1A',
                    borderRadius: '0 12px 12px 0',
                    border: '2px solid #F5A623',
                    borderLeft: 'none',
                    marginLeft: -2,
                }}>
                    <button
                        onClick={() => setFontSize(f => Math.min(f + 10, 150))}
                        title="Increase text size"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: '#F5A623', border: '2px solid #1A1A1A',
                            color: '#1A1A1A', fontSize: 13, fontWeight: 800,
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >A+</button>

                    <button
                        onClick={() => setFontSize(f => Math.max(f - 10, 80))}
                        title="Decrease text size"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: '#fff', border: '2px solid #F5A623',
                            color: '#1A1A1A', fontSize: 11, fontWeight: 800,
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >A-</button>

                    <button
                        onClick={() => setFontSize(100)}
                        title="Reset text size"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: '#374151', border: '2px solid #F5A623',
                            color: '#fff', fontSize: 11, fontWeight: 700,
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >↺</button>

                    <button
                        onClick={() => setHighContrast(h => !h)}
                        title="Toggle high contrast"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: highContrast ? '#F5A623' : '#374151',
                            border: '2px solid #F5A623',
                            color: highContrast ? '#1A1A1A' : '#fff',
                            fontSize: 16, fontWeight: 800,
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >◑</button>
                </div>
            )}
        </div>
    );
}