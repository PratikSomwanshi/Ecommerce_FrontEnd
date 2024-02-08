"use client";
import ProductCart from "@/components/Product/CartCard/ProductCart";
import CartProduct from "@/components/Product/CartProduct";
import useCart from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Cart {
    email: string;
}

function page() {
    let count = -1;
    const { USER_EMAIL, setCartCount, setCount } = useCart();

    const cartData = {
        email: USER_EMAIL,
    };

    if (!USER_EMAIL) {
        return (
            <h1 className="center__screen__text">Please login to view cart</h1>
        );
    }

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

    let data;
    if (mutation.isSuccess) {
        data = mutation.data.data[0];
        setCartCount({ count: data.cart_data.length });

        if (data.cart_data.length === 0) {
            return <h1 className="center__screen__text">Cart is empty</h1>;
        }
    }

    if (mutation.isSuccess) {
        return (
            <section className="container m-auto px-44 py-10 space-y-4 ">
                {data &&
                    data.cart_data.map((item: any) => {
                        count++;
                        return (
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <CartProduct
                                    count={count}
                                    data={item}
                                    key={item._id}
                                />
                            </Suspense>
                        );
                    })}
            </section>
        );
    }

    return <h1 className="center__screen__text">Please login to view cart</h1>;
}

export default page;
