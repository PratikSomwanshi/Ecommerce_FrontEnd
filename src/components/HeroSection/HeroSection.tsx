import Image from "next/image";
import React from "react";

function HeroSection() {
    return (
        <section className="h-[44rem] bg-slate-200 grid grid-cols-2  items-center w-full">
            <div className="grid justify-items-center items-center h-full">
                <Image
                    src="/shoppy.png"
                    width={1000}
                    height={2000}
                    alt="hero.jpg"
                />
            </div>
            <div className="grid justify-items-center items-center h-full text-6xl">
                <h1>Shop What you want</h1>
            </div>
        </section>
    );
}

export default HeroSection;
