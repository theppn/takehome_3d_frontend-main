import THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../../styles/main_view.css";

export function createMainView() {
  const mainView = document.getElementById("main-view");
  if (!mainView) {
    throw new Error("Could not find main view element");
  }

  // Set up the scene
  const scene = new THREE.Scene();

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(
    75,
    mainView.clientWidth / mainView.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Add basic lighting
  const light = new THREE.AmbientLight(0x404040); // Ambient light
  scene.add(light);

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.screenSpacePanning = true;
  controls.minDistance = 1;
  controls.maxDistance = 20;
  controls.maxPolarAngle = Math.PI / 2;

  if (mainView) {
    const mainViewContainerObserver = new ResizeObserver(() => {
      camera.aspect = mainView.clientWidth / mainView.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mainView.clientWidth, mainView.clientHeight);
    });
    renderer.setClearColor(0xffffff, 1);
    mainView.appendChild(renderer.domElement);
    // Handle resizing
    mainViewContainerObserver.observe(mainView, {});
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required for damping
    renderer.render(scene, camera);
  }
  animate();

  return {
    addToScene: (object: THREE.Object3D) => {
      scene.add(object);
    },
    removeLastFromScene: () => {
      const lastObject = scene.children[scene.children.length - 1];
      if (lastObject) {
        scene.remove(lastObject);
        return lastObject;
      }
    },
    clearScene: () => {
      scene.clear();
    },
    blinkObjectbyId: (id: number, interval: number, timeout: number) => {
      const obj = scene.getObjectById(id);
      if (obj) {
        const blinkInterval = setInterval(() => {
          obj.visible = !obj.visible;
        }, interval);
        setTimeout(() => {
          obj.visible = true;
          clearInterval(blinkInterval);
        }, timeout);
      }
    }
  };
}
