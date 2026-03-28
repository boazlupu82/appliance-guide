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
            margin: '0 40px',
            background: '#fff',
            border: '2px solid #1A1A1A',
            borderRadius: 12,
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '3px 3px 0 #1A1A1A',
        }}>
            <button
                onClick={speak}
                style={{
                    background: speaking ? '#EF4444' : '#1A1A1A',
                    color: speaking ? '#fff' : '#F5A623',
                    border: 'none',
                    borderRadius: 20,
                    padding: '6px 16px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                }}
            >
                {speaking ? '■ Stop' : '▶ Read aloud'}
            </button>
            <span style={{ fontSize: 12, color: '#4A3000', fontWeight: 500 }}>
        Click to hear this page read to you
      </span>
        </div>
    );
}