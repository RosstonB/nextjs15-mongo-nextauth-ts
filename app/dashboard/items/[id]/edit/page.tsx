import { CreateUpdateItemForm } from "@/app/ui/page-components/items/CreateUpdateItemForm";
import Breadcrumbs from "@/app/ui/page-components/items/breadcrumbs";
import { getItemById } from "@/app/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Item",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // const [itemData, customerData] = await Promise.all([
  //   getItemById(id),
  //   fetchCustomers(),
  // ]);

  const [itemData] = await Promise.all([getItemById(id)]);
  const item = JSON.parse(JSON.stringify(itemData));

  // console.log(itemData);
  // console.log(customerData);

  // if (!itemData) {
  //   notFound();
  // }

  // const item = JSON.parse(JSON.stringify(itemData));
  // const customers = JSON.parse(JSON.stringify(customerData));

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Items", href: "/dashboard/items" },
          {
            label: "Edit Item",
            href: `/dashboard/items/${id}/edit`,
            // href: `/dashboard/items`,
            active: true,
          },
        ]}
      />
      Edit Form goes here
      <br />
      {/* Item ID: {item._id}
      <Form item={item} customers={customers} /> */}
      <CreateUpdateItemForm item={item} />
    </main>
  );
}
