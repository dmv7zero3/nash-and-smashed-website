## CloudFront Distribution Function for Static React Websites

This CloudFront Function is designed to serve fully static React websites (such as those built with Create React App, Vite, or similar) with client-side routing. It ensures correct handling of static assets, SEO, and React Router fallback, while preventing duplicate content and canonical issues.

### Key Responsibilities

1. **Static File Pass-Through**

   - Requests for static assets (e.g., `.js`, `.css`, images, fonts, `.xml`, etc.) are served directly without modification.

2. **Special Handling for Sitemap and Robots**

   - Requests for `/sitemap.xml` and `/robots.txt` are passed through directly to support SEO and crawler access.

3. **Static Routes**

   - Known static routes (e.g., `/`, `/contact`, `/blog`, etc.) are mapped to their corresponding HTML files (e.g., `/contact/index.html`).

4. **Blog Post Routing**

   - Valid blog post URLs (based on known prefixes and location patterns) are mapped to their respective HTML files (e.g., `/best-chicken-wings/manassas-va/index.html`).

5. **React Router Fallback**

   - All other requests are rewritten to `/index.html` so that React Router can handle client-side navigation for unknown or dynamic routes.

6. **Canonical Redirect for /index.html**
   - Requests to `/index.html` are redirected (301) to `/` to prevent duplicate content and ensure proper canonicalization for SEO.

---

### Example Logic (Pseudocode)

```
if (uri === '/index.html') {
  redirect to '/';
}
if (isStaticFile(uri)) {
  return as-is;
}
if (uri === '/sitemap.xml' || uri === '/robots.txt') {
  return as-is;
}
if (isStaticRoute(uri)) {
  rewrite to '/route/index.html';
}
if (isValidBlogPost(uri)) {
  rewrite to '/blog-path/index.html';
}
// fallback
rewrite to '/index.html';
```

---

### Best Practices for Future CloudFront Functions

- **Always redirect `/index.html` to `/`** to avoid duplicate content and canonical issues.
- **Pass through static assets and SEO files** (robots.txt, sitemap.xml) unmodified.
- **Map known static routes** to their HTML files for direct navigation and SEO.
- **Validate dynamic/blog routes** using known patterns to avoid serving invalid URLs.
- **Fallback to `/index.html`** for all other requests to support client-side routing.
- **Keep the list of static routes and valid blog prefixes up to date** with your sitemap and site structure.

---

### Why This Matters

This approach ensures:

- Fast, cacheable static asset delivery
- Proper SEO (no duplicate content, correct canonical URLs)
- Full support for React Router and client-side navigation
- Clean, maintainable CloudFront logic for static sites

---

**Edit this README if your routing logic or site structure changes.**
