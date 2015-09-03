/**
*
* File Name     affix.js
* Author        Jason Alvis
* Author Site:  http://www.jasonalvis.co.uk
* License:      Free General Public License (GPL)
* Version:      1.0.0
* Date:         03.09.2015
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
                lockedTo:   "none",
                endReached: false
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
                    elHeight     = el.outerHeight(true),
                    elOffset     = el.offset(),

                    direction    = this.detectDirection(),
                    scrollTop    = $(window).scrollTop(),

                    windowHeight = $(window).height(),
                    windowDiff   = windowHeight - elHeight;

                windowDiff = windowDiff < 0 ? opts.spacing : windowDiff;

                // top of the context reached
                if(scrollTop <= offsetTop){
                    return "default";
                }

                // bottom of the context reached
                if (scrollTop + windowHeight >= scrollHeight - offsetBottom + windowDiff){
                    //if(direction === "down" && this.settings.endReached === false ){
                        return "bottom-absolute";
                    //}
                }

                // if the sidebar is tall enough
                if(windowHeight - opts.spacing < elHeight){
                    // bottom of sidebar reached
                    if(direction === "down" && /*this.settings.endReached === false &&*/ this.settings.lockedTo === "none" && windowHeight + scrollTop > elOffset.top + elHeight + opts.spacing){
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
                } else {
                    if(this.settings.lockedTo === "none"){
                        return "top-fixed";
                    }
                }

                return false;
            },

            setPosition: function(element, position){
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

                    //this.settings.endReached = true;
                    this.settings.lockedTo = "none";
                } else if(position === "top-fixed"){
                    element.css({
                        position:   "fixed",
                        top:        "0px",
                        bottom:     "auto"
                    });

                    //this.settings.endReached = false;
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

                // return if element is hidden
                if (!element.is(":visible")){
                    return;
                }

                // if offset is not an object a single number has been provided
                // set the offset to be applied to both top and bottom.
                if (typeof offset != "object") {
                    offsetBottom = offsetTop = offset;
                }

                // function provided
                if (typeof offsetTop == "function") {
                    offsetTop = offset.top(element);
                }

                // function provided
                if (typeof offsetBottom == "function") {
                    offsetBottom = offset.bottom(element);
                }

                // console.log("checkPosition called");
                // console.log(opts.offset);

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

            api.checkPosition(_this);
        });
    };

    // plugin defaults (can be overriden by $.fn.affix.defaults.propertyName = "something")
    $.fn.affix.defaults = {
        offset:     0,
        spacing:    20
    };

})(jQuery);