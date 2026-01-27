import { client } from "@/sanity/lib/client";
import { artworkQuery, artworkPathsQuery } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/image-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import ViewInRoomModal from "@/components/ViewInRoomModal";

export async function generateStaticParams() {
    const slugs = await client.fetch(artworkPathsQuery);
    return slugs.map((slug: string) => ({ slug }));
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const artwork = await client.fetch(artworkQuery, { slug });

    if (!artwork) {
        notFound();
    }

    const imageUrl = artwork.image ? urlFor(artwork.image).width(1200).url() : null;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 px-6 mx-auto max-w-[1800px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Section */}
                    <div className="bg-white p-8 shadow-museum flex flex-col items-center justify-center min-h-[60vh]">
                        {imageUrl && (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt={artwork.title}
                                    className="max-h-[80vh] w-auto object-contain"
                                />
                                <ViewInRoomModal imageUrl={imageUrl} />
                            </>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <Link href={`/artists/${artwork.artist?.slug.current}`} className="text-lg text-gray-500 hover:text-accent transition-colors mb-2 block">
                                {artwork.artist?.name}
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">{artwork.title}</h1>
                            <div className="text-sm font-light text-gray-600 space-y-1 mb-8">
                                <p>{artwork.year}</p>
                                <p>{artwork.medium}</p>
                                <p>{artwork.dimensions}</p>
                            </div>

                            {artwork.description && (
                                <div className="prose font-light text-gray-600 mb-12">
                                    <p>{artwork.description}</p>
                                </div>
                            )}

                            {artwork.price && (
                                <p className="text-xl font-light mb-8">PHP {artwork.price.toLocaleString()}</p>
                            )}
                        </div>

                        {/* Inquiry Form */}
                        <InquiryForm artworkTitle={artwork.title} artistName={artwork.artist?.name} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
