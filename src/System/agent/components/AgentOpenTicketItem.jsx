import React, { useEffect, useState } from "react";

const AgentOpenTicketItem = ({ x, index, pickedTicket }) => {
  const [elapsedTime, setElapsedTime] = useState(
    calculateElapsedTime(x.createdAt)
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevtime) => prevtime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  function calculateElapsedTime(createdAt) {
    const diffInMilliseconds = new Date() - new Date(createdAt);
    return Math.floor(diffInMilliseconds / 1000);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <tr key={index}>
      <th scope="row">{++index}</th>
      <td>{x?.title}</td>
      <td>{x.category?.name}</td>
      <td>{x.priority}</td>
      <td>{x.createdAt.slice(0, 10)}</td>
      <td>
        <span className={`${elapsedTime >= 600 && "breached"}text-center px-3`}>
          {formatTime(elapsedTime)}
        </span>
      </td>
      <td className="text-center" role="button">
        <span className="text-warning" onClick={() => pickedTicket(x._id)}>
          Pick
        </span>
      </td>
    </tr>
  );
};

export default AgentOpenTicketItem;
