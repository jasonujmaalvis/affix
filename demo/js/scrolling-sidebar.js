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

        },

        init: function() {
            s = this.settings;

            this.bindWindowActions();
        },

        fixSidebar: function(){
            console.log("called");
        },

        bindWindowActions: function(){
            $(window).bind("scroll", FisheyeScrollSidebar.fixSidebar);
        }
    };
})(jQuery);


jQuery(document).ready(function() {

    FisheyeScrollSidebar.init();

});