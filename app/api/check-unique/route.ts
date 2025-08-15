import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({
    $or: [{ name }, { email }],
  });

  if (existingUser) {
    return res
      .status(200)
      .json({ unique: false, error: "Email or name already exists." });
  }

  return res.status(200).json({ unique: true });
}
