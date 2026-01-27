import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/image-utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Artwork } from "@/types";
import ExhibitionTitle from "@/components/ExhibitionTitle";

// Helper for image URL (I'll create this file next, but using it here)
// If it doesn't exist yet, I'll need to create it.
// Actually, I should create lib/image-utils.ts first or inline it.
// I'll assume I'll create it.

export default async function Home() {
  const exhibition = await client.fetch(homePageQuery);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20 px-6 mx-auto max-w-[1800px] w-full">
        {exhibition ? (
          <section className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">Current Exhibition</span>
                <ExhibitionTitle
                  value={exhibition.title}
                  className="text-4xl md:text-5xl font-light tracking-tight leading-tight"
                />
                <p className="text-base font-light text-gray-600 max-w-xl leading-relaxed">
                  {exhibition.theme}
                </p>
                {(exhibition.location || exhibition.openHours || exhibition.contactNumber) && (
                  <div className="text-sm text-gray-600 space-y-1">
                    {exhibition.location && (
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">📍</span>
                        {exhibition.location}
                      </p>
                    )}
                    {exhibition.openHours && (
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">🕒</span>
                        {exhibition.openHours}
                      </p>
                    )}
                    {exhibition.contactNumber && (
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">📞</span>
                        <a href={`tel:${exhibition.contactNumber}`} className="hover:text-accent transition-colors">
                          {exhibition.contactNumber}
                        </a>
                      </p>
                    )}
                  </div>
                )}
                <div className="pt-2">
                  <Link
                    href={`/exhibitions/${exhibition.slug.current}`}
                    className="inline-block border-b border-foreground pb-1 text-sm tracking-widest hover:text-accent hover:border-accent transition-colors"
                  >
                    VIEW EXHIBITION
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] bg-gray-100 shadow-museum">
                {exhibition.featuredImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={urlFor(exhibition.featuredImage).width(1200).url()}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Preview of Artworks */}
            {exhibition.artworks && exhibition.artworks.length > 0 && (
              <div className="pt-12">
                <h2 className="text-xl font-light mb-6">Featured Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {exhibition.artworks.slice(0, 3).map((artwork: Artwork) => {
                    const thumbnailImage = artwork.artworkType === 'single'
                      ? artwork.image
                      : artwork.panels?.[0];

                    return (
                      <Link key={artwork.slug.current} href={`/artworks/${artwork.slug.current}`} className="group block">
                        <div className="aspect-[3/4] bg-gray-50 mb-3 overflow-hidden shadow-sm transition-shadow hover:shadow-museum relative">
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
                        <h3 className="text-base font-light group-hover:text-accent transition-colors">{artwork.title}</h3>
                        <p className="text-sm text-gray-500">{artwork.artist?.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-gray-400 font-light">No exhibitions currently on display.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
