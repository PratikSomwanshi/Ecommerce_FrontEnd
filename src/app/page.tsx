import HeroSection from "@/components/HeroSection/HeroSection";
import KidsPopular from "@/components/MainPopular/KidsPopular/KidsPopular";
import MensPopular from "@/components/MainPopular/MensPopular/MensPopular";
import WomensPopular from "@/components/MainPopular/WomensPopular/WomensPopular";

export default function Home() {
    return (
        <section>
            <HeroSection />
            <MensPopular />
            <WomensPopular />
            <KidsPopular />
        </section>
    );
}
