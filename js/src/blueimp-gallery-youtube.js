/*
 * blueimp Gallery YouTube Video Factory JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global window, document, YT */

import $ from './blueimp-helper'
import Gallery from './blueimp-gallery'

$.extend(Gallery.prototype.options, {
  // The list object property (or data attribute) with the YouTube video id:
  youTubeVideoIdProperty: 'youtube',
  // Optional object with parameters passed to the YouTube video player:
  // https://developers.google.com/youtube/player_parameters
  youTubePlayerVars: {
    wmode: 'transparent'
  },
  // Require a click on the native YouTube player for the initial playback:
  youTubeClickToPlay: true
})

const textFactory = Gallery.prototype.textFactory || Gallery.prototype.imageFactory

const YouTubePlayer = function (videoId, playerVars, clickToPlay) {
  this.videoId = videoId
  this.playerVars = playerVars
  this.clickToPlay = clickToPlay
  this.element = document.createElement('div')
  this.listeners = {}
}

$.extend(YouTubePlayer.prototype, {
  canPlayType: function () {
    return true
  },

  on: function (type, func) {
    this.listeners[type] = func
    return this
  },

  loadAPI: function () {
    const that = this
    const onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady
    const apiUrl = '//www.youtube.com/iframe_api'
    const scriptTags = document.getElementsByTagName('script')
    let i = scriptTags.length
    let scriptTag
    window.onYouTubeIframeAPIReady = function () {
      if (onYouTubeIframeAPIReady) {
        onYouTubeIframeAPIReady.apply(this)
      }
      if (that.playOnReady) {
        that.play()
      }
    }
    while (i) {
      i -= 1
      if (scriptTags[i].src === apiUrl) {
        return
      }
    }
    scriptTag = document.createElement('script')
    scriptTag.src = apiUrl
    scriptTags[0].parentNode.insertBefore(scriptTag, scriptTags[0])
  },

  onReady: function () {
    this.ready = true
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
    Gallery.prototype.setTimeout.call(this, this.checkSeek, null, 2000)
  },

  checkSeek: function () {
    if (
      this.stateChange === YT.PlayerState.PAUSED ||
      this.stateChange === YT.PlayerState.ENDED
    ) {
      // check if current state change is actually paused
      this.listeners.pause()
      delete this.playStatus
    }
  },

  onStateChange: function (event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        this.hasPlayed = true
        this.onPlaying()
        break
      case YT.PlayerState.PAUSED:
      case YT.PlayerState.ENDED:
        this.onPause()
        break
    }
    // Save most recent state change to this.stateChange
    this.stateChange = event.data
  },

  onError: function (event) {
    this.listeners.error(event)
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
        this.player.playVideo()
      }
    } else {
      this.playOnReady = true
      if (!(window.YT && YT.Player)) {
        this.loadAPI()
      } else if (!this.player) {
        this.player = new YT.Player(this.element, {
          videoId: this.videoId,
          playerVars: this.playerVars,
          events: {
            onReady: function () {
              that.onReady()
            },
            onStateChange: function (event) {
              that.onStateChange(event)
            },
            onError: function (event) {
              that.onError(event)
            }
          }
        })
      }
    }
  },

  pause: function () {
    if (this.ready) {
      this.player.pauseVideo()
    } else if (this.playStatus) {
      delete this.playOnReady
      this.listeners.pause()
      delete this.playStatus
    }
  }
})

$.extend(Gallery.prototype, {
  YouTubePlayer: YouTubePlayer,

  textFactory: function (obj, callback) {
    const options = this.options
    const videoId = this.getItemProperty(obj, options.youTubeVideoIdProperty)
    if (videoId) {
      if (this.getItemProperty(obj, options.urlProperty) === undefined) {
        obj[options.urlProperty] = '//www.youtube.com/watch?v=' + videoId
      }
      if (
        this.getItemProperty(obj, options.videoPosterProperty) === undefined
      ) {
        obj[options.videoPosterProperty] =
          '//img.youtube.com/vi/' + videoId + '/maxresdefault.jpg'
      }
      return this.videoFactory(
        obj,
        callback,
        new YouTubePlayer(
          videoId,
          options.youTubePlayerVars,
          options.youTubeClickToPlay
        )
      )
    }
    return textFactory.call(this, obj, callback)
  }
})

export default Gallery
