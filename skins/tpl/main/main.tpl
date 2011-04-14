<!-- shins/tpl/main/main.tpl begin-->
    <script type="text/javascript" src="<?php echo SITE_HOST;?>skins/js/main/script_main.js"></script>

    <div class="ajax_menu">
        <a href="javascript:void();" class="click1">Click 1</a>
        <a href="javascript:void();" class="click2">Click 2</a>
    </div>

    <div id="main">
        <div id="result">
        </div>
        
        <div class="one_chair">
            Chair:<br />
            <?php
                    $chair->Draw($chair->number, $chair->row, $chair->label);
                    var_dump($chair);            
            ?>
        </div>
        <br />
        
        <div class="row">
            Row:<br />
            <?php
                 $row->Draw($row->number, $row->row, $row->label);
                 var_dump($row);
            ?>
        </div>
        <br />
        
        <div class="area">
            Area:<br />
            <?php
                 $area->Draw($row->number, $row->row, $row->label);
                 var_dump($area);
            ?>
    
        </div>
        
        
    </div>
<!-- shins/tpl/main/main.tpl end-->