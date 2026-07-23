import "./../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerBox">
          <h2>CodingAdda</h2>
          <p>
            Learn, Practice and Build real-world projects using our
            online coding platform. Start your coding journey today.
          </p>
        </div>

        <div className="footerBox">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footerBox">
          <h3>Languages</h3>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
            <li>Python</li>
          </ul>
        </div>

        <div className="footerBox">
          <h3>Contact</h3>

          <ul>
            <li>📧 support@codingadda.com</li>
            <li>📍 India</li>
            <li>📞 +91 XXXXX XXXXX</li>
          </ul>
        </div>

      </div>

      <hr />

      <div className="socialIcons">
        <span>🌐</span>
        <span>📷</span>
        <span>💼</span>
        <span>🐙</span>
      </div>

      <p className="copyright">
        © 2026 CodingAdda. All Rights Reserved.
      </p>
    </footer>
  );
}