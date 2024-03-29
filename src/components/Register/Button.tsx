"use client";
import React from "react";
import { Button } from "@nextui-org/react";

function Btn(props: { content: string }) {
    return (
        <Button
            type="submit"
            color="primary"
            style={{ marginTop: "3rem" }}
            className="w-1/2 text-xl">
            {props.content}
        </Button>
    );
}

export default Btn;
