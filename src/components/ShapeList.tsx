import $ from "jquery";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../../styles/shape_properties.css";
import { getNotificationCenter } from "../notification";

const ShapeList: React.FC = () => {
  console.log($(".project-name").val())
  const [projectName, setProjectName] = useState($(".project-name").text());

  getNotificationCenter().subscribe("projectName", (newName) => {
    setProjectName(newName)
  })

  return (
    <div>
      <h3>{projectName}</h3>
      <span style={{ color: "red" }}>(list of shapes here)</span>
    </div>
  );
};

export function createShapeList() {
  const listRoot = document.getElementById("shape-properties");
  if (listRoot) {
    createRoot(listRoot).render(<ShapeList/>);
  }
};