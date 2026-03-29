'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function ContactPage({
                                        params,
                                    }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    const [form, setForm] = useState({
        name: '',
        email: '',
        appliance: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return;

        setStatus('sending');

        try {
            // Send notification to you
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: form.name,
                    from_email: form.email,
                    appliance: form.appliance || 'Not specified',
                    message: form.message || 'No additional message',
                    to_email: 'boaz.lupu@gmail.com',
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            // Send auto-reply to user
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!,
                {
                    to_name: form.name,
                    from_email: form.email,
                    appliance: form.appliance || 'your request',
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setStatus('success');
            setForm({ name: '', email: '', appliance: '', message: '' });
        } catch (error) {
            console.error('Email error:', error);
            setStatus('error');
        }
    };

    return (
        <div style={{ background: '#F5A623', minHeight: '100vh', padding: '0 0 60px' }}>

            {/* Breadcrumb */}
            <div style={{
                padding: '12px 40px', display: 'flex',
                alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600,
            }}>
                <Link href={`/${locale}`} style={{ color: '#1A1A1A', textDecoration: 'none', opacity: 0.6 }}>
                    Home
                </Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <span style={{ color: '#1A1A1A' }}>Contact Us</span>
            </div>

            {/* Form Card */}
            <div style={{
                maxWidth: 560,
                margin: '20px auto',
                padding: '0 20px',
            }}>
                <div style={{
                    background: '#fff',
                    border: '2.5px solid #1A1A1A',
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '6px 6px 0 #1A1A1A',
                }}>

                    {/* Header */}
                    <div style={{
                        background: '#1A1A1A',
                        padding: '28px 32px',
                    }}>
                        <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
                        <h1 style={{
                            fontSize: 26, fontWeight: 800,
                            color: '#F5A623', marginBottom: 6,
                        }}>
                            Didn't find your appliance?
                        </h1>
                        <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.5 }}>
                            Tell us what you need and we'll add it to HomeGuide as soon as possible!
                        </p>
                    </div>

                    {/* Form */}
                    <div style={{ padding: '32px' }}>

                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginBottom: 8 }}>
                                    Request sent!
                                </h2>
                                <p style={{ fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>
                                    Thank you for making HomeGuide better. We'll add your appliance as soon as possible and send you a confirmation email.
                                </p>
                                <Link href={`/${locale}`} style={{
                                    display: 'inline-block',
                                    background: '#1A1A1A', color: '#F5A623',
                                    borderRadius: 50, padding: '12px 28px',
                                    fontSize: 14, fontWeight: 800, textDecoration: 'none',
                                }}>
                                    ← Back to Home
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Name — required */}
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block', fontSize: 12, fontWeight: 700,
                                        color: '#1A1A1A', textTransform: 'uppercase',
                                        letterSpacing: '0.08em', marginBottom: 6,
                                    }}>
                                        Your Name <span style={{ color: '#EF4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. David Cohen"
                                        required
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            border: '2px solid #E5E7EB', borderRadius: 12,
                                            fontSize: 14, outline: 'none',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#F5A623'}
                                        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>

                                {/* Email — required */}
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block', fontSize: 12, fontWeight: 700,
                                        color: '#1A1A1A', textTransform: 'uppercase',
                                        letterSpacing: '0.08em', marginBottom: 6,
                                    }}>
                                        Your Email <span style={{ color: '#EF4444' }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="e.g. david@gmail.com"
                                        required
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            border: '2px solid #E5E7EB', borderRadius: 12,
                                            fontSize: 14, outline: 'none',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#F5A623'}
                                        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>

                                {/* Appliance to add — optional */}
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block', fontSize: 12, fontWeight: 700,
                                        color: '#1A1A1A', textTransform: 'uppercase',
                                        letterSpacing: '0.08em', marginBottom: 6,
                                    }}>
                                        Appliance to Add
                                        <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, marginLeft: 6, textTransform: 'none' }}>
                      (optional)
                    </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="appliance"
                                        value={form.appliance}
                                        onChange={handleChange}
                                        placeholder="e.g. Bosch Serie 8 Dishwasher"
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            border: '2px solid #E5E7EB', borderRadius: 12,
                                            fontSize: 14, outline: 'none',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#F5A623'}
                                        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>

                                {/* Additional message — optional */}
                                <div style={{ marginBottom: 28 }}>
                                    <label style={{
                                        display: 'block', fontSize: 12, fontWeight: 700,
                                        color: '#1A1A1A', textTransform: 'uppercase',
                                        letterSpacing: '0.08em', marginBottom: 6,
                                    }}>
                                        Additional Message
                                        <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, marginLeft: 6, textTransform: 'none' }}>
                      (optional)
                    </span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Any other details you'd like to share..."
                                        rows={3}
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            border: '2px solid #E5E7EB', borderRadius: 12,
                                            fontSize: 14, outline: 'none',
                                            fontFamily: 'inherit', resize: 'vertical',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#F5A623'}
                                        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>

                                {/* Error message */}
                                {status === 'error' && (
                                    <div style={{
                                        background: '#FEE2E2', border: '1.5px solid #EF4444',
                                        borderRadius: 10, padding: '10px 16px',
                                        fontSize: 13, color: '#B91C1C', marginBottom: 16,
                                    }}>
                                        Something went wrong. Please try again or email us directly at boaz.lupu@gmail.com
                                    </div>
                                )}

                                {/* Validation message */}
                                {(!form.name || !form.email) && (
                                    <div style={{
                                        fontSize: 12, color: '#9CA3AF',
                                        marginBottom: 12,
                                    }}>
                                        * Name and Email are required
                                    </div>
                                )}

                                {/* Submit button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={status === 'sending' || !form.name || !form.email}
                                    style={{
                                        width: '100%',
                                        background: (!form.name || !form.email) ? '#D1D5DB' : '#1A1A1A',
                                        color: (!form.name || !form.email) ? '#9CA3AF' : '#F5A623',
                                        border: 'none',
                                        borderRadius: 50,
                                        padding: '16px',
                                        fontSize: 16,
                                        fontWeight: 800,
                                        cursor: (!form.name || !form.email) ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: (!form.name || !form.email) ? 'none' : '4px 4px 0 rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {status === 'sending' ? '⏳ Sending...' : 'Send Request ↗'}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Back link */}
                {status !== 'success' && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Link href={`/${locale}`} style={{
                            fontSize: 13, color: '#4A3000',
                            fontWeight: 600, textDecoration: 'none', opacity: 0.7,
                        }}>
                            ← Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}