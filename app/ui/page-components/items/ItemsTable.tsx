import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import { getItems } from "../../../actions";

export default async function ItemsTable({}: // query,
// currentPage,
{
  // query: string;
  // currentPage: number;
}) {
  // const items = await fetchItems(query, currentPage);
  const itemData = await getItems();
  const items = JSON.parse(JSON.stringify(itemData));

  return (
    <div className=" flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="border rounded-lg bg-gray-50 p-2 ">
          <h2 className="text-xl font-semibold mb-2">Items Table</h2>
          {/* <div className="md:hidden">
            {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={item.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${item.name}'s profile picture`}
                      />
                      <p>{item.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                  <ItemStatus status={item.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(item.amount)}
                    </p>
                    <p>{formatDateToLocal(item.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateItem id={item.id} />
                    <DeleteItem id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-bold sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-bold">
                  Type
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th> */}
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map(
                (
                  item: {
                    name: string;
                    itemType: string;
                  },
                  idx: Key | null | undefined
                ) => (
                  <tr
                    // key={item.id}
                    key={idx}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                        src={item.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${item.name}'s profile picture`}
                      /> */}
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {item.itemType}
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-3">{item.email}</td> */}
                    {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(item.amount)}
                  </td> */}
                    {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(item.date)}
                  </td> */}
                    {/* <td className="whitespace-nowrap px-3 py-3">
                    <ItemStatus status={item.status} />
                  </td> */}
                    {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateItem id={item._id} />
                      <DeleteItem id={item._id} />
                    </div>
                  </td> */}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
