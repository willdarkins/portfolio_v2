import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/work" element={<Projects />} />
          <Route path="/writing" element={<Blog />} />
          <Route path="/writing/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer-bar">
        <div className="footer-name">Will Darkins · willdarkins.dev</div>
        <div className="footer-socials">
          <a
            className="footer-soc"
            href="https://github.com/willdarkins"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer-soc-line" />
            GitHub
          </a>
          <a
            className="footer-soc"
            href="https://linkedin.com/in/willdarkins"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer-soc-line" />
            LinkedIn
          </a>
          <a
            className="footer-soc"
            href="https://bsky.app/profile/willdarkins.dev"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer-soc-line" />
            Bluesky
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
