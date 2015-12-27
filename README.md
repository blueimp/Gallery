# blueimp Gallery

- [Demo](#demo)
- [Description](#description)
- [Setup](#setup)
    - [Lightbox setup](#lightbox-setup)
    - [Controls](#controls)
    - [Carousel setup](#carousel-setup)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Options](#options)
    - [Default options](#default-options)
    - [Event callbacks](#event-callbacks)
    - [Carousel options](#carousel-options)
    - [Indicator options](#indicator-options)
    - [Fullscreen options](#fullscreen-options)
    - [Video options](#video-options)
        - [Video factory options](#video-factory-options)
        - [YouTube options](#youtube-options)
        - [Vimeo options](#vimeo-options)
    - [Container and element options](#container-and-element-options)
    - [Property options](#property-options)
- [API](#api)
    - [Initialization](#initialization)
    - [API methods](#api-methods)
    - [Videos](#videos)
        - [HTML5 video player](#html5-video-player)
        - [Multiple video sources](#multiple-video-sources)
        - [YouTube](#youtube)
        - [Vimeo](#vimeo)
    - [Additional Gallery elements](#additional-gallery-elements)
    - [Additional content types](#additional-content-types)
        - [Example HTML text factory implementation](#example-html-text-factory-implementation)
    - [jQuery plugin](#jquery-plugin)
        - [jQuery plugin setup](#jquery-plugin-setup)
        - [HTML5 data-attributes](#html5-data-attributes)
        - [Container ids and link grouping](#container-ids-and-link-grouping)
        - [Gallery object](#gallery-object)
        - [jQuery events](#jquery-events)
- [Requirements](#requirements)
- [Browsers](#browsers)
    - [Desktop browsers](#desktop-browsers)
    - [Mobile browsers](#mobile-browsers)
- [License](#license)
- [Credits](#credits)

## Demo
[blueimp Gallery Demo](https://blueimp.github.io/Gallery/)

## Description
blueimp Gallery is a touch-enabled, responsive and customizable image and video
gallery, carousel and lightbox, optimized for both mobile and desktop web
browsers.  
It features swipe, mouse and keyboard navigation, transition effects, slideshow
functionality, fullscreen support and on-demand content loading and can be
extended to display additional content types.

## Setup

### Lightbox setup
Copy the **css**, **img** and **js** directories to your website.

Include the Gallery stylesheet in the head section of your webpage:

```html
<link rel="stylesheet" href="css/blueimp-gallery.min.css">
```

Add the following HTML snippet with the Gallery widget to the body of your
webpage:

```html
<!-- The Gallery as lightbox dialog, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

Include the Gallery script at the bottom of the body of your webpage:

```html
<script src="js/blueimp-gallery.min.js"></script>
```

Create a list of links to image files, optionally with enclosed thumbnails and
add them to the body of your webpage, before including the Gallery script:

```html
<div id="links">
    <a href="images/banana.jpg" title="Banana">
        <img src="images/thumbnails/banana.jpg" alt="Banana">
    </a>
    <a href="images/apple.jpg" title="Apple">
        <img src="images/thumbnails/apple.jpg" alt="Apple">
    </a>
    <a href="images/orange.jpg" title="Orange">
        <img src="images/thumbnails/orange.jpg" alt="Orange">
    </a>
</div>
```

Add the following JavaScript code after including the Gallery script, to display
the images in the Gallery lightbox on click of the links:

```html
<script>
document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};
</script>
```

### Controls
To initialize the Gallery with visible controls, add the CSS class
**blueimp-gallery-controls** to the Gallery widget:

```html
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

### Carousel setup
To display the images in an inline carousel instead of a lightbox, follow the
[lightbox setup](#lightbox-setup) and add the CSS class
**blueimp-gallery-carousel** to the Gallery widget and remove the child element
with the **close** class, or add a new Gallery widget with a different **id**
to your webpage:

```html
<!-- The Gallery as inline carousel, can be positioned anywhere on the page -->
<div id="blueimp-gallery-carousel" class="blueimp-gallery blueimp-gallery-carousel">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

Add the following JavaScript code after including the Gallery script to
initialize the carousel:

```html
<script>
blueimp.Gallery(
    document.getElementById('links').getElementsByTagName('a'),
    {
        container: '#blueimp-gallery-carousel',
        carousel: true
    }
);
</script>
```

## Keyboard shortcuts
The Gallery can be controlled with the following keyboard shortcuts:

* **Return**: Toggle controls visibility.
* **Esc**: Close the Gallery lightbox.
* **Space**: Toggle the slideshow (play/pause).
* **Left**: Move to the previous slide.
* **Right**: Move to the next slide.

Please note that setting the **carousel** option to **true** disables the
keyboard shortcuts by default.

## Options

### Default options
The following are the default options set by the core Gallery library:

```js
var options = {
    // The Id, element or querySelector of the gallery widget:
    container: '#blueimp-gallery',
    // The tag name, Id, element or querySelector of the slides container:
    slidesContainer: 'div',
    // The tag name, Id, element or querySelector of the title element:
    titleElement: 'h3',
    // The class to add when the gallery is visible:
    displayClass: 'blueimp-gallery-display',
    // The class to add when the gallery controls are visible:
    controlsClass: 'blueimp-gallery-controls',
    // The class to add when the gallery only displays one element:
    singleClass: 'blueimp-gallery-single',
    // The class to add when the left edge has been reached:
    leftEdgeClass: 'blueimp-gallery-left',
    // The class to add when the right edge has been reached:
    rightEdgeClass: 'blueimp-gallery-right',
    // The class to add when the automatic slideshow is active:
    playingClass: 'blueimp-gallery-playing',
    // The class for all slides:
    slideClass: 'slide',
    // The slide class for loading elements:
    slideLoadingClass: 'slide-loading',
    // The slide class for elements that failed to load:
    slideErrorClass: 'slide-error',
    // The class for the content element loaded into each slide:
    slideContentClass: 'slide-content',
    // The class for the "toggle" control:
    toggleClass: 'toggle',
    // The class for the "prev" control:
    prevClass: 'prev',
    // The class for the "next" control:
    nextClass: 'next',
    // The class for the "close" control:
    closeClass: 'close',
    // The class for the "play-pause" toggle control:
    playPauseClass: 'play-pause',
    // The list object property (or data attribute) with the object type:
    typeProperty: 'type',
    // The list object property (or data attribute) with the object title:
    titleProperty: 'title',
    // The list object property (or data attribute) with the object URL:
    urlProperty: 'href',
    // The gallery listens for transitionend events before triggering the
    // opened and closed events, unless the following option is set to false:
    displayTransition: true,
    // Defines if the gallery slides are cleared from the gallery modal,
    // or reused for the next gallery initialization:
    clearSlides: true,
    // Defines if images should be stretched to fill the available space,
    // while maintaining their aspect ratio (will only be enabled for browsers
    // supporting background-size="contain", which excludes IE < 9).
    // Set to "cover", to make images cover all available space (requires
    // support for background-size="cover", which excludes IE < 9):
    stretchImages: false,
    // Toggle the controls on pressing the Return key:
    toggleControlsOnReturn: true,
    // Toggle the automatic slideshow interval on pressing the Space key:
    toggleSlideshowOnSpace: true,
    // Navigate the gallery by pressing left and right on the keyboard:
    enableKeyboardNavigation: true,
    // Close the gallery on pressing the ESC key:
    closeOnEscape: true,
    // Close the gallery when clicking on an empty slide area:
    closeOnSlideClick: true,
    // Close the gallery by swiping up or down:
    closeOnSwipeUpOrDown: true,
    // Emulate touch events on mouse-pointer devices such as desktop browsers:
    emulateTouchEvents: true,
    // Stop touch events from bubbling up to ancestor elements of the Gallery:
    stopTouchEventsPropagation: false,
    // Hide the page scrollbars:
    hidePageScrollbars: true,
    // Stops any touches on the container from scrolling the page:
    disableScroll: true,
    // Carousel mode (shortcut for carousel specific options):
    carousel: false,
    // Allow continuous navigation, moving from last to first
    // and from first to last slide:
    continuous: true,
    // Remove elements outside of the preload range from the DOM:
    unloadElements: true,
    // Start with the automatic slideshow:
    startSlideshow: false,
    // Delay in milliseconds between slides for the automatic slideshow:
    slideshowInterval: 5000,
    // The starting index as integer.
    // Can also be an object of the given list,
    // or an equal object with the same url property:
    index: 0,
    // The number of elements to load around the current index:
    preloadRange: 2,
    // The transition speed between slide changes in milliseconds:
    transitionSpeed: 400,
    // The transition speed for automatic slide changes, set to an integer
    // greater 0 to override the default transition speed:
    slideshowTransitionSpeed: undefined,
    // The event object for which the default action will be canceled
    // on Gallery initialization (e.g. the click event to open the Gallery):
    event: undefined,
    // Callback function executed when the Gallery is initialized.
    // Is called with the gallery instance as "this" object:
    onopen: undefined,
    // Callback function executed when the Gallery has been initialized
    // and the initialization transition has been completed.
    // Is called with the gallery instance as "this" object:
    onopened: undefined,
    // Callback function executed on slide change.
    // Is called with the gallery instance as "this" object and the
    // current index and slide as arguments:
    onslide: undefined,
    // Callback function executed after the slide change transition.
    // Is called with the gallery instance as "this" object and the
    // current index and slide as arguments:
    onslideend: undefined,
    // Callback function executed on slide content load.
    // Is called with the gallery instance as "this" object and the
    // slide index and slide element as arguments:
    onslidecomplete: undefined,
    // Callback function executed when the Gallery is about to be closed.
    // Is called with the gallery instance as "this" object:
    onclose: undefined,
    // Callback function executed when the Gallery has been closed
    // and the closing transition has been completed.
    // Is called with the gallery instance as "this" object:
    onclosed: undefined
};
```

### Event callbacks
Event callbacks can be set as function properties of the options object passed
to the Gallery initialization function:

```js
var gallery = blueimp.Gallery(
    linkList,
    {
        onopen: function () {
            // Callback function executed when the Gallery is initialized.
        },
        onopened: function () {
            // Callback function executed when the Gallery has been initialized
            // and the initialization transition has been completed.
        },
        onslide: function (index, slide) {
            // Callback function executed on slide change.
        },
        onslideend: function (index, slide) {
            // Callback function executed after the slide change transition.
        },
        onslidecomplete: function (index, slide) {
            // Callback function executed on slide content load.
        },
        onclose: function () {
            // Callback function executed when the Gallery is about to be closed.
        },
        onclosed: function () {
            // Callback function executed when the Gallery has been closed
            // and the closing transition has been completed.
        }
    }
);
```

### Carousel options
If the **carousel** option is **true**, the following options are set to
different default values:

```js
var carouselOptions = {
    hidePageScrollbars: false,
    toggleControlsOnReturn: false,
    toggleSlideshowOnSpace: false,
    enableKeyboardNavigation: false,
    closeOnEscape: false,
    closeOnSlideClick: false,
    closeOnSwipeUpOrDown: false,
    disableScroll: false,
    startSlideshow: true
};
```

The options object passed to the Gallery function extends the default options
and also those options set via **carousel** mode.

### Indicator options
The following are the additional default options set for the slide position
indicator:

```js
var indicatorOptions = {
    // The tag name, Id, element or querySelector of the indicator container:
    indicatorContainer: 'ol',
    // The class for the active indicator:
    activeIndicatorClass: 'active',
    // The list object property (or data attribute) with the thumbnail URL,
    // used as alternative to a thumbnail child element:
    thumbnailProperty: 'thumbnail',
    // Defines if the gallery indicators should display a thumbnail:
    thumbnailIndicators: true
};
```

### Fullscreen options
The following are the additional default options set for the fullscreen mode:

```js
var fullscreenOptions = {
    // Defines if the gallery should open in fullscreen mode:
    fullScreen: false
};
```

### Video options

#### Video factory options
The following are the additional default options set for the video factory:

```js
var videoFactoryOptions = {
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
};
```
#### YouTube options
Options for [YouTube](https://www.youtube.com/) videos:

```js
var youTubeOptions = {
    // The list object property (or data attribute) with the YouTube video id:
    youTubeVideoIdProperty: 'youtube',
    // Optional object with parameters passed to the YouTube video player:
    // https://developers.google.com/youtube/player_parameters
    youTubePlayerVars: undefined,
    // Require a click on the native YouTube player for the initial playback:
    youTubeClickToPlay: true
};
```

#### Vimeo options
Options for [Vimeo](https://vimeo.com/) videos:

```js
var vimeoOptions = {
    // The list object property (or data attribute) with the Vimeo video id:
    vimeoVideoIdProperty: 'vimeo',
    // The URL for the Vimeo video player, can be extended with custom parameters:
    // https://developer.vimeo.com/player/embedding
    vimeoPlayerUrl: '//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID',
    // The prefix for the Vimeo video player ID:
    vimeoPlayerIdPrefix: 'vimeo-player-',
    // Require a click on the native Vimeo player for the initial playback:
    vimeoClickToPlay: true
};
```

### Container and element options
The widget **container** option can be set as id string (with "#" as prefix) or
element node, so the following are equivalent:

```js
var options = {
    container: '#blueimp-gallery'
};
```

```js
var options = {
    container: document.getElementById('blueimp-gallery')
};
```

The **slidesContainer**, **titleElement** and **indicatorContainer** options can
also be defined using a tag name, which selects the first tag of this kind found
inside of the widget container:

```js
var options = {
    slidesContainer: 'div',
    titleElement: 'h3',
    indicatorContainer: 'ol'
};
```

It is also possible to define the container and element options with a more
complex
[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector),
which is supported by IE8+ and all modern web browsers.

If the helper script is replaced with [jQuery](https://jquery.com/),
the container and element options can be any valid jQuery selector.

### Property options
The options ending with "Property" define how the properties of each link
element are accessed.  
For example, the **urlProperty** is by default set to **href**. This allows to
define link elements with **href** or **data-href** attributes:

```html
<div id="links">
    <a href="images/banana.jpg">Banana</a>
    <a data-href="images/apple.jpg">Apple</a>
</div>
```

If the links are passed as JavaScript array, it is also possible to define
nested property names, by using the native JavaScript accessor syntax for the
property string:

```js
blueimp.Gallery(
    [
        {
            data: {urls: ['https://example.org/images/banana.jpg']}
        },
        {
            data: {urls: ['https://example.org/images/apple.jpg']}
        }
    ],
    {
        urlProperty: 'data.urls[0]'
    }
);
```

## API

### Initialization
The blueimp Gallery can be initialized by simply calling it as a function with
an array of links as first argument and an optional options object as second
argument:

```js
var gallery = blueimp.Gallery(links, options);
```

The links array can be a list of URL strings or a list of objects with URL
properties:

```js
var gallery = blueimp.Gallery([
    'https://example.org/images/banana.jpg',
    'https://example.org/images/apple.jpg',
    'https://example.org/images/orange.jpg'
]);
```

```js
var gallery = blueimp.Gallery([
    {
        title: 'Banana',
        href: 'https://example.org/images/banana.jpg',
        type: 'image/jpeg',
        thumbnail: 'https://example.org/thumbnails/banana.jpg'
    },
    {
        title: 'Apple',
        href: 'https://example.org/images/apple.jpg',
        type: 'image/jpeg',
        thumbnail: 'https://example.org/thumbnails/apple.jpg'
    }
]);
```

The URL property name defined by each list object can be configured via the
**urlProperty** option. By default, it is set to **href**, which allows to pass
a list of HTML link elements as first argument.

For images, the **thumbnail** property defines the URL of the image thumbnail,
which is used for the indicator navigation displayed at the bottom of the
Gallery, if the controls are visible.

The object returned by executing the Gallery function (the **gallery** variable
in the example code above) is a new instance of the Gallery and allows to access
the public [API methods](#api-methods) provided by the Gallery.  
The Gallery initialization function returns **false** if the given list was
empty, the Gallery widget is missing, or the browser doesn't pass the
functionality test.

### API methods
The Gallery object returned by executing the Gallery function provides the
following public API methods:

```js
// Return the current slide index position:
var pos = gallery.getIndex();

// Return the total number of slides:
var count = gallery.getNumber();

// Move to the previous slide:
gallery.prev();

// Move to the next slide:
gallery.next();

// Move to the given slide index with the (optional) given duraction speed in milliseconds:
gallery.slide(index, duration);

// Start an automatic slideshow with the given interval in milliseconds (optional):
gallery.play(interval);

// Stop the automatic slideshow:
gallery.pause();

// Add additional slides after Gallery initialization:
gallery.add(list);

// Close and deinitialize the Gallery:
gallery.close();
```

### Videos

#### HTML5 video player

The Gallery can be initialized with a list of videos instead of images, or a
combination of both:

```js
blueimp.Gallery([
    {
        title: 'Fruits',
        href: 'https://example.org/videos/fruits.mp4',
        type: 'video/mp4',
        poster: 'https://example.org/images/fruits.jpg'
    },
    {
        title: 'Banana',
        href: 'https://example.org/images/banana.jpg',
        type: 'image/jpeg',
        thumbnail: 'https://example.org/thumbnails/banana.jpg'
    }
]);
```

The Gallery uses the **type** property to determine the content type of the
object to display.  
If the type property is empty or doesn't exist, the default type **image** is
assumed.  
Objects with a video type will be displayed in a
[HTML5 video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
if the browser supports the video content type.

For videos, the **poster** property defines the URL of the poster image to
display, before the video is started.

#### Multiple video sources
To provide multiple video formats, the **sources** property of a list object can
be set to an array of objects with **href** and **type** properties for each
video source. The first video format in the list that the browser can play will
be displayed:

```js
blueimp.Gallery([
    {
        title: 'Fruits',
        type: 'video/*',
        poster: 'https://example.org/images/fruits.jpg',
        sources: [
            {
                href: 'https://example.org/videos/fruits.mp4',
                type: 'video/mp4'
            },
            {
                href: 'https://example.org/videos/fruits.ogg',
                type: 'video/ogg'
            }
        ]
    }
]);
```

It is also possible to define the video sources as data-attribute on a link
element in [JSON](https://developer.mozilla.org/en-US/docs/JSON) array format:

```html
<div id="links">
    <a
        href="https://example.org/videos/fruits.mp4"
        title="Fruits"
        type="video/mp4"
        data-poster="https://example.org/images/fruits.jpg"
        data-sources='[{"href": "https://example.org/videos/fruits.mp4", "type": "video/mp4"}, {"href": "https://example.org/videos/fruits.ogg", "type": "video/ogg"}]'
    >Fruits</a>
</div>
```

#### YouTube
The Gallery can display [YouTube](https://www.youtube.com/) videos for Gallery
items with a **type** of **text/html** and a **youtube** property
(configurable via [YouTube options](#youtube-options)) with the YouTube
video-ID:

```js
blueimp.Gallery([
    {
        title: 'A YouYube video',
        href: 'https://www.youtube.com/watch?v=VIDEO_ID',
        type: 'text/html',
        youtube: 'VIDEO_ID',
        poster: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
    },
    {
        title: 'Banana',
        href: 'https://example.org/images/banana.jpg',
        type: 'image/jpeg',
        thumbnail: 'https://example.org/thumbnails/banana.jpg'
    }
]);
```

If the `href` and `poster` properties are undefined, they are set automatically
based on the video ID.

Please note that the Gallery YouTube integration requires a browser with
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage)
support, which excludes IE7.

#### Vimeo
The Gallery can display [Vimeo](https://vimeo.com/) videos for Gallery items
with a **type** of **text/html** and a **vimeo** property
(configurable via [Vimeo options](#vimeo-options)) with the Vimeo video-ID:

```js
blueimp.Gallery([
    {
        title: 'A Vimeo video',
        href: 'https://vimeo.com/VIDEO_ID',
        type: 'text/html',
        vimeo: 'VIDEO_ID',
        poster: 'https://secure-b.vimeocdn.com/ts/POSTER_ID.jpg'
    },
    {
        title: 'Banana',
        href: 'https://example.org/images/banana.jpg',
        type: 'image/jpeg',
        thumbnail: 'https://example.org/thumbnails/banana.jpg'
    }
]);
```

If the `href` property is undefined, it is set automatically based on the
video ID.

Please note that the Gallery Vimeo integration requires a browser with
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage)
support, which excludes IE7.

### Additional Gallery elements
It is possible to add additional elements to the Gallery widget, e.g. a
description label.

First, add the desired HTML element to the Gallery widget:

```html
<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <!-- The placeholder for the description label: -->
    <p class="description"></p>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

Next, add the desired element styles to your CSS file:

```css
.blueimp-gallery > .description {
  position: absolute;
  top: 30px;
  left: 15px;
  color: #fff;
  display: none;
}
.blueimp-gallery-controls > .description {
  display: block;
}
```

Then, add the additional element information to each of your links:

```html
<div id="links">
    <a href="images/banana.jpg" title="Banana" data-description="This is a banana.">Banana</a>
    <a href="images/apple.jpg" title="Apple" data-description="This is an apple.">Apple</a>
</div>
```

Finally, initialize the Gallery with an onslide callback option, to set the
element content based on the information from the current link:

```js
blueimp.Gallery(
    document.getElementById('links'),
    {
        onslide: function (index, slide) {
            var text = this.list[index].getAttribute('data-description'),
                node = this.container.find('.description');
            node.empty();
            if (text) {
                node[0].appendChild(document.createTextNode(text));
            }
        }
    }
);
```

### Additional content types
By extending the Gallery prototype with new factory methods, additional content
types can be displayed.  By default, blueimp Gallery provides the
**imageFactory** and **videoFactory** methods for **image** and **video**
content types respectively.  

The Gallery uses the **type** property of each content object to determine which
factory method to use.  The **type** defines the
[Internet media type](https://en.wikipedia.org/wiki/Internet_media_type) of the
content object and is composed of two or more parts: A type, a subtype, and zero
or more optional parameters, e.g. **text/html; charset=UTF-8** for an HTML
document with UTF-8 encoding.  
The main type (the string in front of the slash, **text** in the example above)
is concatenated with the string **Factory** to create the factory method name,
e.g. **textFactory**.

#### Example HTML text factory implementation
Please note that the textFactory script has to be included after the core
Gallery script, but before including the [YouTube](#youtube) and [Vimeo](#vimeo)
integration plugins, which extend the textFactory implementation to handle
YouTube and Vimeo video links.

Please also note that although blueimp Gallery doesn't require
[jQuery](https://jquery.com/), the following example uses it for convenience.

Extend the Gallery prototype with the **textFactory** method:

```js
blueimp.Gallery.prototype.textFactory = function (obj, callback) {
    var $element = $('<div>')
            .addClass('text-content')
            .attr('title', obj.title);
    $.get(obj.href)
        .done(function (result) {
            $element.html(result);
            callback({
                type: 'load',
                target: $element[0]
            });
        })
        .fail(function () {
            callback({
                type: 'error',
                target: $element[0]
            });
        });
    return $element[0];
};
```

Next, add the **text-content** class to the Gallery CSS:

```css
.blueimp-gallery > .slides > .slide > .text-content {
    overflow: auto;
    margin: 60px auto;
    padding: 0 60px;
    max-width: 920px;
    text-align: left;
}
```

With the previous changes in place, the Gallery can now handle HTML content
types:

```js
blueimp.Gallery([
    {
        title: 'Noodle soup',
        href: 'https://example.org/text/noodle-soup.html',
        type: 'text/html'
    },
    {
        title: 'Tomato salad',
        href: 'https://example.org/text/tomato-salad.html',
        type: 'text/html'
    }
]);
```

### jQuery plugin

#### jQuery plugin setup
The blueimp Gallery jQuery plugin registers a global click handler to open links
with **data-gallery** attribute in the Gallery lightbox.

To use it, follow the [lightbox setup](#lightbox-setup) guide, but replace the
minified Gallery script with the jQuery plugin version and include it after
including [jQuery](https://jquery.com/):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/jquery.blueimp-gallery.min.js"></script>
```

Next, add the attribute **data-gallery** to your Gallery links:

```html
<div id="links">
    <a href="images/banana.jpg" title="Banana" data-gallery>
        <img src="images/thumbnails/banana.jpg" alt="Banana">
    </a>
    <a href="images/apple.jpg" title="Apple" data-gallery>
        <img src="images/thumbnails/apple.jpg" alt="Apple">
    </a>
    <a href="images/orange.jpg" title="Orange" data-gallery>
        <img src="images/thumbnails/orange.jpg" alt="Orange">
    </a>
</div>
```

The onclick handler from the [lightbox setup](#lightbox-setup) guide is not
required and can be removed.

#### HTML5 data-attributes
Options for the Gallery lightbox opened via the jQuery plugin can be defined as
[HTML5 data-attributes](https://api.jquery.com/data/#data-html5) on the Gallery
widget container.

The jQuery plugin also introduces the additional **filter** option, which is
applied to the Gallery links via
[jQuery's filter method](https://api.jquery.com/filter/) and allows to remove
duplicates from the list:

```html
<div id="blueimp-gallery" class="blueimp-gallery" data-start-slideshow="true" data-filter=":even">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

This will initialize the Gallery with the option **startSlideshow** set to
**true**.  
It will also filter the Gallery links so that only links with an even index
number will be included.

#### Container ids and link grouping
If the **data-gallery** attribute value is a valid id string
(e.g. "#blueimp-gallery"), it is used as container option.  
Setting **data-gallery** to a non-empty string also allows to group links into
different sets of Gallery images:

```html
<div id="fruits">
    <a href="images/banana.jpg" title="Banana" data-gallery="#blueimp-gallery-fruits">
        <img src="images/thumbnails/banana.jpg" alt="Banana">
    </a>
    <a href="images/apple.jpg" title="Apple" data-gallery="#blueimp-gallery-fruits">
        <img src="images/thumbnails/apple.jpg" alt="Apple">
    </a>
</div>
<div id="vegetables">
    <a href="images/tomato.jpg" title="Tomato" data-gallery="#blueimp-gallery-vegetables">
        <img src="images/thumbnails/tomato.jpg" alt="Tomato">
    </a>
    <a href="images/onion.jpg" title="Onion" data-gallery="#blueimp-gallery-vegetables">
        <img src="images/thumbnails/onion.jpg" alt="Onion">
    </a>
</div>
```

This will open the links with the **data-gallery** attribute
**#blueimp-gallery-fruits** in the Gallery widget with the id
**blueimp-gallery-fruits**, and the links with the **data-gallery** attribute
**#blueimp-gallery-vegetables**  in the Gallery widget with the id
**blueimp-gallery-vegetables**.

#### Gallery object
The gallery object is stored via
[jQuery data storage](https://api.jquery.com/category/miscellaneous/data-storage/)
on the Gallery widget when the Gallery is opened and can be retrieved the
following way:

```js
var gallery = $('#blueimp-gallery').data('gallery');
```

This gallery object provides all methods outlined in the API methods section.

#### jQuery events
The jQuery plugin triggers Gallery events on the widget container, with event
names equivalent to the gallery [event callbacks](#event-callbacks):

```js
$('#blueimp-gallery')
    .on('open', function (event) {
        // Gallery open event handler
    })
    .on('opened', function (event) {
        // Gallery opened event handler
    })
    .on('slide', function (event, index, slide) {
        // Gallery slide event handler
    })
    .on('slideend', function (event, index, slide) {
        // Gallery slideend event handler
    })
    .on('slidecomplete', function (event, index, slide) {
        // Gallery slidecomplete event handler
    })
    .on('close', function (event) {
        // Gallery close event handler
    })
    .on('closed', function (event) {
        // Gallery closed event handler
    });
```

## Requirements
blueimp Gallery doesn't require any other libraries and can be used standalone
without any dependencies.

You can also use the individual source files instead of the standalone minified
version:

```html
<link rel="stylesheet" href="css/blueimp-gallery.css">
<link rel="stylesheet" href="css/blueimp-gallery-indicator.css">
<link rel="stylesheet" href="css/blueimp-gallery-video.css">
<!-- ... -->
<script src="js/blueimp-helper.js"></script>
<script src="js/blueimp-gallery.js"></script>
<script src="js/blueimp-gallery-fullscreen.js"></script>
<script src="js/blueimp-gallery-indicator.js"></script>
<script src="js/blueimp-gallery-video.js"></script>
<script src="js/blueimp-gallery-youtube.js"></script>
<script src="js/blueimp-gallery-vimeo.js"></script>
```

The helper script can be replaced by [jQuery](https://jquery.com/) v. 1.7+.  
The fullscreen, indicator, video, youtube and vimeo source files are optional if
their functionality is not required.

The [jQuery plugin](#jquery-plugin) requires
[jQuery](https://jquery.com/) v. 1.7+ and the basic Gallery script, while the
fullscreen, indicator, video, youtube and vimeo source files are also optional:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/blueimp-gallery.js"></script>
<script src="js/blueimp-gallery-fullscreen.js"></script>
<script src="js/blueimp-gallery-indicator.js"></script>
<script src="js/blueimp-gallery-video.js"></script>
<script src="js/blueimp-gallery-youtube.js"></script>
<script src="js/blueimp-gallery-vimeo.js"></script>
<script src="js/jquery.blueimp-gallery.js"></script>
```

Please note that the jQuery plugin is an optional extension and not required for
the Gallery functionality.

## Browsers
blueimp Gallery has been tested with and supports the following browsers:

### Desktop browsers

* Google Chrome 14.0+
* Apple Safari 4.0+
* Mozilla Firefox 4.0+
* Opera 10.0+
* Microsoft Internet Explorer 7.0+

### Mobile browsers

* Apple Safari on iOS 6.0+
* Google Chrome on iOS 6.0+
* Google Chrome on Android 4.0+
* Default Browser on Android 2.3+
* Opera Mobile 12.0+

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Credits
The swipe implementation is based on code from the
[Swipe](http://swipejs.com/) library.
