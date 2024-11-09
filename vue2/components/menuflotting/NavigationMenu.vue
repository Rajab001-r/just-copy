<template>
  <nav class="nav-menu">
    <input type="checkbox" class="menu-toggle" v-model="isMenuOpen" id="menu-toggle" />
    <label class="menu-toggle-button" for="menu-toggle">
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
    </label>

    <a href="#" v-for="(item, idx) in navItems" :key="idx" :class="['nav-item', item.theme]"
      :style="calculateItemPosition(idx, navItems.length)" @click.prevent="item.handleClick">
      <i :class="item.symbol"></i>
    </a>
  </nav>
</template>

<script>
export default {
  name: "NavigationMenu",
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      isMenuOpen: false,
      distance: 100,
    };
  },
  methods: {
    calculateItemPosition(index, totalItems) {
      if (!this.isMenuOpen) {
        return {
          transform: `translate3d(0px, 0px, 0)`
        };
      }

      const angle = (index / totalItems) * 2 * Math.PI;
      const x = this.distance * Math.cos(angle);
      const y = this.distance * Math.sin(angle);

      return {
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    },
  },
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  background: #4b5563;
  color: #e0e0e0;
  text-align: center;
  font-family: "Roboto", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.nav-item,
.menu-toggle-button {
  background: #e0e0e0;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  position: absolute;
  color: #ffffff;
  text-align: center;
  line-height: 70px;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 150ms;
}

.menu-toggle {
  display: none;
}

.line {
  width: 24px;
  height: 3px;
  background: #4b5563;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12px;
  margin-top: -1.5px;
  transition: transform 150ms;
}

.line-1 {
  transform: translate3d(0, -8px, 0);
}

.line-2 {
  transform: translate3d(0, 0, 0);
}

.line-3 {
  transform: translate3d(0, 8px, 0);
}

.menu-toggle:checked+.menu-toggle-button .line-1 {
  transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-toggle:checked+.menu-toggle-button .line-2 {
  transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-toggle:checked+.menu-toggle-button .line-3 {
  transform: translate3d(0, 0, 0) rotate(-45deg);
}

.nav-menu {
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: 24px;
}

.nav-item:hover {
  background: #e0e0e0;
  color: #4285f4;
}

.menu-toggle-button {
  z-index: 2;
  transition-duration: 350ms;
  transform: scale(1.1) translate3d(0, 0, 0);
  cursor: pointer;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.menu-toggle-button:hover {
  transform: scale(1.2) translate3d(0, 0, 0);
}

.menu-toggle:checked~.nav-item {
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.navy {
  background-color: #5470c6;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.forest {
  background-color: #5cb85c;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.crimson {
  background-color: #dc3545;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.violet {
  background-color: #7d5bae;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.amber {
  background-color: #ffc107;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}

.sky {
  background-color: #56ccf2;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.12);
}
</style>
