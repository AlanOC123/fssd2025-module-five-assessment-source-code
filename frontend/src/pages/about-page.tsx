import { Zap, Shield, Smile } from "lucide-react";

export function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-16 py-8 px-8 lg:px-0">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    We help you get work done.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Opus is built for teams who want to focus on shipping, not
                    managing complex software.
                </p>
            </section>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Our Mission
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We started Opus with a simple goal: to strip away the
                        clutter of modern project management. We believe that
                        tools should get out of the way and let you focus on the
                        work that matters.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Whether you are a solo freelancer or a growing team,
                        Opus gives you the structure you need without the bloat
                        you hate.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Why Opus?
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        The core values that drive our product decisions.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="p-6 border rounded-xl bg-card space-y-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg">Lightning Fast</h3>
                        <p className="text-sm text-muted-foreground">
                            Speed is a feature. We optimize every interaction to
                            ensure you never lose your flow state waiting for a
                            page to load.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="p-6 border rounded-xl bg-card space-y-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg">Privacy First</h3>
                        <p className="text-sm text-muted-foreground">
                            Your data is yours. We don't sell it, and we design
                            our systems with security as a priority from day
                            one.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-6 border rounded-xl bg-card space-y-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Smile className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg">Human Centric</h3>
                        <p className="text-sm text-muted-foreground">
                            We build for people, not robots. Our interface is
                            designed to be intuitive, accessible, and delightful
                            to use.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
