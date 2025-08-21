import { getData } from "@/services/products";

export default async function DetailProductData(props: any) {
  const { params } = props;
  const data = await getData(
    "http://localhost:3000/api/product/?id=" + params.id
  );

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <img
          src={data.detailProduct.image}
          alt=""
          className="w-full object-cover aspect-square col-span-2"
        />
        <div className="bg-white p-4 px-6">
          <h3>{data.title}</h3>
          <p>Price : $ {data.detailProduct.price}</p>
        </div>
      </div>
    </div>
  );
}
