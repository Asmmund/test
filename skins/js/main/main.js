/* Setting no conflict version*/
var jq = jQuery.noConflict();
/* when file is loaded*/
jq(document).ready(function(){
    jq('#up_arrow').click(function(){
        alert('Up arrow pressed!');
    });

    jq('#right_arrow').click(function(){
        alert('Right arrow pressed!');
    });
    jq('#down_arrow').click(function(){
        alert('Down arrow pressed!');
    });
    jq('#left_arrow').click(function(){
        alert('Left arrow pressed!');
    });
    
    jq('#seat1').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
    jq('#seat2').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
    jq('#seat3').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
    jq('#seat4').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
    jq('#seat5').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
    jq('#seat6').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });

});
           
