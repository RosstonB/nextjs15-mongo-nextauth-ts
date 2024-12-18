import { Suspense } from "react";
import Link from "next/link";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/page-components/items/ItemsTable";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//
import { getServerSession } from "next-auth/next";
import authOptions from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getItems } from "@/app//actions";
import { CreateUpdateItemForm } from "@/app/ui/page-components/items/CreateUpdateItemForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const items = await getItems();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Items</h1>
      <p className="mb-4">Welcome, {session.user?.name}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-2 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Create New Item</h2>
          <CreateUpdateItemForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Item List</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id} className="border p-2 rounded">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Type: {item.itemType}</p>
                <p className="text-sm text-gray-600">
                  Location: {item.location}
                </p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </p>
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/dashboard/items/${item._id}/edit`}
                    className="rounded-md border p-2 hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5" />
                  </Link>
                </div>
                {/* <CreateUpdateItemForm item={item} /> */}
              </li>
            ))}
          </ul>
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
      </div>
    </div>
  );
}
