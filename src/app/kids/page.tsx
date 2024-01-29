import ProductCard from "@/components/Shop/Card/ProductCard";
import axios from "axios";
import React from "react";

interface Product {
    _id: string;
    name: string;
    price: Number;
    image: string;
    description: string;
    category: string;
}

async function getMensProducts() {
    let response;
    response = await fetch(
        "http://localhost:5000/api/v1/products/?category=kids",
        {
            cache: "no-store",
        }
    );

    if (response.ok) {
        const res = await response.json();
        console.log(res.data);
        return res.data;
    }

    return {
        error: "Failed to fetch the data",
    };
}

async function page() {
    const response = await getMensProducts();

    if (response.error) {
        return (
            <div className="h-[44rem] w-full flex justify-center items-center">
                <h3 className="text-2xl">{response.error}</h3>
            </div>
        );
    }

    return (
        <section className="container m-auto flex justify-center">
            <div className=" p-4 flex gap-8 w-[70%] flex-wrap">
                {response.map((item: Product) => {
                    return <ProductCard key={item._id} data={item} />;
                })}
            </div>
        </section>
    );
}

export default page;
