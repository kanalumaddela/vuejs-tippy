# VueJS Directive + Component for [tippy.js (v5)](https://github.com/atomiks/tippyjs)

[![Maintainability](https://api.codeclimate.com/v1/badges/c0847b524e867249a33a/maintainability)](https://codeclimate.com/github/kanalumaddela/vuejs-tippy/maintainability)
[![npm](https://img.shields.io/npm/v/vuejs-tippy?label=vuejs-tippy&style=flat-square)](https://www.npmjs.com/package/vuejs-tippy)
[![weekly downloads](https://img.shields.io/npm/dw/vuejs-tippy?style=flat-square&color=CE7AFF)](https://www.npmjs.com/package/vuejs-tippy)
[![downloads](https://img.shields.io/npm/dt/vuejs-tippy.svg?style=flat-square)](https://www.npmjs.com/package/vuejs-tippy)
![bundle size](https://img.shields.io/bundlephobia/min/vuejs-tippy?style=flat-square)
[![license](https://img.shields.io/github/license/kanalumaddela/vuejs-tippy.svg?style=flat-square)](https://github.com/kanalumaddela/vuejs-tippy/blob/master/LICENSE)

*Notice: **This is a pre-release.** Currently the component wraps everything in `<div>` because it doesn't make sense in my opinion to use `<span>` or styling the `<div>` to be `inline`/`inline-block`. There are clases added for you to handle the styling/formatting.*

#### Todo:

- [ ] figure out a better way to avoid wrapping everything
- [ ] write tests
- [ ] efficient code
- [ ] [tippy.js singleton?](https://atomiks.github.io/tippyjs/#singleton)

---

## Quick Setup

#### CDN
```html
<!-- I have no idea if this works, tell me if it doesn't -->
<script src="https://unpkg.com/vuejs-tippy@0.0.5/dist/vuejs-tippy.min.js"></script>
```

#### Package Manager
*Client side JS should be a dev dependency for those who build their app's assets*
```shell script
# npm
npm i --save-dev vuejs-tippy

# yarn
yarn add --dev vuejs-tippy
```

```js
import Vue from 'vue'
import VueJSTippy from 'vuejs-tippy'

Vue.use(VueJSTippy, options); // component is also loaded here
```

## Usage

<!--
<table>
    <thead>
        <tr>
            <th></th>
            <th>v-tippy</th>
            <th>&lt;tippy></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Props/<br>Attributes</th>
            <td><ul><li>content</li><li>options</li><li>tooltip</li><li>title</li></ul></td>
            <td><ul><li>content</li><li>options</li><li>enabled</li><li>visible</li><li>tippy options like ignore-attributes="true" (converted to camelCase)</li></ul></td>
        </tr>
    </tbody>
</table>
-->

#### Default Options
- [tippy.js props](https://atomiks.github.io/tippyjs/all-props/) combined with the following:

| key | desc | type | defaut |
| --- | ---- | ------- | ---- |
| directive | controls `v-<directive>` and component: `<directive>` | `String` | `tippy` |
| ignoreAttributes | disables `data-tippy-*` for performance | `Boolean` | `true` |

#### Lifecycle Hooks
- Both the directive and component support [tippy.js's hooks](https://atomiks.github.io/tippyjs/lifecycle-hooks/). Simply put @&lt;hook> on the element/component for example:
```html
<button v-tippy @onShown="onShownMethod"></button>

<tippy @onShown="onShownMethod"></tippy>
```

#### `v-tippy` Directive

- allows using `title`, but is **static**
- `v-tippy` and `:content` are checked on updates
- utilizes vuejs directive modifiers

##### Static Tooltip
- `content`, `title` as attributes
```html
<button v-tippy <content|title>="I'm a tooltip!">Hover over me!</button>
```

##### Dynamic Tooltip
- Set tooltip content via directive argument:`v-tippy="variable"` or as `:content` prop
```html
<button v-tippy :content="timer">Hover over me!</button>

<!-- or -->

<button v-tippy="timer">Hover over me!</button>
```

##### Directive Modifiers
- append to `v-tippy` directive e.g. `v-tippy.modifier`, applies only to tippy.js boolean props
```html
<button v-tippy.interactive content="sets tippy.js option {interactive: true}">
    Hover over me!
</button>
```

#### `<tippy>` Vue Component

- only `:content` and `:options`
- `:enabled` & `:visible` boolean props for tippy's [.enable()](https://atomiks.github.io/tippyjs/methods/#show) / [.disable()](https://atomiks.github.io/tippyjs/methods/#disable) and [.show()](https://atomiks.github.io/tippyjs/methods/#show) / [.hide()](https://atomiks.github.io/tippyjs/methods/#hide) functions respectively
- can set options quickly via html attributes
  - ex: `<tippy animate-fill="true" content="bg fill tooltip"><button>Hover over me!</button></tippy>` 

```html
<tippy :content="timer">
    <button>Hover for a reactive tooltip</button>
</tippy>

<tippy :options="{content: timer, theme: 'light'}">
    <button>Props to for quick customization</button>
</tippy>

<!-- external tippy with trigger named -->

<tippy for="target">
    I'm a tooltip!
</tippy>

<button name="target">Hover over me!</button>

<!-- tippy content as reactive component -->

<tippy>
    <template slot="content">
        <custom-component :prop="timer"></custom-component>
    </template>

    <button>Reactive component tooltip</button>
</tippy>

<!-- external tippy for multiple elements, uses cloneNode(true), unsure of reactivity support -->

<tippy for=".btnToolTip">
    <p>single tooltip for multiple elements of the same class</p>
</tippy>

<div>
    <button class="btnToolTip" v-for="i in 5">
        Button #{{ i }}
    </button>
</div>
```
---

## Credits

- [atomiks](https://github.com/atomiks) for creating [tippy.js](https://github.com/atomiks/tippyjs)
- [KABBOUCHI](https://github.com/KABBOUCHI) for creating [vue-tippy](https://github.com/KABBOUCHI/vue-tippy) which gave me a better understanding of Vue plugins
