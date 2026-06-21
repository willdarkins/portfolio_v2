import { motion } from "framer-motion";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import { SiBluesky } from "react-icons/si";
import profileImage from "../../src/assets/profile_image.jpeg";
import Reveal from "../elements/Reveal";

const socials = [
  {
    Icon: BiLogoGithub,
    href: "https://github.com/willdarkins",
    label: "GitHub",
  },
  {
    Icon: BiLogoLinkedin,
    href: "https://www.linkedin.com/in/will-darkins/",
    label: "LinkedIn",
  },
  {
    Icon: SiBluesky,
    href: "https://bsky.app/profile/willdarkins.bsky.social",
    label: "Bluesky",
  },
];

const stackTags = ["QA Automation", "React", "Node", "Cypress"];

const GeoBg = () => (
  <svg
    className="absolute inset-0 h-full w-full opacity-[0.18]"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <title>Geometric background pattern</title>
    <defs>
      <pattern
        id="hex"
        x="0"
        y="0"
        width="40"
        height="46"
        patternUnits="userSpaceOnUse"
      >
        <polygon
          points="20,2 38,12 38,34 20,44 2,34 2,12"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="0.4"
        />
      </pattern>
      <pattern
        id="cross"
        x="0"
        y="0"
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="14"
          y1="2"
          x2="14"
          y2="26"
          stroke="#334155"
          strokeWidth="0.3"
        />
        <line
          x1="2"
          y1="14"
          x2="26"
          y2="14"
          stroke="#334155"
          strokeWidth="0.3"
        />
        <circle cx="14" cy="14" r="1.2" fill="#334155" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cross)" />
    {/* hex zone behind photo — left on desktop, top on mobile */}
    <rect
      className="hidden md:block"
      x="0"
      y="0"
      width="320"
      height="100%"
      fill="url(#hex)"
      opacity="0.55"
    />
    <rect
      className="block md:hidden"
      x="50"
      y="0"
      width="260"
      height="240"
      fill="url(#hex)"
      opacity="0.4"
    />
    <line
      className="hidden md:block"
      x1="320"
      y1="0"
      x2="320"
      y2="100%"
      stroke="#22D3EE"
      strokeWidth="0.3"
      opacity="0.4"
    />
  </svg>
);

const PhotoFrame = ({ size = "desktop" }) => {
  const isDesktop = size === "desktop";
  return (
    <div
      className="relative shrink-0"
      style={{ width: isDesktop ? 200 : 140, height: isDesktop ? 200 : 140 }}
    >
      {/* corner brackets */}
      <div className="photo-frame-corner-tl" />
      <div className="photo-frame-corner-br" />
      {/* frame */}
      <div className="photo-frame w-full h-full">
        <img
          src={profileImage}
          alt="Will Darkins"
          className="w-full h-full object-cover object-top"
        />
      </div>
      {/* cyan accent line */}
      <div className="photo-frame-accent" />
    </div>
  );
};

const SocialRow = ({ size = "desktop" }) => {
  const isDesktop = size === "desktop";
  return (
    <div
      className={`flex items-center ${isDesktop ? "gap-3" : "gap-2 justify-center"}`}
    >
      {socials.map(({ Icon, href, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 && (
            <div style={{ width: 1, height: 10, background: "#1E293B" }} />
          )}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${label} profile`}
            className="social-icon-btn"
          >
            <Icon
              style={{
                width: isDesktop ? 12 : 10,
                height: isDesktop ? 12 : 10,
              }}
            />
          </a>
          {isDesktop && (
            <span
              style={{ fontSize: 8, color: "#334155", letterSpacing: "0.06em" }}
            >
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <Reveal>
      <section id="home" className="w-full">
        {/* ── DESKTOP HERO ── */}
        <div className="hero-section hidden md:flex w-full">
          <GeoBg />
          <div className="relative z-10 flex items-center justify-center w-full min-h-[480px] gap-16 pl-16 pr-16">
            {" "}
            {/* photo + socials */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <PhotoFrame size="desktop" />
              <SocialRow size="desktop" />
            </div>
            {/* text */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* name */}
              <div className="mb-4">
                <span className="hero-name-first">Will</span>
                <span className="hero-name-last">Darkins.</span>
              </div>

              {/* pull quote */}
              <p className="hero-pull-quote mb-5">
                "Building secure, reliable software — where quality engineering
                meets security-first thinking."
              </p>

              {/* meta */}
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <div className="hero-meta-pip" />
                  <span className="hero-meta-key">Discipline</span>
                  <span className="hero-meta-val">
                    QA Automation &amp; Cybersecurity
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hero-meta-pip" />
                  <span className="hero-meta-key">Location</span>
                  <span className="hero-meta-val">Portland, OR</span>
                </div>
              </div>

              {/* stack tags */}
              <div className="flex flex-wrap gap-1">
                <span className="stack-tag-accent">Cybersecurity</span>
                {stackTags.map((t) => (
                  <span key={t} className="stack-tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE HERO ── */}
        <div
          className="hero-section flex md:hidden flex-col items-center justify-center gap-5 px-5 pb-6 pt-8 text-center"
          style={{ minHeight: 420 }}
        >
          <GeoBg />
          <div className="relative z-10 flex flex-col items-center gap-5 w-full">
            <PhotoFrame size="mobile" />

            <div>
              <span
                className="hero-name-first"
                style={{ fontSize: "clamp(2rem,10vw,2.8rem)" }}
              >
                Will
              </span>
              <span
                className="hero-name-last"
                style={{ fontSize: "clamp(2rem,10vw,2.8rem)" }}
              >
                Darkins.
              </span>
            </div>

            <p className="hero-pull-quote text-left w-full">
              "Building secure, reliable software — where quality engineering
              meets security-first thinking."
            </p>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <div className="hero-meta-pip" />
                <span className="hero-meta-key">Discipline</span>
                <span className="hero-meta-val">
                  QA Automation &amp; Cybersecurity
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="hero-meta-pip" />
                <span className="hero-meta-key">Location</span>
                <span className="hero-meta-val">Portland, OR</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
              <span className="stack-tag-accent">Cybersecurity</span>
              {stackTags.map((t) => (
                <span key={t} className="stack-tag">
                  {t}
                </span>
              ))}
            </div>

            <SocialRow size="mobile" />
          </div>
        </div>

        {/* ── FOLIO BAR ── */}
        <div className="folio-bar">
          <span className="folio-bar-text">Will Darkins · Portfolio</span>
          <span className="folio-bar-text">Portland, OR</span>
        </div>
      </section>
    </Reveal>
  );
};

export default Home;
