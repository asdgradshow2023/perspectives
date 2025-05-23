import React, { useState, useEffect, useMemo } from "react";
import { BottomNavigation, TestThree } from "../components";
import { useLocation } from 'react-router-dom';
export function AllProjectsPage() {
  const types = ["Culture", "Ecology", "Social", "Technology"];
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialProjectType = queryParams.get('type') || types[0];

  const bgImages = useMemo(() => {
    return {
      Culture: require("../assets/mapped_images/ct_bg.png"),
      Ecology: require("../assets/mapped_images/ec_bg.png"),
      Social: require("../assets/mapped_images/sc_bg.png"),
      Technology: require("../assets/mapped_images/tc_bg.png"),
    };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [projectType, setProjectType] = useState(initialProjectType);
  function onClickHandler(type) {
    setProjectType(type);
  }
  useEffect(() => {
    setIsLoading(true);
  }, [projectType]);
    

    

  useEffect(() => {
    let img = new Image();
    img.src = bgImages[projectType];
    if (img.complete) {
      console.log("bg loaded from cache");
      setIsLoading(false);
    } else {
      img.onload = function () {
        console.log("bg loaded");
        setIsLoading(false);
      };
    }
  }, [projectType, bgImages]);
  return (
    <div
      className={projectType}
      style={{ backgroundImage: `url(${bgImages[projectType]})` }}
    >
      <BottomNavigation>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onClickHandler(type)}
            className={
              (projectType === type ? "font-bold" : "font-light") +
              " sm:text-base 2xs:text-[10px] text-[8px] text-white text-center uppercase tracking-[0.15em]"
            }
          >
            {type}
          </button>
        ))}
      </BottomNavigation>

      <TestThree
        pagetype={projectType}
        loadingText="Loading projects..."
        additionalLoading={!isLoading}
      />
    </div>
  );
}
