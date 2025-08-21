"use client";

export default function AdminProductPage() {
  const revalidate = async () => {
    await fetch(
      "http://localhost:3000/api/revalidate?tag=collection&secret=123456",
      {
        method: "POST",
      }
    );
  };

  return (
    <div>
      <button className="bg-red-600 my-3" onClick={() => revalidate()}>
        Revalidate
      </button>
    </div>
  );
}
