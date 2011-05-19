/* Setting no conflict version*/
var jq = jQuery.noConflict();


//default action
var action = 'add_seat';
//dif images
var ajax_load = '<img src="skins/images/loading.gif" />';
//pool for id's of selected seats
var selected_id = new Array();
var selected_td = new Array();
var selecting = true; 
var unselecting = false;
//toolbar icons
var icon_add_selected = 'skins/images/icons/002_01.png';
var icon_add_normal = 'skins/images/icons/001_01.png';
var icon_remove_selected = 'skins/images/icons/002_02.png';
var icon_remove_normal = 'skins/images/icons/001_02.png';
var icon_select_normal = 'skins/images/icons/select_icon.jpg';
var icon_select_selected = 'skins/images/icons/select_icon_02.jpg';
var icon_info_normal = 'skins/images/icons/label_icon.png';
var icon_info_selected = 'skins/images/icons/label_icon_02.png';   
var icon_delete_group = 'skins/images/icons/delete_group.png';  
var icon_delete_group_selected = 'skins/images/icons/delete_group_selected.png';
var icon_label_group  = 'skins/images/icons/label_group.png';
var icon_label_group_selected  = 'skins/images/icons/label_group_selected.png';    
var icon_category_group  = 'skins/images/icons/change_group.png';
var icon_category_group_selected  = 'skins/images/icons/change_group_selected.png';
var icon_squere_normal = 'skins/images/icons/squere.png';
var icon_squere_selected = 'skins/images/icons/squere_selected.png';
    
// vars for img url's
var empty_image = 'skins/images/seat/empty.jpg';
var empty_selected = 'skins/images/seat/empty_selected.jpg';
var blue_seat = 'skins/images/seat/blue.jpg';
var blue_seat_selected = 'skins/images/seat/blue_selected.jpg';
var green_seat = 'skins/images/seat/green.jpg';
var green_seat_selected = 'skins/images/seat/green_selected.jpg';
var red_seat = 'skins/images/seat/red.jpg';
var red_seat_selected = 'skins/images/seat/red_selected.jpg';
var violet_seat = 'skins/images/seat/violet.jpg';
var violet_seat_selected = 'skins/images/seat/violet_selected.jpg';
var yellow_seat = 'skins/images/seat/yellow.jpg';
var yellow_seat_selected = 'skins/images/seat/yellow_selected.jpg';

// vars used in editing categories
var old_name;
var old_seatcolor;

//ajax params
jq.ajaxSetup({
                url: 'skins/js/main/ajax.php',
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'JSON',
                cache: false,
                error: function(response) {
                        alert('Error processing query! ');
                }
});

//function to validate cell id
function isTdId(string)
{
    var numericExpression = /^-?[0-9]+_-?[0-9]+$/;
   
    return numericExpression.test(string)  != false;

    
}
//to validate Id of image
function isImgId(id)
{
    var numericExpression = /^[0-9]+$/;
    return (numericExpression.test(id)) != false; 
    
}

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
                            options += '<option  value="'+this.type.seatcategory_id 
                                        +'|'+this.type.seatcolor+'">\'' + this.type.name + '\' color:' + this.type.seatcolor + '</option>';
                        });
                        options += '</select>';
                        
                        //output the select content
                        jq('#div_dropdown_category').html(options);
                        
                        // just a link edit categories under select
                        jq('#edit_categories').show();
                }
            });
} 
//getting list of categories for window
// Get list of categories
function windowListCategories()
{
    jq('#window_edit_categories>#window_list_categories').html(ajax_load);
    var params =  {};
    var action = 'seat_category';
    var dataSend = {'hallid':1, 'action':action, 'params':params};
            jq.ajax({ 
                data: dataSend,
                success: function(response){
                    var list = '<ul class="list">';

                    jq.each(response.seatcategory,function(){
                        list += '<li>\'' 
                             + this.type.name + '\' color:'+ this.type.seatcolor  
                             + '<a href="javascript:void(0)" class="edit" id="'+ this.type.seatcategory_id+'">Edit</a>'
                             + '<a href="javascript:void(0)" class="delete" id="'+ this.type.seatcategory_id+'">Delete</a></li>';
                        });
                    list += '</ul>';
                    
                    jq('#window_edit_categories>#window_list_categories').html(list);
                    
                    

                }
            });
}



