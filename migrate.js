
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyBMdaglKn1QSbS4boIz2DLZwhr0_ApYqEk",
  authDomain: "multirising-exports.firebaseapp.com",
  projectId: "multirising-exports",
  storageBucket: "multirising-exports.appspot.com",
  messagingSenderId: "914118764504",
  appId: "1:914118764504:web:41a9f2b53e5957cf0f34ad",
  measurementId: "G-7XBMFYP3G9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Initialize MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

// Schemas & Models
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

async function runMigration() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Migrate Admin Login
    console.log("Migrating Admin credentials...");
    const adminSnapshot = await getDocs(collection(db, "admin"));
    for (const docSnap of adminSnapshot.docs) {
      const data = docSnap.data();
      await Admin.updateOne(
        { id: data.id },
        { password: data.password },
        { upsert: true }
      );
      console.log(`- Migrated admin user: ${data.id}`);
    }

    // 2. Migrate Admin Profile
    console.log("Migrating Admin Profile...");
    const profileRef = doc(db, "admin_profile", "profile");
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      const data = profileSnap.data();
      await AdminProfile.updateOne(
        {},
        {
          adminName: data.adminName || "Admin User",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || ""
        },
        { upsert: true }
      );
      console.log("- Migrated admin profile");
    }

    // 3. Migrate Categories
    console.log("Migrating Categories...");
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    for (const docSnap of categoriesSnapshot.docs) {
      const data = docSnap.data();
      if (!data.name) continue;
      await Category.updateOne(
        { name: data.name },
        {
          image: data.image || "",
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
        },
        { upsert: true }
      );
      console.log(`- Migrated category: ${data.name}`);
    }

    // 4. Migrate Products
    console.log("Migrating Products...");
    const productsSnapshot = await getDocs(collection(db, "products"));
    for (const docSnap of productsSnapshot.docs) {
      const data = docSnap.data();
      if (!data.name || !data.category) continue;
      await Product.updateOne(
        { name: data.name, category: data.category },
        {
          images: data.images || [],
          image: data.image || "",
          description: data.description || "",
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
        },
        { upsert: true }
      );
      console.log(`- Migrated product: ${data.name}`);
    }

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runMigration();
