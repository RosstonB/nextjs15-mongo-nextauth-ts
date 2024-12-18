import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
// types / interfaces
import { Item } from "@/lib/definitions";
// cache / nagigation
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

/////////// FETCH / GET /////////////
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

// Fetch all items document count - more elegant than below - using $facet
// Fetch all items document count
export async function fetchCardData(): Promise<{
  numberOfAllItems: number;
  numberOfTypeAItems: number;
  numberOfTypeBItems: number;
  numberOfTypeCItems: number;
}> {
  try {
    const client = await clientPromise;
    const db = client.db("your_database_name");

    // Aggregation with $facet to consolidate multiple counts
    const aggregationResult = await db
      .collection<Item>("items")
      .aggregate([
        {
          $facet: {
            totalAllItems: [{ $count: "count" }],
            totalTypeAItems: [
              { $match: { itemType: "A" } },
              { $count: "count" },
            ],
            totalTypeBItems: [
              { $match: { itemType: "B" } },
              { $count: "count" },
            ],
            totalTypeCItems: [
              { $match: { itemType: "C" } },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            numberOfAllItems: { $arrayElemAt: ["$totalAllItems.count", 0] },
            numberOfTypeAItems: { $arrayElemAt: ["$totalTypeAItems.count", 0] },
            numberOfTypeBItems: { $arrayElemAt: ["$totalTypeBItems.count", 0] },
            numberOfTypeCItems: { $arrayElemAt: ["$totalTypeCItems.count", 0] },
          },
        },
      ])
      .toArray();

    const result = aggregationResult[0];

    return {
      numberOfAllItems: result.numberOfAllItems ?? 0,
      numberOfTypeAItems: result.numberOfTypeAItems ?? 0,
      numberOfTypeBItems: result.numberOfTypeBItems ?? 0,
      numberOfTypeCItems: result.numberOfTypeCItems ?? 0,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

// Fetch all items document count
// export async function fetchCardData(): Promise<{
//   numberOfAllItems: number;
//   numberOfTypeAItems: number;
//   numberOfTypeBItems: number;
//   numberOfTypeCItems: number;
// }> {
//   try {
//     const client = await clientPromise;
//     const db = client.db("your_database_name");

//     // ALL ITEMS - Count
//     const allItemsResult = await db
//       .collection<Item>("items")
//       .aggregate([{ $count: "totalAllItems" }], {})
//       .toArray();
//     const numberOfAllItems: number = allItemsResult[0]?.totalAllItems ?? 0;

//     // ITEMS TYPE A - Count
//     const itemsTypeAResult = await db
//       .collection<Item>("items")
//       .aggregate(
//         [{ $match: { itemType: "A" } }, { $count: "totalTypeAItems" }],
//         {}
//       )
//       .toArray();
//     const numberOfTypeAItems: number =
//       itemsTypeAResult[0]?.totalTypeAItems ?? 0;

//     // ITEMS TYPE B - Count
//     const itemsTypeBResult = await db
//       .collection<Item>("items")
//       .aggregate(
//         [{ $match: { itemType: "B" } }, { $count: "totalTypeBItems" }],
//         {}
//       )
//       .toArray();
//     const numberOfTypeBItems: number =
//       itemsTypeBResult[0]?.totalTypeBItems ?? 0;

//     // ITEMS TYPE C - Count
//     const itemsTypeCResult = await db
//       .collection<Item>("items")
//       .aggregate(
//         [{ $match: { itemType: "C" } }, { $count: "totalTypeCItems" }],
//         {}
//       )
//       .toArray();
//     const numberOfTypeCItems: number =
//       itemsTypeCResult[0]?.totalTypeCItems ?? 0;

//     return {
//       numberOfAllItems,
//       numberOfTypeAItems,
//       numberOfTypeBItems,
//       numberOfTypeCItems,
//     };
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// // import { ObjectId } from "mongodb";
// // import { formatCurrency } from "./utils";
// // //
// // import client from "./mongoClient";
// // import { testDatabaseConnection } from "./actions";
// // //
// // import {
// //   CustomerField,
// //   CustomersTableType,
// //   InvoiceForm,
// //   InvoicesTable,
// //   LatestInvoiceRaw,
// //   Revenue,
// // } from "./definitions";
// // // import { type } from "os";

// // // Define types for data

// // interface Item {
// //   _id: ObjectId;
// //   name: string;
// //   type: "A" | "B" | "C" | string;
// //   date: Date;
// // }

// // // const dbName = "nextjs-dashboard";
// // const dbName = "your_database_name";

// // async function connectToDB() {
// //   const isConnected = await testDatabaseConnection();

// //   if (!isConnected) {
// //     await client.connect();
// //   }
// //   return client.db(dbName);
// // }

// // // Fetch all items
// // export async function fetchItems(): Promise<Item[]> {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const itemData = await db.collection<Item>("items").find().toArray();

// //     return itemData;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// // // Fetch Item By ID (_id)
// // export async function fetchItemById(id: string) {
// //   try {
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const itemData = await db
// //       .collection<Item>("items")
// //       .findOne({ _id: new ObjectId(id) });
// //     // .toArray();

// //     return itemData;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch invoice.");
// //   }
// // }

// export async function fetchItemById(id: string) {
//   try {
//     console.log("start fetchItemById - itemId: " + id);
//     const itemData = "Nothing here";
//     return itemData;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch item by id.");
//   }
// }

// // // Get filtered Items - pagination
// // const ITEMS_PER_PAGE = 5;
// // export async function fetchFilteredItems(query: string, currentPage: number) {
// //   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

// //   try {
// //     const db = await connectToDB();
// //     const filteredItemsData = await db
// //       .collection<Item>("items")
// //       .find()
// //       .toArray();

// //     return filteredItemsData;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch filtered items.");
// //   }
// // }
// // /////////
// // // Fetch all items document count
// // export async function fetchCardData(): Promise<Item[]> {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const itemData: Number = await db
// //       .collection<Item>("items")
// //       // .aggregate([{ $match: { type: "A" } }])
// //       .countDocuments();

// //     return { itemData };
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// export async function fetchCardData(): Promise<string> {
//   try {
//     console.log("start fetchCardData");
//     const itemData = "No card data here";
//     return itemData;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// // export async function fetchMongoCardData() {
// //   try {
// //     // You can probably combine these into a single SQL query
// //     // However, we are intentionally splitting them to demonstrate
// //     // how to initialize multiple queries in parallel with JS.
// //     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
// //     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
// //     const invoiceStatusPromise = sql`SELECT
// //          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
// //          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
// //          FROM invoices`;

// //     const data = await Promise.all([
// //       invoiceCountPromise,
// //       customerCountPromise,
// //       invoiceStatusPromise,
// //     ]);

// //     const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
// //     const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
// //     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
// //     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

// //     return {
// //       numberOfCustomers,
// //       numberOfInvoices,
// //       totalPaidInvoices,
// //       totalPendingInvoices,
// //     };
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch card data.");
// //   }
// // }

// // export async function fetchCardDataByType(): Promise<Item[]> {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const itemData = await db
// //       .collection<Item>("items")
// //       // .aggregate([{ $match: { type: "A" } }])
// //       .countDocuments();

// //     return { itemData };
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// // // Fetch all items
// // export async function fetchCustomers(): Promise<Customer[]> {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const customerData = await db
// //       .collection<Item>("customers")
// //       .find()
// //       .toArray();

// //     return customerData;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// export async function fetchCustomers(): Promise<void> {
//   try {
//     console.log("start fetchCustomers");

//     return;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch customer data.");
//   }
// }

// // //////////////////////////////
// // //////////////////////////////
// // //////////////////////////////
// // //////////////////////////////

// // export async function fetchCardDataOLD() {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     // const itemData = await db.collection<Item>("items").find().toArray();
// //     // const itemCountPromise = await db.collection<Item>("items").aggregate[
// //     //   { $match: {} }
// //     // ];
// //     const totalItemsCountA = db.items.find({ type: "A" }).countDocuments();
// //     return totalItemsCountA;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// // export async function fetchCountA() {
// //   try {
// //     // await new Promise((resolve) => setTimeout(resolve, 3000));

// //     // const db = await connectToDB();
// //     const mongoClient = await client.connect();
// //     const db = mongoClient.db(dbName);
// //     const itemACountData = await db
// //       .collection<Item>("items")
// //       .find({ type: "A" })
// //       .toArray();

// //     console.log(itemACountData);

// //     return itemACountData;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch revenue data.");
// //   }
// // }

// // /////////////////////
// // // try {
// // //   // You can probably combine these into a single SQL query
// // //   // However, we are intentionally splitting them to demonstrate
// // //   // how to initialize multiple queries in parallel with JS.
// // //   // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
// // //   // const invoiceStatusPromise = sql`SELECT
// // //   //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
// // //   //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
// // //   //      FROM invoices`;

// // //   const data = await Promise.all([
// // //     itemCountPromise,
// // //     // customerCountPromise,
// // //     // invoiceStatusPromise,
// // //   ]);

// // //   const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
// // //   const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
// // //   const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
// // //   const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

// // //   return {
// // //     numberOfCustomers,
// // //     numberOfInvoices,
// // //     totalPaidInvoices,
// // //     totalPendingInvoices,
// // //   };
// // // } catch (error) {
// // //   console.error("Database Error:", error);
// // //   throw new Error("Failed to fetch card data.");
// // // }

// // // Invoices pages for Pagination
// // // export async function fetchItemsPages(query: string) {
// // //   try {
// // //     const count = await sql`SELECT COUNT(*)
// // //     FROM invoices
// // //     JOIN customers ON invoices.customer_id = customers.id
// // //     WHERE
// // //       customers.name ILIKE ${`%${query}%`} OR
// // //       customers.email ILIKE ${`%${query}%`} OR
// // //       invoices.amount::text ILIKE ${`%${query}%`} OR
// // //       invoices.date::text ILIKE ${`%${query}%`} OR
// // //       invoices.status ILIKE ${`%${query}%`}
// // //   `;

// // //     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
// // //     return totalPages;
// // //   } catch (error) {
// // //     console.error("Database Error:", error);
// // //     throw new Error("Failed to fetch total number of invoices.");
// // //   }
// // // }
