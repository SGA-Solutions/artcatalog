'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ViewInRoomModalProps {
    imageUrl?: string;
    imageUrls?: string[];
}

export default function ViewInRoomModal({ imageUrl, imageUrls }: ViewInRoomModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Determine which images to display
    const images = imageUrls && imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];

    if (images.length === 0) return null;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 text-xs tracking-widest text-gray-500 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
            >
                VIEW IN ROOM
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsOpen(false)}>
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
                <X size={32} strokeWidth={1} />
            </button>

            {/* Room Simulation */}
            <div
                className="relative w-full max-w-5xl aspect-[16/9] bg-[#f5f5f5] shadow-2xl flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Wall Texture/Shadow */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#e5e5e5] border-t border-gray-300"></div>

                {/* Artwork(s) */}
                {images.length === 1 ? (
                    // Single panel artwork
                    <div className="relative shadow-2xl max-h-[50%] max-w-[50%] mb-[5%]">
                        <img src={images[0]} alt="View in Room" className="max-h-full max-w-full object-contain" />
                    </div>
                ) : (
                    // Multi-panel artwork (diptych or triptych)
                    <div className={`relative shadow-2xl max-h-[50%] ${images.length === 2 ? 'max-w-[60%]' : 'max-w-[70%]'} mb-[5%] flex gap-2`}>
                        {images.map((url, index) => (
                            <div key={index} className="flex-1">
                                <img
                                    src={url}
                                    alt={`Panel ${index + 1}`}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
