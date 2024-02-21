import ProductCard from "@/components/Shop/Card/ProductCard";
import React from "react";
import Strings from "@/utils/strings";

const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

interface Product {
    _id: string;
    name: string;
    price: Number;
    image: string;
    description: string;
    category: string;
}

async function getWomensProducts() {
    try {
        const response = await fetch(
            `${PRODUCT_API}/api/v1/products/?category=women`,
            { cache: "no-store" }
        );

        if (response.ok) {
            const res = await response.json();
            return res.data;
        }
    } catch (error) {
        return {
            error: Strings.FAILED_DATA,
        };
    }
}

async function page() {
    const response = await getWomensProducts();

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
                {response &&
                    response.map((item: Product) => {
                        return <ProductCard key={item._id} data={item} />;
                    })}
            </div>
        </section>
    );
}

export default page;
