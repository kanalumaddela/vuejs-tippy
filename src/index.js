import tippy from 'tippy.js'
import helpers from './helpers'
import TippyComponent from './components/tippy.vue'

export {
    TippyComponent
}

/**
 * Create a tippy.js instance for a given element
 *
 * @param {HTMLElement} el
 * @param {DirectiveBinding} binding
 * @param {VNode} vNode
 */
export const createTippy = (el, binding, vNode) => {
    let value = binding.value ? binding.value : {};

    console.log(vNode);
    console.log('ad asds ad aada');

    // determine tooltip content
    ['title', 'content', 'data-tooltip'].forEach(item => {
        let attr = el.attributes.getNamedItem(item);

        if (item === 'content') {
            console.debug('asadadajdbgdhsdbgfhdsb sdfh bsdhf s');
        }

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
        const directive = options.directive;
        delete options.directive;

        tippy.setDefaultProps(options);

        Vue.directive(directive, {
            inserted(el, binding, vNode) {
                Vue.nextTick().then(_ => createTippy(el, binding, vNode));
            },
            componentUpdated(el, binding, vNode, oldVnode) {
                if (el._tippy) {
                    let content;

                    //

                    if (vNode.data.attrs.content && vNode.data.attrs.content !== oldVnode.data.attrs.content) {
                        content = vNode.data.attrs.content;
                    }
                    if (binding.value) {

                    }

                    if (content) {
                        el._tippy.setContent(content);
                    }
                }

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

        Vue.component(directive, TippyComponent);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
    window.Vue.component('tippy', TippyComponent);
}

export default plugin;