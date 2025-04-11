import THREE from "three";
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../../styles/shape_properties.css";
import { getNotificationCenter } from "../notification";
import { MainViewController } from "../3d/MainViewController";
import { defaultProjectName } from "../config";

const ShapeList: React.FC<{controller: MainViewController}> = ({controller}) => {
  const [projectName, setProjectName] = useState(defaultProjectName);
  const [shapesList, setShapesList] = useState<{id: number, name: String, color: string}[]>([]);
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  const blinkObject = (id: number) => {
    controller.blinkObjectbyId(id);
  }
  
  getNotificationCenter().subscribe("projectName", (newName: string) => {
    setProjectName(newName)
  })

  getNotificationCenter().subscribe("shapeAdded", (shape: THREE.Mesh) => {
    const newShapesList = shapesList.slice(0);
    const material = shape.material as THREE.MeshBasicMaterial; // OK assumption to do for this exercice 
    newShapesList.push({id: shape.id, name: shape.name, color: "#" + material.color.getHexString()});
    setShapesList(newShapesList);
  });

  getNotificationCenter().subscribe("shapeRemoved", (shape: THREE.Mesh) => {
    setShapesList(shapesList.filter(s => s.id != shape.id));
  });

  getNotificationCenter().subscribe("sceneCleared", () => {
    setShapesList([]);
  });

  return (
    <div>
      <h3 title={projectName}>{projectName}</h3>
      <div id="shapes-list">
        <ul>
          {shapesList.map((shape) => (
            <li key={shape.id.toString()}
            style={{color: shape.color}} onClick={() => blinkObject(shape.id)}>{shape.name}</li>
          ))}
        </ul>
      </div>
      <div>
        {renderCounter.current} renders 
      </div>
    </div>
  );
};

export function createShapeList(controller: MainViewController) {
  const listRoot = document.getElementById("shape-properties");
  if (listRoot) {
    createRoot(listRoot).render(<ShapeList controller={controller}/>);
  }
};