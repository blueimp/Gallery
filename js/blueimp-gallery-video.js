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

/* global define */

;(function (factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./blueimp-helper', './blueimp-gallery'], factory)
  } else {
    // Browser globals:
    factory(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
  }
})(function ($, Gallery) {
  'use strict'

  var galleryPrototype = Gallery.prototype

  $.extend(galleryPrototype.options, {
    // The class for video content elements:
    videoContentClass: 'video-content',
    // The class for video when it is loading:
    videoLoadingClass: 'video-loading',
    // The class for video when it is playing:
    videoPlayingClass: 'video-playing',
    // The list object property (or data attribute) for the video poster URL:
    videoPosterProperty: 'poster'
  })

  var handleSlide = galleryPrototype.handleSlide

  $.extend(galleryPrototype, {
    handleSlide: function (oldIndex, newIndex) {
      handleSlide.call(this, oldIndex, newIndex)
      if (this.playingVideo) {
        this.playingVideo.pause()
      }
    },

    videoFactory: function (obj, callback, videoInterface) {
      var that = this
      var options = this.options
      var videoContainerNode = this.elementPrototype.cloneNode(false)
      var videoContainer = $(videoContainerNode)
      var errorArgs = [
        {
          type: 'error',
          target: videoContainerNode
        }
      ]
      var video = videoInterface || document.createElement('video')
      var playMediaControl = document.createElement('a')
      var url = this.getItemProperty(obj, options.urlProperty)
      var sources = this.getItemProperty(obj, options.sourcesProperty)
      var title = this.getItemProperty(obj, options.titleProperty)
      var posterUrl = this.getItemProperty(obj, options.videoPosterProperty)
      var posterImage
      var isLoading
      var hasControls
      var i
      videoContainer.addClass(options.videoContentClass)
      if (title) {
        videoContainerNode.title = title
      }
      if (posterUrl) {
        video.poster = posterUrl
        posterImage = this.imagePrototype.cloneNode(false)
        $(posterImage).addClass(options.toggleClass)
        posterImage.src = posterUrl
        posterImage.draggable = false
        posterImage.alt =
          this.getItemProperty(obj, this.options.altTextProperty) || title
        videoContainerNode.appendChild(posterImage)
      }
      video.controls = true
      video.preload = 'none'
      if (this.support.source && sources) {
        for (i = 0; i < sources.length; i += 1) {
          video.appendChild(
            $.extend(this.sourcePrototype.cloneNode(false), sources[i])
          )
        }
      }
      if (url) video.src = url
      playMediaControl.href =
        url || (sources && sources.length && sources[0].src)
      if (video.play && video.pause) {
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

  return Gallery
})
