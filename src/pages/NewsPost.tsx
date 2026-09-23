import Header from "./components/Header";
import Footer from "./components/Footer";
import {
    ArrowLeft,
    Clock,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getPostBySlug,
    getPostsByCategory,
    type Post,
    type PostImage,
} from "../data/posts";

// Carousel Component
function ImageCarousel({ images }: { images: PostImage[] }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

    if (images.length === 0) return null;

    if (images.length === 1) {
        return (
            <div className="w-full overflow-hidden">
                <img
                    src={images[0].image_url}
                    alt="Post Image"
                    className="w-full h-[250px] md:h-[420px] object-cover"
                />
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden group">
            <div className="w-full h-[250px] md:h-[420px] overflow-hidden">
                <img
                    key={current}
                    src={images[current].image_url}
                    alt={`Image ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200 cursor-pointer border-none opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200 cursor-pointer border-none opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={20} />
            </button>

            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">
                {current + 1} / {images.length}
            </div>
        </div>
    );
}

export default function NewsPost() {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const estimateReadTime = (text: string) => {
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        setNotFound(false);
        setPost(null);
        window.scrollTo({ top: 0, behavior: "instant" });

        // Small delay to show loading state — feels intentional
        const timer = setTimeout(() => {
            const found = getPostBySlug(slug);

            if (!found) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            setPost(found);

            const related = getPostsByCategory(found.category)
                .filter((p) => p.slug !== slug)
                .slice(0, 5);
            setRelatedPosts(related);

            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [slug]);

    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/hero.jpg')] bg-center bg-cover opacity-30" />
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
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex md:flex-row flex-col gap-10">
                    {/* Loading */}
                    {loading && (
                        <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2
                                size={32}
                                className="text-red-500 animate-spin"
                            />
                            <span className="text-gray-400 text-sm tracking-widest uppercase">
                                Loading post...
                            </span>
                        </div>
                    )}

                    {/* Not Found */}
                    {!loading && notFound && (
                        <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                            <span className="text-gray-400 text-sm tracking-widest uppercase">
                                Post not found
                            </span>
                            <button
                                onClick={() => navigate("/news-and-events")}
                                className="text-xs font-bold tracking-widest text-red-500 hover:text-red-700 uppercase cursor-pointer"
                            >
                                ← Back to News
                            </button>
                        </div>
                    )}

                    {/* Post Content */}
                    {!loading && !notFound && post && (
                        <>
                            {/* Main Post */}
                            <div className="md:w-2/3 w-full flex flex-col gap-6">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="flex items-center gap-2 text-black hover:text-red-500 text-xs font-semibold tracking-widest cursor-pointer transition-colors duration-200 w-fit"
                                >
                                    <ArrowLeft size={14} /> BACK TO NEWS
                                </button>

                                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                                    <ImageCarousel images={post.images} />

                                    <div className="px-6 md:px-10 py-8 flex flex-col gap-5">
                                        {/* Meta */}
                                        <div className="flex flex-row flex-wrap items-center gap-4">
                                            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
                                                {post.category}
                                            </span>
                                            <span className="text-black/70 text-xs">
                                                {formatDate(
                                                    post.published_at ||
                                                        post.created_at,
                                                )}
                                            </span>
                                            <span className="flex items-center gap-1 text-black/70 text-xs">
                                                <Clock size={11} />
                                                {estimateReadTime(
                                                    post.description,
                                                )}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-gray-900 text-2xl md:text-3xl font-bold leading-tight m-0">
                                            {post.title}
                                        </h1>

                                        <div className="w-12 h-1 bg-red-600 rounded-full" />

                                        {/* Description */}
                                        <div className="flex flex-col gap-4 text-black/80 text-sm md:text-base leading-relaxed">
                                            {post.description
                                                .split("\n")
                                                .map((paragraph, i) =>
                                                    paragraph.trim() ? (
                                                        <p
                                                            key={i}
                                                            className="m-0"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    ) : null,
                                                )}
                                        </div>

                                        <div className="w-full border-t border-gray-100 mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="md:w-1/3 w-full flex flex-col gap-4">
                                <h3 className="text-gray-900 text-sm font-bold tracking-[0.2em] uppercase border-b-2 border-red-600 pb-2 m-0">
                                    Related Posts
                                </h3>

                                {relatedPosts.length > 0 ? (
                                    relatedPosts.map((related) => (
                                        <div
                                            key={related.id}
                                            onClick={() =>
                                                navigate(
                                                    `/news-and-events/${related.slug}`,
                                                )
                                            }
                                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-row"
                                        >
                                            <div className="w-24 flex-none overflow-hidden bg-gray-200">
                                                {related.cover_image ? (
                                                    <img
                                                        src={
                                                            related.cover_image
                                                        }
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center gap-1.5 px-4 py-3 flex-1">
                                                <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
                                                    {related.category}
                                                </span>
                                                <h4 className="text-gray-800 text-xs font-semibold leading-snug m-0 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                                                    {related.title}
                                                </h4>
                                                <span className="text-black/60 text-xs">
                                                    {formatDate(
                                                        related.published_at ||
                                                            related.created_at,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-xs">
                                        No related posts found.
                                    </p>
                                )}

                                <button
                                    onClick={() => navigate("/news-and-events")}
                                    className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-red-400 text-gray-600 hover:text-red-500 text-xs font-bold tracking-widest px-6 py-3 rounded-sm transition-colors duration-200 cursor-pointer mt-2"
                                >
                                    VIEW ALL NEWS
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
