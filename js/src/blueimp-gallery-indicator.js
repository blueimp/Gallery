/*
 * blueimp Gallery Indicator JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global window, document */

import $ from './blueimp-helper'
import Gallery from './blueimp-gallery'

$.extend(Gallery.prototype.options, {
  // The tag name, Id, element or querySelector of the indicator container:
  indicatorContainer: 'ol',
  // The class for the active indicator:
  activeIndicatorClass: 'active',
  // The list object property (or data attribute) with the thumbnail URL,
  // used as alternative to a thumbnail child element:
  thumbnailProperty: 'thumbnail',
  // Defines if the gallery indicators should display a thumbnail:
  thumbnailIndicators: true
})

const initSlides = Gallery.prototype.initSlides
const addSlide = Gallery.prototype.addSlide
const resetSlides = Gallery.prototype.resetSlides
const handleClick = Gallery.prototype.handleClick
const handleSlide = Gallery.prototype.handleSlide
const handleClose = Gallery.prototype.handleClose

$.extend(Gallery.prototype, {
  createIndicator: function (obj) {
    const indicator = this.indicatorPrototype.cloneNode(false)
    const title = this.getItemProperty(obj, this.options.titleProperty)
    const thumbnailProperty = this.options.thumbnailProperty
    let thumbnailUrl
    let thumbnail
    if (this.options.thumbnailIndicators) {
      if (thumbnailProperty) {
        thumbnailUrl = this.getItemProperty(obj, thumbnailProperty)
      }
      if (thumbnailUrl === undefined) {
        thumbnail = obj.getElementsByTagName && $(obj).find('img')[0]
        if (thumbnail) {
          thumbnailUrl = thumbnail.src
        }
      }
      if (thumbnailUrl) {
        indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")'
      }
    }
    if (title) {
      indicator.title = title
    }
    return indicator
  },

  addIndicator: function (index) {
    if (this.indicatorContainer.length) {
      const indicator = this.createIndicator(this.list[index])
      indicator.setAttribute('data-index', index)
      this.indicatorContainer[0].appendChild(indicator)
      this.indicators.push(indicator)
    }
  },

  setActiveIndicator: function (index) {
    if (this.indicators) {
      if (this.activeIndicator) {
        this.activeIndicator.removeClass(this.options.activeIndicatorClass)
      }
      this.activeIndicator = $(this.indicators[index])
      this.activeIndicator.addClass(this.options.activeIndicatorClass)
    }
  },

  initSlides: function (reload) {
    if (!reload) {
      this.indicatorContainer = this.container.find(
        this.options.indicatorContainer
      )
      if (this.indicatorContainer.length) {
        this.indicatorPrototype = document.createElement('li')
        this.indicators = this.indicatorContainer[0].children
      }
    }
    initSlides.call(this, reload)
  },

  addSlide: function (index) {
    addSlide.call(this, index)
    this.addIndicator(index)
  },

  resetSlides: function () {
    resetSlides.call(this)
    this.indicatorContainer.empty()
    this.indicators = []
  },

  handleClick: function (event) {
    const target = event.target || event.srcElement
    const parent = target.parentNode
    if (parent === this.indicatorContainer[0]) {
      // Click on indicator element
      this.preventDefault(event)
      this.slide(this.getNodeIndex(target))
    } else if (parent.parentNode === this.indicatorContainer[0]) {
      // Click on indicator child element
      this.preventDefault(event)
      this.slide(this.getNodeIndex(parent))
    } else {
      return handleClick.call(this, event)
    }
  },

  handleSlide: function (index) {
    handleSlide.call(this, index)
    this.setActiveIndicator(index)
  },

  handleClose: function () {
    if (this.activeIndicator) {
      this.activeIndicator.removeClass(this.options.activeIndicatorClass)
    }
    handleClose.call(this)
  }
})

export default Gallery
