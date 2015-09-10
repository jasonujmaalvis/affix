/**
 * Affix
 * @version 2.0.0
 * @author Jason Alvis
 * @website http://jasonalvis.co.uk
 * @license The MIT License (MIT)
 */
jQuery(document).ready(function() {

    $(".column.left").affix({
        offset: {
            top: $("header").outerHeight(true),
            bottom: $("footer").outerHeight(true)
        }
    });

    $("header").on("click", function(){
        $(this).css({ padding: "10px" });

        //$(".column.left").data();

        $(".column.left").data("affix").options.offset.top = $("header").outerHeight(true);

        console.log( $(".column.left").data("affix").options.offset.top );

        //$(".column.left").affix("checkPosition");
    });

});