import { createLayout } from "./layout";
import { createToolbar } from "./toolbar";
import React from "react";
import { createRoot } from "react-dom/client";
import CountComponent from "./components/CountComponent";
import { createShapePanel } from "./components/ShapePanel";
import { createMainViewController } from "./3d/MainViewController";
import { createShapeList } from "./components/ShapeList";

function initializeApp() {
  createLayout();
  const shapeController = createMainViewController();

  createToolbar(shapeController);
  const reactToolbarRoot = document.getElementById("react-toolbar-root");
  if (reactToolbarRoot) {
    createRoot(reactToolbarRoot).render(<CountComponent />);
  }
  createShapePanel(shapeController);
  createShapeList();

  return {};
}

export const app = initializeApp();
