import resolve from 'rollup-plugin-node-resolve'

import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'js/src/main-jquery.js',
  plugins: [
    resolve(),
    buble(),
    uglify()
  ],
  output: {
    file: 'js/dist/jquery.blueimp-gallery.min.js',
    name: 'blueimp-gallery-jquery',
    format: 'umd',
    globals: {
      jquery: '$'
    }
  },
  external: ['jquery']
}
