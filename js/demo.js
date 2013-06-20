/*
 * blueimp Gallery Demo JS 1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, document, blueimp, $ */

$(function () {
    'use strict';

    // Load demo images from flickr:
    $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3'
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (data) {
        var linksContainer = $('#links'),
            links,
            url;
        // Add the demo images as links with thumbnails to the page:
        $.each(data.photos.photo, function (index, photo) {
            url = 'http://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;
            $('<a/>')
                .append($('<img>').prop('src', url + '_s.jpg'))
                .prop('href', url + '_b.jpg')
                .prop('title', photo.title)
                .data('index', index)
                .appendTo(linksContainer);
        });
        links = linksContainer.find('a').on('click', function (event) {
            // Initialize the Gallery as modal dialog,
            // starting with the selected image in fullscreen:
            var gallery = blueimp.Gallery(links, {
                startSlide: $(this).data('index'),
                fullScreen: true
            });
            if (gallery) {
                event.preventDefault();
            }
        });
        // Initialize the Gallery as carousel:
        blueimp.Gallery(links, {
            containerId: 'blueimp-gallery-carousel',
            carousel: true
        });
    });

});
