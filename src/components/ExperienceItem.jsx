import React from "react";

const ExperienceItem = ({ title, jobTitle, description }) => {
  return (
        <div className="relative space-y-1 border-l-2 p-8 text-left">
          <h3 className="experience-header">{title}</h3>
          <p className="experience-title">{jobTitle}</p>
          <p className="experience-description">{description}</p>
          <span className="experience-dot"></span>
        </div>
  );
};

export default ExperienceItem;
