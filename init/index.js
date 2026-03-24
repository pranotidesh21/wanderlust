require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const categories = ["Trending", "Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"];
  const data = initData.data.map((obj, i) => ({
    ...obj,
    geometry: { type: "Point", coordinates: [0, 0] },
    category: categories[i % categories.length],
  }));
  await Listing.insertMany(data);
  console.log("data was initialized");
};

initDB();