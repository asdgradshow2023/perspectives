import { useNavigate, useParams } from "react-router-dom";
import projects from "../assets/drivers/gradshow2023_projects.json";
import students from "../assets/drivers/gradshow2023_people.json";
import React from "react";
import { OptimisedImage } from "../components/OptimisedImage";
import { SocialIcons } from "../components";
import { TestThree } from "../components";

export function ProjectPage() {
  const { projectUrl } = useParams();
  const navigate = useNavigate();
  const project = projects.data
    .filter((project) => {
      return project.url === projectUrl;
    })
    .pop();
  const participants = students.data.filter((student) => {
    return project.participants.includes(Number(student.id));
  });
  return (
    <div className="relative bg-black min-h-screen">
      <div className="lg:absolute lg:top-0 lg:right-0 lg:h-screen lg:w-[40%] lg:overflow-y-scroll pt-16 pb-4 lg:px-12 sm:px-24 2xs:px-16 px-14 xl:text-sm text-xs text-white">
        <p className="text-center font-bold text-4xl">{project.name}</p>

        <p className="mt-4">Students featured:</p>
        <p className="font-bold leading-4">
          {participants.map((participant, index) => {
            return (
              <React.Fragment key={`participant-${index}`}>
                <span
                  className={`hover:text-gray-400 cursor-pointer`}
                  onClick={() => navigate(`/students/${participant.url}`)}
                >
                  {participant.name}
                </span>
                {index !== participants.length - 1 && (
                  <span className="font-normal"> | </span>
                )}
              </React.Fragment>
            );
          })}
        </p>

        <p className="mt-3">Category:</p>

            <p className="font-bold leading-4">
                <span
                  className={`hover:text-gray-400 cursor-pointer`}
                  onClick={() => navigate(`/projects?type=${categoryMap[project.category]}`)}
                >
                  {categoryMap[project.category]}
                </span></p>


        <p className="mt-3">Module:</p>
        <p className="leading-4">{project.module}</p>
        {project.video && (
          <div className="mt-3 flex">
            <p>Video:</p>
            <SocialIcons
              url={project.video}
              type="video"
              className="ml-2 xl:h-5 lg:mt-0 mt-0.5 hover:text-gray-400"
            />
          </div>
        )}
        {project.mainContent.split("\n").map((str, index) => (
          <p
            className="mt-3 text-justify leading-relaxed"
            key={`paragraph-${index}`}
          >
            {str}{" "}
          </p>
        ))}
      </div>
      <div className="lg:w-[60%] lg:pt-0 pt-8 overflow-y-auto lg:h-screen lg:max-h-[1000px]">
        {project.subContent.map((content) =>
          content.image ? (
            <OptimisedImage
              key={content.image}
              image={require(`../assets/project_images/${project.id}/${content.image}`)}
              blurhash={content.blurhash}
            />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}

const categoryMap = {
  ct: "Culture",
  ec: "Ecology",
  tc: "Technology",
  sc: "Social",
};
