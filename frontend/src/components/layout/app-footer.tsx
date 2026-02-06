import { Link } from "react-router";

export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background pt-4 mt-auto flex items-center justify-center md:pb-20 lg:pb-2">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                {/* Left Side: Brand & Copyright */}
                <div className="flex flex-col items-center gap-2 md:items-start md:gap-0">
                    <p className="text-sm font-medium leading-none">Opus App</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        &copy; {currentYear} Opus Inc. All rights reserved.
                    </p>
                </div>

                {/* Center: Legal/Nav Links */}
                <nav className="flex gap-4 text-sm font-medium text-muted-foreground">
                    <Link
                        to="/about"
                        className="hover:text-foreground transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        to="/sitemap"
                        className="hover:text-foreground transition-colors"
                    >
                        Sitemap
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-foreground transition-colors"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
