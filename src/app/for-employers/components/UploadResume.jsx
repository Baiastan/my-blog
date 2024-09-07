import { RESUME_CLICK_EVENT } from "@/app/data/events/events";

import React, { useState } from "react";

const UploadResume = ({ className }) => {
  const [resumeClicks, setResumeClicks] = useState(null);

  const handleResumeClick = async () => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: RESUME_CLICK_EVENT }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error("Error while updating number of clicks");
      }
      const numberOfClicks = data?.clicks;

      setResumeClicks(numberOfClicks);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return resumeClicks ? (
    <button className={className} disabled={true}>
      Check your downloads folder. #{resumeClicks}
    </button>
  ) : (
    <button className={className} onClick={handleResumeClick}>
      <a href="./baiastan_zhuzupbekov_resume.pdf" download>
        Download My Resume
      </a>
    </button>
  );
};

export default UploadResume;
