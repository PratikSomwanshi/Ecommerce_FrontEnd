"use client";
import useCart from "@/store/store";
import { Button } from "@nextui-org/react";
import axios from "axios";
import React from "react";

function CartBtn(props: { id: string }) {
    const { addCount, USER_EMAIL } = useCart();
    async function addToCart() {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/users/cart`,
                {
                    email: USER_EMAIL,
                    productId: props.id,
                }
            );

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-xl rounded-full
            w-80 h-16
            "
            onClick={() => {
                addCount();
                addToCart();
            }}>
            Add to Cart
        </Button>
    );
}

export default CartBtn;
