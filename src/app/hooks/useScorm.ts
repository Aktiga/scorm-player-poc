// // hooks/useScorm.ts
// import { useEffect } from "react";

// declare global {
//   interface Window {
//     pipwerks: any;
//   }
// }

// const useScorm = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined" && window.pipwerks) {
//       const pipwerks = window.pipwerks;

//       // Initialize SCORM
//       pipwerks.SCORM.version = "1.2"; // or '2004'
//       const initSuccess = pipwerks.SCORM.init();

//       if (!initSuccess) {
//         console.error("Failed to initialize SCORM.");
//         return;
//       }

//       return () => {
//         // Terminate SCORM session on component unmount
//         pipwerks.SCORM.quit();
//       };
//     } else {
//       console.error("SCORM API (pipwerks) not found.");
//     }
//   }, []);

//   const getScormValue = (cmiElement: string): string | null => {
//     return window.pipwerks?.SCORM?.get(cmiElement) ?? null;
//   };

//   const setScormValue = (cmiElement: string, value: string): boolean => {
//     return window.pipwerks?.SCORM?.set(cmiElement, value) ?? false;
//   };

//   return { getScormValue, setScormValue };
// };

// export default useScorm;

import { useEffect } from "react";

declare global {
  interface Window {
    pipwerks?: any;
    API?: any;
    API_1484_11?: any;
  }
}

const useScorm = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.pipwerks) {
        const pipwerks = window.pipwerks;

        // Check for SCORM 1.2 API
        if (window.API) {
          console.log("SCORM 1.2 API found");
          pipwerks.SCORM.version = "1.2";
        }
        // Check for SCORM 2004 API
        else if (window.API_1484_11) {
          console.log("SCORM 2004 API found");
          pipwerks.SCORM.version = "2004";
        } else {
          console.error(
            "No SCORM API found. Are you running this outside an LMS?"
          );
          return;
        }

        const initSuccess = pipwerks.SCORM.init();

        if (!initSuccess) {
          console.error("Failed to initialize SCORM.");
          return;
        }

        console.log("SCORM initialized successfully");

        return () => {
          pipwerks.SCORM.quit();
        };
      } else {
        console.error("SCORM API (pipwerks) not found.");
      }
    }
  }, []);

  const getScormValue = (cmiElement: string): string | null => {
    return window.pipwerks?.SCORM?.get(cmiElement) ?? null;
  };

  const setScormValue = (cmiElement: string, value: string): boolean => {
    return window.pipwerks?.SCORM?.set(cmiElement, value) ?? false;
  };

  return { getScormValue, setScormValue };
};

export default useScorm;
