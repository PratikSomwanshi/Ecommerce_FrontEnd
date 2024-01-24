"use server";
import axios from "axios";

const addData = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/users/signup",
        data: {
            email,
            password,
        },
    });

    return response.data.data;
};

export default addData;
