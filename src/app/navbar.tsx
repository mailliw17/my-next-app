"use client";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="flex bg-gray-800 py-2 px-5 justify-between">
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
      <div>
        <button
          className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
