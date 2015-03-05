/**
*
* File Name     app.js
* Author        Jason Alvis
* Author Site:  http://www.jasonalvis.co.uk
* License:      Free General Public License (GPL)
* Version:      1.0.0
* Date:         05.03.2015
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