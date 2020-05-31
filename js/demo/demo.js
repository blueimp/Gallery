/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global blueimp, $ */

$(function () {
  'use strict'

  // Flickr image types:
  var imageTypes = [
    // https://www.flickr.com/services/api/misc.urls.html
    'sq', // 75x75
    'q', // 150x150
    't', // 100 on longest side
    's', // 240 on longest side
    'n', // 320 on longest side
    'm', // 500 on longest side
    'z', // 640 on longest side
    'c', // 800 on longest side
    'l', // 1024 on longest side
    'h', // 1600 on longest side
    'k', // 2048 on longest side
    'o' // original dimensions
  ]
  // Load demo images from Flickr:
  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
      // https://www.flickr.com/services/api/flickr.interestingness.getList.html
      method: 'flickr.interestingness.getList',
      format: 'json',
      extras: 'url_' + imageTypes.join(',url_'),
      // eslint-disable-next-line camelcase
      api_key: '7617adae70159d09ba78cfec73c13be3'
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var maxWidth = $(document.body).css('max-width')
    var sizes = '(min-width: ' + maxWidth + ') ' + maxWidth + ', 100vw'
    var carouselLinks = []
    var linksContainer = $('#links')
    // Add the demo images as links with thumbnails to the page:
    $.each(result.photos.photo, function (_, photo) {
      var thumbnail = $('<img>')
        .prop('src', photo.url_sq)
        .prop('alt', photo.title)
      var srcset = []
      $.each(imageTypes, function (_, type) {
        var url = photo['url_' + type]
        var width = photo['width_' + type]
        if (url) {
          srcset.push(url + ' ' + width + 'w')
        }
      })
      srcset = srcset.join(',')
      $('<a></a>')
        .append(thumbnail)
        .prop('title', photo.title)
        .prop('href', photo.url_l)
        .attr('data-srcset', srcset)
        .attr('data-gallery', '')
        .appendTo(linksContainer)
      carouselLinks.push({
        title: photo.title,
        href: photo.url_l,
        sizes: sizes,
        srcset: srcset
      })
    })
    // Initialize the Gallery as image carousel:
    // eslint-disable-next-line new-cap
    blueimp.Gallery(carouselLinks, {
      container: '#blueimp-image-carousel',
      carousel: true
    })
  })

  // Initialize the Gallery as video carousel:
  // eslint-disable-next-line new-cap
  blueimp.Gallery(
    [
      {
        title: 'Sintel',
        href: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4',
        type: 'video/mp4',
        poster: 'https://i.imgur.com/MUSw4Zu.jpg'
      },
      {
        title: 'Big Buck Bunny',
        href:
          'https://upload.wikimedia.org/wikipedia/commons/c/c0/' +
          'Big_Buck_Bunny_4K.webm',
        type: 'video/webm',
        poster:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/' +
          'Big_Buck_Bunny_4K.webm/4000px--Big_Buck_Bunny_4K.webm.jpg'
      },
      {
        title: 'Elephants Dream',
        href:
          'https://upload.wikimedia.org/wikipedia/commons/8/83/' +
          'Elephants_Dream_%28high_quality%29.ogv',
        type: 'video/ogg',
        poster:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
          'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
      },
      {
        title: 'LES TWINS - An Industry Ahead',
        type: 'text/html',
        youtube: 'zi4CIXpx7Bg'
      },
      {
        title: 'KN1GHT - Last Moon',
        type: 'text/html',
        vimeo: '73686146',
        poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
      }
    ],
    {
      container: '#blueimp-video-carousel',
      carousel: true
    }
  )

  $('#fullscreen').change(function () {
    $('#blueimp-gallery').data('fullscreen', this.checked)
  })
})
