<!-- shins/tpl/main/main.tpl begin-->


    <!-- windows-->
<div id="boxes">
    <div id="dialog" class="window">
        <p>Editing Seat information</p>
         <div>Label: <input type="text" id="label" size="15" /> </div> <br />
         
         
        <!-- close button is defined as close class -->
        <div class="save"><img src="<?php echo SITE_HOST;?>skins/images/save_icon.jpg" width="48" height="48" /></div>
        <div class="cancel"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="48" height="48" /></div>
        
    </div>
 
     
     <a href="javascript:void();" id="edit_categories">Edit categories</a>
    <!-- Do not remove div#mask, because you'll need it to fill the whole screen --> 
    <div id="mask"></div>
    
    <!-- Categories editing window --> 
    <div id="window_edit_categories">
        <p>Window Editing categories</p>
        <a href="javascript:void();" class="add_category">Add Category</a>
         <div id="window_list_categories">
         
         </div>
         
         <div class="close">Close</div> 
        <!-- close button is defined as close class -->
    </div>
    
    <div id="add_category">
        Name: <input type="text" size="20" id="name" /> <br />
        Color: <select id="color">
               <option value="green">Green</option>
               <option value="red">Red</option>
               <option value="blue">Blue</option>
               <option value="yellow">Yellow</option>
               <option value="violet">Violet</option>
               </select><br />
        <a class="save" href="javascript:void();">Save</a> <a class="close" href="javascript:void();">Close</a>
        
    </div>

</div>
  

    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->