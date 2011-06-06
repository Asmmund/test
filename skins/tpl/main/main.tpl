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

        <tr><td>Number start: [ ] </td><td><input type="text" maxlength="4" value="1" size="4" id="windows_group_label_number_start" /></td>
            <td><input type="radio" name="radio_number_start" value="0" checked="checked" />Left to right</td>
            <td><input type="radio" name="radio_number_start" value="1" />Right to left</td>
        </tr>

            <tr>
       
         <td>Row start: [ ] </td><td><input type="text" maxlength="4" size="4" id="windows_group_label_row_start" value="1" /></td>
            <td><input type="radio" name="radio_row_start" value="0" checked="checked" />Top to bottom</td>
            <td><input type="radio" name="radio_row_start" value="1" />Bottom to top</td>
        
            </tr>
        </table>

        <div class="example">
                        <input type="radio" name="variant" value="all" checked="checked" />All Numbers
            <table>
                <div id="sim_leb_all">
               </div>
            </table>
      </div>

      
        <div class="example">
        <input type="radio" name="variant" value="odd" />Even numbers


            <table>
                <div id="sim_leb_odd">
               </div>
            </table>
      </div>

        <div class="example">
                     <input type="radio" name="variant" value="even" />Odd numbers
            <table>
                <div id="sim_leb_even">
               </div>
            
            </table>
            
      </div>
        <a class="ok" href="javascript:void(0);">OK</a>
        <a class="advanced" href="javascript:void(0);" >Advanced</a>
      
      
    </div>
         
   <div id="advanced_windows_group_label">
        <h3>Set label - advanced</h3>
        <a class="close" href="javascript:void(0);">Close</a>
        <div style="clear:both;"></div>
        
                <div class="set">
                <table>
                <tr>
                    <td>Number directions:</td>
                    <td><input type="radio" name="advanced_windows_group_label_number_directions" value="0" checked="checked" />Left to rignt</td>
                    <td><input type="radio" name="advanced_windows_group_label_number_directions" value="1" />Right to left</td>
                </tr>
                <tr>
                    <td>Row directions:</td>
                    <td><input type="radio" name="advanced_windows_group_label_row_directions" value="0" checked="checked" />Top to bottom</td>
                    <td><input type="radio" name="advanced_windows_group_label_row_directions" value="1" />Bottom to top</td>
                </tr>

                </table>
                </div>
                
                <div class="set">
                <table>
                <tr>
                    <td>Rows are:</td>
                    <td><input type="radio" name="advanced_windows_group_label_rows_are" value="0" checked="checked" />Numeric</td>
                    <td><input type="radio" name="advanced_windows_group_label_rows_are" value="1" />Alphanumeric</td>
                </tr>                
                <tr>
                    <td>Numbers are:</td>
                    <td><input type="radio" name="advanced_windows_group_label_numbers_are" value="0" />Numeric</td>
                    <td><input type="radio" name="advanced_windows_group_label_numbers_are" value="1" checked="checked" />Alphanumeric</td>
                </tr>  
                </table>              
                </div>

                <div class="set">
                <table>
                <tr>
                    <td>Row start: [ ] <input type="text"  value="1" id="advanced_windows_group_label_row_starting" size="4" maxlength="4" /></td>
                    <td>Row increment: [ ]  <input type="text"  value="1" id="advanced_windows_group_label_row_increment" size="4" maxlength="4" /></td>
                </tr>                
                <tr>
                    <td>Number start: [ ] <input type="text"  value="1" id="advanced_windows_group_label_number_starting" size="4" maxlength="4" /> </td>
                    <td>Number increment:</td>
                    <td>
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="fixed" />Fixed(A, A, A ...)<br />
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="inc" checked="checked" />A,B,C,D ...<br />  
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="pass_one" />A,C,E,F ...
                                          </td> 
                </tr>
                </table>              
                </div>
                
                <div class="set">
                <table>
                <tr>
                    <td>Character between row and number: [ ] <input type="text"  value="." id="advanced_windows_group_label_delimiter" size="1" maxlength="1" /></td>
                    
                </tr>
                 <tr class="preview">
                 <td>Preview:<table id="group_label_preview"></table></td>
                 <td></td>
                 <td ></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 </tr>
                </table>              
                </div>
                
         <a class="ok" href="javascript:void(0);">OK</a>

        </div>
   
         

</div>
  


    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->