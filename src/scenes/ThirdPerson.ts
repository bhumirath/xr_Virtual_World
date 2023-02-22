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
  PhysicsImpostor,
  OimoJSPlugin,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { shopGUI } from "./GUI";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  new HemisphericLight("light", Vector3.Up(), scene);

  const outer = MeshBuilder.CreateBox(
    "outer",
    { width: 2, depth: 1, height: 3 },
    scene
  );
  outer.isVisible = false;
  outer.isPickable = false;
  outer.checkCollisions = true;

  outer.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0));
  outer.ellipsoid = new Vector3(1, 1.5, 1);
  outer.ellipsoidOffset = new Vector3(0, 1.5, 0);

  outer.rotationQuaternion = new Quaternion(0, 1, 0, 0);

  SceneLoader.ImportMesh(
    "",
    "./models/",
    "helmet2.glb",
    scene,
    function (result) {
      const root = result[0];
      const body = root;
      body.parent = outer;
      body.isVisible = true; // make the player mesh visible
      body.isPickable = false;
      body.checkCollisions = true;
      body.getChildMeshes().forEach((m) => {
        m.isPickable = false;
      });

      return {
        mesh: outer as Mesh,
      };
    }
  );

  //const meshh = scene.getMeshByName("ROAD_TRANSFORM")

  const previousPosition = outer.position.clone(); // add this line to keep track of the previous position

  const ground = SceneLoader.ImportMesh(
    "",
    "./models/",
    "city2.glb",
    scene,
    function (meshes) {
      const asset = meshes.forEach((m)=>{
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
      })
      
      const roadMesh = meshes.find((mesh) => mesh.name === "ROAD_TRANSFORM");

        outer.position.copyFrom(roadMesh.getAbsolutePosition());
        //roadMesh.checkCollisions = false;
        //roadMesh.isPickable = false;

        const shop1 = function () {
          shopGUI(AdvancedDynamicTexture, scene, "apple.png", "apple", "50");
        };

        const shop11 = meshes.find(
          (mesh) => mesh.name === "House_2_World ap_0"
        );
        shop11.actionManager = new ActionManager();
        shop11.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop1)
        );

        const shop2 = function () {
          shopGUI(AdvancedDynamicTexture, scene, "beer.png", "beer", "100");
        };

        const shop12 = meshes.find((mesh) => mesh.name === "House_World ap_0");
        shop12.actionManager = new ActionManager();
        shop12.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop2)
        );

        const shop3 = function () {
          shopGUI(AdvancedDynamicTexture, scene, "cat.jpg", "cat", "500");
        };

        const shop13 = meshes.find((mesh) => mesh.name === "Shop_World ap_0");
        shop13.actionManager = new ActionManager();
        shop13.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop3)
        );

        const shop4 = function () {
          shopGUI(AdvancedDynamicTexture, scene, "muffin.png", "muffin", "80");
        };

        const shop14 = meshes.find(
          (mesh) => mesh.name === "House_3_World ap_0"
        );
        shop14.actionManager = new ActionManager();
        shop14.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, shop4)
        );
        
        /*
        outer.physicsImpostor = new PhysicsImpostor(outer, PhysicsImpostor.BoxImpostor, {mass: 5, restitution: 0.2}, scene);
        outer.physicsImpostor.setMass(5);
        */
       
        /*
        outer.actionManager.registerAction(
          new ExecuteCodeAction(
              {
                  trigger: ActionManager.OnIntersectionEnterTrigger,
                  roadMesh,
              },
              () => {
                  outer.position.copyFrom(previousPosition)}));
                  */
                  
            
      

      return scene;
    }
  );

  const input = new PlayerInput(scene);
  const player = new Player(outer, scene, input);
  const camera = player.activatePlayerCamera();


/*
  window.addEventListener('load', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  */

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
