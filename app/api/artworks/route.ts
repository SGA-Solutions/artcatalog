import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const query = groq`*[_type == "artwork"]{
            title,
            "artist": artist->name,
            "imageUrl": image.asset->url + "?w=900&auto=format",
            "imageMarkdown": "![" + title + "](" + image.asset->url + "?w=900&auto=format)",
            "fullMarkdown": "### " + title + "\n\n![" + title + "](" + image.asset->url + "?w=900&auto=format)\n\n**Artist:** " + artist->name + "\n**Year:** " + year + "\n**Medium:** " + medium + "\n**Dimensions:** " + dimensions + "\n**Price:** " + price + "\n\n" + description,
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
