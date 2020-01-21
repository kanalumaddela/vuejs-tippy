import {booleanProps, methodProps, props} from "./props";

export default {
    isProp(prop) {
        return typeof props[prop] !== 'undefined';
    },
    isBooleanProp(prop) {
        return typeof booleanProps[prop] !== 'undefined';
    },
    isMethodProp(prop) {
        return typeof methodProps[prop] !== 'undefined';
    },
}