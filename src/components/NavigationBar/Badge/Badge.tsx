"use client";
import { useState } from "react";
import { Badge as Bad } from "@nextui-org/react";
import { TbShoppingCart } from "react-icons/tb";

function Badge() {
    const [isInvisible, setIsInvisible] = useState(false);
    return (
        <Bad
            content={5}
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
