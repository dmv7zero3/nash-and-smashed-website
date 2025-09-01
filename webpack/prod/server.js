// webpack/prod/server.js - Uses AWS CLI credentials automatically
import S3Plugin from "webpack-s3-plugin";

// S3 Upload Plugin for deployment - Uses your AWS CLI shared credentials file
export const s3Plugin =
  process.env.NODE_ENV === "production"
    ? new S3Plugin({
        // No s3Options needed - automatically uses AWS CLI credentials
        s3UploadOptions: {
          Bucket: "nash-and-smashed-website",
          ACL: "public-read", // Changed from bucket-owner-full-control to public-read for website hosting
          CacheControl: (fileName) => {
            // Source map files - cache but shorter than main files
            if (fileName.endsWith(".map")) {
              return "public, max-age=86400"; // 1 day for source maps
            }

            // JSON files should have shorter cache times to ensure updates are seen
            if (fileName.endsWith(".json") || fileName.includes("/data/")) {
              return "public, max-age=300"; // 5 minutes for JSON data files
            }

            // Specific check for JavaScript files
            if (fileName.includes("/js/") || fileName.endsWith(".js")) {
              return "public, max-age=31536000, immutable"; // 1 year for JS files
            }

            // Specific check for font files
            if (fileName.includes("/fonts/")) {
              return "public, max-age=31536000, immutable"; // 1 year for font files
            }

            // Enhanced regex to ensure it captures all your video files and posters
            if (fileName.includes("/videos/")) {
              return "public, max-age=31536000, immutable"; // 1 year for video assets
            }

            // General static assets
            if (
              fileName.match(
                /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|woff|woff2|ttf|otf|eot)$/i
              )
            ) {
              return "public, max-age=31536000, immutable"; // 1 year for static assets
            }

            if (fileName.match(/\.html$/)) {
              return "public, max-age=86400"; // 1 day for HTML files
            }

            return "public, max-age=300"; // 5 minutes for other files
          },
        },
        basePath: "",
        directory: "dist",
        headers: {
          js: {
            "Content-Type": "application/javascript",
          },
          map: {
            "Content-Type": "application/json",
          },
          mp4: {
            "Content-Type": "video/mp4",
          },
          webm: {
            "Content-Type": "video/webm",
          },
          webp: {
            "Content-Type": "image/webp",
          },
          ttf: {
            "Content-Type": "font/ttf",
          },
          woff: {
            "Content-Type": "font/woff",
          },
          woff2: {
            "Content-Type": "font/woff2",
          },
          json: {
            "Content-Type": "application/json",
          },
        },
        // Ensure source maps are included
        exclude: [], // Don't exclude anything by default
        include: /.*/, // Include all files
      })
    : null;
