import React from "react";
import { Helmet } from "react-helmet";
import { BlogSchema } from "./GoogleRichSnippet";

interface BlogMetaProps {
  title: string;
  metaDescription: string;
  keyword: string;
  location: string;
  url: string;
}

const BlogMeta: React.FC<BlogMetaProps> = ({
  title,
  metaDescription,
  keyword,
  location,
  url,
}) => {
  const schemaData = BlogSchema({
    title,
    description: metaDescription,
    url,
    location,
    keyword,
  });

  return (
    <Helmet>
      <title>{title} | Nash & Smashed</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content={`${keyword}, ${location}, Nashville Hot Chicken, Smashed Burgers`}
      />
      <link rel="canonical" href={`https://nashandsmashed.com/${url}`} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={`${title} | Nash & Smashed`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://nashandsmashed.com/${url}`} />
      <meta
        property="og:image"
        content="https://nashandsmashed.com/images/nash-and-smashed-og-image.jpg"
      />
      <meta property="og:site_name" content="Nash & Smashed" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nashandsmashed" />
      <meta name="twitter:title" content={`${title} | Nash & Smashed`} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content="https://nashandsmashed.com/images/nash-and-smashed-og-image.jpg"
      />

      {/* Schema.org JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};

export default BlogMeta;
