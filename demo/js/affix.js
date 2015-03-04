/**
*
* @filename     affix.js
* @author       Jason Alvis
* @plugin       Affix
* @version      1.0.0
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
                    //if(direction === "down" && this.settings.endReached === false ){
                        return "bottom-absolute";
                    //}
                }

                if(windowHeight - opts.spacing < elHeight){
                    console.log("tall enough");
                } else {
                    console.log("not tall enough");
                }

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