"use client";
import { useState } from "react";
import { Badge as Bad } from "@nextui-org/react";
import { TbShoppingCart } from "react-icons/tb";
import useCart from "@/store/store";

function Badge() {
    const { CART } = useCart();
    const [isInvisible, setIsInvisible] = useState(false);

    if (CART == 0) {
        return <TbShoppingCart size="26px" />;
    }

    return (
        <Bad
            content={CART}
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
