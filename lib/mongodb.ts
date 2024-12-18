import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

if (!process.env.MONGODB_URI) {
  throw new Error("Invalid/Missing environment variable: MONGODB_URI");
}

const uri = process.env.MONGODB_URI;
const options = {};

// Declare MongoClient and its promise
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use global variable in development to prevent multiple connections
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const hashedPassword = await hash(password, 10);
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
  });
  return result;
}
