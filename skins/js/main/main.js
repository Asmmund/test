/* Setting no conflict version*/
var jq = jQuery.noConflict();

//default action
var action = 'add_seat';

// vars for img url's
var empty_image = 'skins/images/empty_chair.jpg';
var normal_image = 'skins/images/green_chair.jpg';

//ajax params
jq.ajaxSetup({
                url: 'skins/js/main/ajax.php',
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'JSON',
                cache: false,
                error: function(response) {
                        alert('Error! ');
                }
                
                

});        

/* when file is loaded*/
jq(document).ready(function(){
    //adding fow before the first one
    jq('#up_arrow').click(function(){
        jq('#table > tbody>tr:first').clone(true).insertBefore('#table > tbody>tr:first');
        jq('#table > tbody>tr:first td img').attr('src',empty_image );
        jq('#table > tbody>tr:first td img').attr('title', '');
        
    });

    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        jq("#table>tbody>tr:last>td:last-child").clone(true).insertAfter('#table >tbody>tr>td:last-child');
        jq('#table >tbody>tr>td:last-child img').attr('src',empty_image );  
        jq('#table >tbody>tr>td:last-child img').attr('title', '');

    });
    //adding row after the last one
    jq('#down_arrow').click(function(){
        jq('#table > tbody>tr:last').clone(true).insertAfter('#table > tbody>tr:last');
        jq('#table > tbody>tr:last td img').attr('src',empty_image );
        jq('#table > tbody>tr:last td img').attr('title', '');
    });
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        jq("#table>tbody>tr:first>td:first-child").clone(true).insertBefore('#table >tbody>tr>td:first-child');
        jq('#table>tbody>tr>td:first-child img').attr('src',empty_image );  
        jq('#table>tbody>tr>td:first-child img').attr('title', '');
    });
    
    //based on the action of choise eather draw another chair, or draw empty cell
    jq('#table .seat').click(function(){
        var click = this;
        if(action == 'add_seat')
        {
            var coords = jq(click).attr('alt').split(/[|]/);
            var params ={};
            params['x']  = coords[0];
            params['y'] = coords[1];
            params['label']  = 'New Seat';
            params['row']  = 1;
            params['number']  = 1;
            params['delimiter']  = '/';
            params['categoryID']  = 1;
            
            var dataSend = {'hallid':1, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        jq(click).attr('src', normal_image); 
                },

            });

          jq(this).attr('src', normal_image); 
        }
        else if (action == 'remove_seat')
        {
            var params =  {};
            params['id'] = jq(click).attr('id'); 
            var hallid = jq(this).attr('alt');
            
            var dataSend = {'hallid':hallid,'action':action, 'params': params };

            jq.ajax({
                data: dataSend,
                success: function(response){
                        jq(click).attr('src', empty_image); 
                },

            });
            
        }
        

    });

   
   //if the add icon is pressed then action (general var) is set to add) 
    jq('#control_panel .add').click(function(){
        action = 'add_seat';
        jq('#add_image').attr('src', 'skins/images/002_01.png');
        jq('#remove_image').attr('src', 'skins/images/001_02.png');
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    jq('#control_panel .remove').click(function(){
        action = 'remove_seat';
        jq('#add_image').attr('src', 'skins/images/001_01.png');
        jq('#remove_image').attr('src','skins/images/002_02.png' );
    });

});
           