//just a wrap for 2 other functions
function categoryUpdate()
{
    getSeatCategory();
    windowListCategories();
    
}

// function of unselecting selected seats
   function unselectSeats()
   {
       if(selected_id.length != 0)
       {
        jq.each(selected_id, function(index,value){
                unselectOneSeat(value);
        });
       selected_id = []; 
       }

   }
//function of selecting one id
    function selectOneSeat(id)
    {
        if(!isImgId(id)) alert('Incorrect value passed to selectOneSeat(id)');
        var jq_id = jq('#grid #table tr td #'+id);
        jq_id.attr('src', function(i, val){
                    var new_src = val.match(/^(.+)(\..+)$/);
                    var filename=new_src[1]+ '_selected' + new_src[2];
                        return filename;
                })
    }
    
    //unselect one id
    function unselectOneSeat(id)
    {
        if(!isImgId(id)) alert('Incorrect value passed to unselectOneSeat(id)');
        var jq_id = jq('#grid #table tr td #'+id);
                var old_src = jq_id.attr('src') ;
                jq_id.attr('src', function(i,val){
                    var new_src = val.match(/^(.+)_selected(.+)$/);
                    var filename=new_src[1] + new_src[2];
                    return filename;
                })
        
    }
    
    //if the seat is selected
    function is_selected(id)
    {
        if(!isImgId(id)) alert('Incorrect value passed to is_selected(id)');
        
        var bool = false;
        var old_src = jq('#grid #table tr td #'+id).attr('src') ;
        if( (old_src == green_seat_selected) || (old_src == blue_seat_selected) 
            ||(old_src == red_seat_selected) || (old_src == yellow_seat_selected)
            ||(old_src == violet_seat_selected)) bool = true;
            
        return bool;    
        
    }
    //function for selecting square of seats
  function selectBlock(block)
    {
//      alert(block);
        var temp1 = block[0].match(/(-?[0-9]+)_(-?[0-9]+)/)
        if(!temp1) alert('Error in selectBlock(block) at x1 y1');
        var x1 = temp1[1];
        var y1 = temp1[2];
        var temp2 = block[1].match(/(-?[0-9]+)_(-?[0-9]+)/)
        if(!temp2) alert('Error in selectBlock(block) at x2 y2');
        
        var x2 = temp2[1];
        var y2 = temp2[2];
        unselectBlock();
//        alert(' x1 ' + x1 + ' x2 ' + x2 + '\n y1'+y1 + ' y2 '+y2);
        
        var max_x = Math.max(x1,x2);
        var min_x = Math.min(x1,x2);
        
        var max_y = Math.max(y1,y2);
        var min_y = Math.min(y1,y2);

//        alert(' min_x ' + min_x + ' max_x ' + max_x + '\n min_y'+min_y + ' max_y '+max_y);
        for(var i = min_x; i<=max_x; i++)
        for(var j = min_y; j<=max_y; j++)
        {
            var img = jq('#' + i + '_'+j + ' img'); 
//            alert('#' + i + '_'+j);
            if(img.attr('id') > 0)
            {
                selectOneSeat(img.attr('id'));
                selected_td.push( i + '_' + j );
            }
            else
            {
                jq(img).attr('src', empty_selected);
                selected_td.push( i + '_' + j );
            }
            
        }
//        alert(selected_td);
    }
    
    //function of unselecting seat by td id
    function unselectSeatInCell(cell)
    {
        if(!isTdId(cell)) alert('Wrong param passed to unselectSeatInCell!');
        var jq_img = jq('#' + cell + ' img');
        var new_src = jq_img.attr('src'); 
        jq_img.attr('src', function(i, val){
                    var new_src = val.match(/^(.+)_selected(\..+)$/);
                    var filename=new_src[1]+ new_src[2];
                    return filename;
            
        }).error(function(){alert(('Error in unselectSeatInCell(cell), not correct image'))});
    }
    
    //function of unselecting selected square
    function unselectBlock()
    {
        jq.each(selected_td,function(i){
            unselectSeatInCell(selected_td[i]);
        });
        selected_td = []; 
        selecting = true; 
    }
    
    
    //function for toolbar - when changing icon
    function toolbarUnselect()
    {
        unselectBlock();
        unselectSeats();
    }
    
    
    
    
    
    
