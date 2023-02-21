import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
} from "@babylonjs/core";
const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  // cam
  const camera = new FreeCamera("camera1", new Vector3(0, 5.0, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.minZ = 0.01;

  // cam control
  camera.keysUp.push(87); // W
  camera.keysDown.push(83); // S
  camera.keysLeft.push(65); // A
  camera.keysRight.push(68); // S
  // cam speed
  camera.speed = 0.2;
  camera.angularSensibility = 2000;
  camera.applyGravity = true;
  camera.checkCollisions = true;

  // gravity
  const g = 9.8;
  const fps = 60;
  scene.gravity = new Vector3(0, -g / fps, 0);
  scene.collisionsEnabled = true;

  // light
  new HemisphericLight("light", Vector3.Up(), scene);

  // box
  const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  const matBox = new StandardMaterial("material-box", scene);
  matBox.diffuseColor = Color3.Red();
  box.material = matBox;
  box.checkCollisions = true;

  //ground
  const ground = MeshBuilder.CreateBox(
    "ground",
    { width: 100, height: 2, depth: 100 },
    scene
  );
  ground.position.y = -2;
  const matGround = new StandardMaterial("material-ground", scene);
  matGround.diffuseColor = new Color3(0.5, 0.5, 0.5);
  ground.material = matGround;
  ground.checkCollisions = true;

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
