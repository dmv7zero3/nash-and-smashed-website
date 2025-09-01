interface BlogSchemaProps {
  title: string;
  description: string;
  url: string;
  location: string;
  keyword: string;
}

export const BlogSchema = ({
  title,
  description,
  url,
  location,
  keyword,
}: BlogSchemaProps) => {
  const currentDate = new Date().toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nashandsmashed.com${url}`,
    },
    headline: title,
    description: description,
    image: "https://nashandsmashed.com/images/nash-and-smashed-og-image.jpg",
    author: {
      "@type": "Person",
      name: "Chef John",
    },
    publisher: {
      "@type": "Organization",
      name: "Nash & Smashed",
      logo: {
        "@type": "ImageObject",
        url: "https://nashandsmashed.com/images/logo.png",
      },
    },
    datePublished: currentDate,
    dateModified: currentDate,
    keywords: [keyword, location, "Nashville Hot Chicken", "Smashed Burgers"],
  };
};

export default BlogSchema;
