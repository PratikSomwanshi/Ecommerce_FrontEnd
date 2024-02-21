import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartProduct from "../CartProduct";

const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

function ProductCart(props: { id: string; count: number }) {
    const { isSuccess, data } = useQuery({
        queryKey: [`repoData${props.id}`],
        queryFn: () =>
            fetch(`${PRODUCT_API}/api/v1/products/${props.id}`, {
                cache: "no-store",
            }).then((res) => res.json()),
    });

    if (isSuccess) {
        return (
            <div className="">
                <CartProduct data={data.data} count={props.count} />
            </div>
        );
    }
}

export default ProductCart;
