'use client';

import { useState } from 'react';

interface InquiryFormProps {
    artworkTitle: string;
    artistName: string;
}

export default function InquiryForm({ artworkTitle, artistName }: InquiryFormProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            const response = await fetch('/api/inquire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    message,
                    artworkTitle,
                    artistName,
                }),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-8 border border-green-100 text-center">
                <h3 className="text-lg font-light text-green-800 mb-2">Inquiry Sent</h3>
                <p className="text-sm text-green-700">Thank you. We have notified the artist and will contact you shortly.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-8 border border-gray-100">
            <h3 className="text-lg font-light mb-4">Inquire about this work</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Your Email"
                        className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-light focus:outline-none focus:border-accent transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows={3}
                        placeholder="Message (Optional)"
                        className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-light focus:outline-none focus:border-accent transition-colors"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-foreground text-background py-3 text-sm tracking-widest hover:bg-accent disabled:opacity-50 transition-colors"
                >
                    {status === 'loading' ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
                {status === 'error' && (
                    <p className="text-xs text-red-500 mt-2">Something went wrong. Please try again.</p>
                )}
            </form>
            <p className="text-xs text-gray-400 mt-4 text-center">
                We will connect you directly with the artist.
            </p>
        </div>
    );
}
