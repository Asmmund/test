/* Setting no conflict version*/
var jq = jQuery.noConflict();


//default action
var action = 'add_seat';
//dif images
var ajax_load = '<img src="skins/images/loading.gif" height="30px" width="30px" />';
//pool for id's of selected seats
var selected_id = new Array();

var selected_coords = {};
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
var icon_rotate_normal = 'skins/images/icons/rotate.png';
var icon_rotate_selected = 'skins/images/icons/rotate_selected.png';
var icon_upload_background = 'skins/images/icons/upload.jpg';
var icon_upload_background_selected = 'skins/images/icons/upload_selected.jpg';

    
// vars for img url's
var empty_image = 'skins/images/seat/empty.png';
var empty_selected = 'skins/images/seat/empty_selected.jpg';

//regex for validating input
var regex_row = /[^0-9]+/;
var regex_number = /[^0-9]+/;
var regex_delimiter = /[^\.\-\s\|\\\,\/\_]/;
var regex_alphanumeric = /[^a-zA-Z0-9]/;
//general label format
var regex_label = /([0-9a-zA-Z]+)([\.\-\s\|\\\,\/\_])([0-9a-zA-Z]+)/;
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
                        alert('Error processing query!');
                }
});

//function of increasind sting by one
    String.prototype.increment = function() {
    return this.split('').map(function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 1);
    }).join('');
}

    String.prototype.incrementByTwo = function() {
    return this.split('').map(function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 2);
    }).join('');
}
//function to validate cell id
function isTdId(string)
{
    var numericExpression = /^-?[0-9]+_-?[0-9]+$/;
   
    return numericExpression.test(string);

    
}
//to validate Id of image
function isImgId(id)
{
    var numericExpression = /^[0-9]+$/;
    return numericExpression.test(id); 
    
}

