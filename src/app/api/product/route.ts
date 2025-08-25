import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { getData } from "@/services/products";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    title: "Lotso",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/21f56016-2e59-4392-b80f-c9440573f798/vaporfly-4-road-racing-shoes-PTwDtp.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Bear",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/d16d5396-b678-4c4b-8b71-4d9d591912e2/air-max-tl-2-5-shoes-7PdW4h.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Bear 2",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/01870679-4366-4262-a6e8-f2b8a52860f0/vomero-18-road-running-shoes-r8NUvicZ.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await retrieveDataById("products", id);

    if (product) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: product,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Not found",
        product: [],
      });
    }
  }
  const products = await retrieveData("products");
  return NextResponse.json({
    status: 200,
    message: "Success",
    data: products,
  });
}
