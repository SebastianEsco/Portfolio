// Shared Three.js Model Viewer for 3D Portfolio Displays
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function initModelViewer(containerId = 'model-wrapper') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Read config from dataset attributes or fall back to defaults
  const modelPath = container.dataset.model || 'model/Puzzle2.glb';
  const initialCamZ = parseFloat(container.dataset.cameraZ || '1');
  const minZoom = parseFloat(container.dataset.minZoom || '0.85');
  const maxZoom = parseFloat(container.dataset.maxZoom || '1.65');
  const EASE = parseFloat(container.dataset.ease || '0.08');
  const hintMsg = container.dataset.hint || 'Arrastra para girar el objeto';

  const CANVAS_HEIGHT = 600;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, CANVAS_HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Scene setup
  const scene = new THREE.Scene();

  let autoRotate = true;
  const AUTO_ROTATE_SPEED = 0.002;
  let hintShown = true;

  // Floating interaction hint
  const hint = document.createElement('div');
  hint.innerText = hintMsg;
  hint.style.position = 'absolute';
  hint.style.bottom = '15px';
  hint.style.left = '50%';
  hint.style.transform = 'translateX(-50%)';
  hint.style.padding = '6px 12px';
  hint.style.background = 'rgba(0,0,0,0.6)';
  hint.style.color = '#fff';
  hint.style.fontSize = '13px';
  hint.style.borderRadius = '8px';
  hint.style.pointerEvents = 'none';
  hint.style.fontFamily = 'sans-serif';
  hint.style.transition = 'opacity 0.5s';
  container.style.position = 'relative';
  container.appendChild(hint);

  function hideHint() {
    if (hintShown) {
      hint.style.opacity = '0';
      setTimeout(() => hint.remove(), 500);
      hintShown = false;
    }
  }

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / CANVAS_HEIGHT,
    0.01,
    500
  );
  camera.position.set(0.05, -0.1, initialCamZ);
  scene.add(camera);

  const initialCameraPosition = camera.position.clone();

  // Lighting setup
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(3, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.HemisphereLight(0x88aaff, 0x444466, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffaa55, 8);
  rimLight.position.set(-5, 3, -5);
  scene.add(rimLight);

  let model = null;
  let idleTimeout;
  const IDLE_DELAY = 3000;
  let restoring = false;
  const EPS = 0.001;
  let initialRotation = new THREE.Euler(0, 0, 0);

  // Load GLTF Model
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      model = gltf.scene;
      model.position.set(0.05, 0, 0);
      model.rotation.set(0.33, -0.5, 0);
      scene.add(model);

      initialRotation = model.rotation.clone();

      const pc = document.getElementById('progress-container');
      if (pc) pc.style.display = 'none';

      resetIdleTimer();
    },
    (xhr) => {
      if (xhr.total > 0) {
        console.log(`Loading 3D model: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
      }
    },
    (err) => console.error('Error loading GLTF model:', err)
  );

  // Mouse Interaction (Drag to Rotate)
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  const ROTATE_SPEED = 0.01;
  const MAX_ROT_X_UP = 1.65;
  const MAX_ROT_X_DOWN = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
    autoRotate = false;
    hideHint();
    clearTimeout(idleTimeout);
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    resetIdleTimer();
  });

  container.addEventListener('mouseleave', () => {
    isDragging = false;
    resetIdleTimer();
  });

  container.addEventListener('mousemove', (e) => {
    if (isDragging && model) {
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      model.rotation.y += deltaX * ROTATE_SPEED;
      model.rotation.x += deltaY * ROTATE_SPEED;

      if (model.rotation.x > MAX_ROT_X_UP) model.rotation.x = MAX_ROT_X_UP;
      if (model.rotation.x < MAX_ROT_X_DOWN) model.rotation.x = MAX_ROT_X_DOWN;

      prevX = e.clientX;
      prevY = e.clientY;
    }
  });

  // Wheel Zoom
  const onWheel = (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.001;

    if (camera.position.z < minZoom) camera.position.z = minZoom;
    if (camera.position.z > maxZoom) camera.position.z = maxZoom;

    restoring = false;
    resetIdleTimer();
  };

  container.addEventListener('wheel', (e) => {
    onWheel(e);
    autoRotate = false;
    hideHint();
  });

  function resetIdleTimer() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      restoring = true;
    }, IDLE_DELAY);
  }

  // Responsive Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / CANVAS_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, CANVAS_HEIGHT);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      if (restoring) {
        model.rotation.x += (initialRotation.x - model.rotation.x) * EASE;
        model.rotation.y += (initialRotation.y - model.rotation.y) * EASE;
        model.rotation.z += (initialRotation.z - model.rotation.z) * EASE;
        camera.position.lerp(initialCameraPosition, EASE);

        if (
          Math.abs(model.rotation.x - initialRotation.x) < EPS &&
          Math.abs(model.rotation.y - initialRotation.y) < EPS &&
          Math.abs(model.rotation.z - initialRotation.z) < EPS &&
          camera.position.distanceTo(initialCameraPosition) < EPS
        ) {
          model.rotation.copy(initialRotation);
          camera.position.copy(initialCameraPosition);
          restoring = false;
          autoRotate = true;
        }
      } else if (autoRotate) {
        model.rotation.y += AUTO_ROTATE_SPEED;
      }
    }

    renderer.render(scene, camera);
  }
  animate();
}

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', () => {
  initModelViewer();
});
