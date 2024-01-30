import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    data: {
        _id: string;
        name: string;
        image: string;
        price: Number;
        description: string;
        category: string;
    };
}

function ProductCard({ data }: Props) {
    console.log(data);
    return (
        <Link href={`/shops/${data._id}`}>
            <section
                className="w-80 h-72 rounded-lg
            transition-all 
            hover:bg-slate-50 hover:shadow-lg hover:border-slate-200 hover:border
        ">
                <div className="p-1">
                    <Image
                        src={data.image}
                        alt="something"
                        width={200}
                        height={300}
                        className="w-full h-40 rounded-lg "
                    />
                </div>
                <div className="px-3 py-1 text-xl text-slate-600 space-y-1 flex flex-col justify-center h-28">
                    <h1 className="font-normal">{data.name}</h1>
                    <h2 className="">&#x20B9;{JSON.stringify(data.price)}</h2>
                </div>
            </section>
        </Link>
    );
}

export default ProductCard;
