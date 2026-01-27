import { client } from "@/sanity/lib/client";
import { artistQuery, artistPathsQuery } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/image-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork } from "@/types";

export async function generateStaticParams() {
    const slugs = await client.fetch(artistPathsQuery);
    return slugs.map((slug: string) => ({ slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const artist = await client.fetch(artistQuery, { slug });

    if (!artist) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 px-6 mx-auto max-w-[1800px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-4">
                        <div className="aspect-square bg-gray-100 overflow-hidden mb-6">
                            {artist.image && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={urlFor(artist.image).width(600).height(600).url()}
                                    alt={artist.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-8 lg:pl-12 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">{artist.name}</h1>
                        <div className="prose prose-lg font-light text-gray-600 max-w-none">
                            <p>{artist.bio}</p>
                        </div>
                    </div>
                </div>

                {artist.artworks && artist.artworks.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-light mb-12 border-t border-gray-100 pt-12">Selected Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {artist.artworks.map((artwork: Artwork) => {
                                const thumbnailImage = artwork.artworkType === 'single'
                                    ? artwork.image
                                    : artwork.panels?.[0];

                                return (
                                    <Link key={artwork.slug.current} href={`/artworks/${artwork.slug.current}`} className="group block">
                                        <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden shadow-sm transition-shadow hover:shadow-museum relative">
                                            {thumbnailImage && (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={urlFor(thumbnailImage).width(600).url()}
                                                    alt={artwork.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            {/* Badge for multi-panel artworks */}
                                            {artwork.artworkType && artwork.artworkType !== 'single' && (
                                                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                    {artwork.artworkType === 'diptych' ? '2 Panels' : '3 Panels'}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-light group-hover:text-accent transition-colors">{artwork.title}</h3>
                                        <p className="text-sm text-gray-400">{artwork.year}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
