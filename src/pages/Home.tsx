import Header from "./components/Header";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

// SEO
import SEO from "./components/SEO";

// Images
import wedding from "../assets/wedding.jpg";
import debut from "../assets/debut.jpg";
import concert from "../assets/concert.jpg";
import corporate from "../assets/corporate.jpg";
import pageant from "../assets/pageants.jpg";
import graduation from "../assets/graduation.jpg";

// 5 Types
// import hallAB from "../assets/hall-a-and-b.jpg";
import vipSuite from "../assets/lgec-vip-suite.jpg";
import lounge from "../assets/lounge.jpg";
import stage from "../assets/stage.jpg";
import coveredFoyer from "../assets/covered-foyer.jpg";

import { getPublishedPosts } from "../data/posts";

// Interfaces
interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    category: string;
    published_at: string;
    created_at: string;
    cover_image: string | null;
}

export default function Home() {
    const navigate = useNavigate();
    const [latestPosts, setLatestPosts] = useState<Post[]>([]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Fetch post on load
    useEffect(() => {
        const latest = getPublishedPosts().slice(0, 2);
        setLatestPosts(latest);
    }, []);

    return (
        <>
            <SEO
                title="LausGroup Event Centre | San Fernando, Pampanga"
                description="The premier world-class event destination in Central Luzon. Host weddings, concerts, corporate events and more."
                url="https://lausgroupeventcentre.com"
            />
            <Header />
            <div className="flex flex-col items-center justify-center bg-gray-100 md:pt-8 w-full">
                {/* Global Container */}
                <div className="container flex flex-col items-center justify-center">
                    {/* Section 1 */}
                    <section className="group relative container w-full bg-[url('./assets/hero.jpg')] aspect-video bg-center bg-cover max-h-[600px] md:min-h-[550px] md:shadow-xl md:rounded-lg md:mb-16 mb-8 flex md:flex-row flex-col items-center justify-center md:gap-10 gap-5 md:p-8 p-4 mx-4">
                        {/* Dark Overlay - fades in deeper on hover */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 md:rounded-lg" />

                        {/* Left Content - hidden until hover */}
                        <div className="container relative z-10 flex flex-col items-start justify-center gap-3 md:-translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-500">
                            {/* Location Badge */}
                            <span className="hidden lg:inline-flex items-center border border-white/60 bg-white/10 backdrop-blur-sm px-4 py-1 gap-2 rounded-full text-white text-xs md:text-sm font-semibold tracking-wide shadow-md">
                                <MapPin size={14} color="white" />
                                LGC Boulevard LausGroup Complex Jose Abad Santos
                                Avenue
                            </span>

                            {/* Headline */}
                            <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg m-0">
                                World Class <br />
                                <span className="text-red-400">
                                    Event Centre
                                </span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-white/90 text-xs md:text-sm leading-relaxed m-0 max-w-sm">
                                The perfect venue for your next big event is
                                here.
                            </p>

                            {/* Buttons */}
                            <div className="flex md:flex-row flex-col items-start justify-start md:gap-8 gap-2 mt-1">
                                <button
                                    onClick={() => {
                                        navigate("/book");
                                    }}
                                    className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs md:text-sm font-bold tracking-widest px-5 py-2 rounded-sm transition-colors duration-200 cursor-pointer border-none"
                                >
                                    BOOK EVENT
                                </button>
                                {/* <button
                                    onClick={() => navigate('/book')}
                                    className="bg-white/10 hover:bg-white/20 active:bg-white/40 backdrop-blur-sm border border-white/60 text-white text-xs md:text-sm font-bold tracking-widest px-5 py-2 rounded-sm transition-colors duration-200 cursor-pointer"
                                >
                                    SUPPLIER INQUIRY
                                </button> */}
                            </div>
                        </div>

                        {/* Right Content - desktop only, slides in on hover */}
                        <div className="hidden md:flex container relative z-10 flex-col items-center justify-center gap-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex flex-col gap-3 w-full max-w-[220px]">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-5 py-3 flex flex-col items-start shadow-lg">
                                    <span className="text-white/70 text-xs tracking-widest uppercase">
                                        Capacity
                                    </span>
                                    <span className="text-white text-2xl font-bold">
                                        2,000
                                    </span>
                                    <span className="text-white/60 text-xs">
                                        Guests per Event
                                    </span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-5 py-3 flex flex-col items-start shadow-lg">
                                    <span className="text-white/70 text-xs tracking-widest uppercase">
                                        Events Held
                                    </span>
                                    <span className="text-white text-2xl font-bold">
                                        500+
                                    </span>
                                    <span className="text-white/60 text-xs">
                                        World-Class Events
                                    </span>
                                </div>
                                {/* <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-5 py-3 flex flex-col items-start">
                                    <span className="text-white/70 text-xs tracking-widest uppercase">Parking</span>
                                    <span className="text-white text-lg font-bold leading-tight">500+</span>
                                    <span className="text-white/60 text-xs">Cars</span>
                                </div> */}
                            </div>
                        </div>
                    </section>

                    {/* Section 1.5 - Venue Showcase */}
                    <section className="w-full md:mb-16 mb-8">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center gap-3 mb-8 px-4">
                            <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                The LausGroup{" "}
                                <span className="text-red-500">
                                    Event Center
                                </span>
                            </h2>
                            <div className="w-12 h-1 bg-red-600 rounded-full" />
                            <p className="text-black/60 text-sm md:text-base max-w-xl m-0">
                                Since its inauguration last June 8, 2016, the
                                LausGroup Event Centre hosted big events such as
                                the 25th Commemoration Anniversary of Mt.
                                Pinatubo’s Eruption, Pampanga Elected Officials’
                                Oath Taking Ceremonies, CarWorld Inc.’s 38th
                                Anniversary Concert with Richard Poon and
                                Nina,and most notably has been the chosen venue
                                to welcome some of the country’s valuable
                                political personalities, business leaders, and
                                well-acclaimed speakers including Francis Kong
                                and Josiah Go.
                            </p>
                        </div>

                        {/* Expanding Image Panels - Desktop */}
                        <div className="hidden md:flex flex-row w-full h-[420px] rounded-lg overflow-hidden shadow-xl gap-[3px]">
                            {[
                                // {
                                //     image: hallAB,
                                //     label: "Hall A & B",
                                //     sub: "Up to 2,500 guests",
                                // },
                                {
                                    image: vipSuite,
                                    label: "VIP Suite",
                                    sub: "2nd Level · Private",
                                },
                                {
                                    image: lounge,
                                    label: "Lounge",
                                    sub: "180 sqm · Reception",
                                },
                                {
                                    image: stage,
                                    label: "Stage",
                                    sub: "Full Production Support",
                                },
                                {
                                    image: coveredFoyer,
                                    label: "Covered Foyer",
                                    sub: "760 sqm · Outdoor",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative flex-1 hover:flex-[3] transition-all duration-500 ease-in-out overflow-hidden cursor-pointer"
                                    // onClick={() => navigate('/facilities')}
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/30 transition-all duration-500" />

                                    {/* Collapsed Label - vertical text */}
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase [writing-mode:vertical-lr] rotate-180 drop-shadow-lg">
                                            {item.label}
                                        </span>
                                    </div>

                                    {/* Expanded Content - slides up on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                                        {/* <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Facility</span> */}
                                        <h3 className="text-white text-xl font-bold leading-tight mt-1 mb-1">
                                            {item.label}
                                        </h3>
                                        {/* <p className="text-white/80 text-xs mb-3">{item.sub}</p> */}
                                        {/* <span className="inline-flex items-center gap-1 text-white text-xs font-bold tracking-widest uppercase border-b border-white/40 pb-0.5">
                                            VIEW DETAILS →
                                        </span> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile - 2 column grid */}
                        <div className="md:hidden grid grid-cols-2 gap-2 overflow-hidden md:px-0 px-4">
                            {[
                                // {
                                //     image: hallAB,
                                //     label: "Hall A & B",
                                //     sub: "Up to 2,500 guests",
                                // },
                                {
                                    image: vipSuite,
                                    label: "VIP Suite",
                                    sub: "2nd Level · Private",
                                },
                                {
                                    image: lounge,
                                    label: "Lounge",
                                    sub: "180 sqm · Reception",
                                },
                                {
                                    image: stage,
                                    label: "Stage",
                                    sub: "Full Production",
                                },
                                {
                                    image: coveredFoyer,
                                    label: "Covered Foyer",
                                    sub: "760 sqm · Outdoor",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate("/facilities")}
                                    className={`relative overflow-hidden cursor-pointer shadow-md ${index === 4 ? "col-span-2" : ""}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="w-full h-[140px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h3 className="text-white text-xs font-bold leading-tight m-0">
                                            {item.label}
                                        </h3>
                                        {/* <p className="text-white/60 text-xs m-0">{item.sub}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2 - Event Types */}
                    <section className="flex flex-col w-full md:mb-8 mb-4 gap-4">
                        {/* Row 1 - Wedding */}
                        <div className="flex md:flex-row flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={wedding}
                                    alt="Wedding at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Celebrations
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Your Dream <br />
                                    <span className="text-red-500">
                                        WEDDING
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    Say "I do" in a venue that matches the
                                    grandeur of your love story. From intimate
                                    ceremonies to grand receptions, we bring
                                    your perfect wedding to life with elegance
                                    and precision.
                                </p>
                            </div>
                        </div>

                        {/* Row 2 - Debut */}
                        <div className="flex md:flex-row-reverse flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={debut}
                                    alt="Debut at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Milestones
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    A Night to <br />
                                    <span className="text-red-500">
                                        REMEMBER
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    Celebrate her journey into womanhood in a
                                    breathtaking setting. Our team will craft
                                    every detail of her debut — from the grand
                                    entrance to the last waltz — into a truly
                                    magical evening.
                                </p>
                            </div>
                        </div>

                        {/* Row 3 - Concert */}
                        <div className="flex md:flex-row flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={concert}
                                    alt="Concert at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Entertainment
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Live the <br />
                                    <span className="text-red-500">
                                        CONCERT
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    A stage worthy of the spotlight. With a
                                    capacity of 2,000 guests, world-class
                                    acoustics, and full production support, LGEC
                                    is the ultimate concert destination in
                                    Central Luzon.
                                </p>
                            </div>
                        </div>

                        {/* Row 4 - Graduation */}
                        <div className="flex md:flex-row-reverse flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={graduation}
                                    alt="Graduation at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Achievement
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Honor Every <br />
                                    <span className="text-red-500">
                                        GRADUATE
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    Mark this milestone in a venue that reflects
                                    the magnitude of the achievement. Our
                                    expansive halls and seamless event
                                    management make every graduation ceremony
                                    one to be proud of.
                                </p>
                            </div>
                        </div>

                        {/* Row 5 - Pageants */}
                        <div className="flex md:flex-row flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={pageant}
                                    alt="Pageant at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Pageantry
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Crown the <br />
                                    <span className="text-red-500">FINEST</span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    A grand stage for grace, talent, and beauty.
                                    LGEC provides the perfect theatrical setting
                                    for pageants of any scale — complete with
                                    professional lighting, sound, and
                                    runway-ready spaces.
                                </p>
                            </div>
                        </div>

                        {/* Row 6 - Corporate Events */}
                        <div className="flex md:flex-row-reverse flex-col w-full rounded-lg overflow-hidden shadow-xl">
                            <div className="md:w-1/2 w-full overflow-hidden">
                                <img
                                    src={corporate}
                                    alt="Corporate Event at LGEC"
                                    className="w-full h-[200px] md:h-[420px] object-cover md:hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 w-full bg-white flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Corporate
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Elevate Your <br />
                                    <span className="text-red-500">
                                        BUSINESS
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    From product launches to annual general
                                    meetings, our world-class facilities and
                                    dedicated support team ensure your corporate
                                    event runs flawlessly — leaving a lasting
                                    impression on every attendee.
                                </p>
                                {/* <button className="mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold tracking-widest px-6 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer border-none">
                                    LEARN MORE
                                </button> */}
                            </div>
                        </div>
                    </section>

                    {/* Section 3 - News Showcase */}
                    <section className="flex flex-col w-full md:mb-8 mb-4 gap-4">
                        <div className="flex md:flex-row flex-col w-full overflow-hidden">
                            {/* Left - Title */}
                            <div className="md:w-1/2 w-full flex flex-col items-start justify-center px-8 md:px-14 py-10 gap-4">
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Stay Updated
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight m-0">
                                    Latest <br />
                                    <span className="text-red-500">
                                        News & Events
                                    </span>
                                </h2>
                                <p className="text-black/80 text-sm md:text-base leading-relaxed m-0 max-w-sm">
                                    Keep up with the latest happenings and
                                    expert advice on how to make your next event
                                    truly unforgettable.
                                </p>
                                <button
                                    onClick={() => navigate("/news-and-events")}
                                    className="mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold tracking-widest px-6 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer border-none"
                                >
                                    VIEW ALL NEWS
                                </button>
                            </div>

                            {/* Right - News Cards */}
                            <div className="md:w-1/2 w-full flex flex-col gap-0 divide-y divide-gray-100">
                                {latestPosts.length > 0
                                    ? latestPosts.map((post) => (
                                          <div
                                              key={post.id}
                                              onClick={() =>
                                                  navigate(
                                                      `/news-and-events/${post.slug}`,
                                                  )
                                              }
                                              className="group flex flex-row gap-4 p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                          >
                                              {/* Image */}
                                              <div className="flex-none w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-200">
                                                  {post.cover_image ? (
                                                      <img
                                                          src={post.cover_image}
                                                          alt={post.title}
                                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                      />
                                                  ) : (
                                                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                          <span className="text-gray-400 text-xs text-center">
                                                              No Image
                                                          </span>
                                                      </div>
                                                  )}
                                              </div>

                                              {/* Content */}
                                              <div className="flex flex-col justify-center gap-2 flex-1">
                                                  <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
                                                      {post.category}
                                                  </span>
                                                  <h3 className="text-gray-900 text-sm md:text-base font-bold leading-snug m-0 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                                                      {post.title}
                                                  </h3>
                                                  <p className="text-black/80 text-xs leading-relaxed m-0 line-clamp-2">
                                                      {post.excerpt ||
                                                          post.description}
                                                  </p>
                                                  <span className="flex items-center gap-1 text-black/50 text-xs">
                                                      {/* <Calendar size={10} /> */}
                                                      {formatDate(
                                                          post.published_at ||
                                                              post.created_at,
                                                      )}
                                                  </span>
                                              </div>
                                          </div>
                                      ))
                                    : // Skeleton placeholders while loading
                                      [1, 2].map((i) => (
                                          <div
                                              key={i}
                                              className="flex flex-row gap-4 p-6"
                                          >
                                              <div className="flex-none w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gray-300 animate-pulse" />
                                              <div className="flex flex-col justify-center gap-2 flex-1">
                                                  <div className="h-3 bg-gray-300 rounded animate-pulse w-1/4" />
                                                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
                                                  <div className="h-3 bg-gray-300 rounded animate-pulse w-full" />
                                                  <div className="h-3 bg-gray-300 rounded animate-pulse w-1/3" />
                                              </div>
                                          </div>
                                      ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
