import "../styles/details.css";
import "../styles/responsive.css";

export default function Detail(){
    return(
        <div className="detail">
            <div className="detail1">
                <h3>Everything You Need</h3>
                <p>Discover why CodingAdda makes coding simple, fast and enjoyable.</p>
            </div>
            <div className="detail2">
            <div className="why">
                <h3>🚀WHY CODING ADDA?</h3>
                <ul>
                    <li>✅ Beginner Friendly</li>
                    <li>💻 Live Code Editor</li>
                    <li>⚡ Fast Performance  </li>
                    <li>🔒 Secure Authentication </li>
                    <li>💾 Save Projects</li>
                    <li>📱 Responsive Design</li>
                    <li>🌍 Access Anywhere</li>
                    <li>🎯 Beginner to Advanced Learning</li>
                    <li>🤝 Share Code with Friends</li>
                    <li>📚 Learn with Real Examples</li>
                </ul>
            </div>

            <div className="how">
                <h3>⚙️HOW IT WORKS?</h3>
                <ol>
                    <li>📝 Create Your Free Account</li>
                    <span className="arrow">⬇</span>
                    <li>🌐 Login to CodingAdda</li>
                    <span className="arrow">⬇</span>
                    <li>💻 Select the progamming Language</li>
                    <span className="arrow">⬇</span>
                    <li>⌨️ Write Your Code</li>
                    <span className="arrow">⬇</span>
                    <li>▶️ Run & Test Instantly</li>
                    <span className="arrow">⬇</span>
                    <li>🐞 Debug Errors Easily</li>
                    <span className="arrow">⬇</span>
                    <li>💾 Save & Share Your Project</li>
                </ol>
            </div>

            <div className="which">
                <h3>💻LANGUAGES SUPPORTED</h3>
                <ul>
                    <li>🌐 HTML </li>
                    <li>🎨 CSS</li>
                    <li>⚡ JavaScript</li>
                    <li>⚛️ React</li>
                    <li>🟢 Node.js</li>
                    <li>▲ Next.js</li>
                    <li>🍃 MongoDB</li>
                    <li>🐍 Python</li>
                    <li>☕ Java</li>
                    <li>💙 C++</li>
                    <li>🔵 C</li>
                </ul>
            </div>
        </div>
        </div>
    );
}