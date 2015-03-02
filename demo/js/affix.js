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
                position:   0,
                lockedTo:   null
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

            getState: function(element, scrollHeight, offsetTop, offsetBottom){
                var el           = $(element),
                    direction    = this.detectDirection(),
                    scrollTop    = $(window).scrollTop(),
                    windowHeight = $(window).height(),

                    elHeight     = el.outerHeight(true),
                    elOffset     = el.offset();

                // top of the context reached
                if(scrollTop <= offsetTop){
                    return "default";
                }

                // bottom of the context reached
                if (scrollTop + windowHeight >= scrollHeight - offsetBottom + opts.spacing){
                    return "bottom-absolute";
                }





                // bottom of sidebar reached
                if(direction === "down" && this.settings.lockedTo === "none" && windowHeight + scrollTop > elOffset.top + elHeight + opts.spacing){
                    return "bottom-fixed";
                // if sidebar is fixed to top and we scroll down absolute the sidebar so they don't move
                } else if(direction === "down" && this.settings.lockedTo === "top"){
                    return "absolute";
                // top of sidebar reached
                } else if(direction === "up" && this.settings.lockedTo === "none" && elOffset.top >= scrollTop){
                    return "top-fixed";
                // if sidebar is fixed to bottom and we scroll up absolute the sidebar so they don't move
                } else if(direction === "up" && this.settings.lockedTo === "bottom"){
                    return "absolute";
                }

                return false;
            },

            setPosition: function(element, position){
                console.log(position);

                if(position === "bottom-fixed"){
                    element.css({
                        position:   "fixed",
                        top:        "auto",
                        bottom:     opts.spacing + "px"
                    });

                    this.settings.lockedTo = "bottom";
                } else if(position === "bottom-absolute"){
                    element.css({
                        position:   "absolute",
                        top:        "auto",
                        bottom:     "0px"
                    });

                    this.settings.lockedTo = "none";
                } else if(position === "top-fixed"){
                    element.css({
                        position:   "fixed",
                        top:        "0px",
                        bottom:     "auto"
                    });

                    this.settings.lockedTo = "top";
                } else if(position === "default"){
                    element.css({
                        position:   "relative",
                        top:        "auto",
                        bottom:     "auto"
                    });

                    this.settings.lockedTo = "none";
                } else if(position === "absolute"){
                    element.css({
                        position:   "absolute",
                        top:        (element.offset().top - element.parent().offset().top) + "px",
                        bottom:     "auto"
                    });

                    this.settings.lockedTo = "none";
                }
            },

            checkPosition: function(element){
                var offset       = opts.offset,
                    offsetTop    = offset.top,
                    offsetBottom = offset.bottom,
                    scrollHeight = $("body").height(),
                    position;

                position = this.getState(element, scrollHeight, offsetTop, offsetBottom);

                // only run if it doesn't return false
                if(position){
                    this.setPosition(element, position);
                }
            },
        };

        return this.each(function() {
            var _this = $(this);

            $(window).on("scroll", function(){
                api.checkPosition(_this);
            });
        });
    };

    // plugin defaults (can be overriden by $.fn.affix.defaults.propertyName = "something")
    $.fn.affix.defaults = {
        offset:     0,
        spacing:    20
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