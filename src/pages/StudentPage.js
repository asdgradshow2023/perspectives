import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import students from "../assets/drivers/gradshow2023_people.json";
import projects from "../assets/drivers/gradshow2023_projects.json";
import { SocialIcons, OptimisedImage } from "../components";

export function StudentPage() {
  const { studentUrl } = useParams();
  const student = students.data.filter((s) => s.url === studentUrl).pop();
  let profileImg, avatarImg;
  try {
    profileImg = require(`../assets/student_images/${student.assets.profile_img}`);
    avatarImg = require(`../assets/student_images/${student.assets.avatar_img}`);
  } catch (e) {
    console.error(e);
  }
  const studentProjects = projects.data.filter((p) =>
    student.project.includes(p.id)
  );

  return (
    <div className="w-full bg-black md:h-full h-fit text-white flex flex-col items-center justify-center">
      <div className="w-full h-fit bg-black md:max-w-[1020px] md:scale-90 md:my-[35px] sm:scale-125 sm:my-[275px] mx-4 max-w-[300px] my-[60px]">
        <div className="flex md:space-x-[60px] md:mb-[60px] md:flex-row flex-col">
          <SquaredImage
            src={profileImg}
            blurhash={student.assets.profile_blurhash}
            alt={student.name}
            srcHover={avatarImg}
            blurhashHover={student.assets.avatar_blurhash}
            altHover={student.name + "-avatar"}
          />

          <div className="flex flex-col justify-between">
            <div className="md:my-0 my-4">
              <p className="md:text-4xl font-bold mb-4 text-xl md:text-start text-center">
                {student.name}
              </p>
              <p className="text-justify md:text-base text-xs">
                {student.about}
              </p>
            </div>
            <div className="flex space-x-10 md:justify-start md:scale-100 justify-center scale-75">
              {student.social.map((account, index) => (
                <SocialIcons
                  url={Object.values(account)[0]}
                  type={Object.keys(account)[0]}
                  key={`${Object.values(account)[0]}`}
                  className={`${
                    Object.keys(account)[0] === "portfolio"
                      ? "h-7 mt-[0.8px]"
                      : "h-8"
                  } p-2 text-white transform hover:scale-110`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:space-y-0 space-y-[60px] md:flex-row md:overflow-auto md:space-x-[60px] mt-2">
          {studentProjects.map((project) => (
            <SquaredImage
              src={require(`../assets/project_images/${project.id}/${project.thumbnail.image}`)}
              blurhash={project.thumbnail.blurhash}
              alt={project.name}
              filter={project.category}
              caption={project.name}
              key={project.id}
              url={`/projects/${project.url}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SquaredImage({
  src,
  srcHover,
  blurhash,
  filter,
  alt,
  altHover,
  caption,
  url,
}) {
  const filters = {
    ct: "#EC5D55",
    ec: "#7AA697",
    sc: "#FBA51A",
    tc: "#7EADEB",
  };
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  function handleMouseEnter() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }
  // console.log(alt + " " + blurhash);
  return (
    <div
      className="relative w-[300px] min-w-[300px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {srcHover && (
        <img
          className={`h-[300px] w-full absolute top-0 opacity-0 transition duration-200 hover:opacity-100 z-10 `}
          src={srcHover}
          alt={altHover}
        />
      )}

      {filter && hover && (
        <div
          className="h-[300px] w-full absolute top-0 opacity-0 duration-200 transition hover:opacity-[0.25] z-10 cursor-pointer"
          style={{ backgroundColor: filters[filter] }}
          onClick={() => url && navigate(url)}
        ></div>
      )}
      <OptimisedImage
        imageClassName={`h-[300px] w-full object-cover`}
        image={src}
        blurhash={blurhash}
        alt={alt}
      />
      <p
        className={`mt-2 font-semibold w-full text-center`}
        style={{ color: hover ? filters[filter] : "white" }}
      >
        {caption}
      </p>
    </div>
  );
}
