"use client";
import Link from "next/link";
import React from "react";
import Badge from "../Badge/Badge";
import { useCookies } from "react-cookie";

function LinksLogout() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    return (
        <>
            <Link
                onClick={() => removeCookie("accessToken")}
                href="/"
                className="border border-slate-600 rounded-full py-1 px-2 ">
                Logout
            </Link>
            <Link href="/cart">
                <Badge />
            </Link>
        </>
    );
}

export default LinksLogout;