/* when file is loaded*/
jq(document).ready(function(){

    //adding fow before the first one
    //loading seatcategory from db
   getSeatCategory();
/////////////////////////////////////////////////////////////////////
//editing hall size
/////////////////////////////////////////////////////////////////////   
    jq('#up_arrow').click(function(){
        var parent= jq('#table > tbody>tr:first-child>td:first-child');
        
        var id_td = parent.attr('id');

         var hallid = jq('#table > tbody>tr:first-child>td:first-child>img').attr('alt');

         var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);

        var new_x = parseInt(temp[1])-1;
        var new_y =  parseInt(temp[2]);
        
        jq('#table > tbody>tr:first-child').clone(true).insertBefore('#table > tbody>tr:first-child');
        
        
        
        
        
        jq('#table > tbody>tr:first-child>td>img').each(function(index,val){
           
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', new_x +'|'+new_y)
                   .attr('id', '')
                   .parent().attr('id',new_x +'_'+new_y);
          new_y += 1;  
           
        });        
        
        
        
        
    });

    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        //getting the hallid
        var parent = jq("#table > tbody>tr:first-child> td:last-child");
        var hallid = jq("#table > tbody>tr:first-child> td:last-child> img").attr('alt');
        var id_td = parent.attr('id');
        var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])+1;

        jq("#table>tbody>tr:first-child>td:last-child").clone(true).insertAfter('#table >tbody>tr>td:last-child');

        jq('#table >tbody>tr>td:last-child>img').each(function(i){
           jq(this).attr('title', new_x   + '|' + new_y)
                   .attr("src" ,empty_image )
                   .attr('alt',hallid)
                   .attr('id', '')
                   .parent().attr('id',new_x +'_'+new_y) ;
           new_x +=1; 
        });

    });
    
    
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        var parent= jq("#table> tbody>tr:first-child> td:first-child");
        //getting the hallid
        var hallid =jq("#table> tbody>tr:first-child> td:first-child> img").attr('alt');
        
        var first = parent.attr('id');
         var temp = first.match(/(-?[0-9]+)_(-?[0-9]+)/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])-1;
 
        jq("#table>tbody>tr:first-child>td:first-child").clone(true).insertBefore('#table >tbody>tr>td:first-child');
        
        jq('#table >tbody>tr >td:first-child > img').each(function(i){
            var row = i + new_x;
           jq(this).attr('title', row   + '|' + new_y)
                   .attr("src" ,empty_image )
                   .attr('alt',hallid)
                   .attr('id', '')
                   .parent().attr('id',row  + '_' + new_y) ; 
        });
    });
  
  
    //adding row after the last one
    jq('#down_arrow').click(function(){
        //getting the hallid
        var parent =jq('#table > tbody>tr:last-child >td:first-child'); 
        var hallid = jq('#table > tbody>tr:last-child >td:first-child> img').attr('alt');
        //getting the last row 
        var id_td = parent.attr('id');

        var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);;
        var new_x = parseInt(temp[1])+1;
        var new_y =  parseInt(temp[2]);
        
        jq('#table > tbody>tr:last-child').clone(true).insertAfter('#table > tbody>tr:last-child');
        jq('#table > tbody>tr:last-child > td >img').each(function(index){
           
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', new_x+'|'+new_y)
                   .attr('id', '')
                   .parent().attr('id',new_x+'_'+new_y) ; 
                   
           new_y += 1; 
        });
        
    });