// function to get to know if the seat is dynamically created
function isSquareSeat(seat_id)
{
    var param = /^.+_seat$/;
    return param.test(seat_id);
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
                            if(this.type.seatcategory_id != '')
                            options += '<option  value="'+this.type.seatcategory_id 
                                        +'|'+this.type.seatcolor+'">' + this.type.name + '</option>';
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
    jq('#window_list_categories').html(ajax_load);
    var params =  {};
    var action = 'seat_category';
    var dataSend = {'hallid':1, 'action':action, 'params':params};
            jq.ajax({ 
                data: dataSend,
                success: function(response){
                    var list = '<table class="list">';

                    jq.each(response.seatcategory,function(){
                        list += '<tr><td>' 
                             + this.type.name   
                             + '</td><td><a href="javascript:void(0)" class="edit" id="'+ this.type.seatcategory_id+'">Edit</a>'
                             + '</td><td><a href="javascript:void(0)" class="delete" id="'+ this.type.seatcategory_id+'">Delete</a></td><tr>';
                        });
                    list += '</table>';
                    
                    jq('#window_list_categories').html(list);
                    
                    

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
         jq('#'+id).attr('src', function(i, val){
                    var new_src = val.match(/^(.+?)(\..+)$/);
                    var filename=new_src[1]+ '_selected' + new_src[2];
                        return filename;
                })
    }
    
    //unselect one id
    function unselectOneSeat(id)
    {
        if(!isImgId(id)) alert('Incorrect value passed to unselectOneSeat(id)');
                jq('#'+id).attr('src', function(i,val){
                    var new_src = val.match(/^(.+?)(_selected)(\..+)$/);
                    var filename=new_src[1] + new_src[3];

                    return filename;
                })
        
    }
    
    //function of forming link to a seat with specific color
    function formSeatLink(color, state)
    {
        var temp = red_seat.match(/^(.+\/)(_selected)?(\..+)$/);
        var output = 'error';
        if(state == 'unselect')
        {
            output = temp[1] + color + temp[3];
        }
        else if(state == 'select')
        {
            output = temp[1] + color + temp[2] + temp[3];
        }
        
        return output;
        
    }
    
    
    //if the seat is selected
    function is_selected(id)
    {
        if(!isImgId(id)) alert('Incorrect value passed to is_selected(id)');
        
        var old_src = jq('#'+id).attr('src') ;
        var selected_src = /^.+_selected\.jpg$/;
        
        return selected_src.test(old_src);
        
    }
    //function for selecting square of seats
  function selectBlock()
    {
//      alert(block);
        var x1 = selected_coords[1];
        var y1 = selected_coords[2];
        
        var x2 = selected_coords[3];
        var y2 = selected_coords[4];
        selected_coords = {};
//        alert(' x1 ' + x1 + ' x2 ' + x2 + '\n y1'+y1 + ' y2 '+y2);
        
        var max_x = Math.max(x1,x2);
        var min_x = Math.min(x1,x2);
        
        var max_y = Math.max(y1,y2);
        var min_y = Math.min(y1,y2);

//        alert(' min_x ' + min_x + ' max_x ' + max_x + '\n min_y'+min_y + ' max_y '+max_y);
        for(var i = min_x; i<=max_x; i++)
        for(var j = min_y; j<=max_y; j++)
        {
            var seat_id = i + '_'+j;
            if(!isTdId(seat_id)) alert('Error parsing values at selectBlock()!');
            var img = jq('#' + seat_id + ' img.seat'); 
//            alert('#' + i + '_'+j);
            if(img.attr('id') > 0)
            {
                selectOneSeat(img.attr('id'));
            }
            else
            {
                img.attr('src', empty_selected);
            }
            selected_coords[seat_id] = {};
            selected_coords[seat_id]['x'] = i;
            selected_coords[seat_id]['y'] = j;
            
        }
//        alert(selected_td);
    }
    
    //function of unselecting seat by td id
    function unselectSeatInCell(cell)
    {

        if(!isTdId(cell) ) alert('Wrong param passed to unselectSeatInCell! '+ cell);
        var jq_img = jq('#' + cell + ' img.seat');
        if(jq_img.attr('id')>0)
        {
            jq_img.attr('src', function(i, val){


                    var new_src = val.match(/^(.+)(_selected)(\..+)$/);
                    var filename=new_src[1]+ new_src[3];
                    return filename;
            
        })
        }
        else
        {
            jq_img.attr('src', empty_image);
            
        }
    }
    
    //function of selecting sell content
    function selectSeatInCell(cell )
    {
        if(!isTdId(cell) ) alert('Wrong param passed to selectSeatInCell(cell)!');
        var jq_img = jq('#'+cell+'>img.seat');
        if(jq_img.attr('id')>0 )
        {
            jq_img.attr('src' ,function(i,val){
                var temp = val.match(/^(.+)(\..{3})$/);
                return temp[1] + '_selected' + temp[2];
            });
        }
        else
            jq_img.attr('src', empty_selected);
        
    }
    
    //function of unselecting selected square
    function unselectBlock()
    {
        if(numKeys(selected_coords) == 2  && !isNaN(selected_coords[1])&& !isNaN(selected_coords[2]) )
        unselectSeatInCell(selected_coords[1] + '_'+ selected_coords[2],true);
        
        
        jq.each(selected_coords,function(i,val){
            var vals = val['x']+ '_' + val['y'];
            if(isTdId(vals))
            unselectSeatInCell(vals);
        });
        
        selecting = false;
        selected_coords = {};
         
    }
    
    
    //function for toolbar - when changing icon
    function hallUnselect()
    {
        unselectBlock();
        unselectSeats();
    }
    
    
function numKeys(obj)
{
    var count = 0;
    for(var prop in obj)
    {
        count++;
    }
    return count;
}
    
    
    
    
/* when file is loaded*/
jq(window).load(function(){

    //adding fow before the first one
    //loading seatcategory from db
   getSeatCategory();
/////////////////////////////////////////////////////////////////////
//editing hall size
/////////////////////////////////////////////////////////////////////   
    jq('#up_arrow').click(function(){
        var img = jq('#table > tbody>tr:first-child>td:first-child> img.seat');
        
        var id_td = img.parent().attr('id');

         var hallid = img.attr('alt');

         var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);

        var new_x = parseInt(temp[1])-1;
        var new_y =  parseInt(temp[2]);
        var first_tr =jq('#table > tbody>tr:first-child'); 
        
        first_tr.clone(true).insertBefore('#table > tbody>tr:first-child');
        
        
        
        var for_each = jq('#table > tbody>tr:first-child>td>img.seat');
        
        for_each.each(function(){
           
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', '')
                   .attr('id', '')
                   .parent().attr('id',new_x +'_'+new_y);
          new_y += 1;  
           
        });        
        
        
        
    });
    
    jq('#up_minus').click(function(){
        var for_each = jq('#table > tbody>tr:first-child>td>img.seat');
        
        var remove = true;
        for_each.each(function(){
            if(jq(this).attr('id')>0)
                remove = false;
        });
        if(remove == true)
            jq('#table >tbody>tr:first-child').remove();
        else if(remove == false)
            alert("You can remove only empty row!")
        
    });

    //adding the table cell after each column
    jq('#right_arrow').click(function(){
        //getting the hallid
        var img = jq("#table > tbody>tr:first-child> td:last-child>img.seat");
        
        var hallid = img.attr('alt');
        var id_td = img.parent().attr('id');
        var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])+1;
        var tr_td =jq("#table>tbody>tr:first-child>td:last-child") 

        tr_td.clone(true).insertAfter('#table >tbody>tr>td:last-child');
        
        var for_each =jq('#table >tbody>tr>td:last-child>img.seat');

        for_each.each(function(){
           jq(this).attr('title', '')
                   .attr("src" ,empty_image )
                   .attr('alt',hallid)
                   .attr('id', '')
                   .parent().attr('id',new_x +'_'+new_y) ;
           new_x +=1; 
        });
        var stage = jq('#stage');
        var width = stage.width();
        stage.animate({
            width: '+=39'
        });
        

    });
    
    jq('#right_minus').click(function(){
        var for_each = jq('#table >tbody>tr>td:last-child>img.seat');
        
        var remove = true;
        for_each.each(function(){
            if(jq(this).attr('id')>0)
                remove = false;
        });
        if(remove == true)
        {
        var stage = jq('#stage');
        var width = stage.width();
        stage.animate({
            width: '-=39'
        });
            
        for_each.parent().remove();
        }
        else if(remove == false)
            alert("You can remove only empty column!")
        
    });
    
    //addint cell befoe the fitst cell of each row
    jq('#left_arrow').click(function(){
        var img = jq("#table> tbody>tr:first-child> td:first-child> img.seat");
        //getting the hallid
        var hallid =img.attr('alt');
        
        var first = img.parent().attr('id');
         var temp = first.match(/(-?[0-9]+)_(-?[0-9]+)/);
        var new_x = parseInt(temp[1]);
        var new_y =  parseInt(temp[2])-1;
        var tr_td = jq("#table>tbody>tr:first-child>td:first-child");
 
        tr_td.clone(true).insertBefore('#table >tbody>tr>td:first-child');
        
        var for_each = jq('#table >tbody>tr >td:first-child > img.seat');
        
        for_each.each(function(i){
            var row = i + new_x;
           jq(this).attr('title', '')
                   .attr("src" ,empty_image )
                   .attr('alt',hallid)
                   .attr('id', '')
                   .parent().attr('id',row  + '_' + new_y) ; 
        });
        var stage = jq('#stage');
        var width = stage.width();
        stage.animate({
            width: '+=39'
        });
        
    });
  
    jq('#left_minus').click(function(){
        var for_each = jq('#table >tbody>tr >td:first-child > img.seat');
        
        var remove = true;
        for_each.each(function(){
            if(jq(this).attr('id')>0)
            {
               
                remove = false;
            }
        });
        if(remove == true)
        {
                   var stage = jq('#stage');
                   var width = stage.width();
                   stage.animate({
                   width: '-=38'
        });
            
        for_each.parent().remove();
        }
        else if(remove == false)
            alert("You can remove only empty column!")
        
    });
  
    //adding row after the last one
    jq('#down_arrow').click(function(){
        //getting the hallid
        var img =jq('#table > tbody>tr:last-child >td:first-child img.seat'); 
        var hallid = img.attr('alt');
        //getting the last row 
        var id_td = img.parent().attr('id');

        var temp = id_td.match(/(-?[0-9]+)_(-?[0-9]+)/);;
        var new_x = parseInt(temp[1])+1;
        var new_y =  parseInt(temp[2]);
        var tr_td = jq('#table > tbody>tr:last-child');
        
        tr_td.clone(true).insertAfter('#table > tbody>tr:last-child');
        var for_each = jq('#table > tbody>tr:last-child > td >img.seat');
        for_each.each(function(){
           
           jq(this).attr('src',empty_image )
                   .attr('alt',hallid)
                   .attr('title', '')
                   .attr('id', '')
                   .parent().attr('id',new_x+'_'+new_y) ; 
                   
           new_y += 1; 
        });
        
    });
    jq('#down_minus').click(function(){
        var for_each = jq('#table > tbody>tr:last-child > td >img.seat');
        
        var remove = true;
        for_each.each(function(){
            if(jq(this).attr('id')>0)
                remove = false;
        });
        if(remove == true)
            jq('#table > tbody>tr:last-child').remove();
        else if(remove == false)
            alert("You can remove only empty row!")
    });


/////////////////////////////////////////////////////////////////////
//actions when clicked on seat
/////////////////////////////////////////////////////////////////////    
    // if the seat is pressed
        
    jq('#table img.seat').click(function(){

        //save the referense to clicked image
        var click = this;
        var click_obj = jq(this);
        
        //if adding tool is in use
        if(action == 'add_seat')
        {
            if(jq(click).attr('src') == empty_image || click_obj.attr('id') == '')
            {
            var temp =jq('#dropdown_category').val().match(/([0-9]+)\|([a-zA-Z0-9]+)/);
            var category_id = temp[1];
            var category_color=temp[2];
            var coords = jq(click).parent().attr('id').split(/_/);
            var params ={};
            params['x']  = coords[0];
            params['y'] = coords[1];
            params['row']  = '';
            params['number']  = '';
            params['delimiter']  = '';
            params['categoryID']  = category_id;
            params['label']  = params['row'] + params['delimiter']+params['number'];
            hallid = jq(click).attr('alt');
            
            var dataSend = {'hallid':hallid, 'action':action, 'params':params};

            jq.ajax({ 
                data: dataSend,
                success: function(response){
                        jq(click).attr('src', function(i,val){
                            var new_src = val.match(/^(.+\/)empty(\..+)$/);
                            var filename=new_src[1]+category_color+'_0'+'.jpg';
                            return filename;
                            })
                        .attr('id', response.id)
                        .attr('alt', response.hallid)
                        .attr('title',params['label']  ); 
                        
                },

            });
            
            }
            
        }
        
        //if removing seats tool is in use
        else if ((action == 'remove_seat') )
        {
            var seat = jq(this);
            if( (seat.attr('id')> 0))
            {
                var params =  {};
                params['id'] = seat.attr('id');
                params['title'] = seat.attr('title');
                var hallid = seat.attr('alt');
                
                var dataSend = {'hallid':hallid,'action':action, 'params': params };
                jq.ajax({
                    data: dataSend,
                    success: function(response){
                        jq(click).attr('src', empty_image);
                        jq(click).attr('id', '');
                        jq(click).attr('title', '');
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
                var boxes_window = jq('#dialog');
                //Set the popup window to center
                boxes_window.css('top',  winH/2-boxes_window.height()/2)
                    .css('left', winW/2-boxes_window.width()/2).show();
                
                var row_to_input = '';
                var delimiter_to_input = '';
                var number_to_input = '';
                var tag = jq(click).attr('title').match(regex_label);
                if( tag!=undefined)
                {
    
                var row_to_input = tag[1];
                var delimiter_to_input = tag[2]
                var number_to_input = tag[3];
                }
                
                jq('#edit_seat_row').val(row_to_input);
                jq('#edit_seat_delimiter').val(delimiter_to_input);
                jq('#edit_seat_number').val(number_to_input);
                //loading preview
                preview_label();
                
                //onkeyup events
                jq('#edit_seat_row').unbind('keyup').keyup(function(){
                    this.value = this.value.replace(regex_alphanumeric,'');
                    preview_label();
                });
                jq('#edit_seat_delimiter').unbind('keyup').keyup(function(){
                    this.value = this.value.replace(regex_delimiter,'');
                    preview_label();
                });
                
                jq('#edit_seat_number').unbind('keyup').keyup(function(){
                    this.value = this.value.replace(regex_alphanumeric,'');
                    preview_label();
                     
                });

                 //showing window
                boxes_window.show();
                jq('#dialog a.close').unbind().click(function() {
                    boxes_window.hide();
                });

                // closing window
                jq('#dialog a.save').unbind().click(function()
                {
                    var action = 'update_info';
                    var params =  {};
                    params['row'] = jq('#edit_seat_row').val();
                    params['number'] = jq('#edit_seat_number').val();
                    params['delimiter'] = jq('#edit_seat_delimiter').val();
                    params['id'] = jq(click).attr('id');
                    var hallid = jq(click).attr('alt');
                
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq(click).attr('title', response.title);
                            jq('#dialog').hide();
                            
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
               var first;
               var tmp;
               if( numKeys(selected_coords) == 0)
               {
                
                    first = jq(click);
                    tmp = first.parent().attr('id');
                    var x_y = tmp.split(/_/)
                    selected_coords[1] = x_y[0];
                    selected_coords[2] = x_y[1];
                    selectSeatInCell(tmp);
                    selecting = true;
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

                    var x_y = tmp.split(/_/)
                    selected_coords[3] = x_y[0];
                    selected_coords[4] = x_y[1];
                    //alert(selected_coords[1] + '_' + selected_coords[2]);
                    unselectSeatInCell(selected_coords[1] + '_'+selected_coords[2]);

                    selectBlock();
                    selecting=false;
                    unselecting = true;
               }
               else if(unselecting == true)
               {
                unselectBlock();
                selecting=false;
                unselecting=false;
               }

                
            

        }
        else if(action == 'rotate')
        {
            var id = click_obj.attr('id');

            if(id>0)
            {
                 
                //Get the window height and width
                var winH = jq(window).height();
                var winW = jq(window).width();
                var rotate_window = jq('#choose_rotation');
                var choose_rotation_angle = jq('#choose_rotation_angle');
                choose_rotation_angle.val('0');
                //Set the popup window to center
                rotate_window.css('top',  winH/2-rotate_window.height()/2)
                    .css('left', winW/2-rotate_window.width()/2)
                    .show();
                jq('#choose_rotation a.close').unbind().click(function() {
                    rotate_window.hide();
                });
                jq('#choose_rotation a.save').unbind().click(function() {
                    var action = 'rotate_seats';
                    var hallid = 1;
                    var params =  {};
                    params['id'] = id; 
                    params['rotate'] = choose_rotation_angle.val();
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };

                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            var img = jq('#'+id);
                              img.attr('src',function(i,val){
                                var tmp = val.match(/^(.+\/[a-z]+)(_[0-9]{1,3})?(\.[a-z]{2,4})$/);
                                return tmp[1] + '_'+ choose_rotation_angle.val()+ tmp[3] ;
                                });
                                rotate_window.hide(); 

                        }
                    });                  

                });
                
                
            }
        }
        else if(action == 'category')
        {
            var id = click_obj.attr('id');
            var click = jq(this);
            if( id>0)
            {
          var winH = jq(window).height();
                    var winW = jq(window).width();
                    var boxes_select_category_for_group =jq('#select_category_for_group'); 
                    //Set the popup window to center
                    boxes_select_category_for_group.css('top',  winH/2-boxes_select_category_for_group.height()/2)
                    .css('left', winW/2-boxes_select_category_for_group.width()/2).show();
                    
                getCategoriesListForGroup();
                
                 jq('#select_category_for_group > a.save').unbind('click').click(function(){
                    var action = 'change_category';
                    var hallid = 1;
                    var params =  {};
                    var category_string = jq('#selected_category').val();
                    var category_array = category_string.match(/([0-9]+)\|(.+)/);
                    var color = category_array[2];

                    params['categoryID'] = category_array[1];
                    
                    params['selected'] = id;
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    
                   jq.ajax({
                        data: dataSend,
                        success: function(response){
                                jq('#' + id).attr('src', function(j,val){
                                    var new_src = val.match(/(.+\/)([a-z]+)(\_[0-9]{1,3})?(_selected)?(\.[a-z]{2,4})/);
                                    return new_src[1]+color + new_src[3]+new_src[5];
                                });
                                boxes_select_category_for_group.hide();
                        }
                    });                  

                    
                 });

                
            }
            
        }


    });
    
    
    
    /*
    Editing categories
    */
    
    
    //window for editing categories
    jq('#edit_categories').unbind('click').click(function(){
                var winH = jq(window).height();
                var winW = jq(window).width();
                //Set the popup window to center
                var window_edit_categories =jq('#window_edit_categories'); 
                window_edit_categories.css('top',  winH/2-window_edit_categories.height()/2)
                    .css('left', winW/2 - window_edit_categories.width()/2).show();
                    
                    

                windowListCategories();

    });
    
    jq('#window_edit_categories a.close').unbind('click').click(function(){
        jq('#window_edit_categories').hide();
    });
    





/////////////////////////////////////////////////////////////////////
//toolbar actions
/////////////////////////////////////////////////////////////////////    
    //function of hiding exta windows. as the default hides all windows
    function hideExtra()
    {
        jq('#dialog').hide();
        jq('#multiple_actions').hide();
        jq('#div_dropdown_category').hide(); 
            jq('#edit_categories').hide();
        jq('#window_edit_categories').hide();
        jq('#square_actions').hide();
        jq('#choose_rotation').hide();
        jq('#windows_group_label').hide();
        jq('#upload-area').hide();
        
    }
    
    //function of normalizing all icons
    function unselectIcons()
    {
        jq('#select_image').attr('src', icon_select_normal);
        jq('#square').attr('src', icon_squere_normal );
        jq('#add_image').attr('src',icon_add_normal );
        jq('#remove_image').attr('src', icon_remove_normal);
        jq('#info_image').attr('src', icon_info_normal);
        jq('#rotate_image').attr('src', icon_rotate_normal);
        jq('#category').attr('src', icon_category_group);
        hallUnselect();
        unselectBlock();
         
    }
/* **************************************************************** 
**************************************************************** */   

   //if the select icon is pressed
   
   jq('#select_image').unbind('click').click(function(){
        action = 'select_seat';
        hideExtra();
        unselectIcons();
        jq('#multiple_actions').show();

        jq('#select_image').attr('src', icon_select_selected);
   });
   
   //if the add icon is pressed then action (general var) is set to add) 
   
    jq('#add_image').unbind('click').click(function(){
        action = 'add_seat';
        hideExtra();
        unselectIcons();
        jq('#edit_categories').show();
        jq('#div_dropdown_category').show(); 

        jq(this).attr('src',icon_add_selected );
    });
    
    //if the remove icon is pressed then action (general var) is set to remove)
    
    jq('#remove_image').unbind('click').click(function(){
        action = 'remove_seat';
         hideExtra();
        unselectIcons();

        jq(this).attr('src', icon_remove_selected );
    });
    
    
    jq('#info_image').unbind('click').click(function(){
       action = 'update_info';
        hideExtra();
        unselectIcons();

        jq(this).attr('src', icon_info_selected); 
    });
    
    jq('#square').unbind('click').click(function(){
        action = 'square';
        hideExtra();        
        unselectIcons();
        jq('#square_actions').show();
        jq('#edit_categories').show();
        jq('#div_dropdown_category').show(); 

        jq(this).attr('src', icon_squere_selected );
        
    });
    
    jq('#rotate_image').unbind('click').click(function(){
        action = 'rotate';
        hideExtra();        
        unselectIcons();

        jq(this).attr('src', icon_rotate_selected );
        
    });
    jq('#category').unbind('click').click(function(){
       action = 'category'; 
        hideExtra();        
        unselectIcons();

        jq(this).attr('src', icon_category_group_selected);
    });

/////////////////////////////////////////////////////////////////////
//Group toolbar
/////////////////////////////////////////////////////////////////////
                //deleting selected seats
                
                jq('#group_delete').unbind('click').click(function(){
                    
                    if(selected_id != '')
                    {
                        var q = confirm('Are you sure you want to delete selected seats?');
                        if(q)
                    {
                    jq('#group_delete').attr('src',icon_delete_group_selected);    
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
                                   jq('#group_delete').attr('src',icon_delete_group);
                                   selected_id.length = 0;
                                   unselectSeats();
                               }
                          });
                          
                    }
                    
               }
        
               else 
               {
                            
                   alert('To perform group actions you must select seats!');
               }
        
   

                });

function getTdCoords(selected_id)
{
    var selected_coords = {};
    jq.each(selected_id, function(i,val){
        var img = jq('#' + val);
        var coord = img.parent().attr('id');
        var array = coord.split('_');
        selected_coords[coord] = {};
        
        selected_coords[coord].x =array[0];
        selected_coords[coord].y =array[1];
    })
    return selected_coords;
}
                
                //changing label of the group
                
                    jq('#group_label').unbind('click').click(function(){
                    
                    if(selected_id != '')
                    {
                        
                        var click =jq(this); 
                        var for_seats = getTdCoords(selected_id);
                        if(numKeys(for_seats)>0 )
                         {
                            jq(this).attr('src', icon_label_group_selected);
                            square_label(for_seats);

                         }
                         else
                             alert('Some seats must be selected!');           
                
             
                    
                     }
        
               else 
                   alert('To perform group actions you must select seats!');

                });
                
                // rotating group
                jq('#group_rotate').unbind('click').click(function(){
                   var click = jq(this);
                        var for_seats = getTdCoords(selected_id);
                        if(numKeys(for_seats)>0 )
                         {
                            jq(this).attr('src', icon_rotate_selected);
                            square_rotate( for_seats);

                         }
                         else
                             alert('Some seats must be selected!');           
                    
                });
                
//function of getting seatcategories
function getCategoriesListForGroup()
{
    var list = jq('#select_category_for_group p.list');
   list.html(ajax_load);
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
                                        +'|'+this.type.seatcolor+'">' + this.type.name +  '</option>';
                        });
                        options += '</select>';
                        
                        //output the select content
                        list.html(options);
                }
            });
} 
                //change category onclick
                
                jq('#group_category').unbind('click').click(function(){
                    if(selected_id != '')
                    {
                        var click =jq(this);
                        click.attr('src', icon_category_group_selected); 

                    var winH = jq(window).height();
                    var winW = jq(window).width();
                    var boxes_select_category_for_group =jq('#select_category_for_group'); 
                    //Set the popup window to center
                    boxes_select_category_for_group.css('top',  winH/2-boxes_select_category_for_group.height()/2)
                    .css('left', winW/2-boxes_select_category_for_group.width()/2).show();
                    
                getCategoriesListForGroup();
                
                
                jq('#select_category_for_group > a.save').unbind('click').click(function(){
                  
                    var action = 'change_category';
                    var hallid = 1;
                    var params =  {};
                    var category_string = jq('#selected_category').val();
                    var category_array = category_string.match(/([0-9]+)\|(.+)/);
                    var color = category_array[2];

                    params['categoryID'] = category_array[1];
                    
                    params['selected'] = selected_id.toString();

                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq.each(selected_id, function(i,value){
                                
                                jq('#' + value).attr('src', function(j,val){
                                    
                                    var new_src = val.match(/(.+\/)([a-z]+)(\_[0-9]{1,3})?(_selected)?(\.[a-z]{2,4})/);
                                    return new_src[1]+color + new_src[3]+new_src[5];
                                });
                                boxes_select_category_for_group.hide();  
                                click.attr('src', icon_category_group);
                                unselectSeats();
                                selected_id = [];

                                   });
                        }
                    });                  
                  
                  
               });
               
               
               jq('#select_category_for_group  a.close').unbind('click').click(function(){
                  boxes_select_category_for_group.hide();
                  unselectSeats();
                  click.attr('src', icon_category_group);
               });
               
               }

               else 
                   alert('To perform group actions you must select seats!');

                });

