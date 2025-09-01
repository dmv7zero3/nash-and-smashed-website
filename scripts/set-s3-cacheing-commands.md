# Fix JavaScript files (1-year cache)

aws s3 cp s3://nash-and-smashed-website/js/ s3://nash-and-smashed-website/js/ \
 --recursive \
 --metadata-directive REPLACE \
 --cache-control "public, max-age=31536000, immutable" \
 --content-type "application/javascript" \
 --exclude "_.map" \
 --exclude "_.LICENSE.txt"

# Fix JavaScript source maps

aws s3 cp s3://nash-and-smashed-website/js/ s3://nash-and-smashed-website/js/ \
 --recursive \
 --metadata-directive REPLACE \
 --cache-control "public, max-age=31536000, immutable" \
 --content-type "application/json" \
 --include "\*.map"

# Fix CSS files (1-year cache)

aws s3 cp s3://nash-and-smashed-website/styles/ s3://nash-and-smashed-website/styles/ \
 --recursive \
 --metadata-directive REPLACE \
 --cache-control "public, max-age=31536000, immutable" \
 --content-type "text/css"

# Fix font files (1-year cache)

aws s3 cp s3://nash-and-smashed-website/fonts/ s3://nash-and-smashed-website/fonts/ \
 --recursive \
 --metadata-directive REPLACE \
 --cache-control "public, max-age=31536000, immutable"

# Fix image files (1-year cache)

aws s3 cp s3://nash-and-smashed-website/images/ s3://nash-and-smashed-website/images/ \
 --recursive \
 --metadata-directive REPLACE \
 --cache-control "public, max-age=31536000, immutable"
