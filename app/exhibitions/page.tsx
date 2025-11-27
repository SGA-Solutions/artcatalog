import { client } from "@/sanity/lib/client";
import { formatDateRange } from "@/lib/date-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

const allExhibitionsQuery = groq`
  *[_type == "exhibition"] | order(startDate desc) {
    title,
    slug,
    startDate,
    endDate,
    location,
    featuredImage
  }
`;

export default async function ExhibitionsPage() {
    const exhibitions = await client.fetch(allExhibitionsQuery);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 px-6 mx-auto max-w-[1800px] w-full">
                <div className="max-w-4xl mx-auto mb-24">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Exhibitions</h1>
                    <p className="text-lg font-light text-gray-600">Explore our current and past exhibitions.</p>
                </div>

                {exhibitions && exhibitions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {exhibitions.map((exhibition: any) => (
                            <Link key={exhibition.slug.current} href={`/exhibitions/${exhibition.slug.current}`} className="group block">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-light group-hover:text-accent transition-colors mb-2">
                                        <PortableText value={exhibition.title} />
                                    </h3>
                                    {exhibition.startDate && exhibition.endDate && (
                                        <p className="text-sm text-gray-500 font-light">
                                            {formatDateRange(exhibition.startDate, exhibition.endDate)}
                                        </p>
                                    )}
                                    {exhibition.location && (
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                            <span>📍</span>
                                            {exhibition.location}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[40vh]">
                        <p className="text-gray-400 font-light">No exhibitions available yet.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
