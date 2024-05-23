import React from "react";

function BackgroundVideo() {
  return (
    <video className="background-video" autoPlay loop muted>
      <source src="agro7.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default BackgroundVideo;
