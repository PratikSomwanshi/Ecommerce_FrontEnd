"use client";
import Link from "next/link";
import AccountButton from "./accountButton/AccountButton";

const links = ["Shop", "Men", "Women", "Kids"];

function NavigationBar() {
    return (
        <section>
            <nav className="text-xl font-light flex justify-around items-center h-[4.4rem] shadow-sm">
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

                <div className="min-w-60 flex justify-between items-center h-full">
                    <AccountButton />
                </div>
            </nav>
        </section>
    );
}

export default NavigationBar;
