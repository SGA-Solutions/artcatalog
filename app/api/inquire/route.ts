import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, message, artworkTitle, artistName } = body;

        // Mock Email Sending Logic
        console.log(`[Mock Email Service] Sending email to Buyer (${email})...`);
        console.log(`Subject: Inquiry Received for ${artworkTitle}`);
        console.log(`Body: Thank you for your interest in ${artworkTitle} by ${artistName}. We have notified the artist and will get back to you shortly.`);

        console.log(`[Mock Email Service] Sending email to Artist (${artistName})...`);
        console.log(`Subject: New Inquiry for ${artworkTitle}`);
        console.log(`Body: A buyer (${email}) is interested in your work. Message: ${message}`);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Error sending inquiry:', error);
        return NextResponse.json({ success: false, message: 'Failed to send inquiry' }, { status: 500 });
    }
}
