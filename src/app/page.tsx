"use client";
import ScormPlayer from "./components/scormPlayer";

export default function Home() {
  const scormPath =
    "/scorm/creating-a-get-outdoors-101-program/scormcontent/index.html"; // Adjust this path
  return (
    <div className="h-screen w-screen">
      <h1>SCORM Player in Next.js</h1>
      {/* <SCORMPlayer scormPath={scormPath} /> */}
      <ScormPlayer src={scormPath} />
    </div>
  );
}
