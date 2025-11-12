const ProjectItem = ({ projectTitle, techStack, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="project-tile">
        <h1 className="project-headers">{projectTitle}</h1>
        <h3 className="project-sub-headers">{techStack}</h3>
        <p className="project-body-text">{description}</p>
      </div>
     </a>
  );
};

export default ProjectItem;
