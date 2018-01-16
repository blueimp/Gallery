import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'js/src/main.js',
  plugins: [
    resolve(),
    buble(),
    uglify()
  ],
  output: {
    file: 'js/dist/blueimp-gallery.min.js',
    name: 'blueimp-gallery',
    format: 'umd'
  },
  external: ['jquery']
}
