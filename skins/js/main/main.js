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

var green_seat = 'skins/images/seat/green.jpg';
var green_seat_selected = 'skins/images/seat/green_selected.jpg';
var blue_seat = 'skins/images/seat/blue.jpg';
var blue_seat_selected = 'skins/images/seat/blue_selected.jpg';
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

//function of getting seatcategories
function getSeatCategory()
{


   var params =  {};
   params['id'] = 1;
    var action = 'seat_category';
            var dataSend = {'hallid':1, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        var options = '<select id="dropdown_category" >';
                        jq.each(response.seatcategory,function(){
                            options += '<option  value="'+this.type.seatcategory_id +'|'+this.type.seatcolor+'">' + this.type.name + '</option>'
                        });
                        options += '</select>';
                        jq('#div_dropdown_category').html(options);
                }
            });
            
    
}        


/* when file is loaded*/
jq(document).ready(function(){
    //adding fow before the first one
   
    //loading seatcategory from db
   getSeatCategory();
   
    jq('#up_arrow').click(function(){
        var title_first_first = jq('#table > tbody>tr:first-child td:first-child img').attr('title');

         var hallid = jq('#table > tbody>tr:first-child td:first-child img').attr('alt');

        var first = jq("#table>tbody>tr:first-child>td:first-child img").attr('title');
        
        var temp = (temp = first.match(/(.+?)\|((.+?)L\:)/)==null)? first.match(/(.+?)\|(.+)/):first.match(/(.+?)\|(.+?)L\:/);
        var new_x = parseInt(temp[1])-1;
        var new_y =  parseInt(temp[2]);
        
        jq('#table > tbody>tr:first-child').clone(true).insertBefore('#table > tbody>tr:first-child');
        
        
        
        
        
        jq('#table > tbody>tr:first-child td img').each(function(index){
            var myIndex = index+1;
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', new_x +'|'+myIndex); 
        });        
        
        
        
        
    });

    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        //getting the hallid
        var hallid = jq("#table tr:first-child> td:last-child> img").attr('alt');
        
        var last = jq("#table>tbody>tr:first-child>td:last-child img").attr('title');
        
        var temp = (temp = last.match(/(.+?)\|((.+?)L\:)/)==null)? last.match(/(.+?)\|(.+)/):last.match(/(.+?)\|(.+?)L\:/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])+1;

        jq("#table>tbody>tr:first-child>td:last-child").clone(true).insertAfter('#table >tbody>tr>td:last-child');

        jq('#table >tbody>tr>td:last-child>img').each(function(i){
            var row = i + new_x;
           jq(this).attr('title', row   + '|' + new_y)
                   .attr("src" ,empty_image )
                   .attr('alt',hallid) ; 
        });

    });
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        //getting the hallid
        var hallid = jq("#table tr:first-child> td:first-child> img").attr('alt');
        
        var first = jq("#table>tbody>tr:first-child>td:first-child img").attr('title');
        var temp = (temp = first.match(/(.+?)\|((.+?)L\:)/)==null)? first.match(/(.+?)\|(.+)/):first.match(/(.+?)\|(.+?)L\:/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])-1;
 
        jq("#table>tbody>tr:first>td:first").clone(true).insertBefore('#table >tbody>tr td:first-child');
        
        jq('#table >tbody tr >td:first-child > img').each(function(i){
            var row = i + new_x;
           jq(this).attr('title', row   + '|' + new_y)
                   .attr("src" ,empty_image )
                   .attr('alt',hallid) ; 
        });
    });
  
  
    //adding row after the last one
    jq('#down_arrow').click(function(){
        //getting the hallid
        var hallid = jq('#table > tbody>tr:last-child >td:first img').attr('alt');
        //getting the last row 
        var title_last_last = jq('#table > tbody>tr:last-child>td:first-child img').attr('title');

        var temp = (temp = title_last_last.match(/(.+?)\|((.+?)L\:)/)==null)? title_last_last.match(/(.+?)\|(.+)/):title_last_last.match(/(.+?)\|(.+?)L\:/);
        var new_last_x = parseInt(temp[1])+1;
        var new_last_y =  parseInt(temp[2]);
        
        jq('#table > tbody>tr:last-child').clone(true).insertAfter('#table > tbody>tr:last-child');
        jq('#table > tbody>tr:last-child > td >img').each(function(index){
           
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', new_last_x+'|'+new_last_y);
           new_last_y+=1; 
        });
        
    });


    
    // if the seat is pressed
    jq('#table .seat').click(function(){
        //save the referense to clicked image
        var click = this;
        
        //if adding tool is in use
        if(action == 'add_seat')
        {
            if(jq(click).attr('src') == empty_image)
            {
            var temp =jq('#div_dropdown_category > #dropdown_category').val().match(/([0-9]+?)\|([a-zA-Z0-9]+)/);
            var category_id = temp[1];
            var category_color=temp[2];
            var coords = jq(click).attr('title').split(/[|]/);
            var params ={};
            params['x']  = coords[0];
            params['y'] = coords[1];
            params['label']  = 'New Seat';
            params['row']  = 1;
            params['number']  = 1;
            params['delimiter']  = '/';
            params['categoryID']  = category_id;
            hallid = jq(click).attr('alt');
            
            var dataSend = {'hallid':hallid, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        jq(click).attr('src', function(){
                            switch(category_color)
                            {
                                case 'green':
                                    return green_seat;
                                case 'blue':
                                    return blue_seat;
                                
                            }
                        }).attr('id', response.id)
                          .attr('alt', response.hallid)
                          .attr('title', params['x']+'|'+ params['y']+'L:' + params['label']  ); 
                        
                },

            });
            
            }
            
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
            var done = false;
            if(jq(click).attr('id') > 0)
            {
                //geen seat select& diselect
                if( jq(click).attr('src') == green_seat_selected)
                {
                    jq(click).attr('src', green_seat);
                    done = true
                }
                if( jq(click).attr('src') == green_seat && done == false)
                {
                     jq(click).attr('src', green_seat_selected);   
                     done = true
                }

                //blue seat select& diselect
                if( jq(click).attr('src') == blue_seat_selected && done == false)
                {
                    jq(click).attr('src', blue_seat);
                    done = true
                }
                if( jq(click).attr('src') == blue_seat && done == false)
                {
                     jq(click).attr('src', blue_seat_selected);   
                     done = true
                }
                    
                    
            }
        }
        
        
        //if the update label is pressed
        else if( action == 'update_info')
        {
            
           
            
            if(jq(click).attr('id') > 0)
            {
                //Get the window height and width
                var winH = jq(window).height();
                var winW = jq(window).width();
                //Set the popup window to center
                jq('#boxes .window').css('z-index','1').fadeIn(2000)
                    .css('top',  winH/2-jq('#boxes .window').height())
                    .css('left', winW/2-jq('#boxes .window').width());
                
                var tag = jq(click).attr('title').match(/(.*?)\|(.*?)L:(.*)/);
    
                var label = tag[3];
                var row = tag[1];
                var number = tag[2];
                
                jq('#boxes #dialog #label').val(label);
     
                   //showing window
                jq('#boxes .window').fadeTo('slow',1);
                
                jq('#boxes #dialog .cancel').click(function() {
                    jq('#boxes .window').fadeOut(2000);
                });

                // closing window
                jq('#boxes #dialog .save').click(function()
                {
                    var params =  {};
                    params['label'] = jq('#dialog #label').val();
                    params['row'] = row;
                    params['number'] = number;
                    params['id'] = jq(click).attr('id');
                    var hallid = jq(click).attr('alt');
                
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq(click).attr('title', response.title);
                            jq('#boxes .window').fadeOut(2000);
                            
                        }
                    });

                });
            } 
            
            
            
        }
        

    });

    
   
   //if the select icon is pressed
   jq('#control_panel .select').click(function(){
        action = 'select_seat';
        jq('#boxes .window').fadeOut(2000);
        jq('#select_image').attr('src', icon_select_selected);
        jq('#add_image').attr('src',icon_add_normal );
        jq('#remove_image').attr('src', icon_remove_normal);
        jq('#info_image').attr('src', icon_info_normal); 
       jq('#dropdown_category').hide(); 
   });
   
   //if the add icon is pressed then action (general var) is set to add) 
    jq('#control_panel .add').click(function(){
        action = 'add_seat';
        jq('#boxes .window').fadeOut(2000);
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src',icon_add_selected );
        jq('#remove_image').attr('src', icon_remove_normal);
       jq('#info_image').attr('src', icon_info_normal);
       jq('#dropdown_category').show(); 
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    jq('#control_panel .remove').click(function(){
        action = 'remove_seat';
        jq('#boxes .window').fadeOut(2000);
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src', icon_add_normal);
        jq('#remove_image').attr('src', icon_remove_selected );
       jq('#info_image').attr('src', icon_info_normal); 
       jq('#dropdown_category').hide(); 
    });
    
    jq('#control_panel .info').click(function(){
       action = 'update_info';
        jq('#boxes .window').fadeOut(2000);
        jq('#info_image').attr('src', icon_info_selected); 
        jq('#select_image').attr('src', icon_select_normal);
        jq('#add_image').attr('src',icon_add_normal );
        jq('#remove_image').attr('src', icon_remove_normal);
       jq('#dropdown_category').hide(); 
    });


 
});
     
 

           
