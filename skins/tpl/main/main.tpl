<!-- shins/tpl/main/main.tpl begin-->
<div id="boxes">
 
     
    <!-- #customize your modal window here -->
 
    <div id="dialog" class="window">
        <p>Editing Seat information</p>
         <div>Label: <input type="text" id="label" size="15" /> </div> <br />
         <div>Row : <input type="text" id="row" size="15" /> </div> <br />
         <div>Number: <input type="text" id="nubmer" size="15" /> </div> <br />
         
         
        <!-- close button is defined as close class -->
        <div class="save">Save</div><div class="cancel">Cancel</div>
 
    </div>
 
     
    <!-- Do not remove div#mask, because you'll need it to fill the whole screen --> 
    <div id="mask"></div>
</div>
  

    <div id="main">
        
            <?php
                echo $halleditor->seatEditor(1,'link');
            ?>
        

        
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->