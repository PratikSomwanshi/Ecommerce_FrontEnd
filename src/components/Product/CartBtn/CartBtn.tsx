"use client";
import useCart from "@/store/store";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartBtn(props: { id: string }) {
    const { addCount, USER_EMAIL, CART } = useCart();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    async function addToCart() {
        if (!USER_EMAIL) {
            router.push("/cart");
        } else {
            setLoading(true);
            const response = await fetch(
                "http://localhost:8000/api/v1/users/cart",
                {
                    method: "PUT",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: USER_EMAIL,
                        productId: props.id,
                    }),
                }
            ).then((res) => res.json());

            handleCart(response);
            setLoading(false);
        }
    }

    function handleCart(response: { success: boolean; message: string }) {
        if (response.success) {
            addCount();
            router.push("/cart");
        } else {
            toast.error(response.message, {
                position: "bottom-center",
                autoClose: 700,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark",
                transition: Bounce,
            });
            setTimeout(() => toast.clearWaitingQueue(), 700);
        }
    }

    return (
        <>
            <Button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-xl rounded-full
            w-80 h-16"
                onClick={async () => {
                    await addToCart();
                }}>
                {!loading ? "Add to Card" : "Moving to Cart"}
            </Button>
            {/* <Toaster position="bottom-center" reverseOrder={false}></Toaster> */}
            <ToastContainer
                position="bottom-center"
                autoClose={700}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                theme="dark"
                transition={Bounce}
                pauseOnHover={true}
            />
        </>
    );
}

export default CartBtn;
