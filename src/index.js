/*
 * vuejs-tippy
 *
 * @link https://www.maddela.org
 * @link https://github.com/kanalumaddela/vuejs-tippy
 *
 * @author kanalumaddela <git@maddela.org>
 * @copyright Copyright (c) 2020-2020
 * @license MIT
 */

import tippy from 'tippy.js'
import helpers from './helpers'
import {props as tippyDefaults} from './props'
import TippyComponent from './components/tippy'

export {
    TippyComponent
}

export const plugin = {
    install(Vue, options = {}) {
        let directive = options.directive || 'tippy';
        let enableDirective = options.enableDirective || true;
        let enableComponent = options.enableComponent || true;

        options.directive && delete options.directive;
        options.enableDirective && delete options.enableDirective;
        options.enableComponent && delete options.enableComponent;

        tippy.setDefaultProps({...tippyDefaults, ...options});

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

        if (enableDirective) {
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
        }

        if (enableComponent) {
            Vue.component(directive, TippyComponent);
        }
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
    window.Vue.use('tippy', TippyComponent);
}
