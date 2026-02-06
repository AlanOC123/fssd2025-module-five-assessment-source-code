import { Mail, MapPin, MessageSquare, Clock } from "lucide-react";

export function ContactPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Get in touch
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a question or run into a bug? We're here to help.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left Column: Contact Info (Placeholder Generic Contact Information)*/}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">
                            Contact Support
                        </h2>
                        <p className="text-muted-foreground">
                            Fill out the form and our team will get back to you
                            within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-sm text-muted-foreground">
                                    opus.app.service@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Office</h3>
                                <p className="text-sm text-muted-foreground">
                                    Grand Canal Dock
                                    <br />
                                    Dublin 2, Ireland
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Hours</h3>
                                <p className="text-sm text-muted-foreground">
                                    Mon-Fri: 9am - 5pm GMT
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Link / Extra Help (Phase 2 Paid Members) */}
                    <div className="p-6 bg-muted/30 rounded-xl border border-dashed">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-semibold text-sm">
                                Live Chat
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Available for Pro users directly inside the
                            application dashboard.
                        </p>
                    </div>
                </div>

                {/* Right Column: Contact Form (Phase 2 Would have built this out on the backend with more time) */}
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                    <form
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="first-name"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    First name
                                </label>
                                <input
                                    id="first-name"
                                    placeholder="Jane"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="last-name"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Last name
                                </label>
                                <input
                                    id="last-name"
                                    placeholder="Doe"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="jane@example.com"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                            type="submit"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
