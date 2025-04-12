import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ShapeButton from "./ShapeButton";
import "../../styles/shape_panel.css";
import { type MainViewController } from "../3d/MainViewController";
import { getNotificationCenter } from "../notification";

const ShapePanel: React.FC<{ controller: MainViewController }> = ({
  controller,
}) => {
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const [showRenderCounter, setShowRenderCounter] = useState(false);

  getNotificationCenter().subscribe("showRendererCounters", (val: boolean) => {
    setShowRenderCounter(val);
  });
  return (
    <div>
      <ShapeButton
        label="sphere"
        onClick={() => controller.createShape("sphere")}
      />
      <ShapeButton
        label="cube"
        onClick={() => controller.createShape("cube")}
      />
      <ShapeButton
        label="cylinder"
        onClick={() => controller.createShape("cylinder")}
      />
      <div className={showRenderCounter ? "" : "hidden" }>{renderCounter.current} renders</div>
    </div>
  );
};

export function createShapePanel(controller: MainViewController) {
  const panelRoot = document.getElementById("shape-panel");
  if (panelRoot) {
    createRoot(panelRoot).render(<ShapePanel controller={controller} />);
  }
};