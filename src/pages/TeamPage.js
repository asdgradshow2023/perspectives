import React from "react";
import team from "../assets/drivers/gradshow2023_team.json";
import { OptimisedImage } from "../components";

export function TeamPage() {
  return (
    <>
      <p className="lg:pl-2 md:pl-5 sm:pl-2 min-h-0 font-bold lx:text-[90px] lg:text-[80px] md:text-[48px] sm:text-[36px] sm:tracking-[0.32em] xs:text-[24px] text-[20px] 2xs:w-full w-[220px] mx-auto xs:mx-0 tracking-[0.25em] uppercase w-full text-center">
        curatorial team
      </p>
      <div className="flex lg:flex-row lg:justify-center lg:items-start flex-col items-center lg:space-x-14 lg:space-y-0 space-y-8 sn:mt-10 mt-5">
        <div className="lg:max-w-[320px] xs:w-fit 2xs:w-[260px] w-[220px] text-justify sm:text-base text-sm">
          <p>
            Of course, this Gradshow would not have been possible without the
            men and women behind it. We would like to extend our gratitude to
            the Perspectives Gradshow Team 2023 for the hard work and effort
            that they have put into planning and preparing for this Gradshow.
            <br />
            <br /> We would also like to extend our thanks to the faculty and
            staff who have supported us from the very beginning as we grew to be
            who we are today.
          </p>
          <br />
          <p className="lg:text-justify text-center">
            <span className="font-bold">Special Thanks:</span> <br />
            SUTD Fabrication Lab
            <br />
            SUTD Office of Advancement and Development
            <br />
            B.Sc (ASD) Class of 2022
          </p>
        </div>
        <div className="flex lg:justify-start justify-center flex-wrap sm:gap-x-6 gap-x-4 sm:gap-y-2 gap-y-4 max-w-[630px] xs:w-[130%] pb-4">
          {team.data.map((member) => {
            return (
              <MemberImage
                key={member.name}
                src={require(`../assets/${member.image}`)}
                blurhash={member.blurhash}
                name={member.name}
                alt={member.name}
                role={member.role}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
function MemberImage({ src, blurhash, name, role, alt }) {
  return (
    <div className="w-[95px] flex flex-col items-center">
      <div className="w-[80px]">
        <OptimisedImage
          imageClassName={`h-[80px] w-full object-cove rounded-full`}
          blurhashClassName={"overflow-hidden rounded-full"}
          image={src}
          blurhash={blurhash}
          alt={alt}
        />
      </div>
      <p className={`mt-2 font-semibold w-full text-center text-[10px]`}>
        {name}
      </p>
      <p className={`w-full text-center text-[10px]`}>[{role}]</p>
    </div>
  );
}