/////////////////////////////////////////////////////////////////////
//actions when clicked on seat
/////////////////////////////////////////////////////////////////////    
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
                            var new_src = red_seat.match(/^(.+)red(\..+)$/);
                            var filename=new_src[1]+category_color+ new_src[2];
                            return filename;
                            })
                        .attr('id', response.id)
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
                if(is_selected(jq(click).attr('id')))
                {
                    var delete_val = jq(click).attr('id') ;
                    unselectOneSeat(delete_val);
                    jq.each(selected_id, function(index,value){
                        if( delete_val == value )
                            selected_id.splice(index,1);
                    });
                    
                }
                else
                {
                     selected_id.push( jq(click).attr('id') );
                     selectOneSeat(jq(click).attr('id'));   
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
                var boxes_window = jq('#boxes .window');
                //Set the popup window to center
                boxes_window.css('z-index','1').show()
                    .css('top',  winH/2-boxes_window.height())
                    .css('left', winW/2-boxes_window.width());
                
                var tag = jq(click).attr('title').match(/(.*?)\|(.*?)L:(.*)/);
    
                var label = tag[3];
                
                var row = tag[1];
                var number = tag[2];
                jq('#boxes #dialog #label').val(label);
     
                 //showing window
                boxes_window.show();
                
                jq('#boxes #dialog .cancel').click(function() {
                    boxes_window.hide();
                });

                // closing window
                jq('#boxes #dialog .save').click(function()
                {
                    var action = 'update_info';
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
                            jq('#boxes .window').hide();
                            
                        }
                    });

                });
                
                
            } 
        }
        
        else if(action == 'square')
        {
               // if it's  the first time then create first and second array elements
               //first 1X
               //second 1Y
               
               if(selected_td.length == 0)
               {
                    var tmp = jq(click).parent().attr('id');
                    selected_td.push(tmp);
                        var id = jq(this).attr('id');
                    
                    if(parseInt(id)>0)
                    {
                        selectOneSeat(id); 
                    }
                    else
                    {
                        jq(this).attr('src',empty_selected);
                        
                    }
               }
               /* else if it's the second time
                  then copy coords
                  first 2X
                  second 2Y
                  and copy coords to the selected fields
               */
               else if (selecting == true)
               {
                    var tmp = jq(click).parent().attr('id');
                    selected_td.push(tmp);
                    var id = jq(this).attr('id');
                    if(id>0)
                    {
                        selectOneSeat(id); 
                    }
                    else
                    {
                        jq(this).attr('src',empty_selected);
                        
                    }
                    selectBlock(selected_td);
                    selecting=false;
                    unselecting = true;
               }
               else if(unselecting == true)
               {
                unselectBlock();
                unselecting = false;
               }

                
            

        }
    });
    
    
    
    /*
    Editing categories
    */
    
    
    //window for editing categories
    jq('#edit_categories').click(function(){
                var winH = jq(window).height();
                var winW = jq(window).width();
                //Set the popup window to center
                var window_edit_categories =jq('#window_edit_categories'); 
                window_edit_categories.css('z-index','1').show()
                    .css('top',  winH/2-window_edit_categories.height())
                    .css('left', winW/2-window_edit_categories.width());
                    
                    

                window_edit_categories.show();
                windowListCategories();

    });
    
    jq('#window_edit_categories > .close').click(function(){
        jq('#window_edit_categories').hide();
    });
    





