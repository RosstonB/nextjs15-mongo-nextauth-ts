import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import authOptions from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
// components
import { CardsSkeleton, InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/page-components/items/ItemsTable";
import { CreateUpdateItemForm } from "@/app/ui/page-components/items/CreateUpdateItemForm";
import CardWrapper from "@/app/ui/page-components/dashboard/cards";
// import { ItemForm } from "../../../components/ItemForm";
// data
import { getItems } from "@/app/actions";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const items = await getItems();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item Management Dashboard</h1>
      <p className="mb-4">Welcome, {session.user?.name}!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-2 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Create New Item</h2>
          <CreateUpdateItemForm />
        </div>
        <div>
          {/* <ItemForm /> */}
          <Suspense
            // key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            <Table />
          </Suspense>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Item List</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id} className="border p-2 rounded">
                <p className="font-semibold">
                  {item.name} <small>({item._id})</small>
                </p>
                <p className="text-sm text-gray-600">Type: {item.itemType}</p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </p>
                <CreateUpdateItemForm item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
