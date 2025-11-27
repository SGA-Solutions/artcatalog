import { client } from "@/sanity/lib/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { groq } from "next-sanity";

const allArtistsQuery = groq`
  *[_type == "artist"] | order(name asc) {
    name,
    slug,
    bio
  }
`;

export default async function ArtistsPage() {
    const artists = await client.fetch(allArtistsQuery);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 px-6 mx-auto max-w-[1800px] w-full">
                <div className="max-w-4xl mx-auto mb-24">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Artists</h1>
                    <p className="text-lg font-light text-gray-600">Meet the talented artists in our collection.</p>
                </div>

                {artists && artists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {artists.map((artist: any) => (
                            <Link key={artist.slug.current} href={`/artists/${artist.slug.current}`} className="group block">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-light group-hover:text-accent transition-colors mb-2">
                                        {artist.name}
                                    </h3>
                                    {artist.bio && (
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {artist.bio}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[40vh]">
                        <p className="text-gray-400 font-light">No artists available yet.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