/////////////////////////////////////////////////////////////////////
//adding new category
/////////////////////////////////////////////////////////////////////
//window for adding category
    jq('#window_edit_categories > a.add_category').unbind('click');
    jq('#window_edit_categories > a.add_category').click(function(){
                var winH = jq(window).height();
                var winW = jq(window).width();
                var add_category = jq('#add_category'); 
                //Set the popup window to center
                jq('#name').val('New category name');
                jq('#color').val('');

                add_category.css('top',  winH/2-add_category.height()/2)
                    .css('left', winW/2-add_category.width()/2).show();

    });
    
    
    jq('#add_category a.save').unbind('click').click(function(){
        var add_category = jq('#add_category');
        var action = 'add_category';
        var params =  {};
        params['name'] = jq('#name').val();
        params['color'] = jq('#color').val();
        
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
    

    
    jq('#add_category a.close').unbind('click').click(function(){
            jq('#add_category').hide();
        });
/////////////////////////////////////////////////////////////////////
//editing  category
/////////////////////////////////////////////////////////////////////

    //binding function to newly created categories
    
//editing category
function editCategoryWindow(id)
{
    var winH = jq(window).height();
    var winW = jq(window).width();
    //Set the popup window to center
    var edit_category_window = jq('#edit_category_window');
    edit_category_window.css('top',  winH/2-edit_category_window.height()/2)
        .css('left', winW/2-edit_category_window.width()/2).show();
      
        var action = 'get_category_info';
        var params =  {};
        params['id'] = id;
        
        var hallid = 1;
                
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
        jq.ajax({
                 data: dataSend,
                 success: function(response){
                     jq('#edit_category_window_name').val(response.name);
                     jq('#edit_category_window_color').val(response.seatcolor);
                     old_seatcolor = response.seatcolor;
                     jq('#edit_category_window_seatcategory_id').val(id);
                     edit_category_window.show();
                 }
        });
}

    
    jq('#window_list_categories a.edit').live('click', function(){
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
    jq('#window_list_categories').html(ajax_load);
        
    var params =  {};
    params['id'] = id;
    var action = 'delete_category';
    var dataSend = {'hallid':1, 'action':action, 'params':params};
    jq.ajax({ 
        data: dataSend,
        success: function(response){
            categoryUpdate();
                    
        },
        error: function(response){
            alert('Error deleting category! Category deleted can\'t contain any seats.');
        }
        
    });
    
    }   
}



// assigning methods to dynamically created list of categories     
    jq('#window_list_categories a.delete').live('click', function(e){
        
        var id =jq(this).attr('id') ;
        deleteCategory(id);
    }); 





    //redrawing seats with changed seatcolor
    function changedSeatColor(old_seatcolor,new_seatcolor)
    {
        var old_img_src = 'skins/images/seat/' + old_seatcolor + '.jpg';
        var new_img_src = 'skins/images/seat/' + new_seatcolor + '.jpg';
        var all_seats = jq('#grid >#table>tbody>  tr > td img');
        all_seats.each(function(e){
           if( jq(this).attr('src') == old_img_src)
               jq(this).attr('src', new_img_src);
        });
    }
    
    
    //saving updated category 
    jq('#edit_category_window >  a.save').unbind('click');
    jq('#edit_category_window >  a.save').click(function(){
        var action = 'update_category';
        var params =  {};
        params['id'] = jq('#edit_category_window_seatcategory_id').val();
        params['name'] = jq('#edit_category_window_name').val();
        params['seatcolor'] = jq('#edit_category_window_color').val();
        var hallid = 1;
        var dataSend = {'hallid':hallid,'action':action, 'params': params };

        jq.ajax({
                 data: dataSend,
                 success: function(response){
                     categoryUpdate();
                     if(old_seatcolor != params['seatcolor'])
                         changedSeatColor(old_seatcolor,params['seatcolor']);
                     jq('#edit_category_window_name').val('');
                     jq('#edit_category_window_color').val('');
                     jq('#edit_category_window_seatcategory_id').val('');
                     jq('#edit_category_window').hide();
                 }
    });
    });
     
    jq('#edit_category_window   a.close').unbind('click');
    jq('#edit_category_window   a.close').click(function(){
        jq('#edit_category_window_name').val('');
        jq('#edit_category_window_color').val('');
        jq('#edit_category_window_seatcategory_id').val('');
        jq('#edit_category_window').hide();
        
    });

/* *************************************************************************
 Square actions
************************************************************************* */
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); // changed (twice)
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

function SelectedTdFilterSeats(selected_coords, type)
{
    var objects = clone(selected_coords);
    if(type == 'empty')
    {
    jq.each(objects,function(i){
    var img = jq('#' + i + ' img.seat');
        if((img.attr('id') >0))
          delete objects[i];
    })
    }
    else if (type == 'seats')
    {
    jq.each(objects,function(i){
        var img = jq('#' + i + ' img.seat');
        if (!(img.attr('id') >0) )
          delete objects[i];
    })
    }
    
    
    return objects;
    
}

function getKey(data) {
  for (var prop in data)
    return data[prop][0];
}        

//function of adding a chair;
function square_add()
{
    var temp =jq('#dropdown_category').val().match(/([0-9]+)\|([a-zA-Z0-9]+)/);
    var category_id = parseInt(temp[1]);
    var seatcolor =temp[2];
    var for_seats = SelectedTdFilterSeats(selected_coords, 'empty');
 
    var action = 'square_add';
    var params = {};
    params['category_id'] = parseInt(category_id);
    params['selected_td'] = for_seats;
    params['row'] = '';
    params['number'] = '';
    params['delimiter'] = '';
    var hallid = 1;
  
    var dataSend = {'hallid':hallid,'action':action, 'params': params };
    jq.ajax({
                 data: dataSend,
                 success: function(response){
                    
                    jq.each(for_seats,function(i,val){
                       var cell = jq('#'+ i + ' img.seat');
                           cell.attr('src', function(i,val){
                           var temp = val.match(/^(.+\/)(.+)(\..+)$/);
                           return temp[1] + seatcolor +'_0' + '.jpg';
                        });
                    cell.attr('id',response.ids.ids[i]).attr('title',params['row'] + params['delimiter']+params['number']);
                    });
                 }
    });
                    unselectBlock();
                    
                    unselecting=false;
                    
    
    
}


 
 jq('#square_add').unbind('click').click(function(){
    if(numKeys(selected_coords) > 0 && unselecting == true)
    {
        jq(this).attr('src',icon_add_selected);
        square_add();
        jq(this).attr('src',icon_add_normal);
        selecting=true;
        unselecting=false;
    }
    else
        alert('You must select square of seats first!');


 })

    //function of getting selected td id's of seats
    function squareGetSeatId(td)
    {
        var return_string = '';
        if(numKeys(td)>0)
        {
            jq.each(td, function(i){
                
                var seat_id = jq('#'+ i + ' img.seat').attr('id');
//                alert(seat_id);
                return_string += seat_id + ', ';
            });
        }
        else
            alert(' Incorrect params passed to squareGetSeatId(td)!')
//            alert(return_string);
      return return_string;
    }
    
       
   //function of emptyng seats withon selected range
   function square_delete(for_seats)
   {
        var action = 'delete_seats';
        var params = {};
        params['selected'] = squareGetSeatId(for_seats);
        var hallid = 1;
        
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
        jq.ajax({
            data:dataSend,
            success: function(response) {
                        jq.each(for_seats,function(i,val){
                            var img = jq('#' + i + ' img.seat');
                            img.attr('src',empty_image)
                                                     .attr('id', '')
                                                     .attr('title', '');
                        });    
            }
        })
    
  
       
   unselectBlock();
 }
  
 jq('#square_remove').unbind('click').click(function(){
    
    var for_seats = SelectedTdFilterSeats(selected_coords, 'seats');
    if( unselecting == true )
    {
        if(confirm('Are you sure you want to delete all of the selected seats?'))
    {
        jq(this).attr('src', icon_delete_group_selected);
        square_delete(for_seats);
        jq(this).attr('src', icon_delete_group);
        selecting=true;

        unselecting=false;
     }
     else
             unselectBlock();   
    }
    else
       alert('Some seats must be selected!');
       
    

 });
 
 //changing group of selected seats
    function square_category(for_seats)
    {
        var action = 'square_category';
        var params = {};
        params['selected_id'] = squareGetSeatId(for_seats);
//        alert(squareGetSeatId(for_seats));
        var hallid = 1;
        var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    var winH = jq(window).height();
                    var winW = jq(window).width();
                    var boxes_select_category_for_group =jq('#select_category_for_group'); 
                    //Set the popup window to center
                    boxes_select_category_for_group.css('top',  winH/2-boxes_select_category_for_group.height())
                    .css('left', winW/2-boxes_select_category_for_group.width()).show();
                    
                getCategoriesListForGroup();
                
                jq('#select_category_for_group > a.save').unbind('click');
                jq('#select_category_for_group > a.save').click(function(){
                  
                    var action = 'change_category';
                    var hallid = 1;
                    var params =  {};
                    var category_string = jq('#selected_category').val();
                    var category_array = category_string.match(/([0-9]+)\|(.+)/);
                    var color = category_array[2];

                    params['categoryID'] = category_array[1];
                    
                    params['selected'] = squareGetSeatId(for_seats);

                    var dataSend = {'hallid':hallid,'action':action, 'params': params };
                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq.each(for_seats, function(i,value){
                                
                                jq('#' + i + ' img.seat').attr('src', function(i,val){
                                        var new_src = val.match(/(.+\/)([a-z]+)((_[0-9]{1,3})?(_selected)?(\.[a-z]{2,4}))/);
                                        
                                        return new_src[1]+ color + new_src[3];
                                    });

                                 });
                            jq('#select_category_for_group').hide();  
                        }
                    });                  
                  
                unselectBlock();
            });
            
            
            jq('#select_category_for_group > a.close').unbind('click').click(function(){
                unselectBlock();
                  jq('#select_category_for_group').hide();
               });

        
        
        
        
    } 
 
 
 jq('#square_category').unbind('click').click(function(){
    var for_seats = SelectedTdFilterSeats(selected_coords, 'seats');
    if( unselecting == true && numKeys(for_seats)>0)
    {
        jq(this).attr('src', icon_category_group_selected);
        square_category(for_seats);
        jq(this).attr('src', icon_category_group);
        selecting=true;
        unselecting=false;
    }
    else
        alert('Some seats must be selected!');
    
 });




