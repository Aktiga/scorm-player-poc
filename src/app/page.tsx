"use client";

import XAPIContent from "./components/xApiContent";

const XAPICoursePage = () => {
  const contentUrl =
    "/xapi/creating-a-get-outdoors-101-program-xapi/index.html";
  const userId = "user123"; // Replace with actual user ID from your auth system

  return (
    <div>
      <h1>xAPI Course</h1>
      <XAPIContent contentUrl={contentUrl} userId={userId} />
    </div>
  );
};

export default XAPICoursePage;
