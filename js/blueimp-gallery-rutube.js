/*
 * blueimp Gallery Vimeo Video Factory JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, $f */

;(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// Register as an anonymous AMD module:
		define([
			'./blueimp-helper',
			'./blueimp-gallery-video'
		], factory);
	} else {
		// Browser globals:
		factory(
			window.blueimp.helper || window.jQuery,
			window.blueimp.Gallery
		);
	}
}(function ($, Gallery) {
	'use strict';

	if (!window.postMessage) {
		return Gallery;
	}

	$.extend(Gallery.prototype.options, {
		rutubeVideoIdProperty: 'rutube',
		rutubePlayerUrl: '//rutube.ru/play/embed/VIDEO_ID',
		rutubeClickToPlay: true
	});

	var textFactory = Gallery.prototype.textFactory ||
		Gallery.prototype.imageFactory;
	var RutubePlayer = function (url, videoId, clickToPlay) {
		this.url = url;
		this.videoId = videoId;
		this.clickToPlay = clickToPlay;
		this.element = document.createElement('div');
		this.listeners = {};
	};

	$.extend(RutubePlayer.prototype, {
		canPlayType: function () {
			return true;
		},

		on: function (type, func) {
			this.listeners[type] = func;
			return this;
		},

		onReady: function () {
			var that = this;
			this.ready = true;
			window.addEventListener('message', function(event) {
				var message = JSON.parse(event.data);
				if (message.type == 'player:changeState') {
					switch(message.data.state) {
						case 'playing':
							that.hasPlayed = true;
							that.onPlaying();
							break;
						case 'paused':
						case 'stopped':
							that.onPause();
							break;
					}
				}
			});
			if (this.playOnReady) {
				this.play();
			}
		},

		onPlaying: function () {
			if (this.playStatus < 2) {
				this.listeners.playing();
				this.playStatus = 2;
			}
		},

		onPause: function () {
			this.listeners.pause();
			delete this.playStatus;
		},

		insertIframe: function () {
			var iframe = document.createElement('iframe');
			iframe.src = this.url
				.replace('VIDEO_ID', this.videoId);
			this.element.parentNode.replaceChild(iframe, this.element);
			this.element = iframe;
			this.isIframe = true;
		},

		play: function () {
			var that = this;
			if (!this.playStatus) {
				this.listeners.play();
				this.playStatus = 1;
			}
			if (this.ready) {

				if (!this.hasPlayed && (this.clickToPlay || (window.navigator &&
					/iP(hone|od|ad)/.test(window.navigator.platform)))) {
					// Manually trigger the playing callback if clickToPlay
					// is enabled and to workaround a limitation in iOS,
					// which requires synchronous user interaction to start
					// the video playback:
					this.onPlaying();
				} else {
					this.element.contentWindow.postMessage(JSON.stringify({
						type: 'player:play',
						data: {}
					}), '*');
				}
			} else {
				this.playOnReady = true;
				if (!this.isIframe) {
					this.insertIframe();
					window.addEventListener('message', function (event) {
						var message = JSON.parse(event.data);
						if (message.type == 'player:ready') {
							that.onReady();
						}
					});
				}
			}
		},

		pause: function () {
			if (this.ready) {
				this.element.contentWindow.postMessage(JSON.stringify({
					type: 'player:pause',
					data: {}
				}), '*');
			} else if (this.playStatus) {
				delete this.playOnReady;
				this.listeners.pause();
				delete this.playStatus;
			}
		}
	});

	$.extend(Gallery.prototype, {
		RutubePlayer: RutubePlayer,

		textFactory: function (obj, callback) {
			var options = this.options;
			var videoId = this.getItemProperty(obj, options.rutubeVideoIdProperty);
			if (videoId) {
				if (this.getItemProperty(obj, options.urlProperty) === undefined) {
					obj[options.urlProperty] = '//rutube.ru/play/embed/' + videoId;
				}
				return this.videoFactory(
					obj,
					callback,
					new RutubePlayer(
						options.rutubePlayerUrl,
						videoId,
						options.rutubeClickToPlay
					)
				);
			}
			return textFactory.call(this, obj, callback);
		}

	});

	return Gallery;
}));
