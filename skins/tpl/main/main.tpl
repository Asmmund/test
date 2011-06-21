    <!-- shins/tpl/main/main.tpl begin-->

    <!-- windows-->
    <div id="dialog" class="window">
        <a class="close img"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="24" height="24" /></a>
    
        <p>Editing Seat information</p>
        <table>
        <tr>
            <td >Row:</td><td ><input type="text" id="edit_seat_row" size="4" maxlength="4" /> </td>
        </tr><br />
        <tr>
            <td>Number:</td>
            <td><input type="text" id="edit_seat_number" size="4" maxlength="4" /></td>
        </tr><br />
        <tr>
            <td>Character between row and number:</td><td><input type="text" id="edit_seat_delimiter" size="1" maxlength="1" /></td>
        </tr><br />
        <tr>
            <td>Preview:</td> <td><p id="label_preview"></p></td>
        </tr><br />
         
         
         </table>
        <!-- close button is defined as close class -->
        <a class="close" href="javascript:void(0);">Cancel</a>&nbsp;
        <a class="save" href="javascript:void(0);">Save</a><br /><br />
        
        
    </div>
    
    <div id="window_edit_categories">
        <a class="close img"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="24" height="24" /></a>
        <p>Edit categories</p>
        <br />
        <a href="javascript:void(0);" class="add_category">Add Category</a>
         <div id="window_list_categories">
         
         </div>
         
         <a href="javascript:void(0);" class="close">Close</a> 
        <!-- close button is defined as close class -->
    </div>

    <div id="add_category">
    <a class="close img" ><img width="24" height="24" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>
    <p>Add category</p>
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
        <a href="javascript:void(0);" class="close img"><img src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg" width="24" height="24" /></a>
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
        <a class="close" href="javascript:void(0);" ><img class="close img" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>
       <div>Select category for group</div>
        <p class="list"></p>
        <a class="close" href="javascript:void(0);">Close</a><a class="save" href="javascript:void(0);">Save</a>
        <br /><br />
    </div>

    <div id="choose_rotation">
        <a class="close" href="javascript:void(0);" ><img class="close img" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>
        <p>Select angle of rotation</p>
        <select id="choose_rotation_angle">
            <option value="0">Normal</option>
            <option value="45">45° clockwise</option>
            <option value="90">90° clockwise</option>
            <option value="135">135° clockwise</option>
            <option value="180">180°</option>
            <option value="225">135° counter clockwise</option>
            <option value="270">90° counter clockwise</option>
            <option value="315">45° counter clockwise</option>
        </select><br />
        <a href="javascript:void(0);" class="close">Close</a>
        <a href="javascript:void(0);" class="save">Save</a>
        <br /><br />
        
    </div>




    <div id="windows_group_label">
        <a class="close img" href="javascript:void(0);" ><img class="close img" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>

        <p >Set label</p>
        <div style="clear:both;"></div>
        <table>

        <tr><td>Number start: </td><td><input type="text" maxlength="4" value="1" size="4" id="windows_group_label_number_start" /></td>
            <td><input type="radio" name="radio_number_start" value="0" checked="checked" />Left to right</td>
            <td><input type="radio" name="radio_number_start" value="1" />Right to left</td>
        </tr>

            <tr>
       
         <td>Row start: </td><td><input type="text" maxlength="4" size="4" id="windows_group_label_row_start" value="1" /></td>
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
        <input type="radio" name="variant" value="even" />Even numbers


            <table>
                <div id="sim_leb_odd">
               </div>
            </table>
      </div>

        <div class="example">
                     <input type="radio" name="variant" value="odd" />Odd numbers
            <table>
                <div id="sim_leb_even">
               </div>
            
            </table>
            
      </div>
        <a href="javascript:void(0);" class="close">Close</a>
        <a class="ok" href="javascript:void(0);">Save</a>
        <a class="advanced" href="javascript:void(0);" >Advanced</a>
      
      
    </div>





   <div id="advanced_windows_group_label">
        <a class="close img" href="javascript:void(0);" ><img class="close img" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>
        <p class="bold">Set label - advanced</p>
        <div style="clear:both;"></div>
        
                
                <table>
                <tr>
                    <td><p class="bold">Seat numbers</p></td>
                </tr>
                <tr>
                    <td>Directions:</td>
                    <td><input type="radio" name="advanced_windows_group_label_number_directions" value="0" checked="checked" />Left to rignt</td>
                    <td><input type="radio" name="advanced_windows_group_label_number_directions" value="1" />Right to left</td>
                </tr>
                                <tr>
                    <td>Seat numbers are:</td>
                    <td><input type="radio" name="advanced_windows_group_label_numbers_are" value="0" checked="checked" />Numeric</td>
                    <td><input type="radio" name="advanced_windows_group_label_numbers_are" value="1"  />Alphanumeric</td>
                </tr>  
                 <tr>
                   <td>Seat number start:</td>
                   <td><input type="text"  value="1" id="advanced_windows_group_label_number_starting" size="4" maxlength="4" /></td>
                   <td></td>
                 </tr>
                 
                  <tr id="numbers_alphanumeric">
                    <td>Seat increment:</td>
                    <td>
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="fixed" />Fixed(A, A, A ...)<br />
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="inc" checked="checked" />A,B,C,D ...<br />  
                                          <input type="radio" name="advanced_windows_group_label_numbers_increment" value="pass_one" />A,C,E,F ...
                    </td>
                    <td></td>
                </tr>
                <tr id="numbers_numeric">
                    <td>Seat number increment:</td>
                    <td><input type="text" size="4" maxlength="4" value="1" id="advanced_windows_group_label_numbers_numeric_increment" /></td>
                    <td></td>
                </tr>










                
                <tr>
                    <td><p class="bold"><p class="bold">Row numbers</p></p></td>
                </tr>
                
                <tr>
                    <td>Directions:</td>
                    <td><input type="radio" name="advanced_windows_group_label_row_directions" value="0" checked="checked" />Top to bottom</td>
                    <td><input type="radio" name="advanced_windows_group_label_row_directions" value="1" />Bottom to top</td>
                </tr>
                <tr>
                    <td>Rows are:</td>
                    <td><input type="radio" name="advanced_windows_group_label_rows_are" value="0" checked="checked" />Numeric</td>
                    <td><input type="radio" name="advanced_windows_group_label_rows_are" value="1" />Alphanumeric</td>
                </tr>
                

                                
                <tr>
                    <td>Row start:</td>
                    <td><input type="text"  value="1" id="advanced_windows_group_label_row_starting" size="4" maxlength="4" /></td>
                    <td></td>
                </tr>
                 
                  <tr id="row_alphanumeric">
                    <td>Row number increment:</td>
                    <td>
                                          <input type="radio" name="advanced_windows_group_label_row_increment" value="fixed" />Fixed(A, A, A ...)<br />
                                          <input type="radio" name="advanced_windows_group_label_row_increment" value="inc" checked="checked" />A,B,C,D ...<br />  
                                          <input type="radio" name="advanced_windows_group_label_row_increment" value="pass_one" />A,C,E,F ...
                                          </td> 
                </tr>
                <tr id="row_numeric">
                    <td>Row number increment:</td>
                    <td><input type="text" size="4" maxlength="4" value="1" id="advanced_windows_group_row_numeric_increment" /></td>             
                </tr>
                
                <tr>
                    <td>Character between row and number: </td>
                    <td class="input"><input type="text"  value="." id="advanced_windows_group_label_delimiter" size="1" maxlength="1" /></td>
                    <td></td>
                    
                </tr>
                 <tr class="preview">
                 <td><p class="bold">Preview:</p> </td>
                 </tr>

                 <tr >
                 <td> <table id="group_label_preview"></table></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 </tr>
                </table>              
                
         <a class="close" href="javascript:void(0);">Close</a>
         <a class="ok" href="javascript:void(0);">Save</a>
         

        </div>




<div id="upload-area">
  <a class="close img" href="javascript:void(0);" ><img class="close img" src="<?php echo SITE_HOST;?>skins/images/cancel_icon.jpg"  /></a>
<p class="heading">Upload Hall background image</p>
<div id="file-uploader">       
    <noscript>          
        <p>Please enable JavaScript to use file uploader.</p>
        <!-- or put a simple form for upload here -->
    </noscript>         
</div>
<a href="javascript:void(0);" class="close">Close</a>
</div>
     <a href="javascript:void(0);" id="edit_categories">Edit categories</a>



    <div id="main">
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->