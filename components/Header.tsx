'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm transition-all duration-300">
            <div className="mx-auto max-w-[1800px] px-6 py-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-light tracking-wide hover:opacity-70 transition-opacity">
                    ART CATALOG
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/exhibitions" className="text-sm font-light tracking-widest hover:text-accent transition-colors">
                        EXHIBITIONS
                    </Link>
                    <Link href="/artists" className="text-sm font-light tracking-widest hover:text-accent transition-colors">
                        ARTISTS
                    </Link>
                    <Link href="/artworks" className="text-sm font-light tracking-widest hover:text-accent transition-colors">
                        ARTWORKS
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover:opacity-70 transition-opacity"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-0.5 bg-foreground mb-1.5 transition-transform duration-300"
                        style={{ transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}></div>
                    <div className="w-6 h-0.5 bg-foreground transition-opacity duration-300"
                        style={{ opacity: mobileMenuOpen ? 0 : 1 }}></div>
                    <div className="w-6 h-0.5 bg-foreground mt-1.5 transition-transform duration-300"
                        style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-gray-100">
                    <nav className="mx-auto max-w-[1800px] px-6 py-6 flex flex-col gap-6">
                        <Link
                            href="/exhibitions"
                            className="text-sm font-light tracking-widest hover:text-accent transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            EXHIBITIONS
                        </Link>
                        <Link
                            href="/artists"
                            className="text-sm font-light tracking-widest hover:text-accent transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ARTISTS
                        </Link>
                        <Link
                            href="/artworks"
                            className="text-sm font-light tracking-widest hover:text-accent transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ARTWORKS
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
