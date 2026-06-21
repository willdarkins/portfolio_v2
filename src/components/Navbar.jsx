import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "/work",
    label: "Work",
    sub: "Projects & portfolio",
    bg: "#EEF2FF",
    stroke: "#4F6EB0",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    to: "/experience",
    label: "Experience",
    sub: "Career & background",
    bg: "#ECFDF5",
    stroke: "#059669",
    icon: (
      <>
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    to: "/writing",
    label: "Writing",
    sub: "Essays & thoughts",
    bg: "#FFF7ED",
    stroke: "#EA580C",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    sub: "Get in touch",
    bg: "#FDF2F8",
    stroke: "#C026D3",
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="masthead" ref={navRef}>
      <div className="mast-inner">
        <div style={{ width: 80 }} />

        <Link to="/" className="mast-name">
          Will<span className="dot">.</span>Darkins
        </Link>

        <button
          type="button"
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="hb hb1" />
          <span className="hb hb2" />
          <span className="hb hb3" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="dropdown-header">
                <div className="dropdown-header-txt">Navigate</div>
              </div>

              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  <div className="di-icon" style={{ background: item.bg }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={item.stroke}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                    >
                      <title>{item.label} icon</title>
                      {item.icon}
                    </svg>
                  </div>
                  <div className="di-content">
                    <div className="di-label">{item.label}</div>
                    <div className="di-sub">{item.sub}</div>
                  </div>
                  <div className="di-arrow">{"\u2192"}</div>
                </Link>
              ))}

              <div className="dropdown-footer">
                <a
                  className="df-soc"
                  href="https://github.com/willdarkins"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <span className="df-dot" />

                <a
                  className="df-soc"
                  href="https://linkedin.com/in/willdarkins"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <span className="df-dot" />

                <a
                  className="df-soc"
                  href="https://bsky.app/profile/willdarkins.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bluesky
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mast-rule">
        <div className="mast-rule-line" />
        <div className="mast-rule-text">
          Portland, OR &middot; QA &amp; Cybersecurity &middot; Open to
          opportunities
        </div>
        <div className="mast-rule-line" />
      </div>
    </div>
  );
}

export default Navbar;
