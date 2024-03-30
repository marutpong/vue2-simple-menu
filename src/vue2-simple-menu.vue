<template>
  <div>
    <ul
      ref="simpleContextMenu"
      class="vue2-simple-menu"
      v-click-outside="onClickOutside"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        @click.stop="optionClicked(option)"
        class="vue2-simple-menu__item"
        :class="[option.class, (option.type === 'divider' ? 'vue2-simple-menu__divider' : '')]"
      >
        <span v-html="option.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>

import Vue from 'vue'
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

export default {
  name: 'Vue2SimpleMenu',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null,
      triggerEl: null,
      triggerOffset: {x: 0, y: 0}
    }
  },
  methods: {
    showMenu (event, item) {
      this.item = item

      var menu = this.$refs.simpleContextMenu
      if (!menu) {
        return
      }

      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden"
        menu.style.display = "block"
        this.menuWidth = menu.offsetWidth
        this.menuHeight = menu.offsetHeight
        menu.removeAttribute("style")
      }

      document.addEventListener('scroll', this.onScroll)

      const {top, left} = event.target.getBoundingClientRect()
      this.triggerEl = event.target
      this.triggerOffset = {
        x: event.pageX - left,
        y: event.clientY - top,
      }
      this.updateXY(event.pageX, event.clientY)

      menu.classList.add('vue2-simple-menu--active')
    },
    updateXY (x, y) {
      const menu = this.$refs.simpleContextMenu
      if (!menu) {
        return
      }

      if ((this.menuWidth + x) >= window.innerWidth) {
        menu.style.left = (x - this.menuWidth + 2) + 'px'
      } else {
        menu.style.left = (x - 2) + 'px'
      }

      if ((this.menuHeight + y) >= window.innerHeight) {
        menu.style.top = (y - this.menuHeight + 2) + 'px'
      } else {
        menu.style.top = (y - 2) + 'px'
      }
    },
    hideContextMenu () {
      document.removeEventListener('scroll', this.onScroll)

      let element = this.$refs.simpleContextMenu
      if (element) {
        element.classList.remove('vue2-simple-menu--active')
      }
    },
    onClickOutside () {
      this.hideContextMenu()
    },
    optionClicked (option) {
      this.hideContextMenu()
      this.$emit('option-clicked', {
        item: this.item,
        option: option
      })
    },
    onEscKeyRelease (event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    },
    onScroll (_event) {
      if (this.triggerEl) {
        const {top, left} = this.triggerEl.getBoundingClientRect()
        this.updateXY(left + this.triggerOffset.x, top + this.triggerOffset.y)
      }
    },
  },
  mounted () {
    document.body.addEventListener('keyup', this.onEscKeyRelease);
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.onEscKeyRelease);
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss">
$light-grey: #ecf0f1;
$grey: darken($light-grey, 15%);
$blue: #4ab2e3;
$white: #fff;
$black: #333;

.vue2-simple-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: fixed;
  z-index: 1000000;
  background-color: $white;
  border-bottom-width: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  box-shadow: 0px 0px 13px 2px $light-grey;
  border-radius: 6px;

  &--active {
    display: block;
  }

  &__item {
    display: flex;
    color: $black;
    cursor: pointer;
    padding: 5px 15px;
    align-items: center;

    &:hover {
      background-color: $blue;
      color: $white;
    }
  }

  &__divider {
    box-sizing: content-box;
    height: 2px;
    background-color: $grey;
    padding: 4px 0;
    background-clip: content-box;
    pointer-events: none;
  }

  // Have to use the element so we can make use of `first-of-type` and
  // `last-of-type`
  li {
    &:first-of-type {
      margin-top: 0px;
      padding-top: 8px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    &:last-of-type {
      margin-bottom: 0px;
      padding-bottom: 8px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
}
</style>
