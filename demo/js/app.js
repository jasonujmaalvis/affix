/**
*
* @filename     app.js
* @author       Jason Alvis
*
*/
jQuery(document).ready(function() {

    $(".column.left").affix({
        offset: {
            top:    $("header").outerHeight(true),
            bottom: $("footer").outerHeight(true)
        }
    });

});