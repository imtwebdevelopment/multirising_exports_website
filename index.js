import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import sendBulkOrderHandler from "./api/send-bulk-order.js";

dotenv.config();

// Establish MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// GridFS Storage Configuration
let gfsBucket;
const initGridFS = () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });
  console.log("✅ GridFS Bucket initialized");
};

if (mongoose.connection.readyState === 1) {
  initGridFS();
} else {
  mongoose.connection.once("open", initGridFS);
}

const upload = multer({ storage: multer.memoryStorage() });

// MongoDB Schemas & Models
const AdminSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: "admin" });
const Admin = mongoose.model("Admin", AdminSchema);

const AdminProfileSchema = new mongoose.Schema({
  adminName: String,
  email: String,
  phone: String,
  address: String
}, { collection: "admin_profile" });
const AdminProfile = mongoose.model("AdminProfile", AdminProfileSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
}, { collection: "categories" });
const Category = mongoose.model("Category", CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  images: [String],
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
}, { collection: "products" });
const Product = mongoose.model("Product", ProductSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Payment and Shipping Integrations Removed
app.post("/api/send-bulk-order", sendBulkOrderHandler);


// 📁 Image Upload & Retrieval Endpoints (GridFS)
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!gfsBucket) {
      return res.status(500).json({ error: "GridFS bucket not initialized yet" });
    }

    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.on("error", (err) => {
      console.error("❌ GridFS Upload Error:", err);
      return res.status(500).json({ error: err.message });
    });

    uploadStream.on("finish", () => {
      const fileId = uploadStream.id;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      res.json({ url: `${baseUrl}/api/image/${fileId}` });
    });

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("❌ Upload Endpoint Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!gfsBucket) {
      return res.status(500).json({ error: "GridFS bucket not initialized yet" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const files = await mongoose.connection.db.collection("images.files").find({ _id: objectId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const file = files[0];
    res.setHeader("Content-Type", file.contentType || "image/jpeg");

    const downloadStream = gfsBucket.openDownloadStream(objectId);
    downloadStream.on("error", (err) => {
      console.error("❌ GridFS Download Error:", err);
      res.status(404).json({ error: "Image not found" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("❌ Image Retrieve Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 🔐 Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { id, password } = req.body;
    const admin = await Admin.findOne({ id, password });
    if (admin) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👤 Admin Profile (GET & PUT)
app.get("/api/admin-profile", async (req, res) => {
  try {
    let profile = await AdminProfile.findOne();
    if (!profile) {
      profile = await AdminProfile.create({
        adminName: "Admin User",
        email: "admin@multirising.com",
        phone: "+91 76192 10277",
        address: "Multirising Exports Office"
      });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin-profile", async (req, res) => {
  try {
    const { adminName, email, phone, address } = req.body;
    const profile = await AdminProfile.findOneAndUpdate(
      {},
      { adminName, email, phone, address },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📊 Dashboard Stats
app.get("/api/dashboard-stats", async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    res.json({
      productsCount,
      categoriesCount,
      recentProducts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌿 Categories CRUD
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = new Category({ name, image });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Products CRUD
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, category, images, image, description } = req.body;
    const product = new Product({ name, category, images, image, description });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, category, images, image, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, images, image, description },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🚀 Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});