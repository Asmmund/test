/* Setting no conflict version*/
var jq = jQuery.noConflict();

//to determine which button is pressed
var action = 'none';

        

/* when file is loaded*/
jq(document).ready(function(){
    //adding fow before the first one
    jq('#up_arrow').click(function(){
        jq('#table > tbody>tr:first').clone(true).insertBefore('#table > tbody>tr:first');
        jq('#table > tbody>tr:first td img').attr('src','skins/images/empty_chair.jpg' );
        
    });

    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        jq("#table>tbody>tr:last>td:last-child").clone(true).insertAfter('#table >tbody>tr>td:last-child');
        jq('#table >tbody>tr>td:last-child img').attr('src','skins/images/empty_chair.jpg' );  
    });
    //adding row after the last one
    jq('#down_arrow').click(function(){
        jq('#table > tbody>tr:last').clone(true).insertAfter('#table > tbody>tr:last');
        jq('#table > tbody>tr:last td img').attr('src','skins/images/empty_chair.jpg' );
    });
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        jq("#table>tbody>tr:first>td:first-child").clone(true).insertBefore('#table >tbody>tr>td:first-child');
        jq('#table>tbody>tr>td:first-child img').attr('src','skins/images/empty_chair.jpg' );  
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
           
