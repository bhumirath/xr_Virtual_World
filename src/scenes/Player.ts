import {
  Scene,
  Vector3,
  TransformNode,
  Mesh,
  UniversalCamera,
  Quaternion,
  ArcRotateCamera,
} from "@babylonjs/core";
import type { PlayerInput } from "../scenes/PlayerInput";

export class Player extends TransformNode {
  public camera: UniversalCamera;
  public scene: Scene;

  //Player
  public mesh: Mesh; //outer collisionbox of player

  //Camera
  private _camRoot: TransformNode;

  //player movement vars
  private _deltaTime: number = 0;
  private _h: number;
  private _v: number;

  private _moveDirection: any;
  private _inputAmt: number;
  private _input: PlayerInput;

  private static readonly PLAYER_SPEED: number = 0.1;
  private static readonly ORIGINAL_TILT: Vector3 = new Vector3(
    Math.PI * 0.25,
    0,
    0
  );

  constructor(mesh: Mesh, scene: Scene, input: PlayerInput) {
    super("player", scene);
    this.scene = scene;
    this.mesh = mesh;
    this.mesh.parent = this;
    this.scene = scene;
    this._input = input;

    //camera
    this._setupPlayerCamera();
  }

  private _updateFromControls(): void {
    this._deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;

    this._moveDirection = Vector3.Zero();
    this._h = this._input.horizontal; //right, x
    this._v = this._input.vertical; //fwd, z

    //--MOVEMENTS BASED ON CAMERA (as it rotates)--
    const fwd = this._camRoot.forward;
    const right = this._camRoot.right;
    const correctedVertical = fwd.scaleInPlace(this._v);
    const correctedHorizontal = right.scaleInPlace(this._h);

    //movement based off of camera's view
    const move = correctedHorizontal.addInPlace(correctedVertical);

    //clear y so that the character doesnt fly up, normalize for next step, taking into account whether we've DASHED or not
    this._moveDirection = new Vector3(
      move.normalize().x,
      0,
      move.normalize().z
    );

    //clamp the input value so that diagonal movement isn't twice as fast
    const inputMag = Math.abs(this._h) + Math.abs(this._v);
    if (inputMag > 1) {
      this._inputAmt = 1;
    } else {
      this._inputAmt = inputMag;
    }

    this._moveDirection = this._moveDirection.scaleInPlace(
      this._inputAmt * Player.PLAYER_SPEED
    );

    const input = new Vector3(
      this._input.horizontalAxis,
      0,
      this._input.verticalAxis
    );

    if (input.length() == 0) {
      return;
    }

    let angle = Math.atan2(
      this._input.horizontalAxis,
      this._input.verticalAxis
    );
    angle += this._camRoot.rotation.y;
    const targ = Quaternion.FromEulerAngles(0, angle, 0);
    this.mesh.rotationQuaternion = Quaternion.Slerp(
      this.mesh.rotationQuaternion,
      targ,
      10 * this._deltaTime
    );
  }

  //--GAME UPDATES--
  private _beforeRenderUpdate(): void {
    this._updateFromControls();
    this.mesh.moveWithCollisions(this._moveDirection);
  }

  public activatePlayerCamera(): UniversalCamera {
    this.scene.registerBeforeRender(() => {
      this._beforeRenderUpdate();
      this._updateCamera();
    });
    return this.camera;
  }

  //--CAMERA--
  private _updateCamera(): void {
    //update camera postion up/down movement
    const centerPlayer = this.mesh.position.y + 2;
    this._camRoot.position = Vector3.Lerp(
      this._camRoot.position,
      new Vector3(this.mesh.position.x, centerPlayer, this.mesh.position.z),
      0.4
    );
  }

  private _setupPlayerCamera(): UniversalCamera {
    //root camera parent that handles positioning of the camera to follow the player
    this._camRoot = new TransformNode("root");
    this._camRoot.position = new Vector3(0, 0, 0); //initialized at (0,0,0)
    //to face the player from behind (180 degrees)
    this._camRoot.rotation = new Vector3(0, Math.PI, 0);

    //rotations along the x-axis (up/down tilting)
    const yTilt = new TransformNode("ytilt");
    //adjustments to camera view to point down at our player
    yTilt.rotation = Player.ORIGINAL_TILT;
    this._yTilt = yTilt;
    yTilt.parent = this._camRoot;

    //our actual camera that's pointing at our root's position
    this.camera = new UniversalCamera("cam", new Vector3(0, -1, -5), this.scene);
    this.camera.lockedTarget = this._camRoot.position;
    this.camera.fov = Math.PI * 0.2;
    this.camera.parent = yTilt;

    this.scene.activeCamera = this.camera;
    return this.camera;
  }
}
