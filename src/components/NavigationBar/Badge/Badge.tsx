"use client";
import { useState } from "react";
import { Badge as Bad } from "@nextui-org/react";
import { TbShoppingCart } from "react-icons/tb";
import useCart from "@/store/store";

function Badge() {
    const { CART_COUNT } = useCart();
    const [isInvisible, setIsInvisible] = useState(false);
    return (
        <Bad
            content={CART_COUNT}
            variant="shadow"
            color="danger"
            isInvisible={isInvisible}
            shape="circle"
            size="md">
            <TbShoppingCart size="26px" />
        </Bad>
    );
}

export default Badge;
