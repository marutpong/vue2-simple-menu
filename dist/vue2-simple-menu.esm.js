import Vue from 'vue';
import vClickOutside from 'v-click-outside';

//
Vue.use(vClickOutside);

var script = {
  name: 'Vue2SimpleMenu',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data: function data () {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null,
      triggerEl: null,
      triggerOffset: {x: 0, y: 0}
    }
  },
  methods: {
    showMenu: function showMenu (event, item) {
      this.item = item;

      var menu = this.$refs.simpleContextMenu;
      if (!menu) {
        return
      }

      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      document.addEventListener('scroll', this.onScroll);

      var ref = event.target.getBoundingClientRect();
      var top = ref.top;
      var left = ref.left;
      this.triggerEl = event.target;
      this.triggerOffset = {
        x: event.pageX - left,
        y: event.clientY - top,
      };
      this.updateXY(event.pageX, event.clientY);

      menu.classList.add('vue2-simple-menu--active');
    },
    updateXY: function updateXY (x, y) {
      var menu = this.$refs.simpleContextMenu;
      if (!menu) {
        return
      }

      if ((this.menuWidth + x) >= window.innerWidth) {
        menu.style.left = (x - this.menuWidth + 2) + 'px';
      } else {
        menu.style.left = (x - 2) + 'px';
      }

      if ((this.menuHeight + y) >= window.innerHeight) {
        menu.style.top = (y - this.menuHeight + 2) + 'px';
      } else {
        menu.style.top = (y - 2) + 'px';
      }
    },
    hideContextMenu: function hideContextMenu () {
      document.removeEventListener('scroll', this.onScroll);

      var element = this.$refs.simpleContextMenu;
      if (element) {
        element.classList.remove('vue2-simple-menu--active');
      }
    },
    onClickOutside: function onClickOutside () {
      this.hideContextMenu();
    },
    optionClicked: function optionClicked (option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.item,
        option: option
      });
    },
    onEscKeyRelease: function onEscKeyRelease (event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    },
    onScroll: function onScroll (_event) {
      if (this.triggerEl) {
        var ref = this.triggerEl.getBoundingClientRect();
        var top = ref.top;
        var left = ref.left;
        this.updateXY(left + this.triggerOffset.x, top + this.triggerOffset.y);
      }
    },
  },
  mounted: function mounted () {
    document.body.addEventListener('keyup', this.onEscKeyRelease);
  },
  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.onEscKeyRelease);
    document.removeEventListener('scroll', this.onScroll);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _c(
      "ul",
      {
        directives: [
          {
            name: "click-outside",
            rawName: "v-click-outside",
            value: _vm.onClickOutside,
            expression: "onClickOutside",
          } ],
        ref: "simpleContextMenu",
        staticClass: "vue2-simple-menu",
      },
      _vm._l(_vm.options, function (option, index) {
        return _c(
          "li",
          {
            key: index,
            staticClass: "vue2-simple-menu__item",
            class: [
              option.class,
              option.type === "divider" ? "vue2-simple-menu__divider" : "" ],
            on: {
              click: function ($event) {
                $event.stopPropagation();
                return _vm.optionClicked(option)
              },
            },
          },
          [_c("span", { domProps: { innerHTML: _vm._s(option.name) } })]
        )
      }),
      0
    ) ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install (Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('Vue2SimpleMenu', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
export { install };