//function of preview of edited label
    function preview_label()
    {
        var row = jq('#edit_seat_row').val();
        var delimiter = jq('#edit_seat_delimiter').val();
        var number = jq('#edit_seat_number').val();
        jq('#label_preview').html(row+delimiter+number);
    }
    function getIdFromTd(array_seat)
    {
        //if(!isArray(array_seat)) alert('Error in getIdFromTd(array) \n array: '+array_seat);
        var seat_id = [];
          jq.each(array_seat,function(j,value){
               var img = jq('#' + j + ' img.seat');
               if(img.attr('id')>0)
                   seat_id.push(img.attr('id'));
          })
          return seat_id;
    }


//rotating selected seats
    function square_rotate(array_seat)
    {
            //Get the window height and width
                var winH = jq(window).height();
                var winW = jq(window).width();
                var rotate_window = jq('#choose_rotation');
                var choose_rotation_angle = jq('#choose_rotation_angle');
                choose_rotation_angle.val('0');
                //Set the popup window to center
                rotate_window.css('top',  winH/2-rotate_window.height()/2)
                    .css('left', winW/2-rotate_window.width()/2)
                    .show();
                jq('#choose_rotation a.close').unbind().click(function() {
                    unselectBlock();
                    rotate_window.hide();
                    unselectSeats();
                   jq('#square_rotate').attr('src', icon_rotate_normal);
                });
                
                jq('#choose_rotation a.save').unbind().click(function() {
                    var id = getIdFromTd(array_seat);
                    
                    var dropdown = '_' +choose_rotation_angle.val();
                    
            
                    var action = 'rotate_seats';
                    var hallid = 1;
                    var params =  {};
                    params['id'] = id.toString(); 
                    params['rotate'] = choose_rotation_angle.val();
                    var dataSend = {'hallid':hallid,'action':action, 'params': params };

                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            jq.each(id,function(j,val){
                               var img = jq('#'+val);
                                img.attr('src',function(i,val){
                                    var tmp = val.match(/(.+\/)([a-z]+)(_[0-9]{1,3})?(_selected)(\.[a-z]{2,4})/);
                                    return tmp[1]+tmp[2] + dropdown + tmp[4] + tmp[5];
                                });                                
                            });
                            unselectSeats();
                            unselectBlock();
                            jq('#square_rotate').attr('src', icon_rotate_normal);
                            jq('#group_rotate').attr('src', icon_rotate_normal);
                            rotate_window.hide();
                        }
                    });                  
                       
              })   
    }
    
    jq('#square_rotate').unbind().click(function(){
         var for_seats = SelectedTdFilterSeats(selected_coords, 'seats');
         if(numKeys(for_seats)>0  && unselecting == true)
      {
         jq(this).attr('src', icon_rotate_selected);
         
         square_rotate(for_seats);

      }
      else
          alert('Some seats must be selected!');   
    });
    
    
    /* ////////////////////////////////////////////////////
        set label for the selected area
    //////////////////////////////////////////////////// */
    function xAscYAsc(a1,a2)
    {
        var a = [];
        a[0] = parseInt(a1[0]);
        a[1] = parseInt(a1[1]);
        var b = [];
        b[0] = parseInt(a2[0]);
        b[1] = parseInt(a2[1]);
        if(a[0] == b[0]){
            if(a[1] == b[1]) return 0;
            else if(a[1] <  b[1]) return -1;
            else if(a[1] >  b[1]) return 1;
        }
        else if(a[0] < b[0]) return -1;
        else if(a[0] > b[0]) return 1;
    }

    function xDescYDesc(a1,a2)
    {
        var a = [];
        a[0] = parseInt(a1[0]);
        a[1] = parseInt(a1[1]);
        var b = [];
        b[0] = parseInt(a2[0]);
        b[1] = parseInt(a2[1]);
        if(a[0] == b[0]){
            if(a[1] == b[1]) return 0;
            else if(a[1] >  b[1]) return -1;
            else if(a[1] <  b[1]) return 1;
        }
        else if(a[0] > b[0]) return -1;
        else if(a[0] < b[0]) return 1;
    }
    
    
    function xAscYDesc(a1,a2)
    {
        var a = [];
        a[0] = parseInt(a1[0]);
        a[1] = parseInt(a1[1]);
        var b = [];
        b[0] = parseInt(a2[0]);
        b[1] = parseInt(a2[1]);
        if(a[0] == b[0]){
            if(a[1] == b[1]) return 0;
            else if(a[1] >  b[1]) return -1;
            else if(a[1] <  b[1]) return 1;
        }
        else if(a[0] < b[0]) return -1;
        else if(a[0] > b[0]) return 1;
    }
    
    function xDescYAsc(a1,a2)
    {
        var a = [];
        a[0] = parseInt(a1[0]);
        a[1] = parseInt(a1[1]);
        var b = [];
        b[0] = parseInt(a2[0]);
        b[1] = parseInt(a2[1]);
        if(a[0] == b[0]){
            if(a[1] == b[1]) return 0;
            else if(a[1] <  b[1]) return -1;
            else if(a[1] >  b[1]) return 1;
        }
        else if(a[0] > b[0]) return -1;
        else if(a[0] < b[0]) return 1;
        
    }



     //function of sorting itself
     function sortCoords(for_seats,kind_x,kind_y)
     {
        var array = [];
        for(var key in for_seats)
        {
            var key = [for_seats[key].x,for_seats[key].y]
            array.push(key);
        }
        
        if(kind_x == 0 && kind_y == 0)
        {
            
            array.sort(xAscYAsc);
        }
        //if have to reverse all variables
        else if(kind_x == 1 && kind_y == 1)
        {
            array.sort(xDescYDesc);
        }
        //if have to reverse only x
        else if(kind_x == 1 && kind_y == 0)
        {
            array.sort(xDescYAsc);
        }
        //if have to reverse only y
        else if(kind_x == 0 && kind_y == 1)
        {
            array.sort(xAscYDesc);
        }
        else
            alert('Error parsing "kind_x","kind_y" params in sortCoords() \nkind_x: '+ kind_x + '\nkind_y ' + kind_y)
        return array;
     }
     
     function isArray(obj) {
         //returns true is it is an array
         if (obj.constructor.toString().indexOf('Array') == -1)
             return false;
         else
             return true;
         }
         
         
         
         //function of standart reaction of  keyup in set label window
         function standart_set_label_preview()
         {
            var row_start = jq('#windows_group_label_row_start').val();
            var num_start = jq('#windows_group_label_number_start').val();
            var row_dir = jq("input[name=radio_row_start]:checked").val();
            var num_dir = jq("input[name=radio_number_start]:checked").val();
            var rows_are = jq("input[name=advanced_windows_group_label_rows_are]:checked").val() ;
            var numbers_are =jq("input[name=advanced_windows_group_label_numbers_are]:checked").val();
            var hallObjAll = sortCoords(createObjectHall(3,3,row_start,1,rows_are, num_start,'inc'),row_dir,num_dir,numbers_are);
            var hallObjOdd = sortCoords(createObjectHall(3,3,row_start,1,rows_are, num_start,'pass_one'),row_dir,num_dir,numbers_are);
            num_start++;
            var hallObjEven = sortCoords(createObjectHall(3,3,row_start,1,rows_are, num_start,'pass_one'),row_dir,num_dir,numbers_are);
            //draw  hall with inc of numbers
            var previewHallObjAll = drawPreview(hallObjAll, '.');
            jq('#sim_leb_all').html(previewHallObjAll);
            
            var previewHallObjOdd = drawPreview(hallObjEven,'.');
            jq('#sim_leb_odd').html(previewHallObjOdd);
            
            var previewHallObjEven = drawPreview(hallObjOdd,'.');
            jq('#sim_leb_even').html(previewHallObjEven);
            
            
         }
         
         
  
        
         
         //function for creating hall object
  function createObjectHall(rows,numbers,starting_row,row_increment,rows_are, number_start,number_increment,numbers_are)
            {
                if( isNaN(rows) || isNaN(numbers)) alert('Wrong values passed to'+
                                                          ' createObjectHall(rows,numbers,startin_row,row_increment, number_start)'
                                                          + '\nrows ' + rows 
                                                          + '\nnumbers ' + numbers);
                rows =(rows_are ==  0)? Number(rows):rows;
                numbers = (numbers_are ==  0)?Number(numbers):numbers;
                starting_row = (starting_row.length == 0)? 1: Number(starting_row);
                row_increment = (row_increment == undefined)? 1: Number(row_increment);
                //alert(row_increment); 
                number_start = (number_start == 0)? 1:Number(number_start);  
                //number_increment = (number_increment.length = 0)?number_increment =1:Number(number_increment); 
                var temp_hall = [];
                var key = 0;
                var seat_number = number_start;

                for(var i = starting_row; i< starting_row + rows * row_increment; i+=row_increment )
                {
                    
                    for(var j = 0; j<3; j++)
                    {
                        
                    
                    if(number_increment == 'fixed')
                    {
                        temp_hall[key] =  {};
                        temp_hall[key].x = i;
                        temp_hall[key].y = number_start;
                        key++;
                        
                    }
                    else if(number_increment == 'inc')
                    {
                        temp_hall[key] =  {};
                        temp_hall[key].x = i;
                        temp_hall[key].y = seat_number;
                        key++;
                        seat_number++;
                        //if(numbers_are == 0) seat_number++; else seat_number.incrementAllByOne();
                    }
                    else if(number_increment == 'pass_one')
                    {
                        temp_hall[key] =  {};
                        temp_hall[key].x = i;
                        temp_hall[key].y = seat_number;
                        key++;
                        seat_number+=2;
                        
                    }
                    
                }
                seat_number = number_start;
             }

             return temp_hall;
         }  
    
         //function of drawing a preview of the hall 
            function drawPreview(hall,delimiter)
            {
                if(!isArray(hall)) alert('Wrong params passed to drawPreview(hall) \nhall: ' + hall + '\ndelimiter' + delimiter);
                //function get first key
                function getFirstKey(hall)
                {
                    for(var key in hall)
                       return hall[key][0];
                }
                var row_coord = getFirstKey(hall);
                var result = '<tr>';
                //alert(hall);
                jq.each(hall,function(key,val){
                    
                    if(row_coord == val[0])
                    {
//                        alert(val[0]);
                        result += '<td style="width:100px" >&nbsp' + val[0] + delimiter + val[1] + '&nbsp</td>';
                    }
                    else
                    {
                        row_coord = val[0];
                        result += '<td style="width:150px"></td></tr><tr><td style="width:150px">&nbsp' + val[0] + delimiter + val[1] + '&nbsp</td>';
                        
                    }
                  
                })
                result+= '</tr>';
                return result;
                
            }
            //if the hall is object
            function drawPreviewObject(hall,delimiter)
            {
                if(!isArray(hall)) alert('Wrong params passed to drawPreview(hall) \nhall: ' + hall + '\ndelimiter' + delimiter);
                //function get first key
                function getFirstKey(hall)
                {
                    for(var key in hall)
                       return hall[key].x;
                }
                var row_coord = getFirstKey(hall);
                var result = '<tr>';
                //alert(hall);
                jq.each(hall,function(key,val){
                    
                    if(row_coord == val.x)
                    {
//                     
 result += '<td style="width:100px" >&nbsp' + val.x + delimiter + val.y + '&nbsp</td>';
                    }
                    else
                    {
                        row_coord = val.x;
                        result += '<td style="width:150px"></td></tr><tr><td style="width:150px">&nbsp' + val.x + delimiter + val.y + '&nbsp</td>';
                        
                    }
                  
                })
                result+= '</tr>';
                return result;
                
            }

     // function that anwsers for putting row numbers in the hall
     function ticketSeats(array,ticketSeats_row,ticketSeats_number,variant)
     {
        //basic validation
        if(ticketSeats_row.length == 0 || ticketSeats_number.length == 0
            || !isArray(array))
            alert('Error in ticketSeats(array,ticketSeats_row,ticketSeats_number)\n array: '+ array
                 +'\nticketSeats_row: '+ ticketSeats_row + '\nticketSeats_number: ' + ticketSeats_number);
        
        var x = getKey(array);
        var starting_row  = ticketSeats_row; 
        
        if(variant == 'all' || variant == 'odd')
        var starting_number = ticketSeats_number;
        else if(variant == 'even')
        var starting_number =(isNaN(ticketSeats_number))?String.fromCharCode(ticketSeats_number.charCodeAt() + 1)
                                  :(Number(ticketSeats_number)+1).toString(); 
        
        for(var key in array)
        {
            if(array[key][0] == x)
            {
                var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                cell.attr('title', starting_row + '.' + starting_number);
                
                if(variant == 'all')
                starting_number = (isNaN(starting_number))?String.fromCharCode(starting_number.charCodeAt() + 1)
                                  :(Number(starting_number)+1).toString();
                else if(variant == 'odd' || variant == 'even')
                starting_number = (isNaN(starting_number))?String.fromCharCode(starting_number.charCodeAt() + 2)
                                  :(Number(starting_number)+2).toString();
            }
            else
            {
        if(variant == 'all' || variant == 'odd')
        starting_number = ticketSeats_number;
        else if(variant == 'even')
        starting_number =(isNaN(ticketSeats_number))?String.fromCharCode(ticketSeats_number.charCodeAt() + 1)
                                  :(Number(ticketSeats_number)+1).toString(); 
                starting_row  = (isNaN(starting_row))?String.fromCharCode(starting_row.charCodeAt() + 1)
                               :(Number(starting_row)+1).toString();
                var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                cell.attr('title', starting_row + '.' + starting_number);
                x = array[key][0];
                if(variant == 'all')
                starting_number = (isNaN(starting_number))?String.fromCharCode(starting_number.charCodeAt() + 1)
                                  :(Number(starting_number)+1).toString();
                else if(variant == 'odd' || variant == 'even')
                starting_number = (isNaN(starting_number))?String.fromCharCode(starting_number.charCodeAt() + 2)
                                  :(Number(starting_number)+2).toString();
                
            }
            //alert(active_x + '\n'+ active_y);
        }
        
            return array;
        
                 
     }
     
     // funciton of obiaining seat_id lf selected seats
     function square_labelGetId(array)
     {
         if(!isArray(array))
             alert('Error parsing "array" in square_labelGetId(array) \narray: ' + array);
         var seat = [];
         for(var key in array)
         {

            var img = jq('#' + array[key][0] + '_'+ array[key][1] + ' img.seat');
            var label = img.attr('title');
            var temp = label.match(regex_label);
            seat[key] = {};
            seat[key].id = img.attr('id');
            seat[key].row  = array[key][0];
            seat[key].number  = array[key][1];
            seat[key].delimiter = '.';
            seat[key].label =label;
         }   
         
         return seat;
     }
     
     //function of setting label for selected seats
     function square_label(for_seats)
     {
        var windows_group_label = jq('#windows_group_label');
        var winH = jq(window).height();
        var winW = jq(window).width();
        windows_group_label.css('top', winH/2 - windows_group_label.height()/2)
                           .css('left', winW/2 - windows_group_label.width()/2)
                           .css('z-index', '1')
                           .show();
        standart_set_label_preview()
        jq('input[name=radio_number_start],input[name=radio_row_start]').unbind('click').click(function(){
            standart_set_label_preview();
        });
       jq('#windows_group_label_row_start').keyup(function(){
           this.value = this.value.replace(regex_row,'');
            
            standart_set_label_preview();
        });
        jq('#windows_group_label_number_start').keyup(function(){
           this.value = this.value.replace(regex_number,'');
            
            standart_set_label_preview();
            
        })                   
        jq('#windows_group_label>a.close').unbind('click').click(function(){
            jq('#group_label').attr('src', icon_label_group);
            unselectSeats();
            unselectBlock();
            
            windows_group_label.hide();
            jq('#square_label').attr('src', icon_label_group);
        });
        
        jq('#windows_group_label a.ok').unbind('click').click(function(){
            var row_starting = jq('#windows_group_label_row_start').val();
            //if starting_from = 0 - it's' Top to bottom
            //if starting_from = 1 - it's Bottom to top'
            var starting_from = jq("input[name=radio_row_start]:checked").val();
            var number_starting = jq('#windows_group_label_number_start').val();
            ///same as starting_from
            var numbers_from = jq("input[name=radio_number_start]:checked").val();

            var variant = jq("input[name=variant]:checked").val();
            
            var array = sortCoords(for_seats,starting_from,numbers_from);
            /*alert('Row start: ' +row_starting+ ' starting from: code ' + starting_from 
                  + '\nNumber start: ' + number_starting + ' Code: ' + numbers_from+ '\nvariant: '+ variant); 
            */
            
            ticketSeats(array,row_starting,number_starting,variant);
            
            var action = 'square_set_label';
            var hallid = 1;
            var params =  {};
            params['object'] = square_labelGetId(array); 
            var dataSend = {'hallid':hallid,'action':action, 'params': params };

                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            unselectSeats();
            unselectBlock();
            windows_group_label.hide();
            jq('#square_label').attr('src', icon_label_group);
            jq('#group_label').attr('src', icon_label_group)
                            
                        }
                    });                  
            
            
            
        });
        
        
  /* sort objects */
              function stringAscDesc(a1, a2)
            {
                if(a1[0] == a2[0])return a2[1].localeCompare(a1[1]);
                else return   a1[0] - a2[0];
                
 
            }
              function stringAscAsc(a1, a2)
            {
                if(a1[0] == a2[0])return a1[1].localeCompare(a2[1]);
                else return   a1[0] - a2[0];
                
            }
              function stringDescAsc(a1, a2)
            {
                if(a1[0] == a2[0])return a1[1].localeCompare(a2[1]);
                else return   a2[0] - a1[0];
                
            }
            
              function stringDescDesc(a1, a2)
            {
                if(a1[0] == a2[0])return a2[1].localeCompare(a1[1]);
                else return   a2[0] - a1[0];
            }

            
        function sortCoordsString(temp_hall,row_direction,number_direction)
        {
        var array = [];
        for(var key in temp_hall)
        {
            var key = [temp_hall[key].x,temp_hall[key].y]
            array.push(key);
        }
        if(row_direction == 0 && number_direction == 1)
        {
            array.sort(stringAscDesc);
        }
        else if(row_direction == 0 && number_direction == 0)
        {
            array.sort(stringAscAsc);
        }
        else if(row_direction == 1 && number_direction == 0)
        {
            array.sort(stringDescAsc);
        }
        else if(row_direction == 1 && number_direction == 1)
        {
            array.sort(stringDescDesc);
        }
        return array;
    }


    function sortCoordsStrNum(temp_hall,row_direction,number_direction)
    {
                        var array = [];
        for(var key in temp_hall)
        {
            var key = [temp_hall[key].x,temp_hall[key].y]
            array.push(key);
        }
        if(row_direction == 0 && number_direction == 1)
        {
            array.sort(StrNumAscDesc);
        }
        else if(row_direction == 0 && number_direction == 0)
        {
            array.sort(StrNumAscAsc);
        }
        else if(row_direction == 1 && number_direction == 0)
        {
            array.sort(StrNumDescAsc);
        }
        else if(row_direction == 1 && number_direction == 1)
        {
            array.sort(StrNumDescDesc);
        }
        return array;
    }
    
    function StrNumDescAsc(a1,a2)
    {
        if(a1[0] == a2[0]) return a1[1] - a2[1];
        else return a2[0].localeCompare(a1[0]);
    }
    function StrNumAscAsc(a1,a2)
    {
        if(a1[0] == a2[0]) return a1[1] - a2[1];
        else return a1[0].localeCompare(a2[0]);
    }
    function StrNumAscDesc(a1,a2)
    {
        if(a1[0] == a2[0]) return a2[1] - a1[1];
        else return a1[0].localeCompare(a2[0]);
    }
    function StrNumDescDesc(a1,a2)
    {
        if(a1[0] == a2[0]) return a2[1] - a1[1];
        else return a2[0].localeCompare(a1[0]);
    }
    
    
    function sortCoordsStrStr(temp_hall,row_direction,number_direction)
    {
                        var array = [];
        for(var key in temp_hall)
        {
            var key = [temp_hall[key].x,temp_hall[key].y]
            array.push(key);
        }
        if(row_direction == 0 && number_direction == 1)
        {
            array.sort(StrStrAscDesc);
        }
        else if(row_direction == 0 && number_direction == 0)
        {
            array.sort(StrStrAscAsc);
        }
        else if(row_direction == 1 && number_direction == 0)
        {
            array.sort(StrStrDescAsc);
        }
        else if(row_direction == 1 && number_direction == 1)
        {
            array.sort(StrStrDescDesc);
        }
         return array;
    }    
    function StrStrAscDesc(a1,a2)
    {
        if(a1[0] == a2[0]) return a2[1].localeCompare(a1[1]);
        else return a1[0].localeCompare(a2[0]);
    }
    function StrStrAscAsc(a1,a2)
    {
        if(a1[0] == a2[0]) return a1[1].localeCompare(a2[1]);
        else return a1[0].localeCompare(a2[0]);
    }
    function StrStrDescAsc(a1,a2)
    {
        if(a1[0] == a2[0]) return a1[1].localeCompare(a2[1]);
        else return a2[0].localeCompare(a1[0]);
    }
    function StrStrDescDesc(a1,a2)
    {
        if(a1[0] == a2[0]) return a2[1].localeCompare(a1[1]);
        else return a2[0].localeCompare(a1[0]);
    }
    
