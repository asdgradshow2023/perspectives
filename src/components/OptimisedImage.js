import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function OptimisedImage({
  image,
  blurhash,
  imageClassName,
  blurhashClassName,
}) {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log("Started loading image");
    setLoadStarted(true);
  };

  return (
    <div className="relative">
      <LazyLoadImage
        className={imageClassName}
        key={image}
        src={image}
        afterLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {!isLoaded && blurhash && (
        <Blurhash
          className={"!absolute top-0 left-0 h-1/3 w-full " + blurhashClassName}
          hash={blurhash}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          width={"100%"}
          height={"100%"}
          key={blurhash}
        />
      )}
    </div>
  );
}
