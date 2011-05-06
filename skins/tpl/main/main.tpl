<!-- shins/tpl/main/main.tpl begin-->
<div id="boxes">
 
     
    <!-- #customize your modal window here -->
 
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
    
</div>
  
    <div id="window_edit_categories">
        <p>Window Editing categories</p>
         <div id="window_list_categories">
         
         </div>
         
         <div class="close">Close</div> 
        <!-- close button is defined as close class -->
 
    </div>

    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->