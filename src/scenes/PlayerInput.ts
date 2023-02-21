import {
  ActionManager,
  ExecuteCodeAction,
  Scalar,
  Scene,
  Mesh,
  Vector3,
} from "@babylonjs/core";

export class PlayerInput {
  public inputMap: any;
  private _scene: Scene;

  public horizontal: number = 0;
  public vertical: number = 0;

  public horizontalAxis: number = 0;
  public verticalAxis: number = 0;

  private _lastGroundPos: Vector3 = Vector3.Zero();

  constructor(scene: Scene) {
    this._scene = scene;

    this._scene.actionManager = new ActionManager(this._scene);
    this.inputMap = {};

    this._scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = 1;
      })
    );
    this._scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = 0;
      })
    );

    /*
    this._scene.actionManager.registerAction(
      new ExecuteCodeAction({
          trigger: ActionManager.OnIntersectionEnterTrigger,
          parameter: this._scene.getMeshByName("ROAD_TRANSFORM")
      },
          () => {
              this._mesh.position.copyFrom(this._lastGroundPos); // need to use copy or else they will be both pointing at the same thing & update together
          }
      )
      
  );*/

    scene.onBeforeRenderObservable.add(() => {
      this._updateFromKeyboard();
    });
  }

  private _updateFromKeyboard(): void {
    if (this.inputMap["ArrowLeft"] || this.inputMap["a"]) {
      this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
      this.horizontalAxis = -1;
    } else if (this.inputMap["ArrowRight"] || this.inputMap["d"]) {
      this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
      this.horizontalAxis = 1;
    } else {
      this.horizontal = 0;
      this.horizontalAxis = 0;
    }

    if (this.inputMap["ArrowUp"] || this.inputMap["w"]) {
      this.verticalAxis = 1;
      this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
    } else if (this.inputMap["ArrowDown"] || this.inputMap["s"]) {
      this.verticalAxis = -1;
      this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
    } else {
      this.vertical = 0;
      this.verticalAxis = 0;
    }
  }
}
