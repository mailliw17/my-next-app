"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        //get the value by "name" in html structure
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (res.status === 200) {
      e.target.reset(); //empty the form
      setIsLoading(false);
      push("/login");
    } else {
      setError("Email Already Exist");
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-100 flex justify-center items-center flex-col">
      {error !== "" && <div className="text-red-600">{error}</div>}
      <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="text-center">
            <Link
              href="/login"
              className="text-blue-700 hover:underline dark:blue-text-500"
            >
              LOGIN
            </Link>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
