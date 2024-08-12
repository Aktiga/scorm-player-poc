"use client";

import React, { useEffect, useState } from "react";
import { sendStatement, getStatements } from "../services/veracityXapiService";

interface XAPIContentProps {
  contentUrl: string;
  userId: string;
}

const XAPIContent: React.FC<XAPIContentProps> = ({ contentUrl, userId }) => {
  const [progress, setProgress] = useState<number>(0);
  console.log("progress", progress);

  useEffect(() => {
    const fetchProgress = async () => {
      console.log("Fetching progress from LRS...");
      const statements = await getStatements(
        userId,
        contentUrl,
        "http://adlnet.gov/expapi/verbs/progressed"
      );
      if (statements.length > 0) {
        const latestProgress = statements.reduce(
          (max: number, statement: any) => {
            const progress = statement.result?.score?.scaled * 100;
            return progress > max ? progress : max;
          },
          0
        );
        setProgress(latestProgress);
        console.log(`Fetched progress: ${latestProgress}%`);
      }
    };

    fetchProgress();

    const initializeXAPI = async () => {
      console.log("Initializing xAPI...");
      const statement = {
        actor: {
          mbox: `mailto:${userId}@example.com`,
          name: userId,
        },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/initialized",
          display: { "en-US": "initialized" },
        },
        object: {
          id: contentUrl,
          definition: {
            name: { "en-US": "Course" },
            description: { "en-US": "An xAPI course" },
          },
        },
      };

      await sendStatement(statement);
      console.log("Initialization statement sent.");
    };

    initializeXAPI();

    const handleCompletion = () => {
      console.log("Handling completion...");
      sendStatement({
        actor: {
          mbox: `mailto:${userId}@example.com`,
          name: userId,
        },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/completed",
          display: { "en-US": "completed" },
        },
        object: {
          id: contentUrl,
          definition: {
            name: { "en-US": "xAPI Course" },
            description: { "en-US": "User completed the xAPI course" },
          },
        },
      });
      console.log("Completion statement sent.");
    };

    const handleProgress = async (progress: number) => {
      console.log(`Handling progress: ${progress}%...`);
      setProgress(progress);

      sendStatement({
        actor: {
          mbox: `mailto:${userId}@example.com`,
          name: userId,
        },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/progressed",
          display: { "en-US": "progressed" },
        },
        object: {
          id: contentUrl,
          definition: {
            name: { "en-US": "xAPI Course" },
            description: { "en-US": `User progressed to ${progress}%` },
          },
        },
        result: {
          completion: false,
          success: true,
          score: {
            scaled: progress / 100,
          },
        },
      });
      console.log("Progress statement sent.");
    };

    window.addEventListener("beforeunload", handleCompletion);

    const trackProgress = () => {
      console.log("Tracking progress...");
      const iframe = document.querySelector("iframe");
      if (!iframe) return;

      iframe.contentWindow?.addEventListener("message", (event) => {
        if (event.data.type === "progress") {
          const progress = event.data.value;
          handleProgress(progress);
        }
      });
    };

    const trackCompletion = () => {
      console.log("Tracking completion...");
      const iframe = document.querySelector("iframe");
      if (!iframe) return;

      iframe.contentWindow?.addEventListener("message", (event) => {
        if (event.data.type === "completion") {
          handleCompletion();
        }
      });
    };

    trackProgress();
    trackCompletion();

    return () => {
      console.log("Cleaning up event listeners...");
      window.removeEventListener("beforeunload", handleCompletion);
    };
  }, [contentUrl, userId]);

  return (
    <iframe
      src={contentUrl}
      width="100%"
      height="500px"
      title="XAPI Content"
      allowFullScreen
    />
  );
};

export default XAPIContent;
