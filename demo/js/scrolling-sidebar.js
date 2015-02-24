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
            main:           $(".row-main"),
            sidebar:        $(".column.left"),

            spacing:        20,
            lastScrollTop:  0,
            lockedTo:       "none",
            endReached:     false
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
                footerOffset    = s.footer.offset(),

                sidebarHeight   = s.sidebar.outerHeight(true),
                sidebarOffset   = s.sidebar.offset();

            // footer reached, end of the line (80 for footer margin-top)
            if( (sidebarOffset.top + sidebarHeight) >= footerOffset.top - 80){
                if(direction === "down" && s.endReached === false){
                    s.sidebar.css({
                        position: "absolute",
                        top: "auto",
                        bottom: "0px"
                    });

                    s.lockedTo   = "none";
                    s.endReached = true;
                }

                if(direction === "up" && sidebarOffset.top >= scrollPosition){
                    s.sidebar.css({
                        position: "fixed",
                        top: "0px",
                        bottom: "auto"
                    });

                    s.lockedTo   = "top";
                    s.endReached = false;
                }
            } else if(scrollPosition > headerHeight && s.endReached === false){
                // bottom of sidebar reached
                if(direction === "down" && s.lockedTo === "none" && ($(window).height() + scrollPosition) > (sidebarOffset.top + sidebarHeight + s.spacing) ){
                    s.sidebar.css({
                        position: "fixed",
                        top: "auto",
                        bottom: s.spacing + "px"
                    });

                    s.lockedTo = "bottom";
                // if sidebar is fixed to top and we scroll down absolute the sidebar so they don't move
                } else if(direction === "down" && s.lockedTo === "top"){
                    s.sidebar.css({
                        position: "absolute",
                        top: (sidebarOffset.top - s.main.offset().top) + "px",
                        bottom: "auto"
                    });

                    s.lockedTo = "none";
                // top of sidebar reached
                } else if(direction === "up" && s.lockedTo === "none" && sidebarOffset.top >= scrollPosition){
                    s.sidebar.css({
                        position: "fixed",
                        top: "0px",
                        bottom: "auto"
                    });

                    s.lockedTo = "top";
                // if sidebar is fixed to bottom and we scroll up absolute the sidebar so they don't move
                } else if(direction === "up" && s.lockedTo === "bottom") {
                    s.sidebar.css({
                        position: "absolute",
                        top: (sidebarOffset.top - s.main.offset().top) + "px",
                        bottom: "auto"
                    });

                    s.lockedTo = "none";
                }
            } else {
                // top of sidebar reached, start of the line
                if(s.sidebar.css("position") !== "relative"){
                    s.sidebar.css({
                        position: "relative",
                        top: "auto",
                        bottom: "auto"
                    });

                    s.lockedTo = "none";
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