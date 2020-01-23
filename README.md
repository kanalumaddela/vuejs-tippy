# VueJS  Plugin + Component for [tippy.js](https://github.com/atomiks/tippyjs)

[![Maintainability](https://api.codeclimate.com/v1/badges/c0847b524e867249a33a/maintainability)](https://codeclimate.com/github/kanalumaddela/vuejs-tippy/maintainability)
[![npm](https://img.shields.io/npm/v/vuejs-tippy?label=vuejs-tippy&style=flat-square)](https://www.npmjs.com/package/vuejs-tippy)
[![npm](https://img.shields.io/npm/dw/vuejs-tippy?style=flat-square)](https://www.npmjs.com/package/vuejs-tippy)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vuejs-tippy?style=flat-square)
[![GitHub stars](https://img.shields.io/github/stars/kanalumaddela/vuejs-tippy.svg?style=flat-square)](https://github.com/kanalumaddela/vuejs-tippy/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kanalumaddela/vuejs-tippy.svg?style=flat-square)](https://github.com/kanalumaddela/vuejs-tippy/network)
[![GitHub issues](https://img.shields.io/github/issues/kanalumaddela/vuejs-tippy.svg?style=flat-square)](https://github.com/kanalumaddela/vuejs-tippy/issues)
[![GitHub license](https://img.shields.io/github/license/kanalumaddela/vuejs-tippy.svg?style=flat-square)](https://github.com/kanalumaddela/vuejs-tippy/blob/master/LICENSE)

*Notice: Currently the component wraps everything in `<div>` because it doesn't make sense in my opinion to use `<span>` or styling the  `<div>` to be `inline`/`inline-block`. There are clases added for you to handle the styling*

---

## Quick Setup

*Client side JS should be a dev dependency for those who build their app's assets*
```shell script
npm i --save-dev vuejs-tippy
```

```js
import Vue from 'vue'
import VueJSTippy from 'vuejs-tippy'

Vue.use(VueJSTippy);
```

## Usage

#### Lifecycle Hooks
- Both the directive and component support [tippy.js's hooks](https://atomiks.github.io/tippyjs/lifecycle-hooks/). Simply put @&lt;hook> on the element/component for example:
```html
<button v-tippy="timer" @onShown="onShownMethod"></button>
```

#### `v-tippy` directive method
```html
<!--v-tippy directive method-->

<button v-tippy content="I'm a tooltip!">Hover over me!</button>
<button v-tippy title="I'm a tooltip!">Hover over me!</button>
<button v-tippy data-tooltip="I'm a tooltip!">Hover over me!</button>
<button v-tippy="timer">Hover over me!</button>
<button v-tippy.interactive="{interactive: true}">Hover over me!</button>

```
#### `<tippy>` Vue Component method(s)
```vue
<tippy :content="timer">
    <button>Hover for a reactive tooltip</button>
</tippy>

<!-- OR  -->

<tippy :options="{content: timer, theme: 'light'}">
    <button>Props to pass making it easy to use</button>
</tippy>

<!-- OR  -->

<tippy for="target">
    I'm a tooltip!
</tippy>

<button name="target">Hover over me!</button>

<!-- OR -->

<tippy>
    <template slot="content">
        <custom-component :prop="timer"></custom-component>
    </template>

    <button>Reactive component tooltip</button>
</tippy>

<!-- OR -->

<tippy for=".btnToolTip">
    <p>single tooltip for multiple elements of the same class</p>
</tippy>

<div>
    <button class="btnToolTip" v-for="i in 5">
        Button #{{ i }}
    </button>
</div>
```