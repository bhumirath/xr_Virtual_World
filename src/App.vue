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
        createScene(bjsCanvas.value);
      }
    });

    return {
      bjsCanvas,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 200%;
  height: 100%;
}
</style>
