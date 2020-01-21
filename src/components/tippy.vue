<template>
    <div class="vuejs-tippy" v-else>
        <div class="vuejs-tippy--content" ref="content">
            <slot name="content"/>
        </div>
        <div class="vuejs-tippy--trigger" ref="trigger">
            <slot/>
        </div>
    </div>
</template>

<script>
    import tippy from 'tippy.js'
    import helpers from '../helpers'

    export default {
        name: "tippy",
        props: {
            content: [String, Number],
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            enabled: {
                type: Boolean,
                default: true
            },
            visible: Boolean,
        },
        data() {
            return {
                tip: null,
            }
        },
        created() {
            console.log(helpers.camelize('animation-fill'));

            // in case :content=0 which is false
            if (typeof this.content !== 'undefined') {
                this.options.content = this.content;
            }

            // loop through validating tippy props
            Object.keys(this.$attrs).forEach(attr => {
                let attrFixed = helpers.camelize(attr);

                if (helpers.isProp(attr)) {
                    let value = this.$attrs[attr];

                    if (!isNaN(value)) {
                        value = Number(value);
                    }

                    // if (typeof value !== 'string') {
                    //     if ([0, 1, '0', '1', 'true', 'false'].indexOf(value) !== -1) {
                    //         value = Boolean(value);
                    //     }
                    // }

                    this.options[attr] = value;
                }
            });

            Object.keys(this.$listeners).forEach(methodName => {
                if (helpers.isMethodProp(methodName)) {
                    this.options[methodName] = this.$listeners[methodName];
                }
            });
        },
        mounted() {
            let elm;
            let cloned = false;
            if (this.$attrs.for) {
                const selectorType = this.$attrs.for[0];
                const selectorName = this.$attrs.for.slice(1);

                switch (selectorType) {
                    case '#':
                        elm = document.getElementById(selectorName);
                        break;
                    case '.':
                        elm = document.querySelectorAll(this.$attrs.for);
                        cloned = true;
                        break;
                    default:
                        elm = document.querySelector(`[name='${this.$attrs.for}']`);
                }
            }

            if (this.$refs.content.innerHTML.length > 0 && this.$refs.trigger.innerHTML.length > 0 || (typeof this.options.content !== 'undefined')) {
                elm = this.$refs.trigger;
            }

            if (typeof this.options.content === 'undefined') {
                this.options.content = this.$refs.content.innerHTML.length > 0 ? this.$refs.content : this.$refs.trigger;

                if (this.options.content.className === 'vuejs-tippy--trigger') {
                    this.options.content.className = 'vuejs-tippy--content';
                }

                if (cloned) {
                    let content = this.options.content;
                    this.options.content = () => content.cloneNode(true);
                }
            }

            this.options.interactive = true;
            this.tip = tippy(elm, this.options);

            !this.enabled && this.tip.disable();
            this.visible && this.tip.show();
        },
        watch: {
            content(data) {
                this.tip && this.tip.setContent(data);
            },
            options(data) {
                this.tip && this.tip.setProps(data);
            },
            enabled(data) {
                this.tip && this.tip[data ? 'enable' : 'disable']();
            },
            visible(data) {
                this.tip && this.tip[data ? 'show' : 'hide']();
            }
        },
    }
</script>