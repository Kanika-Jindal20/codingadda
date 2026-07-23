import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Detail from "../components/details";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import LanguageSlider from "../components/LanguageSlider";

export default function Home(){
    return(
        <main>
            <Navbar/>
            <Hero/>
            <Detail/>
            <LanguageSlider/>
            <FAQ/>
            <Footer/>
        </main>
    );
}