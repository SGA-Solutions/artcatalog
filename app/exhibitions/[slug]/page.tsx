import { client } from "@/sanity/lib/client";
import { exhibitionQuery, exhibitionPathsQuery } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/image-utils";
import { formatDateRange } from "@/lib/date-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork } from "@/types";
import ExhibitionTitle from "@/components/ExhibitionTitle";

export async function generateStaticParams() {
    const slugs = await client.fetch(exhibitionPathsQuery);
    return slugs.map((slug: string) => ({ slug }));
}

export default async function ExhibitionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const exhibition = await client.fetch(exhibitionQuery, { slug });

    if (!exhibition) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-24 px-6 mx-auto max-w-[1800px] w-full">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-xs tracking-[0.2em] text-gray-500 uppercase block mb-3">Exhibition</span>
                    <ExhibitionTitle
                        value={exhibition.title}
                        className="text-3xl md:text-5xl font-light tracking-tight mb-6"
                    />
                    <div className="text-sm font-light text-gray-600 mb-4">
                        {formatDateRange(exhibition.startDate, exhibition.endDate)}     {exhibition.openHours}
                    </div>
                    {(exhibition.location || exhibition.contactNumber) && (
                        <div className="text-sm text-gray-600 mb-8 space-y-1">
                            {exhibition.location && (
                                <p className="flex items-center justify-center gap-2">
                                    <span className="text-gray-400">�</span>
                                    {exhibition.location}
                                </p>
                            )}
                            {exhibition.contactNumber && (
                                <p className="flex items-center justify-center gap-2">
                                    <span className="text-gray-400">📞</span>
                                    <a href={`tel:${exhibition.contactNumber}`} className="hover:text-accent transition-colors">
                                        {exhibition.contactNumber}
                                    </a>
                                </p>
                            )}
                        </div>
                    )}
                    <p className="text-base font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {exhibition.theme}
                    </p>
                </div>

                {exhibition.artworks && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {exhibition.artworks.map((artwork: Artwork) => (
                            <Link key={artwork._id} href={`/artworks/${artwork.slug.current}`} className="group block">
                                <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-museum">
                                    {artwork.image && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={urlFor(artwork.image).width(800).url()}
                                            alt={artwork.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-base font-light group-hover:text-accent transition-colors mb-1">{artwork.title}</h3>
                                    <p className="text-sm text-gray-500 mb-1">{artwork.artist?.name}</p>
                                    <p className="text-xs text-gray-400">{artwork.year}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
