/* Setting no conflict version*/
var jq = jQuery.noConflict();

jq(document).ready(function() { 
 
    //select all the a tag with name equal to modal
    jq('a[name=modal]').click(function(e) {
        //Cancel the link behavior
        e.preventDefault();
        //Get the A tag
        var id = jq(this).attr('href');
     
        //Get the screen height and width
        var maskHeight = 300;
        var maskWidth = 300;
     
        //Set height and width to mask to fill up the whole screen
        jq('#mask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect    
        jq('#mask').fadeIn(1000);   
        jq('#mask').fadeTo("slow",0.8); 
     
        //Get the window height and width
        var winH = jq(window).height();
        var winW = jq(window).width();
               
        //Set the popup window to center
        jq(id).css('top',  winH/2-jq(id).height()/2);
        jq(id).css('left', winW/2-jq(id).width()/2);
     
        //transition effect
        jq(id).fadeIn(2000);
     
    });
     
    //if close button is clicked
    jq('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        jq('#mask, .window').hide();
    });    
     
    //if mask is clicked
    jq('#mask').click(function () {
        jq(this).hide();
        jq('.window').hide();
    });        
     
});
    //select all the a tag with name equal to modal
    jq('a[name=modal]').click(function(e) {
        //Cancel the link behavior
        e.preventDefault();
        //Get the A tag
        var id = jq(this).attr('href');
     
        //Get the screen height and width
        var maskHeight = 300;
        var maskWidth = 300;
     
        //Set height and width to mask to fill up the whole screen
        jq('#mask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect    
        jq('#mask').fadeIn(1000);   
        jq('#mask').fadeTo("slow",0.8); 
     
        //Get the window height and width
        var winH = jq(window).height();
        var winW = jq(window).width();
               
        //Set the popup window to center
        jq(id).css('top',  winH/2-jq(id).height()/2);
        jq(id).css('left', winW/2-jq(id).width()/2);
     
        //transition effect
        jq(id).fadeIn(2000);
     
    });
     
    //if close button is clicked
    jq('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        jq('#mask, .window').hide();
    });    
     
    //if mask is clicked
    jq('#mask').click(function () {
        jq(this).hide();
        jq('.window').hide();
    });        
     
});