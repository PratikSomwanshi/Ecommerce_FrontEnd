"use client";

import React from "react";
import { useCookies } from "react-cookie";

import LinksRegister from "./LinksRegister";
import LinksLogout from "./LinksLogout";

function AccountButton() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    if (!cookies.accessToken) {
        return (
            <div className="w-full flex justify-between items-center h-full">
                <LinksRegister />
            </div>
        );
    } else {
        return (
            <div className="w-full flex justify-between items-center h-full">
                <LinksLogout />
            </div>
        );
    }
}

export default AccountButton;
