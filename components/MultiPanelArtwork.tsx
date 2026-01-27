'use client';

import { urlFor } from "@/lib/image-utils";

interface MultiPanelArtworkProps {
    artworkType: 'single' | 'diptych' | 'triptych';
    image?: any;
    panels?: any[];
    title: string;
    className?: string;
}

export default function MultiPanelArtwork({
    artworkType,
    image,
    panels,
    title,
    className = ""
}: MultiPanelArtworkProps) {
    // Single panel artwork
    if (artworkType === 'single' && image) {
        const imageUrl = urlFor(image).width(1200).url();
        return (
            <div className={`bg-white p-8 shadow-museum flex flex-col items-center justify-center min-h-[60vh] ${className}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="max-h-[80vh] w-auto object-contain"
                />
            </div>
        );
    }

    // Multi-panel artwork (diptych or triptych)
    if ((artworkType === 'diptych' || artworkType === 'triptych') && panels && panels.length > 0) {
        return (
            <div className={`bg-white p-8 shadow-museum ${className}`}>
                <div className={`grid ${artworkType === 'diptych' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-4 md:gap-6`}>
                    {panels.map((panel, index) => {
                        const panelUrl = urlFor(panel).width(800).url();
                        return (
                            <div key={index} className="flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={panelUrl}
                                    alt={`${title} - Panel ${index + 1}`}
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Fallback for missing data
    return (
        <div className={`bg-white p-8 shadow-museum flex items-center justify-center min-h-[60vh] ${className}`}>
            <p className="text-gray-400">No image available</p>
        </div>
    );
}
