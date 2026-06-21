const ExperienceItem = ({ exp, index }) => {
  const { company, jobTitle, description } = exp;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="exp-item">
      <span className="exp-num">{num}</span>
      <div>
        <div className="exp-role">{jobTitle}</div>
        <div className="exp-co">{company}</div>
        {description && <p className="exp-desc">{description}</p>}
      </div>
    </div>
  );
};

export default ExperienceItem;
