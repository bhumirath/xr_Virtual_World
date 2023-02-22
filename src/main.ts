import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

engine.runRenderLoop(() => {
  scene.render();
});
// handle window resizing
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  engine.resize();
});
