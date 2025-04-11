import React, { useRef, useState } from "react";
import { getNotificationCenter } from "../notification";

const CountComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  getNotificationCenter().subscribe("shapeAdded", () => {
    setCount(count + 1);
  });
  getNotificationCenter().subscribe("shapeRemoved", () => {
    setCount(count - 1);
  });
  getNotificationCenter().subscribe("sceneCleared", () => {
    setCount(0);
  });
  return <h2>{count} objects / {renderCounter.current} renders</h2>;
};

export default CountComponent;