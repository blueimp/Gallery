import './blueimp-gallery-fullscreen'
import './blueimp-gallery-indicator'
import './blueimp-gallery-video'
import './blueimp-gallery-vimeo'
import './blueimp-gallery-youtube'
import './jquery.blueimp-gallery'

import Gallery from './blueimp-gallery'

if (typeof window !== 'undefined') {
  window.blueimp = window.blueimp || {}
  window.blueimp.Gallery = Gallery
}

export default Gallery
