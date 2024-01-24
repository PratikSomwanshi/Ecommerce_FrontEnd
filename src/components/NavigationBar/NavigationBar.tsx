import Link from "next/link";
import React from "react";

const links = ["Shop", "Men", "Women", "Kids"];

function NavigationBar() {
    return (
        <section>
            <nav className="text-xl font-light flex justify-around items-center h-[4.4rem] bg-slate-300 ">
                <div>
                    {/* <Image /> */}
                    <Link href="/">Home</Link>
                </div>

                <div className="flex justify-between min-w-[30rem]  ">
                    {links.map((link) => (
                        <li key={link}>
                            <Link href={"/" + link.toLowerCase()}>{link}</Link>
                        </li>
                    ))}
                </div>

                <div className="min-w-40 flex justify-between">
                    <Link href="/account">Account</Link>
                    <Link href="/cart">Cart</Link>
                </div>
            </nav>
        </section>
    );
}

export default NavigationBar;
