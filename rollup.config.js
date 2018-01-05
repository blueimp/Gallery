import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'js/src/main.js',
  plugins: [
    buble(),
    uglify()
  ],
  output: {
    file: 'js/dist/blueimp-gallery.min.js',
    name: 'blueimp-gallery',
    format: 'umd'
  }
}
