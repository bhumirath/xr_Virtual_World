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

let money = 1000;

export const shopGUI = async function (
  advancedTexture: AdvancedDynamicTexture,
  scene: Scene,
  text: string,
  name: string,
  pricee: any
) {
  const playerUI = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  playerUI.idealWidth = 1920;
  playerUI.idealHeight = 1080;

  playerUI.background = "gray";

  const img = new Image("image", "./images/" + text);
  img.width = "600px";
  img.height = "600px";
  img.top = "-100px";
  playerUI.addControl(img);

  //จำนวนเงิน
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

  //ชื่อสินค้า
  const nameText = new TextBlock();
  nameText.text = name;
  nameText.fontSize = 60;
  nameText.top = "300px";
  nameText.width = "1000px";
  nameText.height = "70px";
  playerUI.addControl(nameText);

  //ราคาสินค้า
  const price = new TextBlock();
  price.text = "Price : " + pricee;
  price.fontSize = 30;
  price.top = "390px";
  price.width = "300px";
  price.height = "70px";
  price.color = "cyan";
  price.textWrapping = true;
  playerUI.addControl(price);

  //ออกจากร้านค้า
  const button = Button.CreateSimpleButton("button", "EXIT");
  button.width = "150px";
  button.height = "80px";
  button.thickness = 0;
  button.background = "red";
  button.verticalAlignment = 0;
  button.horizontalAlignment = 1;
  button.cornerRadius = 40;
  button.color = "white";
  button.top = "20px";
  playerUI.addControl(button);

  //ซื้อสินค้า
  const buyButton = Button.CreateSimpleButton("buyButton", "BUY");
  buyButton.width = "150px";
  buyButton.height = "80px";
  buyButton.thickness = 0;
  buyButton.background = "blue";
  buyButton.verticalAlignment = 0;
  buyButton.horizontalAlignment = 1;
  buyButton.cornerRadius = 40;
  buyButton.color = "white";
  buyButton.top = "700px";
  playerUI.addControl(buyButton);

  button.onPointerClickObservable.add(() => {
    playerUI.dispose();
  });

  buyButton.onPointerClickObservable.add(() => {
    if(money<pricee){
      price.text = "Not enough money!!"
    }else{
      money -= pricee;
      moneyText.text = "Money: " + money;
    }

  });
};
