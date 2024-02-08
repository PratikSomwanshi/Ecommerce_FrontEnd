import { Button, Divider } from "@nextui-org/react";
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
    id: string;
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTodo),
                }
            ).then((res) => res.json());

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
        },
    });

    return (
        <>
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
                    <h1>{props.count}</h1>
                </div>
                <div className="flex items-center">
                    <Button
                        className="text-md"
                        color="danger"
                        variant="solid"
                        startContent={<MdDelete />}
                        onClick={() => {
                            // console.log(props.data);
                            mutation.mutate({
                                email: USER_EMAIL,
                                id: props.data._id,
                            });
                        }}>
                        Delete
                    </Button>
                </div>
            </div>
            <Divider className="mt-4 mb-4" />
        </>
    );
}

export default CartProduct;
