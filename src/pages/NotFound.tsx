import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center bg-gray-100 w-full min-h-[70vh] px-6">
                <div className="flex flex-col items-center text-center gap-4 max-w-md">
                    <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
                        Error
                    </span>
                    <h1 className="text-gray-900 text-7xl md:text-9xl font-bold m-0 leading-none">
                        4<span className="text-red-500">0</span>4
                    </h1>
                    <div className="w-12 h-1 bg-red-600 rounded-full" />
                    <h2 className="text-gray-700 text-lg md:text-xl font-bold m-0">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed m-0">
                        The page you're looking for doesn't exist or may have
                        been moved.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
