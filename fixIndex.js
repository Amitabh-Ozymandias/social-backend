import mongoose from "mongoose";

async function fixIndex() {
  await mongoose.connect("mongodb://localhost:27017/social");
  const db = mongoose.connection.db;

  try {
    await db.collection("users").dropIndex("userName_1");
    console.log("Corrupted index dropped!");
  } catch (err) {
    console.log("No index to drop or error:", err.message);
  }

  await mongoose.disconnect();
}

fixIndex();
