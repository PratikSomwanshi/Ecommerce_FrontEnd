import axios from "axios";
import Error from "next/error";
import React from "react";

async function getProduct(id: string) {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/v1/products/${id}`
        );

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

async function page({ params }: { params: { id: string } }) {
    const data = await getProduct(params.id);
    return (
        <div>
            <p>helo</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default page;
