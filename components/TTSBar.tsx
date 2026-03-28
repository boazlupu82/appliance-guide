'use client';

import { useState } from 'react';

export default function TTSBar({ text }: { text: string }) {
    const [speaking, setSpeaking] = useState(false);

    const speak = () => {
        if (!window.speechSynthesis) return;
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
    };

    return (
        <div style={{
            background: 'var(--accent-light)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid #FCD34D',
        }}>
            <button
                onClick={speak}
                style={{
                    background: speaking ? '#EF4444' : 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 20,
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                {speaking ? '■ Stop' : '▶ Read aloud'}
            </button>
            <span style={{ fontSize: 11, color: '#92400E' }}>
        Tap to hear this page read to you
      </span>
        </div>
    );
}