/////////////////////////////////////////////////////////////////////
//toolbar actions
/////////////////////////////////////////////////////////////////////    
    //function of hiding exta windows. as the default hides all windows
    function hideExtra()
    {
        jq('#boxes .window').hide();
        jq('#main  #control_panel #multiple_actions').hide();
        jq('#div_dropdown_category').hide(); 
        jq('#edit_categories').hide();
        jq('#window_edit_categories').hide();
        toolbarUnselect();
        
    }
    
    //function of normalizing all icons
    function unselectIcons()
    {
        jq('#control_panel .select #select_image').attr('src', icon_select_normal);
        jq(' #control_panel .square #square').attr('src', icon_squere_normal );
        jq('#control_panel .add #add_image').attr('src',icon_add_normal );
        jq('#control_panel .remove #remove_image').attr('src', icon_remove_normal);
        jq('#control_panel .info #info_image').attr('src', icon_info_normal); 
    }
/* **************************************************************** 
**************************************************************** */   

   //if the select icon is pressed
   jq('#control_panel .select').click(function(){
        action = 'select_seat';
        hideExtra();
        unselectIcons();
        jq('#main  #control_panel #multiple_actions').show();

        jq('#select_image').attr('src', icon_select_selected);
   });
   
   //if the add icon is pressed then action (general var) is set to add) 
    jq('#control_panel .add #add_image').click(function(){
        action = 'add_seat';
        hideExtra();
        unselectIcons();
        jq('#edit_categories').show();
        jq('#div_dropdown_category').show(); 

        jq(this).attr('src',icon_add_selected );
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    jq('#control_panel .remove #remove_image').click(function(){
        action = 'remove_seat';
         hideExtra();
        unselectIcons();

        jq(this).attr('src', icon_remove_selected );
    });
    
    jq('#control_panel .info #info_image').click(function(){
       action = 'update_info';
        hideExtra();
        unselectIcons();

        jq(this).attr('src', icon_info_selected); 
    });

    jq('#control_panel .square #square').click(function(){
        action = 'square';
        hideExtra();        
        unselectIcons();

        jq(this).attr('src', icon_squere_selected );
        
    });


/////////////////////////////////////////////////////////////////////
//Group toolbar
/////////////////////////////////////////////////////////////////////
                //deleting selected seats
                jq('#main  #control_panel #multiple_actions .group_delete #group_delete').click(function(){
                    if(selected_id != '')
                    {
                        var q = confirm('Are you sure you want to delete selected seats?');
                        if(q)
                    {
                        var delete_group = jq(this);
                        
                    var action = 'delete_seats';
                    var params =  {};
                    params['selected'] = selected_id.toString();
        
                    var hallid = 1;
                
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
        
                    jq.ajax({
                               data: dataSend,
                               success: function(response){
                                   jq.each(selected_id, function(i,value){
                                    jq('#'+ value).attr('src', empty_image);
                                   });
                                   jq(this).attr('src',icon_delete_group);
                                   selected_id.length = 0;
                               }
                          });
                          
                    }
               }
        
               else 
                   alert('To perform group actions you must select seats!');
        
   

                });


                
                //changing label of the group
                jq('#main  #control_panel #multiple_actions .group_label #group_label').click(function(){
                    if(selected_id != '')
                    {
                    jq(this).attr('src', icon_label_group_selected);
                    
                    
                 //Get the window height and width
                var winH = jq(window).height();
                var winW = jq(window).width();
                var boxes_window =jq('#boxes .window'); 
                //Set the popup window to center

                boxes_window.css('z-index','1').show()
                    .css('top',  winH/2-boxes_window.height())
                    .css('left', winW/2-boxes_window.width());
                
                jq('#boxes #dialog #label').val('Enter label');
     
                 //showing window

                boxes_window.show();
                
                jq('#boxes #dialog .cancel').click(function() {
                    boxes_window.hide();
                });

                // 
                jq('#boxes #dialog .save').click(function()
                {
                    var action = 'update_labels';
                    var hallid = 1;
                    var params =  {};
                    params['label'] = jq('#dialog #label').val();
                    params['selected'] = selected_id.toString();
                
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            unselectSeats();
                            jq.each(selected_id, function(i,value){
                                    var title = jq('#'+ value).attr('title');
                                    var temp = title.match(/(.*?)L:(.*?)/);
                                    var coords = temp[1];
                                    jq('#'+value).attr('title', coords + 'L:' +params['label'])
                                                 ;

                                   });
                            
                            selected_id.length = 0;
                            boxes_window.hide();
                            jq(this).attr('src',icon_label_group);

                            
                        }
                    });

                });
                
             
                    
                    
                     }
        
               else 
                   alert('To perform group actions you must select seats!');

                });
                
                
