/*
 * *
 *  * vuejs-tippy
 *  *
 *  * @link https://www.maddela.org
 *  * @link https://github.com/kanalumaddela/vuejs-tippy
 *  *
 *  * @author kanalumaddela <git@maddela.org>
 *  * @copyright Copyright (c) 2020-2020
 *  * @license MIT
 *
 */

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