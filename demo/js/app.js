/**
 * Affix
 * @version 2.0.0
 * @author Jason Alvis
 * @website http://jasonalvis.co.uk
 * @license The MIT License (MIT)
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