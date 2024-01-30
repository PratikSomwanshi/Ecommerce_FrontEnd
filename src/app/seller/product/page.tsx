"use client";
import Btn from "@/components/Register/Button";
import useUser from "@/store/store";
import {
    Input,
    Select,
    SelectItem,
    Spinner,
    Textarea,
} from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
}

const categories = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Kids", value: "kids" },
];

function page() {
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    // const { USER_EMAIL } = useUser();
    const [cookies, setCookies] = useCookies(["accessToken"]);

    useEffect(() => {
        async function validate(token: string) {
            try {
                await axios({
                    method: "post",
                    url: "http://localhost:8000/api/v1/users/auth",
                    data: {
                        token,
                    },
                });

                setValid(true);
            } catch (error) {}
        }

        validate(cookies.accessToken);
    }, []);

    async function addProduct(data: Inputs) {
        try {
            setLoading(true);
            let formData = new FormData();
            formData.append("product", data.image[0]);
            const response = await axios({
                method: "post",
                url: "http://localhost:5000/api/v1/products/upload",
                data: formData,
            });

            await axios({
                method: "post",
                url: "http://localhost:5000/api/v1/products",
                data: {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                    image: response.data.data.image_url,
                },
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) =>
        await addProduct(data);

    if (valid) {
        return (
            <section className="w-full h-[44rem] flex justify-center items-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-[30rem] w-[24rem] px-6 py-16 rounded-md bg-slate-300 space-y-4">
                    <Input
                        label="Name"
                        type="text"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>Name is Required</span>}
                    <Input
                        label="price"
                        type="number"
                        {...register("price", { required: true })}
                    />
                    {errors.price && <span>Price is Required</span>}
                    <Textarea
                        label="description"
                        placeholder="Enter your description"
                        {...register("description", { required: true })}
                    />
                    {errors.description && <span>Description is Required</span>}
                    <Select
                        label="Select an animal"
                        {...register("category", { required: true })}>
                        {categories.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {errors.category && <span>Category is Required</span>}
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: true })}
                    />
                    {errors.image && <span>Image is Required</span>}

                    {loading ? (
                        <div className="w-full text-center">
                            <Spinner />
                        </div>
                    ) : (
                        <Btn />
                    )}
                </form>
            </section>
        );
    } else {
        return (
            <div className="h-[44rem] w-full flex justify-center items-center text-2xl">
                <h1>
                    Looks like you have not logged in,{" "}
                    <Link href="/accounts/login">click here to login</Link>
                </h1>
            </div>
        );
    }
}

export default page;
