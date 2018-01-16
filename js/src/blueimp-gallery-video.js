/*
 * blueimp Gallery Video Factory JS
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
  // The class for video content elements:
  videoContentClass: 'video-content',
  // The class for video when it is loading:
  videoLoadingClass: 'video-loading',
  // The class for video when it is playing:
  videoPlayingClass: 'video-playing',
  // The list object property (or data attribute) for the video poster URL:
  videoPosterProperty: 'poster',
  // The list object property (or data attribute) for the video sources array:
  videoSourcesProperty: 'sources'
})

const handleSlide = Gallery.prototype.handleSlide

$.extend(Gallery.prototype, {
  handleSlide: function (index) {
    handleSlide.call(this, index)
    if (this.playingVideo) {
      this.playingVideo.pause()
    }
  },

  videoFactory: function (obj, callback, videoInterface) {
    const that = this
    const options = this.options
    const videoContainerNode = this.elementPrototype.cloneNode(false)
    const videoContainer = $(videoContainerNode)
    const errorArgs = [
      {
        type: 'error',
        target: videoContainerNode
      }
    ]
    const video = videoInterface || document.createElement('video')
    let url = this.getItemProperty(obj, options.urlProperty)
    let type = this.getItemProperty(obj, options.typeProperty)
    const title = this.getItemProperty(obj, options.titleProperty)
    const posterUrl = this.getItemProperty(obj, options.videoPosterProperty)
    let posterImage
    const sources = this.getItemProperty(obj, options.videoSourcesProperty)
    let source
    let playMediaControl
    let isLoading
    let hasControls
    videoContainer.addClass(options.videoContentClass)
    if (title) {
      videoContainerNode.title = title
    }
    if (video.canPlayType) {
      if (url && type && video.canPlayType(type)) {
        video.src = url
      } else if (sources) {
        while (sources.length) {
          source = sources.shift()
          url = this.getItemProperty(source, options.urlProperty)
          type = this.getItemProperty(source, options.typeProperty)
          if (url && type && video.canPlayType(type)) {
            video.src = url
            break
          }
        }
      }
    }
    if (posterUrl) {
      video.poster = posterUrl
      posterImage = this.imagePrototype.cloneNode(false)
      $(posterImage).addClass(options.toggleClass)
      posterImage.src = posterUrl
      posterImage.draggable = false
      videoContainerNode.appendChild(posterImage)
    }
    playMediaControl = document.createElement('a')
    playMediaControl.setAttribute('target', '_blank')
    if (!videoInterface) {
      playMediaControl.setAttribute('download', title)
    }
    playMediaControl.href = url
    if (video.src) {
      video.controls = true
      ;(videoInterface || $(video))
        .on('error', function () {
          that.setTimeout(callback, errorArgs)
        })
        .on('pause', function () {
          if (video.seeking) return
          isLoading = false
          videoContainer
            .removeClass(that.options.videoLoadingClass)
            .removeClass(that.options.videoPlayingClass)
          if (hasControls) {
            that.container.addClass(that.options.controlsClass)
          }
          delete that.playingVideo
          if (that.interval) {
            that.play()
          }
        })
        .on('playing', function () {
          isLoading = false
          videoContainer
            .removeClass(that.options.videoLoadingClass)
            .addClass(that.options.videoPlayingClass)
          if (that.container.hasClass(that.options.controlsClass)) {
            hasControls = true
            that.container.removeClass(that.options.controlsClass)
          } else {
            hasControls = false
          }
        })
        .on('play', function () {
          window.clearTimeout(that.timeout)
          isLoading = true
          videoContainer.addClass(that.options.videoLoadingClass)
          that.playingVideo = video
        })
      $(playMediaControl).on('click', function (event) {
        that.preventDefault(event)
        if (isLoading) {
          video.pause()
        } else {
          video.play()
        }
      })
      videoContainerNode.appendChild(
        (videoInterface && videoInterface.element) || video
      )
    }
    videoContainerNode.appendChild(playMediaControl)
    this.setTimeout(callback, [
      {
        type: 'load',
        target: videoContainerNode
      }
    ])
    return videoContainerNode
  }
})

export default Gallery
