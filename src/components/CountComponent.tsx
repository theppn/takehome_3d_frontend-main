import React, { useState } from "react";
import { getNotificationCenter } from "../notification";

const CountComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  getNotificationCenter().subscribe("shapeAdded", () => {
    setCount(count + 1);
  });
  getNotificationCenter().subscribe("shapeRemoved", () => {
    setCount(count - 1);
  });
  return <h2>{count} objects</h2>;
};

export default CountComponent;