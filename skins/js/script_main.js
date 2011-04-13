/* Setting no conflict version*/
var jq = jQuery.noConflict();


/* switch the cashing on or of at will*/
jq.ajaxSetup ({
    cache: false  
});    

//picture while you're waiting for ajax call
var ajax_load = '<img src="skins/images/loading.gif" alt="loading..." />';
var click1 = 'modules/main/click1.php';
var click2 = 'modules/main/click2.php';




/* when file is loaded*/
jq(document).ready(function(){
    
    jq('.ajax_menu>.click1').click(function(){
        jq('#result').html(ajax_load).load(click1);
    });

    jq('.ajax_menu>.click2').click(function(){
        jq('#result').html(ajax_load).load(click2);
    });


});
           
