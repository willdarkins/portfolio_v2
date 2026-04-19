import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiBriefcase, BiCodeCurly, BiHome, BiMailSend } from "react-icons/bi";

const navItems = [
  { id: "home", label: "Home", Icon: BiHome },
  { id: "experience", label: "Experience", Icon: BiBriefcase },
  { id: "projects", label: "Projects", Icon: BiCodeCurly },
  { id: "contact", label: "Contact", Icon: BiMailSend },
];

const HeaderLeft = () => {
  const [active, setActive] = useState("home");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const observers = [];

    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () =>
      observers.forEach((o) => {
        o.disconnect();
      });
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setExpanded(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── DESKTOP PILL NAV ── */}
      <div className="pill-nav">
        <motion.div
          className="pill-nav-inner"
          animate={{
            width: expanded ? 140 : 36,
            paddingLeft: expanded ? 14 : 0,
            paddingRight: expanded ? 14 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onHoverStart={() => setExpanded(true)}
          onHoverEnd={() => setExpanded(false)}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            {!expanded ? (
              /* collapsed — dots only */
              <motion.div
                key="dots"
                className="flex flex-col items-center gap-2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {navItems.map(({ id }) => (
                  <div
                    key={id}
                    className={`pill-nav-dot ${active === id ? "active" : ""}`}
                  />
                ))}
              </motion.div>
            ) : (
              /* expanded — icon + label */
              <motion.div
                key="items"
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {navItems.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleNavClick(id)}
                    className={`pill-nav-item ${active === id ? "active" : ""}`}
                  >
                    <Icon
                      style={{
                        width: 13,
                        height: 13,
                        color: active === id ? "#22D3EE" : "#475569",
                        flexShrink: 0,
                      }}
                    />
                    <span className="pill-nav-label whitespace-nowrap">
                      {label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── MOBILE BOTTOM BAR ── */}
      <nav className="mobile-nav-bar">
        {navItems.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setActive(id)}
            className={`mobile-nav-item ${active === id ? "active" : ""}`}
          >
            <Icon
              style={{
                width: 20,
                height: 20,
                color: active === id ? "#22D3EE" : "#475569",
              }}
            />
            <span className="mobile-nav-label">{label}</span>
            <div className="mobile-nav-pip" />
          </a>
        ))}
      </nav>
    </>
  );
};

export default HeaderLeft;
