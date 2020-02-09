import tippy from 'tippy.js'
import helpers from './helpers'
import TippyComponent from './components/tippy.vue'

export {
    helpers,
    TippyComponent
}

export const createTippy = (el, binding, vNode) => {
    let options = typeof binding.value !== 'undefined' ? (typeof binding.value === 'object' ? binding.value : {content: binding.value}) : {};

    options = {...(vNode.data.attrs ? helpers.parseAttributes(vNode.data.attrs) : {}), ...binding.modifiers, ...options, ...(vNode.data.on ? helpers.parseHandlers(vNode.data.on) : {})};

    // "backup" title attribute to fallback if tippy is removed only if title matches **initial** content?
    let titleContent;
    if (el.hasAttribute('title') && options.content && options.content === (titleContent = el.getAttribute('title'))) {
        el.dataset.title = titleContent;
        el.removeAttribute('title');
    }

    // create tippy instance
    tippy(el, options);
};

const plugin = {
    install(Vue, options = {}) {
        options = {...{directive: 'tippy', ignoreAttributes: true}, ...options};
        const directive = options.directive;
        delete options.directive; // dont need tippy warnings

        tippy.setDefaultProps(options);

        Vue.directive(directive, {
            inserted(el, binding, vNode) {
                Vue.nextTick().then(_ => createTippy(el, binding, vNode));
            },
            componentUpdated(el, binding, vNode, oldVnode) {
                if (el._tippy) {
                    let options = {};

                    if (typeof binding.value === 'object') {
                        options = binding.value; // checking objects efficiently not possible
                    }
                    if (['number', 'string'].indexOf(typeof binding.value) !== -1 && binding.value !== binding.oldValue) {
                        options.content = binding.value;
                    }

                    // check :props only if content has not yet been determined/set
                    if (typeof options.content === 'undefined' && typeof vNode.data.attrs !== 'undefined' && typeof vNode.data.attrs.content !== 'undefined' && vNode.data.attrs.content !== oldVnode.data.attrs.content) {
                        options.content = vNode.data.attrs.content;
                    }

                    el._tippy.setProps(options);
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

        Vue.component(directive, TippyComponent);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
    window.Vue.component('tippy', TippyComponent);
}

export default plugin;