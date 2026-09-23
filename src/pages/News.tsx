import Header from "./components/Header";
import Footer from "./components/Footer";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPublishedPosts, type Post } from "../data/posts";

// SEO
import SEO from "./components/SEO";

const LIMIT = 6;

export default function News() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    useEffect(() => {
        // Simulate a tiny load delay so the spinner shows briefly
        const timer = setTimeout(() => {
            const allPosts = getPublishedPosts();
            setPosts(allPosts);
            setDisplayedPosts(allPosts.slice(0, LIMIT));
            setHasMore(allPosts.length > LIMIT);
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        const nextSlice = posts.slice(0, nextPage * LIMIT);
        setTimeout(() => {
            setDisplayedPosts(nextSlice);
            setPage(nextPage);
            setHasMore(posts.length > nextPage * LIMIT);
            setLoadingMore(false);
        }, 400);
    };

    return (
        <>
            <SEO
                title="News & Events"
                description="Stay updated with the latest news and events at LausGroup Event Centre in San Fernando, Pampanga."
                url="https://lausgroupeventcentre.com/news-and-events"
            />
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/abouthero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            News & <span className="text-red-400">Events</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-md m-0">
                            Stay updated with the latest happenings at LausGroup
                            Event Centre.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-8">
                    {/* Loading State */}
                    {loading && (
                        <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2
                                size={32}
                                className="text-red-500 animate-spin"
                            />
                            <span className="text-gray-400 text-sm tracking-widest uppercase">
                                Loading posts...
                            </span>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && displayedPosts.length === 0 && (
                        <div className="w-full flex flex-col items-center justify-center py-24 gap-3">
                            <span className="text-gray-400 text-sm tracking-widest uppercase">
                                No posts found
                            </span>
                            <span className="text-gray-300 text-xs">
                                Check back soon for updates!
                            </span>
                        </div>
                    )}

                    {/* News Grid */}
                    {!loading && displayedPosts.length > 0 && (
                        <>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
                                        onClick={() =>
                                            navigate(
                                                `/news-and-events/${post.slug}`,
                                            )
                                        }
                                    >
                                        {/* Image */}
                                        <div className="w-full overflow-hidden aspect-video bg-gray-200">
                                            {post.cover_image ? (
                                                <img
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <span className="text-gray-400 text-xs">
                                                        No image
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-3 p-5 flex-1">
                                            <div className="flex flex-row items-center justify-between">
                                                <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
                                                    {post.category}
                                                </span>
                                                <span className="text-black/50 text-xs">
                                                    {formatDate(
                                                        post.published_at ||
                                                            post.created_at,
                                                    )}
                                                </span>
                                            </div>

                                            <h3 className="text-gray-900 text-sm md:text-base font-bold leading-snug m-0 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-black/80 text-xs leading-relaxed m-0 line-clamp-2 flex-1">
                                                {post.excerpt ||
                                                    post.description}
                                            </p>

                                            <div className="flex flex-row items-center gap-1 text-red-500 text-xs font-bold tracking-widest uppercase mt-auto group-hover:gap-2 transition-all duration-200">
                                                READ MORE{" "}
                                                <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

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
