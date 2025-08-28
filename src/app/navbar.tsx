"use client";

import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <nav className="flex bg-gray-800 py-2 px-5 justify-between items-center">
      <h1 className="text-white">Navbar</h1>

      <div className="flex">
        <ul className="flex ml-5">
          <Link href="/">
            <li
              className={`mr-3 ${
                pathname === "/" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              Home
            </li>
          </Link>

          <Link href="/about">
            <li
              className={`mr-3 ${
                pathname === "/about" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              About
            </li>
          </Link>

          <Link href="/about/profile">
            <li
              className={`mr-3 ${
                pathname === "/about/profile" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              Profile
            </li>
          </Link>

          <Link href="/product">
            <li
              className={`mr-3 ${
                pathname === "/product" ? "text-blue-300" : "text-white"
              } cursor-pointer`}
            >
              Products
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center">
        {/* User info if logged in */}
        {isLoggedIn && (
          <div className="flex items-center mr-4">
            <div className="text-white text-sm mr-2">
              <span className="font-semibold">
                {session.user?.fullname || session.user?.name}
              </span>
              {session.user?.role && (
                <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full ml-2">
                  {session.user.role}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Conditional Login/Logout button */}
        {isLoggedIn ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 text-sm h-7 cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-white hover:bg-gray-100 rounded-md px-3 text-sm h-7 cursor-pointer transition-colors"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
