# Scroll top widget

**Work in progress**

A simple javascript library that adds a "scroll to top" widget to your website. Written in Typescript with zero dependencies and only 1.5 KB when minified.

## How to use

add the source files to your project and include them in your website:

```html
<!-- add this at the end of the body -->
<script src="/src/js/scroll-top.js"></script>
<script>
    (function () {
        Betaweb.Util.ScrollTop();
    })();
</script>
```

## Available options

There are some options available to customize the widget:

- **elementId**: The id that will be used for the element  
default value: `scroll-up`
- **scrollOffset**: The amount of pixels we need to scroll before the widget is shown  
default value: `300`
- **scrollSpeed**: The speed (in milliseconds) it'll take to scroll all the way up  
default value: `300`
- **scrollText**: The text that will be placed in the element  
default value: `Scroll to top`
- **container**: The selector for the container where the element will be appended to  
default value: `body`

You can set the options in the constructor or you can directly assign them to the object:

```javascript
// init them in the constructor...
Betaweb.Util.ScrollTop({
    elementId: 'scroll-up',
    scrollOffset: 300,
    scrollSpeed: 300,
    scrollText: 'Scroll to top',
    container: 'body',
});

// ...or directly assign them to the object
var scrollToTop = new Betaweb.Util.ScrollTop();
scrollToTop.elementId = 'scroll-up';
scrollToTop.scrollOffset = 300;
scrollToTop.scrollSpeed = 300;
scrollToTop.scrollText = 'Scroll to top';
scrollToTop.container = 'body';

// Reload the widget after updating the settings
scrollToTop.reload();
```

