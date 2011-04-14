/* Setting no conflict version*/
var jq = jQuery.noConflict();


/* switch the cashing on or of at will*/
jq.ajaxSetup ({
    cache: false  
});    

//picture while you're waiting for ajax call
var ajax_load = '<img src="skins/images/loading.gif" alt="loading..." />';
var image_selected = 'skins/images/green_chair.jpg';
var image_normal = 'skins/images/blue_chair.jpg';
var click1 = 'modules/main/click1.php';
var click2 = 'modules/main/click2.php';
var click_back = 'modules/main/router.php';



/* when file is loaded*/
jq(document).ready(function(){
    
    jq('.ajax_menu>.click1').click(function(){
        jq('#result').html(ajax_load).load(click1);
    });

    jq('.ajax_menu>.click2').click(function(){
        jq('#result').html(ajax_load).load(click2);
    });

    
    
    jq('.chair_seat').click(function(){
       jq(this).attr("src", jq(this).attr('src') == image_selected ? image_normal  : image_selected);
        return false;

    });

});
           
