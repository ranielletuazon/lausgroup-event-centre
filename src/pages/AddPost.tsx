import Header from "./components/Header";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function AddPost() {
    const navigate = useNavigate();

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("draft");
    const [publishedAt, setPublishedAt] = useState("");
    const [category, setCategory] = useState("");

    // Image State
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Submit State
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        setSlug(
            val
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"),
        );
    };

    // Handle image selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

        setImageFiles((prev) => [...prev, ...newFiles]);
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        // Reset input so same files can be re-selected if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Remove image by index
    const removeImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle Submit
    const handleSubmit = async (submitStatus: string) => {
        setErrorMsg("");
        setSuccessMsg("");

        // Validate
        if (!title || !slug || !description || !category) {
            setErrorMsg(
                "Please fill in all required fields: Title, Slug, Description, and Category.",
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (imageFiles.length === 0) {
            setErrorMsg("Please upload at least one image.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("slug", slug);
            formData.append("excerpt", excerpt);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("status", submitStatus);
            formData.append("published_at", publishedAt || "");

            // Append all image files
            imageFiles.forEach((file) => {
                formData.append("images[]", file);
            });

            const response = await fetch(
                "http://localhost/lgec-post/add_post.php",
                {
                    method: "POST",
                    body: formData,
                },
            );

            const data = await response.json();

            if (data.success) {
                setSuccessMsg(
                    submitStatus === "published"
                        ? "Post published successfully!"
                        : "Post saved as draft successfully!",
                );
                // Reset form
                setTitle("");
                setSlug("");
                setExcerpt("");
                setDescription("");
                setStatus("draft");
                setPublishedAt("");
                setCategory("");
                setImageFiles([]);
                setImagePreviews([]);
                window.scrollTo({ top: 0, behavior: "smooth" });

                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate("/news-and-events");
                }, 2000);
            } else {
                setErrorMsg(
                    data.error || "Something went wrong. Please try again.",
                );
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } catch (err) {
            setErrorMsg(
                "Failed to connect to the server. Please check your connection.",
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
                {/* Hero Banner */}
                <div className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('./assets/hero.jpg')] bg-center bg-cover opacity-30" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-start justify-center gap-3">
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight m-0">
                            Add <span className="text-red-400">Post</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base max-w-lg m-0">
                            Create and publish a new news or events post.
                        </p>
                    </div>
                </div>

                {/* Global Container */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-8">
                    {/* Success Message */}
                    {successMsg && (
                        <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-5 py-4">
                            <CheckCircle
                                size={18}
                                className="text-green-500 flex-none"
                            />
                            <span className="text-green-700 text-sm font-semibold">
                                {successMsg}
                            </span>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="w-full flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-5 py-4">
                            <AlertCircle
                                size={18}
                                className="text-red-500 flex-none"
                            />
                            <span className="text-red-700 text-sm font-semibold">
                                {errorMsg}
                            </span>
                        </div>
                    )}

                    <div className="w-full flex md:flex-row flex-col gap-8 items-start">
                        {/* Left - Main Form */}
                        <div className="md:w-2/3 w-full flex flex-col gap-6">
                            {/* Post Details Card */}
                            <div className="bg-white rounded-lg shadow-md px-8 py-8 border-t-4 border-red-600 flex flex-col gap-5">
                                <h3 className="text-gray-900 text-lg font-bold tracking-wide m-0">
                                    Post Details
                                </h3>

                                {/* Title */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Title{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                        required
                                        placeholder="e.g. Hataw Pa with Gary V at Ford Pampanga's 25th Anniversary"
                                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-black/80 placeholder:text-black/50 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200"
                                    />
                                </div>

                                {/* Slug */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Slug{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-row items-center rounded-md border border-gray-200 bg-gray-50 overflow-hidden focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400 transition-colors duration-200">
                                        <span className="flex items-center px-3 text-xs text-black/80 bg-gray-100 border-r border-gray-200 select-none py-2.5 whitespace-nowrap">
                                            /news-and-events/
                                        </span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={slug}
                                            onChange={(e) =>
                                                setSlug(e.target.value)
                                            }
                                            required
                                            placeholder="gary-v-ford-pampanga-25th-anniversary"
                                            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-black/80 placeholder:text-black/50 focus:outline-none"
                                        />
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        Auto-generated from title. Use lowercase
                                        letters and hyphens only.
                                    </span>
                                </div>

                                {/* Excerpt */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={excerpt}
                                        onChange={(e) =>
                                            setExcerpt(e.target.value)
                                        }
                                        placeholder="Short summary shown on the news card preview..."
                                        rows={2}
                                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200 resize-none"
                                    />
                                    <span className="text-gray-400 text-xs">
                                        Shown as the preview text on the news
                                        listing page.
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Description{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        required
                                        placeholder="Write the full post content here..."
                                        rows={10}
                                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200 resize-none"
                                    />
                                </div>
                            </div>

                            {/* Image Upload Card */}
                            <div className="bg-white rounded-lg shadow-md px-8 py-8 border-t-4 border-red-600 flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-gray-900 text-lg font-bold tracking-wide m-0">
                                        Post Images
                                    </h3>
                                    <span className="text-gray-400 text-xs">
                                        First image will be used as the cover.
                                        You can upload multiple images.
                                    </span>
                                </div>

                                {/* Upload Area */}
                                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-lg px-6 py-10 cursor-pointer hover:border-red-400 hover:bg-red-50 transition-colors duration-200">
                                    <ImagePlus
                                        size={32}
                                        className="text-gray-300 mb-3"
                                    />
                                    <span className="text-gray-500 text-sm font-semibold">
                                        Click to upload images
                                    </span>
                                    <span className="text-gray-400 text-xs mt-1">
                                        JPEG, PNG, WebP, GIF — Max 5MB each
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="images[]"
                                        multiple
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        className="hidden"
                                        onChange={handleImageSelect}
                                    />
                                </label>

                                {/* Image Previews */}
                                {imagePreviews.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">
                                            {imagePreviews.length} image
                                            {imagePreviews.length > 1
                                                ? "s"
                                                : ""}{" "}
                                            selected
                                        </span>
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                            {imagePreviews.map((src, index) => (
                                                <div
                                                    key={index}
                                                    className="relative group aspect-square rounded-lg overflow-hidden shadow-sm"
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {index === 0 && (
                                                        <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                                                            COVER
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
                                                        className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer border-none"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right - Sidebar */}
                        <div className="md:w-1/3 w-full flex flex-col gap-6">
                            {/* Publish Card */}
                            <div className="bg-white rounded-lg shadow-md px-6 py-6 border-t-4 border-red-600 flex flex-col gap-4">
                                <h3 className="text-gray-900 text-sm font-bold tracking-widest uppercase m-0">
                                    Publish
                                </h3>

                                {/* Status */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Status{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>
                                </div>

                                {/* Published At */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-xs font-bold tracking-widest uppercase">
                                        Publish Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="published_at"
                                        value={publishedAt}
                                        onChange={(e) =>
                                            setPublishedAt(e.target.value)
                                        }
                                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200"
                                    />
                                    <span className="text-gray-400 text-xs">
                                        Leave blank to publish immediately.
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="w-full border-t border-gray-100" />

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSubmit("published")
                                        }
                                        disabled={loading}
                                        className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 text-white text-xs font-bold tracking-widest px-6 py-3 rounded-sm transition-colors duration-200 cursor-pointer border-none flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />
                                        ) : null}
                                        {loading
                                            ? "PUBLISHING..."
                                            : "PUBLISH POST"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit("draft")}
                                        disabled={loading}
                                        className="w-full bg-white hover:bg-gray-50 disabled:opacity-50 border border-gray-200 hover:border-gray-300 text-gray-600 text-xs font-bold tracking-widest px-6 py-3 rounded-sm transition-colors duration-200 cursor-pointer"
                                    >
                                        SAVE AS DRAFT
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/news-and-events")
                                        }
                                        disabled={loading}
                                        className="w-full text-gray-400 hover:text-red-500 disabled:opacity-50 text-xs font-bold tracking-widest px-6 py-2 rounded-sm transition-colors duration-200 cursor-pointer border-none bg-transparent"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </div>

                            {/* Category Card */}
                            <div className="bg-white rounded-lg shadow-md px-6 py-6 border-t-4 border-red-600 flex flex-col gap-4">
                                <h3 className="text-gray-900 text-sm font-bold tracking-widest uppercase m-0">
                                    Category
                                </h3>
                                <select
                                    name="category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors duration-200"
                                >
                                    <option value="" disabled>
                                        Select category...
                                    </option>
                                    <option value="weddings">Weddings</option>
                                    <option value="debut">Debut</option>
                                    <option value="concerts">Concerts</option>
                                    <option value="graduations">
                                        Graduations
                                    </option>
                                    <option value="corporate">Corporate</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="spiritual">
                                        Spiritual Event
                                    </option>
                                    <option value="pageants">Pageants</option>
                                    <option value="sports">Sports</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
