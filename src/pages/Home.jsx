import { Link } from "react-router-dom";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

function Home() {
  return (
    <>
      <section className="hero-strip">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Featured
          </div>

          <h1 className="hero-headline">
            Quality engineer.
            <br />
            <em>Security thinker.</em>
          </h1>

          <p className="hero-deck">
            I build automated test systems that catch what manual review misses,
            and I think about software the way an attacker would before they get
            the chance to.
          </p>

          <div className="hero-stack">
            <span className="hero-tag hi">QA Automation</span>
            <span className="hero-tag">Cybersecurity</span>
            <span className="hero-tag">React</span>
            <span className="hero-tag">Python</span>
            <span className="hero-tag">Cypress</span>
          </div>
        </div>

        <div className="hero-photo-frame" />
      </section>

      <div className="content-area">
        <div className="content-main">
          <Experience preview />

          <div className="main-atl-div">
            <span className="atl-line" />
            <span className="atl-diamond" />
            <span className="atl-line" />
          </div>

          <Projects preview />
        </div>

        <aside className="content-sidebar">
          <div className="sec-head">
            <span className="sec-label">Latest Writing</span>
            <span className="sec-line" />
          </div>

          <p className="blog-coming-soon">
            New essays on security, baseball, Linux, and family are on the way.
          </p>

          <div className="section-footer">
            <Link to="/writing" className="section-footer-link">
              All writing
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
              >
                <title>Go to writing</title>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Home;
