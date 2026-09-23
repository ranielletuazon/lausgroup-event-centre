import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/LGEC-light.png";

// Components
import NavigateLoader from "./NavigateLoader";

interface NavItem {
    label: string;
    path: string;
    external?: boolean;
}

export default function Footer() {
    const navigate = useNavigate();

    const navItems: NavItem[] = [
        { label: "HOME", path: "/" },
        { label: "ABOUT", path: "/about-us" },
        { label: "FACILITIES", path: "/facilities" },
        { label: "GALLERY", path: "/gallery" },
        { label: "NEWS AND EVENTS", path: "/news-and-events" },
        {
            label: "CAREERS",
            path: "https://careers.lausgroup.com.ph/",
            external: true,
        },
    ];

    const handleNav = (item: NavItem) => {
        if (item.external) {
            window.open(item.path, "_blank");
        } else {
            navigate(item.path);
        }
    };

    return (
        <footer className="w-full max-w-full bg-gray-800 flex flex-col items-center border-t-4 border-red-600">
            {/* Main Footer Content */}
            <div className="container flex flex-col md:flex-row items-start justify-between px-6 md:px-12 py-12 gap-10">
                {/* Logo + Tagline */}
                <div className="flex flex-col items-start gap-4 md:w-1/4 w-full">
                    <img
                        src={logo}
                        alt="LGEC Logo"
                        className="h-14 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                    <p className="text-white/80 text-xs leading-relaxed max-w-[200px]">
                        The premier event destination in Central Luzon,
                        Philippines.
                    </p>
                    {/* Socials */}
                    <div className="flex flex-row gap-3 mt-2">
                        <a
                            href="https://www.facebook.com/Lausgroupeventcentre"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors duration-200"
                        >
                            <FaFacebookF size={14} color="white" />
                        </a>
                        <a
                            href="https://www.instagram.com/lausgroupeventcentre/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] relative overflow-hidden transition-all duration-300 after:absolute after:inset-0 after:bg-black/0 hover:after:bg-black/15 flex items-center justify-center transition-colors duration-200"
                        >
                            <FaInstagram size={14} color="white" />
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=GjvgA6A4Oa4"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors duration-200"
                        >
                            <FaYoutube size={14} color="white" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-start gap-3 md:w-1/4 w-full">
                    <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase border-b border-red-600 pb-2 w-full">
                        Quick Links
                    </h3>
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                handleNav(item);
                            }}
                            className="text-white/80 text-xs hover:text-red-400 tracking-wider transition-colors duration-200 cursor-pointer text-left"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Contact */}
                <div className="flex flex-col items-start gap-3 md:w-1/4 w-full">
                    <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase border-b border-red-600 pb-2 w-full">
                        Contact Us
                    </h3>
                    <div className="flex flex-row items-start gap-3">
                        <Phone
                            size={14}
                            className="text-red-500 mt-0.5 flex-none"
                        />
                        <span className="text-white/80 text-xs leading-relaxed">
                            +63 998 959 2016
                        </span>
                    </div>
                    <div className="flex flex-row items-start gap-3">
                        <Mail
                            size={14}
                            className="text-red-500 mt-0.5 flex-none"
                        />
                        <span className="text-white/80 text-xs leading-relaxed">
                            info@lausgroupeventcentre.com
                        </span>
                    </div>
                    <div className="flex flex-row items-start gap-3">
                        <MapPin
                            size={14}
                            className="text-red-500 mt-0.5 flex-none"
                        />
                        <span className="text-white/80 text-xs leading-relaxed">
                            LGC Boulevard, LausGroup Complex,
                            <br />
                            Jose Abad Santos Avenue,
                            <br />
                            San Fernando, Philippines
                        </span>
                    </div>
                </div>

                {/* Book CTA */}
                <div className="flex flex-col items-start gap-3 md:w-1/4 w-full">
                    <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase border-b border-red-600 pb-2 w-full">
                        Book an Event
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                        Ready to host your next big event? Get in touch with us
                        today and let's make it happen.
                    </p>
                    <NavigateLoader
                        to="/book"
                        className="mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold tracking-widest px-6 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer border-none"
                    >
                        BOOK NOW
                    </NavigateLoader>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-white/10" />

            {/* Bottom Bar */}
            <div className="container flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 gap-2">
                <span className="text-white/60 text-xs tracking-wide">
                    © 2026 LausGroup Event Centre. All rights reserved.
                </span>
                {/* <div className="flex flex-row items-center gap-2 text-white/60 text-xs">
                    <button className="hover:text-red-400 transition-colors duration-200 cursor-pointer">
                        Data Privacy Notice
                    </button>
                    <span className="text-gray-600">|</span>
                    <button className="hover:text-red-400 transition-colors duration-200 cursor-pointer">
                        Terms and Conditions
                    </button>
                    <span className="text-gray-600">|</span>
                    <button className="hover:text-red-400 transition-colors duration-200 cursor-pointer">
                        FAQ's
                    </button>
                </div> */}
            </div>
        </footer>
    );
}
