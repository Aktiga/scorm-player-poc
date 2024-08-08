import React, { useEffect, useRef } from "react";
import { API } from "scorm-again";

interface SCORMPlayerProps {
  scormPath: string;
}

export const TestScormPlayer: React.FC<SCORMPlayerProps> = ({ scormPath }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<API | null>(null);

  useEffect(() => {
    const initSCORM = async () => {
      if (!apiRef.current) {
        apiRef.current = new API({ autocommit: true });
        await apiRef.current.loadFromPath(scormPath);
        apiRef.current.initialize();
      }
    };

    initSCORM();

    return () => {
      if (apiRef.current) {
        apiRef.current.terminate();
      }
    };
  }, [scormPath]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={scormPath}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
};

export default TestScormPlayer;

// import React from "react";
// import { ScormProvider, useScorm } from "react-scorm-provider";

// interface SCORMPlayerProps {
//   scormPath: string;
// }

// const SCORMContent: React.FC = () => {
//   const { sco } = useScorm();

//   return <iframe src={sco?.url} style={{ width: "100%", height: "600px" }} />;
// };

// export const SCORMPlayer: React.FC<SCORMPlayerProps> = ({ scormPath }) => {
//   return (
//     <ScormProvider version="1.2" debug={true} path={scormPath}>
//       <SCORMContent />
//     </ScormProvider>
//   );
// };

// export default SCORMPlayer;
