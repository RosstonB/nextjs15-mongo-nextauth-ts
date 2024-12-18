// import Form from "@/app/ui/items/create-form";
import Breadcrumbs from "@/app/ui/page-components/items/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Item",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Items", href: "/dashboard/items" },
          {
            label: "Create Item",
            href: "/dashboard/items/create",
            active: true,
          },
        ]}
      />
      <div>form goes here</div>
      {/* <Form /> */}
    </main>
  );
}
