/**
 * Califnco Firestore Product Seeder
 * Uploads all 52 water purifier products from data/products.json to Cloud Firestore.
 * 
 * Usage:
 *   1. Place your serviceAccountKey.json in this directory
 *   2. Run: node firebase/seed_firestore.js
 */

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

console.log(`Loaded ${products.length} products to seed.`);

// Check if firebase-admin is available or if serviceAccountKey.json exists
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.log(`
[INFO] 'serviceAccountKey.json' not found in firebase/ folder.
To seed directly into live Cloud Firestore:
  1. Download your service account private key from:
     Firebase Console -> Project Settings -> Service accounts -> Generate new private key
  2. Save it as: firebase/serviceAccountKey.json
  3. Run: npm install firebase-admin && node firebase/seed_firestore.js

In offline/demo mode, the mobile app and admin panel seamlessly load data/products.json locally!
`);
  process.exit(0);
}

try {
  const admin = require('firebase-admin');
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  async function seed() {
    console.log('Starting batch upload to Firestore collection: "products"...');
    const batch = db.batch();

    products.forEach((product) => {
      const docRef = db.collection('products').doc(product.id);
      batch.set(docRef, {
        ...product,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });

    await batch.commit();
    console.log(`✅ Successfully seeded ${products.length} products to Firestore!`);
    process.exit(0);
  }

  seed().catch(err => {
    console.error('Error seeding products:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Error initializing Firebase Admin:', err.message);
  console.log('Run `npm install firebase-admin` in this directory if not installed.');
}
