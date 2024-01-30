import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartProduct from "../CartProduct";
import { Divider } from "@nextui-org/react";

function ProductCart(props: { id: string; count: number }) {
    const { isSuccess, isLoading, error, data } = useQuery({
        queryKey: [`repoData${props.id}`],
        queryFn: () =>
            fetch(`http://localhost:5000/api/v1/products/${props.id}`, {
                cache: "no-store",
            }).then((res) => res.json()),
    });

    if (isSuccess) {
        return (
            <div className="">
                <CartProduct data={data.data} count={props.count} />
                <Divider className="mt-4 mb-4" />
            </div>
        );
    }
}

export default ProductCart;
