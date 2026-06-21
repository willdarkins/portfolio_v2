import { Link } from "react-router-dom";
import experienceData from "../data/experienceData";
import ExperienceItem from "../elements/ExperienceItem";

function Experience({ preview = false }) {
  const items = preview ? experienceData.slice(0, 3) : experienceData;

  return (
    <section>
      <div className="sec-head">
        <span className="sec-label">Experience</span>
        <span className="sec-line" />
      </div>

      <div className="exp-list">
        {items.map((exp, idx) => (
          <ExperienceItem key={exp.jobTitle} exp={exp} index={idx} />
        ))}
      </div>

      {preview && (
        <div className="section-footer">
          <Link to="/experience" className="section-footer-link">
            CV and more
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
              <title>Go to experience</title>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Experience;
