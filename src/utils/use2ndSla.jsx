import { useState, useEffect } from "react";

function use2ndSla(pickedAt) {
  const [elapsedTime, setElapsedTime] = useState(
    calculateElapsedTime(pickedAt)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateElapsedTime(createdAt) {
    if (!createdAt) return 0;

    const diffInMilliseconds = new Date() - new Date(createdAt);
    return Math.floor(diffInMilliseconds / 1000); // Convert to seconds
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return formatTime(elapsedTime);
}
export default use2ndSla;
