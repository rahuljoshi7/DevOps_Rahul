const fs = require("fs");
const path = require("path");

// Minimal valid 1x1 pixel JPEG in base64 (white pixel)
const JPEG_1x1 = Buffer.from(
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8U" +
  "HRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgN" +
  "DRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy" +
  "MjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=",
  "base64"
);

const productImages = [
  "product1a","product1b","product2a","product2b","product3a","product3b",
  "product4a","product4b","product5a","product5b","product6a","product6b",
  "product7a","product7b","product8a","product8b","product9a","product9b",
  "product10a","product10b"
];

const categoryImages = ["men","women","kids","fabric"];

productImages.forEach(name => {
  const p = path.join(__dirname, "public/uploads/products", name + ".jpg");
  fs.writeFileSync(p, JPEG_1x1);
});

categoryImages.forEach(name => {
  const p = path.join(__dirname, "public/uploads/categories", name + ".jpg");
  fs.writeFileSync(p, JPEG_1x1);
});

console.log("✅ Placeholder images created:", productImages.length, "products,", categoryImages.length, "categories");
