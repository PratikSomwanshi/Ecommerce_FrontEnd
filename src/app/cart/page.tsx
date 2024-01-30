"use client";
import ProductCart from "@/components/Product/CartCard/ProductCart";
import useCart from "@/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Cart {
    email: string;
}

function page() {
    let count = -1;
    const { USER_EMAIL } = useCart();

    const cartData = {
        email: USER_EMAIL,
    };
    const mutation = useMutation({
        mutationFn: async (newTodo: Cart) => {
            return await fetch("http://localhost:8000/api/v1/users/cart", {
                method: "POST",
                next: { revalidate: 1 },
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            }).then((res) => res.json());
        },
    });

    useEffect(() => {
        mutation.mutate(cartData);
    }, []);

    if (mutation.isSuccess) {
        return (
            <section className="container m-auto px-44 py-10 space-y-4 bg-slate-200">
                {mutation.data.data.map((item: any) => {
                    count++;
                    return <ProductCart id={item} count={count} />;
                })}
            </section>
        );
    }
}

export default page;
