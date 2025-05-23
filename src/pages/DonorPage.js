import React from "react";
import logoTak from "../assets/about_images/logo-tak.svg";
import logoKosma from "../assets/about_images/logo-kosma.svg";
import logoZarch from "../assets/about_images/logo-zarch.svg";

export function DonorPage() {
  return (
    <>
      <p className="lg:pl-0 md:pl-5 sm:pl-2 min-h-0 font-bold lg:text-[76px] md:text-[48px] sm:text-[36px] sm:tracking-[0.32em] xs:text-[24px] text-[20px] tracking-[0.30em] uppercase w-full text-center">
        donor / <span className="sm:inline hidden">venue partners</span>
      </p>
      <p className="sm:hidden block lg:pl-0 md:pl-5 sm:pl-2 min-h-0 font-bold lg:text-[76px] md:text-[48px] sm:text-[36px] sm:tracking-[0.32em] xs:text-[24px] text-[20px] tracking-[0.30em] uppercase w-full text-center">
        venue partners
      </p>
      <div className="min-h-0 sm:mt-5 mt-0">
        <div className="flex flex-col sm:items-center items-start sm:space-y-14 space-y-4">
          <div className="h-full w-full flex lg:flex-row flex-col items-center sm:justify-center justify-start lg:space-x-28 lg:space-y-0 space-y-8 sm:scale-100 scale-[0.80]">
            <img src={logoTak} alt="Tak logo" className="scale-110" />
            <img src={logoZarch} alt="Zarch logo" />
            <img src={logoKosma} alt="Kosma logo" />
          </div>
          <p className="text-justify xl:w-[800px] lg:w-[800px] md:w-[600px] sm:w-[420px] xs:w-[320px] 2xs:w-[260px] w-[220px] lg:mx-0 mx-auto lg:mb-0 mb-4 sm:text-base text-xs">
            We would like to express our deepest gratitudes to our donor,
            Lamitak, and our venue partners, Zarch Collaboratives Pte Ltd and
            Kosma Holdings Pte Ltd, for their heartfelt contributions to this
            Gradshow. Their sponsorship and support has allowed us to make the
            show come to fruition. The physical exhibition would not have been
            possible without their support.
          </p>
        </div>
      </div>
    </>
  );
}
