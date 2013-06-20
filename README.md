# blueimp Gallery

## Demo
[blueimp Gallery Demo](http://blueimp.github.io/Gallery/)

## Description
blueimp Gallery is a mobile-optimized, touch-enabled, responsive and customizable image gallery, carousel and lightbox.  
It features swipe, mouse and keyboard navigation, transition effects, slideshow functionality and fullscreen support.

blueimp Gallery is based on [Swipe](https://github.com/bradbirdsall/Swipe).

## Setup
Copy the **css**, **img** and **js** directories to your website.

Add the following stylesheet resource to the head section of your webpage:

```html
<link rel="stylesheet" href="css/blueimp-gallery.min.css">
```

Add the following HTML snippet to the body of your webpage:

```html
<!-- The Gallery as lightbox dialog, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="blueimp-gallery-wrap"></div>
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
        // Start the slideshow with a delay of 5 seconds between slides:
        auto: 5000,
        // Set to true to initialize the Gallery with carousel specific options:
        carousel: false
    },
    gallery = blueimp.Gallery(links, options);
```

The object returned by executing the Gallery function (the **gallery** variable in the example code above) is a new instance of the Gallery and allows to access the public methods provided by the Gallery and [Swipe](https://github.com/bradbirdsall/Swipe). If the Gallery initialization returns **false**, the given list was empty, or the browser is not supported.

## Options
The following are the default options set by the Gallery:

```js
var options = {
    // Carousel mode (shortcut for the carouselOptions):
    carousel: false,
    // The number of elements to load around the current index:
    preloadRange: 2,
    // The document ID of the gallery widget:
    containerId: 'blueimp-gallery',
    // The class to add when the gallery is visible:
    displayClass: 'blueimp-gallery-display',
    // The class to add when the gallery controls are visible:
    controlsClass: 'blueimp-gallery-controls',
    // The class to add when the gallery only displays one element:
    singleClass: 'blueimp-gallery-single',
    // The slide class for loading elements:
    loadingClass: 'loading',
    // The slide class for elements that failed to load:
    errorClass: 'error',
    // The class for the "prev" control:
    prevClass: 'prev',
    // The class for the "next" control:
    nextClass: 'next',
    // The class for the "close" control:
    closeClass: 'close',
    // The class for the active indicator:
    activeClass: 'active',
    // The tag name of the title element:
    titleElement: 'h3',
    // The tag name of the indicator container:
    indicatorContainer: 'ol',
    // The gallery object property (or data attribute) with the
    // thumbnail URL, used as alternative to a thumbnail child element:
    thumbnailProperty: 'thumbnail',
    // Defines if the gallery indicators should display a thumbnail:
    thumbnailIndicators: true,
    // Defines if the gallery elements are cleared from the gallery modal,
    // or reused for the next gallery initialization:
    clearElements: false,
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
    // The threshold to define a touch move as swiping up or down:
    touchMoveThreshold: 50,
    // Hide the page scrollbars: 
    hidePageScrollbars: true,
    // Disable scrolling on the gallery container (Swipe option):
    disableScroll: true,
    // The starting index (Swipe option):
    startSlide: 0
};
```

If the **carousel** option is **true**, the following options are set by default:

```js
var carouselOptions = {
    hidePageScrollbars: false,
    toggleControlsOnReturn: false,
    enableKeyboardNavigation: false,
    closeOnEscape: false,
    closeOnSlideClick: false,
    closeOnSwipeUpOrDown: false,
    disableScroll: false,
    // Start the slideshow with the given
    // delay between slides (Swipe option):
    auto: 5000 // 5 seconds
};
```

The options object passed to the Gallery function extends the default options and is then passed to the [Swipe](https://github.com/bradbirdsall/Swipe) initialization.  
Therefore, the Gallery function accepts all of the [Swipe config options](https://github.com/bradbirdsall/Swipe#config-options) as well.

## API
The blueimp Gallery allows to call any method provided by the [Swipe API](https://github.com/bradbirdsall/Swipe#swipe-api) directly on the gallery object.

## Requirements
* [Swipe](https://github.com/bradbirdsall/Swipe) v. 2.0+ (included)

## Browsers
The blueimp Gallery has been tested with and supports the following browsers:

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

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
