/* global require, module */

var Gallery,
    helper = require('./js/blueimp-helper'),
    mainGallery = require('./js/blueimp-gallery'),
    fullscreen = require('./js/blueimp-gallery-fullscreen'),
    indicator = require('./js/blueimp-gallery-indicator'),
    video = require('./js/blueimp-gallery-video'),
    vimeo = require('./js/blueimp-gallery-vimeo'),
    youtube = require('./js/blueimp-gallery-youtube');

Gallery = fullscreen(
    helper,
    indicator(
        helper,
        video(
            helper,
            vimeo(
                helper,
                youtube(
                    helper,
                    mainGallery(helper)
                )
            )
        )
    )
);
module.exports = Gallery;
