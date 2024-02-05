"use client";
import ProductCart from "@/components/Product/CartCard/ProductCart";
import useCart from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Cart {
    email: string;
}

function page() {
    let count = -1;
    const { USER_EMAIL, setCartCount, setCount } = useCart();

    const cartData = {
        email: USER_EMAIL,
    };

    console.log(cartData);

    let mutation = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            return await fetch("http://localhost:8000/api/v1/users/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartData),
            }).then((res) => res.json());
        },
    });

    console.log(mutation.data);

    if (mutation.isSuccess) {
        // console.log(mutation.data.data.length);
        setCartCount({ count: mutation.data.data.length });
        return (
            <section className="container m-auto px-44 py-10 space-y-4 ">
                {mutation.data.data.map((item: any) => {
                    count++;
                    return <ProductCart id={item} count={count} />;
                })}
            </section>
        );
    }

    return <h1 className="center__screen__text">Please login to view cart</h1>;
}

export default page;
