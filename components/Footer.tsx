'use client'

export default function Footer() {
    return (
        <footer className="bg-light-gray py-8 mt-12">
            <div className="mx-auto max-w-[1800px] px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-lg font-light tracking-wide mb-2">ART CATALOG</h3>
                    <p className="text-sm text-gray-500 font-light">Curating the finest minimalist art.</p>
                </div>

                <div className="flex gap-8 text-sm font-light text-gray-600">
                    <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
                    <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                </div>
            </div>
            <div className="mx-auto max-w-[1800px] px-6 mt-6 text-xs text-gray-400 font-light" suppressHydrationWarning>
                © {new Date().getFullYear()} Art Catalog. All rights reserved.
            </div>
        </footer>
    )
}
