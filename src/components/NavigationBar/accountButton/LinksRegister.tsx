import Link from "next/link";
import React from "react";

function LinksRegister() {
    return (
        <>
            <Link
                href="/accounts/register"
                className="border border-slate-600 rounded-full py-1 px-2 ">
                Register
            </Link>
            <Link
                href="/accounts/login"
                className="border border-slate-600 rounded-full py-1 px-2 ">
                Login
            </Link>
        </>
    );
}

export default LinksRegister;
