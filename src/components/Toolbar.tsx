import React, { useRef, useState } from "react";
import "../../styles/toolbar.css";
import { MainViewController } from "../3d/MainViewController";
import { getNotificationCenter } from "../notification";
import { defaultProjectName } from "../config";
import { createRoot } from "react-dom/client";
import CountComponent from "./CountComponent";

const Toolbar: React.FC<{ controller: MainViewController }> = ({
  controller,
}) => {
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const [projectName, setProjectName] = useState(defaultProjectName); 

  const changeName = () => {
    let newName: string | null = null;
    while (!newName) {
      newName = prompt("Enter new name", projectName);
    }
    getNotificationCenter().notify("projectName", newName);
  }

  getNotificationCenter().subscribe("projectName", (newName: string) => {
    setProjectName(newName)
  })

  return (
    <>
      <h2 className="project-name" title={projectName}>
        {projectName}
      </h2>
      <button onClick={() => changeName()}>Change name</button>
      <button onClick={() => controller.removeLastShape()}>Undo</button>
      <button onClick={() => controller.reinsertPreviousShape()}>Redo</button>
      <button onClick={() => controller.clearAll()}>Clear all</button>
      <div>{renderCounter.current} renders</div>
      <div id="react-toolbar-root"><CountComponent></CountComponent></div>
    </>
  );
};

export function createToolbar(controller) {  
  const toolbar = document.getElementById("top-toolbar");
  if (toolbar) {
    createRoot(toolbar).render(<Toolbar controller={controller}></Toolbar>);
  }
}