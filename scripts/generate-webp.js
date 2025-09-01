import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import crypto from "crypto";

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the project
const rootDir = path.join(__dirname, "..");

// Log helper
function log(message) {
  console.log(`[WebP Generator] ${message}`);
}

// Function to walk through directories recursively
async function walkDirectory(directory) {
  log(`Scanning directory: ${directory}`);

  const items = await fs.promises.readdir(directory);

  let files = [];
  for (const item of items) {
    const fullPath = path.join(directory, item);

    try {
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        // Ignore node_modules and .git directories
        if (item === "node_modules" || item === ".git" || item === "dist") {
          continue;
        }

        const subFiles = await walkDirectory(fullPath);
        files = files.concat(subFiles);
      } else if (isImageFile(fullPath)) {
        files.push(fullPath);
      }
    } catch (error) {
      log(`Error accessing ${fullPath}: ${error.message}`);
    }
  }

  return files;
}

// Function to filter for image files
function isImageFile(file) {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext);
}

// Function to calculate file hash
async function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const stream = fs.createReadStream(filePath);

    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

// Function to convert image to webp
async function convertToWebp(imagePath) {
  const directory = path.dirname(imagePath);
  const filename = path.basename(imagePath, path.extname(imagePath));
  const outputPath = path.join(directory, `${filename}.webp`);
  const relativePath = path.relative(rootDir, imagePath);

  // Skip if webp already exists and source hasn't changed
  try {
    const webpExists = await fs.promises
      .access(outputPath)
      .then(() => true)
      .catch(() => false);

    if (webpExists) {
      // Compare modification times and hash if needed
      const imageStats = await fs.promises.stat(imagePath);
      const webpStats = await fs.promises.stat(outputPath);

      // If source image is older than webp, skip conversion
      if (imageStats.mtimeMs <= webpStats.mtimeMs) {
        log(`Skipping ${relativePath} (WebP is up to date)`);
        return;
      }

      // If source image is newer, we might need to regenerate
      // But first check content hash to avoid unnecessary conversions
      const imageHash = await calculateFileHash(imagePath);
      const hashFile = outputPath + ".hash";

      // Check if we have a stored hash
      try {
        const storedHash = await fs.promises.readFile(hashFile, "utf8");
        if (storedHash === imageHash) {
          log(`Skipping ${relativePath} (Content unchanged)`);
          return;
        }
      } catch (err) {
        // No stored hash, continue with conversion
      }
    }
  } catch (err) {
    // File doesn't exist or error checking, continue with conversion
  }

  try {
    log(`Converting: ${relativePath}`);

    const files = await imagemin([imagePath], {
      destination: directory,
      plugins: [
        imageminWebp({
          quality: 80, // Adjust quality as needed
          method: 6, // Higher method means better compression but slower
        }),
      ],
    });

    // Store hash of the original file for future comparisons
    const imageHash = await calculateFileHash(imagePath);
    const hashFile = outputPath + ".hash";
    await fs.promises.writeFile(hashFile, imageHash);

    log(`✓ Created: ${path.relative(rootDir, outputPath)}`);
    return files;
  } catch (error) {
    log(`❌ Error converting ${relativePath}: ${error.message}`);
  }
}

async function main() {
  log("Starting WebP image generation...");

  try {
    // Get all image files from the project recursively
    const imageFiles = await walkDirectory(rootDir);

    log(`Found ${imageFiles.length} images to process`);

    // Convert each image to webp
    if (imageFiles.length > 0) {
      log("Beginning conversion...");
      let converted = 0;
      let skipped = 0;

      for (const file of imageFiles) {
        const result = await convertToWebp(file);
        if (result) converted++;
        else skipped++;
      }

      log(
        `✅ WebP generation complete! Converted: ${converted}, Skipped: ${skipped}`
      );
    } else {
      log("No image files found to convert.");
    }
  } catch (err) {
    log(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

main();
