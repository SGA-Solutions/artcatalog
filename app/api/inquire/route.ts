import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, message, artworkTitle, artistName } = body;

        // Validate required fields
        if (!email || !artworkTitle || !artistName) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email to the gallery/admin
        const galleryEmail = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.GALLERY_EMAIL || 'your-gallery@example.com',
            subject: `New Inquiry: ${artworkTitle} by ${artistName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Artwork Inquiry</h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Artwork:</strong> ${artworkTitle}</p>
                        <p style="margin: 10px 0;"><strong>Artist:</strong> ${artistName}</p>
                        <p style="margin: 10px 0;"><strong>Inquirer Email:</strong> ${email}</p>
                    </div>
                    
                    ${message ? `
                        <div style="margin: 20px 0;">
                            <p style="margin: 10px 0;"><strong>Message:</strong></p>
                            <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #000; margin: 10px 0;">
                                ${message}
                            </p>
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                        <p>Please respond to the inquirer at: <a href="mailto:${email}">${email}</a></p>
                    </div>
                </div>
            `,
        });

        // Email to the buyer (confirmation)
        const buyerEmail = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: email,
            subject: `Inquiry Received: ${artworkTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">Thank You for Your Inquiry</h2>
                    
                    <p style="margin: 20px 0; line-height: 1.6;">
                        We have received your inquiry about <strong>${artworkTitle}</strong> by <strong>${artistName}</strong>.
                    </p>
                    
                    ${message ? `
                        <div style="margin: 20px 0;">
                            <p style="margin: 10px 0;"><strong>Your message:</strong></p>
                            <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #000; margin: 10px 0;">
                                ${message}
                            </p>
                        </div>
                    ` : ''}
                    
                    <p style="margin: 20px 0; line-height: 1.6;">
                        We will review your inquiry and get back to you shortly. If you have any additional questions, 
                        please don't hesitate to reach out.
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                        <p>Best regards,<br>The Gallery Team</p>
                    </div>
                </div>
            `,
        });

        console.log('Gallery email sent:', galleryEmail);
        console.log('Buyer confirmation sent:', buyerEmail);

        return NextResponse.json({
            success: true,
            message: 'Inquiry sent successfully',
            emailIds: {
                gallery: galleryEmail.data?.id,
                buyer: buyerEmail.data?.id
            }
        });
    } catch (error) {
        console.error('Error sending inquiry:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send inquiry', error: String(error) },
            { status: 500 }
        );
    }
}
