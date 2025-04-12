import React, { useRef, useState } from "react";
import { getNotificationCenter } from "../notification";

const CountComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const [showRenderCounter, setShowRenderCounter] = useState(false);

  getNotificationCenter().subscribe("showRendererCounters", (val: boolean) => {
    setShowRenderCounter(val);
  });

  getNotificationCenter().subscribe("shapeAdded", () => {
    setCount(count + 1);
  });
  getNotificationCenter().subscribe("shapeRemoved", () => {
    setCount(count - 1);
  });
  getNotificationCenter().subscribe("sceneCleared", () => {
    setCount(0);
  });
  return <h2>{count} objects <div className={showRenderCounter ? "" : "hidden" }>/{renderCounter.current} renders</div></h2>;
};

export default CountComponent;