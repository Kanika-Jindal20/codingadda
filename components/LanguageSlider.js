import "../styles/LanguageSlider.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiMongodb,
  SiC,
  SiCplusplus,
  SiExpress,
} from "react-icons/si";

export default function LanguageSlider() {
  const languages = [
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Express", icon: <SiExpress />, color: "#000000" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "Java", icon: <FaJava />, color: "#F89820" },
    { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
    { name: "C", icon: <SiC />, color: "#004482" },
  ];

  return (
    <section className="languageSection">
      <div className="languageHeading">
        <h2>Technologies We Support</h2>
        <p>
          Explore the most popular programming languages and modern web
          development technologies on CodingAdda.
        </p>
      </div>

      <div className="slider">
        <div className="slideTrack">
          {languages.map((language, index) => (
            <div className="languageCard" key={index}>
              <div className="languageIcon" style={{color: language.color}}>
                {language.icon}
              </div>
              <h4>{language.name}</h4>
            </div>
          ))}

          {languages.map((language, index) => (
            <div className="languageCard" key={`duplicate-${index}`}>
              <div className="languageIcon" style={{color: language.color}}>
                {language.icon}
              </div>

              <h4>{language.name}</h4>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}