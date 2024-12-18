"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Item } from "@/lib/definitions";

/////////// GET /////////////
export async function getItems(): Promise<Item[]> {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const items = await db.collection("items").find({}).toArray();

  return items.map((item) => ({
    _id: item._id.toString(),
    id: item.id ?? "",
    name: item.name ?? "",
    itemType: item.itemType ?? "",
    description: item.description ?? "",
    location: item.location ?? "", // Added field
    completed: item.completed ?? false,
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
  }));
}

// Fetch Item By ID (_id)
export async function getItemById(id: string): Promise<Item | null> {
  try {
    const client = await clientPromise;
    const db = client.db("your_database_name");

    // Find the document using ObjectId
    const result = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return null; // Return null if no document is found
    }

    // Convert the `_id` field from ObjectId to string
    return {
      _id: result._id.toString(), // Convert ObjectId to string
      id: result._id.toString(),
      name: result.name || "",
      itemType: result.itemType || "",
      description: result.description || "",
      location: result.location || "",
      completed: result.completed ?? false,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : new Date(),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item by id.");
  }
}

///////////// MUTATE ///////////////
export async function createItem(
  prevState: any,
  formData: FormData
): Promise<Item> {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const now = new Date();
  // Convert the `completed` field to a boolean
  const completed = formData.get("completed") === "true";

  const result = await db.collection("items").insertOne({
    name: formData.get("name"),
    itemType: formData.get("itemType"),
    description: formData.get("description"),
    location: formData.get("location"), // Added field
    completed: completed,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/dashboard/items");
  return {
    _id: result.insertedId.toString(),
    id: result.insertedId.toString(),
    name: formData.get("name") as string,
    itemType: formData.get("itemType") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string, // Added field
    completed,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateItem(
  prevState: any,
  formData: FormData,
  id: string
): Promise<Item> {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const now = new Date();
  // Convert the `completed` field to a boolean
  const completed = formData.get("completed") === "true";

  const result = await db.collection("items").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: formData.get("name"),
        itemType: formData.get("itemType"),
        description: formData.get("description"),
        location: formData.get("location"), // Added field
        completed: completed,
        updatedAt: now,
      },
    },
    { returnDocument: "after" }
  );
  revalidatePath("/dashboard/items");

  return {
    _id: result?.value?._id.toString() || "",
    id: result?.value?._id.toString() || "",
    name: result?.value?.name || "",
    itemType: result?.value?.itemType || "",
    description: result?.value?.description || "",
    location: result?.value?.location || "", // Added field
    completed: result?.value?.completed || false,
    createdAt: result?.value?.createdAt
      ? new Date(result?.value.createdAt)
      : new Date(),
    updatedAt: result?.value?.updatedAt
      ? new Date(result?.value.updatedAt)
      : now,
  };
}

export async function deleteItem(id: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  await db.collection("items").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/dashboard/items");
  redirect("/dashboard/items");
}
