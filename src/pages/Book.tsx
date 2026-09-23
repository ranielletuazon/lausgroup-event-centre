import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRef, useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
import logo from "../assets/lgec.png";

// SEO
import SEO from "./components/SEO";

export default function Book() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        try {
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
                const height = iframe.contentWindow.document.body.scrollHeight;
                iframe.style.height = height + "px";
            }
        } catch {
            // Cross-origin fallback
        }
        setIframeLoaded(true);
    };

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data?.iframeHeight && iframeRef.current) {
                iframeRef.current.style.height = e.data.iframeHeight + "px";
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <>
            <SEO
                title="Contact Us"
                description="Ready to book an event? If you have questions for us feel free to ask. | Book your next event or send an inquiry to LausGroup Event Centre. Weddings, corporate events, concerts and more."
                url="https://lausgroupeventcentre.com/book"
            />
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/hero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            Contact <span className="text-red-400">Us</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-md m-0">
                            Ready to book an event? If you have questions for us
                            feel free to ask.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-8">
                    <div className="w-full flex md:flex-row flex-col gap-10">
                        {/* Left - Info */}
                        <div className="md:w-1/3 w-full flex flex-col gap-6">
                            <div>
                                <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                                    Get In Touch
                                </span>
                                <h2 className="text-gray-900 text-2xl md:text-3xl font-bold leading-tight mt-2 mb-0">
                                    We'd Love to <br />
                                    <span className="text-red-500">
                                        Hear From You
                                    </span>
                                </h2>
                                <div className="w-10 h-1 bg-red-600 rounded-full mt-4" />
                            </div>
                            <p className="text-black/80 text-sm leading-relaxed m-0">
                                Whether you're planning a wedding, corporate
                                event, concert, or any special occasion — our
                                team is ready to help you make it extraordinary.
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="bg-white rounded-lg px-5 py-4 shadow-sm border-l-4 border-red-600">
                                    <span className="text-black/70 text-xs tracking-widest uppercase">
                                        Phone
                                    </span>
                                    <p className="text-gray-800 text-sm font-semibold m-0 mt-1">
                                        +63 998 959 2016
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg px-5 py-4 shadow-sm border-l-4 border-red-600">
                                    <span className="text-black/70 text-xs tracking-widest uppercase">
                                        Email
                                    </span>
                                    <p className="text-gray-800 text-sm font-semibold m-0 mt-1 break-all">
                                        info@lausgroupeventcentre.com
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg px-5 py-4 shadow-sm border-l-4 border-red-600">
                                    <span className="text-black/70 text-xs tracking-widest uppercase">
                                        Address
                                    </span>
                                    <p className="text-gray-800 text-sm font-semibold m-0 mt-1">
                                        LGC Boulevard, LausGroup Complex, Jose
                                        Abad Santos Avenue, San Fernando,
                                        Philippines
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right - iFrame */}
                        <div className="md:w-2/3 w-full bg-white rounded-lg shadow-md border-t-4 border-red-600 overflow-hidden relative">
                            {/* Loading Overlay */}
                            <div
                                className={`absolute inset-0 bg-white z-10 flex flex-col items-center justify-center gap-6 pointer-events-none ${iframeLoaded ? "opacity-0 transition-opacity duration-500" : "opacity-100"}`}
                            >
                                {/* Glow */}
                                <div className="absolute w-40 h-40 rounded-full bg-red-100/70 blur-2xl" />

                                {/* Logo + Spinner */}
                                <div className="relative flex flex-col items-center gap-5">
                                    <img
                                        src={logo}
                                        alt="LGEC Logo"
                                        className="w-24 opacity-90"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        {/* <Loader2
                                            size={20}
                                            className="text-red-500 animate-spin"
                                        /> */}
                                        <span className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase">
                                            Loading Form...
                                        </span>
                                    </div>

                                    {/* Animated bar */}
                                    {/* <div className="w-32 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 rounded-full animate-loading-bar" />
                                    </div> */}
                                </div>
                            </div>

                            {/* iFrame */}
                            <iframe
                                ref={iframeRef}
                                src="https://crm.lausgroup.com.ph/lgec/ContactUs/index.php"
                                title="LGEC Contact Form"
                                className={`w-full border-none transition-opacity duration-500 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                                style={{ minHeight: "900px" }}
                                scrolling="no"
                                onLoad={handleIframeLoad}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
