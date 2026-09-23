import rawPosts from "./posts.json";
import rawGallery from "./gallery.json";

// Import every image in the posts folder automatically (Vite feature)
const imageModules = import.meta.glob("../assets/posts/images/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

// Look up an image by its filename
const resolveImage = (filename: string): string => {
    const match = Object.entries(imageModules).find(([path]) =>
        path.endsWith(`/${filename}`),
    );
    return match ? match[1] : "";
};

export interface PostImage {
    id: number;
    image_url: string;
    is_cover: string;
    sort_order: string;
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    category: string;
    status: string;
    published_at: string;
    created_at: string;
    cover_image: string | null;
    images: PostImage[];
}

interface RawPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    category: string;
    status: string;
    published_at: string;
    created_at: string;
    images: string[];
}

export interface StandaloneImage {
    id: number;
    image_url: string;
    category: string;
    date: string;
    title: string;
    is_cover: string;
    sort_order: string;
}

interface RawGalleryImage {
    id: number;
    filename: string;
    category: string;
    date: string;
    title: string;
}

export const standaloneImages: StandaloneImage[] = (
    rawGallery as RawGalleryImage[]
).map((g) => ({
    id: g.id,
    image_url: resolveImage(g.filename),
    category: g.category,
    date: g.date,
    title: g.title,
    is_cover: "0",
    sort_order: "0",
}));

// Transform the raw JSON into full Post objects with resolved images
export const posts: Post[] = (rawPosts as RawPost[]).map((p) => {
    const resolvedImages: PostImage[] = p.images.map((filename, i) => ({
        id: p.id * 100 + i,
        image_url: resolveImage(filename),
        is_cover: i === 0 ? "1" : "0",
        sort_order: String(i),
    }));

    return {
        ...p,
        cover_image:
            resolvedImages.length > 0 ? resolvedImages[0].image_url : null,
        images: resolvedImages,
    };
});

// ─── Helpers (same API as before) ──────────────────────────────────────────
export const getPublishedPosts = (): Post[] =>
    posts
        .filter((p) => p.status === "published")
        .sort(
            (a, b) =>
                new Date(b.published_at || b.created_at).getTime() -
                new Date(a.published_at || a.created_at).getTime(),
        );

export const getPostBySlug = (slug: string): Post | undefined =>
    posts.find((p) => p.slug === slug && p.status === "published");

export const getPostsByCategory = (category: string): Post[] =>
    getPublishedPosts().filter((p) => p.category === category);
