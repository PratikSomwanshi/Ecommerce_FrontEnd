"use client";
import Link from "next/link";
import React from "react";
import Badge from "../Badge/Badge";
import { useCookies } from "react-cookie";
import useCart from "@/store/store";

function LinksLogout() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    const { setCount } = useCart();
    return (
        <>
            <Link
                onClick={() => removeCookie("accessToken")}
                href="/"
                className="border border-slate-600 rounded-full py-1 px-2 ">
                Logout
            </Link>
            <Link href="/cart" onClick={() => setCount({ count: 0 })}>
                <Badge />
            </Link>
        </>
    );
}

export default LinksLogout;
