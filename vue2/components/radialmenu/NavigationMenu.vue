<template>
  <div class="radial-menu">
    <button class="main-button" @click="toggleMenu">
      <i :class="isOpen ? 'fa fa-times' : 'fa fa-bars'"></i> 
    </button>
    <div v-if="isOpen" class="menu-options">
      <button
        class="menu-button"
        v-for="(icon, index) in icons"
        :key="index"
        :style="buttonPosition(index)"
      >
        <i :class="icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      icons: ["fa fa-map-marker", "fa fa-video-camera", "fa fa-camera", "fa fa-comment"],
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    buttonPosition(index) {
      const radius = 160; 
      const totalIcons = this.icons.length;
      const angleSpan = -90;
      const angleBetweenIcons = angleSpan / (totalIcons - 1); 
      const angle = (index * angleBetweenIcons + angleSpan) * (Math.PI / 180); 
      return {
        transform: `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.radial-menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .main-button {
    width: 80px; 
    height: 80px; 
    border-radius: 50%;
    background-color: #fff;
    border: none;
    font-size: 30px; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    i {
      color: #666; 
    }
  }

  .menu-options {
    position: absolute;
    top: 0;
    left: 0;

    .menu-button {
      width: 60px; 
      height: 60px; 
      border-radius: 50%;
      background-color: #eee;
      border: none;
      cursor: pointer;
      position: absolute;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 30px; 
        color: #666;
      }
    }
  }
}
</style>
