/**
*
* File Name     app.js
* Author        Jason Alvis
* Author Site:  http://www.jasonalvis.co.uk
* License:      Free General Public License (GPL)
* Version:      1.0.0
* Date:         03.09.2015
*
*/
jQuery(document).ready(function() {

    $(".column.left").affix({
        offset: {
            top: function() {
                return (this.top = $("header").outerHeight(true));
            },
            bottom: function() {
                return (this.bottom = $("footer").outerHeight(true));
            }
        }
    });

});