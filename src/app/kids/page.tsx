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
    const response = await fetch(
        "http://localhost:5000/api/v1/products/?category=kids",
        { cache: "no-store" }
    );

    if (response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function page() {
    const response = await getMensProducts();
    return (
        <section className="container m-auto flex justify-center">
            <div className=" p-4 flex gap-8 w-[70%] flex-wrap">
                {response ? (
                    response.map((item: Product) => {
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
