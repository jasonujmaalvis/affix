# Affix

## Brief
Another Affix plugin but this one has a bit of a twist. The affix panel scrolls with the page rather than having an internal scroll if it is too large for the window.

A demo is included please check it out for a fully working example! Any questions or issues please let me know.

### How To Use

Use the following methods in your JavaScript file typically on a document.ready.

If a single number is provided, the offset will be applied in both top and bottom directions:

```javascript
$(".js-my-affix").affix({
    offset: 10
});
```

To provide a unique bottom and top offset provide an object:

```javascript
$(".js-my-affix").affix({
    offset: {
        top: 10,
        bottom: 20
    }
});
```

Use a function when you need to dynamically calculate an offset:

```javascript
$(".js-my-affix").affix({
    offset: {
        top: 10,
        bottom: function() {
            return (this.bottom = $("footer").outerHeight(true));
        }
    }
});
```

### Recalculate

Recalculate the state of the affix based on the dimensions, position, and scroll position of the relevant elements. This method needs to be called whenever the dimensions of the affixed content or the target element are changed, to ensure correct positioning of the affixed content.

```javascript
$(".js-my-affix").affix("checkPosition");
```

Recalculate the offset positions, this needs to be set whenever the offset changes e.g on resize or when the offset element changes dimensions.

```javascript
$(".js-my-affix").data("affix").options.offset.top = 100;
$(".js-my-affix").data("affix").options.offset.bottom = 200;
```