//function of getting seatcategories
function getCategoriesListForGroup()
{
   jq('#select_category_for_group .list').html(ajax_load);
   var params =  {};
   params['id'] = 1;
    var action = 'seat_category';
            var dataSend = {'hallid':1, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        var options = '<select id="selected_category" >';
                        jq.each(response.seatcategory,function(){
                            options += '<option  value="'+this.type.seatcategory_id 
                                        +'|'+this.type.seatcolor+'">\'' + this.type.name + '\' color:' + this.type.seatcolor + '</option>';
                        });
                        options += '</select>';
                        
                        //output the select content
                        jq('#select_category_for_group .list').html(options);
                }
            });
} 
                //change category onclick
                jq('#main  #control_panel #multiple_actions .group_category #group_category').click(function(){
                    if(selected_id != '')
                    {
                        var icon_categories =jq('#main  #control_panel #multiple_actions .group_category #group_category'); 

                    jq(this).attr('src', icon_category_group_selected);
                    var winH = jq(window).height();
                    var winW = jq(window).width();
                    var boxes_select_category_for_group =jq('#boxes #select_category_for_group'); 
                    //Set the popup window to center
                    boxes_select_category_for_group.css('z-index','1').show()
                    .css('top',  winH/2-boxes_select_category_for_group.height())
                    .css('left', winW/2-boxes_select_category_for_group.width());
                    
                    

                boxes_select_category_for_group.show();
                getCategoriesListForGroup();
                
                
                jq('#boxes #select_category_for_group > .save').click(function(){
                  
                    var action = 'change_category';
                    var hallid = 1;
                    var params =  {};
                    var category_string = jq('#select_category_for_group .list #selected_category').val();
                    var category_array = category_string.match(/([0-9]+)\|(.+)/);
                    var color = category_array[2];

                    params['categoryID'] = category_array[1];
                    
                    params['selected'] = selected_id.toString();

                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq.each(selected_id, function(i,value){
                                jq('#' + value).attr('src', function(){
                                    var new_src = red_seat.match(/^(.+)red(\..+)$/);
                                    var filename=new_src[1]+color+ new_src[2];
                                    return filename;
                                });
                                boxes_select_category_for_group.hide();  
                                icon_categories.attr('src', icon_category_group);

                                   });
                            
                            selected_id.length = 0;
                            jq('#boxes .window').hide();
                        }
                    });                  
                  
                  
               });

               jq('#boxes #select_category_for_group > .close').click(function(){
                  jq('#boxes #select_category_for_group').hide();
               });
               
               }

               else 
                   alert('To perform group actions you must select seats!');

                });

/////////////////////////////////////////////////////////////////////
//adding new category
/////////////////////////////////////////////////////////////////////
//window for adding category
    jq('#window_edit_categories > .add_category').click(function(){
                var winH = jq(window).height()+ 10;
                var winW = jq(window).width()+ 10;
                var add_category = jq('#boxes > #add_category'); 
                //Set the popup window to center
                add_category.css('z-index','1').show()
                    .css('top',  winH/2.2-add_category.height())
                    .css('left', winW/1.5-add_category.width());
                jq('#add_category > #name').val('New category name');
                jq('#add_category > #color').val('');

                add_category.show();

    });

    jq('#add_category > .save').click(function(){
        var action = 'add_category';
        var params =  {};
        params['name'] = jq('#add_category > #name').val();
        params['color'] = jq('#add_category > #color').val();
        
        var hallid = 1;
                
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
        
        jq.ajax({
                 data: dataSend,
                 success: function(response){
                    categoryUpdate();
                    add_category.hide();
                     }
                 });

    });
    
    jq('#add_category >  .close').click(function(){
        jq('#boxes > #add_category').hide();
    });


    
    
