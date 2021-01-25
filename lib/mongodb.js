import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection && cachedConnection.readyState) {
    console.log("✔️ Using Cached Connection to MonogDB");
    return cachedConnection;
  }
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
  try {
    console.log("⚠ New Connection to MonogDB");

    const mongooseConnectionObject = await mongoose.connect(MONGODB_URI, opts);
    const connection = mongooseConnectionObject.connections[0];

    cachedConnection = connection;
    return connection;
  } catch (err) {
    console.log(err);
  }
}

/**
 * useNewUrlParser
 * The underlying MongoDB driver has deprecated their current connection
 * string parser; because this is a major change, they added the
 * useNewUrlParser flag to allow users to
 * fallback to the old parser if they find a bug in the new parser.
 */
