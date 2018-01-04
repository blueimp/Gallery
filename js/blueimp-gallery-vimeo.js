/*
 * blueimp Gallery Vimeo Video Factory JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global window, document, $f */

import $ from './blueimp-helper'
import Gallery from './blueimp-gallery'

$.extend(Gallery.prototype.options, {
  // The list object property (or data attribute) with the Vimeo video id:
  vimeoVideoIdProperty: 'vimeo',
  // The URL for the Vimeo video player, can be extended with custom parameters:
  // https://developer.vimeo.com/player/embedding
  vimeoPlayerUrl:
    '//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID',
  // The prefix for the Vimeo video player ID:
  vimeoPlayerIdPrefix: 'vimeo-player-',
  // Require a click on the native Vimeo player for the initial playback:
  vimeoClickToPlay: true
})

const textFactory = Gallery.prototype.textFactory || Gallery.prototype.imageFactory
let counter = 0

const VimeoPlayer = function (url, videoId, playerId, clickToPlay) {
  this.url = url
  this.videoId = videoId
  this.playerId = playerId
  this.clickToPlay = clickToPlay
  this.element = document.createElement('div')
  this.listeners = {}
}

$.extend(VimeoPlayer.prototype, {
  canPlayType: function () {
    return true
  },

  on: function (type, func) {
    this.listeners[type] = func
    return this
  },

  loadAPI: function () {
    const that = this
    const apiUrl = '//f.vimeocdn.com/js/froogaloop2.min.js'
    const scriptTags = document.getElementsByTagName('script')
    let i = scriptTags.length
    let scriptTag
    let called
    function callback () {
      if (!called && that.playOnReady) {
        that.play()
      }
      called = true
    }
    while (i) {
      i -= 1
      if (scriptTags[i].src === apiUrl) {
        scriptTag = scriptTags[i]
        break
      }
    }
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.src = apiUrl
    }
    $(scriptTag).on('load', callback)
    scriptTags[0].parentNode.insertBefore(scriptTag, scriptTags[0])
    // Fix for cached scripts on IE 8:
    if (/loaded|complete/.test(scriptTag.readyState)) {
      callback()
    }
  },

  onReady: function () {
    const that = this
    this.ready = true
    this.player.addEvent('play', function () {
      that.hasPlayed = true
      that.onPlaying()
    })
    this.player.addEvent('pause', function () {
      that.onPause()
    })
    this.player.addEvent('finish', function () {
      that.onPause()
    })
    if (this.playOnReady) {
      this.play()
    }
  },

  onPlaying: function () {
    if (this.playStatus < 2) {
      this.listeners.playing()
      this.playStatus = 2
    }
  },

  onPause: function () {
    this.listeners.pause()
    delete this.playStatus
  },

  insertIframe: function () {
    const iframe = document.createElement('iframe')
    iframe.src = this.url
      .replace('VIDEO_ID', this.videoId)
      .replace('PLAYER_ID', this.playerId)
    iframe.id = this.playerId
    this.element.parentNode.replaceChild(iframe, this.element)
    this.element = iframe
  },

  play: function () {
    const that = this
    if (!this.playStatus) {
      this.listeners.play()
      this.playStatus = 1
    }
    if (this.ready) {
      if (
        !this.hasPlayed &&
        (this.clickToPlay ||
          (window.navigator &&
            /iP(hone|od|ad)/.test(window.navigator.platform)))
      ) {
        // Manually trigger the playing callback if clickToPlay
        // is enabled and to workaround a limitation in iOS,
        // which requires synchronous user interaction to start
        // the video playback:
        this.onPlaying()
      } else {
        this.player.api('play')
      }
    } else {
      this.playOnReady = true
      if (!window.$f) {
        this.loadAPI()
      } else if (!this.player) {
        this.insertIframe()
        this.player = $f(this.element)
        this.player.addEvent('ready', function () {
          that.onReady()
        })
      }
    }
  },

  pause: function () {
    if (this.ready) {
      this.player.api('pause')
    } else if (this.playStatus) {
      delete this.playOnReady
      this.listeners.pause()
      delete this.playStatus
    }
  }
})

$.extend(Gallery.prototype, {
  VimeoPlayer: VimeoPlayer,

  textFactory: function (obj, callback) {
    const options = this.options
    const videoId = this.getItemProperty(obj, options.vimeoVideoIdProperty)
    if (videoId) {
      if (this.getItemProperty(obj, options.urlProperty) === undefined) {
        obj[options.urlProperty] = '//vimeo.com/' + videoId
      }
      counter += 1
      return this.videoFactory(
        obj,
        callback,
        new VimeoPlayer(
          options.vimeoPlayerUrl,
          videoId,
          options.vimeoPlayerIdPrefix + counter,
          options.vimeoClickToPlay
        )
      )
    }
    return textFactory.call(this, obj, callback)
  }
})

export default Gallery
