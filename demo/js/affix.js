/**
*
* @filename     affix.js
* @author       Jason Alvis
* @plugin       Affix
*
*/
(function($){
    "use strict";

    $.fn.affix = function(options) {
        // passing destruct: true allows
        var settings = $.extend({
            destruct: false
        }, options);

        return this.each(function() {

            console.log("called");

        });
    };

})(jQuery);

// example from the RWD magento theme, left just for reference (will be removed eventually)
// jQuery.fn.toggleSingle = function (options) {

//     // passing destruct: true allows
//     var settings = $j.extend({
//         destruct: false
//     }, options);

//     return this.each(function () {
//         if (!settings.destruct) {
//             $j(this).on('click', function () {
//                 $j(this)
//                     .toggleClass('active')
//                     .next()
//                     .toggleClass('no-display');
//             });
//             // Hide the content
//             $j(this).next().addClass('no-display');
//         } else {
//             // Remove event handler so that the toggle link can no longer be used
//             $j(this).off('click');
//             // Remove all classes that were added by this plugin
//             $j(this)
//                 .removeClass('active')
//                 .next()
//                 .removeClass('no-display');
//         }

//     });
// }