import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const query = groq`*[_type == "artwork"]{
            title,
            "artist": artist->name,
            "imageUrl": image.asset->url,
            "imageMarkdown": "![" + title + "](" + image.asset->url + ")",
            year,
            medium,
            dimensions,
            price,
            description
        }`;

        const artworks = await client.fetch(query);

        return NextResponse.json({ success: true, data: artworks });
    } catch (error) {
        console.error('Error fetching artworks:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch artworks' }, { status: 500 });
    }
}
