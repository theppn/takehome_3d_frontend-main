import { createToolbar } from "./components/Toolbar";
import { createShapePanel } from "./components/ShapePanel";
import { createMainViewController } from "./3d/MainViewController";
import { createShapeList } from "./components/ShapeList";
import { createLayout } from "./layout";

function initializeApp() {
  createLayout();
  const shapeController = createMainViewController();
  createToolbar(shapeController);
  createShapePanel(shapeController);
  createShapeList(shapeController);
  return {};
}
export const app = initializeApp();
