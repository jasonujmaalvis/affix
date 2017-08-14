/*!
 * Affix jQuery Plugin
 * @version 2.0.0
 * @author  Jason Alvis
 * @url     https://github.com/jasonalvis/affix
 */
jQuery(document).ready(function() {

  $(".column.left").affix({
    offset: {
      top: $("header").outerHeight(true),
      bottom: $("footer").outerHeight(true)
    }
  });

});
