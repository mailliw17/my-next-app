"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AdminProductPage() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const revalidate = async () => {
    await fetch(
      "http://localhost:3000/api/revalidate?tag=collection&secret=123456",
      {
        method: "POST",
      }
    );
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo and nav links */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                Admin Dashboard
              </span>
              <div className="ml-6">
                <Link
                  href="/dashboard/product"
                  className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100"
                >
                  Products
                </Link>
              </div>
            </div>

            {/* User info and logout */}
            <div className="flex items-center">
              <div className="mr-4 text-sm font-medium text-gray-700">
                Welcome,{" "}
                {session?.user?.fullname || session?.user?.name || "Admin"}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Products Dashboard</h1>
          <p className="mb-4">
            Logged in as:{" "}
            <span className="font-semibold">{session?.user?.email}</span>
          </p>
          <button
            onClick={() => revalidate()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Revalidate
          </button>
        </div>
      </div>
    </div>
  );
}
