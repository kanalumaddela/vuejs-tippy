import {booleanProps, methodProps, props} from "./props";

export default {
    camelize(string) {
        if (string.indexOf('-') !== -1) {
            return string.replace(/(-[a-z])/, match => match.slice(1).toUpperCase());
        } else {
            return string;
        }
    },
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