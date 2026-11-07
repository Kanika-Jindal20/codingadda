import Navbar from "../../components/Navbar.js";
import Features from "../../components/Features.js";
import Footer from "../../components/Footer.js";

export const metadata = {
  title: "Features - CodingAdda",
  description: "Explore the core features of CodingAdda: Online Monaco Editor, Multi-Language Code Execution, Project Management, and Live Preview.",
};

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <Features />
      <Footer />
    </main>
  );
}
