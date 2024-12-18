"use client";

import { useState, useRef } from "react";
// actions
import { createItem, updateItem, deleteItem } from "@/app/actions";
// types / interfaces
import { Item } from "@/lib/definitions";
// components
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { Checkbox } from "@/app/ui/components/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/ui/components/alert-dialog";

interface ItemFormProps {
  item?: Item;
}

export function CreateUpdateItemForm({ item }: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Ensure checkbox value is correctly handled
    const checkboxValue = formData.get("completed") === "on" ? "true" : "false";
    formData.set("completed", checkboxValue);

    try {
      if (item) {
        await updateItem(null, formData, item._id); // Update logic remains unchanged
      } else {
        await createItem(null, formData);

        // Clear the form after successful item creation
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    setLoading(true);
    setError(null);

    try {
      await deleteItem(item._id);
    } catch (err) {
      setError("Failed to delete the item. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={item?.name || ""}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="itemType">Item Type</Label>
        <Input
          id="itemType"
          name="itemType"
          defaultValue={item?.itemType || ""}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="description">Item Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label> {/* Added field */}
        <Input
          id="location"
          name="location"
          defaultValue={item?.location || ""}
          required
          disabled={loading}
        />
      </div>
      <div className="flex space-x-2 items-center">
        <Checkbox
          id="completed"
          name="completed"
          defaultChecked={item?.completed || false} // Initialize checkbox state
          disabled={loading}
        />
        <label
          htmlFor="completed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Did it?
        </label>
      </div>
      <div className="flex space-x-2">
        <Button type="submit" disabled={loading}>
          {item ? "Update" : "Create"} Item
        </Button>
        {item && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="destructive" disabled={loading}>
                Delete Item
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
