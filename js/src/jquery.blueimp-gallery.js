/*
 * blueimp Gallery jQuery plugin
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global window, document */

import $ from 'jquery'
import Gallery from './blueimp-gallery'

// Global click handler to open links with data-gallery attribute
// in the Gallery lightbox:

$(document).on('click', '[data-gallery]', (event) => {
  event.preventDefault()

  // Get the container id from the data-gallery attribute:
  const id = $(event.target).data('gallery')
  const widget = $(id)
  const container = (widget.length && widget) || $(Gallery.prototype.options.container)

  const callbacks = {
    onopen: function () {
      container.data('gallery', Gallery).trigger('open')
    },
    onopened: function () {
      container.trigger('opened')
    },
    onslide: function () {
      container.trigger('slide', arguments)
    },
    onslideend: function () {
      container.trigger('slideend', arguments)
    },
    onslidecomplete: function () {
      container.trigger('slidecomplete', arguments)
    },
    onclose: function () {
      container.trigger('close')
    },
    onclosed: function () {
      container.trigger('closed').removeData('gallery')
    }
  }

  const options = $.extend(
    // Retrieve custom options from data-attributes
    // on the Gallery widget:
    container.data(),
    { container: container[0], index: event.currentTarget, event: event },
    callbacks
  )

  // Select all links with the same data-gallery attribute:
  let links = (id !== undefined) ? $(`[data-gallery=${id}]`) : $('[data-gallery]')
  if (options.filter) links = links.filter(options.filter)

  return new Gallery(links, options)
})
