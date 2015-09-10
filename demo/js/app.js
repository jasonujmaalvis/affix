/**!
 * Affix
 * @version 2.0.0
 * @author Jason Alvis
 * @website http://jasonalvis.co.uk
 * @license The MIT License (MIT)
 * @url https://github.com/jasonalvis/affix
 */
jQuery(document).ready(function() {

  $(".column.left").affix({
    offset: {
      top: $("header").outerHeight(true),
      bottom: $("footer").outerHeight(true)
    }
  });

});