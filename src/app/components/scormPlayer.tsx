// components/ScormPlayer.tsx
import React, { useEffect } from "react";
import useScorm from "../hooks/useScorm";

interface ScormPlayerProps {
  src: string;
}

const ScormPlayer: React.FC<ScormPlayerProps> = ({ src }) => {
  //   const { getScormValue, setScormValue } = useScorm();

  //   useEffect(() => {
  //     setScormValue("cmi.core.lesson_status", "incomplete");
  //     const status = getScormValue("cmi.core.lesson_status");
  //     console.log("Lesson status:", status);
  //   }, [getScormValue, setScormValue]);

  const { getScormValue, setScormValue } = useScorm();

  useEffect(() => {
    const initializeScorm = async () => {
      try {
        await setScormValue("cmi.core.lesson_status", "incomplete");
        const status = await getScormValue("cmi.core.lesson_status");
        console.log("Lesson status:", status);
      } catch (error) {
        console.error("Error initializing SCORM:", error);
      }
    };

    initializeScorm();
  }, [getScormValue, setScormValue]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <iframe
        src={src}
        style={{ border: "none", height: "100%", width: "100%" }}
        title="SCORM Package"
      />
    </div>
  );
};

export default ScormPlayer;
