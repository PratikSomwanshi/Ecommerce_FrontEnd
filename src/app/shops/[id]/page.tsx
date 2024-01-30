import CartBtn from "@/components/Product/CartBtn/CartBtn";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import React from "react";

async function getProduct(id: string) {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/v1/products/${id}`
        );

        return response.data.data;
    } catch (error) {}
}

async function page({ params }: { params: { id: string } }) {
    const data = await getProduct(params.id);
    return (
        <section className="px-8 py-4 flex ">
            <div
                className="p-2 rounded-md h-[36rem] max-w-[42rem] min-w-[36rem] flex justify-center items-center bg-slate-50
            hover:bg-slate-100 hover:shadow-lg 
            
            transition duration-300 ease-in-out
            ">
                <img
                    alt=""
                    src={data.image}
                    className="h-[35rem] hover:scale-105 rounded-md
                    transition duration-300 ease-in-out
                    "
                />
            </div>
            <div className="px-10  flex flex-col justify-center">
                <div className="space-x-2 space-y-4">
                    <h1 className="text-4xl font-normal space-y-16 ">
                        {data.name}
                    </h1>
                    <p className="text-4xl font-semibold  ">
                        &#x20B9;{data.price}
                    </p>
                    <p className="text-2xl font-normal">
                        category : {data.category}
                    </p>
                    <p className="text-2xl font-normal">{data.description}</p>
                </div>
                <div className="mt-10">
                    <CartBtn />
                </div>
            </div>
        </section>
    );
}

export default page;
