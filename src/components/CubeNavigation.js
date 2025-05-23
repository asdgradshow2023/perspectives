import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavRoutes } from "../routes/NavRoutes";

export function CubeNavigation() {
  const [sideBar, setSideBar] = useState(false);
  function toggleSidebar() {
    setSideBar(!sideBar);
  }
  return (
    <div className="h-full w-screen sm:pl-6">
      <div
        className="absolute z-30 ml-0 xs:ml-2 mt-3 scale-75 xs:scale-90 sm:scale-100 sm:mt-6 cursor-pointer"
        onClick={toggleSidebar}
      >
        <Cube triggerSpin={sideBar} />
      </div>
      <div
        className={`absolute left-0 z-10 w-full h-screen bg-black transition-[opacity] duration-700 ${
          sideBar ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      />
      <SideBar triggerSidebar={sideBar}>
        <div className="flex items-center justify-end py-4 px-2 ">
          <div className="invisible ml-2 mt-2 sm:mt-6 ">
            <Cube />
          </div>
          <div className="sm:pt-2 sm:ml-8 sm:mr-2 pb-2 font-bold sm:text-lg text-md tracking-[0.35em] uppercase cursor-default">
            perspectives
          </div>
        </div>
        <div className="h-[calc(100%_-_12em)] overflow-y-auto">
          {NavRoutes.map((route) => {
            return (
              <SideBarItem
                route={route}
                key={route.name}
                onClick={toggleSidebar}
              />
            );
          })}
        </div>
      </SideBar>
    </div>
  );
}

function SideBar({ triggerSidebar, ...props }) {
  return (
    <div
      className={`text-white min-w-max h-screen z-20 bg-[rgba(0,0,0,0.25)] absolute duration-[750ms] ease-in-out ${
        triggerSidebar ? "left-0" : "-left-full"
      }
      `}
    >
      {props.children}
      <div className="w-full h-24 absolute bottom-0 flex items-center justify-center">
        <img
          className="h-1/2"
          src={require("../assets/sutdLogo.png")}
          alt="SUTD Logo"
        />
        <img
          className="h-1/2"
          src={require("../assets/asdLogo.png")}
          alt="ASD Logo"
        />
      </div>
    </div>
  );
}

function SideBarItem({ route, ...props }) {
  const { name, path, external } = route;
  const navLinkStyle =
    " w-full sm:h-16 h-14 py-2 px-3 flex justify-between items-center hover:font-bold hover:bg-[rgba(0,0,0,0.5)] sm:text-sm text-xs tracking-widest cursor-pointer";
  return (
    <NavLink
      className={({ isActive }) => {
        return (
          (isActive
            ? "bg-[rgba(0,0,0,0.5)] font-bold"
            : "hover:bg-[rgba(0,0,0,0.25)]") + navLinkStyle
        );
      }}
      to={path}
      target={external ? "_blank" : ""}
      {...props}
    >
      {name}
    </NavLink>
  );
}

function Cube({ triggerSpin }) {
  const perspective = {
    perspectiveOrigin: "50% 50%",
    perspective: "1500px",
  };
  const cube = {
    position: "relative",
    width: "70%",
    height: "70%",
    paddingBottom: "15%",
    paddingTop: "15%",
    transformStyle: "preserve-3d",
    transformOrigin: "75% 70%",
    transition: "transform 0.75s",
    transform: "rotateY(230deg) rotateX(198deg) rotateZ(160deg)",
  };

  const side = {
    position: "absolute",
    left: "25%",
    top: "-15%",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    boxShadow: "inset 0 0 0 1.5px #fff",
    transformOrigin: "50% 50%",
    backfaceVisibility: "hidden",
    backgroundColor: "rgba(227, 227, 227, 0.5)",
  };
  const innerSide = {
    position: "absolute",
    width: "100%",
    height: "100%",
    transformOrigin: "0 0",
    backgroundColor: "inherit",
    boxShadow: "inherit",
    backfaceVisibility: "inherit",
  };

  const top = {
    transform: "rotateX(90deg)",
  };
  const bottom = {
    transform: "rotateZ(90deg) translateX(100%) rotateY(90deg)",
  };
  const front = {
    top: "100%",
    left: "0",
    transform: "rotateX(-90deg)",
  };
  const back = {
    top: "0",
    left: "100%",
    transform: "rotateY(90deg)",
  };
  const spin = {
    transform: "rotateY(20deg) rotateX(55deg) rotateZ(55deg)",
  };

  return (
    <div className="w-12 h-12" style={perspective}>
      <div style={triggerSpin ? { ...cube, ...spin } : cube}>
        <div style={{ ...side, ...top }}>
          <div style={{ ...innerSide, ...front }} />
          <div style={{ ...innerSide, ...back }} />
        </div>

        <div style={{ ...side, ...bottom }}>
          <div style={{ ...innerSide, ...front }} />
          <div style={{ ...innerSide, ...back }} />
        </div>
      </div>
    </div>
  );
}