/*begin */        
        function advanced_windows_group_preview_label()
        {
            //numbers
            var number_direction =  jq('input[name=advanced_windows_group_label_number_directions]:checked').val();
            var number_starting  = jq('#advanced_windows_group_label_number_starting').val();
            var number_increment = jq('input[name=advanced_windows_group_label_numbers_increment]:checked').val();
            var number_numeric_increment = jq('#advanced_windows_group_label_numbers_numeric_increment').val();
            var number_are =Number(jq("input[name=advanced_windows_group_label_numbers_are]:checked").val());
//            alert(number_directions + '\n' + number_starting + '\n' + numbers_numeric_increment+ '\n' +  number_increment + '\n'+numbers_are);

            //rows
            var row_direction = jq('input[name=advanced_windows_group_label_row_directions]:checked').val();
            var row_starting = jq('#advanced_windows_group_label_row_starting').val();
            var row_are = jq("input[name=advanced_windows_group_label_rows_are]:checked").val() ;
            var row_starting = jq('#advanced_windows_group_label_row_starting').val()
            var row_increment =  jq('input[name=advanced_windows_group_label_row_increment]:checked').val();
            var row_numeric_increment = jq('#advanced_windows_group_row_numeric_increment').val();
//            alert(row_directions + '\n' + row_starting + '\n' + row_numeric_increment+ '\n' + row_increment+ '\n' + row_are);
            
            var delimiter = jq('#advanced_windows_group_label_delimiter').val();
            var rows = 3;
            var numbers = 3;
            var result = '<b>Params are not correct!</b>';
            var temp_hall = [];
            var key = 0;
            var sort;
            

          if(row_are == 0 && number_are == 0 && !isNaN(number_starting)
              && !isNaN(number_numeric_increment) && !isNaN(row_starting) && !isNaN(row_numeric_increment))
          {
            /* creating hall */
            number_starting = (number_starting == '')?1:Number(number_starting);
            number_numeric_increment = (number_numeric_increment == '')?1:Number(number_numeric_increment);
            row_starting  = (row_starting == '')?1:Number(row_starting);
            row_numeric_increment = (row_numeric_increment == '')? 1: Number(row_numeric_increment);
            
            for(var i = row_starting;i<row_starting +rows*row_numeric_increment; i+=row_numeric_increment)
            {
                for(var j = number_starting; j< number_starting + numbers*number_numeric_increment;j+=number_numeric_increment)
                {
                 temp_hall[key] = {};
                 temp_hall[key].x = i;
                 temp_hall[key].y = j;
                 key++;   
                }
                
            }
            //sorting coords
            sort = sortCoords(temp_hall,row_direction,number_direction);
            result = drawPreview(sort,delimiter);
          }
          else if(number_are == 1 && row_are == 0  && !isNaN(row_starting) && !isNaN(row_numeric_increment)  )
          {
            /* creating hall */
            number_starting = (number_starting == '')?'A':number_starting;
            var number_seat = number_starting;
            row_starting  = (row_starting == '')?1:Number(row_starting);
            row_numeric_increment = (row_numeric_increment == '')? 1: Number(row_numeric_increment);

             for(var i = row_starting;i<row_starting +rows*row_numeric_increment; i+=row_numeric_increment)
             {
                
                for(var j  =0;j<3; j++)
                {
                 temp_hall[key] = {};
                 temp_hall[key].x = i;
                 temp_hall[key].y = number_seat;
                 key++;   
                    
                    if( number_increment=='inc')
                    {
                        number_seat = number_seat.increment();
                    }
                    else if(number_increment == 'pass_one')
                    {
                        number_seat = number_seat.incrementByTwo();
                    }
                }
                number_seat = number_starting;

                     
                
           }

            sort =sortCoordsString(temp_hall,row_direction,number_direction);
            result = drawPreview(sort,delimiter);
             

            
          }   
          else if(number_are == 0 && row_are == 1  && !isNaN(number_starting) && !isNaN(number_numeric_increment)  )
          {
            
            // creating hall 
            row_starting = (row_starting == '')?'A':row_starting;
            var row_seat = row_starting;
            number_starting  = (number_starting == '')?1:Number(number_starting);
            number_numeric_increment = (number_numeric_increment == '')? 1: Number(number_numeric_increment);
            for(var  i = 0; i<3; i++)
            {
                for(var j = number_starting; j< number_starting + numbers*number_numeric_increment;j+=number_numeric_increment)
                {
                 temp_hall[key] = {};
                 temp_hall[key].x = row_seat;
                 temp_hall[key].y = j;
                 key++;   
                }
                if(row_increment == 'inc')
                {
                    row_seat = row_seat.increment();
                }
                else if(row_increment == 'pass_one')
                {
                    row_seat = row_seat.incrementByTwo();
                }
          }
          sort = sortCoordsStrNum(temp_hall,row_direction,number_direction);
            
            result = drawPreview(sort,delimiter);
          }   
          else if(number_are == 1 && row_are == 1 )
          {
            row_starting = (row_starting == '')?'A':row_starting;
            var row_seat = row_starting;
            number_starting = (number_starting == '')?'A':number_starting;
            var number_seat = number_starting;
            for(var  i = 0; i<3; i++)
            {
                for(var j = 0; j<3;j++)
                {
                 temp_hall[key] = {};
                 temp_hall[key].x = row_seat;
                 temp_hall[key].y = number_seat;
                 key++; 
                    if( number_increment=='inc')
                    {
                        number_seat = number_seat.increment();
                    }
                    else if(number_increment == 'pass_one')
                    {
                        number_seat = number_seat.incrementByTwo();
                    }
                   
                }
                number_seat = number_starting;
                if(row_increment == 'inc')
                {
                    row_seat = row_seat.increment();
                }
                else if(row_increment == 'pass_one')
                {
                    row_seat = row_seat.incrementByTwo();
                }
                sort = sortCoordsStrStr(temp_hall,row_direction,number_direction);
                
            
            result = drawPreview(sort,delimiter);                
          }
      }
          jq('#group_label_preview').html(result);
            
        }
