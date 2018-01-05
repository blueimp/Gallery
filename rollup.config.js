import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'js/main.js',
  plugins: [
    buble(),
    uglify()
  ],
  output: {
    file: 'js/blueimp-gallery.min.js',
    name: 'blueimp-gallery',
    format: 'umd'
  }
}
