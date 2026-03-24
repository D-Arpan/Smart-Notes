"use client";

import { useEffect, useState } from "react";

const LOADER_MESSAGES = [
  {
    title: "Preparing your workspace",
    text: "Waking the backend and restoring your notes experience."
  },
  {
    title: "Syncing your notes flow",
    text: "Getting the interface ready for reading, writing, and editing."
  },
  {
    title: "Setting things in place",
    text: "Bringing your private notes space online."
  },
  {
    title: "Almost ready",
    text: "Finishing the startup sequence for Smart Notes."
  }
] as const;

export function AppLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADER_MESSAGES.length);
    }, 1250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const message = LOADER_MESSAGES[messageIndex];

  return (
    <div className="app-loader" aria-label="Loading application" role="status">
      <div className="app-loader__panel">
        <span className="app-loader__badge">Smart Notes</span>

        <div className="app-loader__visual" aria-hidden="true">
          <div className="app-loader__ring app-loader__ring--outer" />
          <div className="app-loader__ring app-loader__ring--inner" />
          <div className="app-loader__core" />
          <div className="app-loader__bars">
            <span className="app-loader__bar app-loader__bar--one" />
            <span className="app-loader__bar app-loader__bar--two" />
            <span className="app-loader__bar app-loader__bar--three" />
          </div>
        </div>

        <div className="app-loader__copy">
          <h1 className="app-loader__title">{message.title}</h1>
          <p className="app-loader__text">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
