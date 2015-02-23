/**
*
* @filename     page-scrolling-sidebar.js
* @author       Jason Alvis
* @pages        All pages
*
*/
var FisheyeScrollSidebar = (function ($) {
    "use strict";

    // private alias to settings
    var s;

    return {
        settings: {
            header:         $("header"),
            footer:         $("footer"),
            sidebar:        $(".column.left"),

            spacing:        20,
            lastScrollTop:  0,
            lockedTo:       "none"
        },

        init: function() {
            s = this.settings;

            this.bindWindowActions();
        },

        detectDirection: function(){
            var st = window.pageYOffset,
                direction;

            if (st > s.lastScrollTop) {
                direction = "down";
            } else {
                direction = "up";
            }

            s.lastScrollTop = st;

            return direction;
        },

        fixSidebar: function(){
            // if sidebar doesn't exist return
            if(!s.sidebar.length){
                return;
            }

            var direction       = FisheyeScrollSidebar.detectDirection(),
                scrollPosition  = $(window).scrollTop(),

                headerHeight    = s.header.outerHeight(true),

                sidebarHeight   = s.sidebar.outerHeight(true),
                sidebarPosition = s.sidebar.position(),
                sidebarOffset   = s.sidebar.offset();


            if(scrollPosition > headerHeight){
                // bottom of sidebar reached
                if(direction === "down" && s.lockedTo === "none" && ($(window).height() + scrollPosition) > (sidebarOffset.top + sidebarHeight + s.spacing) ){
                    s.sidebar.css({
                        position: "fixed",
                        top: "auto",
                        bottom: s.spacing + "px"
                    });

                    s.lockedTo = "bottom";
                }

                // footer reached, end of the line
                if( (scrollPosition + sidebarHeight) > () ){

                }


            }
        },

        bindWindowActions: function(){
            $(window).bind("scroll", FisheyeScrollSidebar.fixSidebar);
        }
    };
})(jQuery);


jQuery(document).ready(function() {

    FisheyeScrollSidebar.init();

});