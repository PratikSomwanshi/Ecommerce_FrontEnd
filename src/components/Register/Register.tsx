import Btn from "@/components/Register/Button";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

interface Inputs {
    email: string;
    password: string;
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
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) =>
        await createUser(data);

    if (!iData) {
        return (
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
                <Btn />
            </form>
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
