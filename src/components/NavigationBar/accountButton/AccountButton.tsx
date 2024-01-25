"use client";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import Badge from "../Badge/Badge";

function AccountButton() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

    if (!cookies.accessToken) {
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
    } else {
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
}

export default AccountButton;
