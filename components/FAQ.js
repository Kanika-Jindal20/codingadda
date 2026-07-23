"use client";

import { useState } from "react";
import "../styles/FAQ.css";

export default function FAQ() {

    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "Is CodingAdda free?",
            answer: "Yes! CodingAdda provides free access to its online code editor and learning resources."
        },
        {
            question: "Which programming languages are supported?",
            answer: "Currently HTML, CSS, JavaScript, React, Node.js, Python, Java, C, C++, and MongoDB-related projects are supported, with more languages planned."
        },
        {
            question: "Can I save my projects?",
            answer: "Yes. After logging in, you can save your projects and continue working on them anytime."
        },
        {
            question: "Do I need to install anything?",
            answer: "No. CodingAdda works directly in your browser without any installation."
        },
        {
            question: "Is CodingAdda beginner friendly?",
            answer: "Absolutely! The platform is designed to help beginners learn while also providing useful tools for experienced developers."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq">
            <div className="faqHeading">
                <h2>Frequently Asked Questions</h2>
                <p>
                    Everything you need to know before you start coding with CodingAdda.
                </p>
            </div>

            <div className="faqContainer">
                {faqData.map((item, index) => (
                    <div className="faqItem" key={index}>
                        <div className="faqQuestion" onClick={() => toggleFAQ(index)}>
                            <span>{item.question}</span>
                            <span className="icon">
                                {openIndex === index ? "-" : "+"}
                            </span>
                        </div>
                        {openIndex === index && (
                            <div className="faqAnswer">
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}