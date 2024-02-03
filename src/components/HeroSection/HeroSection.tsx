"use client";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSlide from "./Slider/ProductSlide";

function HeroSection() {
    return (
        <section className="bg-slate-50 h-[30rem] px-6">
            <Swiper
                modules={[Navigation, Autoplay, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                className="h-[inherit] flex items-center">
                <SwiperSlide>
                    <ProductSlide>
                        <h1>Product 1</h1>
                    </ProductSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSlide>
                        <h1>Product 2</h1>
                    </ProductSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSlide>
                        <h1>Product 3</h1>
                    </ProductSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSlide>
                        <h1>Product 4</h1>
                    </ProductSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSlide>
                        <h1>Product 5</h1>
                    </ProductSlide>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

export default HeroSection;
