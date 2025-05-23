import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CubeNavigation } from "../components";

export function RootPage() {
  const [position, setPosition] = useState("50% 50%");
  const repositionBg = (e) => {
    setPosition(
      `${-window.innerWidth + e.clientX - window.innerWidth / 2}px 
       ${-window.innerHeight + e.clientY - window.innerHeight / 2}px`
    );
  };
  useEffect(() => {
    window.addEventListener("mousemove", repositionBg);
    return () => {
      window.removeEventListener("mousemove", repositionBg);
    };
  });

  return (
    <div
      className="relative overflow-auto h-full bg-rainbow"
      style={{ backgroundPosition: position }}
    >
      <div className="fixed z-20">
        <CubeNavigation />
      </div>
      <Outlet />
    </div>
  );
}
