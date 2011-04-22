/* Setting no conflict version*/
var jq = jQuery.noConflict();

//to determine which button is pressed
var action = 'none';

// content of the empty row
var empty_row = '<tr style="border: solid black 1px;">'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54"  /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54"  /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54" /></td>'
                 + '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54" /></td>'
                 + '</tr>';
//content of the empty cell 
var empty_cell =  '<td style="border: solid black 1px;" width="65" height="65" >'
                     + '<img class="seat" src="skins/images/empty_chair.jpg" width="61" height="54"  /></td>';
                     

/* when file is loaded*/
jq(document).ready(function(){
    //adding fow before the first one
    jq('#up_arrow').click(function(){
        jq('#table > tbody:first').prepend(empty_row);
    });
    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        jq("#table tr").append(empty_cell);    
    });
    //adding row after the last one
    jq('#down_arrow').click(function(){
        jq('#table > tbody:last').append(empty_row);
    });
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        jq("#table tr").prepend(empty_cell);    
    });
    
    //based on the action of choise eather draw another chair, or draw empty cell
    jq('.seat').click(function(){
        jq(this).attr('src', function(){
            if(action == 'add')
                return 'skins/images/green_chair.jpg';
            else if(action == 'remove')
                return 'skins/images/empty_chair.jpg';
        });
    });
   // (action=='add')?('skins/images/green_chair.jpg'):('skins/images/empty_chair.jpg')
   
   //if the add icon is pressed then action (general var) is set to add) 
    jq('#control_panel .add').click(function(){
        action = 'add';
        jq('#add_image').attr('src', 'skins/images/002_01.png');
        jq('#remove_image').attr('src', 'skins/images/001_02.png');
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    jq('#control_panel .remove').click(function(){
        action = 'remove';
        jq('#add_image').attr('src', 'skins/images/001_01.png');
        jq('#remove_image').attr('src','skins/images/002_02.png' );
    });

});
           
