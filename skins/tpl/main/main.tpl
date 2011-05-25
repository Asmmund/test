<!-- shins/tpl/main/main.tpl begin-->

    <!-- windows-->
<div id="boxes">
    <div id="dialog" class="window">
        <p>Editing Seat information</p>
         <div>Row: <input type="text" id="edit_seat_row" size="10" /> </div> <br />
         <div>Number: <input type="text" id="edit_seat_number" size="10" /> </div> <br />
         <div>Character between row an number: <input type="text" id="edit_seat_delimiter" size="1" /> </div> <br />
         
         
         
        <!-- close button is defined as close class -->
        <div class="save"><img src="<?php echo SITE_HOST;?>skins/images/save_icon.jpg" width="48" height="48" /></div>
        <div class="cancel"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="48" height="48" /></div>
        
    </div>
 
     
     <a href="javascript:void(0);" id="edit_categories">Edit categories</a>
    <!-- Do not remove div#mask, because you'll need it to fill the whole screen --> 
    <div id="mask"></div>
    
    <!-- Categories editing window --> 
    <div id="window_edit_categories">
        <a href="javascript:void(0);" class="add_category">Add Category</a>
         <div id="window_list_categories">
         
         </div>
         
         <a href="javascript:void(0);" class="close">Close</a> 
        <!-- close button is defined as close class -->
    </div>
    
    <div id="add_category">
        Name: <input type="text" size="20" id="name" /><br />
        Color: <select id="color">
               <option value="green">Green</option>
               <option value="red">Red</option>
               <option value="blue">Blue</option>
               <option value="yellow">Yellow</option>
               <option value="violet">Violet</option>
               </select><br />
        <a class="save" href="javascript:void(0);">Save</a><a class="close" href="javascript:void(0);">Close</a>
        
    </div>

    <div id="edit_category_window">
         <input type="hidden" id="edit_category_window_seatcategory_id" value="0" />
         <p>Edit Category Information</p>
        Name: <input type="text" size="20" id="edit_category_window_name" /> <br />
        Color: <select id="edit_category_window_color">
               <option value="green">Green</option>
               <option value="red">Red</option>
               <option value="blue">Blue</option>
               <option value="yellow">Yellow</option>
               <option value="violet">Violet</option>
               </select><br />
        <a class="save" href="javascript:void(0);">Save</a><a class="close" href="javascript:void(0);">Close</a>
        
    </div>
    
    <div id="select_category_for_group">
        <p class="list">select_category_for_group</p>
        <a class="save" href="javascript:void(0);">Save</a><a class="close" href="javascript:void(0);">Close</a>
    </div>


</div>
  


    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->