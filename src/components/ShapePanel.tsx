import React from "react";
import { createRoot } from "react-dom/client";
import ShapeButton from "./ShapeButton";
import "../../styles/shape_panel.css";
import { type MainViewController } from "../3d/MainViewController";

const ShapePanel: React.FC<{ controller: MainViewController }> = ({
  controller,
}) => {
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
    </div>
  );
};

export function createShapePanel(controller: MainViewController) {
  const panelRoot = document.getElementById("shape-panel");
  if (panelRoot) {
    createRoot(panelRoot).render(<ShapePanel controller={controller} />);
  }
};