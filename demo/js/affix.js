/**
*
* @filename     affix.js
* @author       Jason Alvis
* @plugin       Affix
*
*/
(function($){
    "use strict";

    // plugin definition
    $.fn.affix = function(options) {
        // extend our default options with those provided.
        // Note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.affix.defaults, options);

        opts.API = $.extend({}, $.fn.affix.API);

        return this.each(function() {
            var _this = $(this);

            console.log(opts.background);
            console.log(opts.API.detectDirection());
        });
    };

    // plugin defaults (can be overriden by $.fn.affix.defaults.propertyName = "something")
    $.fn.affix.defaults = {
        destruct:   false,
        speed:      500,
        background: "black"
    };

    // plugin api (where our methods go)
    $.fn.affix.API = {
        detectDirection: function(){
            return "detectDirection called";
        }
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