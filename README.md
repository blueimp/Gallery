# blueimp Gallery

## Demo
[blueimp Gallery Demo](http://blueimp.github.io/Gallery/)

## Description
blueimp Gallery is a touch-enabled, responsive and customizable image and video gallery, carousel and lightbox, optimized for both mobile and desktop web browsers.  
It features swipe, mouse and keyboard navigation, transition effects, slideshow functionality, fullscreen support and on-demand content loading and can be extended to display additional content types.

## Setup
Copy the **css**, **img** and **js** directories to your website.

Add the following stylesheet resource to the head section of your webpage:

```html
<link rel="stylesheet" href="css/blueimp-gallery.min.css">
```

Add the following HTML snippet with the Gallery widget to the body of your webpage:

```html
<!-- The Gallery as lightbox dialog, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <ol class="indicator"></ol>
</div>
```

If you want to display the Gallery as inline carousel, add the CSS class **blueimp-gallery-carousel** to the Gallery container and remove the child element with the **close** class.  
To initialize the Gallery with visible controls, add the CSS class **blueimp-gallery-controls** to the Gallery container.

Add the following script resource to the bottom of the body of your webpage:

```html
<script src="js/blueimp-gallery.min.js"></script>
```

Create a list of links to image files, optionally with enclosed thumbnails, somewhere on your webpage:

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

## Initialization
Initialize the Gallery the following way:

```js
var links = document.getElementById('links').getElementsByTagName('a'),
    options = {
        // Start an automatic slideshow with a delay of 5 seconds between slides:
        interval: 5000,
        // Set to true to initialize the Gallery with carousel specific options:
        carousel: false
    },
    gallery = blueimp.Gallery(links, options);
```

The object returned by executing the Gallery function (the **gallery** variable in the example code above) is a new instance of the Gallery and allows to access the public API methods provided by the Gallery.  
The Gallery initialization function returns **false** if the given list was empty, the Gallery widget is missing, or the browser doesn't pass the functionality test.

## Options
The following are the default options set by the Gallery:

```js
var options = {
    // The Id, element or querySelector of the gallery widget:
    container: '#blueimp-gallery',
    // The tag name, Id, element or querySelector of the slides container:
    slidesContainer: 'div',
    // The tag name, Id, element or querySelector of the title element:
    titleElement: 'h3',
    // The tag name, Id, element or querySelector of the indicator container:
    indicatorContainer: 'ol',
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
    // The class for all slides:
    slideClass: 'slide',
    // The slide class for loading elements:
    slideLoadingClass: 'slide-loading',
    // The slide class for elements that failed to load:
    slideErrorClass: 'slide-error',
    // The class for the content element loaded into each slide:
    slideContentClass: 'slide-content',
    // The class for video content elements:
    videoContentClass: 'video-content',
    // The class for video when it is loading:
    videoLoadingClass: 'video-loading',
    // The class for video when it is playing:
    videoPlayingClass: 'video-playing',
    // The class for the "toggle" control:
    toggleClass: 'toggle',
    // The class for the "prev" control:
    prevClass: 'prev',
    // The class for the "next" control:
    nextClass: 'next',
    // The class for the "close" control:
    closeClass: 'close',
    // The class for the active indicator:
    activeClass: 'active',
    // The list object property (or data attribute) with the object type:
    typeProperty: 'type',
    // The list object property (or data attribute) with the object title:
    titleProperty: 'title',
    // The list object property (or data attribute) with the object URL:
    urlProperty: 'href',
    // The list object property (or data attribute) with the thumbnail URL,
    // used as alternative to a thumbnail child element:
    thumbnailProperty: 'thumbnail',
    // The list object property (or data attribute) for the video poster URL:
    videoPosterProperty: 'poster',
    // The list object property (or data attribute) for the video sources array:
    videoSourcesProperty: 'sources',
    // Defines if the gallery indicators should display a thumbnail:
    thumbnailIndicators: true,
    // Defines if the gallery slides are cleared from the gallery modal,
    // or reused for the next gallery initialization:
    clearSlides: true,
    // Defines if the gallery should open in fullscreen mode:
    fullScreen: false,
    // Toggle the controls on pressing the Return key:
    toggleControlsOnReturn: true,
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
    // Hide the page scrollbars: 
    hidePageScrollbars: true,
    // Stops any touches on the container from scrolling the page:
    disableScroll: true,
    // Carousel mode (shortcut for carousel specific options):
    carousel: false,
    // Allow continuous navigation, moving from last to first
    // and from first to last slide:
    continuous: true,
    // The number of elements to load around the current index:
    preloadRange: 2,
    // The starting index as integer.
    // Can also be an object of the given list,
    // or an equal object with the same url property:
    index: 0,
    // Delay in milliseconds between slides for an automatic slideshow,
    // is disabled if set to a falsy value (e.g. 0, false, null):
    interval: 0,
    // The transition speed between slide changes in milliseconds:
    speed: 400,
    // Callback function executed on slide change.
    // Is called with the list object as "this" object and the
    // current index and slide as arguments:
    onslide: undefined,
    // Callback function executed after the slide change transition.
    // Is called with the list object as "this" object and the
    // current index and slide as arguments:
    onslideend: undefined,
    // Callback function executed on slide content load.
    // Is called with the list object as "this" object and the
    // slide index and slide element as arguments:
    onslidecomplete: undefined
};
```

If the **carousel** option is **true**, the following options are set to different default values:

```js
var carouselOptions = {
    hidePageScrollbars: false,
    toggleControlsOnReturn: false,
    enableKeyboardNavigation: false,
    closeOnEscape: false,
    closeOnSlideClick: false,
    closeOnSwipeUpOrDown: false,
    disableScroll: false,
    interval: 5000 // 5 seconds
};
```

The options object passed to the Gallery function extends the default options and also those options set via **carousel** mode.

## API
The blueimp Gallery can be initialized by simply calling it as a function with an array of links as first argument and an optional options object as second argument:

```js
var gallery = blueimp.Gallery(links, options);
```

The links array can be a list of URL strings or a list of objects with URL properties.  
The URL property name defined by each list object can be configured via the **urlProperty** option. By default, it is set to **href**, which allows to pass a list of HTML link elements as first argument.

The Gallery object provides the following public API methods::

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

// Start an automatic slideshow with the given delay:
gallery.play(delay);

// Stop the automatic slideshow:
gallery.pause();

// Add additional slides after Gallery initialization:
gallery.add(list);

// Close and deinitialize the Gallery:
gallery.close();
```

### Videos
The Gallery can be initialized with a list of videos instead of images, or a combination of both:

```js
blueimp.Gallery([
    {
        title: 'Fruits',
        href: 'http://example.org/videos/fruits.mp4',
        type: 'video/mp4',
        poster: 'http://example.org/images/fruits.jpg'
    },
    {
        title: 'Banana',
        href: 'http://example.org/images/banana.jpg',
        type: 'image/jpeg',
        thumbnail: 'http://example.org/thumbnails/banana.jpg'
    }
]);
```

The Gallery uses the **type** property to determine the content type of the object to display.  
If the type property is empty or doesn't exist, the default type **image** is assumed.

For images, the **thumbnail** property defines the URL of the image thumbnail, which is used for the indicator navigation displayed at the bottom of the Gallery, if the controls are visible.

For videos, the **poster** property defines the URL of the poster image to display, before the video is started.

#### Multiple video sources
To provide multiple video formats, the **sources** property of a list object can be set to an array of objects with **href** and **type** properties for each video source. The first video format in the list that the browser can play will be displayed:

```js
blueimp.Gallery([
    {
        title: 'Fruits',
        type: 'video/*',
        poster: 'http://example.org/images/fruits.jpg',
        sources: [
            {
                href: 'http://example.org/videos/fruits.mp4',
                type: 'video/mp4'
            },
            {
                href: 'http://example.org/videos/fruits.ogg',
                type: 'video/ogg'
            }
        ]
    }
]);
```

### Additional content types
By extending the Gallery prototype with new factory methods, additional content types can be displayed.  By default, blueimp Gallery provides the **imageFactory** and **videoFactory** methods for **image** and **video** content types respectively.  

The Gallery uses the **type** property of each content object to determine which factory method to use.  The **type** defines the [Internet media type](http://en.wikipedia.org/wiki/Internet_media_type) of the content object and is composed of two or more parts: A type, a subtype, and zero or more optional parameters, e.g. **text/html; charset=UTF-8** for an HTML document with UTF-8 encoding.  
The main type (the string in front of the slash, **text** in the example above) is concatenated with the string **Factory** to create the factory method name, e.g. **textFactory**.

#### Example HTML text factory implementation
Although blueimp Gallery doesn't require [jQuery](http://jquery.com/), the following example uses it for convenience.

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

Add the **text-content** class to the Gallery CSS:

```css
.blueimp-gallery > .slides > .slide > .text-content {
    overflow: auto;
    margin: 60px auto;
    padding: 0 60px;
    max-width: 920px;
    text-align: left;
}
```

With the previous changes in place, the Gallery can now handle HTML content types:

```js
blueimp.Gallery([
    {
        title: 'Noodle soup',
        href: 'http://example.org/text/noodle-soup.html',
        type: 'text/html'
    },
    {
        title: 'Tomato salad',
        href: 'http://example.org/text/tomato-salad.html',
        type: 'text/html'
    }
]);
```

## Requirements
blueimp Gallery doesn't require any other libraries and can be used standalone without any dependencies.

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
blueimp Gallery is based on [Swipe](http://swipejs.com/).
