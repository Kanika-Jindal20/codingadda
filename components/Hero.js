import "../styles/Hero.css";
import "../styles/responsive.css";

export default function Hero() {
    return(
        <section className="hero">
            <div className="hero-left">
                <span className="hero-tag">
                    <div className="rocket"></div>
                    Smart Coding Platform
                </span>
                
                <h1>
                    Code Smarter, <br/> 
                    Build Faster, <br/> 
                    Learn Better. 
                </h1>
            </div>

            <div className="hero-center">
                <p>CodingAdda helps you practice C, Python, Java, HTML, CSS and JavaScript directly in your browser without installing anything.</p>
                
                <div className="hero-btn">
                    <button className="start-btn">Start Coding</button>
                    <button className="learn-btn">Learn More</button>
                </div>
            </div>
            <div className="hero-right"></div>
        </section>
    );
}