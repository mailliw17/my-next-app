export const getData = async (url: string) => {
  //API FROM MOCKOON
  // const res = await fetch(url, {
  //   cache: "no-store",
  // });

  // API FROM NEXTJS
  const res = await fetch(url, {
    next: {
      tags: ["collection"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
