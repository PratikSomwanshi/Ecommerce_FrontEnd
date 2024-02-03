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
        <section className="flex h-[44.4rem] overflow-hidden w-full">
            <div className="w-1/2 flex items-end justify-end">
                <img
                    src="/login.png"
                    alt="register"
                    className="h-[90%] -translate-x-20 z-10 translate-y-14"
                />
            </div>
            <div className="w-1/2 flex justify-start items-center ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" px-6 py-16 w-3/4  flex flex-col justify-center items-center text-xl 
                        h-3/4 rounded-md bg-slate-50 shadow-md 
                        -translate-x-24
                        ">
                    <div className="w-10/12 h-[104px]">
                        <label htmlFor="email" className="flex flex-col mb-1">
                            Email :
                            <input
                                className="w-full outline-none px-4 py-2 rounded-md bg-slate-50
                        border-black border-b
                        "
                                type="email"
                                {...register("email", { required: true })}
                            />
                        </label>
                        {errors.email && (
                            <div className="flex justify-end px-4">
                                <span className="text-end w-full text-red-500">
                                    Email is Required
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="w-10/12 h-[104px]">
                        <label
                            htmlFor="password"
                            className="flex flex-col mb-1">
                            Password :
                            <input
                                className="w-full border-black border-b outline-none bg-slate-50  px-4 py-2 rounded-md"
                                type="password"
                                {...register("password", { required: true })}
                            />
                        </label>
                        {errors.password && (
                            <div className="flex justify-end px-4">
                                <span className="text-red-500">
                                    Password is Required
                                </span>
                            </div>
                        )}
                    </div>
                    {mutation.data && (
                        <span>{mutation.data.error.explanation}</span>
                    )}
                    <Btn content="Login" />
                </form>
            </div>
        </section>
    );
}

export default Register;
