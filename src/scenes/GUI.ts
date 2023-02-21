import { Scene } from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control,
  Image,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";

const _shopGUI = "#2MPG74#11";

const money = 1000;

export const shopGUI = async function (advancedTexture: AdvancedDynamicTexture,scene: Scene,text:string,name:string,pricee:string ) {
    const playerUI = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //await advancedTexture.parseFromSnippetAsync(_shopGUI);

  playerUI.idealWidth = 1920;
  playerUI.idealHeight = 1080;
  //playerUI.useSmallestIdeal = true;
  playerUI.background = "gray";
  //โชว์รูปภาพในหน้าร้านค้า
  const img = new Image("image", "./images/" + text);
  img.width = "300px";
  img.height = "300px";
  img.top = "-100px";
  playerUI.addControl(img);

  //โชว์จำนวนเงิน
  const moneyText = new TextBlock();
  moneyText.text = "Money : " + money;
  moneyText.color = "blue";
  moneyText.height = "50px";
  moneyText.fontSize = 40;
  moneyText.top = "-365px";
  moneyText.left = "660px";
  moneyText.outlineColor = "white";
  moneyText.outlineWidth = 10;
  playerUI.addControl(moneyText);

  //โชว์ชื่อสินค้า
  const nameText = new TextBlock();
  nameText.text = name;
  nameText.fontSize = 60;
  nameText.top = "100px";
  nameText.width = "1000px";
  nameText.height = "70px";
  playerUI.addControl(nameText);

  //โชว์ราคาสินค้า
  const price = new TextBlock();
  price.text = "Price : " + pricee.toString();
  price.fontSize = 30;
  price.top = "190px";
  price.width = "300px";
  price.height = "40px";
  price.color = "green";
  price.textWrapping = true;
  playerUI.addControl(price);

  const button = Button.CreateSimpleButton("button","BUTTON");
  button.width = "200px";
  button.height = "80px";
  button.thickness = 0;
  button.verticalAlignment = 0;
  button.horizontalAlignment = 1;
  button.top = "20px";
  playerUI.addControl(button);

  button.onPointerClickObservable.add(() => {
    playerUI.dispose();
  })

  //setTimeout(function(){{playerUI.dispose();}}, 5000);
};
