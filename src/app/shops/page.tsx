import ProductSkeleton from "@/components/ProductSkeleton/ProductSkeleton";
import ProductCard from "@/components/Shop/Card/ProductCard";
import React, { Suspense } from "react";
import Strings from "@/utils/strings";

const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

async function getProduct() {
    try {
        let response;
        response = await fetch(`${PRODUCT_API}/api/v1/products`, {
            cache: "no-store",
        });

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

    if (res.error) {
        return (
            <div className="h-[44rem] w-full flex justify-center items-center">
                <h3 className="text-2xl">{res.error}</h3>
            </div>
        );
    }

    return (
        <section className="container m-auto flex justify-center">
            <div className=" p-4 flex gap-8 w-[70%] flex-wrap">
                {res.map((item: Product) => {
                    return (
                        <Suspense fallback={<ProductSkeleton />}>
                            <ProductCard key={item._id} data={item} />
                        </Suspense>
                    );
                })}
            </div>
        </section>
    );
}

export default page;
