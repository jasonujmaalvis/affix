<h1>Affix</h1>

Author: Jason Alvis<br />
Author Email: hello@jasonalvis.co.uk<br />
Version: 1.0.0<br />
License: Free General Public License (GPL)<br />

<h2>Brief</h2>
Another Affix plugin but this one has a bit of a twist. The affix panel scrolls with the page rather than having an internal scroll if it is too large for the window.

A demo is included please check it out for a fully working example! Any questions or issues please let me know.

<h3>jQuery</h3>

Use the following methods to your JavaScript file typically on a document.ready.

If a single number is provided, the offset will be applied in both top and bottom directions:

```javascript
    $(".column.left").affix({
        offset: 15
    });
```

To provide a unique bottom and top offset provide an object:

```javascript
    $(".column.left").affix({
        offset: {
            top: 100,
            bottom: 200
        }
    });
```

Use a function when you need to dynamically calculate an offset:

```javascript
    $(".column.left").affix({
        offset: {
            top: 100,
            bottom: function() {
                return (this.bottom = $("footer").outerHeight(true));
            }
        }
    });
```

TODO: Provide a method to recalculate the offset when dimensions of the affixed content or the target element is changed to ensure correct positioning.