import "../styles/About.css";

export default function About(){
    return(
        <section className="About">
            <section className="hero">
               <div className="hero-left"></div>
               <div className="hero-center">
                   <h1>ABOUT CODINGADDA</h1>
                   <h3>Empowering Every Developer to Learn, Build, and Grow</h3>
                </div>

                <div className="hero-right">
                   <p>CodingAdda is an interactive online coding platform designed for students, beginners, and developers. Our goal is to make programming simple, engaging, and accessible through an intuitive browser-based code editor.</p>
                
                   <div className="hero-btn">
                       <button className="learn-btn"><a href="/features">Learn More</a></button>
                       <button className="contact-btn"><a href="/contact">Contact Us</a></button>
                    </div>
                </div>
            </section>

            <section className="info">
                <section className="vision">
                    <h2>👁️ OUR VISION</h2>
                    <p>
                        At CodingAdda, we envision a world where anyone can learn programming without barriers. Our goal is to create a platform that makes coding simple, interactive, and accessible for students, beginners, and professionals alike. We strive to inspire innovation, build confidence in every learner, and empower the next generation of developers through practical, hands-on learning experiences.
                    </p>
                </section>

                <section className="mission">
                    <h2>🎯 OUR MISSION</h2>
                    <ul>
                        <li>✔ Provide a browser-based coding platform</li>
                        <li>✔ Support multiple programming languages</li>
                        <li>✔ Help beginners learn by doing</li>
                        <li>✔ Encourage project-based learning</li>
                        <li>✔ Build a collaborative coding community</li>
                        <li>✔ Make coding simple and enjoyable</li>
                    </ul>
                </section>

                <section className="story">
                   <h2>💡 OUR STORY</h2>
                   <p>CodingAdda was born from a simple idea: learning to code should never feel complicated. Many beginners struggle with setting up development environments, installing software, and finding a place where they can practice programming without distractions.
                    We wanted to create a platform that removes those barriers. With CodingAdda, anyone can open a browser, write code, experiment with ideas, and build projects without worrying about complex configurations.
                    Our goal is not just to provide an online code editor, but to create a learning environment where students gain confidence through practice. Every feature is designed with simplicity, speed, and accessibility in mind so that learners can focus on what truly matters: improving their programming skills.
                    As CodingAdda grows, we aim to introduce project management, collaborative coding, multiple programming languages, secure cloud storage, and many more tools that help developers learn and create with confidence.
                    CodingAdda is more than a website—it's the beginning of a journey for every aspiring developer.</p>
                </section>
            </section>

            <section className="start">
                <div className="content">
                    <h2>Ready to Start Your Coding Journey? ⭐</h2>
                    <p>Join CodingAdda and experience a modern, browser-based coding platform designed for learners, students, and developers. Practice programming, build exciting projects, and improve your skills with an intuitive coding environment—all in one place.</p>
                </div>

                <div className="btn">
                    <button className="start-btn"><a href="/editor">🚀 Start Coding</a></button>
                    <button className="feature-btn"><a href="/features">✨ Explore Features</a></button>
                    <button className="contact1-btn"><a href="/contact">💡Contact us</a></button>
                </div>
            </section>
        </section>
    );
}
