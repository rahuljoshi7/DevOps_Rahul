require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = require("./models/users");
const categoryModel = require("./models/categories");
const productModel = require("./models/products");

const seed = async () => {
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Connected to MongoDB");

  // Clear existing data
  await userModel.deleteMany({});
  await categoryModel.deleteMany({});
  await productModel.deleteMany({});
  console.log("Cleared existing data");

  // Create admin user
  const adminPassword = bcrypt.hashSync("admin123", 10);
  const admin = await userModel.create({
    name: "Admin",
    email: "admin@bffabric.com",
    password: adminPassword,
    userRole: 1,
  });
  console.log("Admin created: admin@bffabric.com / admin123");

  // Create customer user
  const customerPassword = bcrypt.hashSync("customer123", 10);
  await userModel.create({
    name: "Test Customer",
    email: "customer@bffabric.com",
    password: customerPassword,
    userRole: 0,
  });
  console.log("Customer created: customer@bffabric.com / customer123");

  // Create categories
  const categories = await categoryModel.insertMany([
    { cName: "Men", cDescription: "Men's clothing and accessories", cImage: "men.jpg", cStatus: "Active" },
    { cName: "Women", cDescription: "Women's clothing and accessories", cImage: "women.jpg", cStatus: "Active" },
    { cName: "Kids", cDescription: "Kids clothing and accessories", cImage: "kids.jpg", cStatus: "Active" },
    { cName: "Fabric", cDescription: "Raw fabric materials", cImage: "fabric.jpg", cStatus: "Active" },
  ]);
  console.log("Categories created:", categories.map(c => c.cName).join(", "));

  // Create products
  const products = [
    { pName: "Men's Cotton Shirt", pDescription: "Premium quality cotton shirt for men. Comfortable and stylish for everyday wear.", pPrice: 799, pQuantity: 50, pCategory: categories[0]._id, pImages: ["product1a.jpg", "product1b.jpg"], pOffer: "10", pStatus: "Active" },
    { pName: "Men's Formal Trousers", pDescription: "Classic formal trousers made from high quality fabric. Perfect for office and events.", pPrice: 1299, pQuantity: 30, pCategory: categories[0]._id, pImages: ["product2a.jpg", "product2b.jpg"], pOffer: "5", pStatus: "Active" },
    { pName: "Men's Kurta", pDescription: "Traditional Indian kurta with modern design. Ideal for festivals and casual outings.", pPrice: 999, pQuantity: 40, pCategory: categories[0]._id, pImages: ["product3a.jpg", "product3b.jpg"], pOffer: "15", pStatus: "Active" },
    { pName: "Women's Saree", pDescription: "Elegant silk saree with beautiful embroidery. Perfect for weddings and special occasions.", pPrice: 2499, pQuantity: 20, pCategory: categories[1]._id, pImages: ["product4a.jpg", "product4b.jpg"], pOffer: "10", pStatus: "Active" },
    { pName: "Women's Kurti", pDescription: "Stylish cotton kurti with floral print. Comfortable for daily wear.", pPrice: 699, pQuantity: 60, pCategory: categories[1]._id, pImages: ["product5a.jpg", "product5b.jpg"], pOffer: "20", pStatus: "Active" },
    { pName: "Women's Lehenga", pDescription: "Beautiful designer lehenga for festive occasions. Comes with matching dupatta.", pPrice: 3999, pQuantity: 15, pCategory: categories[1]._id, pImages: ["product6a.jpg", "product6b.jpg"], pOffer: "5", pStatus: "Active" },
    { pName: "Kids T-Shirt", pDescription: "Soft and comfortable t-shirt for kids. Available in multiple colors.", pPrice: 399, pQuantity: 80, pCategory: categories[2]._id, pImages: ["product7a.jpg", "product7b.jpg"], pOffer: "10", pStatus: "Active" },
    { pName: "Kids Frock", pDescription: "Cute and colorful frock for girls. Made from soft breathable fabric.", pPrice: 599, pQuantity: 45, pCategory: categories[2]._id, pImages: ["product8a.jpg", "product8b.jpg"], pOffer: "15", pStatus: "Active" },
    { pName: "Cotton Fabric Roll", pDescription: "High quality pure cotton fabric. 5 meters per roll. Ideal for stitching.", pPrice: 1499, pQuantity: 100, pCategory: categories[3]._id, pImages: ["product9a.jpg", "product9b.jpg"], pOffer: "0", pStatus: "Active" },
    { pName: "Silk Fabric Roll", pDescription: "Premium silk fabric roll. 5 meters. Perfect for sarees and dress making.", pPrice: 2999, pQuantity: 25, pCategory: categories[3]._id, pImages: ["product10a.jpg", "product10b.jpg"], pOffer: "5", pStatus: "Active" },
  ];

  await productModel.insertMany(products);
  console.log("Products created:", products.length);

  console.log("\n✅ Seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin login:    admin@bffabric.com / admin123");
  console.log("Customer login: customer@bffabric.com / customer123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
