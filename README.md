<h1>Affix</h1>

Author: Jason Alvis<br />
Author Email: hello@jasonalvis.co.uk<br />
Version: 1.0.0<br />
License: Free General Public License (GPL)<br />

<h2>Brief</h2>
Another Affix plugin but this one has a bit of a twist. The affix panel scrolls with the page rather than having an internal scroll if it is too large for the window.

A demo is included please check it out for a fully working example! Any questions or issues please let me know.

<h3>jQuery</h3>

Add the following code to your JavaScript file typically on a document.ready:

```javascript
jQuery(document).ready(function() {

    $(".column.left").affix({
        offset: {
            top:    $("header").outerHeight(true),
            bottom: $("footer").outerHeight(true)
        }
    });

});
```