/////////////////////////////////////////////////////////////////////
//editing  category
/////////////////////////////////////////////////////////////////////

    //binding function to newly created categories
    
//editing category
function editCategoryWindow(id)
{
    var winH = jq(window).height()-50;
    var winW = jq(window).width()+ 10;
    //Set the popup window to center
    var edit_category_window = jq('#boxes > #edit_category_window');
    edit_category_window.css('z-index','1').show()
        .css('top',  winH/2.2-edit_category_window.height())
        .css('left', winW/1.5-edit_category_window.width());
      
        var action = 'get_category_info';
        var params =  {};
        params['id'] = id;
        
        var hallid = 1;
                
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
        jq.ajax({
                 data: dataSend,
                 success: function(response){
                     jq('#edit_category_window > #name').val(response.name);
                     jq('#edit_category_window > #color').val(response.seatcolor);
                     old_seatcolor = response.seatcolor;
                     jq('#edit_category_window > #seatcategory_id').val(id);
                     edit_category_window.show();
                 }
        });
}

    
    jq('#window_edit_categories>#window_list_categories .list .edit').live('click', function(e){
        var id =jq(this).attr('id') ;
        editCategoryWindow(id);
    });

/////////////////////////////////////////////////////////////////////
//deleting category
/////////////////////////////////////////////////////////////////////
function deleteCategory(id)
{
    
    var q = confirm('Are you sure?');
    if(q)
    {
    jq('#window_edit_categories>#window_list_categories').html(ajax_load);
        
    var params =  {};
    params['id'] = id;
    var action = 'delete_category';
    var dataSend = {'hallid':1, 'action':action, 'params':params};
    jq.ajax({ 
        data: dataSend,
        success: function(response){
                    
        },
        error: function(response){
            alert('There are seats of this category!');
        }
        
    });
    categoryUpdate();
    }   
}



// assigning methods to dynamically created list of categories     
    jq('#window_edit_categories>#window_list_categories .list .delete').live('click', function(e){
        var id =jq(this).attr('id') ;
        deleteCategory(id);
    }); 





    //redrawing seats with changed seatcolor
    function changedSeatColor(old_seatcolor,new_seatcolor)
    {
        var old_img_src = 'skins/images/seat/' + old_seatcolor + '.jpg';
        var new_img_src = 'skins/images/seat/' + new_seatcolor + '.jpg';
        jq('#grid >#table>tbody>  tr > td img').each(function(e){
           if( jq(this).attr('src') == old_img_src)
               jq(this).attr('src', new_img_src);
        });
    }
    
    //saving updated category 
    jq('#edit_category_window >  .save').click(function(){
        
        var action = 'update_category';
        var params =  {};
        params['id'] = jq('#edit_category_window > #seatcategory_id').val();
        params['name'] = jq('#edit_category_window > #name').val();
        params['seatcolor'] = jq('#edit_category_window > #color').val();
        var hallid = 1;
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
        if(old_seatcolor != params['seatcolor'])
            changedSeatColor(old_seatcolor,params['seatcolor']);

        jq.ajax({
                 data: dataSend,
                 success: function(response){
                     categoryUpdate();
                     jq('#edit_category_window > #name').val('');
                     jq('#edit_category_window > #color').val('');
                     jq('#edit_category_window > #seatcategory_id').val('');
                     jq('#boxes > #edit_category_window').hide();
                 }
    });
    });
     

    jq('#edit_category_window >  .close').click(function(){
        jq('#edit_category_window > #name').val('');
        jq('#edit_category_window > #color').val('');
        jq('#edit_category_window > #seatcategory_id').val('');
        jq('#boxes > #edit_category_window').hide();
        
    });

});
