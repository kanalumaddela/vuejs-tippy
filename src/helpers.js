import {booleanProps, methodProps, props} from "./props";

export default {
    camelize(string) {
        return string.indexOf('-') !== -1 ? string.replace(/(-[a-z])/, match => match.slice(1).toUpperCase()) : string;
    },
    mergeObject(target, ...sources) {
        return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1 ? Object.assign({}, target, ...sources) : {...target, ...sources};
    },
    isProp(prop) {
        return props.indexOf(prop) !== -1;
    },
    isBooleanProp(prop) {
        return booleanProps.indexOf(prop) !== -1;
    },
    isMethodProp(prop) {
        return methodProps.indexOf(prop) !== -1;
    },
    parseAttributes(attrs = {}, el = null) {
        let options = {};

        for (let attr in attrs) {
            let attrFixed = this.camelize(attr);

            if (el && ['data-tooltip', 'tooltip', 'title'].indexOf(attr) !== -1) {
                attrFixed = 'content';
            }

            if (this.isProp(attrFixed) && !this.isMethodProp(attrFixed)) {
                const value = attrs[attr];

                // converts prop to their appropriate type, this was annoying
                options[attrFixed] = this.isBooleanProp(attrFixed) ? value.length === 1 ? Boolean(Number(value)) : (value.length ? value === 'true' : true) : !isNaN(value) ? Number(value) : value;
            }
        }

        return options;
    },
    parseHandlers(handlers = {}) {
        let options = {};

        for (let method in handlers) {
            if (this.isMethodProp(method)) {
                options[method] = handlers[method];
            }
        }

        return options;
    }
}