const projectSlides = [
  {
    projectName: "DownLow",
    projectInfo: "Design, Development",
  },
  {
    projectName: "Better Breakfast Bureau",
    projectInfo: "Design, Development",
  },
];

function Projects() {
  return (
    <>
      {projectSlides.map((slide) => {
        return (
          <>
            <div key={slide.projectName} className="projectSlide">
              <h1>{slide.projectName}</h1>
              <p>{slide.projectInfo}</p>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Projects;
