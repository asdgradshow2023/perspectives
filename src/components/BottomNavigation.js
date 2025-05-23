import React from "react";

export function BottomNavigation(props) {
  return (
    <div className="fixed z-10 bottom-0 w-full">
      <div className="backdrop-blur-md h-12 w-[200%]" />
      <div className="w-full h-full flex items-center justify-center lg:space-x-8 sm:space-x-4 space-x-2 absolute top-0 2xs:mx-0 mx-1">
        {props.children}
      </div>
    </div>
  );
}
