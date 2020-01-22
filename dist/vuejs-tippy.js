(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tippy.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tippy.js'], factory) :
    (global = global || self, factory(global.VueJSTippy = {}, global.tippy));
}(this, (function (exports, tippy) { 'use strict';

    tippy = tippy && tippy.hasOwnProperty('default') ? tippy['default'] : tippy;

    const booleanProps = {
        allowHTML: true,
        arrow: true,
        flip: true,
        flipOnUpdate: false,
        hideOnClick: true,
        ignoreAttributes: false,
        inertia: false,
        interactive: false,
        lazy: true,
        multiple: false,
        showOnCreate: false,
        touch: true,
    };

    const methodProps = {
        onAfterUpdate() {
        },
        onBeforeUpdate() {
        },
        onCreate() {
        },
        onDestroy() {
        },
        onHidden() {
        },
        onHide() {
        },
        onMount() {
        },
        onShow() {
        },
        onShown() {
        },
        onTrigger() {
        },
        onUntrigger() {
        },
    };

    const props = {
        animation: 'fade',
        appendTo: () => document.body,
        aria: 'describedby',
        boundary: 'scrollParent',
        content: '',
        delay: 0,
        distance: 10,
        duration: [300, 250],
        flipBehavior: 'flip',
        interactiveBorder: 2,
        interactiveDebounce: 0,
        maxWidth: 350,
        offset: 0,
        placement: 'top',
        plugins: [],
        popperOptions: {},
        role: 'tooltip',
        theme: '',
        trigger: 'mouseenter focus',
        triggerTarget: null,
        updateDuration: 0,
        zIndex: 9999,
        ...booleanProps,
        ...methodProps,
    };

    var helpers = {
        isProp(prop) {
            return typeof props[prop] !== 'undefined';
        },
        isBooleanProp(prop) {
            return typeof booleanProps[prop] !== 'undefined';
        },
        isMethodProp(prop) {
            return typeof methodProps[prop] !== 'undefined';
        },
    };

    //

    var script = {
        name: "tippy",
        props: {
            content: [String, Number],
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            enabled: {
                type: Boolean,
                default: true
            },
            visible: Boolean,
        },
        data() {
            return {
                tip: null,
            }
        },
        created() {
            console.log(helpers.camelize('animation-fill'));

            // in case :content=0 which is false
            if (typeof this.content !== 'undefined') {
                this.options.content = this.content;
            }

            // loop through validating tippy props
            Object.keys(this.$attrs).forEach(attr => {
                let attrFixed = helpers.camelize(attr);

                if (helpers.isProp(attr)) {
                    let value = this.$attrs[attr];

                    if (!isNaN(value)) {
                        value = Number(value);
                    }

                    // if (typeof value !== 'string') {
                    //     if ([0, 1, '0', '1', 'true', 'false'].indexOf(value) !== -1) {
                    //         value = Boolean(value);
                    //     }
                    // }

                    this.options[attr] = value;
                }
            });

            Object.keys(this.$listeners).forEach(methodName => {
                if (helpers.isMethodProp(methodName)) {
                    this.options[methodName] = this.$listeners[methodName];
                }
            });
        },
        mounted() {
            let elm;
            let cloned = false;
            if (this.$attrs.for) {
                const selectorType = this.$attrs.for[0];
                const selectorName = this.$attrs.for.slice(1);

                switch (selectorType) {
                    case '#':
                        elm = document.getElementById(selectorName);
                        break;
                    case '.':
                        elm = document.querySelectorAll(this.$attrs.for);
                        cloned = true;
                        break;
                    default:
                        elm = document.querySelector(`[name='${this.$attrs.for}']`);
                }
            }

            if (this.$refs.content.innerHTML.length > 0 && this.$refs.trigger.innerHTML.length > 0 || (typeof this.options.content !== 'undefined')) {
                elm = this.$refs.trigger;
            }

            if (typeof this.options.content === 'undefined') {
                this.options.content = this.$refs.content.innerHTML.length > 0 ? this.$refs.content : this.$refs.trigger;

                if (this.options.content.className === 'vuejs-tippy--trigger') {
                    this.options.content.className = 'vuejs-tippy--content';
                }

                if (cloned) {
                    let content = this.options.content;
                    this.options.content = () => content.cloneNode(true);
                }
            }

            this.options.interactive = true;
            this.tip = tippy(elm, this.options);

            !this.enabled && this.tip.disable();
            this.visible && this.tip.show();
        },
        watch: {
            content(data) {
                this.tip && this.tip.setContent(data);
            },
            options(data) {
                this.tip && this.tip.setProps(data);
            },
            enabled(data) {
                this.tip && this.tip[data ? 'enable' : 'disable']();
            },
            visible(data) {
                this.tip && this.tip[data ? 'show' : 'hide']();
            }
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
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
        let hook;
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
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vuejs-tippy"},[_c('div',{ref:"content",staticClass:"vuejs-tippy--content"},[_vm._t("content")],2),_vm._v(" "),_c('div',{ref:"trigger",staticClass:"vuejs-tippy--trigger"},[_vm._t("default")],2)])};
    var __vue_staticRenderFns__ = [];

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = normalizeComponent(
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

    const createTippy = (el, binding, vNode) => {
        let value = binding.value ? binding.value : {};

        // determine tooltip text
        ['title', 'content', 'data-tooltip'].forEach(item => {
            let attr = el.attributes.getNamedItem(item);
            if (attr) {
                if (item === 'title') {
                    el.dataset.title = attr.value;
                    el.removeAttribute('title');
                }
                value = attr.value;
            }
        });

        let instanceOptions = typeof value !== 'object' ? {content: value} : value;

        // vuejs modifiers -> tippy boolean props
        Object.keys(binding.modifiers).forEach((prop) => {
            if (helpers.isBooleanProp(prop)) {
                instanceOptions[prop] = true;
            }
        });

        // tippy lifecycle hooks
        const handlers = vNode.data.on || {};
        Object.keys(handlers).forEach((method) => {
            if (helpers.isMethodProp(method)) {
                instanceOptions[method] = handlers[method];
            }
        });

        // create tippy instance
        tippy(el, instanceOptions);
    };

    const plugin = {
        install(Vue, options = {directive: 'tippy', ignoreAttributes: true}) {
            let directive = options.directive;
            delete options.directive;

            tippy.setDefaultProps(options);

            Vue.directive(directive, {
                inserted(el, binding, vNode) {
                    Vue.nextTick().then(_ => createTippy(el, binding, vNode));
                },
                componentUpdated(el, binding, vNode, oldVnode) {
                    if (el._tippy && binding.value && ([null, ''].indexOf(binding.oldValue) !== -1 || (binding.value !== binding.oldValue && typeof binding.oldValue !== 'undefined'))) {
                        if (['string', 'number'].indexOf(typeof binding.value) !== -1) {
                            el._tippy.setContent(binding.value);
                        } else {
                            el._tippy.setProps(binding.value);
                        }
                    }
                },
                unbind(el, binding, vNode) {
                    if (el.dataset.title) {
                        el.setAttribute('title', el.dataset.title);
                        el.removeAttribute('data-title');
                    }
                    el._tippy && el._tippy.destroy();
                }
            });

            Vue.component(directive, __vue_component__);
        }
    };

    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
        window.Vue.use('tippy', __vue_component__);
    }

    exports.TippyComponent = __vue_component__;
    exports.createTippy = createTippy;
    exports.plugin = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
