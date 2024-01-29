import { Spinner } from "@nextui-org/react";
import { Metadata } from "next";
import React from "react";

function loading() {
    return (
        <div className="h-[44rem] w-full flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    );
}

export default loading;
