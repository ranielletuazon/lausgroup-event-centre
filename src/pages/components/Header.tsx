// Assets
import logo from "../../assets/lgec.png";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
    label: string;
    path: string;
    external?: boolean;
}

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

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

    const isActive = (item: NavItem) => {
        if (item.external) return false;
        if (item.path === "/") return location.pathname === "/";
        return location.pathname.startsWith(item.path);
    };

    return (
        <header className="w-full max-w-full bg-white shadow-md sticky top-0 z-50 border-b-2 border-red-600">
            <div className="container flex flex-row items-center justify-between lg:px-12 lg:py-3 px-4 py-2 mx-auto">
                {/* Logo */}
                <img
                    src={logo}
                    alt="Company Logo"
                    className="h-12 lg:h-16 flex-none cursor-pointer"
                    onClick={() => navigate("/")}
                />

                {/* Desktop Nav */}
                <nav className="hidden lg:flex flex-row items-center gap-4">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNav(item)}
                            className={`text-sm font-semibold tracking-widest cursor-pointer transition-colors duration-200 relative group ${
                                isActive(item)
                                    ? "text-red-600"
                                    : "text-gray-800 hover:text-red-600"
                            }`}
                        >
                            {item.label}
                            <span
                                className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-300 ${
                                    isActive(item)
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                            />
                        </button>
                    ))}
                </nav>

                {/* Book Button - Desktop */}
                <button
                    onClick={() => navigate("/book")}
                    className="hidden lg:block flex-none px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold tracking-widest cursor-pointer rounded-sm transition-colors duration-200"
                >
                    BOOK
                </button>

                {/* Hamburger - Mobile */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    ></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`lg:hidden absolute left-0 w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <nav className="flex flex-col px-4 py-2">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                handleNav(item);
                                setMenuOpen(false);
                            }}
                            className={`text-sm font-semibold tracking-widest cursor-pointer transition-colors duration-200 py-3 text-left border-b border-gray-100 last:border-none hover:bg-gray-50 ${
                                isActive(item)
                                    ? "text-red-600"
                                    : "text-gray-800 hover:text-red-600"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            navigate("/book");
                            setMenuOpen(false);
                        }}
                        className="mt-3 mb-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold tracking-widest cursor-pointer rounded-sm transition-colors duration-200"
                    >
                        BOOK
                    </button>
                </nav>
            </div>
        </header>
    );
}
