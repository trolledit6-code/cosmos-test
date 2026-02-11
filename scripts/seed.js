const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGODB_DB = process.env.MONGODB_DB || "cosmos";

const planets = [
  {
    name: "Mercury",
    summary: "The closest planet to the Sun and the smallest in the Solar System.",
    description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury receives about seven times as much sunlight as Earth.",
    distance: "57.9 million km",
    diameter: "4,880 km",
    orbit: "88 days",
    moons: 0,
    type: "Terrestrial",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg"
  },
  {
    name: "Venus",
    summary: "Second planet from the Sun, known for its thick, toxic atmosphere.",
    description: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasion, visible to the naked eye in broad daylight.",
    distance: "108.2 million km",
    diameter: "12,104 km",
    orbit: "225 days",
    moons: 0,
    type: "Terrestrial",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg"
  },
  {
    name: "Earth",
    summary: "Our home planet, the only known celestial body to support life.",
    description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. While large volumes of water can be found throughout the Solar System, only Earth sustains liquid surface water. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers.",
    distance: "149.6 million km",
    diameter: "12,742 km",
    orbit: "365.25 days",
    moons: 1,
    type: "Terrestrial",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
  },
  {
    name: "Mars",
    summary: "The Red Planet, known for its iron oxide surface and potential for past life.",
    description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'.",
    distance: "227.9 million km",
    diameter: "6,779 km",
    orbit: "687 days",
    moons: 2,
    type: "Terrestrial",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
  },
  {
    name: "Jupiter",
    summary: "The largest planet in the Solar System, a gas giant with a Great Red Spot.",
    description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined.",
    distance: "778.5 million km",
    diameter: "139,820 km",
    orbit: "12 years",
    moons: 79,
    type: "Gas Giant",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
  },
  {
    name: "Saturn",
    summary: "Known for its stunning ring system, it's the second largest planet.",
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.",
    distance: "1.4 billion km",
    diameter: "116,460 km",
    orbit: "29 years",
    moons: 82,
    type: "Gas Giant",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"
  },
  {
    name: "Uranus",
    summary: "An ice giant with a unique tilt, rotating on its side.",
    description: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn).",
    distance: "2.8 billion km",
    diameter: "50,724 km",
    orbit: "84 years",
    moons: 27,
    type: "Ice Giant",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg"
  },
  {
    name: "Neptune",
    summary: "The furthest known planet, an ice giant with strong winds.",
    description: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth.",
    distance: "4.5 billion km",
    diameter: "49,244 km",
    orbit: "165 years",
    moons: 14,
    type: "Ice Giant",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
  }
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(MONGODB_DB);
    const collection = db.collection('planets');

    // Create unique index on name to prevent duplicates
    await collection.createIndex({ name: 1 }, { unique: true });

    // Use bulkWrite for upserting
    const operations = planets.map(planet => ({
      updateOne: {
        filter: { name: planet.name },
        update: { $set: planet },
        upsert: true
      }
    }));

    await collection.bulkWrite(operations);

    console.log("Planets seeded successfully");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

seed();
