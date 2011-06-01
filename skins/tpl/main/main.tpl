<!-- shins/tpl/main/main.tpl begin-->

    <!-- windows-->
<div id="boxes">
    <div id="dialog" class="window">
    
        <p>Editing Seat information</p>
        <table>
        <tr>
            <td >Row:</td><td ><input type="text" id="edit_seat_row" size="10" maxlength="10" /> </td>
        </tr><br />
        <tr>
            <td>Number:</td>
            <td><input type="text" id="edit_seat_number" size="10" maxlength="10" /></td>
        </tr><br />
        <tr>
            <td>Character between row and number:<pre>[\_/|. ]</td><td></pre><input type="text" id="edit_seat_delimiter" size="10" maxlength="1" /></td>
        </tr><br />
        <tr>
            <td>Preview:</td> <td><p id="label_preview"></p></td>
        </tr><br />
         
         
         </table>
        <!-- close button is defined as close class -->
        <a class="close"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="48" height="48" /></a>
        <a class="save"><img src="<?php echo SITE_HOST;?>skins/images/save_icon.jpg" width="48" height="48" /></a>
        
        
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
        <a class="close" href="javascript:void(0);">Close</a><a class="save" href="javascript:void(0);">Save</a>
        
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
        <a class="close" href="javascript:void(0);">Close</a><a class="save" href="javascript:void(0);">Save</a>
        
    </div>
    
    <div id="select_category_for_group">
        <p class="list">select_category_for_group</p>
        <a class="close" href="javascript:void(0);">Close</a><a class="save" href="javascript:void(0);">Save</a>
    </div>

    <div id="choose_rotation">
        <p>Select angle of rotation</p>
        <select id="choose_rotation_angle">
            <option value="">Normal</option>
            <option value="45">45</option>
            <option value="90">90</option>
            <option value="135">135</option>
            <option value="180">180</option>
            <option value="225">225</option>
            <option value="270">270</option>
            <option value="315">315</option>
        </select><br />
        <a class="close"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="48" height="48" /></a>
        <a class="save"><img src="<?php echo SITE_HOST;?>skins/images/save_icon.jpg" width="48" height="48" /></a>
        
    </div>
    
    <div id="windows_group_label">
        <h3>Set label</h3>
        <a class="close" href="javascript:void(0);">Close</a>
        <div style="clear:both;"></div>
        <table>
            <tr>
       
         <td>Row Start:</td><td><input type="text" maxlength="1" size="1" id="windows_group_label_row_start" value="1" /></td>
            <td><input type="radio" name="radio_row_start" value="0" checked="checked" />Top to bottom</td>
            <td><input type="radio" name="radio_row_start" value="1" />Bottom to top</td>
        
            </tr>
        <tr><td>Number Start:</td><td><input type="text" maxlength="1" value="1" size="1" id="windows_group_label_number_start" /></td>
            <td><input type="radio" name="radio_number_start" value="0" checked="checked" />Left to right</td>
            <td><input type="radio" name="radio_number_start" value="1" />Right to left</td>
        </tr>
        </table>


        <div class="example">
            <table>
            <tr>
            	<td><input type="radio" name="variant" value="1" checked="checked" /></td>
            	<td>10.1</td>
            	<td>10.2</td>
            	<td>10.3</td>
            	<td>...</td>
            	<td></td>
            </tr>
            <tr>
            	<td></td>
            	<td>11.1</td>
            	<td>11.2</td>
            	<td>11.3</td>
            	<td>...</td>
            	<td></td>
            </tr>
            <tr>
            	<td></td>
            	<td>...</td>
            	<td></td>
            	<td></td>
            	<td></td>
            	<td></td>
            </tr>
            </table>
      </div>
      
        <div class="example">
            <table>
            <tr>
            	<td><input type="radio" name="variant" value="2" /></td>
            	<td>10.1</td>
            	<td>10.3</td>
            	<td>10.5</td>
            	<td>...</td>
            	<td>(oneven numbers)</td>
            </tr>
            <tr>
            	<td></td>
            	<td>11.1</td>
            	<td>11.3</td>
            	<td>11.5</td>
            	<td>...</td>
            	<td></td>
            </tr>
            <tr>
            	<td></td>
            	<td>...</td>
            	<td></td>
            	<td></td>
            	<td></td>
            	<td></td>
            </tr>
            </table>
      </div>

        <div class="example">
            <table>
            <tr>
            	<td><input type="radio" name="variant" value="3" /></td>
            	<td>10.2</td>
            	<td>10.4</td>
            	<td>10.6</td>
            	<td>...</td>
            	<td>(even numbers)</td>
            </tr>
            <tr>
            	<td></td>
            	<td>11.2</td>
            	<td>11.4</td>
            	<td>11.6</td>
            	<td>...</td>
            	<td></td>
            </tr>
            <tr>
            	<td></td>
            	<td>...</td>
            	<td></td>
            	<td></td>
            	<td></td>
            	<td></td>
            </tr>
            </table>
            
        <a class="ok" href="javascript:void(0);">OK</a>
        <a class="advanced" href="javascript:void(0);" >Advanced</a>
      </div>
      
      
    </div>
         
   <div id="advanced_windows_group_label">
        <h3>Set label</h3>
        <a class="close" href="javascript:void(0);">Close</a>
        <div style="clear:both;"></div>
   
   </div>      
         

</div>
  


    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->