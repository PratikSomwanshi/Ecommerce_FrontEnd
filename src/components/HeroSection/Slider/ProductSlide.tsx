import React from "react";

function ProductSlide({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex justify-center items-center  rounded-md shadow-xl">
            <div className="h-[80%] w-[93%] rounded-md bg-green-100 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
}

export default ProductSlide;
