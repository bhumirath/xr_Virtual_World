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

  //const ground = SceneLoader.ImportMesh("", "path/to/city/", "city.babylon", scene);
  /*
  const ground = SceneLoader.ImportMesh(
    "",
    "./models/",
    "city_mod.glb",
    scene,function(meshes){
      const roadMesh = meshes.find(mesh => mesh.name === "ROAD_TRANSFORM"); // Replace "Road" with the actual name of your road mesh
    if(roadMesh){
      outer.position.copyFrom(roadMesh.getAbsolutePosition());
      outer.position.y += 1.5;
      roadMesh.checkCollisions = true;

    // Create and add a new mesh to the scene // create random box and make collision
    const box = MeshBuilder.CreateBox("Box", { size: 2 }, scene);
    box.position = new Vector3(0, 1, 0);
    box.checkCollisions = true;

    // Add metadata to the new mesh
    box.metadata = "MyCustomMesh";

    return scene;
    }else{
      console.log("no");
    }
    });
    */

  const ground = SceneLoader.ImportMesh(
    "",
    "./models/",
    "city_mod.glb",
    scene,
    function (meshes) {
      const roadMesh = meshes.find((mesh) => mesh.name === "ROAD_TRANSFORM");
      
      if (roadMesh) {
        outer.position.copyFrom(roadMesh.getAbsolutePosition());
        outer.position.y += 1.5;
        roadMesh.checkCollisions = true;
        roadMesh.isPickable = false;

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

        const previousPosition = outer.position.clone();

        // Check for intersections with roadMesh every frame
        /*
            scene.actionManager.registerAction(
              new ExecuteCodeAction(ActionManager.OnEveryFrameTrigger, () => {
                if (!outer.intersectsMesh(roadMesh, true)) {
                  outer.position.copyFrom(previousPosition);
                } else {
                  previousPosition.copyFrom(outer.position);
                }
              })
            );
            */
      }

      return scene;
    }
  );

  /*
    
            const previousPosition = outer.position.clone();

    scene.actionManager.registerAction(
              new ExecuteCodeAction(ActionManager.OnEveryFrameTrigger,() => {
                // Check if outer is not intersecting with the road mesh
                if (!outer.intersectsMesh(roadMesh, true)) {
                  // Reset the position of outer to the previous position
                  outer.position.copyFrom(previousPosition);
                } else {
                  // Update the previous position to the current position
                  previousPosition.copyFrom(outer.position);
                }
              })
            );
    */
  /*
    const ground = SceneLoader.ImportMesh(
      "",
      "./models/",
      "city_mod.glb",
      scene,
      function (meshes) {
        meshes.forEach(function(m) {
          if (m.name == "ROAD_TRANSFORM") {
            //dont check for collisions, dont allow for raycasting to detect it(cant land on it)
            outer.position.copyFrom(m.getAbsolutePosition());
            outer.position.y += 1.5;
            m.checkCollisions = false;
            m.isPickable = false;
          }
          //areas that will use box collisions
          if (m.name.includes("ROAD_Lines_12_World ap_0")) {
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
      
        return scene;
      }
    );
    */

  const input = new PlayerInput(scene);
  const player = new Player(outer, scene, input);
  const camera = player.activatePlayerCamera();

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
