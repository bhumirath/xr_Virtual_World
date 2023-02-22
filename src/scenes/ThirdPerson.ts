import { Player } from "@/scenes/Player";
import { PlayerInput } from "@/scenes/PlayerInput";
import {
  Engine,
  Scene,
  SceneLoader,
  Vector3,
  MeshBuilder,
  Matrix,
  HemisphericLight,
  Quaternion,
  Mesh,
  ExecuteCodeAction,
  ActionManager,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { shopGUI } from "./GUI";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  new HemisphericLight("light", Vector3.Up(), scene);

  const box = MeshBuilder.CreateBox(
    "box",
    { width: 2, depth: 1, height: 3 },
    scene
  );
  box.isVisible = false;
  box.isPickable = false;
  box.checkCollisions = true;

  box.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0));
  box.ellipsoid = new Vector3(1, 1.5, 1);
  box.ellipsoidOffset = new Vector3(0, 1.5, 0);

  box.rotationQuaternion = new Quaternion(0, 1, 0, 0);

  SceneLoader.ImportMesh(
    "",
    "./models/",
    "helmet2.glb",
    scene,
    function (result) {
      const root = result[0];
      const body = root;
      body.parent = box;
      body.isVisible = true;
      body.isPickable = false;
      body.checkCollisions = true;
      body.getChildMeshes().forEach((m) => {
        m.isPickable = false;
      });

      return {
        mesh: box as Mesh,
      };
    }
  );

  SceneLoader.ImportMesh(
    "",
    "./models/",
    "citywall.glb",
    scene,
    function (meshes) {
      const asset = meshes.forEach((m) => {
        m.checkCollisions = true;
        m.receiveShadows = true;
        if (m.name == "ROAD_TRANSFORM") {
          //dont check for collisions, dont allow for raycasting to detect it(cant land on it)
          m.checkCollisions = false;
          m.isPickable = false;
        }
        //collision meshes
        if (m.name.includes("collision")) {
          m.isVisible = false;
          m.isPickable = true;
        }
        //trigger meshes
        if (m.name.includes("Trigger")) {
          m.isVisible = false;
          m.isPickable = false;
          m.checkCollisions = false;
        }
      });

      const roadMesh = meshes.find((mesh) => mesh.name === "ROAD_TRANSFORM");

      box.position.copyFrom(roadMesh.getAbsolutePosition());

      //กำหนดร้านค้า 4 ร้านค้า
      const shop1 = function () {
        shopGUI(AdvancedDynamicTexture,"apple.png", "apple", "50");
      };

      const shop_1 = meshes.find((mesh) => mesh.name === "House_2_World ap_0");
      shop_1.actionManager = new ActionManager();
      shop_1.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop1)
      );

      const shop2 = function () {
        shopGUI(AdvancedDynamicTexture,"beer.png", "beer", "100");
      };

      const shop_2 = meshes.find((mesh) => mesh.name === "House_World ap_0");
      shop_2.actionManager = new ActionManager();
      shop_2.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop2)
      );

      const shop3 = function () {
        shopGUI(AdvancedDynamicTexture,"cat.jpg", "cat", "500");
      };

      const shop_3 = meshes.find((mesh) => mesh.name === "Shop_World ap_0");
      shop_3.actionManager = new ActionManager();
      shop_3.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop3)
      );

      const shop4 = function () {
        shopGUI(AdvancedDynamicTexture,"muffin.png", "muffin", "80");
      };

      const shop_4 = meshes.find((mesh) => mesh.name === "House_3_World ap_0");
      shop_4.actionManager = new ActionManager();
      shop_4.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop4)
      );

      return scene;
    }
  );
  
  const input = new PlayerInput(scene);
  const player = new Player(box, scene, input);
  const camera = player.activatePlayerCamera();

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
