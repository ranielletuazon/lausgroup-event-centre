import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const BASE_URL = "https://lausgroupeventcentre.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = "LausGroup Event Centre";

export default function SEO({
    title = "LausGroup Event Centre | San Fernando, Pampanga",
    description = "The premier world-class event destination in San Fernando, Pampanga. Host your wedding, concert, corporate event, and more at LausGroup Event Centre.",
    image = DEFAULT_IMAGE,
    url = BASE_URL,
    type = "website",
}: SEOProps) {
    const fullTitle = title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph - Facebook, Messenger previews */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_PH" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Geo tags - helpful for local SEO */}
            <meta name="geo.region" content="PH-PAM" />
            <meta name="geo.placename" content="San Fernando, Pampanga" />
        </Helmet>
    );
}
