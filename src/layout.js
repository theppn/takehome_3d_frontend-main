import "../styles/app.css";

export function createLayout() {
  // Create elements
  const toolbar = document.createElement("div");
  toolbar.id = "top-toolbar";
  toolbar.classList.add("top-toolbar");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  const leftBar = document.createElement("div");
  leftBar.id = "shape-panel";
  leftBar.classList.add("left-bar");

  const centerArea = document.createElement("div");
  centerArea.id = "main-view";
  centerArea.classList.add("center-area");

  const rightBar = document.createElement("div");
  rightBar.id = "shape-properties";
  rightBar.classList.add("right-bar");
  rightBar.textContent = "Project name + list of 3D objects";

  // Append children
  mainContainer.append(leftBar, centerArea, rightBar);

  // Add elements to the document body
  document.body.append(toolbar, mainContainer);
}