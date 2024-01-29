"use client";
import Btn from "@/components/Register/Button";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Inputs {
    email: string;
    password: string;
}

function Register() {
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const time = moment(new Date()).add(1, "d").toDate();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (user: Inputs) => {
            return fetch("http://localhost:8000/api/v1/users/signin", {
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
        if (mutation.data && mutation.data.data.token)
            setCookie("accessToken", mutation.data.data.token, {
                expires: time,
            });
    }, [mutation.data]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) =>
        mutation.mutate(data);

    if (cookies["accessToken"]) router.push("/");

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
    }

    return (
        <section className="h-[44rem] w-full flex justify-center items-center ">
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
