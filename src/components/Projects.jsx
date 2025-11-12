import projectData from "../data/projectData";
import ProjectItem from "../elements/ProjectItem";

const Projects = () => {
  return (
    <div
      id="projects"
      className="min-h-screen w-full flex flex-col items-center justify-center gap-20 p-10 md:p-16 xl:px-32"
    >
      <h1 className="text-center text-5xl font-light">Projects</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {projectData.map((proj, idx) => (
          <ProjectItem key={idx} {...proj} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
