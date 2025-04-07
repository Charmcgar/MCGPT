// Initialize the scene
const scene = new THREE.Scene();

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.set(0, 10, 100); // Set camera position

// Initialize the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a simple cube to the scene
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Initialize clock for delta time
const clock = new THREE.Clock();

// Initialize PointerLockControls
const controls = new THREE.PointerLockControls(camera, document.body);

// Event listener to request pointer lock on click
document.body.addEventListener('click', () => {
  controls.lock();
});

// Event listener to handle pointer lock change
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === document.body) {
    // Pointer lock enabled
    // Add event listeners for movement
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  } else {
    // Pointer lock disabled
    // Remove event listeners
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  }
});

// Movement variables
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = false;
const velocity = new THREE.Vector3();

// Keydown event handler
function onKeyDown(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;
    case 'Space':
      if (canJump) velocity.y = 350;
      canJump = false;
      break;
  }
}

// Keyup event handler
function onKeyUp(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;
  }
}

// Update function to handle movement
function updateMovement(delta) {
  const speed = 400.0;
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  velocity.y -= 9.8 * 100.0 * delta; // Gravity

  if (moveForward) velocity.z -= speed * delta;
  if (moveBackward) velocity.z += speed * delta;
  if (moveLeft) velocity.x -= speed * delta;
  if (moveRight) velocity.x += speed * delta;

  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  if (controls.getObject().position.y < 10) {
    velocity.y = 0;
    controls.getObject().position.y = 10;
    canJump = true;
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // seconds.
  updateMovement(delta);

  renderer.render(scene, camera);
}
animate();
