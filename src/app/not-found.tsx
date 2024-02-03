import React from "react";

function NotFound() {
    return (
        <section className="h-[44rem] w-full flex flex-col justify-center items-center  text-4xl font-normal">
            <h1>Page you want to access not found</h1>
            <h2 className="text-3xl">400 Bad Request</h2>
        </section>
    );
}

export default NotFound;
