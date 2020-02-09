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
    parseAttributes(attrs = {}) {
        let options = {};

        for (const attr in attrs) {
            const attrFixed = attr === 'title' ? 'content' : this.camelize(attr);

            if (this.isProp(attrFixed) && !this.isMethodProp(attrFixed)) {
                const value = attrs[attr];

                options[attrFixed] = this.isBooleanProp(attrFixed) ? value.length === 1 ? Boolean(Number(value)) : (value.length ? value === 'true' : true) : !isNaN(value) ? Number(value) : value;
            }
        }

        return options;
    },
    parseHandlers(handlers = {}) {
        let options = {};

        for (const method in handlers) {
            if (this.isMethodProp(method)) {
                options[method] = handlers[method];
            }
        }

        return options;
    }
}