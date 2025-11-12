const Projects = () => {
  return (
    <div id="projects" className="min-h-screen w-full flex flex-col items-center justify-center gap-20 p-10 md:p-16 xl:px-32 ">
      <h1 className="text-center text-5xl font-light ">Projects</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 ">
        <div className="text-left space-y-2 border-2 hover:scale-105 transition-all duration-200 cursor-pointer px-8 py-10 border-sky-950 rounded-lg hover:bg-sky-50 ">
          <h1 className="project-headers">Project 1</h1>
          <h3 className="project-sub-headers">Tech Stack</h3>
          <p className="project-body-text">Aliqua aliqua aliquip veniam id est quis est elit labore irure id aliquip cupidatat. In qui qui magna ipsum nostrud id consequat mollit ullamco minim irure magna est ex. Ex pariatur commodo laborum irure laboris. Enim aliqua occaecat nisi quis commodo.</p>
        </div>
      </div>
    </div>
  )
}

export default Projects