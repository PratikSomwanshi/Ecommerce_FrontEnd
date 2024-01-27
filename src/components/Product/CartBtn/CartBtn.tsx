"use client";
import useCart from "@/store/store";
import { Button } from "@nextui-org/react";
import React from "react";

function CartBtn() {
    const { addCount } = useCart();
    return (
        <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-xl rounded-full
            w-80 h-16
            "
            onClick={() => {
                addCount();
            }}>
            Add to Cart
        </Button>
    );
}

export default CartBtn;
