import ExperienceItem from "../elements/ExperienceItem";
import experienceData from "../data/experienceData";
import Reveal from "../elements/Reveal";

const Experience = () => {
  return (
    <Reveal>
    <div
      id="experience"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-20 p-14 md:p-20 lg:p-36"
    >
      <h1 className="text-center text-5xl font-light">Experience</h1>

      <div className="flex flex-wrap gap-0 md:flex-nowrap md:gap-10">
        {/* Left Column */}
        <div className="flex-1">
          {experienceData
            .filter((_, index) => index >= 0 && index <= 2)
            .map((exp, index) => (
              <ExperienceItem
                key={`${index}`}
                company={exp.title}
                jobTitle={exp.jobTitle}
                description={exp.description}
              />
            ))}
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {experienceData
            .filter((_, index) => index >= 3 && index <= 5)
            .map((exp, index) => (
              <ExperienceItem
                key={`${index}`}
                company={exp.title}
                jobTitle={exp.jobTitle}
                description={exp.description}
              />
            ))}
        </div>
      </div>
    </div>
    </Reveal>
  );
};

export default Experience;