/* End */        
        
        
            function advancedTicketSeats(array,delimiter,
                                  number_starting,number_numeric_increment,number_increment,number_are,
                                  row_starting,row_increment,row_numeric_increment, row_are)
            {
                if(number_are == 0 && row_are == 0 )
                {
                   var x = getKey(array);
                   var starting_row  =( row_starting != '')?Number(row_starting):1;
                   var starting_number = (number_starting!= '')?Number(number_starting):1;
                   var number_numeric_increment = (number_numeric_increment == '')?1:Number(number_numeric_increment);
                   var row_numeric_increment =(row_numeric_increment == '')?1: Number(row_numeric_increment);
                   
        
                   for(var key in array)
                   {
                      if(array[key][0] == x)
                      {
                          var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                          cell.attr('title', starting_row + delimiter + starting_number);
                          
                          starting_number+= number_numeric_increment;
                      }
                      else
                      {
                        var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                        starting_number = (number_starting!= '')?Number(number_starting):1;           
                        starting_row += row_numeric_increment
                        cell.attr('title', starting_row + delimiter + starting_number);
                        x = array[key][0];
                        starting_number+= number_numeric_increment;
                      }
                    }
            }
            else if(number_are == 1 && row_are == 0 )
            {
                   var x = getKey(array);
                   var starting_number = (number_starting != '')?number_starting: 'A' ;
                   var starting_row  =( row_starting != '')?Number(row_starting):1;
                   var row_numeric_increment = (row_numeric_increment != '')?Number(row_numeric_increment): 1 ;
                   for(var key in array)
                   {
                      if(array[key][0] == x)
                      {
                          var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                          cell.attr('title', starting_row + delimiter + starting_number);
                          
                          if(number_increment == 'inc')
                              starting_number = starting_number.increment()
                          else if(number_increment == 'pass_one')
                              starting_number = starting_number.incrementByTwo();
                      }
                      else
                      {
                        var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                        var starting_number = (number_starting == '')? 'A': number_starting;
                        starting_row += row_numeric_increment
                        cell.attr('title', starting_row + delimiter + starting_number);
                        x = array[key][0];
                          if(number_increment == 'inc')
                              starting_number = starting_number.increment();
                          else if(number_increment == 'pass_one')
                              starting_number = starting_number.incrementByTwo();
                      }
                   }
                   
            }
            else if(number_are == 0 && row_are == 1 )
            {
                   var x = getKey(array);
                   var starting_number = (number_starting!= '')?Number(number_starting):1;
                   var number_numeric_increment = (number_numeric_increment != '')?Number(number_numeric_increment):1;
                   var starting_row  = (starting_row == '')? 'A': row_starting;
                   for(var key in array)
                   {
                    
                      if(array[key][0] == x)
                      {
                          var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                          cell.attr('title', starting_row + delimiter + starting_number);
                          
                          starting_number+= number_numeric_increment;
                          
                      }
                      else
                      {
                        var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                        starting_number = (number_starting == '')?1:Number(number_starting);
                        
                        if(row_increment == 'inc')
                            starting_row = starting_row.increment();
                        else if(row_increment == 'pass_one')
                            starting_row = starting_row.incrementByTwo();
                        
                        cell.attr('title', starting_row + delimiter + starting_number);
                        x = array[key][0];
                        starting_number+= number_numeric_increment;
                        
                      }
                      
                   }

            }
                else if(number_are == 1 && row_are == 1 )
                {
                   var x = getKey(array);
                   var starting_number = (number_starting == '')? 'A': number_starting;
                   var starting_row  = (row_starting == '')? 'A': row_starting;
                   for(var key in array)
                   {
                    
                      if(array[key][0] == x)
                      {
                          var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                          cell.attr('title', starting_row + delimiter + starting_number);
                          
                          if(number_increment == 'inc')
                              starting_number = starting_number.increment()
                          else if(number_increment == 'pass_one')
                              starting_number = starting_number.incrementByTwo();
                          
                      }
                      else
                      {
                        var starting_number = (number_starting == '')? 'A': number_starting;
                        
                        if(row_increment == 'inc')
                            starting_row = starting_row.increment();
                        else if(row_increment == 'pass_one')
                            starting_row = starting_row.incrementByTwo();

                        var cell = jq('#' + array[key][0] + '_' + array[key][1] + ' img.seat');
                        cell.attr('title', starting_row + delimiter + starting_number);
                        x = array[key][0];
                          if(number_increment == 'inc')
                              starting_number = starting_number.increment()
                          else if(number_increment == 'pass_one')
                              starting_number = starting_number.incrementByTwo();
                        
                      }
                      
                   }
                    
                }

            }          
            
        
        
        jq('#windows_group_label a.advanced').unbind('click').click(function(){
            windows_group_label.hide();
            var advanced_windows_group_label = jq('#advanced_windows_group_label');
            advanced_windows_group_label.css('top', winH/2 - advanced_windows_group_label.height()/2)
                           .css('left', winW/2 - advanced_windows_group_label.width()/2)
                           .css('z-index', '1')
                           .show();
                           
            advanced_windows_group_preview_label();
            
            jq('#advanced_windows_group_label a.close').unbind('click').click(function(){
            jq('#group_label').attr('src', icon_label_group);
            unselectSeats();
            unselectBlock();
            jq('#square_label').attr('src', icon_label_group);
            advanced_windows_group_label.hide();
          
            });
            
            //validating the input 
           jq('#advanced_windows_group_row_numeric_increment')
               .unbind('keyup').keyup(function(){
                    this.value = this.value.replace(regex_alphanumeric,'');
               advanced_windows_group_preview_label();
               });
           jq('#advanced_windows_group_label_row_starting')
               .unbind('keyup')
               .keyup(function(){
                    
                    this.value = this.value.replace(regex_alphanumeric,'');
                    advanced_windows_group_preview_label();     
               });
               
            jq('#advanced_windows_group_label_number_starting')
               .unbind('keyup')
               .keyup(function(){
                    this.value = this.value.replace(regex_alphanumeric,'');
                    advanced_windows_group_preview_label();     
               });
            jq('#advanced_windows_group_label_numbers_numeric_increment')
               .unbind('keyup')
               .keyup(function(){
                    this.value = this.value.replace(regex_alphanumeric,'');
                    advanced_windows_group_preview_label();     
               });
               
               
            jq(' #advanced_windows_group_label_delimiter')
               .unbind('keyup')
               .keyup(function(){
                    this.value = this.value.replace(regex_delimiter,'');
                    advanced_windows_group_preview_label();     
               });
               
               
               //of radio change the preview
           
           jq('input[name=advanced_windows_group_label_numbers_increment], '
              + 'input[name=advanced_windows_group_label_row_increment], '
              + 'input[name=advanced_windows_group_label_row_directions], '
              + 'input[name=advanced_windows_group_label_number_directions]')
               .unbind('click')
               .click(function(){
                   advanced_windows_group_preview_label(); 
               });
              


              jq('input[name=advanced_windows_group_label_rows_are]').unbind('click').click(function(){
                var value = jq('input[name=advanced_windows_group_label_rows_are]:checked').val();
                if(value == '0' )
                {
                       jq('#advanced_windows_group_label_row_starting').val('1');
                        jq('#row_numeric').show();
                        jq('#row_alphanumeric').hide();
                }
                else if (value == '1')
                {
                       jq('#advanced_windows_group_label_row_starting').val('A');
                        jq('#row_numeric').hide();
                        jq('#row_alphanumeric').show();
                    
                }
                advanced_windows_group_preview_label()
              });
              
              jq('input[name=advanced_windows_group_label_numbers_are]').unbind('click').click(function(){
                var value = jq('input[name=advanced_windows_group_label_numbers_are]:checked').val();
                if(value == '0' )
                {
                       jq('#advanced_windows_group_label_number_starting').val('1');
                        jq('#numbers_numeric').show();
                        jq('#numbers_alphanumeric').hide();
                }
                else if (value == '1')
                {
                       jq('#advanced_windows_group_label_number_starting').val('A');
                        jq('#numbers_numeric').hide();
                        jq('#numbers_alphanumeric').show();
                    
                }
                     advanced_windows_group_preview_label()

              }) 
          













          jq('#advanced_windows_group_label a.ok').unbind('click').click(function(){
           


            var number_direction =  jq('input[name=advanced_windows_group_label_number_directions]:checked').val();
            
            //numbers
            var number_starting  = jq('#advanced_windows_group_label_number_starting').val();
            var number_increment = jq('input[name=advanced_windows_group_label_numbers_increment]:checked').val();
            var number_numeric_increment = jq('#advanced_windows_group_label_numbers_numeric_increment').val();
            var number_are =jq("input[name=advanced_windows_group_label_numbers_are]:checked").val();
            if(number_starting==undefined)number_starting =1;
            if(number_numeric_increment == undefined)number_numeric_increment = 1;
            
            //rows
            var row_direction = jq('input[name=advanced_windows_group_label_row_directions]:checked').val();
            var row_are = jq("input[name=advanced_windows_group_label_rows_are]:checked").val() ;
            var row_starting = jq('#advanced_windows_group_label_row_starting').val()
            var row_increment =  jq('input[name=advanced_windows_group_label_row_increment]:checked').val();
            var row_numeric_increment = jq('#advanced_windows_group_row_numeric_increment').val();
            if(row_starting==undefined)row_starting =1;
            if(row_numeric_increment==undefined)row_numeric_increment = 1;
            

            var delimiter = jq('#advanced_windows_group_label_delimiter').val();
            //var result = row+delimiter+number;
            
            
            var array = 'error';
            
           
          if(row_are == 0 && number_are == 0 )
          {
             array = sortCoords(for_seats,row_direction,number_direction);
          }
          else if(number_are == 1 && row_are == 0   )
          {
            array =sortCoords(for_seats,row_direction,number_direction);

          }   
          else if(number_are == 0 && row_are == 1 )
          {
              array = sortCoords(for_seats,row_direction,number_direction);
          }   
          else if(number_are == 1 && row_are == 1 )
          {
                array = sortCoords(for_seats,row_direction,number_direction);
          }


          if(array != 'error')
          {
                advancedTicketSeats(array,delimiter,
                                  number_starting,number_numeric_increment,number_increment,number_are,
                                  row_starting,row_increment,row_numeric_increment, row_are);           
            var action = 'square_set_label';
            var hallid = 1;
            var params =  {};
            params['object'] = square_labelGetId(array); 
            var dataSend = {'hallid':hallid,'action':action, 'params': params };

                    jq.ajax({
                        data: dataSend,
                        success: function(response){
                            unselectSeats();
                            jq('#group_label').attr('src', icon_label_group);
            
                            unselectBlock();
                            unselectSeats();
                            advanced_windows_group_label.hide();
                            jq('#square_label').attr('src', icon_label_group);
                            jq('#group_label').attr('src', icon_label_group);
                        }
                        
                    });                  
            
            

          }  
            
            
            
            
            
          });

        });
        
        
     }
    
    jq('#square_label').unbind('click').click(function(){
       var for_seats = SelectedTdFilterSeats(selected_coords, 'seats');
         if(numKeys(for_seats)>0  && unselecting == true)
      {
         jq(this).attr('src', icon_label_group_selected);
         square_label(for_seats);

      }
      else
          alert('Some seats must be selected!');           
    });
    
    
    jq('#upload_background').unbind('click').click(function(){
        var image = jq(this);
        var upload_area = jq('#upload-area');
        var winH = jq(window).height();
        var winW = jq(window).width();
        
        upload_area.css('top', winH/2 - upload_area.height()/2)
                           .css('left', winW/2 - upload_area.width()/2)
                           .css('z-index', '1')
                           .show();
     
         var uploader = new qq.FileUploader({
    // pass the dom node (ex. $(selector)[0] for jQuery users)
    element: document.getElementById('file-uploader'),
    // path to server-side upload script
    action: '/skins/js/upload.php',
    allowedExtensions: ['png', 'gif', 'bmp', 'jpg'],
    
    onComplete: function(id, fileName, responseJSON){
        if(responseJSON.success == true)
        {
            jq('#grid').css('background', 'url(/upload/' + fileName + ') no-repeat 0 0')
                       .css('-webkit-background-size','cover')
                       .css('-moz-background-size','cover')
                       .css('-o-background-size','cover')
                       .css('background-size','cover');
            jq('#upload-area').hide();

        }
    }
    
});

    
      
       
                           
      jq('#upload-area a.close').unbind('click').click(function(){
            jq('#upload-area').hide();
            image.attr('src',icon_upload_background);
        });


    })
    
    
    
    
    
    
});

