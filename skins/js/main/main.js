/* Setting no conflict version*/
var jq = jQuery.noConflict();
var empty_row = '<tr style="border: solid black 1px;">'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>'
                 + '</tr>';
var empty_cell =  '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img src="skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>';
/* when file is loaded*/
jq(document).ready(function(){
    jq('#up_arrow').click(function(){
        jq('#table > tbody:first').prepend(empty_row);
    });

    jq('#right_arrow').click(function(){
        jq("#table tr").append(empty_cell);    
    });
    jq('#down_arrow').click(function(){
        jq('#table > tbody:last').append(empty_row);
    });
    jq('#left_arrow').click(function(){
        jq("#table tr").prepend(empty_cell);    
    });
    
    jq('.seat').click(function(){
        jq(this).attr('src', 'skins/images/green_chair.jpg');
    });
   
    
    jq('#control_panel>.action').click(function(){
        alert('Action pressed!');
    });

});
           
