// uploadProducts.js

const admin = require("firebase-admin");
const data = require("./data/data.json");
const serviceAccount = require("./serviceAccountKey.json");
 // Make sure this file exists and has correct credentials

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const uploadData = async () => {
  const products = data.products;

  const batch = db.batch();

  products.forEach((product) => {
    const productRef = db.collection("products").doc(); // Auto-generate ID
    batch.set(productRef, product);
  });

  try {
    await batch.commit();
    console.log("✅ All products uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading products:", error);
  }
};

uploadData();
