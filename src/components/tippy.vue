<template>
    <div class="vuejs-tippy">
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
            content: null,
            options: {
                type: Object,
                default: _ => {
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
                tippyOptions: {},
            }
        },
        created() {
            this.tippyOptions = {...helpers.parseAttributes(this.$attrs), ...helpers.parseHandlers(this.$listeners), ...this.options};
        },
        mounted() {
            let elm, cloned = false;

            if (this.$attrs.for) {
                switch (this.$attrs.for[0]) {
                    case '#':
                        elm = document.getElementById(this.$attrs.for.slice(1));
                        break;
                    case '.':
                        elm = document.querySelectorAll(this.$attrs.for);
                        cloned = true;
                        break;
                    default:
                        elm = document.querySelector(`[name='${this.$attrs.for}']`);
                        break;
                }
            }

            if (typeof this.content !== 'undefined') {
                this.tippyOptions.content = this.content;
            }

            if (!elm && this.$refs.trigger.textContent.length) {
                elm = this.$refs.trigger;
            }

            if (typeof this.tippyOptions.content === 'undefined') {
                this.tippyOptions.content = this.$refs.content.textContent.length ? this.$refs.content : this.$refs.trigger;

                if (this.tippyOptions.content.childNodes.length === 1) {
                    if (this.tippyOptions.content.className === 'vuejs-tippy--trigger') {
                        this.$refs.trigger.remove();
                        this.$refs.content.remove();
                    }

                    this.tippyOptions.content = this.tippyOptions.content.childNodes[0];
                }
            }

            if (cloned) {
                const dupedContent = this.tippyOptions.content;
                this.tippyOptions.content = () => dupedContent.cloneNode(true);
            }

            this.tip = tippy(elm, this.tippyOptions);
            !this.enabled && this.validTippy() && this.tip.disable();
            this.visible && this.validTippy() && this.tip.show();
        },
        methods: {
            validTippy() {
                return typeof this.tip === 'object';
            }
        },
        watch: {
            content(data) {
                this.validTippy() && this.$nextTick(() => this.tip.setContent(data));
            },
            options(data) {
                this.validTippy() && this.$nextTick(() => this.tip.setProps(data));
            },
            enabled(data) {
                this.validTippy() && this.$nextTick(() => this.tip[data ? 'enable' : 'disable']());
            },
            visible(data) {
                this.validTippy() && this.$nextTick(() => this.tip[data ? 'show' : 'hide']());
            },
        },
    }
</script>