import React from "react";

const ExperienceItem = ({ company, jobTitle, description }) => {
  return (
        <div className="relative space-y-1 border-l-2 p-8 text-left">
          <h3 className="experience-header">{company}</h3>
          <p className="experience-title">{jobTitle}</p>
          <p className="experience-description">{description}</p>
          <span className="experience-dot"></span>
        </div>
  );
};

export default ExperienceItem;
