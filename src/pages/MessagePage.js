import React from "react";
import { OptimisedImage } from "../components";
import leeSiang from "../assets/about_images/lee-siang.jpg";
export function MessagePage() {
  return (
    <>
      <p className="lg:pl-0 md:pl-5 sm:pl-2 min-h-0 font-bold lg:text-[90px] md:text-[44px] sm:text-[36px] xs:tracking-[0.35em] xs:text-[28px] text-[20px] tracking-[0.30em] uppercase w-full text-center">
        message
      </p>
      <div className="min-h-0 lg:mt-5 pb-4">
        <div className="lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-x-8">
          <div className="lg:w-fit h-full w-full flex flex-col items-center justify-start lg:my-0 my-4">
            <OptimisedImage
              imageClassName="md:w-[300px] w-[200px] md:mb-8 mb-4"
              image={leeSiang}
            />
            <div className="w-[300px]">
              <p className="lg:text-xl font-bold text-center sm:text-base text-sm">
                Tai Lee Siang
              </p>
              <p className="text-center sm:text-base text-sm">
                Head of Pillar, Architecture and Sustainable Design
              </p>
            </div>
          </div>
          <p className="text-justify md:w-[630px] sm:w-[420px] xs:w-[320px] 2xs:w-[260px] w-[220px] lg:mx-0 mx-auto lg:mb-0 mb-4 leading-snug sm:text-[14px] text-xs">
            Dear graduates and class of 2022 <br />
            <br />
            I am sure you agree with me that the phrase “time flies” depicts
            your sentiments when you completed your undergraduate degree
            programme with ASD. Indeed, time flies when you joined SUTD a long
            time ago and subsequently ASD after term 3.
            <br />
            <br />
            You probably recall the fear and trembling of starting Core Studio
            1. Fear and trembling because Core Studio 1 was the start of a very
            long journey of architectural design. I am sure by now; you look
            back at Core Studio 1 with fondness because of the innocence of
            design that you once demonstrated. In a very short time, you
            progressed past Core Studio 2, Option Studio 1 & 2 and landed in
            Core Studio 3 - the penultimate housing studio before you graduate
            with the first degree. I should not neglect to mention ASD’s
            additional challenge of balancing heavy studio work with the famous
            SUTD Capstone projects. Regardless, you have all made it!
            <br />
            <br />
            I mention all these experiences to point out one thing about ASD
            graduates - perseverance. This is probably one of the best things
            that ASD can offer in your education. Architectural education is
            unique because it does not have standard answers to everything. It
            requires an inquisitive mind to pursue solutions that are yet to
            exist. Finally, it takes time and patience to translate imagination
            to reality. I hope you treasure this unique attribute that you have
            acquired and use it for all your life’s challenges.
            <br />
            <br />
            As you complete your structured internship and get ready for new
            challenges in life, I hope you take some time to reflect upon the
            wonderful journey and comradeship in the past 4 years. This
            exhibition is not just a showcase of your works. It is a record and
            memory of your learning journey and achievements. I hope you enjoy
            this showcase and most of all, continue the next lap of your
            wonderful journey in learning.
          </p>
        </div>
      </div>
    </>
  );
}
