import Btn from "@/components/Register/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

interface Inputs {
    email: string;
    password: string;
    conform_password: string;
}

function Register() {
    const [iData, setIData] = useState(false);

    async function createUser(data: Inputs) {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/v1/users/signup",
                data: {
                    email: data.email,
                    password: data.password,
                },
            });

            if (response.data.data) {
                setIData(true);
            }
        } catch (error) {}
    }

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await createUser(data);
    };

    if (!iData) {
        return (
            <section className="flex h-[44.4rem] w-full">
                <div className="w-1/2 flex justify-end items-center ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className=" px-6 py-16 w-3/4  flex flex-col justify-center items-center text-xl 
                        h-3/4 rounded-md bg-slate-50 shadow-md ">
                        <div className="w-10/12 h-[104px]">
                            <label
                                htmlFor="email"
                                className="flex flex-col mb-1">
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
                                    {...register("password", {
                                        required: true,
                                    })}
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
                        <div className="w-10/12 h-[104px]">
                            <label
                                htmlFor="conform_password"
                                className="flex flex-col mb-1">
                                Conform Password :
                                <input
                                    className="w-full border-black border-b outline-none bg-slate-50  px-4 py-2 rounded-md"
                                    type="password"
                                    {...register("conform_password", {
                                        required: true,
                                        validate: (value: string) => {
                                            if (watch("password") != value) {
                                                return "Password does not match";
                                            }
                                        },
                                    })}
                                />
                            </label>
                            {errors.conform_password && (
                                <div className="flex justify-end px-4">
                                    <span className="text-red-500">
                                        Password do not match
                                    </span>
                                </div>
                            )}
                        </div>

                        <Btn content="Register" />
                    </form>
                </div>
                <div className="w-1/2 flex items-end ">
                    <img
                        src="/register.png"
                        alt="register"
                        className="h-3/4 -translate-x-16"
                    />
                </div>
            </section>
        );
    } else {
        return (
            <h1 className="text-2xl">
                Successfully register the user
                <Link className="text-blue-600" href="/accounts/login">
                    {" "}
                    click here to signin
                </Link>
            </h1>
        );
    }
}

export default Register;
