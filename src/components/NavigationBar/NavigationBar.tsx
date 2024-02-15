import Link from "next/link";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./accountButton/AccountButton"), {
    ssr: false,
});

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
                            {link == "Kids" ? (
                                <Link href={"/" + link.toLowerCase()}>
                                    {link}
                                </Link>
                            ) : (
                                <Link href={"/" + link.toLowerCase() + "s"}>
                                    {link}
                                </Link>
                            )}
                        </li>
                    ))}
                    {/* <Link href="/seller/product">Product</Link> */}
                </div>

                <div className="min-w-60 flex justify-between items-center h-full">
                    <NoSSR />
                </div>
            </nav>
        </section>
    );
}

export default NavigationBar;
