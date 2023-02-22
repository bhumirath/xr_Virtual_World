import {
  AdvancedDynamicTexture,
  Button,
  Image,
  TextBlock,
} from "@babylonjs/gui";


let money = 1000;

export const shopGUI = async function (
  advancedTexture: AdvancedDynamicTexture,
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
  moneyText.text = "Money : " + money + " Baht";
  moneyText.color = "blue";
  moneyText.height = "50px";
  moneyText.fontSize = 40;
  moneyText.top = "-300px";
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
  price.text = "Price : " + pricee + " Baht";
  price.fontSize = 30;
  price.top = "390px";
  price.width = "300px";
  price.height = "70px";
  price.color = "cyan";
  price.textWrapping = true;
  playerUI.addControl(price);

  //ออกจากร้านค้า
  const exitButton = Button.CreateSimpleButton("button", "EXIT");
  exitButton.width = "150px";
  exitButton.height = "80px";
  exitButton.left = "-100px";
  exitButton.thickness = 0;
  exitButton.background = "red";
  exitButton.verticalAlignment = 0;
  exitButton.horizontalAlignment = 1;
  exitButton.cornerRadius = 40;
  exitButton.color = "white";
  exitButton.top = "20px";
  playerUI.addControl(exitButton);

  //ซื้อสินค้า
  const buyButton = Button.CreateSimpleButton("buyButton", "BUY");
  buyButton.width = "150px";
  buyButton.height = "80px";
  buyButton.left = "-100px";
  buyButton.thickness = 0;
  buyButton.background = "blue";
  buyButton.verticalAlignment = 0;
  buyButton.horizontalAlignment = 1;
  buyButton.cornerRadius = 40;
  buyButton.color = "white";
  buyButton.top = "700px";
  playerUI.addControl(buyButton);

  exitButton.onPointerClickObservable.add(() => {
    playerUI.dispose();
  });

  buyButton.onPointerClickObservable.add(() => {
    if (money < pricee) {
      price.text = "Not enough money!!";
    } else {
      money -= pricee;
      moneyText.text = "Money: " + money + " Baht";
    }
  });
};
