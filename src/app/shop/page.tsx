import ProductCard from "@/components/Shop/Card/ProductCard";
import axios from "axios";
import Error from "next/error";
import React from "react";

async function getProduct() {
    try {
        const response = await axios.get(
            "http://localhost:5000/api/v1/products"
        );

        return response.data.data;

        console.log(response.data.data);
    } catch (error) {
        console.log(error);
        return "something went wrong";
    }
}

interface Product {
    _id: string;
    name: string;
    price: Number;
    image: string;
    description: string;
    category: string;
}

async function page() {
    const res = await getProduct();
    return (
        <section className="container m-auto flex justify-center">
            <div className=" p-4 flex gap-8 w-[70%] flex-wrap">
                {res ? (
                    res.map((item: Product) => {
                        return <ProductCard key={item._id} data={item} />;
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </section>
    );
}

export default page;
