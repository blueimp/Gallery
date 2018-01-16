import './blueimp-gallery-fullscreen'
import './blueimp-gallery-indicator'
import './blueimp-gallery-video'
import './blueimp-gallery-vimeo'
import './blueimp-gallery-youtube'

import helper from './blueimp-helper'
import Gallery from './blueimp-gallery'

if (typeof window !== 'undefined') {
  window.blueimp = window.blueimp || {}
  window.blueimp.Gallery = Gallery

  // use helper if jQuery isn't present
  if (typeof window.jQuery === 'undefined') {
    window.$ = helper
  }
}

export default Gallery
