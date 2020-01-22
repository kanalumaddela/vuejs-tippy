import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import terser from 'rollup-plugin-terser'

export default {
    input: 'src/index.js',
    plugins: [
        commonjs(),
        vue(),
    ],
    output: [
        {
            exports: 'named',
            name: 'VueJSTippy',
            file: `dist/vuejs-tippy.js`,
            format: 'umd',
            globals: {
                'tippy.js': 'tippy'
            },
        },
        {
            exports: 'named',
            name: 'VueJSTippy',
            file: `dist/vuejs-tippy.min.js`,
            format: 'umd',
            plugins: [
                terser.terser()
            ],
            globals: {
                'tippy.js': 'tippy'
            },
        }
    ],
    watch: {
        include: 'src/**',
    },
    external: [
        'tippy.js'
    ]
}