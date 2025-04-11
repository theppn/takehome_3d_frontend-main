import { get } from "jquery";
import { createMainView } from "./MainView";
import THREE from "three";
import { getNotificationCenter } from "../notification";
import { blinkInterval, blinkTimeout } from "../config";

export type Shape = 'sphere' | 'cube' | 'cylinder';
export interface MainViewController {
  createShape(shape: Shape): void;
  removeLastShape(): void;
  reinsertPreviousShape(): void;
  clearAll(): void;
  blinkObjectbyId(id: number): void;
  setProjectName(name: string): void;
}

export function createMainViewController(): MainViewController {
  const view = createMainView();
  const undoStack: THREE.Object3D[] = [];
  const geometries = {
    sphere: new THREE.SphereGeometry(1, 32, 32),
    cube: new THREE.BoxGeometry(1, 1, 1),
    cylinder: new THREE.CylinderGeometry(1, 1, 2, 32),
  };
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  ];
  function randomMaterial() {
    return materials[Math.floor(Math.random() * materials.length)];
  }
  function randomPosition() {
    return new THREE.Vector3(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
  }

  return {
    createShape(shape: Shape) {
      let newMesh: THREE.Mesh | undefined = undefined;
      switch (shape) {
        case "sphere":
          newMesh = new THREE.Mesh(geometries.sphere, randomMaterial());
          break;
        case "cube":
          newMesh = new THREE.Mesh(geometries.cube, randomMaterial());
          break;
        case "cylinder":
          newMesh = new THREE.Mesh(geometries.cylinder, randomMaterial());
          break;
      }
      if (newMesh) {
        newMesh.name = shape + ' ' + newMesh.id;
        undoStack.splice(0, undoStack.length);
        newMesh.position.copy(randomPosition());
        view.addToScene(newMesh);
        getNotificationCenter().notify("shapeAdded", newMesh);
      }
    },
    removeLastShape() {
      const lastObject = view.removeLastFromScene();
      if (lastObject) {
        undoStack.push(lastObject);
        getNotificationCenter().notify("shapeRemoved", lastObject);
      }
    },
    reinsertPreviousShape() {
      const lastObject = undoStack.pop();
      if (lastObject) {
        view.addToScene(lastObject);
        getNotificationCenter().notify("shapeAdded", lastObject);
      }
    },
    clearAll() {
      view.clearScene();
      undoStack.splice(0, undoStack.length);
      getNotificationCenter().notify("sceneCleared");
    },
    blinkObjectbyId(id: number) {      
      view.blinkObjectbyId(id, blinkInterval, blinkTimeout);
      getNotificationCenter().notify("objectBlinked", id);
    },
    setProjectName(name) {
      // project name is not saved in state for this example
      getNotificationCenter().notify("projectName", name);
    },
  };
}