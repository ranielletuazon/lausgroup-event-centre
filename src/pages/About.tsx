import Header from "./components/Header";
import Footer from "./components/Footer";

// SEO
import SEO from "./components/SEO";

export default function About() {
    return (
        <>
            <SEO
                title="About Us"
                description="The LausGroup Event Centre is a new and distinctive modern venue located right at the heart of Metro Central Luzon – in the City of San Fernando Pampanga, also known as the gateway of the north. Situated 68 kilometers from Manila, the City of San Fernando is recognized as a culinary destination and a progressive capital of Pampanga."
                url="https://lausgroupeventcentre.com/about-us"
            />
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/abouthero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            About <span className="text-red-400">Us</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-md m-0">
                            Discover the story behind Central Luzon's premier
                            event destination.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-16">
                    {/* Section 1 - About + Video */}
                    <section className="w-full flex md:flex-row flex-col items-start justify-center gap-10">
                        {/* Left - Text */}
                        <div className="md:w-1/2 w-full flex flex-col gap-4">
                            <h2 className="text-gray-900 text-2xl md:text-3xl font-bold leading-tight m-0">
                                About The LausGroup <br />
                                <span className="text-red-500">
                                    Event Centre
                                </span>
                            </h2>
                            <div className="w-12 h-1 bg-red-600 rounded-full" />
                            <p className="text-black/80 text-sm md:text-base leading-relaxed text-justify m-0">
                                The LausGroup Event Centre is a new and
                                distinctive modern venue located right at the
                                heart of Metro Central Luzon – in the City of
                                San Fernando Pampanga, also known as the gateway
                                of the north. Situated 68 kilometers from
                                Manila, the City of San Fernando is recognized
                                as a culinary destination and a progressive
                                capital of Pampanga.
                            </p>
                            <p className="text-black/80 text-sm md:text-base leading-relaxed text-justify m-0">
                                Dubbed as one of the countryside's newest icons
                                of progress and evolution, the LausGroup Event
                                Centre features timeless luxury and
                                state-of-the-art facilities. It also proves to
                                be a premiere landmark to highlight significant
                                milestones and special occasions. The grand
                                halls are perfectly suited for a large audience
                                with an impressive design for all types of
                                events.
                            </p>
                            <p className="text-black/80 text-sm md:text-base leading-relaxed text-justify m-0">
                                The LausGroup Event Centre is the main venue for
                                the LausGroup of Companies' product launchings
                                and multi-brand auto dealerships. It will
                                showcase distinct car displays and new models.
                                The grand halls will be the home of various
                                LausGroup employee-related activities which aim
                                to foster unity and fellowship such as sales
                                conventions, sporting events and other
                                recreational projects.
                            </p>
                            <p className="text-black/80 text-sm md:text-base leading-relaxed text-justify m-0">
                                As an institution borne out of the LausGroup of
                                Companies' philosophy of providing total
                                customer care, we are committed to continue our
                                life-long tradition of delivering the highest
                                quality service for your various functions.
                            </p>
                        </div>

                        {/* Right - Video */}
                        <div className="md:w-1/2 w-full flex flex-col gap-4">
                            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-900">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/GjvgA6A4Oa4"
                                    title="LausGroup Event Centre"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <p className="text-gray-400 text-xs text-center tracking-wide">
                                Take a virtual tour of the LausGroup Event
                                Centre
                            </p>
                        </div>
                    </section>

                    {/* Section 2 - Stats */}
                    <section className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 align-center justify-center">
                        {[
                            {
                                label: "Capacity",
                                value: "2,000",
                                sub: "Guests per Event",
                            },
                            {
                                label: "Events Held",
                                value: "500+",
                                sub: "World-Class Events",
                            },
                            {
                                label: "Est.",
                                value: "2015",
                                sub: "Years of Excellence",
                            },
                            // { label: 'From Manila', value: '68km', sub: 'Gateway of the North' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white rounded-lg shadow-xl px-6 py-8 flex flex-col items-start gap-1 border-b-4 border-red-600"
                            >
                                <span className="text-black/80 text-xs font-bold tracking-[0.2em] uppercase">
                                    {stat.label}
                                </span>
                                <span className="text-gray-900 text-3xl md:text-4xl font-bold">
                                    {stat.value}
                                </span>
                                <span className="text-black/80 text-xs">
                                    {stat.sub}
                                </span>
                            </div>
                        ))}
                    </section>

                    {/* Section 3 - IFrame Section */}
                    <section className="w-full flex flex-row items-center justify-center bg-gray-200 rounded-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7706.007267131934!2d120.67855749357913!3d15.0479153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f76ad3222415%3A0xfdcd3074422f96ca!2sLausGroup%20Event%20Centre!5e0!3m2!1sen!2sus!4v1779667547001!5m2!1sen!2sus"
                            loading="lazy"
                            className="w-250 aspect-video"
                        ></iframe>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
}
