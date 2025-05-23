import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGlobe, faVideo } from "@fortawesome/free-solid-svg-icons";

export function SocialIcons({ type, url, className }) {
  const socialIconMap = {
    instagram: faInstagram,
    linkedin: faLinkedin,
    portfolio: faGlobe,
    email: faEnvelope,
    video: faVideo,
  };
  return (
    <a
      href={type === "email" ? `mailto:${url}` : url}
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon
        icon={socialIconMap[type] ? socialIconMap[type] : faCircleUser}
        className={className}
      />
    </a>
  );
}
