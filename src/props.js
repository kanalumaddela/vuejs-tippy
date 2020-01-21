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

export const booleanProps = {
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

export const methodProps = {
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

export const props = {
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