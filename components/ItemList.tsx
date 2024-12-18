// "use client";

// import { useState } from "react";
// import { Item } from "../app/actions";
// import { ItemForm } from "./ItemForm";
// import { Button } from "@/components/ui/button";

// interface ItemListProps {
//   initialItems: Item[];
// }

// export function ItemList({ initialItems }: ItemListProps) {
//   const [items, setItems] = useState(initialItems);
//   const [selectedItem, setSelectedItem] = useState<Item | null>(null);

//   return (
//     <div>
//       <ul className="space-y-2">
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className="border p-2 rounded cursor-pointer hover:bg-gray-100"
//             onClick={() => setSelectedItem(item)}
//           >
//             <p className="font-semibold">{item.name}</p>
//             <p className="text-sm text-gray-600">Type: {item.itemType}</p>
//             <p className="text-xs text-gray-400">
//               Created: {new Date(item.createdAt).toLocaleString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//       {selectedItem && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Edit Item</h3>
//           <ItemForm item={selectedItem} />
//           <Button onClick={() => setSelectedItem(null)} className="mt-2">
//             Cancel Edit
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
