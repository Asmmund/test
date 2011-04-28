/* Setting no conflict version*/
var jq = jQuery.noConflict();

//default action
var action = 'add_seat';
//dif images
var ajax_load = 'skins/images/loading.gif';
//toolbar icons
var icon_add_selected = 'skins/images/002_01.png';
var icon_add_normal = 'skins/images/001_01.png';
var icon_remove_selected = 'skins/images/002_02.png';
var icon_remove_normal = 'skins/images/001_02.png';
var icon_select_normal = 'skins/images/select_icon.jpg';
var icon_select_selected = 'skins/images/select_icon_02.jpg';
var icon_info_normal = 'skins/images/label_icon.png';
var icon_info_selected = 'skins/images/label_icon_02.png';   

// vars for img url's
var empty_image = 'skins/images/empty_chair.jpg';
var normal_image = 'skins/images/green_chair.jpg';
var selected_image = 'skins/images/blue_chair.jpg';
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


//function for refreshing content of the table 
function refresh_table(hall_id){
    jq('#table').html(ajax_load).load('skins/js/main/refresh.php', {'hallid': hall_id});
}
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
    
    // if the seat is pressed
    jq('#table .seat').click(function(){
        //save the referense to clicked image
        var click = this;
        
        //if adding tool is in use
        if(action == 'add_seat')
        {
            var coords = jq(click).attr('title').split(/[|]/);
            var params ={};
            params['x']  = coords[0];
            params['y'] = coords[1];
            params['label']  = 'Added by Ajax';
            params['row']  = 1;
            params['number']  = 1;
            params['delimiter']  = '/';
            params['categoryID']  = 1;
            hallid = jq(click).attr('alt');
            
            var dataSend = {'hallid':hallid, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        jq(click).attr('src', normal_image);
                        jq(click).attr('id', response.id);
                        jq(click).attr('alt', response.hallid);
                        jq(click).attr('title', params['x']+'|'+ params['y']+'L:' + params['label']  ); 
                        
                },

            });
            
            //refresh_table(1);
        }
        
        //if removing seats tool is in use
        else if ((action == 'remove_seat') )
        {
            if(jq(click).attr('id') > 0)
            {
                var params =  {};
                params['id'] = jq(click).attr('id');
                params['title'] = jq(click).attr('title');
                var hallid = jq(this).attr('alt');
                
                var dataSend = {'hallid':hallid,'action':action, 'params': params };
                jq.ajax({
                    data: dataSend,
                    success: function(response){
                        jq(click).attr('src', empty_image);
                        jq(click).attr('id', '');
                        jq(click).attr('title', response.title);
                    },
                });
            }
        }
        
        // if the selection tool is in use
        else if(action == 'select_seat')
        {
            if(jq(click).attr('id') > 0)
                jq(click).attr('src',selected_image);
        }
        
        //creating window for updating seat info
        else if( action == 'update_info')
        {
            var tags = jq(click).attr('title').split(/L:/);
            var title =  tags[1];
            params['id'] = jq(click).attr('id');
            
            if(jq(click).attr('id') > 0)
            {
                //Get the window height and width
                var winH = jq(window).height();
                var winW = jq(window).width();
                //Set the popup window to center
                jq('#boxes .window').css('z-index','1').fadeIn(2000)
                    .css('top',  winH/2-jq('#boxes .window').height())
                    .css('left', winW/2-jq('#boxes .window').width());
                
                var tag = jq(click).attr('title').split(/L:/);
                var hallid = jq(this).attr('alt');

                var temp = tag[0].split(/|/);
                

                jq('#boxes .window').show();
                
            } 
            
            
            
        }
        

    });

    // closing bu
    jq('#boxes #dialog .cancel').click(function() {
        
        jq('#boxes .window').fadeOut(2000);
    });
    
    
    jq('#boxes #dialog .save').click(function(){
                var params =  {};
                params['label'] = tag[1];
                params['row'] = temp[0];
                params['number'] = temp[2];

        
    });
    
   
   //if the select icon is pressed
   jq('#control_panel .select').click(function(){
        action = 'select_seat';
        jq('#select_image').attr('src', icon_select_selected);
        jq('#add_image').attr('src',icon_add_normal );
        jq('#remove_image').attr('src', icon_remove_normal);
        jq('#info_image').attr('src', icon_info_normal); 
   });
   
   //if the add icon is pressed then action (general var) is set to add) 
    jq('#control_panel .add').click(function(){
        action = 'add_seat';
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src',icon_add_selected );
        jq('#remove_image').attr('src', icon_remove_normal);
       jq('#info_image').attr('src', icon_info_normal); 
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    jq('#control_panel .remove').click(function(){
        action = 'remove_seat';
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src', icon_add_normal);
        jq('#remove_image').attr('src', icon_remove_selected );
       jq('#info_image').attr('src', icon_info_normal); 
    });
    
    jq('#control_panel .info').click(function(){
       action = 'update_info';
       jq('#info_image').attr('src', icon_info_selected); 
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src',icon_add_normal );
        jq('#remove_image').attr('src', icon_remove_normal);
    });


 
});
     
 

           
