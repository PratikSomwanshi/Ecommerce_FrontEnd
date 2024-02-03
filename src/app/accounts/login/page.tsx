"use client";
import Btn from "@/components/Register/Button";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import useCart from "@/store/store";

interface Inputs {
    email: string;
    password: string;
}

function Register() {
    const { addUserEmail } = useCart();
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const time = moment(new Date()).add(1, "d").toDate();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (user: Inputs) => {
            return await fetch("http://localhost:8000/api/v1/users/signin", {
                method: "post",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }).then((res) => res.json());
        },
    });

    useEffect(() => {
        if (mutation.data && mutation.data.data.token) {
            setCookie("accessToken", mutation.data.data.token, {
                expires: time,
            });

            router.push("/");
        }
    }, [mutation.data]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) =>
        mutation.mutate(data);

    // if (cookies["accessToken"])

    if (mutation.isError && mutation.error.name == "TypeError") {
        return (
            <div className="center__screen__text">
                <h2>
                    Failed to Connect to Server, Please Try Again after some
                    time
                </h2>
            </div>
        );
    }

    if (mutation.isSuccess) {
        addUserEmail({ email: mutation.data.data.email });
    }

    return (
        <section className="h-[44rem] w-full flex justify-center items-center ">
            <div className="w-1/2 flex items-end ">
                <img
                    src="/register.png"
                    alt="register"
                    className="h-3/4 -translate-x-16"
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-[30rem] w-[24rem] px-6 py-16 rounded-md bg-slate-300 space-y-4">
                <Input
                    label="Email"
                    type="email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span>Email is Required</span>}
                <Input
                    label="Password"
                    type="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>Password is Required</span>}
                {mutation.data && (
                    <span>{mutation.data.error.explanation}</span>
                )}
                <Btn />
            </form>
        </section>
    );
}

export default Register;
