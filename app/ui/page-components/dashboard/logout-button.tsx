"use client";
import { signOut } from "next-auth/react";
import { PowerIcon } from "@heroicons/react/24/outline";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" }); // Redirects to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}
