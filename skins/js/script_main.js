/* Setting no conflict version*/
var jq = jQuery.noConflict();


/* switch the cashing on or of at will*/
jq.ajaxSetup ({
    cache: false  
});    

//picture while you're waiting for ajax call
var ajax_load = '<img src="skins/images/loading.gif" alt="loading..." />';
var loadUrl = '<?php SITE_HOST;?>modules/main/router.php';


function to_main()
{
    jq('#main').html('aaa<hr />');
    
}

/* when file is loaded*/
jq(document).ready(function(){
    
    jq('#to_main').click(function(){
        jq('#main').html('aaa<hr />');
    });

});
           
