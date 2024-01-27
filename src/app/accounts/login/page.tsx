"use client";
import Btn from "@/components/Register/Button";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import useUser from "@/store/store";
import { useCookies } from "react-cookie";
import moment from "moment";

interface Inputs {
    email: string;
    password: string;
}

function Register() {
    const { USER_EMAIL, addUser, removeUser } = useUser();
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const time = moment(new Date()).add(1, "d").toDate();

    async function signInUser(data: Inputs) {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/v1/users/signin",
                data: {
                    email: data.email,
                    password: data.password,
                },
            });

            setCookie("accessToken", response.data.msg.token, {
                expires: time,
            });
            addUser({ email: response.data.msg.email });
        } catch (error) {
            console.log(error);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) =>
        await signInUser(data);

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
                <Btn />
            </form>
        </section>
    );
}

export default Register;
