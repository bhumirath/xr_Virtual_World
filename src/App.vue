<!-- ศิวกร แพทย์เสลา 6310401998-->
<!-- ภูมิรัฐ เลิบไธสง 6310401106 -->
<template>
  <canvas ref="bjsCanvas" />
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { createScene } from "@/scenes/ThirdPerson";
export default {
  name: "BabylonScene",
  setup() {
    const bjsCanvas = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        // set the canvas to full window size
        bjsCanvas.value.width = window.innerWidth;
        bjsCanvas.value.height = window.innerHeight;
        createScene(bjsCanvas.value);
      }
    });

    return {
      bjsCanvas,
    };
  },
};
</script>
