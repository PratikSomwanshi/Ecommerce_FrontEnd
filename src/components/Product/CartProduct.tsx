import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCart from "@/store/store";

interface Props {
    data: {
        _id: string;
        name: string;
        image: string;
        price: Number;
        description: string;
        category: string;
    };
    count: number;
}

interface CartApi {
    email: string;
    index: number;
}

function CartProduct(props: Props) {
    const { USER_EMAIL } = useCart();
    const data = props.data;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newTodo: CartApi) => {
            const response = await fetch(
                "http://localhost:8000/api/v1/users/cart",
                {
                    method: "DELETE",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTodo),
                }
            ).then((res) => res.json());
            console.log(response);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
        },
    });

    return (
        <div className="px-4 w-full h-24 flex justify-between">
            <div className="flex space-x-4 items-center h-full">
                <div>
                    <Image
                        src={data.image}
                        alt="something"
                        width={100}
                        height={100}
                        className="h-20 w-36"
                    />
                </div>
                <div>
                    <h2>{data.name}</h2>
                    <h3>{JSON.stringify(data.price)}</h3>
                </div>
            </div>
            <div className="flex items-center">
                <Button
                    className="text-md"
                    color="danger"
                    variant="solid"
                    startContent={<MdDelete />}
                    onClick={() => {
                        mutation.mutate({
                            email: USER_EMAIL,
                            index: props.count,
                        });
                    }}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default CartProduct;
