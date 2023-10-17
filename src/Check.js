import React, { useEffect, useState } from "react";

const Check = () => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);

  return <p> wait please {count} </p>;
};

export default Check;
