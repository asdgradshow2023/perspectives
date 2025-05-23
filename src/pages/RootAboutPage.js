import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BottomNavigation } from "../components";
import { NavRoutes } from "../routes/NavRoutes";
export function RootAboutPage() {
  return (
    <>
      <BottomNavigation>
        {NavRoutes.filter((route) => route.name === "About")
          .pop()
          .children.map((childRoute) => (
            <NavLink
              key={childRoute.name}
              end
              to={childRoute.path}
              className={({ isActive }) =>
                (isActive ? "font-bold" : "font-light") +
                " sm:text-base 2xs:text-[10px] text-[8px] text-white text-center uppercase tracking-[0.15em]"
              }
            >
              {childRoute.name}
            </NavLink>
          ))}
      </BottomNavigation>

      <div className="h-screen flex flex-col justify-center items-center overflow-y-scroll text-white">
        <div className="min-h-0 h-[700px] w-[300px] xs:w-[356px] sm:w-[460px] md:w-[650px] lg:w-[980px] xl:w-[1240px]">
          <div className="pb-12 sm:pt-0 pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="h-screen text-white border-box lg:mb-5 mb-10 flex lg:items-center justify-center items-start">
//   <div className="h-fit min-h-[650px] w-[320px] xs:w-[356px] sm:w-[460px] md:w-[650px] lg:w-[980px] xl:w-[1240px] py-10">
