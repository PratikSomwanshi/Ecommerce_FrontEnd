"use client";

import React from "react";
import { useCookies } from "react-cookie";

import LinksRegister from "./LinksRegister";
import LinksLogout from "./LinksLogout";

function AccountButton() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    if (!cookies.accessToken) {
        return <LinksRegister />;
    } else {
        return <LinksLogout />;
    }
}

export default AccountButton;
