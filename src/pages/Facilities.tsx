import Header from "./components/Header";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

import { Phone } from "lucide-react";

// Images
// import hallAB from "../assets/hall-a-and-b.jpg";
import coveredFoyer from "../assets/covered-foyer.jpg";
import lounge from "../assets/lounge.jpg";
import grounds from "../assets/lausgroup-grounds.jpg";
import vipSuite from "../assets/lgec-vip-suite.jpg";

// SEO
import SEO from "./components/SEO";

export default function Facilities() {
    const navigate = useNavigate();

    const facilities = [
        // {
        //     name: "Hall A and B",
        //     tag: "Grand Halls",
        //     image: hallAB,
        //     description:
        //         "The two large halls can be converted and merged into one main venue suitable for trade exhibits, concerts, conferences and conventions. Designed to accommodate up to 2,000 guests with a comfortable fusion of modern and classic elegance.",
        //     details: [
        //         { label: "Capacity", value: "2,000 Guests" },
        //         { label: "Area", value: "Main Halls" },
        //     ],
        // },
        {
            name: "Covered Foyer",
            tag: "Outdoor Space",
            image: coveredFoyer,
            description:
                "The Covered Foyer has a total area of 760 square meters. This outdoor space has a lot of flexibility in terms of layout. Ideal for creative installations and large showcase exhibits, the Promenade is located in front of the event venue.",
            details: [
                { label: "Total Area", value: "760 sqm" },
                { label: "Type", value: "Outdoor" },
            ],
        },
        {
            name: "Lounge",
            tag: "Reception Area",
            image: lounge,
            description:
                "Adjacent to the Covered Foyer is the remarkable 180 square meter lounge which exudes an inviting and welcoming atmosphere. This welcome reception area can serve as registration, photo booth, or cocktail area before guests proceed to the event proper.",
            details: [
                { label: "Total Area", value: "180 sqm" },
                { label: "Type", value: "Indoor" },
            ],
        },
        {
            name: "LausGroup Grounds",
            tag: "Outdoor Grounds",
            image: grounds,
            description:
                "From a formal set-up for private events and conferences, the Grounds is the home of various car shows and auto-related activities. With wide vacant space in front of the event venue lies a green and huge area ideal for off-road tracks, test drive challenges, concerts, music bands, night parties, fun runs and more.",
            details: [
                { label: "Type", value: "Outdoor" },
                { label: "Use", value: "Multi-Purpose" },
            ],
        },
        {
            name: "LGEC VIP Suite",
            tag: "Exclusive",
            image: vipSuite,
            description:
                "The VIP Suite is the newest event space at the LausGroup Event Centre which provides an ideal venue for private functions. Located at the 2nd level and fully-equipped with amenities, it is perfect for intimate gatherings and exclusive events.",
            details: [
                { label: "Level", value: "2nd Floor" },
                { label: "Type", value: "Private" },
            ],
        },
    ];

    return (
        <>
            <SEO
                title="Facilities"
                description="Explore world-class event spaces at LGEC — Hall A & B, Covered Foyer, Lounge, VIP Suite, and LausGroup Grounds. | World-class event spaces designed to bring your vision to life and purpose."
                url="https://lausgroupeventcentre.com/facilities"
            />
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/abouthero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            Our <span className="text-red-400">Facilities</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-lg m-0">
                            World-class event spaces designed to bring your
                            vision to life and purpose.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-16">
                    {/* Intro Section */}
                    <section className="w-full flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
                        <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                            Multi-Purpose Event Facility
                        </span>
                        <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                            A Venue Built for{" "}
                            <span className="text-red-500">Every Occasion</span>
                        </h2>
                        <div className="w-12 h-1 bg-red-600 rounded-full" />
                        <p className="text-black/80 text-sm md:text-base leading-relaxed m-0">
                            The LausGroup Event Center has two grand halls
                            featuring a large open floor area that can be
                            converted into sections to suit your specific needs
                            — offering admirable elegance and style that will
                            surely add prestige to your ideal celebration. It
                            also has an outdoor exhibit area with ample parking.
                        </p>
                        <p className="text-black/80 text-sm md:text-base leading-relaxed m-0">
                            The multi-purpose hall is designed with a
                            comfortable fusion of modern and classic grand halls
                            that will satisfy your sophisticated social
                            requirements. Thoroughly designed to accommodate
                            2,000 guests — perfectly intended for large crowds
                            and impressively suitable to provide a warm and
                            home-like setting.
                        </p>
                    </section>

                    {/* Facilities List */}
                    <section className="w-full flex flex-col gap-6">
                        <h2 className="text-gray-900 text-xl md:text-2xl font-bold m-0 text-center tracking-wide">
                            Explore The{" "}
                            <span className="text-red-500">Places</span>
                        </h2>

                        {facilities.map((facility, index) => (
                            <div
                                key={facility.name}
                                className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col w-full rounded-lg overflow-hidden shadow-xl bg-white`}
                            >
                                {/* Image */}
                                <div className="md:w-1/2 w-full overflow-hidden">
                                    <img
                                        src={facility.image}
                                        alt={facility.name}
                                        className="w-full h-[250px] md:h-[380px] object-cover md:hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="md:w-1/2 w-full flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                    <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                        {facility.tag}
                                    </span>
                                    <h3 className="text-gray-900 text-xl md:text-3xl font-bold leading-tight m-0">
                                        {facility.name}
                                    </h3>
                                    <div className="w-10 h-1 bg-red-600 rounded-full" />
                                    <p className="text-black/80 text-sm md:text-base leading-relaxed m-0">
                                        {facility.description}
                                    </p>

                                    {/* Detail Pills */}
                                    <div className="flex flex-row gap-2 flex-wrap mt-1">
                                        {facility.details.map((detail) => (
                                            <div
                                                key={detail.label}
                                                className="flex flex-col bg-gray-200 px-4 py-2"
                                            >
                                                <span className="text-gray-400 text-xs tracking-widest uppercase">
                                                    {detail.label}
                                                </span>
                                                <span className="text-gray-800 text-sm font-bold">
                                                    {detail.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Booking Procedure + Packages */}
                    <section className="w-full flex md:flex-row flex-col gap-6">
                        {/* Booking Procedure */}
                        <div className="md:w-1/2 w-full bg-white rounded-lg shadow-md px-8 py-10 flex flex-col gap-4 border-t-4 border-red-600">
                            <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                How to Book
                            </span>
                            <h3 className="text-gray-900 text-xl md:text-2xl font-bold m-0">
                                Booking Procedure
                            </h3>
                            <div className="w-10 h-1 bg-red-600 rounded-full" />
                            <p className="text-black/80 text-sm leading-relaxed m-0">
                                Requests to schedule events at LGEC should be
                                made at least{" "}
                                <strong>three months in advance</strong> of the
                                event date. A completed facility request/policy
                                form must be submitted with a signed document
                                before space will be reserved.
                            </p>
                            <p className="text-black/80 text-sm leading-relaxed m-0">
                                This must be received by the LausGroup Event
                                Centre office within three months of submitting
                                your reservation or the space will be released.
                                Please consult an in-house coordinator in
                                advance to facilitate the planning of your
                                event.
                            </p>
                            {/* <button
                                onClick={() => navigate('/book')}
                                className="mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold tracking-widest px-6 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer border-none w-fit"
                            >
                                BOOK NOW
                            </button> */}
                        </div>

                        {/* Packages */}
                        <div className="md:w-1/2 w-full bg-gray-900 rounded-lg shadow-md px-8 py-10 flex flex-col gap-4 border-t-4 border-red-600">
                            <span className="text-red-400 text-xs font-bold tracking-[0.3em] uppercase">
                                What We Offer
                            </span>
                            <h3 className="text-white text-xl md:text-2xl font-bold m-0">
                                Packages & Rates
                            </h3>
                            <div className="w-10 h-1 bg-red-600 rounded-full" />
                            <p className="text-white text-sm leading-relaxed m-0">
                                We are here to extend a helping hand. The
                                LausGroup Event Center offers an all-inclusive
                                venue for your next event. Our experienced event
                                coordinators will take care of everything, so
                                you can just enjoy and focus on your guests.
                            </p>
                            <div className="flex flex-row items-center gap-3 mt-2">
                                <Phone
                                    size={14}
                                    className="text-red-400 flex-none"
                                />
                                <span className="text-white text-xs">
                                    +63 998 959 2016
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/book");
                                }}
                                className="mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold tracking-widest px-6 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer border-none w-fit"
                            >
                                INQUIRE NOW
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
}
