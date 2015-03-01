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
        // note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.affix.defaults, options);

        var api = {
            settings: {
                position: 0
            },

            detectDirection: function(){
                var start = $(window).scrollTop(),
                    direction;

                if (start > this.settings.position) {
                    direction = "down";
                } else {
                    direction = "up";
                }

                this.settings.position = start;

                return direction;
            },

            checkPosition: function(element){
                var height       = element.height(),
                    offset       = opts.offset,
                    offsetTop    = offset.top,
                    offsetBottom = offset.bottom;

                return offsetTop;
            },

            getState: function(){
                return "getState called";
            }
        };

        return this.each(function() {
            var _this = $(this);

            console.log(opts.offset);
            console.log(api.checkPosition(_this));
            console.log(api.getState());

            $(window).on("scroll", function(){
                console.log(api.detectDirection());
            });
        });
    };

    // plugin defaults (can be overriden by $.fn.affix.defaults.propertyName = "something")
    $.fn.affix.defaults = {
        offset: 0
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