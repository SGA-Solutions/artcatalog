import { client } from "@/sanity/lib/client";
import { urlFor } from "@/lib/image-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { groq } from "next-sanity";

const allArtworksQuery = groq`
  *[_type == "artwork"] | order(_createdAt desc) {
    title,
    slug,
    image,
    year,
    artist->{name, slug}
  }
`;

export default async function ArtworksPage() {
    const artworks = await client.fetch(allArtworksQuery);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 px-6 mx-auto max-w-[1800px] w-full">
                <div className="max-w-4xl mx-auto mb-24">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Artworks</h1>
                    <p className="text-lg font-light text-gray-600">Browse our complete collection.</p>
                </div>

                {artworks && artworks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {artworks.map((artwork: any) => (
                            <Link key={artwork.slug.current} href={`/artworks/${artwork.slug.current}`} className="group block">
                                <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden shadow-sm transition-shadow hover:shadow-museum">
                                    {artwork.image && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={urlFor(artwork.image).width(600).url()}
                                            alt={artwork.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <h3 className="text-lg font-light group-hover:text-accent transition-colors">{artwork.title}</h3>
                                <p className="text-sm text-gray-500">{artwork.artist?.name}</p>
                                {artwork.year && <p className="text-xs text-gray-400">{artwork.year}</p>}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[40vh]">
                        <p className="text-gray-400 font-light">No artworks available yet.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
