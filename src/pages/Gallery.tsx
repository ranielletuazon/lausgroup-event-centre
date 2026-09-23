import Header from "./components/Header";
import Footer from "./components/Footer";
import { ZoomIn, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
    getPublishedPosts,
    standaloneImages,
    type PostImage,
    type StandaloneImage,
} from "../data/posts";
import SEO from "./components/SEO";

const categoryMap: Record<string, string> = {
    weddings: "Weddings",
    debut: "Debuts",
    birthdays: "Birthdays",
    concerts: "Concerts",
    graduations: "Graduations",
    corporate: "Corporate",
    seminar: "Seminar",
    spiritual: "Spiritual",
    pageants: "Pageants",
    sports: "Sports",
    others: "Others",
};

const LIMIT = 12;

// Unified gallery item — either from a post or standalone
interface GalleryItem {
    image: PostImage | StandaloneImage;
    category: string;
    date: string;
    title: string;
}

function Lightbox({
    images,
    startIndex,
    title,
    onClose,
}: {
    images: (PostImage | StandaloneImage)[];
    startIndex: number;
    title: string;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(startIndex);

    const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/10 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200 cursor-pointer border-none z-10"
            >
                <X size={20} />
            </button>

            <div className="absolute top-4 left-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {current + 1} / {images.length}
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-xs font-semibold tracking-widest uppercase z-10 hidden md:block">
                {title}
            </div>

            <div
                className="relative flex items-center justify-center w-full h-full px-16"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    key={current}
                    src={images[current].image_url}
                    alt={`${title} - ${current + 1}`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />

                {images.length > 1 && (
                    <button
                        onClick={prev}
                        className="absolute left-4 bg-black/50 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 cursor-pointer border-none"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {images.length > 1 && (
                    <button
                        onClick={next}
                        className="absolute right-4 bg-black/50 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 cursor-pointer border-none"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default function Gallery() {
    const [allImages, setAllImages] = useState<GalleryItem[]>([]);
    const [displayedImages, setDisplayedImages] = useState<GalleryItem[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [availableCategories, setAvailableCategories] = useState<string[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [lightbox, setLightbox] = useState<{
        images: (PostImage | StandaloneImage)[];
        startIndex: number;
        title: string;
    } | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const posts = getPublishedPosts();

            // From posts
            const fromPosts: GalleryItem[] = [];
            posts.forEach((post) => {
                post.images.forEach((img) => {
                    fromPosts.push({
                        image: img,
                        category: post.category,
                        date: post.published_at || post.created_at,
                        title: post.title,
                    });
                });
            });

            // From standalone gallery.json
            const fromGallery: GalleryItem[] = standaloneImages.map((img) => ({
                image: img,
                category: img.category,
                date: img.date,
                title: img.title,
            }));

            // Merge and sort by date descending
            const merged = [...fromPosts, ...fromGallery].sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            );

            setAllImages(merged);
            setDisplayedImages(merged.slice(0, LIMIT));
            setHasMore(merged.length > LIMIT);
            setPage(1);

            const cats = Array.from(
                new Set(merged.map((item) => item.category)),
            );
            setAvailableCategories(cats);

            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const getFiltered = (cat: string) =>
        cat === "All"
            ? allImages
            : allImages.filter((item) => item.category === cat);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setPage(1);
        const filtered = getFiltered(cat);
        setDisplayedImages(filtered.slice(0, LIMIT));
        setHasMore(filtered.length > LIMIT);
    };

    const handleLoadMore = () => {
        setLoadingMore(true);
        const filtered = getFiltered(activeCategory);
        const nextPage = page + 1;
        setTimeout(() => {
            setDisplayedImages(filtered.slice(0, nextPage * LIMIT));
            setPage(nextPage);
            setHasMore(filtered.length > nextPage * LIMIT);
            setLoadingMore(false);
        }, 400);
    };

    const totalCount = getFiltered(activeCategory).length;

    return (
        <>
            <SEO
                title="Gallery"
                description="Browse photos from weddings, concerts, corporate events, debuts and more hosted at LausGroup Event Centre."
                url="https://lausgroupeventcentre.com/gallery"
            />
            <Header />

            {lightbox && (
                <Lightbox
                    images={lightbox.images}
                    startIndex={lightbox.startIndex}
                    title={lightbox.title}
                    onClose={() => setLightbox(null)}
                />
            )}

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/hero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            The <span className="text-red-400">Gallery</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-md m-0">
                            A glimpse of the world-class events hosted at
                            LausGroup Event Centre.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-8">
                    {loading && (
                        <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2
                                size={32}
                                className="text-red-500 animate-spin"
                            />
                            <span className="text-gray-400 text-sm tracking-widest uppercase">
                                Loading gallery...
                            </span>
                        </div>
                    )}

                    {!loading && (
                        <>
                            {/* Category Filter */}
                            <div className="w-full flex flex-row flex-wrap gap-2 justify-center">
                                <button
                                    onClick={() => handleCategoryChange("All")}
                                    className={`text-xs font-bold tracking-widest px-5 py-2 rounded-sm transition-colors duration-200 cursor-pointer border ${
                                        activeCategory === "All"
                                            ? "bg-red-600 text-white border-red-600"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-500"
                                    }`}
                                >
                                    ALL
                                </button>
                                {availableCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() =>
                                            handleCategoryChange(cat)
                                        }
                                        className={`text-xs font-bold tracking-widest px-5 py-2 rounded-sm transition-colors duration-200 cursor-pointer border ${
                                            activeCategory === cat
                                                ? "bg-red-600 text-white border-red-600"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-500"
                                        }`}
                                    >
                                        {(
                                            categoryMap[cat] || cat
                                        ).toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            {/* Results Count */}
                            <div className="w-full flex items-center justify-between">
                                <span className="text-gray-400 text-xs tracking-widest uppercase">
                                    Showing{" "}
                                    <span className="text-red-500 font-bold">
                                        {displayedImages.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="text-red-500 font-bold">
                                        {totalCount}
                                    </span>{" "}
                                    photos
                                </span>
                                <span className="text-gray-400 text-xs uppercase tracking-widest">
                                    {activeCategory === "All"
                                        ? "All Events"
                                        : categoryMap[activeCategory] ||
                                          activeCategory}
                                </span>
                            </div>

                            {/* Empty State */}
                            {displayedImages.length === 0 && (
                                <div className="w-full flex flex-col items-center justify-center py-16 gap-3">
                                    <span className="text-gray-400 text-sm tracking-widest uppercase">
                                        No photos found
                                    </span>
                                    <span className="text-gray-300 text-xs">
                                        Try a different category
                                    </span>
                                </div>
                            )}

                            {/* Photo Grid */}
                            {displayedImages.length > 0 && (
                                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {displayedImages.map((item, index) => (
                                        <div
                                            key={`${item.image.id}-${index}`}
                                            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-300 cursor-pointer shadow-md"
                                            onClick={() => {
                                                const allDisplayedImages =
                                                    displayedImages.map(
                                                        (d) => d.image,
                                                    );
                                                const clickedIndex =
                                                    displayedImages.findIndex(
                                                        (d) =>
                                                            d.image.id ===
                                                            item.image.id,
                                                    );
                                                setLightbox({
                                                    images: allDisplayedImages,
                                                    startIndex:
                                                        clickedIndex >= 0
                                                            ? clickedIndex
                                                            : 0,
                                                    title:
                                                        activeCategory === "All"
                                                            ? "All Events"
                                                            : categoryMap[
                                                                  activeCategory
                                                              ] ||
                                                              activeCategory,
                                                });
                                            }}
                                        >
                                            <img
                                                src={item.image.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 px-3 text-center">
                                                    <ZoomIn
                                                        size={24}
                                                        color="white"
                                                    />
                                                    <span className="text-white text-xs font-bold tracking-widest uppercase">
                                                        {categoryMap[
                                                            item.category
                                                        ] || item.category}
                                                    </span>
                                                    <span className="text-white/70 text-xs line-clamp-2">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Load More */}
                            {hasMore && (
                                <div className="w-full flex justify-center mt-4">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="flex items-center gap-2 bg-white hover:bg-gray-50 disabled:opacity-50 border border-gray-200 hover:border-red-400 text-gray-600 hover:text-red-500 text-xs font-bold tracking-widest px-8 py-3 rounded-sm transition-colors duration-200 cursor-pointer"
                                    >
                                        {loadingMore && (
                                            <Loader2
                                                size={12}
                                                className="animate-spin"
                                            />
                                        )}
                                        {loadingMore
                                            ? "LOADING..."
                                            : "LOAD MORE"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
